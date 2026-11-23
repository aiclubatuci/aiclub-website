import { NextResponse } from "next/server";
import { google } from "googleapis";
import type { SubscribeRequest } from "@/types";

function mustGetEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

/** Matches existing sheet format, e.g. 11/22/2026 18:39:59 (Pacific). */
function formatTimestamp(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${get("month")}/${get("day")}/${get("year")} ${get("hour")}:${get("minute")}:${get("second")}`;
}

function getSheetsClient() {
  const clientEmail = mustGetEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = mustGetEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
  const sheetId = mustGetEnv("GOOGLE_SHEET_ID");

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return {
    sheets: google.sheets({ version: "v4", auth }),
    sheetId,
  };
}

export async function POST(req: Request) {
  try {
    const body: SubscribeRequest = await req.json();
    const email = body.email?.trim().toLowerCase();
    const firstName = body.firstName?.trim() ?? "";
    const lastName = body.lastName?.trim() ?? "";

    if (!email) {
      return NextResponse.json(
        { errorMessage: "Email is required." },
        { status: 400 },
      );
    }

    const { sheets, sheetId } = getSheetsClient();
    // Expected columns: Timestamp | Email | First Name | Last Name
    const range = process.env.GOOGLE_SHEET_RANGE;

    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });

    const rows = existing.data.values ?? [];
    const alreadySubscribed = rows.some(
      (row, index) =>
        index > 0 &&
        typeof row[1] === "string" &&
        row[1].trim().toLowerCase() === email,
    );

    if (alreadySubscribed) {
      return NextResponse.json(
        {
          errorMessage:
            "Whoops! It looks like that email is already subscribed to our mailing list!",
        },
        { status: 409 },
      );
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[formatTimestamp(), email, firstName, lastName]],
      },
    });

    return NextResponse.json(
      {
        successMessage: `Success! You've been successfully subscribed to our mailing list!`,
      },
      { status: 200 },
    );
  } catch (err: unknown) {
    console.error("Google Sheets subscribe error:", err);

    return NextResponse.json(
      {
        errorMessage:
          "Whoops! There was a problem subscribing you to our mailing list.",
      },
      { status: 500 },
    );
  }
}

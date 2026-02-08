import { NextResponse } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";

function mustGetEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

mailchimp.setConfig({
  apiKey: mustGetEnv("MAIL_CHIMP_API_KEY"),
  server: mustGetEnv("MAIL_CHIMP_SERVER_PREFIX"),
});

type SubscribeRequest = {
  email?: string;
  firstName?: string;
  lastName?: string;
};

export async function POST(req: Request) {
  try {
    const body: SubscribeRequest = await req.json();

    const email = body.email?.trim();
    const firstName = body.firstName?.trim() ?? "";
    const lastName = body.lastName?.trim() ?? "";

    if (!email) {
      return NextResponse.json(
        { errorMessage: "Email is required." },
        { status: 400 },
      );
    }

    const audienceId = mustGetEnv("MAIL_CHIMP_AUDIENCE_ID");

    await mailchimp.lists.addListMember(audienceId, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    });

    return NextResponse.json(
      {
        successMessage: `Success! ${email} was successfully subscribed to our mailing list!`,
      },
      { status: 200 },
    );
  } catch (err: unknown) {
    const title =
      typeof err === "object" &&
      err !== null &&
      "response" in err &&
      typeof (err as any).response?.body?.title === "string"
        ? (err as any).response.body.title
        : null;

    if (title === "Member Exists") {
      return NextResponse.json(
        {
          errorMessage:
            "Whoops! It looks like that email is already subscribed to our mailing list!",
        },
        { status: 409 },
      );
    }

    console.error("Mailchimp subscribe error:", err);

    return NextResponse.json(
      {
        errorMessage:
          "Whoops! There was a problem subscribing you to our mailing list.",
      },
      { status: 500 },
    );
  }
}

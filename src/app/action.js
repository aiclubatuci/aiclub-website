"use server"
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAIL_CHIMP_API_KEY,
  server: process.env.MAIL_CHIMP_SERVER_PREFIX
});

export const addSubscriber = async (formData) => {
  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  try {
    await mailchimp.lists.addListMember(process.env.MAIL_CHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    });
    return { successMessage: `Success! ${email} was successfully subscribed to our mailing list!` }
  } catch (error) {
    if (error.response.body.title === "Member Exists") {
      return { errorMessage: `Whoops! It looks like the email ${email} is already subscribed to our mailing list!` }
    } else {
      return { errorMessage: `Whoops! There was a problem subscribing you ${email} to our mailing list!` }
    }
  }
}
import nodemailer from "nodemailer";

/**
 * Creates a transporter for sending emails using the Gmail service.
 *
 * The transporter is configured with the following options:
 * - `service`: The email service to use, in this case "gmail".
 * - `port`: The port to use for the email service, in this case 587.
 * - `auth`: An object containing the user email and password to authenticate with the email service.
 *
 * This transporter can be used to send emails using the `sendMail` method of the `nodemailer` library.
 */
export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

export const sendAnEmail = async (to, subject, message) => {
  await nodemailer
    .createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    })
    .sendMail({
      from: `Note APP ${process.env.USER_EMAIL}`,
      to: to,
      subject: subject,
      text: message,
    });
};

// ("suhaibghattass21@gmail.com");

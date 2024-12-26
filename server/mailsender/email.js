import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL } from "./emailTemplates.js";
import { mailSender } from "./mailSender.js";

export const sendVerificationEmail = async (email, verificationToken) => {

    try {
        const response = await mailSender(email, "Verification Email", VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken))

        // console.log(mailResponse);

    } catch (error) {
        console.log("error email", error);
        throw new Error(`Email verification sending error : ${error}`)
    }
}




export const sendWelcomeEmail = async (email, name) => {

    try {
        const response = await mailSender(email, "Welcome Email", WELCOME_EMAIL.replace("{RecipientName}", name).replace("{CompanyName}", "Jarvis").replace("{CompanyName}", "Jarvis").replace("{CompanyName}", "Jarvis").replace("{CompanyName}", "Jarvis"))


        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error(`Error sending welcome email`, error);

        throw new Error(`Error sending welcome email: ${error}`);
    }
};




export const sendPasswordResetEmail = async (email, resetURL) => {

    try {

        const response = await mailSender(email, "Reset Password Email", PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL));


    } catch (error) {
        console.error(`Error sending password reset email`, error);

        throw new Error(`Error sending password reset email: ${error}`);
    }
};


export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

    try {

        const response = await mailSender(email, "Reset Password Email", PASSWORD_RESET_SUCCESS_TEMPLATE);

        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error(`Error sending password reset success email`, error);

        throw new Error(`Error sending password reset success email: ${error}`);
    }
};
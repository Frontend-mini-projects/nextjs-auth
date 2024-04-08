import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    const mail = process.env.NEXT_PUBLIC_DOMAIN;
    try {

        // setting the token in the 
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        console.log('hashed token', hashedToken);

        // for verifying the user
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 60 * 60 * 1000
            })
        }
        // for forget password
        else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgetPasswordToken: hashedToken,
                forgetPasswordTokenExpiry: Date.now() + 60 * 60 * 1000
            })
        }

        // create smtp server through mailtrap
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        // html for verify email
        let verifyHtml = `<p>Verify email within 1 hrs</p><br><p>Click <a href="${mail}/verifyemail?token=${hashedToken}">here</a> to Verify or paste the below url in the browser <br> ${mail}/verifyemail?token=${hashedToken}`;


        // html part for forget passsword
        const forgetHtml = `<p>Reset Password within 1 hrs</p><br><p>Click <a href="${mail}/resetpassword?token=${hashedToken}">here</a> to Reset your password or paste the below url in the browser <br> ${mail}/resetpassword?token=${hashedToken}`


        // creating mailoption refer nodemailer
        const mailOption = {
            from: 'utkarshgupta04092003@gmail.com', // sender address
            to: email, // list of receivers
            text: "Welcome to my first next app, verify email within 1 hrs",
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            html: emailType === "VERIFY" ? verifyHtml : forgetHtml, // html body
        }


        const mailResponse = await transport.sendMail(mailOption);

        console.log('sendmail from mailer.ts', mailResponse);

    } catch (error: any) {
        throw new Error(error.message);
    }
}


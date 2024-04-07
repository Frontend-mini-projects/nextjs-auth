import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async  ({email, emailType, userId}: any) =>{
    try {

        // setting the token in the 
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        console.log('hashed token', hashedToken);

        // for verifying the user
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 60*60*1000
            })
        }
        // for forget password
        else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId, {
                forgetPasswordToken: hashedToken,
                forgetPasswordTokenExpiry: Date.now() + 60*60*1000
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

        // creating mailoption refer nodemailer
        const mailOption = {
            from: 'utkarshgupta04092003@gmail.com', // sender address
            to: email, // list of receivers
            text: "Welcome to my first next app, verify email within 1 hrs",
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            html: `<p>Verify email within 1 hrs</p><br><p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"} or paste the below url in the browser <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}`, // html body
            
        }

        const mailResponse = await transport.sendMail(mailOption);

        console.log('sendmail from mailer.ts', mailResponse);
        
    } catch (error:any) {
        throw new Error(error.message);
    }
}


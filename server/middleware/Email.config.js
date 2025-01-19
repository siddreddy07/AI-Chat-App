import nodemailer from 'nodemailer'
import { Verification_Email_Template } from './Email_template.js';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "siddharthreddy627@gmail.com",
      pass: "djzn mivp bozx xwua",
    },
  });

export const sendVerifyEmail = async(email,otp,timeleft)=>{

        try {
            
            const info = await transporter.sendMail({
                from: '"Chat-App" <siddharthreddy627@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Account - Verification", // Subject line
                text: "Account - Verification", // plain text body
                html: Verification_Email_Template
                                  .replace("{verificationCode}",otp) // html body
                                  .replace("{otpexpires}",timeleft), // html body
              });

              console.log(info)

        } catch (error) {
            console.log(error)
        }

}

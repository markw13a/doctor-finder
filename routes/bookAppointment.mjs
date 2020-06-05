import nodemailer from "nodemailer";
import { user, pass } from "../credentials";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass }
});

const bookAppointment = async (ctx, next) => {
    // TODO: passing appointmentTime directly in to message body is a large phishing risk
    const { email: to, appointmentTime, name } = ctx.request.query;

    if( !to || !appointmentTime || !name ) {
        ctx.status = 400;
        ctx.body = "email, appointmentTime and name must all be passed in a query-string along with the request";
        return;
    } 

    const text = `
        Hi ${name},

        You have booked an appointment for ${appointmentTime}.

        Regards,

        PhloTest bot
    `;
    await transporter.sendMail({
        from: "Phlo test no-reply",
        to,
        subject: "Doctor appointment confirmation",
        text
    });
    ctx.status = 200;
    ctx.body = "Message successfully sent";
};

export {
    bookAppointment
};

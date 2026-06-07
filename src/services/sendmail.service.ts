import nodemailer from 'nodemailer';

console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASSWORD:", process.env.MAIL_PASSWORD);
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});


interface SendMailOptions {
    to: string;
    subject: string;
    html: string;
}

class MailService {
    async sendMail({
        to,
        subject,
        html,
    }: SendMailOptions): Promise<void> {
        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to,
            subject,
            html,
        });
    }

        async sendOtpEmail(to: string, otp: string): Promise<void> {
            await this.sendMail({
                to,
                subject: "Mã OTP khôi phục mật khẩu",
                html: `
                <p>Xin chào,</p>
                <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
                <p>Mã OTP này sẽ hết hạn sau 10 phút.</p>`,
            });
        }
}

export default new MailService();


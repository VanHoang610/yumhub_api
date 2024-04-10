// import nodemailer from 'nodemailer';
import * as nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'lv.hoang610@gmail.com',
        pass: 'quduwwizttakbubk'
    },
});
// Class Mailer
export class Mailer {
    // Phương thức gửi email (sendMail)
    static async sendMail(data: { email: string, subject: string, content: string }) {
        try {
            const { email, subject, content } = data;

            // Tạo các tùy chọn email
            const mailOptions = {
                from: 'lv.hoang610@gmail.com',
                to: email,
                subject,
                html: content,
            };

            // Gửi email sử dụng transporter
            await transporter.sendMail(mailOptions);

            return true; // Trả về true nếu gửi email thành công
        } catch (error) {
            console.log(error);
            throw new Error('Có lỗi xảy ra khi gửi email');
        }
    }
}



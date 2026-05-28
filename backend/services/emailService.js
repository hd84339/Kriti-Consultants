const nodemailer = require('nodemailer')

const createTransporter = () => nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
})

const sendLeadNotification = async (lead) => {
  const transporter = createTransporter()
  const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0B1120;color:#fff;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#C8A96B,#9A7A40);padding:24px 32px;"><h1 style="margin:0;color:#0B1120;font-size:22px;">New Lead — Kriti Consultants</h1></div>
    <div style="padding:32px;">
      <p><strong style="color:#C8A96B;">Name:</strong> ${lead.name}</p>
      <p><strong style="color:#C8A96B;">Email:</strong> ${lead.email}</p>
      <p><strong style="color:#C8A96B;">Phone:</strong> ${lead.phone || 'Not provided'}</p>
      <p><strong style="color:#C8A96B;">Business Type:</strong> ${lead.businessType || 'Not provided'}</p>
      <p><strong style="color:#C8A96B;">Message:</strong> ${lead.message || 'None'}</p>
    </div></div>`
  await transporter.sendMail({ from: `"Kriti Website" <${process.env.EMAIL_USER}>`, to: process.env.NOTIFY_EMAIL, subject: `New Lead: ${lead.name}`, html })
}

const sendAutoReply = async (lead) => {
  const transporter = createTransporter()
  const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0B1120;color:#fff;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#C8A96B,#9A7A40);padding:28px 32px;"><h1 style="margin:0;color:#0B1120;">Kriti Business Consultants</h1></div>
    <div style="padding:36px 32px;">
      <h2 style="color:#C8A96B;">Thank you, ${lead.name}!</h2>
      <p style="color:rgba(255,255,255,0.7);line-height:1.7;">We have received your enquiry. Our team will reach out within <strong style="color:#C8A96B;">24 hours</strong> to schedule your complimentary business audit.</p>
      <p style="color:rgba(255,255,255,0.4);margin-top:24px;font-style:italic;">"Freedom comes when your framework runs the show." — Savitri Shah</p>
    </div></div>`
  await transporter.sendMail({ from: `"Savitri Shah — Kriti Consultants" <${process.env.EMAIL_USER}>`, to: lead.email, subject: `We received your enquiry, ${lead.name}`, html })
}

module.exports = { sendLeadNotification, sendAutoReply }

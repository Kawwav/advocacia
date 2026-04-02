const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' })

  const { nome, telefone, assunto, categoria, mensagem } = req.body

  if (!nome || !telefone || !assunto) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes' })
  }

  const mailOptions = {
    from: `"Site Haeffner" <${process.env.EMAIL_USER}>`,
    to: 'haeffner@hotmail.com.br',
    subject: `[Site] Nova mensagem: ${assunto}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #C9A84C; padding-bottom: 12px;">Nova mensagem do site</h2>

        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555; width: 130px;">Nome:</td>
            <td style="padding: 10px; color: #222;">${nome}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 10px; font-weight: bold; color: #555;">Telefone:</td>
            <td style="padding: 10px; color: #222;">${telefone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555;">Categoria:</td>
            <td style="padding: 10px; color: #222;">${categoria || '-'}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 10px; font-weight: bold; color: #555;">Assunto:</td>
            <td style="padding: 10px; color: #222;">${assunto}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Mensagem:</td>
            <td style="padding: 10px; color: #222;">${mensagem || '(sem descrição)'}</td>
          </tr>
        </table>

        <p style="margin-top: 24px; font-size: 12px; color: #999;">Enviado pelo formulário do site.</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Erro ao enviar email:', err)
    return res.status(500).json({ error: 'Falha ao enviar email' })
  }
}
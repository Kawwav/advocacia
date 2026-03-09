const express  = require('express')
const nodemailer = require('nodemailer')
const multer   = require('multer')
const cors     = require('cors')
require('dotenv').config()

const app    = express()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }) // 10MB

app.use(cors())
app.use(express.json())

/* ── Transporter Gmail ── */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

/* ── Rota de envio ── */
app.post('/api/contato', upload.single('attachment'), async (req, res) => {
  const { nome, email, telefone, area, mensagem } = req.body

  if (!nome || !email || !telefone) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando.' })
  }

  const mailOptions = {
    from: `"Site Advocacia" <${process.env.GMAIL_USER}>`,
    to:   process.env.GMAIL_USER,
    replyTo: email,
    subject: `Novo contato: ${area || 'Geral'} — ${nome}`,
    html: `
      <h2 style="color:#1a2740">Novo contato pelo site</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 16px 6px 0;color:#888">Nome</td><td><strong>${nome}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">E-mail</td><td>${email}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Telefone</td><td>${telefone}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Área</td><td>${area || 'Não informada'}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Mensagem</td><td>${mensagem || '(sem descrição)'}</td></tr>
      </table>
    `,
    attachments: req.file ? [{
      filename:    req.file.originalname,
      content:     req.file.buffer,
      contentType: req.file.mimetype,
    }] : [],
  }

  try {
    await transporter.sendMail(mailOptions)
    res.json({ success: true })
  } catch (err) {
    console.error('Nodemailer error:', err)
    res.status(500).json({ error: 'Falha ao enviar email.' })
  }
})

app.get('/', (_, res) => res.send('API Contato OK'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))

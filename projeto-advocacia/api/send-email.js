import nodemailer from 'nodemailer'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false, maxFileSize: 10 * 1024 * 1024 })
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' })

  console.log('EMAIL_USER:', process.env.EMAIL_USER)
  console.log('EMAIL_PASS existe:', !!process.env.EMAIL_PASS)

  let nome, telefone, assunto, categoria, mensagem, arquivoAnexo

  const contentType = req.headers['content-type'] || ''

  if (contentType.includes('multipart/form-data')) {
    // Formulário com anexo (Agende)
    try {
      const { fields, files } = await parseForm(req)
      nome      = Array.isArray(fields.nome)      ? fields.nome[0]      : fields.nome
      telefone  = Array.isArray(fields.telefone)  ? fields.telefone[0]  : fields.telefone
      assunto   = Array.isArray(fields.assunto)   ? fields.assunto[0]   : fields.assunto
      categoria = Array.isArray(fields.categoria) ? fields.categoria[0] : fields.categoria
      mensagem  = Array.isArray(fields.mensagem)  ? fields.mensagem[0]  : fields.mensagem
      arquivoAnexo = files.attachment?.[0] || files.attachment || null
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao processar formulário', detalhe: err.message })
    }
  } else {
    // Formulário JSON (Duvidas)
    const body = req.body
    nome      = body.nome
    telefone  = body.telefone
    assunto   = body.assunto
    categoria = body.categoria
    mensagem  = body.mensagem
    arquivoAnexo = null
  }

  if (!nome || !telefone || !assunto) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes' })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: `"Site Haeffner" <${process.env.EMAIL_USER}>`,
    to: 'haeffnermarinho@gmail.com',
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
    attachments: [],
  }

  // Adiciona anexo se existir
  if (arquivoAnexo) {
    const filepath = arquivoAnexo.filepath || arquivoAnexo.path
    const filename = arquivoAnexo.originalFilename || arquivoAnexo.name || 'anexo'
    mailOptions.attachments.push({
      filename,
      content: fs.readFileSync(filepath),
    })
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Email enviado com sucesso!')
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Erro ao enviar email:', err.message)
    return res.status(500).json({ error: 'Falha ao enviar email', detalhe: err.message })
  }
}
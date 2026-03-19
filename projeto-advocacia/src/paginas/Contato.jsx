import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaLock,
  FaCheckCircle, FaSpinner, FaExclamationTriangle, FaPaperclip, FaTimes,
} from 'react-icons/fa'
import './Contato.css'

/* ══════════════════════════════════════════════════════════════
CONFIGURAÇÃO — Backend próprio (Vercel)
   E-mails chegam em: kawav6390@gmail.com
══════════════════════════════════════════════════════════════ */
const API_URL         = 'https://api-contato-rouge.vercel.app/api/contato'
const WHATSAPP_NUMBER = '5541988184388'

const AREAS = [
  'Análise de Contratos',
  'Conflitos Cíveis e Cotidianos',
  'Consultoria Preventiva / Empresas',
  'Enviar Currículo',
  'Mercado Imobiliário',
  'Outros assuntos',
  'Proteção Patrimonial',
  'Trabalhe Conosco',
  'Urgências Criminais',
]

const INFO_CARDS = [
  { Icon: FaWhatsapp,      label: 'WHATSAPP',  value: '(41) 98818-4388',              color: '#25D366', href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { Icon: FaEnvelope,      label: 'E-MAIL',    value: 'kawav6390@gmail.com',  color: '#C9A84C', href: 'mailto:kawav6390@gmail.com' },
  { Icon: FaMapMarkerAlt,  label: 'ENDEREÇO',  value: 'Curitiba – Paraná, Brasil',    color: '#C9A84C', href: null },
]

export default function Contato() {
  const [nome,     setNome]     = useState('')
  const [email,    setEmail]    = useState('')
  const [telefone, setTelefone] = useState('')
  const [area,     setArea]     = useState('')
  const [mensagem, setMensagem] = useState('')
  const [arquivo,  setArquivo]  = useState(null)
  const [sending,  setSending]  = useState(false)
  const [sendError,setSendError]= useState('')
  const [submitted,setSubmitted]= useState(false)
  const fileRef = useRef()

  const whatsappLink = () => {
    const texto = encodeURIComponent(
      `Olá! Vim pelo site.\n\n*Área:* ${area || 'Não informada'}\n*Nome:* ${nome}\n*Situação:* ${mensagem || 'Gostaria de mais informações.'}`
    )
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`
  }

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (f) setArquivo(f)
  }


  const handleSubmit = async () => {
    if (!nome || !email || !telefone) return
    setSending(true)
    setSendError('')

    try {
      const formData = new FormData()
      formData.append('nome',     nome)
      formData.append('email',    email)
      formData.append('telefone', telefone)
      formData.append('area',     area || 'Não informada')
      formData.append('mensagem', mensagem || '(sem descrição)')
      if (arquivo) formData.append('attachment', arquivo)

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()
      if (response.ok && result.success) {
        setSubmitted(true)
      } else {
        throw new Error(result?.error || 'Erro no envio')
      }
    } catch (err) {
      console.error('Backend error:', err)
      setSendError(`Não foi possível enviar. Use o WhatsApp abaixo.`)
    } finally {
      setSending(false)
    }
  }

  const reset = () => {
    setSubmitted(false); setNome(''); setEmail(''); setTelefone('')
    setArea(''); setMensagem(''); setArquivo(null); setSendError('')
  }

  const canSubmit = nome && email && telefone && !sending

  /*👏 */
  if (submitted) return (
    <main className="ct-pagina">
      <div className="ct-orb ct-orb--1" /><div className="ct-orb ct-orb--2" />
      <motion.div className="ct-inner" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="ct-success">
          <motion.div className="ct-success__icon" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}>
            <FaCheckCircle />
          </motion.div>
          <h2 className="ct-success__titulo">Mensagem <span>Enviada</span></h2>
          <p className="ct-success__texto">
            Prezado(a) <strong>{nome}</strong>,<br /><br />
            Confirmamos o recebimento de sua demanda. Os dados fornecidos foram encaminhados à nossa Gestão Estratégica para análise de viabilidade e enquadramento técnico junto aos nossos Núcleos Especializados.<br /><br />
            Primamos pela celeridade e pelo rigor técnico intrínseco à nossa atuação. Aguarde o contato de nossa equipe para o agendamento da conferência inicial.<br /><br />
            <strong>Atenciosamente,<br />Haeffner Marinho Advogados</strong>
          </p>
          <a className="ct-success__whatsapp" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp /> Falar pelo WhatsApp
          </a>
          <button className="ct-btn-reset" onClick={reset}>Enviar nova mensagem</button>
        </div>
      </motion.div>
    </main>
  )

  return (
    <main className="ct-pagina">
      <div className="ct-orb ct-orb--1" /><div className="ct-orb ct-orb--2" />
      <div className="ct-inner">
        <motion.div className="ct-header" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="pagina-topo-label">
            ADVOCACIA E CONSULTORIA JURÍDICA
          </p>

          <h1 className="ct-titulo">Entre em <span>Contato</span></h1>
          <div className="ct-divisor" />
        </motion.div>

        {/* lados*/}
        <div className="ct-layout">

          {/*coluna esquerda formualrios */}
          <motion.div className="ct-form" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>

            <div className="ct-campo">
              <label className="ct-campo__label">NOME COMPLETO</label>
              <input className="ct-campo__input" type="text" placeholder="Seu nome completo" value={nome} onChange={e => setNome(e.target.value)} disabled={sending} />
            </div>

            <div className="ct-campo">
              <label className="ct-campo__label">E-MAIL</label>
              <input className="ct-campo__input" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} disabled={sending} />
            </div>

            <div className="ct-campo">
              <label className="ct-campo__label">TELEFONE / WHATSAPP</label>
              <input className="ct-campo__input" type="tel" placeholder="(41) 99999-9999" value={telefone} onChange={e => setTelefone(e.target.value)} disabled={sending} />
            </div>

            <div className="ct-campo">
              <label className="ct-campo__label">ÁREA DE INTERESSE</label>
              <select className="ct-campo__input ct-campo__select" value={area} onChange={e => setArea(e.target.value)} disabled={sending}>
                <option value="">Selecione uma área...</option>
                {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div className="ct-campo">
              <label className="ct-campo__label">MENSAGEM</label>
              <textarea className="ct-campo__input ct-campo__textarea" rows={4} placeholder="Descreva brevemente sua situação..." value={mensagem} onChange={e => setMensagem(e.target.value)} disabled={sending} />
            </div>

            {/* anexar arquivo */}
            <div className="ct-campo">
              <label className="ct-campo__label">ANEXAR DOCUMENTO <span className="ct-opcional">(opcional)</span></label>
              <div className="ct-anexo" onClick={() => fileRef.current?.click()}>
                <FaPaperclip className="ct-anexo__icon" />
                <span className="ct-anexo__texto">
                  {arquivo ? arquivo.name : 'Clique para anexar um arquivo (PDF, imagem, doc...)'}
                </span>
                {arquivo && (
                  <button className="ct-anexo__remover" onClick={e => { e.stopPropagation(); setArquivo(null); fileRef.current.value = '' }}>
                    <FaTimes />
                  </button>
                )}
              </div>
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" style={{ display: 'none' }} onChange={handleFile} />
            </div>

            {/* Erro */}
            <AnimatePresence>
              {sendError && (
                <motion.div className="ct-erro" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <FaExclamationTriangle />
                  <span>{sendError}</span>
                  <a className="ct-erro__wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp /> WhatsApp
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              className={`ct-btn-submit${canSubmit ? ' ct-btn-submit--ativo' : ''}${sending ? ' ct-btn-submit--sending' : ''}`}
              onClick={handleSubmit}
              disabled={!canSubmit}
              whileHover={canSubmit ? { scale: 1.01, y: -1 } : {}}
              whileTap={canSubmit ? { scale: 0.99 } : {}}
            >
              {sending ? <><FaSpinner className="ct-spinner" /> Enviando...</> : 'ENVIAR MENSAGEM'}
            </motion.button>

            <p className="ct-privacidade">
              <FaLock className="ct-privacidade__icon" />
              Suas informações são confidenciais e protegidas pelo sigilo profissional.
            </p>
          </motion.div>

          {/*coluna direita  info*/}
          <motion.div className="ct-info" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h2 className="ct-info__titulo">Atendimento personalizado<br />para cada cliente</h2>
            <p className="ct-info__texto">
              Entre em contato e agende sua consulta inicial. Nossa equipe está pronta para analisar seu caso e apresentar as melhores alternativas jurídicas.
            </p>

            <div className="ct-cards">
              {INFO_CARDS.map(({ Icon, label, value, color, href }) => (
                <motion.div key={label} className="ct-card" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <div className="ct-card__icon" style={{ background: `${color}18`, border: `1px solid ${color}40` }}>
                    <Icon style={{ color }} />
                  </div>
                  <div className="ct-card__body">
                    <p className="ct-card__label" style={{ color }}>{label}</p>
                    {href
                      ? <a className="ct-card__value" href={href} target="_blank" rel="noopener noreferrer">{value}</a>
                      : <p className="ct-card__value">{value}</p>
                    }
                  </div>
                </motion.div>
              ))}
            </div>

            {/* whatsApp*/}
            <motion.a
              className="ct-wa-cta"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              
              <FaWhatsapp /> Falar pelo WhatsApp agora
            </motion.a>
          </motion.div>

        </div>
      </div>
    </main>
  )
}
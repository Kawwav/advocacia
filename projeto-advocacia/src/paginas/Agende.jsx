import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaLock,
  FaCheckCircle, FaSpinner, FaExclamationTriangle, FaPaperclip, FaTimes,
} from 'react-icons/fa'
import './Agende.css'

const API_URL         = '/api/send-email'
const WHATSAPP_NUMBER = '554198387397'

export default function Contato() {
  const { t } = useTranslation()

  const AREAS = t('agende.areas', { returnObjects: true })

  const INFO_CARDS = [
    { Icon: FaWhatsapp,     label: 'WHATSAPP', value: ' (41) 9838-7397',                color: '#25D366', href: `https://wa.me/${WHATSAPP_NUMBER}` },
    { Icon: FaEnvelope,     label: 'E-MAIL',   value: 'haeffnermarinho@gmail.com',       color: '#C9A84C', href: 'mailto:haeffnermarinho@gmail.com' },
    { Icon: FaMapMarkerAlt, label: t('agende.cards.endereco_label'), value: 'Curitiba – Paraná, Brasil', color: '#C9A84C', href: null },
  ]

  const [nome,      setNome]      = useState('')
  const [email,     setEmail]     = useState('')
  const [telefone,  setTelefone]  = useState('')
  const [area,      setArea]      = useState('')
  const [mensagem,  setMensagem]  = useState('')
  const [arquivo,   setArquivo]   = useState(null)
  const [sending,   setSending]   = useState(false)
  const [sendError, setSendError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
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
    setSendError(false)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          telefone,
          assunto: area || 'Não informada',
          categoria: email,
          mensagem: mensagem || '(sem descrição)',
        }),
      })

      const result = await response.json()
      if (response.ok && result.success) {
        setSubmitted(true)
      } else {
        throw new Error(result?.error || 'Erro no envio')
      }
    } catch (err) {
      console.error('Backend error:', err)
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  const reset = () => {
    setSubmitted(false); setNome(''); setEmail(''); setTelefone('')
    setArea(''); setMensagem(''); setArquivo(null); setSendError(false)
  }

  const canSubmit = nome && email && telefone && !sending

  /* ── Tela de sucesso ── */
  if (submitted) return (
    <main className="ct-pagina">
      <div className="ct-orb ct-orb--1" /><div className="ct-orb ct-orb--2" />
      <motion.div className="ct-inner" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="ct-success">
          <motion.div className="ct-success__icon" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}>
            <FaCheckCircle />
          </motion.div>
          <h2 className="ct-success__titulo">
            {t('agende.sucesso.titulo1')} <span>{t('agende.sucesso.titulo2')}</span>
          </h2>
          <p className="ct-success__texto">
            {t('agende.sucesso.saudacao')} <strong>{nome}</strong>,<br /><br />
            {t('agende.sucesso.texto1')}<br /><br />
            {t('agende.sucesso.texto2')}<br /><br />
            <strong style={{ whiteSpace: 'pre-line' }}>{t('agende.sucesso.assinatura')}</strong>
          </p>
          <a className="ct-success__whatsapp" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp /> {t('agende.sucesso.whatsapp')}
          </a>
          <button className="ct-btn-reset" onClick={reset}>
            {t('agende.sucesso.nova_mensagem')}
          </button>
        </div>
      </motion.div>
    </main>
  )

  /* ── Página principal ── */
  return (
    <main className="ct-pagina">
      <div className="ct-orb ct-orb--1" /><div className="ct-orb ct-orb--2" />
      <div className="ct-inner">

        <motion.div className="ct-header" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="pagina-topo-label">{t('agende.eyebrow')}</p>
          <h1 className="ct-titulo">{t('agende.titulo1')} <span>{t('agende.titulo2')}</span></h1>
          <div className="ct-divisor" />
        </motion.div>

        <div className="ct-layout">

          {/* ── Coluna esquerda: formulário ── */}
          <motion.div className="ct-form" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>

            <div className="ct-campo">
              <label className="ct-campo__label">{t('agende.campos.nome_label')}</label>
              <input className="ct-campo__input" type="text" placeholder={t('agende.campos.nome_placeholder')} value={nome} onChange={e => setNome(e.target.value)} disabled={sending} />
            </div>

            <div className="ct-campo">
              <label className="ct-campo__label">{t('agende.campos.email_label')}</label>
              <input className="ct-campo__input" type="email" placeholder={t('agende.campos.email_placeholder')} value={email} onChange={e => setEmail(e.target.value)} disabled={sending} />
            </div>

            <div className="ct-campo">
              <label className="ct-campo__label">{t('agende.campos.telefone_label')}</label>
              <input className="ct-campo__input" type="tel" placeholder="(41) 99999-9999" value={telefone} onChange={e => setTelefone(e.target.value)} disabled={sending} />
            </div>

            <div className="ct-campo">
              <label className="ct-campo__label">{t('agende.campos.area_label')}</label>
              <select className="ct-campo__input ct-campo__select" value={area} onChange={e => setArea(e.target.value)} disabled={sending}>
                <option value="">{t('agende.campos.area_placeholder')}</option>
                {Array.isArray(AREAS) && AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div className="ct-campo">
              <label className="ct-campo__label">{t('agende.campos.mensagem_label')}</label>
              <textarea className="ct-campo__input ct-campo__textarea" rows={4} placeholder={t('agende.campos.mensagem_placeholder')} value={mensagem} onChange={e => setMensagem(e.target.value)} disabled={sending} />
            </div>

            <div className="ct-campo">
              <label className="ct-campo__label">
                {t('agende.campos.anexo_label')} <span className="ct-opcional">{t('agende.campos.anexo_opcional')}</span>
              </label>
              <div className="ct-anexo" onClick={() => fileRef.current?.click()}>
                <FaPaperclip className="ct-anexo__icon" />
                <span className="ct-anexo__texto">
                  {arquivo ? arquivo.name : t('agende.campos.anexo_placeholder')}
                </span>
                {arquivo && (
                  <button className="ct-anexo__remover" onClick={e => { e.stopPropagation(); setArquivo(null); fileRef.current.value = '' }}>
                    <FaTimes />
                  </button>
                )}
              </div>
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" style={{ display: 'none' }} onChange={handleFile} />
            </div>

            {/* ── Erro ── */}
            <AnimatePresence>
              {sendError && (
                <motion.div className="ct-erro" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <FaExclamationTriangle />
                  <span>{t('agende.erro')}</span>
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
              {sending
                ? <><FaSpinner className="ct-spinner" /> {t('agende.enviando')}</>
                : t('agende.enviar')
              }
            </motion.button>

            <p className="ct-privacidade">
              <FaLock className="ct-privacidade__icon" />
              {t('agende.privacidade')}
            </p>
          </motion.div>

          {/* ── Coluna direita: info ── */}
          <motion.div className="ct-info" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>

            <div className="ct-destaques-bloco">
              <div className="ct-destaques-bloco__deco-top" />
              <div className="ct-destaques-bloco__deco-corner" />
              <div className="ct-info__destaques">
                <p className="ct-info__destaque-item">{t('agende.destaque')}</p>
              </div>
            </div>

            <div className="ct-cards">
              {INFO_CARDS.map(({ Icon, label, value, color, href }) => (
                <motion.div key={label} className={`ct-card${label === 'WHATSAPP' ? ' ct-card--with-tagline' : ''}`} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <div className="ct-card__icon" style={{ background: `${color}18`, border: `1px solid ${color}40` }}>
                    <Icon style={{ color }} />
                  </div>
                  <div className="ct-card__body">
                    <div className="ct-card__label-row">
                      <p className="ct-card__label" style={{ color }}>{label}</p>
                    </div>
                    {label === 'WHATSAPP' ? (
                      <>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'nowrap' }}>
                          <a className="ct-card__value" style={{ whiteSpace: 'nowrap' }} href={href} target="_blank" rel="noopener noreferrer">{value}</a>
                          <span className="ct-card__plantao">{t('agende.cards.whatsapp_plantao')}</span>
                        </div>
                        <div className="ct-card__wa-detail">
                          <span className="ct-card__horario">{t('agende.cards.whatsapp_horario')}</span>
                        </div>
                      </>
                    ) : href
                      ? <a className="ct-card__value" href={href} target="_blank" rel="noopener noreferrer">{value}</a>
                      : <p className="ct-card__value">{value}</p>
                    }
                  </div>
                  {label === 'WHATSAPP' && (
                    <p className="ct-card__tagline">{t('agende.cards.whatsapp_tagline')}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="ct-wa-row">
              <motion.a
                className="ct-wa-cta"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaWhatsapp /> {t('agende.wa_cta')}
              </motion.a>
            </div>

          </motion.div>
        </div>
      </div>
    </main>
  )
}
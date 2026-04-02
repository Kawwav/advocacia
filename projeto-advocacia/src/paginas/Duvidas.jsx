import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  FaGavel, FaHandshake, FaBuilding, FaShieldAlt, FaEnvelopeOpen,
  FaCheckCircle, FaLock, FaChevronDown, FaCircle,
  FaExclamationTriangle, FaClock, FaArrowRight, FaWhatsapp,
  FaSpinner,
} from 'react-icons/fa'
import './Duvidas.css'

const BACKEND_URL = '/api/send-email'

const WHATSAPP_NUMBER = '554198387397'

const URGENCIA_COR = {
  'Alta': '#C9A84C', 'High': '#C9A84C',
  'Urgente': '#b03a2e', 'Urgent': '#b03a2e',
  'Moderada': '#2563a8', 'Moderate': '#2563a8',
  'Baixa': '#1a7f6e', 'Low': '#1a7f6e',
  'A verificar': '#7a8799', 'To be assessed': '#7a8799',
}

const CHAVES_OPCOES = [
  'intimacao', 'busca_apreensao', 'vitima', 'inquerito',
  'acidente', 'contratos_cobr', 'danos_morais', 'vizinhanca',
  'compra_venda', 'distrato', 'regularizacao', 'locacao',
  'analise_contrato', 'blindagem', 'gestao_risco', 'parcerias', 'outros',
]

const CATEGORIAS_BASE = [
  { id: 1, Icon: FaGavel,        chave: 'criminal',   accentVar: '--dv-red',    opcoes: ['intimacao','busca_apreensao','vitima','inquerito'] },
  { id: 2, Icon: FaHandshake,    chave: 'civel',      accentVar: '--dv-gold',   opcoes: ['acidente','contratos_cobr','danos_morais','vizinhanca'] },
  { id: 3, Icon: FaBuilding,     chave: 'imobiliario',accentVar: '--dv-teal',   opcoes: ['compra_venda','distrato','regularizacao','locacao'] },
  { id: 4, Icon: FaShieldAlt,    chave: 'preventiva', accentVar: '--dv-blue',   opcoes: ['analise_contrato','blindagem','gestao_risco','parcerias'] },
  { id: 5, Icon: FaEnvelopeOpen, chave: 'geral',      accentVar: '--dv-silver', opcoes: ['outros'] },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

function DetalhePanel({ chave, onContact }) {
  const { t } = useTranslation()
  const info = {
    urgencia:   t(`duvidas.detalhes.${chave}.urgencia`),
    prazoLabel: t(`duvidas.detalhes.${chave}.prazo`),
    intro:      t(`duvidas.detalhes.${chave}.intro`),
    passos:     [0,1,2,3].map(i => t(`duvidas.detalhes.${chave}.passos.${i}`)),
    alerta:     t(`duvidas.detalhes.${chave}.alerta`),
  }
  const urgColor = URGENCIA_COR[info.urgencia] || '#C9A84C'

  return (
    <motion.div className="dv-detalhe" style={{ '--dv-urg': urgColor }}
      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
      <div className="dv-detalhe__inner">
        <div className="dv-detalhe__badges">
          <span className="dv-detalhe__badge dv-detalhe__badge--urg" style={{ borderColor: urgColor, color: urgColor, background: `${urgColor}18` }}>
            <FaExclamationTriangle /> {t('duvidas.urgencia_label')} {info.urgencia}
          </span>
          <span className="dv-detalhe__badge dv-detalhe__badge--prazo">
            <FaClock /> {info.prazoLabel}
          </span>
        </div>
        <p className="dv-detalhe__intro">{info.intro}</p>
        <div className="dv-detalhe__divisor" />
        <p className="dv-detalhe__passos-label">{t('duvidas.passos_label')}</p>
        <ol className="dv-detalhe__passos">
          {info.passos.map((p, i) => (
            <motion.li key={i} className="dv-detalhe__passo"
              initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}>
              <span className="dv-detalhe__num" style={{ color: urgColor }}>{i + 1}</span>
              <span>{p}</span>
            </motion.li>
          ))}
        </ol>
        <div className="dv-detalhe__alerta">
          <FaExclamationTriangle style={{ color: urgColor, flexShrink: 0, marginTop: 2 }} />
          <span>{info.alerta}</span>
        </div>
        <motion.button className="dv-detalhe__cta" onClick={onContact}
          whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
          {t('duvidas.cta_atendimento')} <FaArrowRight />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Duvidas() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [expandedOption, setExpandedOption]     = useState(null)
  const [formOption, setFormOption]             = useState(null)
  const [formChave, setFormChave]               = useState(null)
  const [name, setName]       = useState('')
  const [phone, setPhone]     = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleCategoryClick = (cat) => {
    setSelectedCategory(prev => prev?.id === cat.id ? null : cat)
    setExpandedOption(null)
  }

  const handleOptionClick = (chave) => {
    setExpandedOption(prev => prev === chave ? null : chave)
  }

  const handleContact = () => {
    setFormOption(expandedOption)
    setFormChave(expandedOption)
    setTimeout(() => {
      document.querySelector('.dv-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const handleSubmit = async () => {
    if (!formOption || !name || !phone) return
    setSending(true)
    setSendError(false)
    const templateParams = {
      nome:      name,
      telefone:  phone,
      assunto:   formOption ? t(`duvidas.opcoes.${formOption}`) : '',
      categoria: selectedCategory ? t(`duvidas.categorias.${selectedCategory.chave}`) : '',
      mensagem:  message || '(sem descrição)',
    }
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateParams),
      })
      if (!response.ok) throw new Error('Erro no servidor')
      setSubmitted(true)
    } catch (err) {
      console.error('Erro ao enviar email:', err)
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  const whatsappLink = () => {
    const texto = encodeURIComponent(
      `Olá! Vim pelo site.\n\n*Assunto:* ${formOption ? t(`duvidas.opcoes.${formOption}`) : ''}\n*Nome:* ${name}\n*Situação:* ${message || 'Gostaria de mais informações.'}`
    )
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`
  }

  const reset = () => {
    setSubmitted(false); setSelectedCategory(null)
    setExpandedOption(null); setFormOption(null); setFormChave(null)
    setName(''); setPhone(''); setMessage('')
    setSendError(false)
  }

  if (submitted) {
    return (
      <main className="dv-pagina">
        <div className="hma-bg-orb hma-bg-orb--1" /><div className="hma-bg-orb hma-bg-orb--2" />
        <motion.div className="dv-inner" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="dv-success">
            <motion.div className="dv-success__icon" initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}>
              <FaCheckCircle />
            </motion.div>
            <motion.h2 className="dv-success__titulo" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}>
              {t('duvidas.sucesso.titulo1')} <span>{t('duvidas.sucesso.titulo2')}</span>
            </motion.h2>
            <motion.div className="dv-divisor" initial={{ width: 0, opacity: 0 }} animate={{ width: 60, opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }} />
            <motion.p className="dv-success__texto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.6 }}>
              {t('hma.contato.chamada') && ''}{/* espaço */}
              {name && <><strong>{name}</strong>,<br /><br /></>}
              {t('duvidas.sucesso.texto')}<br /><br />
              {t('duvidas.sucesso.texto2')}<br /><br />
              <strong style={{ whiteSpace: 'pre-line' }}>{t('duvidas.sucesso.assinatura')}</strong>
            </motion.p>
            <motion.div className="dv-success__badge" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.75 }}>
              {selectedCategory && <selectedCategory.Icon className="dv-success__badge-icon" />}
              <span>{formChave ? t(`duvidas.opcoes.${formChave}`) : ''}</span>
            </motion.div>
            <motion.a
              className="dv-success__whatsapp"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.95 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              <FaWhatsapp /> {t('duvidas.sucesso.whatsapp')}
            </motion.a>
            <motion.button className="dv-btn-reset" onClick={reset}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.05 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              {t('duvidas.sucesso.nova_consulta')}
            </motion.button>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="dv-pagina">
      <div className="hma-bg-orb hma-bg-orb--1" /><div className="hma-bg-orb hma-bg-orb--2" />
      <div className="dv-inner">

        <motion.p
          className="pagina-topo-label"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.0 }}
        >
          {t('hae.subtitulo_topo')}
        </motion.p>

        <motion.h1 className="dv-titulo" {...fadeUp(0.15)}>
          {t('duvidas.titulo1')}{' '}
          <span>{t('duvidas.titulo2')}</span>
        </motion.h1>
        <motion.div className="dv-divisor" initial={{ width: 0, opacity: 0 }} whileInView={{ width: 60, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} />
        <motion.p className="dv-subtitulo" {...fadeUp(0.35)}>
          {t('duvidas.sub')}
        </motion.p>

        <div className="dv-categorias">
          {CATEGORIAS_BASE.map((cat, i) => {
            const isOpen = selectedCategory?.id === cat.id
            return (
              <motion.div key={cat.id} className={`dv-cat${isOpen ? ' dv-cat--open' : ''}`}
                style={{ '--dv-accent': `var(${cat.accentVar})` }} {...fadeUp(0.1 + i * 0.07)}>
                <button className="dv-cat__header" onClick={() => handleCategoryClick(cat)} aria-expanded={isOpen}>
                  <span className="dv-cat__icon-wrap"><cat.Icon className="dv-cat__icon" /></span>
                  <span className="dv-cat__titulo">{t(`duvidas.categorias.${cat.chave}`)}</span>
                  <motion.span className="dv-cat__chevron" animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FaChevronDown />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div key="lista" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                      <ul className="dv-cat__opcoes">
                        {cat.opcoes.map((chave, j) => {
                          const isExpanded = expandedOption === chave
                          return (
                            <motion.li key={chave} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.28, delay: j * 0.06 }}>
                              <button className={`dv-opcao${isExpanded ? ' dv-opcao--ativa' : ''}${formOption === chave ? ' dv-opcao--selected' : ''}`}
                                onClick={() => handleOptionClick(chave)}>
                                <FaCircle className="dv-opcao__dot" />
                                <span className="dv-opcao__texto">{t(`duvidas.opcoes.${chave}`)}</span>
                                <motion.span className="dv-opcao__seta" animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.25 }}>
                                  <FaArrowRight />
                                </motion.span>
                              </button>
                              <AnimatePresence initial={false}>
                                {isExpanded && <DetalhePanel key="detalhe" chave={chave} onContact={handleContact} />}
                              </AnimatePresence>
                            </motion.li>
                          )
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <AnimatePresence>
          {formOption && (
            <motion.div className="dv-form" key="form"
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <div className="dv-form__deco" />

              <div className="dv-form__badge-row">
                {selectedCategory && (
                  <span className="dv-form__badge">
                    <selectedCategory.Icon /> {t(`duvidas.opcoes.${formOption}`)}
                  </span>
                )}
                <button className="dv-form__trocar" onClick={() => setFormOption(null)}>
                  {t('duvidas.trocar_assunto')}
                </button>
              </div>

              <div className="dv-form__grid">
                <div className="dv-campo">
                  <label className="dv-campo__label">{t('duvidas.form.nome_label')}</label>
                  <input className="dv-campo__input" type="text" placeholder={t('duvidas.form.nome_placeholder')} value={name} onChange={e => setName(e.target.value)} disabled={sending} />
                </div>
                <div className="dv-campo">
                  <label className="dv-campo__label">{t('duvidas.form.whats_label')}</label>
                  <input className="dv-campo__input" type="tel" placeholder="(XX) XXXXX-XXXX" value={phone} onChange={e => setPhone(e.target.value)} disabled={sending} />
                </div>
                <div className="dv-campo dv-campo--full">
                  <label className="dv-campo__label">{t('duvidas.form.descricao_label')}</label>
                  <textarea className="dv-campo__input dv-campo__textarea" rows={4} placeholder={t('duvidas.form.descricao_placeholder')} value={message} onChange={e => setMessage(e.target.value)} disabled={sending} />
                </div>
              </div>

              <AnimatePresence>
                {sendError && (
                  <motion.div className="dv-form__erro" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <FaExclamationTriangle />
                    <span>{t('duvidas.form.erro')}</span>
                    <a className="dv-form__erro-wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp /> {t('duvidas.form.abrir_whatsapp')}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                className={`dv-btn-submit${name && phone && !sending ? ' dv-btn-submit--ativo' : ''}${sending ? ' dv-btn-submit--sending' : ''}`}
                onClick={handleSubmit}
                disabled={!name || !phone || sending}
                whileHover={name && phone && !sending ? { scale: 1.02, y: -2 } : {}}
                whileTap={name && phone && !sending ? { scale: 0.98 } : {}}
              >
                {sending
                  ? <><FaSpinner className="dv-spinner" /> {t('duvidas.form.enviando')}</>
                  : t('duvidas.form.enviar')
                }
              </motion.button>

              {name && phone && (
                <motion.a
                  className="dv-btn-whatsapp"
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <FaWhatsapp /> {t('duvidas.form.whatsapp_alt')}
                </motion.a>
              )}

              <p className="dv-form__privacidade">
                <FaLock className="dv-form__privacidade-icon" />
                {t('duvidas.form.privacidade')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  )
}
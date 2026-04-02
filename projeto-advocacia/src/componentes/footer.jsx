import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTimes } from 'react-icons/fa'
import './footer.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
})

const WA_MSG = encodeURIComponent('Olá, seja bem-vindo(a) a HAEFFNER MARINHO ADVOGADOS, é uma satisfação poder ajudar. Deixe sua mensagem que logo entraremos em contato. Obrigado')
const WA_URL = `https://wa.me/5541998387397?text=${WA_MSG}`

function PrivacyModal({ onClose }) {
  const { t } = useTranslation()

  const itens = [
    { titulo: t('footer.privacidade_modal.quem_somos_titulo'),    texto: t('footer.privacidade_modal.quem_somos_texto') },
    { titulo: t('footer.privacidade_modal.dados_titulo'),          texto: t('footer.privacidade_modal.dados_texto') },
    { titulo: t('footer.privacidade_modal.uso_titulo'),            texto: t('footer.privacidade_modal.uso_texto') },
    { titulo: t('footer.privacidade_modal.direitos_titulo'),       texto: t('footer.privacidade_modal.direitos_texto') },
    { titulo: t('footer.privacidade_modal.seguranca_titulo'),      texto: t('footer.privacidade_modal.seguranca_texto') },
    {
      titulo: t('footer.privacidade_modal.contato_titulo'),
      texto: (
        <>{t('footer.privacidade_modal.contato_texto')}{' '}
          <a href="mailto:contato@haeffnermarinho.adv.br" className="privacy-modal-email">
            contato@haeffnermarinho.adv.br
          </a>
        </>
      )
    },
  ]

  return (
    <AnimatePresence>
      <motion.div
        className="privacy-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="privacy-modal"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
        >
          <div className="privacy-modal-top-line" />

          <button className="privacy-modal-close" onClick={onClose} aria-label={t('footer.privacidade_modal.fechar')}>
            <FaTimes />
          </button>

          <div className="privacy-modal-header">
            <span className="privacy-modal-eyebrow">{t('footer.privacidade_modal.eyebrow')}</span>
            <h2 className="privacy-modal-title">{t('footer.privacidade_modal.titulo')}</h2>
            <div className="privacy-modal-ornamento">
              <span className="privacy-modal-linha" />
              <span className="privacy-modal-diamond" />
              <span className="privacy-modal-linha" />
            </div>
          </div>

          <div className="privacy-modal-body">
            {itens.map(({ titulo, texto }, i) => (
              <motion.div
                key={titulo}
                className="privacy-modal-item"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="privacy-modal-item-diamond">◆</span>
                <div>
                  <span className="privacy-modal-item-titulo">{titulo}: </span>
                  <span className="privacy-modal-item-texto">{texto}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="privacy-modal-bottom-line" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function Footer() {
  const { t } = useTranslation()
  const ano = new Date().getFullYear()
  const [privacyOpen, setPrivacyOpen] = useState(false)

  return (
    <footer className="footer">
      <motion.div className="footer-particle footer-particle--1"
        animate={{ y: [0, -18, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="footer-particle footer-particle--2"
        animate={{ y: [0, -12, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <motion.div className="footer-particle footer-particle--3"
        animate={{ y: [0, -22, 0], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="footer-top-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="footer-inner">

        {/* ── Brand ── */}
        <motion.div className="footer-col footer-col--brand" {...fadeUp(0)}>
          <div className="footer-logo">
            <img
              src="/advocacia/logocentro.png"
              alt="Logo Haeffner Marinho"
              className="footer-logo-imagem"
            />
            <div className="footer-logo-text">
              <span className="footer-logo-nome">Haeffner Marinho</span>
              <span className="footer-logo-sub">{t('header.oab')}</span>
            </div>
          </div>
          <p className="footer-tagline">{t('footer.tagline')}</p>
          <div className="footer-social">
            {[
              { href: 'https://www.facebook.com/haeffnermarinhoadvogados', icon: <FaFacebook />, label: 'Facebook' },
              { href: 'https://www.instagram.com/haeffnermarinho.adv/', icon: <FaInstagram />, label: 'Instagram' },
              { href: WA_URL, icon: <FaWhatsapp />, label: 'WhatsApp' },
              { href: 'https://www.youtube.com/@haeffnermarinhoadvogados', icon: <FaYoutube />, label: 'YouTube' },
              { href: 'https://www.linkedin.com/in/haeffnermarinho/', icon: <FaLinkedin />, label: 'LinkedIn' },
            ].map(({ href, icon, label }, i) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ scale: 1.2, y: -3 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ── Navegação ── */}
        <motion.div className="footer-col" {...fadeUp(0.15)}>
          <h4 className="footer-col-titulo">{t('footer.navegacao')}</h4>
          <motion.div className="footer-col-linha"
            initial={{ width: 0 }} whileInView={{ width: 32 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}
          />
          <nav className="footer-nav">
            {[
              { labelKey: 'nav.inicio',   to: '/' },
              { labelKey: 'nav.sobre',    to: '/sobre' },
              { labelKey: 'nav.nucleos',  to: '/nucleos' },
              { labelKey: 'nav.atuacao',  to: '/atuacao' },
              { labelKey: 'nav.duvidas',  to: '/duvidas' },
              { labelKey: 'nav.agende',   to: '/agende' },
            ].map(({ labelKey, to }, i) => (
              <motion.div
                key={labelKey}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
              >
                <Link to={to} className="footer-nav-link">
                  <span className="footer-nav-diamond">◆</span>
                  {t(labelKey)}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>

        {/* ── Contato ── */}
        <motion.div className="footer-col" {...fadeUp(0.3)}>
          <h4 className="footer-col-titulo">{t('footer.contato')}</h4>
          <motion.div className="footer-col-linha"
            initial={{ width: 0 }} whileInView={{ width: 32 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
          />
          <div className="footer-contatos">
            <a href="tel:4130180887" className="footer-contato-item">
              <FaPhone className="footer-contato-icone" />
              <span>(41) 3018.0887</span>
            </a>
            <a href="tel:41998387397" className="footer-contato-item">
              <FaPhone className="footer-contato-icone" />
              <span>(41) 99838.7397</span>
            </a>
            <a href="mailto:contato@haeffnermarinho.adv.br" className="footer-contato-item">
              <FaEnvelope className="footer-contato-icone" />
              <span>contato@haeffnermarinho.adv.br</span>
            </a>
            <div className="footer-contato-item footer-contato-item--no-link">
              <FaMapMarkerAlt className="footer-contato-icone" />
              <span>{t('footer.endereco')}</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── Banner atuação ── */}
      <motion.div
        className="footer-atuacao-banner"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="footer-atuacao-ornament">◆</span>
        <p className="footer-atuacao-tag">
          {t('footer.atuacao_linha1')} · {t('footer.atuacao_linha2')}
          <br />
          <span className="footer-atuacao-aviso">{t('footer.aviso_legal')}</span>
        </p>
        <span className="footer-atuacao-ornament">◆</span>
      </motion.div>

      <motion.div
        className="footer-bottom-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
      />

      {/* ── Copyright ── */}
      <motion.div className="footer-copyright" {...fadeUp(0.4)}>
        <p>© {ano} Haeffner Marinho Advogados. {t('footer.direitos')}</p>
        <p>Haeffner Marinho – {t('footer.sociedade')} – CNPJ Nº 65.144.536/0001-26</p>
        <button
          className="footer-privacidade-link footer-privacidade-btn"
          onClick={() => setPrivacyOpen(true)}
          type="button"
        >
          {t('footer.privacidade')}
        </button>
        <div className="footer-ornamento">
          <span className="footer-ornamento-linha" />
          <span className="footer-ornamento-diamond" />
          <span className="footer-ornamento-linha" />
        </div>
      </motion.div>

      {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
    </footer>
  )
}

export default Footer
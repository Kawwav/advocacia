import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import './footer.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
})

function Footer() {
  const { t } = useTranslation()
  const ano = new Date().getFullYear()

  return (
    <footer className="footer">

      {/* Partículas decorativas */}
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

      {/* Linha superior decorativa */}
      <motion.div
        className="footer-top-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="footer-inner">

        {/* ── Coluna Logo ── */}
        <motion.div className="footer-col footer-col--brand" {...fadeUp(0)}>
          <div className="footer-logo">
            <span className="footer-logo-icone">hm</span>
            <div className="footer-logo-text">
              <span className="footer-logo-nome">Haeffner Marinho</span>
              <span className="footer-logo-sub">{t('header.oab', 'OAB/PR')}</span>
            </div>
          </div>
          <p className="footer-tagline">
            {t('footer.tagline', 'Advocacia com ética, excelência e visão multidisciplinar.')}
          </p>
          <div className="footer-social">
            {[
              { href: 'https://www.facebook.com/haeffnermarinhoadvogados', icon: <FaFacebook />, label: 'Facebook' },
              { href: 'https://www.instagram.com/haeffnermarinho.adv/', icon: <FaInstagram />, label: 'Instagram' },
              { href: 'https://wa.me/5541998387397', icon: <FaWhatsapp />, label: 'WhatsApp' },
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

        {/* ── Coluna Navegação ── */}
        <motion.div className="footer-col" {...fadeUp(0.15)}>
          <h4 className="footer-col-titulo">{t('footer.navegacao', 'Navegação')}</h4>
          <motion.div className="footer-col-linha"
            initial={{ width: 0 }} whileInView={{ width: 32 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}
          />
          <nav className="footer-nav">
            {[
              { label: t('nav.inicio', 'Início'), href: '/#inicio' },
              { label: t('nav.hma', 'Sobre'), href: '/hma' },
              { label: t('nav.nucleos', 'Núcleos'), href: '/#nucleos' },
              { label: t('nav.atuacao', 'Atuação'), href: '/#atuacao' },
              { label: t('nav.duvidas', 'Dúvidas'), href: '/#duvidas' },
              { label: t('nav.contato', 'Contato'), href: '/#contato' },
            ].map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                className="footer-nav-link"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                whileHover={{ x: 6, color: '#C9A84C' }}
              >
                <span className="footer-nav-diamond">◆</span>
                {label}
              </motion.a>
            ))}
          </nav>
        </motion.div>

        {/* ── Coluna Contato ── */}
        <motion.div className="footer-col" {...fadeUp(0.3)}>
          <h4 className="footer-col-titulo">{t('footer.contato', 'Contato')}</h4>
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
            <a href="mailto:armando@haeffnermarinho.adv.br" className="footer-contato-item">
              <FaEnvelope className="footer-contato-icone" />
              <span>armando@haeffnermarinho.adv.br</span>
            </a>
            <div className="footer-contato-item footer-contato-item--no-link">
              <FaMapMarkerAlt className="footer-contato-icone" />
              <span>Av. Cândido Hartmann, 1326<br />Mercês · Curitiba — PR · Brasil</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── Linha divisória + Copyright ── */}
      <motion.div
        className="footer-bottom-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
      />

      <motion.div className="footer-copyright" {...fadeUp(0.4)}>
        <p>© {ano} Haeffner Marinho Advogados. {t('footer.direitos', 'Todos os direitos reservados.')}</p>
        <p>Haeffner Marinho – Sociedade Individual de Advocacia – CNPJ Nº 65.144.536/0001-26</p>
        <a href="/politica-de-privacidade" className="footer-privacidade-link">
          {t('footer.privacidade', 'Política de Privacidade')}
        </a>
        <div className="footer-ornamento">
          <span className="footer-ornamento-linha" />
          <span className="footer-ornamento-diamond" />
          <span className="footer-ornamento-linha" />
        </div>
      </motion.div>

    </footer>
  )
}

export default Footer
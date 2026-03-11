import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa'
import './Header.css'

const NAV_ROTAS  = { inicio: '/', sobre: '/sobre', duvidas: '/duvidas', contato : '/contato' }
const NAV_KEYS   = ['inicio', 'sobre', 'nucleos', 'atuacao', 'duvidas', 'contato']
const NAV_ANCHORS= ['inicio', 'sobre', 'nucleos', 'atuacao', 'duvidas', 'contato']

function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const { t, i18n } = useTranslation()

  const alternarMenu = () => setMenuAberto(prev => !prev)
  const fecharMenu   = () => setMenuAberto(false)
  const trocarIdioma = (lang) => i18n.changeLanguage(lang)
  const idiomaAtual  = i18n.language?.startsWith('en') ? 'en' : 'pt'

  return (
    <header className="header-container">

      <div className="top-bar">
        <div className="contact-info">
          <a href="tel:4198387397" aria-label="Telefone" className="contact-link">
            <FaPhone className="contact-icon" />
            <span className="contact-text">41.99838.7397</span>
          </a>
          <a href="mailto:armando@haeffnermarinho.adv.br" aria-label="E-mail" className="contact-link">
            <FaEnvelope className="contact-icon" />
            <span className="contact-text">armando@haeffnermarinho.adv.br</span>
          </a>
        </div>

        <div className="top-bar-right">
          <div className="language-switcher">
            <button className={`lang-btn ${idiomaAtual === 'pt' ? 'ativo' : ''}`} onClick={() => trocarIdioma('pt')} aria-label="Português" title="Português">PT</button>
            <button className={`lang-btn ${idiomaAtual === 'en' ? 'ativo' : ''}`} onClick={() => trocarIdioma('en')} aria-label="English"    title="English"   >EN</button>
          </div>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="header-main">

        <div className="logo-area">
          <div className="logo-texto">
            <div className="logo-nome">Haeffner Marinho</div>
            <div className="logo-subtexto">
              <span className="logo-oab">OAB/PR 94.793</span>
              <span className="logo-advogados">ADVOGADOS</span>
            </div>
            <div className="logo-divisor" />
            <div className="logo-rodape">ADVOCACIA E CONSULTORIA JURÍDICA</div>
          </div>
        </div>

        <div className="logo-centro">
          <img
            src="/advocacia/logodourado1.png"
            alt="Logo Haeffner Marinho"
            className="logo-imagem-centro"
          />
        </div>

        <button
          className={`menu-hamburguer ${menuAberto ? 'aberto' : ''}`}
          onClick={alternarMenu}
          aria-label="Abrir menu"
          aria-expanded={menuAberto}
        >
          <span /><span /><span />
        </button>

        <nav className={`header-nav ${menuAberto ? 'aberto' : ''}`}>
          {NAV_KEYS.map((key, i) => (
            NAV_ROTAS[key] ? (
              <Link key={key} to={NAV_ROTAS[key]} style={{ '--i': i }} onClick={fecharMenu}>
                <span className="nav-label">{t(`nav.${key}`)}</span>
                <span className="nav-glow" aria-hidden="true" />
              </Link>
            ) : (
              <a key={key} href={`#${NAV_ANCHORS[i]}`} style={{ '--i': i }} onClick={fecharMenu}>
                <span className="nav-label">{t(`nav.${key}`)}</span>
                <span className="nav-glow" aria-hidden="true" />
              </a>
            )
          ))}
        </nav>

      </div>

    </header>
  )
}

export default Header
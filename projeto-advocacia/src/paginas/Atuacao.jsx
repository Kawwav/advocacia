import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  LuHouse, LuHeart, LuFileText, LuBuilding2,
  LuCalculator, LuLock, LuWifi, LuShoppingCart,
  LuHardHat, LuAward
} from 'react-icons/lu'
import './Atuacao.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
})

const AREAS_BASE = [
  { chave: 'imobiliario',    icone: LuHouse,        numero: '01' },
  { chave: 'familia',        icone: LuHeart,        numero: '02' },
  { chave: 'contratual',     icone: LuFileText,     numero: '03' },
  { chave: 'empresarial',    icone: LuBuilding2,    numero: '04' },
  { chave: 'tributario',     icone: LuCalculator,   numero: '05' },
  { chave: 'compliance',     icone: LuLock,         numero: '06' },
  { chave: 'digital',        icone: LuWifi,         numero: '07' },
  { chave: 'consumidor',     icone: LuShoppingCart, numero: '08' },
  { chave: 'trabalho',       icone: LuHardHat,      numero: '09' },
  { chave: 'previdenciario', icone: LuAward,        numero: '10' },
]

function AreaCard({ area, index }) {
  const { t } = useTranslation()
  const Icone = area.icone
  const tags = t(`atu.${area.chave}.tags`, { returnObjects: true })

  return (
    <motion.article
      className="atu-card"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="atu-card-topo">
        <span className="atu-card-numero">{area.numero}</span>
        <div className="atu-card-icone-wrapper">
          <Icone className="atu-card-icone" />
        </div>
      </div>
      <div className="atu-card-linha" />
      <h2 className="atu-card-titulo">{t(`atu.${area.chave}.titulo`)}</h2>
      <p className="atu-card-descricao">{t(`atu.${area.chave}.descricao`)}</p>
      <div className="atu-card-tags">
        {Array.isArray(tags) && tags.map(tag => (
          <span key={tag} className="atu-tag">{tag}</span>
        ))}
      </div>
      <div className="atu-canto atu-canto--tl" />
      <div className="atu-canto atu-canto--br" />
    </motion.article>
  )
}

function Atuacao() {
  const { t } = useTranslation()

  const linha1 = AREAS_BASE.slice(0, 3)
  const linha2 = AREAS_BASE.slice(3, 6)
  const linha3 = AREAS_BASE.slice(6, 9)
  const linha4 = AREAS_BASE.slice(9)

  return (
    <main className="atu-pagina">
        <div className="atu-orb atu-orb--1" />
        <div className="atu-orb atu-orb--2" />
        <div className="atu-orb atu-orb--3" />
        <div className="atu-inner">

          <motion.p
            className="pagina-topo-label"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.0 }}
          >
            {t('hae.subtitulo_topo')}
          </motion.p>

          <motion.p className="atu-eyebrow" {...fadeUp(0.05)} />

          <motion.h1 className="atu-titulo" {...fadeUp(0.15)}>
            {t('atu.titulo')} <span>{t('atu.titulo2')}</span>
          </motion.h1>

          <motion.div
            className="atu-divisor"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 72, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          />

          <motion.div className="atu-intro" {...fadeUp(0.35)}>
            <p className="atu-intro-texto">
              {t('atu.intro_pre')}<span style={{ color: '#C9A84C', fontWeight: 600 }}>HAEFFNER MARINHO ADVOGADOS</span>{t('atu.intro_pos')}
            </p>
          </motion.div>

          <motion.div
            className="atu-foto-wrapper"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="atu-foto-moldura">
              <div className="atu-foto-canto atu-foto-canto--tl" />
              <div className="atu-foto-canto atu-foto-canto--tr" />
              <div className="atu-foto-canto atu-foto-canto--bl" />
              <div className="atu-foto-canto atu-foto-canto--br" />
              <div className="atu-foto-overlay" />
              <img src="/acao.jpg" alt="Haeffner Marinho Advogados em ação" className="atu-foto" />
            </div>
            <div className="atu-foto-legenda">
              <span className="atu-foto-legenda-linha" />
              <span className="atu-foto-legenda-linha" />
            </div>
          </motion.div>

          <div className="atu-grade">
            <div className="atu-linha atu-linha--3">
              {linha1.map((a, i) => <AreaCard key={a.chave} area={a} index={i} />)}
            </div>
            <div className="atu-linha atu-linha--3">
              {linha2.map((a, i) => <AreaCard key={a.chave} area={a} index={i} />)}
            </div>
            <div className="atu-linha atu-linha--3">
              {linha3.map((a, i) => <AreaCard key={a.chave} area={a} index={i} />)}
            </div>
            <div className="atu-linha atu-linha--1">
              {linha4.map((a, i) => <AreaCard key={a.chave} area={a} index={i} />)}
            </div>
          </div>

          <motion.div
            className="atu-divisor atu-divisor--centro"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '100%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
          />

          <motion.div className="atu-contato" {...fadeUp(0.2)}>
            <p className="atu-contato-chamada">
              {t('atu.contato.chamada')}
            </p>
            <a href="mailto:armando@haeffnermarinho.adv.br" className="atu-contato-email">
              armando@haeffnermarinho.adv.br
            </a>
            <p className="atu-contato-nome">Armando Haeffner Marinho Neto</p>
            <p className="atu-contato-oab">OAB/PR 94.793</p>
          </motion.div>

        </div>
      </main>
  )
}

export default Atuacao
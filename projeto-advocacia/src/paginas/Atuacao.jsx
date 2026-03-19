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

const AREAS = [
  {
    chave: 'imobiliario', icone: LuHouse, numero: '01',
    titulo: 'Direito Imobiliário',
    descricao: 'Compra e venda de imóveis, locação, usucapião e regularização de escrituras. Auxílio em contratos de compra, venda e locação, além de regularização de imóveis.',
    tags: ['Compra & Venda', 'Locação', 'Usucapião'],
  },
  {
    chave: 'familia', icone: LuHeart, numero: '02',
    titulo: 'Direito de Família e Sucessões',
    descricao: 'Divórcios, pensão alimentícia, guarda de filhos e inventários. Atuação humanizada em momentos delicados, com foco em soluções consensuais e proteção dos interesses familiares.',
    tags: ['Divórcio', 'Guarda', 'Inventário'],
  },
  {
    chave: 'contratual', icone: LuFileText, numero: '03',
    titulo: 'Direito Contratual',
    descricao: 'Elaboração e análise técnica de contratos comerciais, termos de uso e parcerias. Segurança jurídica em cada cláusula para proteger seus interesses nos negócios.',
    tags: ['Contratos', 'Termos de Uso', 'Parcerias'],
  },
  {
    chave: 'empresarial', icone: LuBuilding2, numero: '04',
    titulo: 'Direito Empresarial e Societário',
    descricao: 'Constituição de empresas, acordos entre sócios e recuperação judicial. Estrutura jurídica sólida para o crescimento seguro e sustentável do seu negócio.',
    tags: ['Constituição', 'Acordos', 'Recuperação Judicial'],
  },
  {
    chave: 'tributario', icone: LuCalculator, numero: '05',
    titulo: 'Direito Tributário',
    descricao: 'Planejamento fiscal para redução legal de impostos e defesas contra autuações. Inteligência tributária para preservar o patrimônio e otimizar a carga fiscal.',
    tags: ['Planejamento Fiscal', 'Defesa Tributária', 'Impostos'],
  },
  {
    chave: 'compliance', icone: LuLock, numero: '06',
    titulo: 'Compliance e LGPD',
    descricao: 'Adequação à Lei Geral de Proteção de Dados, fundamental para empresas que lidam com dados de clientes. Gestão de riscos e implementação de políticas de conformidade.',
    tags: ['LGPD', 'Compliance', 'Proteção de Dados'],
  },
  {
    chave: 'digital', icone: LuWifi, numero: '07',
    titulo: 'Direito Digital',
    descricao: 'Adequação à Lei Geral de Proteção de Dados — muito procurado hoje por empresas de todos os tamanhos. Assessoria jurídica no ambiente digital e proteção de ativos digitais.',
    tags: ['Direito Digital', 'LGPD', 'Tecnologia'],
  },
  {
    chave: 'consumidor', icone: LuShoppingCart, numero: '08',
    titulo: 'Direito do Consumidor',
    descricao: 'Ações contra bancos, empresas de telefonia, aéreas e problemas com compras online. Defesa eficaz dos seus direitos como consumidor perante grandes corporações.',
    tags: ['Bancos', 'Telefonia', 'Compras Online'],
  },
  {
    chave: 'trabalho', icone: LuHardHat, numero: '09',
    titulo: 'Direito do Trabalho',
    descricao: 'Reclamações trabalhistas, reversão de justa causa e verbas rescisórias. Defesa de direitos trabalhistas, rescisões e indenizações com estratégia e combatividade.',
    tags: ['Reclamações', 'Rescisão', 'Indenizações'],
  },
  {
    chave: 'previdenciario', icone: LuAward, numero: '10',
    titulo: 'Direito Previdenciário',
    descricao: 'Aposentadorias, auxílio-doença e revisões de benefício. Assessoria especializada para garantir que você receba todos os benefícios previdenciários a que tem direito.',
    tags: ['Aposentadoria', 'Auxílio-Doença', 'Revisão de Benefício'],
  },
]

function AreaCard({ area, index }) {
  const Icone = area.icone
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
      <h2 className="atu-card-titulo">{area.titulo}</h2>
      <p className="atu-card-descricao">{area.descricao}</p>
      <div className="atu-card-tags">
        {area.tags.map(tag => (
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

  const linha1 = AREAS.slice(0, 3)
  const linha2 = AREAS.slice(3, 6)
  const linha3 = AREAS.slice(6, 9)
  const linha4 = AREAS.slice(9)

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
            ADVOCACIA E CONSULTORIA JURÍDICA
          </motion.p>

          <motion.p className="atu-eyebrow" {...fadeUp(0.05)} />

          <motion.h1 className="atu-titulo" {...fadeUp(0.15)}>
            {t('atu.titulo', 'Áreas de')} <span>{t('atu.titulo2', 'Atuação')}</span>
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
              {t('atu.intro', 'Atuação jurídica multidisciplinar com foco em resultados. Na Haeffner Marinho Advogados, unimos expertise técnica e visão estratégica para oferecer soluções completas, protegendo seus interesses desde as relações familiares e patrimoniais até os desafios do ambiente corporativo e digital.')}
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
              <img src="/advocacia/acao.jpg" alt="Haeffner Marinho Advogados em ação" className="atu-foto" />
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
              {t('atu.contato.chamada', 'Sua situação se enquadra em alguma dessas áreas?')}
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
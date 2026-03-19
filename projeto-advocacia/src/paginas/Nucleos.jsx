import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { LuBriefcase, LuBuilding2, LuSword, LuShield, LuGem } from 'react-icons/lu'
import './Nucleos.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
})

const NUCLEOS = [
  {
    numero: '01',
    chave: 'corporativo',
    icone: LuBriefcase,
    titulo: 'Direito Corporativo',
    subtitulo: 'Business Strategy',
    tag: 'Estruturação & Governança',
    descricao:
      'A inteligência jurídica a serviço do crescimento. Unimos a visão do "chão de fábrica" à estratégia de alta gestão. Atuamos na estruturação de negócios, governança e contratos complexos, garantindo que o arcabouço legal da sua empresa seja um motor de expansão, não um obstáculo.',
  },
  {
    numero: '02',
    chave: 'imobiliario',
    icone: LuBuilding2,
    titulo: 'Direito Imobiliário',
    subtitulo: 'e Patrimonial',
    tag: 'Ativos & Transações',
    descricao:
      'Segurança máxima para ativos de alto valor. Especialidade na estruturação de transações imobiliárias, incorporações e regularização de ativos. Protegemos a propriedade e garantimos que cada investimento imobiliário esteja blindado contra inseguranças jurídicas e riscos de mercado.',
  },
  {
    numero: '03',
    chave: 'conflitos',
    icone: LuSword,
    titulo: 'Gestão Estratégica',
    subtitulo: 'de Conflitos',
    tag: 'Contencioso & Mediação',
    descricao:
      'A saída mais inteligente para crises complexas. Atuamos no contencioso cível com foco resolutivo. Gerenciamos conflitos de forma tática, priorizando métodos consensuais e agilidade processual para minimizar desgastes e maximizar resultados favoráveis aos nossos constituintes.',
  },
  {
    numero: '04',
    chave: 'penal',
    icone: LuShield,
    titulo: 'Direito Penal Econômico',
    subtitulo: 'e Liberdade',
    tag: 'Defesa & Proteção',
    descricao:
      'Defesa implacável em cenários de alta sensibilidade. Proteção rigorosa da liberdade e da imagem em questões que envolvem crimes econômicos e complexidades do Direito Penal moderno. Atuamos com discrição, combatividade e técnica superior na preservação dos direitos fundamentais.',
  },
  {
    numero: '05',
    chave: 'sucessorio',
    icone: LuGem,
    titulo: 'Planejamento Sucessório',
    subtitulo: 'e Holding',
    tag: 'Patrimônio & Legado',
    descricao:
      'A confiança que atravessa gerações. Estruturamos a preservação e a transição do patrimônio familiar com inteligência tributária e jurídica. Criamos soluções que evitam inventários morosos, protegem o legado e garantem a harmonia e a liquidez para os sucessores.',
  },
]

function NucleoCard({ nucleo, index }) {
  const par = index % 2 === 0
  const Icone = nucleo.icone

  return (
    <motion.article
      className={`nuc-card ${par ? 'nuc-card--par' : 'nuc-card--impar'}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nuc-card-numero">{nucleo.numero}</div>
      <div className="nuc-card-linha-lateral" />
      <div className="nuc-card-corpo">
        <div className="nuc-card-icone-wrapper">
          <Icone className="nuc-card-icone" />
        </div>
        <span className="nuc-card-tag">{nucleo.tag}</span>
        <h2 className="nuc-card-titulo">
          {nucleo.titulo}{' '}
          <span>{nucleo.subtitulo}</span>
        </h2>
        <motion.div
          className="nuc-card-divisor"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 48, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        />
        <p className="nuc-card-descricao">{nucleo.descricao}</p>
        <div className="nuc-canto nuc-canto--tl" />
        <div className="nuc-canto nuc-canto--br" />
      </div>
    </motion.article>
  )
}

function Nucleos() {
  const { t } = useTranslation()

  return (
    <main className="nuc-pagina">

        <div className="nuc-orb nuc-orb--1" />
        <div className="nuc-orb nuc-orb--2" />
        <div className="nuc-orb nuc-orb--3" />

        <div className="nuc-inner">

          <motion.p
            className="pagina-topo-label"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.0 }}
          >
            ADVOCACIA E CONSULTORIA JURÍDICA
          </motion.p>

          <motion.p className="nuc-eyebrow" {...fadeUp(0.05)} />

          <motion.h1 className="nuc-titulo" {...fadeUp(0.15)}>
            {t('nuc.titulo', 'Núcleos de')} <span>{t('nuc.titulo2', 'Atuação')}</span>
          </motion.h1>

          <motion.div
            className="nuc-divisor"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 72, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          />

          <motion.div className="nuc-intro" {...fadeUp(0.35)}>
            <p className="nuc-intro-destaque">
              {t(
                'nuc.intro',
                'Operamos através de um ecossistema de núcleos jurídicos integrados. Essa estrutura nos permite oferecer uma resposta interdisciplinar ágil, garantindo segurança máxima em cada vertente do Direito.'
              )}
            </p>
          </motion.div>

          <motion.div
            className="nuc-foto-wrapper"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="nuc-foto-moldura">
              <div className="nuc-foto-canto nuc-foto-canto--tl" />
              <div className="nuc-foto-canto nuc-foto-canto--tr" />
              <div className="nuc-foto-canto nuc-foto-canto--bl" />
              <div className="nuc-foto-canto nuc-foto-canto--br" />
              <div className="nuc-foto-overlay" />
              <img src="/advocacia/reuniao.jpg" alt="Reunião Haeffner Marinho Advogados" className="nuc-foto" />
            </div>
            <div className="nuc-foto-legenda">
              <span className="nuc-foto-legenda-linha" />
              <span className="nuc-foto-legenda-linha" />
            </div>
          </motion.div>

          <div className="nuc-lista">
            <div className="nuc-linha nuc-linha--3">
              {NUCLEOS.slice(0, 3).map((nucleo, i) => (
                <NucleoCard key={nucleo.chave} nucleo={nucleo} index={i} />
              ))}
            </div>
            <div className="nuc-linha nuc-linha--2">
              {NUCLEOS.slice(3).map((nucleo, i) => (
                <NucleoCard key={nucleo.chave} nucleo={nucleo} index={i + 3} />
              ))}
            </div>
          </div>

          <motion.div
            className="nuc-divisor nuc-divisor--centro"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '100%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
          />

          <motion.div className="nuc-contato" {...fadeUp(0.2)}>
            <p className="nuc-contato-chamada">
              {t('nuc.contato.chamada', 'Identifique sua necessidade. Fale conosco.')}
            </p>
            <a href="mailto:armando@haeffnermarinho.adv.br" className="nuc-contato-email">
              armando@haeffnermarinho.adv.br
            </a>
            <p className="nuc-contato-nome">Armando Haeffner Marinho Neto</p>
            <p className="nuc-contato-oab">OAB/PR 94.793</p>
          </motion.div>

        </div>
      </main>
  )
}

export default Nucleos
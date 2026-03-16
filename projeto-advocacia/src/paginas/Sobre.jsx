import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import './Sobre.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
})

function Hma() {
  const { t } = useTranslation()

  return (
    <main className="hma-pagina">

      <div className="hma-bg-orb hma-bg-orb--1" />
      <div className="hma-bg-orb hma-bg-orb--2" />
      <div className="hma-inner">

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.0 }}
          style={{ fontFamily: "'Palatino Linotype', sans-serif", fontSize: '18px', 
            fontWeight: 600, letterSpacing: '5px', color: '#9A7A2E', textTransform: 'uppercase', textAlign: 'center', marginBottom: '24px', 
            opacity: 0.85 }}
        >
          ADVOCACIA E CONSULTORIA JURÍDICA
        </motion.p>

        <motion.p className="hma-eyebrow" {...fadeUp(0.05)}>
        </motion.p>

        <motion.h1 className="hma-titulo" {...fadeUp(0.15)}>
          {t('hma.titulo', 'Inovação e')} <span>{t('hma.titulo2', 'Compromisso')}</span>
        </motion.h1>

        <motion.div
          className="hma-divisor"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 72, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        />

        {/*bloco intro  */}
        <motion.div className="hma-coluna-texto" {...fadeUp(0.35)}>
          <p className="hma-paragrafo--destaque">
            A <span style={{ color: '#C9A84C', fontWeight: 600 }}>HAEFFNER MARINHO ADVOGADOS</span>{' '}
            {t(
              'hma.p1_resto',
              'nasce da convergência entre a tradição resiliente e a inovação estratégica. Inspirada em um legado de integridade, nossa essência foi moldada pela experiência prática de quem compreende o Direito não apenas nos códigos, mas no dinamismo do "chão de fábrica" e das complexas relações corporativas.'
            )}
          </p>
          <p className="hma-paragrafo">
            {t(
              'hma.p2',
              'À frente do escritório, busco traduzir a complexidade jurídica em segurança real. Com uma trajetória pautada pela resiliência e vivência no mundo dos negócios — da gestão industrial ao mercado imobiliário —, trago para a advocacia a visão estratégica de quem entende, na prática, o valor de um resultado seguro.'
            )}
          </p>
        </motion.div>

        {/*foto centralizada*/}
        <motion.div
          className="hma-foto-destaque-wrapper"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hma-foto-moldura hma-foto-moldura--wide">
            <div className="hma-foto-canto hma-foto-canto--tl" />
            <div className="hma-foto-canto hma-foto-canto--tr" />
            <div className="hma-foto-canto hma-foto-canto--bl" />
            <div className="hma-foto-canto hma-foto-canto--br" />
            <div className="hma-foto-overlay" />
            <img
              src="/advocacia/foto1.jpeg"
              alt="Armando Haeffner Marinho Neto"
              className="hma-foto hma-foto--wide"
            />
          </div>
          <div className="hma-foto-legenda hma-foto-legenda--wide">
            <span className="hma-foto-legenda-linha" />
            <span className="hma-foto-legenda-linha" />
          </div>
        </motion.div>

        <motion.div className="hma-coluna-texto hma-coluna-texto--pos-foto" {...fadeUp(0.2)}>
          <p className="hma-paragrafo">
            {t(
              'hma.p3',
              'Meu compromisso é garantir que cada cliente encontre não apenas representação jurídica, mas uma estratégia de defesa implacável e transparente. Antes de litigar, esgotaremos todas as ferramentas de resolução consensual, priorizando soluções ágeis.'
            )}
          </p>
          <p className="hma-paragrafo">
            {t(
              'hma.p4',
              'Entendemos que o Direito Moderno exige mais que técnica: exige visão interdisciplinar e agilidade. Aqui, cada demanda é tratada com o rigor de um especialista e a combatividade de quem entende que o patrocínio da liberdade e do patrimônio é um compromisso intrínseco à nossa essência.'
            )}
          </p>

          <motion.p
            className="hma-frase-combate"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('hma.combate', 'Estamos prontos para o combate.')}
          </motion.p>
        </motion.div>

        {/* divisor */}
        <motion.div
          className="hma-divisor hma-divisor--centro"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: '100%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
        />

        {/*cCard contato*/}
        <motion.div className="hma-contato-bloco" {...fadeUp(0.2)}>
          <p className="hma-contato-chamada">
            {t('hma.contato.chamada', 'Deseja falar diretamente comigo?')}
          </p>
          <p className="hma-contato-label">
            {t('hma.contato.label', 'Escreva para:')}
          </p>
          <a href="mailto:armando@haeffnermarinho.adv.br" className="hma-card-email hma-card-email--destaque">
            armando@haeffnermarinho.adv.br
          </a>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', letterSpacing: '2px', color: '#F8F5EF', textTransform: 'uppercase', marginTop: '20px', fontWeight: 500 }}>
            Armando Haeffner Marinho Neto
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '2px', color: '#C9A84C', textTransform: 'uppercase', marginTop: '4px', opacity: 0.7 }}>
            OAB/PR 94.793
          </p>
        </motion.div>

      </div>
    </main>
  )
}

export default Hma
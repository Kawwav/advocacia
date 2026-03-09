import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import './Hae.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
})

function Hae() {
  const { t } = useTranslation()
  return (
    <section id="home" className="heroi">
      {/* Decorative rings */}
      <motion.div
        className="heroi-decoracao"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: '50%', originY: '50%', top: '25%', left: '50%', x: '-50%', y: '-50%' }}
      />
      <motion.div
        className="heroi-decoracao"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: '50%', originY: '50%', top: '25%', left: '50%', x: '-50%', y: '-50%' }}
      />

      {/* Floating particles */}
      <motion.div
        style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', background: '#C9A84C', top: '30%', left: '20%', opacity: 0.4, zIndex: 0 }}
        animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{ position: 'absolute', width: 2, height: 2, borderRadius: '50%', background: '#C9A84C', top: '60%', right: '25%', opacity: 0.3, zIndex: 0 }}
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: '#C9A84C', top: '45%', left: '75%', opacity: 0.25, zIndex: 0 }}
        animate={{ y: [0, -25, 0], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="heroi-conteudo">

        {/* ── BLOCO PRINCIPAL ── */}
        <motion.p
          className="heroi-subtitulo-topo"
          {...fadeUp(0.2)}
          style={{ opacity: 0 }}
        >
          {t('hae.subtitulo', 'Advocacia e Consultoria Jurídica')}
        </motion.p>

        <motion.h1
          className="heroi-titulo"
          {...fadeUp(0.4)}
          style={{ opacity: 0 }}
        >
          Haeffner <span>Marinho</span><br />{t('hae.titulo', 'Advogados')}
        </motion.h1>

        <motion.div
          className="heroi-divisor"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 60, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          style={{ opacity: 0 }}
        />

        <motion.p
          className="heroi-descricao-intro"
          {...fadeUp(0.9)}
          style={{ opacity: 0 }}
        >
          {t(
            'hae.intro',
            'Fundado sob os pilares da ética e do rigor técnico, o escritório Haeffner Marinho Advogados oferece assessoria jurídica estratégica e personalizada. Nossa atuação é pautada pela busca incessante por soluções resolutivas, mitigando riscos e conferindo robustez jurídica às operações e demandas de nossos constituintes.'
          )}
        </motion.p>

        {/* ── IMAGEM CENTRAL ── */}
        <motion.div
          className="heroi-imagem-wrapper"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ opacity: 0 }}
        >
          <div className="heroi-imagem-canto heroi-imagem-canto--tl" />
          <div className="heroi-imagem-canto heroi-imagem-canto--tr" />
          <div className="heroi-imagem-canto heroi-imagem-canto--bl" />
          <div className="heroi-imagem-canto heroi-imagem-canto--br" />
          <div className="heroi-imagem-overlay" />
          <img
            src="/F6E99.png"
            alt="Haeffner Marinho Advogados"
            className="heroi-imagem"
          />
          <div className="heroi-imagem-legenda">
            <span className="heroi-imagem-legenda-linha" />
            <span className="heroi-imagem-legenda-linha" />
          </div>
        </motion.div>

        <motion.p
          className="heroi-descricao-complemento"
          {...fadeUp(1.3)}
          style={{ opacity: 0 }}
        >
          {t(
            'hae.complemento',
            'Com uma estrutura voltada ao atendimento de alta performance, unimos a tradição do saber jurídico à inovação necessária para enfrentar a complexidade das relações contemporâneas. Nosso foco é a entrega de resultados sólidos, fundamentados em uma análise técnica minuciosa e em uma visão holística do ordenamento jurídico.'
          )}
        </motion.p>

        <motion.a
          href="#areas"
          className="heroi-botao"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(201,168,76,0.35)' }}
          whileTap={{ scale: 0.97 }}
          style={{ opacity: 0, display: 'inline-block' }}
        >
          {t('hae.botao', 'Conheça Nossa Atuação')}
        </motion.a>

        {/* ── DIREITO EM MOVIMENTO ── */}
        <div className="hae-movimento-wrapper">

          <motion.div
            className="hae-movimento-topo"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hae-movimento-eyebrow">
              {t('hae.movimento.eyebrow', 'Direito em Movimento')}
            </p>
            <div className="hae-movimento-divisor" />
            <p className="hae-movimento-destaque">
              {t('hae.movimento.p1', 'A sociedade está em permanente movimento e o direito, como ferramenta de equilíbrio, acompanha essa evolução.')}
            </p>
          </motion.div>

          <motion.div
            className="hae-movimento-imagem-wrapper"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hae-movimento-imagem-canto hae-movimento-imagem-canto--tl" />
            <div className="hae-movimento-imagem-canto hae-movimento-imagem-canto--tr" />
            <div className="hae-movimento-imagem-canto hae-movimento-imagem-canto--bl" />
            <div className="hae-movimento-imagem-canto hae-movimento-imagem-canto--br" />
            <div className="hae-movimento-imagem-overlay" />
            <img
              src="/1.jpeg"
              alt="Direito em movimento"
              className="hae-movimento-imagem"
            />
            <div className="hae-movimento-imagem-legenda">
              <span className="hae-movimento-imagem-legenda-linha" />
              <span className="hae-movimento-imagem-legenda-linha" />
            </div>
          </motion.div>

          <motion.p
            className="hae-movimento-paragrafo"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('hae.movimento.p2', 'O direito moderno — e mais especificamente o contemporâneo — tornou-se um ecossistema complexo e interdisciplinar, caracterizado pela multiplicidade de normas, pela interação de diferentes ordenamentos jurídicos (nacional, internacional, privado) e pela necessidade de lidar com relações sociais, tecnológicas e econômicas cada vez mais intrincadas.')}
          </motion.p>

        </div>

      </div>

    </section>
  )
}

export default Hae
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import './Hae.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
})

function HaeImage({ src, alt, index }) {
  return (
    <motion.div className="hae-img-bloco"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hae-img-numero">0{index}</div>
      <div className="hae-img-wrapper">
        <div className="hae-img-canto hae-img-canto--tl" />
        <div className="hae-img-canto hae-img-canto--tr" />
        <div className="hae-img-canto hae-img-canto--bl" />
        <div className="hae-img-canto hae-img-canto--br" />
        <div className="hae-img-overlay" />
        <img src={src} alt={alt} className="hae-img" />
      </div>
      <div className="hae-img-barra">
        <span className="hae-img-barra-linha" />
        <span className="hae-img-barra-linha" />
      </div>
    </motion.div>
  )
}

function Hae() {
  const { t } = useTranslation()

  return (
    <section id="home" className="heroi">

      <div className="heroi-anel heroi-anel--1" />
      <div className="heroi-anel heroi-anel--2" />
      <div className="heroi-anel heroi-anel--3" />

      {[
        { s: 3, top: '28%', left: '12%', dur: 4.5 },
        { s: 2, top: '65%', left: '85%', dur: 5.5 },
        { s: 4, top: '42%', left: '78%', dur: 6 },
        { s: 2, top: '18%', left: '62%', dur: 7 },
      ].map((p, i) => (
        <motion.span key={i} className="heroi-particula"
          style={{ width: p.s, height: p.s, top: p.top, left: p.left }}
          animate={{ y: [0, -16, 0], opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
        />
      ))}

      <div className="heroi-conteudo">

        <motion.p className="heroi-eyebrow"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {t('hae.eyebrow', 'Seja bem-vindo (a) ao nosso escritório.')}
        </motion.p>

        <motion.h1 className="heroi-titulo"
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('hae.titulo_novo', 'Descomplique o Direito')}{' '}
          <span>{t('hae.titulo_sub', 'Soluções jurídicas para você')}</span>
        </motion.h1>

        <motion.div className="heroi-divisor"
          initial={{ width: 0, opacity: 0 }} animate={{ width: 72, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
        />

        <motion.div className="heroi-intro-bloco" {...fadeUp(0.5)}>
          <p className="heroi-paragrafo--destaque">
            {t('hae.intro_destaque',
              'Fundado sob os pilares da ética e do rigor técnico, o escritório Haeffner Marinho Advogados oferece assessoria jurídica estratégica e personalizada.'
            )}
          </p>
          <p className="heroi-paragrafo">
            {t('hae.intro',
              'Nossa atuação é pautada pela busca incessante por soluções resolutivas, mitigando riscos e conferindo robustez jurídica às operações de nossos constituintes.'
            )}
          </p>
        </motion.div>


        <HaeImage src="public/predio.jpeg" alt="Haeffner Marinho Advogados" index={1} />

        <motion.p className="heroi-texto" {...fadeUp(0)}>
          {t('hae.complemento',
            'Acreditamos que a segurança jurídica deve ser fundamentada na estratégia e na precisão. Por isso, convidamos você a conhecer nossa estrutura e a metodologia de ecossistema: uma abordagem moderna desenhada para proteger o que é essencial — sua liberdade e seu patrimônio.'
          )}
        </motion.p>

        <HaeImage src="public/predio2 (1).jpeg" alt="Escritório Haeffner Marinho" index={2} />

        <motion.div className="heroi-citacao" {...fadeUp(0)}>
          <div className="heroi-citacao-barra" />
          <div className="heroi-citacao-corpo">
            <p className="heroi-citacao-destaque">
              {t('hae.final.p1',
                'O Direito, enquanto ciência voltada à harmonia social, converge com as transformações da coletividade, provendo soluções jurídicas contemporâneas às novas complexidades do mundo moderno.'
              )}
            </p>
            <p className="heroi-citacao-texto">
              {t('hae.final.p2',
                'O Direito Moderno tornou-se um ecossistema complexo e interdisciplinar, caracterizado pela multiplicidade de normas, pela interação de diferentes ordenamentos jurídicos e pela necessidade de lidar com relações sociais, tecnológicas e econômicas cada vez mais intrincadas.'
              )}
            </p>
          </div>
        </motion.div>

        <motion.a href="#areas" className="heroi-botao" {...fadeUp(0)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="heroi-botao-texto">
            {t('hae.botao', 'Conheça Nossa Atuação')}
          </span>
          <span className="heroi-botao-seta">→</span>
        </motion.a>

      </div>
    </section>
  )
}

export default Hae
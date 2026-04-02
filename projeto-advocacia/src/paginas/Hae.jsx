import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
    <motion.div className={`hae-img-bloco hae-img-bloco--${index}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hae-img-numero">0{index}</div>

      {/* wrapper contém apenas a imagem + overlay + cantos */}
      <div className="hae-img-wrapper">
        <div className="hae-img-canto hae-img-canto--tl" />
        <div className="hae-img-canto hae-img-canto--tr" />
        <div className="hae-img-canto hae-img-canto--bl" />
        <div className="hae-img-canto hae-img-canto--br" />
        <div className="hae-img-overlay" />
        <img src={src} alt={alt} className="hae-img" />
      </div>

      {/* barra FORA do wrapper — cantos não precisam mais compensar a altura dela */}
      <div className="hae-img-barra">
        <span className="hae-img-barra-linha" />
        <span className="hae-img-barra-linha" />
      </div>
    </motion.div>
  )
}

function HaeLightbox({ src, alt, onClose }) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        className="hae-lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="hae-lightbox-conteudo"
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
        >
          <div className="hae-img-canto hae-img-canto--tl" />
          <div className="hae-img-canto hae-img-canto--tr" />
          <div className="hae-img-canto hae-img-canto--bl" />
          <div className="hae-img-canto hae-img-canto--br" />

          <img src={src} alt={alt} className="hae-lightbox-img" />

          <button className="hae-lightbox-fechar" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

function HaeGallery() {
  const images = [
    { src: '/advocacia/interior1.jpg', alt: 'Interior do escritório' },
    { src: '/advocacia/interior2.jpg', alt: 'Ambiente interno' },
    { src: '/advocacia/interior3.jpg', alt: 'Detalhes do escritório' },
  ]

  const [ativo, setAtivo] = useState(0)
  const [lightbox, setLightbox] = useState(null) // src da imagem aberta

  return (
    <motion.div className="hae-gallery-bloco"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hae-img-numero">02</div>

      <div className="hae-carrossel-wrapper">
        {/* cantos dourados */}
        <div className="hae-img-canto hae-img-canto--tl" />
        <div className="hae-img-canto hae-img-canto--tr" />
        <div className="hae-img-canto hae-img-canto--bl" />
        <div className="hae-img-canto hae-img-canto--br" />

        {/* todas as imagens empilhadas */}
        <div className="hae-carrossel-trilho">
          {images.map((img, i) => {
            const distancia = i - ativo
            const ehAtiva = distancia === 0
            const ehDistante = Math.abs(distancia) >= 2

            let translateX = '0%'
            let scale = 1
            let opacity = 1
            let zIndex = 10
            let blur = 0

            if (distancia === -1) { translateX = '-18%'; scale = 0.88; opacity = 0.35; zIndex = 5; blur = 2 }
            else if (distancia === 1)  { translateX = '18%';  scale = 0.88; opacity = 0.35; zIndex = 5; blur = 2 }
            else if (ehDistante)       { translateX = distancia < 0 ? '-30%' : '30%'; scale = 0.8; opacity = 0; zIndex = 1 }

            return (
              <motion.div
                key={i}
                className={`hae-carrossel-item${ehAtiva ? ' hae-carrossel-item--ativo' : ''}`}
                animate={{ x: translateX, scale, opacity, filter: `blur(${blur}px)` }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ zIndex }}
                onClick={() => {
                  if (ehAtiva) {
                    setLightbox({ src: img.src, alt: img.alt })
                  } else {
                    setAtivo(i)
                  }
                }}
              >
                <div className="hae-gallery-overlay" />
                <img src={img.src} alt={img.alt} className="hae-gallery-img" />
                {ehAtiva && (
                  <div className="hae-carrossel-expandir" aria-hidden="true">⤢</div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* setas laterais */}
        <button
          className="hae-carrossel-seta hae-carrossel-seta--esq"
          onClick={() => setAtivo(a => (a - 1 + images.length) % images.length)}
          aria-label="Anterior"
        >
          ‹
        </button>
        <button
          className="hae-carrossel-seta hae-carrossel-seta--dir"
          onClick={() => setAtivo(a => (a + 1) % images.length)}
          aria-label="Próxima"
        >
          ›
        </button>
      </div>

      {/* bolinhas de navegação */}
      <div className="hae-carrossel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`hae-carrossel-dot${i === ativo ? ' hae-carrossel-dot--ativo' : ''}`}
            onClick={() => setAtivo(i)}
            aria-label={`Imagem ${i + 1}`}
          />
        ))}
      </div>

      <div className="hae-img-barra">
        <span className="hae-img-barra-linha" />
        <span className="hae-img-barra-linha" />
      </div>

      {/* Lightbox */}
      {lightbox && (
        <HaeLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
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

        <motion.p
          className="pagina-topo-label"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.0 }}
        >
          {t('hae.subtitulo_topo')}
        </motion.p>

        <motion.p className="heroi-eyebrow"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
        </motion.p>

        <motion.h1 className="heroi-titulo"
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('hae.titulo_novo', 'Descomplique o Direito:')}{' '}
          <span>{t('hae.titulo_sub', 'Soluções jurídicas para você')}</span>
        </motion.h1>

        <motion.div className="heroi-divisor"
          initial={{ width: 0, opacity: 0 }} animate={{ width: 72, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
        />

        <motion.div className="heroi-intro-bloco" {...fadeUp(0.5)}>
          <p className="heroi-paragrafo--destaque">
            {t('hae.intro_destaque',
              'Fundado sob os pilares da ética e do rigor técnico, o escritório de advocacia HAEFFNER MARINHO ADVOGADOS oferece assessoria jurídica estratégica e personalizada.'
            )}
          </p>
          <p className="heroi-paragrafo">
            {t('hae.intro',
              'Nossa atuação é pautada pela busca incessante por soluções resolutivas, mitigando riscos e conferindo robustez jurídica às operações de nossos constituintes.'
            )}
          </p>
        </motion.div>

        <HaeImage src="/advocacia/predio.jpg" alt="predio" index={1} />

        <motion.p className="heroi-texto" {...fadeUp(0)}>
          {t('hae.complemento',
            'Acreditamos que a segurança jurídica deve ser fundamentada na estratégia e na precisão. Por isso, convidamos você a conhecer nossa estrutura e a metodologia de ecossistema: uma abordagem moderna desenhada para proteger o que é essencial — sua liberdade e seu patrimônio.'
          )}
        </motion.p>

        <HaeGallery />

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
                'O Direito Moderno - e mais especificamente o contemporâneo -  tornou-se um ecossistema complexo e interdisciplinar, caracterizado pela multiplicidade de normas, pela interação de diferentes ordenamentos jurídicos (nacional, internacional, privado) e pela necessidade de lidar com relações sociais, tecnológicas e econômicas cada vez mais intrincadas.'
              )}
            </p>
          </div>
        </motion.div>



      </div>
    </section>
  )
}

export default Hae
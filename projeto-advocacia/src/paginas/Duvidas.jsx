import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import {
  FaGavel, FaHandshake, FaBuilding, FaShieldAlt, FaEnvelopeOpen,
  FaCheckCircle, FaLock, FaChevronDown, FaCircle,
  FaExclamationTriangle, FaClock, FaArrowRight, FaWhatsapp,
  FaSpinner,
} from 'react-icons/fa'
import './Duvidas.css'

const EMAILJS_SERVICE_ID  = 'service_o4yt8u9'   
const EMAILJS_TEMPLATE_ID = 'template_7b2te2d'  
const EMAILJS_PUBLIC_KEY  = 'aqFtbI9SNlieQ49Li'   

/* numero do whatsApp do escritório */
const WHATSAPP_NUMBER = '5541988184388'


const DETALHES = {
  'Recebi uma intimação': {
    urgencia: 'Alta', prazoLabel: 'Até 10 dias corridos para responder',
    intro: 'Uma intimação é um ato oficial que exige atenção imediata. Ignorá-la pode gerar revelia, multas ou complicações sérias no processo criminal ou cível.',
    passos: ['Verifique a data de recebimento — o prazo começa a correr a partir daí.','Identifique o tipo: criminal, cível, trabalhista ou administrativa.','Não responda ou assine qualquer documento sem orientação jurídica.','Guarde o documento original em local seguro.'],
    alerta: 'Prazos processuais são fatais. Não perca tempo.',
  },
  'Busca e apreensão / Medidas cautelares': {
    urgencia: 'Urgente', prazoLabel: 'Ação imediata necessária',
    intro: 'Mandados de busca e apreensão são cumpridos de surpresa. Conhecer seus direitos no momento da abordagem é fundamental para proteger seus interesses.',
    passos: ['Solicite a exibição do mandado judicial e fotografe-o se possível.','Permaneça calmo — não obstrua a execução do mandado.','Você tem direito de contatar um advogado imediatamente.','Anote os nomes e matrículas dos agentes envolvidos.'],
    alerta: 'Não assine nada sem presença de advogado.',
  },
  'Fui vítima de crime/ameaça': {
    urgencia: 'Alta', prazoLabel: 'Registre B.O. nas primeiras 24h',
    intro: 'Ser vítima de crime ou ameaça gera direitos imediatos: medidas protetivas, indenização por danos e acompanhamento especializado em todo o processo penal.',
    passos: ['Registre um Boletim de Ocorrência (B.O.) o quanto antes.','Preserve todas as evidências: mensagens, fotos, gravações.','Em caso de violência, busque atendimento médico e peça laudo.','Solicite medida protetiva de urgência se sentir risco.'],
    alerta: 'Evidências se perdem com o tempo. Aja rápido.',
  },
  'Dúvidas sobre inquérito policial': {
    urgencia: 'Moderada', prazoLabel: 'Acompanhe o andamento regularmente',
    intro: 'O inquérito policial é a fase investigativa. Mesmo sem ser réu ainda, estar assistido juridicamente desde esta fase pode definir o resultado do processo.',
    passos: ['Você tem direito a ter advogado mesmo na fase investigativa.','Investigados podem se recusar a depor (direito ao silêncio).','Solicite cópia dos autos do inquérito junto à delegacia.','Acompanhe os prazos: inquéritos têm prazo legal para conclusão.'],
    alerta: 'O que você diz na fase investigativa pode ser usado contra você.',
  },
  'Acidente de trânsito / Danos materiais': {
    urgencia: 'Moderada', prazoLabel: 'Prazo para ação civil: até 3 anos',
    intro: 'Acidentes de trânsito podem gerar direito a indenização por danos materiais, morais e estéticos. A documentação correta desde o início é determinante.',
    passos: ['Registre B.O. mesmo em acidentes sem vítimas.','Fotografe o local, veículos e lesões imediatamente.','Colete dados e testemunhos de todos os envolvidos.','Não assine acordos com seguradoras sem avaliação jurídica.'],
    alerta: 'Acordos extrajudiciais mal feitos podem excluir direitos futuros.',
  },
  'Problemas com contratos ou cobranças': {
    urgencia: 'Moderada', prazoLabel: 'Prescrição varia por tipo de contrato',
    intro: 'Cláusulas abusivas, cobranças indevidas e descumprimento contratual têm solução jurídica clara — inclusive com possibilidade de indenização por danos morais.',
    passos: ['Guarde todos os contratos, comprovantes e comunicações.','Verifique se há cláusulas abusivas ou ilegais no contrato.','Notifique extrajudicialmente antes de acionar a Justiça.','Avalie se há dano moral associado à cobrança indevida.'],
    alerta: 'Cobranças indevidas no nome geram direito a indenização por dano moral.',
  },
  'Danos morais / Problemas de consumo': {
    urgencia: 'Moderada', prazoLabel: '5 anos para relações de consumo',
    intro: 'O Código de Defesa do Consumidor é robusto. Negativação indevida, produto defeituoso ou serviço não prestado geram direito real a indenização.',
    passos: ['Documente tudo: prints, e-mails, notas fiscais e protocolos.','Tente solução administrativa antes (Procon, Reclame Aqui).','Avalie o valor do dano sofrido com auxílio jurídico.','Juizado Especial Cível resolve causas até 40 salários mínimos.'],
    alerta: 'Empresas conhecem seus direitos — você também precisa conhecer.',
  },
  'Conflitos de vizinhança ou condomínio': {
    urgencia: 'Baixa', prazoLabel: 'Prescrição: 3 anos para danos',
    intro: 'Conflitos de vizinhança têm solução jurídica clara no Código Civil. A notificação extrajudicial muitas vezes resolve sem necessidade de processo judicial.',
    passos: ['Registre as ocorrências com datas, horários e testemunhas.','Verifique a Convenção do Condomínio e o Regimento Interno.','Tente mediação ou notificação formal antes do processo.','Barulho, danos e invasão de privacidade são acionáveis judicialmente.'],
    alerta: 'Uma notificação extrajudicial bem elaborada resolve 70% dos casos.',
  },
  'Problemas com compra/venda de imóvel': {
    urgencia: 'Alta', prazoLabel: 'Prazos variam por tipo de negócio',
    intro: 'Negócios imobiliários envolvem valores altos e riscos ocultos. Due diligence jurídica antes da assinatura evita prejuízos que podem ser irreversíveis.',
    passos: ['Analise a matrícula do imóvel no Cartório de Registro de Imóveis.','Verifique dívidas, ônus e ações judiciais vinculadas ao imóvel.','Confira certidões negativas do vendedor.','Nunca assine contrato ou promessa sem revisão jurídica.'],
    alerta: 'Imóvel com dívida oculta pode ser perdido mesmo após a compra.',
  },
  'Distrato ou atraso de obra': {
    urgencia: 'Moderada', prazoLabel: 'Lei do Distrato — Lei 13.786/2018',
    intro: 'A Lei do Distrato regulamenta os direitos do comprador em caso de rescisão ou atraso na entrega. Construtoras frequentemente cobram além do permitido por lei.',
    passos: ['Verifique o prazo de tolerância contratual (geralmente 180 dias).','Após o prazo, você tem direito a multa e indenização.','Em caso de distrato, a construtora deve devolver parte dos valores pagos.','Analise o contrato com advogado antes de assinar qualquer rescisão.'],
    alerta: 'Construtoras tentam pagar menos do que é devido na rescisão.',
  },
  'Regularização de imóveis ou escrituras': {
    urgencia: 'Baixa', prazoLabel: 'Quanto antes, melhor',
    intro: 'Imóvel sem escritura ou registro é um ativo vulnerável. A regularização protege seu patrimônio e viabiliza financiamentos, heranças e vendas futuras.',
    passos: ['Verifique se há usucapião cabível para a situação.','Levante toda a documentação histórica do imóvel.','Confira débitos de IPTU e taxas municipais pendentes.','O processo pode ser feito extrajudicialmente em muitos casos.'],
    alerta: 'Imóvel irregular não pode ser vendido, financiado ou deixado em herança.',
  },
  'Dúvidas sobre locação ou despejo': {
    urgencia: 'Moderada', prazoLabel: 'Lei do Inquilinato — Lei 8.245/91',
    intro: 'Tanto locador quanto locatário têm direitos claros. Contratos mal redigidos e ações de despejo exigem atenção jurídica especializada para evitar prejuízos.',
    passos: ['Analise o contrato: prazo, reajuste, garantias e cláusulas de rescisão.','Inadimplência gera direito a ação de despejo com prazo de 15 dias.','Locatário tem direito de preferência na venda do imóvel.','Devolução do imóvel: verifique laudo de vistoria inicial e final.'],
    alerta: 'Ação de despejo pode ser evitada com acordo extrajudicial bem feito.',
  },
  'Análise ou elaboração de contratos': {
    urgencia: 'Baixa', prazoLabel: 'Antes de assinar qualquer documento',
    intro: 'Um contrato bem redigido é seu melhor instrumento de proteção. Cláusulas ambíguas viram litígios caros. Revisão prévia custa muito menos que um processo.',
    passos: ['Nunca assine contrato sem revisão jurídica prévia.','Cláusulas de rescisão, penalidades e foro devem ser negociadas.','Contratos digitais têm a mesma validade jurídica dos físicos.','Contratos de adesão frequentemente contêm cláusulas abusivas.'],
    alerta: 'O contrato é a lei entre as partes — garanta que ela trabalhe por você.',
  },
  'Proteção patrimonial / Blindagem': {
    urgencia: 'Baixa', prazoLabel: 'Planejamento preventivo',
    intro: 'Blindagem patrimonial é planejamento jurídico preventivo. Holdings, doações com reserva de usufruto e separação de bens protegem seu patrimônio de riscos futuros.',
    passos: ['Avalie a criação de holding familiar para gestão e proteção de ativos.','Separe patrimônio pessoal do empresarial juridicamente.','Planejamento sucessório evita disputas e reduz custos com inventário.','Análise de risco deve ser feita e revisada periodicamente.'],
    alerta: 'Blindagem feita após a dívida pode ser considerada fraude — planeje antes.',
  },
  'Dúvidas sobre gestão e risco jurídico': {
    urgencia: 'Baixa', prazoLabel: 'Revisão periódica recomendada',
    intro: 'Empresas sem assessoria jurídica preventiva acumulam passivos invisíveis: trabalhistas, fiscais e contratuais. Identificar riscos antes que virem processos é sempre mais barato.',
    passos: ['Faça um diagnóstico jurídico periódico da empresa.','Revise contratos com fornecedores, clientes e colaboradores.','Verifique conformidade com LGPD, CLT e regulações setoriais.','Crie políticas internas que reduzam exposição a litígios.'],
    alerta: 'Passivo trabalhista oculto é o principal risco jurídico de PMEs.',
  },
  'Parcerias e Negócios (Socioambiental/Industrial)': {
    urgencia: 'Baixa', prazoLabel: 'Antes de formalizar qualquer parceria',
    intro: 'Parcerias sem estrutura jurídica adequada são o principal motivo de dissolução litigiosa de sociedades. Formalizar bem desde o início protege todos os envolvidos.',
    passos: ['Defina claramente papéis, quotas e responsabilidades no contrato social.','Cláusulas de saída (drag-along, tag-along) devem ser acordadas antes.','Parcerias socioambientais exigem conformidade com legislação específica.','Due diligence no parceiro é tão importante quanto no negócio em si.'],
    alerta: 'Sociedade sem acordo de sócios é uma bomba-relógio.',
  },
  'Outros assuntos (Descreva abaixo)': {
    urgencia: 'A verificar', prazoLabel: 'Nos conte sua situação',
    intro: 'Se sua situação não se encaixa nas categorias acima, não se preocupe. Analisamos qualquer questão jurídica e indicamos o melhor caminho para o seu caso.',
    passos: ['Descreva sua situação com o máximo de detalhes possível.','Informe se há algum prazo ou urgência envolvida.','Compartilhe documentos relevantes se possível.','Retornaremos com uma análise preliminar sem compromisso.'],
    alerta: 'Toda situação jurídica tem solução — o primeiro passo é conversar.',
  },
}

const URGENCIA_COR = {
  'Urgente': '#b03a2e', 'Alta': '#C9A84C',
  'Moderada': '#2563a8', 'Baixa': '#1a7f6e', 'A verificar': '#7a8799',
}

const subjects = [
  { id: 1, Icon: FaGavel,       title: 'Urgências Criminais',               accentVar: '--dv-red',    options: ['Recebi uma intimação','Busca e apreensão / Medidas cautelares','Fui vítima de crime/ameaça','Dúvidas sobre inquérito policial'] },
  { id: 2, Icon: FaHandshake,   title: 'Conflitos Cíveis e Cotidianos',     accentVar: '--dv-gold',   options: ['Acidente de trânsito / Danos materiais','Problemas com contratos ou cobranças','Danos morais / Problemas de consumo','Conflitos de vizinhança ou condomínio'] },
  { id: 3, Icon: FaBuilding,    title: 'Mercado Imobiliário e Gestão',      accentVar: '--dv-teal',   options: ['Problemas com compra/venda de imóvel','Distrato ou atraso de obra','Regularização de imóveis ou escrituras','Dúvidas sobre locação ou despejo'] },
  { id: 4, Icon: FaShieldAlt,   title: 'Consultoria Preventiva / Empresas', accentVar: '--dv-blue',   options: ['Análise ou elaboração de contratos','Proteção patrimonial / Blindagem','Dúvidas sobre gestão e risco jurídico','Parcerias e Negócios (Socioambiental/Industrial)'] },
  { id: 5, Icon: FaEnvelopeOpen,title: 'Geral',                             accentVar: '--dv-silver', options: ['Outros assuntos (Descreva abaixo)'] },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

/* painel de detalhes inline  */
function DetalhePanel({ opt, onContact }) {
  const info = DETALHES[opt]
  if (!info) return null
  const urgColor = URGENCIA_COR[info.urgencia] || '#C9A84C'
  return (
    <motion.div className="dv-detalhe" style={{ '--dv-urg': urgColor }}
      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
      <div className="dv-detalhe__inner">
        <div className="dv-detalhe__badges">
          <span className="dv-detalhe__badge dv-detalhe__badge--urg" style={{ borderColor: urgColor, color: urgColor, background: `${urgColor}18` }}>
            <FaExclamationTriangle /> Urgência: {info.urgencia}
          </span>
          <span className="dv-detalhe__badge dv-detalhe__badge--prazo">
            <FaClock /> {info.prazoLabel}
          </span>
        </div>
        <p className="dv-detalhe__intro">{info.intro}</p>
        <div className="dv-detalhe__divisor" />
        <p className="dv-detalhe__passos-label">O que fazer agora</p>
        <ol className="dv-detalhe__passos">
          {info.passos.map((p, i) => (
            <motion.li key={i} className="dv-detalhe__passo"
              initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}>
              <span className="dv-detalhe__num" style={{ color: urgColor }}>{i + 1}</span>
              <span>{p}</span>
            </motion.li>
          ))}
        </ol>
        <div className="dv-detalhe__alerta">
          <FaExclamationTriangle style={{ color: urgColor, flexShrink: 0, marginTop: 2 }} />
          <span>{info.alerta}</span>
        </div>
        <motion.button className="dv-detalhe__cta" onClick={onContact}
          whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
          Quero ser atendido para este caso <FaArrowRight />
        </motion.button>
      </div>
    </motion.div>
  )
}

/*componente principal */
export default function Duvidas() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [expandedOption, setExpandedOption]     = useState(null)
  const [formOption, setFormOption]             = useState(null)
  const [name, setName]       = useState('')
  const [phone, setPhone]     = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)  // ← estado de envio
  const [sendError, setSendError] = useState('')  // ← erro de envio
  const [submitted, setSubmitted] = useState(false)

  const handleCategoryClick = (cat) => {
    setSelectedCategory(prev => prev?.id === cat.id ? null : cat)
    setExpandedOption(null)
  }

  const handleOptionClick = (opt) => {
    setExpandedOption(prev => prev === opt ? null : opt)
  }

  const handleContact = () => {
    setFormOption(expandedOption)
    setTimeout(() => {
      document.querySelector('.dv-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  /*ENVIO REAL — EmailJS + fallback WhatsApp*/
  const handleSubmit = async () => {
    if (!formOption || !name || !phone) return
    setSending(true)
    setSendError('')

    const templateParams = {
      nome:      name,
      telefone:  phone,
      assunto:   formOption,
      categoria: selectedCategory?.title || '',
      mensagem:  message || '(sem descrição)',
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      setSubmitted(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      setSendError('Não foi possível enviar o e-mail. Use o WhatsApp abaixo.')
    } finally {
      setSending(false)
    }
  }

  /* Monta link do WhatsApp com os dados preenchidos */
  const whatsappLink = () => {
    const texto = encodeURIComponent(
      `Olá! Vim pelo site.\n\n*Assunto:* ${formOption}\n*Nome:* ${name}\n*Situação:* ${message || 'Gostaria de mais informações.'}`
    )
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`
  }

  const reset = () => {
    setSubmitted(false); setSelectedCategory(null)
    setExpandedOption(null); setFormOption(null)
    setName(''); setPhone(''); setMessage('')
    setSendError('')
  }

  /* tela de sucesso */
  if (submitted) {
    return (
      <main className="dv-pagina">
        <div className="hma-bg-orb hma-bg-orb--1" /><div className="hma-bg-orb hma-bg-orb--2" />
        <motion.div className="dv-inner" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="dv-success">
            <motion.div className="dv-success__icon" initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}>
              <FaCheckCircle />
            </motion.div>
            <motion.h2 className="dv-success__titulo" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}>
              Mensagem <span>Enviada</span>
            </motion.h2>
            <motion.div className="dv-divisor" initial={{ width: 0, opacity: 0 }} animate={{ width: 60, opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }} />
            <motion.p className="dv-success__texto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.6 }}>
              Prezado(a) <strong>{name}</strong>,<br /><br />
              Confirmamos o recebimento de sua demanda. Os dados fornecidos foram encaminhados à nossa Gestão Estratégica para análise de viabilidade e enquadramento técnico junto aos nossos Núcleos Especializados.<br /><br />
              Primamos pela celeridade e pelo rigor técnico intrínseco à nossa atuação. Aguarde o contato de nossa equipe para o agendamento da conferência inicial.<br /><br />
              <strong>Atenciosamente,<br />Haeffner Marinho Advogados</strong>
            </motion.p>
            <motion.div className="dv-success__badge" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.75 }}>
              {selectedCategory && <selectedCategory.Icon className="dv-success__badge-icon" />}
              <span>{formOption}</span>
            </motion.div>
            <motion.a
              className="dv-success__whatsapp"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.95 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              <FaWhatsapp /> Falar agora pelo WhatsApp
            </motion.a>
            <motion.button className="dv-btn-reset" onClick={reset}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.05 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Nova Consulta
            </motion.button>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="dv-pagina">
      <div className="hma-bg-orb hma-bg-orb--1" /><div className="hma-bg-orb hma-bg-orb--2" />
      <div className="dv-inner">

        <motion.p
          className="pagina-topo-label"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.0 }}
        >
          ADVOCACIA E CONSULTORIA JURÍDICA
        </motion.p>

        
        <motion.h1 className="dv-titulo" {...fadeUp(0.15)}>
          {t('duvidas.titulo1', 'Dúvidas? Analisamos junto.  Como proceder?')}{' '}
          <span>{t('duvidas.titulo2', 'Saiba seus direitos!')}</span>
        </motion.h1>
        <motion.div className="dv-divisor" initial={{ width: 0, opacity: 0 }} whileInView={{ width: 60, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} />
        <motion.p className="dv-subtitulo" {...fadeUp(0.35)}>
          {t('duvidas.sub', 'Selecione uma situação abaixo para entender seus direitos e os próximos passos.')}
        </motion.p>

        {/* categorias*/}
        <div className="dv-categorias">
          {subjects.map((cat, i) => {
            const isOpen = selectedCategory?.id === cat.id
            return (
              <motion.div key={cat.id} className={`dv-cat${isOpen ? ' dv-cat--open' : ''}`}
                style={{ '--dv-accent': `var(${cat.accentVar})` }} {...fadeUp(0.1 + i * 0.07)}>
                <button className="dv-cat__header" onClick={() => handleCategoryClick(cat)} aria-expanded={isOpen}>
                  <span className="dv-cat__icon-wrap"><cat.Icon className="dv-cat__icon" /></span>
                  <span className="dv-cat__titulo">{cat.title}</span>
                  <motion.span className="dv-cat__chevron" animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FaChevronDown />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div key="lista" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                      <ul className="dv-cat__opcoes">
                        {cat.options.map((opt, j) => {
                          const isExpanded = expandedOption === opt
                          return (
                            <motion.li key={opt} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.28, delay: j * 0.06 }}>
                              <button className={`dv-opcao${isExpanded ? ' dv-opcao--ativa' : ''}${formOption === opt ? ' dv-opcao--selected' : ''}`}
                                onClick={() => handleOptionClick(opt)}>
                                <FaCircle className="dv-opcao__dot" />
                                <span className="dv-opcao__texto">{opt}</span>
                                <motion.span className="dv-opcao__seta" animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.25 }}>
                                  <FaArrowRight />
                                </motion.span>
                              </button>
                              <AnimatePresence initial={false}>
                                {isExpanded && <DetalhePanel key="detalhe" opt={opt} onContact={handleContact} />}
                              </AnimatePresence>
                            </motion.li>
                          )
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* formulário*/}
        <AnimatePresence>
          {formOption && (
            <motion.div className="dv-form" key="form"
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <div className="dv-form__deco" />

              <div className="dv-form__badge-row">
                {selectedCategory && (
                  <span className="dv-form__badge">
                    <selectedCategory.Icon /> {formOption}
                  </span>
                )}
                <button className="dv-form__trocar" onClick={() => setFormOption(null)}>Trocar assunto</button>
              </div>

              <div className="dv-form__grid">
                <div className="dv-campo">
                  <label className="dv-campo__label">Seu Nome *</label>
                  <input className="dv-campo__input" type="text" placeholder="Como posso te chamar?" value={name} onChange={e => setName(e.target.value)} disabled={sending} />
                </div>
                <div className="dv-campo">
                  <label className="dv-campo__label">WhatsApp *</label>
                  <input className="dv-campo__input" type="tel" placeholder="(XX) XXXXX-XXXX" value={phone} onChange={e => setPhone(e.target.value)} disabled={sending} />
                </div>
                <div className="dv-campo dv-campo--full">
                  <label className="dv-campo__label">Descreva brevemente sua situação</label>
                  <textarea className="dv-campo__input dv-campo__textarea" rows={4} placeholder="Quanto mais detalhes, melhor poderei te orientar..." value={message} onChange={e => setMessage(e.target.value)} disabled={sending} />
                </div>
              </div>

              {/* erro de envio + botão whats de fallback */}
              <AnimatePresence>
                {sendError && (
                  <motion.div className="dv-form__erro" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <FaExclamationTriangle />
                    <span>{sendError}</span>
                    <a className="dv-form__erro-wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp /> Abrir WhatsApp
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                className={`dv-btn-submit${name && phone && !sending ? ' dv-btn-submit--ativo' : ''}${sending ? ' dv-btn-submit--sending' : ''}`}
                onClick={handleSubmit}
                disabled={!name || !phone || sending}
                whileHover={name && phone && !sending ? { scale: 1.02, y: -2 } : {}}
                whileTap={name && phone && !sending ? { scale: 0.98 } : {}}
              >
                {sending
                  ? <><FaSpinner className="dv-spinner" /> Enviando...</>
                  : 'Enviar Mensagem →'
                }
              </motion.button>

              {/* botão whats alternativo */}
              {name && phone && (
                <motion.a
                  className="dv-btn-whatsapp"
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <FaWhatsapp /> Ou enviar direto pelo WhatsApp
                </motion.a>
              )}

              <p className="dv-form__privacidade">
                <FaLock className="dv-form__privacidade-icon" />
                Suas informações são confidenciais e protegidas pelo sigilo profissional.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  )
}
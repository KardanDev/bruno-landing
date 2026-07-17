import type {
  AboutPage,
  BlogPage,
  ContactPage,
  FaqPage,
  HomePage,
  Post,
  PricingPage,
  Service,
  ServicesPage,
  Settings,
} from './types'

const block = (key: string, text: string) => ({
  _key: key,
  _type: 'block',
  children: [{_key: `${key}-span`, _type: 'span', marks: [], text}],
  markDefs: [],
  style: 'normal',
})

export const demoSettings: Settings = {
  siteName: 'Dra. Marina Duarte',
  tagline: 'Advocacia estratégica para decisões importantes, com clareza em cada etapa.',
  monogram: 'MD',
  primaryCta: {label: 'Agendar uma conversa', href: '/contato'},
  navigation: [
    {_key: 'nav-home', label: 'Início', href: '/'},
    {_key: 'nav-about', label: 'Sobre', href: '/sobre'},
    {_key: 'nav-services', label: 'Atuação', href: '/servicos'},
    {_key: 'nav-pricing', label: 'Honorários', href: '/honorarios'},
    {_key: 'nav-faq', label: 'Dúvidas', href: '/duvidas'},
    {_key: 'nav-blog', label: 'Artigos', href: '/artigos'},
  ],
  phone: '+55 (11) 99999-0000',
  email: 'contato@marinaduarte.adv.br',
  address: 'Rua Exemplo, 123\nSão Paulo — SP',
  mapUrl: 'https://maps.google.com',
  officeHours: 'Segunda a sexta, das 9h às 18h',
  socialLinks: [
    {_key: 'social-linkedin', label: 'LinkedIn', href: 'https://linkedin.com'},
    {_key: 'social-instagram', label: 'Instagram', href: 'https://instagram.com'},
  ],
  seo: {
    title: 'Dra. Marina Duarte | Advocacia estratégica',
    description: 'Orientação jurídica individual, próxima e estratégica.',
  },
}

export const demoServices: Service[] = [
  {
    _id: 'demo-service-consultoria',
    title: 'Consultoria jurídica',
    slug: 'consultoria-juridica',
    eyebrow: '01 — Orientação',
    summary: 'Leitura cuidadosa do cenário para transformar dúvidas em decisões seguras e práticas.',
    body: [
      block('consultoria-1', 'Toda decisão importante merece uma análise jurídica que seja, ao mesmo tempo, precisa e compreensível.'),
      block('consultoria-2', 'O atendimento parte do seu contexto, identifica riscos e organiza os próximos passos com objetividade.'),
    ],
    features: ['Análise do caso e documentos', 'Mapa de riscos e possibilidades', 'Orientação clara para a tomada de decisão'],
    faqTitle: 'Dúvidas sobre consultoria',
    faqs: [
      {_key: 'consultoria-faq-1', question: 'A consultoria pode ser feita online?', answer: 'Sim. O atendimento pode acontecer por videoconferência, com a mesma organização e confidencialidade do presencial.'},
      {_key: 'consultoria-faq-2', question: 'Quais documentos preciso enviar?', answer: 'Após o primeiro contato, você recebe uma orientação objetiva sobre os documentos relevantes para a análise.'},
    ],
    cta: {label: 'Conversar sobre meu caso', href: '/contato'},
    orderRank: 1,
  },
  {
    _id: 'demo-service-contratos',
    title: 'Contratos e negociações',
    slug: 'contratos-e-negociacoes',
    eyebrow: '02 — Prevenção',
    summary: 'Estruturas contratuais que traduzem acordos com equilíbrio, segurança e previsibilidade.',
    body: [
      block('contratos-1', 'Um bom contrato antecipa conversas difíceis, registra expectativas e protege relações que importam.'),
      block('contratos-2', 'A atuação inclui elaboração, revisão e apoio em negociações, sempre com atenção ao que é viável para você.'),
    ],
    features: ['Elaboração e revisão de contratos', 'Apoio em negociações', 'Cláusulas claras e adequadas à realidade do negócio'],
    faqTitle: 'Dúvidas sobre contratos',
    faqs: [
      {_key: 'contratos-faq-1', question: 'Posso revisar um contrato já assinado?', answer: 'Sim. A revisão identifica obrigações, riscos e possíveis caminhos para renegociação ou adequação.'},
      {_key: 'contratos-faq-2', question: 'O contrato é personalizado?', answer: 'Sempre. Modelos servem como ponto de partida, mas cada documento é ajustado ao contexto e aos objetivos envolvidos.'},
    ],
    cta: {label: 'Revisar um contrato', href: '/contato'},
    orderRank: 2,
  },
  {
    _id: 'demo-service-contencioso',
    title: 'Estratégia em conflitos',
    slug: 'estrategia-em-conflitos',
    eyebrow: '03 — Atuação',
    summary: 'Condução firme e responsável de conflitos, com transparência sobre cenários e escolhas.',
    body: [
      block('conflitos-1', 'Conflitos exigem estratégia, escuta e decisões bem informadas. Antes de agir, é preciso entender o todo.'),
      block('conflitos-2', 'A atuação busca a solução mais adequada ao seu caso, por negociação, mediação ou via judicial quando necessário.'),
    ],
    features: ['Diagnóstico estratégico do conflito', 'Negociação e composição', 'Acompanhamento processual com comunicação contínua'],
    faqTitle: 'Dúvidas sobre conflitos',
    faqs: [
      {_key: 'conflitos-faq-1', question: 'Todo conflito precisa virar processo?', answer: 'Não. A via judicial é uma possibilidade, mas a estratégia sempre considera alternativas de negociação e composição.'},
      {_key: 'conflitos-faq-2', question: 'Como acompanho o andamento?', answer: 'Você recebe atualizações em linguagem clara, com contexto para compreender cada decisão e próximo passo.'},
    ],
    cta: {label: 'Avaliar meu cenário', href: '/contato'},
    orderRank: 3,
  },
]

export const demoPosts: Post[] = [
  {
    _id: 'demo-post-contratos',
    title: 'O que observar antes de assinar um contrato',
    slug: 'o-que-observar-antes-de-assinar-um-contrato',
    excerpt: 'Clareza sobre obrigações, prazos e riscos é o primeiro passo para assinar com segurança.',
    publishedAt: '2026-06-10T09:00:00.000Z',
    body: [
      block('post-contratos-1', 'Antes de assinar, vale observar o que cada parte precisa entregar, como os prazos funcionam e quais são as consequências de um descumprimento.'),
      block('post-contratos-2', 'Uma leitura estratégica não procura apenas problemas: ela confirma se o documento traduz o que foi combinado.'),
    ],
  },
  {
    _id: 'demo-post-conflitos',
    title: 'Quando negociar é o caminho mais eficiente',
    slug: 'quando-negociar-e-o-caminho-mais-eficiente',
    excerpt: 'Nem todo impasse pede uma disputa longa. Entenda o que considerar antes de escolher o caminho.',
    publishedAt: '2026-05-22T09:00:00.000Z',
    body: [
      block('post-conflitos-1', 'A negociação pode preservar relações, reduzir custos e construir soluções que uma decisão judicial não alcança.'),
      block('post-conflitos-2', 'Isso não significa abrir mão de direitos. Significa avaliar, com estratégia, qual caminho produz o melhor resultado.'),
    ],
  },
  {
    _id: 'demo-post-consultoria',
    title: 'Por que buscar orientação antes de decidir',
    slug: 'por-que-buscar-orientacao-antes-de-decidir',
    excerpt: 'Uma conversa jurídica no momento certo evita incertezas e dá mais segurança aos próximos passos.',
    publishedAt: '2026-04-30T09:00:00.000Z',
    body: [
      block('post-consultoria-1', 'Buscar orientação antes de decidir é uma forma de ampliar a visão sobre consequências, alternativas e oportunidades.'),
      block('post-consultoria-2', 'O objetivo é que você avance com mais clareza, não com mais complexidade.'),
    ],
  },
]

export const demoHomePage: HomePage = {
  hero: {
    eyebrow: 'Advocacia individual e estratégica',
    title: 'Clareza jurídica para decisões que movem a sua vida.',
    description: 'Atendimento próximo, técnico e humano para você compreender seus caminhos e agir com segurança.',
    cta: {label: 'Agendar uma conversa', href: '/contato'},
  },
  introductionEyebrow: 'Sobre a atuação',
  introductionTitle: 'Estratégia começa com escuta.',
  introductionText: 'Cada história pede atenção ao contexto, aos objetivos e ao que realmente está em jogo. A atuação une análise técnica, comunicação direta e uma presença cuidadosa em cada etapa.',
  servicesEyebrow: 'Áreas de atuação',
  servicesTitle: 'Orientação para o agora. Estrutura para o próximo passo.',
  servicesDescription: 'Serviços pensados para prevenir riscos, organizar decisões e conduzir conflitos com firmeza.',
  servicesCta: {label: 'Conhecer todos os serviços', href: '/servicos'},
  featuredServices: demoServices,
  timelineEyebrow: 'Como funciona',
  timelineTitle: 'Um atendimento claro, do primeiro contato à decisão.',
  timelineDescription: 'Você sabe o que acontece em cada etapa e por que cada escolha é importante.',
  timeline: [
    {_key: 'timeline-1', title: 'Primeira conversa', description: 'Você apresenta seu contexto e suas dúvidas em uma conversa inicial, acolhedora e objetiva.'},
    {_key: 'timeline-2', title: 'Leitura do cenário', description: 'Documentos, riscos, prioridades e possibilidades são organizados para uma análise responsável.'},
    {_key: 'timeline-3', title: 'Estratégia definida', description: 'Você recebe caminhos possíveis e recomendações claras para decidir com segurança.'},
    {_key: 'timeline-4', title: 'Condução e acompanhamento', description: 'A atuação segue com comunicação transparente, atenção aos detalhes e foco no que importa.'},
  ],
  valuesTitle: 'Princípios que orientam cada atuação.',
  values: [
    {_key: 'value-1', title: 'Clareza', description: 'Linguagem direta para que você compreenda seus direitos, riscos e escolhas.'},
    {_key: 'value-2', title: 'Presença', description: 'Atendimento atento ao seu contexto, sem fórmulas prontas ou respostas automáticas.'},
    {_key: 'value-3', title: 'Estratégia', description: 'Decisões jurídicas guiadas pelo que é viável, relevante e sustentável para você.'},
  ],
  faqTitle: 'Perguntas frequentes',
  faqDescription: 'Algumas respostas para tornar o primeiro contato mais simples.',
  faqCta: {label: 'Ver todas as dúvidas', href: '/duvidas'},
  faqs: [
    {_key: 'home-faq-1', question: 'Como funciona a primeira consulta?', answer: 'A primeira conversa serve para entender o contexto, organizar as dúvidas e indicar os próximos passos possíveis.'},
    {_key: 'home-faq-2', question: 'O atendimento pode ser online?', answer: 'Sim. Consultas online são realizadas por videoconferência, com agendamento prévio e a mesma confidencialidade.'},
    {_key: 'home-faq-3', question: 'Como são definidos os honorários?', answer: 'Os honorários são apresentados com transparência após a compreensão do escopo, da complexidade e da forma de atuação necessária.'},
  ],
  articlesTitle: 'Conteúdo para decisões mais conscientes.',
  articlesDescription: 'Reflexões jurídicas em linguagem clara, para além do caso concreto.',
  articlesCta: {label: 'Ver todos os artigos', href: '/artigos'},
  latestPosts: demoPosts,
  closingCta: {
    eyebrow: 'Vamos conversar?',
    title: 'O seu próximo passo pode começar com uma boa conversa.',
    description: 'Conte brevemente o seu contexto e encontre um atendimento jurídico feito para a sua realidade.',
    cta: {label: 'Entrar em contato', href: '/contato'},
  },
}

export const demoAboutPage: AboutPage = {
  hero: {
    eyebrow: 'Sobre mim',
    title: 'Direito com escuta, presença e direção.',
    description: 'Uma advocacia individual para quem valoriza clareza, técnica e relações construídas com confiança.',
    cta: {label: 'Conhecer a atuação', href: '/servicos'},
  },
  storyEyebrow: 'A advocacia',
  storyTitle: 'Por trás de cada caso, uma pessoa tentando decidir com mais segurança.',
  story: [
    block('about-1', 'A advocacia que pratico começa antes da resposta: começa em uma escuta cuidadosa do que você vive e do que deseja proteger.'),
    block('about-2', 'Meu compromisso é transformar complexidade em direção. Isso significa estudar cada cenário com profundidade, comunicar com clareza e conduzir o trabalho de forma próxima.'),
    block('about-3', 'Mais do que entregar uma solução jurídica, busco construir um processo em que você se sinta informado, respeitado e seguro para decidir.'),
  ],
  valuesTitle: 'O que sustenta a minha forma de atuar.',
  values: demoHomePage.values,
  stats: [
    {_key: 'stat-1', value: '10+', label: 'anos de experiência'},
    {_key: 'stat-2', value: '1:1', label: 'atendimento individualizado'},
    {_key: 'stat-3', value: '100%', label: 'comunicação transparente'},
  ],
  closingCta: demoHomePage.closingCta,
}

export const demoServicesPage: ServicesPage = {
  hero: {
    eyebrow: 'Áreas de atuação',
    title: 'Atuação jurídica com método, presença e visão de futuro.',
    description: 'Conheça as frentes de trabalho e encontre a que melhor se conecta ao seu momento.',
    cta: {label: 'Falar sobre meu caso', href: '/contato'},
  },
  closingCta: demoHomePage.closingCta,
}

export const demoBlogPage: BlogPage = {
  hero: {
    eyebrow: 'Artigos',
    title: 'Informação jurídica para escolhas mais conscientes.',
    description: 'Conteúdos em linguagem clara para ajudar você a compreender temas que podem fazer parte da sua vida e do seu trabalho.',
    cta: {label: 'Falar sobre meu caso', href: '/contato'},
  },
}

export const demoPricingPage: PricingPage = {
  hero: {
    eyebrow: 'Honorários',
    title: 'Transparência para começar com segurança.',
    description: 'Cada proposta é apresentada com clareza, de acordo com o escopo e a complexidade da atuação necessária.',
    cta: {label: 'Solicitar uma proposta', href: '/contato'},
  },
  plans: [
    {
      _key: 'pricing-consulta',
      name: 'Consulta estratégica',
      price: 'A partir de R$ 450',
      description: 'Para compreender o cenário, organizar dúvidas e definir uma direção inicial.',
      features: ['Conversa de até 60 minutos', 'Leitura prévia de documentos essenciais', 'Orientação sobre próximos passos'],
      cta: {label: 'Agendar consulta', href: '/contato'},
    },
    {
      _key: 'pricing-contrato',
      name: 'Contratos',
      price: 'Sob proposta',
      description: 'Para elaborar, revisar ou negociar documentos alinhados ao seu contexto.',
      features: ['Escopo e cronograma definidos', 'Reunião de alinhamento', 'Documento personalizado'],
      cta: {label: 'Pedir proposta', href: '/contato'},
      featured: true,
    },
    {
      _key: 'pricing-acompanhamento',
      name: 'Acompanhamento contínuo',
      price: 'Sob proposta',
      description: 'Para uma atuação que exige acompanhamento, estratégia e comunicação recorrente.',
      features: ['Plano de atuação personalizado', 'Atualizações periódicas', 'Apoio em decisões relevantes'],
      cta: {label: 'Entender o formato', href: '/contato'},
    },
  ],
  note: 'Os valores apresentados são referências iniciais. Você recebe uma proposta detalhada após a compreensão do caso e do escopo de atuação.',
  closingCta: demoHomePage.closingCta,
}

export const demoFaqPage: FaqPage = {
  hero: {
    eyebrow: 'Dúvidas frequentes',
    title: 'Informação clara antes do primeiro contato.',
    description: 'Encontre respostas para perguntas comuns sobre atendimento, consultas e formas de atuação.',
    cta: {label: 'Ainda tenho uma dúvida', href: '/contato'},
  },
  faqs: [
    ...demoHomePage.faqs,
    {_key: 'faq-4', question: 'Quais áreas do Direito são atendidas?', answer: 'As áreas de atuação estão detalhadas na página de serviços. Caso o seu tema não apareça, entre em contato para uma avaliação inicial.'},
    {_key: 'faq-5', question: 'O que acontece depois que envio a mensagem?', answer: 'Você recebe um retorno para entender o contexto, confirmar a possibilidade de atuação e organizar um agendamento, quando aplicável.'},
    {_key: 'faq-6', question: 'As informações compartilhadas são confidenciais?', answer: 'Sim. O atendimento respeita a confidencialidade profissional e trata as informações do seu caso com o cuidado necessário.'},
  ],
  closingCta: demoHomePage.closingCta,
}

export const demoContactPage: ContactPage = {
  hero: {
    eyebrow: 'Contato',
    title: 'Vamos entender o seu momento.',
    description: 'Envie uma mensagem com um breve resumo. O retorno acontece com discrição, cuidado e objetividade.',
  },
  form: {
    heading: 'Conte um pouco sobre o que você precisa.',
    description: 'Os dados enviados são utilizados apenas para viabilizar o primeiro contato.',
    nameLabel: 'Seu nome',
    emailLabel: 'Seu e-mail',
    subjectLabel: 'Assunto',
    messageLabel: 'Como posso ajudar?',
    submitLabel: 'Enviar mensagem',
  },
  contactNote: 'Se preferir, entre em contato por telefone ou e-mail. O atendimento é feito com horário marcado.',
}

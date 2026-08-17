// Dicionário PT/EN da landing page — cada componente lê copy[lang].<secção>.
// Textos PT são os originais do brief; textos EN são traduções fiéis (o
// brief só documentou algumas strings EN explicitamente, as restantes foram
// traduzidas para completar o par).

export const copy = {
  pt: {
    nav: {
      links: [
        { href: '#tour', label: 'A app' },
        { href: '#plataforma', label: 'Plataforma' },
        { href: '#perfis', label: 'Perfis' },
        { href: '#missao', label: 'Missão' },
      ],
      cta: 'Entrar',
    },
    hero: {
      eyebrow: 'Agricultura · Pecuária · IA — Moçambique',
      titlePre: 'Tecnologia que ',
      titleEm: 'cultiva',
      titlePost: ' esperança',
      lead: 'A IAgroMoz é a plataforma que une agricultura, pecuária e inteligência artificial — conhecimento, comunidade e mercado, num só lugar, para quem produz no campo moçambicano.',
      ctaPrimary: 'Entrar na plataforma →',
      ctaGhost: 'Ver a app por dentro',
      chips: ['🌱 Agricultura', '🐄 Pecuária', '🤖 Inteligência Artificial'],
      scrollHint: 'Faz scroll',
    },
    tour: {
      eyebrow: 'A app por dentro',
      title: 'Percorre a IAgroMoz',
      lead: 'Desliza pelas telas — Feed, Mercado, Chat IA e Técnicas.',
      captions: [
        { num: '01 · Feed', title: 'Tudo acontece no Feed', body: 'A rede social do campo e a página inicial — visível mesmo sem sessão. Partilha colheitas, dicas e avisos; gosta, comenta e partilha.', screen: 'feed' },
        { num: '02 · Mercado', title: 'Compra e vende', body: 'Publica produtos com preço, stock e distrito. Compradores reservam, negoceiam por chat e avaliam produto e vendedor.', screen: 'mercado' },
        { num: '03 · Chat IA', title: 'Pergunta e recebe conselhos', body: 'Descreve o problema por texto ou envia uma foto da planta. A IA responde na tua língua e guarda o histórico em sessões.', screen: 'chat' },
        { num: '04 · Técnicas', title: 'Aprende com a comunidade', body: 'Boas práticas submetidas por todos. Cada técnica fica em votação (👍/👎) até ser aprovada ou reprovada pela comunidade.', screen: 'tecnicas' },
      ],
      dotLabels: ['Feed', 'Mercado', 'Chat', 'Técnicas'],
    },
    platform: {
      eyebrow: 'A plataforma',
      title: 'Uma plataforma, quatro ferramentas',
      lead: 'Antes de escolheres o teu perfil, conhece o que a IAgroMoz oferece a toda a gente.',
      modules: [
        { icon: 'bi-grid-3x3', title: 'Feed', desc: 'A rede social do campo — partilha, aprende e acompanha a comunidade.' },
        { icon: 'bi-robot', title: 'Chat IA', desc: 'Conselhos por texto, voz ou foto, na tua língua, guardados em sessões.' },
        { icon: 'bi-shop', title: 'Mercado', desc: 'Compra e vende com preço, stock e distrito — reserva e negoceia por chat.' },
        { icon: 'bi-lightbulb', title: 'Técnicas', desc: 'Boas práticas da comunidade, aprovadas por votação (👍/👎).' },
      ],
      diffTitle: 'Feita para o terreno',
      differentiators: ['Texto, voz ou foto', 'Conteúdos educativos', 'Comunidade real'],
    },
    profiles: {
      eyebrow: 'Perfis de utilizador',
      title: 'Um lugar para cada papel',
      lead: 'Da pessoa curiosa ao vendedor com NUIT — cada perfil tem as suas permissões.',
      cards: [
        {
          key: 'user', badge: 'Utilizador comum', title: 'Explora e aprende', screen: 'criar',
          desc: 'A pessoa que quer descobrir a plataforma.',
          can: ['Ver o Feed e o Mercado', 'Votar em Técnicas', 'Conversar com o Chat IA'],
          cannot: ['Publicar ou vender'],
        },
        {
          key: 'producer', badge: 'Produtor', title: 'Cultiva, partilha, vende', screen: 'tecnicas',
          desc: 'Quem cultiva ou cria — com painel próprio de gestão.',
          can: ['Publicar posts no Feed', 'Vender no Mercado', 'Submeter Técnicas', 'Painel de vendas e feed'],
          cannot: [],
        },
        {
          key: 'seller', badge: 'Vendedor', title: 'Foco no negócio', screen: 'mercado',
          desc: 'Conta comercial — individual ou loja/empresa, com NUIT.',
          can: ['Vender no Mercado', 'Perfil de loja/empresa'],
          cannot: ['Publicar no Feed', 'Votar em Técnicas'],
        },
      ],
    },
    feedback: {
      web: { eyebrow: 'Quem está a testar', title: 'Vozes dos nossos primeiros testers', lead: 'Recortes reais de quem já pôs a IAgroMoz à prova, enquanto entramos em produção.' },
      mobile: { eyebrow: 'Quem está a testar', title: 'Vozes dos primeiros testers', lead: 'Recortes de quem já pôs a IAgroMoz à prova.' },
    },
    mission: {
      eyebrow: 'A nossa missão',
      quote: 'Democratizar o acesso à agricultura em Inhambane. Transformar dados em colheitas, sonhos em realidade.',
    },
    cta: {
      eyebrow: 'Fase de produção',
      title: 'Pronto para plantar com dados?',
      lead: 'A IAgroMoz está a entrar em produção. Entra na plataforma e faz parte da rede que liga agricultura e inteligência.',
      button: 'Entrar na plataforma →',
      team: 'Um projeto da equipa ',
    },
    footer: {
      developedBy: 'Plataforma desenvolvida pela ', developedByBrand: 'Ku_kulaDevz',
      devsTitle: 'Desenvolvedores',
      partnersTitle: 'Parceiros e patrocinadores',
      altNames: 'Também procurada como Agromoz, iAgromoz ou Agro Moz — é tudo a mesma plataforma agrícola inteligente de Moçambique.',
      small: '© 2026 IAgroMoz · Ku_kulaDevz.',
    },
  },

  en: {
    nav: {
      links: [
        { href: '#tour', label: 'The app' },
        { href: '#plataforma', label: 'Platform' },
        { href: '#perfis', label: 'Profiles' },
        { href: '#missao', label: 'Mission' },
      ],
      cta: 'Enter',
    },
    hero: {
      eyebrow: 'Agriculture · Livestock · AI — Mozambique',
      titlePre: 'Technology that ',
      titleEm: 'cultivates',
      titlePost: ' hope',
      lead: 'IAgroMoz is the platform that brings together agriculture, livestock and artificial intelligence — knowledge, community and marketplace, all in one place, for those who produce in the Mozambican countryside.',
      ctaPrimary: 'Enter the platform →',
      ctaGhost: 'See the app from inside',
      chips: ['🌱 Agriculture', '🐄 Livestock', '🤖 Artificial Intelligence'],
      scrollHint: 'Scroll',
    },
    tour: {
      eyebrow: 'The app from inside',
      title: 'Take a tour of IAgroMoz',
      lead: 'Slide through the screens — Feed, Marketplace, AI Chat and Techniques.',
      captions: [
        { num: '01 · Feed', title: 'Everything happens in the Feed', body: 'The social network of the field and the home screen — visible even without a session. Share harvests, tips and alerts; like, comment and share.', screen: 'feed' },
        { num: '02 · Marketplace', title: 'Buy and sell', body: 'Publish products with price, stock and district. Buyers reserve, negotiate by chat and rate the product and seller.', screen: 'mercado' },
        { num: '03 · AI Chat', title: 'Ask and get advice', body: 'Describe the problem by text or send a photo of the plant. The AI replies in your language and keeps the history in sessions.', screen: 'chat' },
        { num: '04 · Techniques', title: 'Learn with the community', body: 'Good practices submitted by everyone. Each technique goes to a vote (👍/👎) until it is approved or rejected by the community.', screen: 'tecnicas' },
      ],
      dotLabels: ['Feed', 'Marketplace', 'Chat', 'Techniques'],
    },
    platform: {
      eyebrow: 'The platform',
      title: 'One platform, four tools',
      lead: 'Before you choose your profile, meet what IAgroMoz offers everyone.',
      modules: [
        { icon: 'bi-grid-3x3', title: 'Feed', desc: "The field's social network — share, learn and follow the community." },
        { icon: 'bi-robot', title: 'AI Chat', desc: 'Advice by text, voice or photo, in your language, saved in sessions.' },
        { icon: 'bi-shop', title: 'Marketplace', desc: 'Buy and sell with price, stock and district — reserve and negotiate by chat.' },
        { icon: 'bi-lightbulb', title: 'Techniques', desc: 'Good practices from the community, approved by vote (👍/👎).' },
      ],
      diffTitle: 'Built for the field',
      differentiators: ['Text, voice or photo', 'Educational content', 'Real community'],
    },
    profiles: {
      eyebrow: 'User profiles',
      title: 'A place for every role',
      lead: 'From the curious visitor to the seller with a tax ID — each profile has its own permissions.',
      cards: [
        {
          key: 'user', badge: 'Regular user', title: 'Explore and learn', screen: 'criar',
          desc: 'The person who wants to discover the platform.',
          can: ['View the Feed and Marketplace', 'Vote on Techniques', 'Chat with the AI assistant'],
          cannot: ['Publish or sell'],
        },
        {
          key: 'producer', badge: 'Producer', title: 'Grow, share, sell', screen: 'tecnicas',
          desc: 'Whoever farms or creates — with their own management dashboard.',
          can: ['Publish posts on the Feed', 'Sell on the Marketplace', 'Submit Techniques', 'Sales and feed dashboard'],
          cannot: [],
        },
        {
          key: 'seller', badge: 'Seller', title: 'Focused on business', screen: 'mercado',
          desc: 'A commercial account — individual or store/company, with a tax ID.',
          can: ['Sell on the Marketplace', 'Store/company profile'],
          cannot: ['Publish on the Feed', 'Vote on Techniques'],
        },
      ],
    },
    feedback: {
      web: { eyebrow: 'Who is testing', title: 'Voices from our first testers', lead: 'Real snippets from people already putting IAgroMoz to the test, while we head into production.' },
      mobile: { eyebrow: 'Who is testing', title: 'Voices from the first testers', lead: 'Snippets from people already putting IAgroMoz to the test.' },
    },
    mission: {
      eyebrow: 'Our mission',
      quote: 'Democratize access to agriculture in Mozambique. Turn data into harvests, dreams into reality.',
    },
    cta: {
      eyebrow: 'Production phase',
      title: 'Ready to plant with data?',
      lead: 'IAgroMoz is heading into production. Enter the platform and be part of the network connecting agriculture and intelligence.',
      button: 'Enter the platform →',
      team: 'A project by the ',
    },
    footer: {
      developedBy: 'Platform developed by ', developedByBrand: 'Ku_kulaDevz',
      devsTitle: 'Developers',
      partnersTitle: 'Partners and sponsors',
      altNames: 'Also searched as Agromoz, iAgromoz or Agro Moz — it\'s all the same smart agricultural platform for Mozambique.',
      small: '© 2026 IAgroMoz · Ku_kulaDevz.',
    },
  },
}

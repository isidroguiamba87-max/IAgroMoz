// Dicionário PT/EN da landing page — cada componente lê copy[lang].<secção>.
// Textos PT são os originais da página; textos EN são traduções fiéis (a
// página original só tinha algumas strings EN documentadas explicitamente,
// as restantes foram traduzidas para completar o par).

export const copy = {
  pt: {
    nav: {
      links: [
        { href: '#tour', label: 'A app' },
        { href: '#perfis', label: 'Perfis' },
        { href: '#missao', label: 'Missão' },
      ],
      cta: 'Entrar',
    },
    hero: {
      eyebrow: 'AgTech · Moçambique',
      titlePre: 'Tecnologia que ',
      titleEm: 'cultiva',
      titlePost: ' esperança',
      lead: 'A IAgroMoz liga o saber da terra à inteligência artificial — planta com dados, vende com comunidade, cresce com quem cultiva ao teu lado.',
      ctaPrimary: 'Entrar na plataforma →',
      ctaGhost: 'Ver a app por dentro',
      chips: ['Funciona offline', 'Multi-idioma', 'Texto, voz ou foto'],
      scrollHint: 'Faz scroll',
    },
    tour: {
      eyebrow: 'A app por dentro',
      title: 'Percorre a IAgroMoz',
      lead: 'Desliza pelas telas — Feed, Chat, Técnicas, Mercado e Perfis.',
      captions: [
        { num: '01 · Perfis', title: 'Escolhe o teu perfil', body: 'Começa por aqui: Utilizador, Produtor ou Vendedor — cada conta com as suas permissões. Cria a tua em segundos e começa a plantar com dados.', screen: 'criar' },
        { num: '02 · Feed', title: 'Tudo acontece no Feed', body: 'A rede social do campo e a página inicial — visível mesmo sem sessão. Partilha colheitas, dicas e avisos; gosta, comenta e partilha.', screen: 'feed' },
        { num: '03 · Chat IA', title: 'Pergunta e recebe conselhos', body: 'Descreve o problema por texto ou envia uma foto da planta. A IA responde na tua língua e guarda o histórico em sessões.', screen: 'chat' },
        { num: '04 · Técnicas', title: 'Aprende com a comunidade', body: 'Boas práticas submetidas por todos. Cada técnica fica em votação (👍/👎) até ser aprovada ou reprovada pela comunidade.', screen: 'tecnicas' },
        { num: '05 · Mercado', title: 'Compra e vende', body: 'Publica produtos com preço, stock e distrito. Compradores reservam, negoceiam por chat e avaliam produto e vendedor.', screen: 'mercado' },
      ],
      dotLabels: ['Perfis', 'Feed', 'Chat', 'Técnicas', 'Mercado'],
    },
    profiles: {
      eyebrow: 'Perfis de utilizador',
      title: 'Um lugar para cada papel',
      lead: 'Da pessoa curiosa ao vendedor com NUIT — cada perfil tem as suas permissões.',
      cards: [
        {
          key: 'user', badge: 'Utilizador comum', title: 'Explora e aprende',
          desc: 'A pessoa que quer descobrir a plataforma.',
          can: ['Ver o Feed e o Mercado', 'Votar em Técnicas', 'Conversar com o Chat IA'],
          cannot: ['Publicar ou vender'],
        },
        {
          key: 'producer', badge: 'Produtor', title: 'Cultiva, partilha, vende',
          desc: 'Quem cultiva ou cria — com painel próprio de gestão.',
          can: ['Publicar posts no Feed', 'Vender no Mercado', 'Submeter Técnicas', 'Painel de vendas e feed'],
          cannot: [],
        },
        {
          key: 'seller', badge: 'Vendedor', title: 'Foco no negócio',
          desc: 'Conta comercial — individual ou loja/empresa, com NUIT.',
          can: ['Vender no Mercado', 'Perfil de loja/empresa'],
          cannot: ['Publicar no Feed', 'Votar em Técnicas'],
        },
      ],
    },
    feedback: {
      web: { eyebrow: 'Quem está a testar', title: 'Vozes dos nossos primeiros testers', lead: 'Recortes reais de quem já pôs a IAgroMoz à prova, enquanto entramos em produção.', hint: '↓ Faz scroll — a roda gira' },
      mobile: { eyebrow: 'Quem está a testar', title: 'Vozes dos primeiros testers', lead: 'Recortes de quem já pôs a IAgroMoz à prova.' },
    },
    mission: {
      eyebrow: 'A nossa missão',
      quote: 'Democratizar o acesso à agricultura em Moçambique. Transformar dados em colheitas, sonhos em realidade.',
    },
    cta: {
      eyebrow: 'Fase de produção',
      title: 'Pronto para plantar com dados?',
      lead: 'A IAgroMoz está a entrar em produção. Entra na plataforma e faz parte da rede que liga agricultura e inteligência.',
      button: 'Entrar na plataforma →',
      team: 'Um projeto da equipa ',
    },
    footer: {
      small: '© 2026 IAgroMoz. Tecnologia que cultiva esperança.',
    },
  },

  en: {
    nav: {
      links: [
        { href: '#tour', label: 'The app' },
        { href: '#perfis', label: 'Profiles' },
        { href: '#missao', label: 'Mission' },
      ],
      cta: 'Enter',
    },
    hero: {
      eyebrow: 'AgTech · Mozambique',
      titlePre: 'Technology that ',
      titleEm: 'cultivates',
      titlePost: ' hope',
      lead: 'IAgroMoz connects the wisdom of the land with artificial intelligence — plant with data, sell with community, grow alongside those who farm with you.',
      ctaPrimary: 'Enter the platform →',
      ctaGhost: 'See the app from inside',
      chips: ['Works offline', 'Multi-language', 'Text, voice or photo'],
      scrollHint: 'Scroll',
    },
    tour: {
      eyebrow: 'The app from inside',
      title: 'Take a tour of IAgroMoz',
      lead: 'Slide through the screens — Feed, Chat, Techniques, Marketplace and Profiles.',
      captions: [
        { num: '01 · Profiles', title: 'Choose your profile', body: 'Start here: User, Producer or Seller — each account with its own permissions. Create yours in seconds and start planting with data.', screen: 'criar' },
        { num: '02 · Feed', title: 'Everything happens in the Feed', body: 'The social network of the field and the home screen — visible even without a session. Share harvests, tips and alerts; like, comment and share.', screen: 'feed' },
        { num: '03 · AI Chat', title: 'Ask and get advice', body: 'Describe the problem by text or send a photo of the plant. The AI replies in your language and keeps the history in sessions.', screen: 'chat' },
        { num: '04 · Techniques', title: 'Learn with the community', body: 'Good practices submitted by everyone. Each technique goes to a vote (👍/👎) until it is approved or rejected by the community.', screen: 'tecnicas' },
        { num: '05 · Marketplace', title: 'Buy and sell', body: 'Publish products with price, stock and district. Buyers reserve, negotiate by chat and rate the product and seller.', screen: 'mercado' },
      ],
      dotLabels: ['Profiles', 'Feed', 'Chat', 'Techniques', 'Marketplace'],
    },
    profiles: {
      eyebrow: 'User profiles',
      title: 'A place for every role',
      lead: 'From the curious visitor to the seller with a tax ID — each profile has its own permissions.',
      cards: [
        {
          key: 'user', badge: 'Regular user', title: 'Explore and learn',
          desc: 'The person who wants to discover the platform.',
          can: ['View the Feed and Marketplace', 'Vote on Techniques', 'Chat with the AI assistant'],
          cannot: ['Publish or sell'],
        },
        {
          key: 'producer', badge: 'Producer', title: 'Grow, share, sell',
          desc: 'Whoever farms or creates — with their own management dashboard.',
          can: ['Publish posts on the Feed', 'Sell on the Marketplace', 'Submit Techniques', 'Sales and feed dashboard'],
          cannot: [],
        },
        {
          key: 'seller', badge: 'Seller', title: 'Focused on business',
          desc: 'A commercial account — individual or store/company, with a tax ID.',
          can: ['Sell on the Marketplace', 'Store/company profile'],
          cannot: ['Publish on the Feed', 'Vote on Techniques'],
        },
      ],
    },
    feedback: {
      web: { eyebrow: 'Who is testing', title: 'Voices from our first testers', lead: 'Real snippets from people already putting IAgroMoz to the test, while we head into production.', hint: '↓ Scroll — the wheel turns' },
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
      small: '© 2026 IAgroMoz. Technology that cultivates hope.',
    },
  },
}

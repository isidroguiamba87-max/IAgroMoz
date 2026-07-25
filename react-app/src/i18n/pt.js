// Dicionário base em português (PT-MZ).
// Estrutura pronta para adicionar outras línguas (ex: en, sn, ny).
// Para usar: import { t } from '../i18n'  →  t('marketplace.title')

const pt = {
  common: {
    loading:    'Carregando...',
    error:      'Ocorreu um erro.',
    retry:      'Tentar novamente',
    back:       'Voltar',
    save:       'Guardar',
    cancel:     'Cancelar',
    confirm:    'Confirmar',
    delete:     'Apagar',
    edit:       'Editar',
    close:      'Fechar',
    send:       'Enviar',
    search:     'Pesquisar',
    noResults:  'Sem resultados.',
  },
  auth: {
    login:         'Entrar',
    logout:        'Sair',
    register:      'Criar conta',
    email:         'Email',
    password:      'Palavra-passe',
    forgotPassword:'Esqueceu a palavra-passe?',
    sessionExpired:'Sessão expirada. Faça login novamente.',
  },
  marketplace: {
    title:       'Mercado',
    noProducts:  'Nenhum produto encontrado.',
    price:       'Preço',
    buy:         'Reservar',
    seller:      'Vendedor',
    category:    'Categoria',
  },
  feed: {
    title:       'Comunidade',
    createPost:  'Criar publicação',
    like:        'Gosto',
    comment:     'Comentar',
    share:       'Partilhar',
    noPost:      'Nenhuma publicação ainda.',
  },
  transactions: {
    title:       'Minhas Reservas',
    active:      'Ativas',
    history:     'Histórico',
    status: {
      RESERVED:               'Reservado',
      AWAITING_PAYMENT:       'Aguardando Pagamento',
      AWAITING_CONFIRMATION:  'Aguardando Confirmação',
      PROCESSING:             'Em Processamento',
      IN_TRANSIT:             'A Caminho',
      COMPLETED:              'Entregue/Finalizado',
      CANCELLED:              'Cancelado',
    },
  },
  chat: {
    title:       'Assistente Agrícola IA',
    placeholder: 'Escreva uma mensagem...',
  },
}

export default pt

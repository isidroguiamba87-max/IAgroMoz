// Error tracking centralizado — funciona sem serviço externo.
// Para integrar Sentry: substituir os comentários "TODO: Sentry" pelos calls equivalentes.
//
//   import * as Sentry from '@sentry/react'
//   Sentry.init({ dsn: '...' })
//   Em captureError: Sentry.captureException(error, { extra: context })

const isDev = import.meta.env.DEV

function getSessionContext() {
  return {
    userId:   localStorage.getItem('userId')   || 'anonymous',
    userRole: localStorage.getItem('userRole') || 'unknown',
    url:      window.location.href,
    ts:       new Date().toISOString(),
  }
}

export function captureError(error, context = {}) {
  const ctx = { ...getSessionContext(), ...context }

  if (isDev) {
    console.error('[ErrorTracking]', error, ctx)
    return
  }

  // TODO: Sentry — Sentry.captureException(error, { extra: ctx })
  // Por agora: log estruturado no console (visível em painéis como Vercel Logs)
  console.error(JSON.stringify({
    message: error?.message || String(error),
    stack:   error?.stack?.split('\n').slice(0, 5).join(' | '),
    ...ctx,
  }))
}

export function captureMessage(message, level = 'info', context = {}) {
  const ctx = { ...getSessionContext(), ...context }

  if (isDev) {
    console.info('[ErrorTracking]', level, message, ctx)
    return
  }

  // TODO: Sentry — Sentry.captureMessage(message, { level, extra: ctx })
  if (level === 'error' || level === 'warning') {
    console.warn(JSON.stringify({ message, level, ...ctx }))
  }
}

// Regista handlers globais para erros não capturados
export function initErrorTracking() {
  window.addEventListener('error', (event) => {
    captureError(event.error || new Error(event.message), {
      source:  event.filename,
      lineno:  event.lineno,
      colno:   event.colno,
      type:    'uncaught_error',
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error
      ? event.reason
      : new Error(String(event.reason))
    captureError(error, { type: 'unhandled_promise_rejection' })
  })
}

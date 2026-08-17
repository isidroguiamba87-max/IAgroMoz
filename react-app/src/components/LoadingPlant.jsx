// Indicador de carregamento padrão da app — logo + pontos animados.
// Usado como loader de secção/página (não para spinners pequenos dentro de
// botões, que continuam com o seu próprio ícone giratório).
function LoadingPlant() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <img src="/logo.png" alt="IAgroMOZ" className="w-10 h-10 object-contain opacity-80" />
      <div className="flex items-center gap-1.5">
        {[0, 1, 2, 3, 4].map(i => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-green-500"
            style={{ animation: 'iagro-loading-bounce 1.2s infinite', animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
      <style>{`
        @keyframes iagro-loading-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default LoadingPlant

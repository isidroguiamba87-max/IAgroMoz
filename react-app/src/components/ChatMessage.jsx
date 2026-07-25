import ReactMarkdown from 'react-markdown'

function ChatMessage({ message, isAI, timestamp, image }) {
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[80%] ${isAI ? 'chat-ai-message' : 'chat-user-message'}`}>
        {isAI && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <i className="bi bi-robot text-white text-xs"></i>
            </div>
            <span className="text-xs font-semibold text-blue-600">Assistente Agrícola</span>
          </div>
        )}

        {image && (
          <div className="mb-3">
            <img src={image} alt="Imagem enviada"
              className="rounded-lg max-w-full h-auto border-2 border-gray-200"
              style={{ maxHeight: '300px' }}
              loading="lazy"
              decoding="async" />
          </div>
        )}

        {message && (
          isAI ? (
            <div className="text-sm leading-relaxed markdown-body" style={{ color: 'inherit' }}>
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-lg font-bold mt-3 mb-1">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-bold mt-3 mb-1">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-bold mt-2 mb-1">{children}</h3>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2 pl-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2 pl-2">{children}</ol>,
                  li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  code: ({ inline, children }) => inline
                    ? <code className="bg-gray-100 text-green-700 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
                    : <pre className="bg-gray-100 rounded-lg p-3 my-2 overflow-x-auto"><code className="text-xs font-mono">{children}</code></pre>,
                  blockquote: ({ children }) => <blockquote className="border-l-4 border-green-500 pl-3 my-2 italic opacity-80">{children}</blockquote>,
                  hr: () => <hr className="my-3 opacity-20" />,
                }}
              >
                {message}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'inherit' }}>{message}</p>
          )
        )}

        {timestamp && (
          <span className="text-xs text-gray-400 mt-2 block flex items-center gap-1">
            <i className="bi bi-clock" style={{ fontSize: '10px' }}></i>
            {timestamp}
          </span>
        )}
      </div>
    </div>
  )
}

export default ChatMessage

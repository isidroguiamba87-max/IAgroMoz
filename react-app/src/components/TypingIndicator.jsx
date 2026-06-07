function TypingIndicator() {
  return (
    <div className="chat-ai-message inline-flex items-center gap-2 px-4 py-3">
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
        <span className="text-white text-xs">🤖</span>
      </div>
      <div className="typing-indicator flex gap-1">
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
      </div>
    </div>
  )
}

export default TypingIndicator

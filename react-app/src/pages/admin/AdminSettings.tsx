import { SectionHeader } from './AdminComponents'

function AdminSettings() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Configurações" subtitle="Espaço reservado para definições avançadas do painel administrativo." />
      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500 shadow-sm">
        <p className="text-lg font-semibold text-gray-900 mb-2">Funcionalidade em desenvolvimento</p>
        <p className="text-sm text-gray-500">Aqui estarão opções de configuração da plataforma, roles, segurança e personalização do admin.</p>
      </div>
    </div>
  )
}

export default AdminSettings

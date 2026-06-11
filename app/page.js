export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7f2] text-[#1f2933]">

      {/* TOPO */}

      <section className="bg-green-900 text-white px-6 py-10 shadow-lg">

        <div className="max-w-7xl mx-auto">

          <p className="text-green-200 text-lg">
            Gestão Rural Inteligente
          </p>

          <h1
            className="text-4xl md:text-5xl font-bold mt-3"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Painel da Fazenda
          </h1>

          <p className="mt-6 text-lg text-green-100 max-w-2xl leading-8">
            Controle sanitário, manejo, reprodução, visitas técnicas
            e acompanhamento completo da propriedade.
          </p>

        </div>

      </section>

      {/* CARDS */}

      <section className="px-6 py-12">

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">

          <a
            href="/animais"
            className="bg-white rounded-3xl p-8 shadow-md border border-green-100 hover:shadow-xl transition-all block"
          >

            <div className="text-5xl mb-5">
              🐄
            </div>

            <h2 className="text-2xl font-bold text-green-900">
              Animais
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Cadastro e controle de animais e lotes.
            </p>

          </a>

          <a
            href="/sanidade"
            className="bg-white rounded-3xl p-8 shadow-md border border-green-100 hover:shadow-xl transition-all block"
          >

            <div className="text-5xl mb-5">
              💉
            </div>

            <h2 className="text-2xl font-bold text-green-900">
              Sanidade
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Vacinas, protocolos e tratamentos.
            </p>

          </a>

          <a
            href="/visitas"
            className="bg-white rounded-3xl p-8 shadow-md border border-green-100 hover:shadow-xl transition-all block"
          >

            <div className="text-5xl mb-5">
              📋
            </div>

            <h2 className="text-2xl font-bold text-green-900">
              Visitas
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Relatórios técnicos e acompanhamento.
            </p>

          </a>

          <a
            href="/relatorios"
            className="bg-white rounded-3xl p-8 shadow-md border border-green-100 hover:shadow-xl transition-all block"
          >

            <div className="text-5xl mb-5">
              📈
            </div>

            <h2 className="text-2xl font-bold text-green-900">
              Relatórios
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Indicadores e resultados da fazenda.
            </p>

          </a>

        </div>

      </section>

    </main>
  )
}
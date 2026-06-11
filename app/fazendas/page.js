"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/db";

export default function Fazendas() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [fazendas, setFazendas] = useState([]);
  const [fazendaEditando, setFazendaEditando] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    proprietario: "",
    telefone: "",
    cidade: "",
    estado: "",
    endereco: "",
    areaTotal: "",
    atividade: "",
    observacoes: "",
  });

  async function carregarFazendas() {
    const lista = await db.fazendas.orderBy("createdAt").reverse().toArray();
    setFazendas(lista.filter((fazenda) => fazenda.status !== "deletado"));
  }

  useEffect(() => {
    carregarFazendas();
  }, []);

  function atualizarCampo(campo, valor) {
    setForm((formAtual) => ({
      ...formAtual,
      [campo]: valor,
    }));
  }

  function limparFormulario() {
    setForm({
      nome: "",
      proprietario: "",
      telefone: "",
      cidade: "",
      estado: "",
      endereco: "",
      areaTotal: "",
      atividade: "",
      observacoes: "",
    });
  }

  async function salvarFazenda() {
    if (!form.nome) {
      alert("Preencha o nome da fazenda.");
      return;
    }

    if (fazendaEditando) {
      await db.fazendas.update(fazendaEditando.id, {
        ...form,
        status: fazendaEditando.status || "ativa",
      });
      setFazendaEditando(null);
    } else {
      await db.fazendas.add({
        ...form,
        status: "ativa",
        createdAt: new Date().toISOString(),
      });
    }

    limparFormulario();
    setMostrarFormulario(false);
    carregarFazendas();
  }

  function editarFazenda(fazenda) {
    setFazendaEditando(fazenda);

    setForm({
      nome: fazenda.nome || "",
      proprietario: fazenda.proprietario || "",
      telefone: fazenda.telefone || "",
      cidade: fazenda.cidade || "",
      estado: fazenda.estado || "",
      endereco: fazenda.endereco || "",
      areaTotal: fazenda.areaTotal || "",
      atividade: fazenda.atividade || "",
      observacoes: fazenda.observacoes || "",
    });

    setMostrarFormulario(true);
  }

  async function excluirFazenda(id) {
    const confirmar = confirm("Deseja excluir esta fazenda?");
    if (!confirmar) return;

    await db.fazendas.update(id, {
      status: "deletado",
    });

    carregarFazendas();
  }

  return (
    <main className="min-h-screen bg-[#f5f7f2] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-green-700 font-semibold">
              Gestão de Propriedades
            </p>

            <h1
              className="text-4xl font-bold text-green-900 mt-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Fazendas
            </h1>
          </div>

          <button
            onClick={() => {
              setFazendaEditando(null);
              limparFormulario();
              setMostrarFormulario(true);
            }}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all"
          >
            + Nova Fazenda
          </button>
        </div>

        {mostrarFormulario && (
          <div className="bg-white rounded-3xl shadow-md p-8 border border-green-100 mb-10">
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              {fazendaEditando ? "Editar Fazenda" : "Cadastro de Fazenda"}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Nome da fazenda"
                value={form.nome}
                onChange={(e) => atualizarCampo("nome", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700"
              />

              <input
                type="text"
                placeholder="Proprietário"
                value={form.proprietario}
                onChange={(e) => atualizarCampo("proprietario", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700"
              />

              <input
                type="text"
                placeholder="Telefone"
                value={form.telefone}
                onChange={(e) => atualizarCampo("telefone", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700"
              />

              <input
                type="text"
                placeholder="Cidade"
                value={form.cidade}
                onChange={(e) => atualizarCampo("cidade", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700"
              />

              <input
                type="text"
                placeholder="Estado"
                value={form.estado}
                onChange={(e) => atualizarCampo("estado", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700"
              />

              <input
                type="text"
                placeholder="Endereço / localização"
                value={form.endereco}
                onChange={(e) => atualizarCampo("endereco", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700"
              />

              <input
                type="number"
                placeholder="Área total em hectares"
                value={form.areaTotal}
                onChange={(e) => atualizarCampo("areaTotal", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700"
              />

              <select
                value={form.atividade}
                onChange={(e) => atualizarCampo("atividade", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700 bg-white"
              >
                <option value="" disabled hidden>
                  Atividade principal
                </option>
                <option value="Cria">Cria</option>
                <option value="Recria">Recria</option>
                <option value="Engorda">Engorda</option>
                <option value="Ciclo completo">Ciclo completo</option>
                <option value="Leite">Leite</option>
                <option value="Mista">Mista</option>
              </select>

              <textarea
                placeholder="Observações"
                value={form.observacoes}
                onChange={(e) => atualizarCampo("observacoes", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700 md:col-span-2 min-h-[120px]"
              ></textarea>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={salvarFazenda}
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-2xl font-semibold"
              >
                {fazendaEditando ? "Salvar Alterações" : "Salvar Fazenda"}
              </button>

              <button
                onClick={() => {
                  setMostrarFormulario(false);
                  setFazendaEditando(null);
                  limparFormulario();
                }}
                className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-2xl font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-md p-8 border border-green-100">
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            Fazendas Cadastradas
          </h2>

          {fazendas.length === 0 ? (
            <p className="text-gray-600">
              Nenhuma fazenda cadastrada ainda.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {fazendas.map((fazenda) => (
                <div
                  key={fazenda.id}
                  className="border border-green-100 rounded-3xl p-6 bg-[#f8faf6]"
                >
                  <h3 className="text-xl font-bold text-green-900">
                    {fazenda.nome}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Proprietário: {fazenda.proprietario || "Não informado"}
                  </p>

                  <p className="text-gray-600 mt-1">
                    Cidade: {fazenda.cidade || "Não informada"}
                  </p>

                  <p className="text-gray-600 mt-1">
                    Estado: {fazenda.estado || "Não informado"}
                  </p>

                  <p className="text-gray-600 mt-1">
                    Atividade: {fazenda.atividade || "Não informada"}
                  </p>

                  <p className="mt-4 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                    {fazenda.status || "ativa"}
                  </p>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => editarFazenda(fazenda)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-xl font-semibold text-sm transition-all"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => excluirFazenda(fazenda.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-xl font-semibold text-sm transition-all"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
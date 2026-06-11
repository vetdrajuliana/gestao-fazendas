"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/db";

const racas = [
  "Angus",
  "Braford",
  "Brahman",
  "Brangus",
  "Caracu",
  "Charolais",
  "Cruzado",
  "Gir",
  "Girolando",
  "Guzerá",
  "Hereford",
  "Holandês",
  "Jersey",
  "Jersolando",
  "Nelore",
  "Senepol",
  "Sindi",
  "Tabapuã",
];

const categoriasPorSexo = {
  Fêmea: ["Bezerro(a)", "Novilha", "Matriz", "Vaca"],
  Macho: ["Bezerro(a)", "Garrote", "Boi", "Touro"],
};

const idades = [
  "0-12 meses",
  "13-24 meses",
  "25 a 36 meses",
  "Acima de 36 meses",
];

const fazendasCadastradas = [
  "Fazenda Santa Helena",
  "Fazenda Boa Vista",
  "Fazenda São José",
];

const lotesCadastrados = [
  "Lote Recria",
  "Lote Engorda",
  "Matrizes",
];

const piquetesCadastrados = [
  "Piquete 01",
  "Piquete 02",
];

export default function Animais() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [animais, setAnimais] = useState([]);
  const [animalEditando, setAnimalEditando] = useState(null);


   const [form, setForm] = useState({
  identificacao: "",
  chipEletronico: "",
  raca: "",
  sexo: "",
  categoria: "",
  dataEntrada: "",
  idade: "",
  idadeMeses: "",
  peso: "",
  fazenda: "",
  fazendaOrigem: "",
  lote: "",
piquete: "",
  observacoes: "",
});

  async function carregarAnimais() {
    const lista = await db.animais.orderBy("createdAt").reverse().toArray();
    setAnimais(lista.filter((animal) => animal.status !== "deletado"));
  }

  useEffect(() => {
    carregarAnimais();
  }, []);

 function atualizarCampo(campo, valor) {
  setForm((formAtual) => ({
    ...formAtual,
    [campo]: valor,
  }));
}

function calcularFaixaIdade(idade) {
  const numero = Number(idade);

  if (idade === "" || Number.isNaN(numero)) {
    return "";
  }

  if (numero >= 0 && numero <= 12) {
    return "0-12 meses";
  }

  if (numero >= 13 && numero <= 24) {
    return "13-24 meses";
  }

  if (numero >= 25 && numero <= 36) {
    return "25 a 36 meses";
  }

  if (numero > 36) {
    return "Acima de 36 meses";
  }

  return "";
}

function atualizarIdade(valor) {
  setForm((formAtual) => ({
    ...formAtual,
    idade: valor,
    idadeMeses: calcularFaixaIdade(valor),
  }));
}

  function limparFormulario() {
  setForm({
    identificacao: "",
    chipEletronico: "",
    raca: "",
    sexo: "",
    categoria: "",
    dataEntrada: "",
    idade: "",
    idadeMeses: "",
    peso: "",
    fazenda: "",
    fazendaOrigem: "",
    lote: "",
    observacoes: "",
  });
  }

  async function salvarAnimal() {
    if (!form.identificacao) {
      alert("Preencha a identificação / brinco do animal.");
      return;
    }

    if (animalEditando) {
      await db.animais.update(animalEditando.id, {
        ...form,
        status: animalEditando.status || "ativo",
      });
      setAnimalEditando(null);
    } else {
      await db.animais.add({
        ...form,
        status: "ativo",
        createdAt: new Date().toISOString(),
      });
    }

    limparFormulario();
    setMostrarFormulario(false);
    carregarAnimais();
  }

  function editarAnimal(animal) {
    setAnimalEditando(animal);

    setForm({
      identificacao: animal.identificacao || "",
      chipEletronico: animal.chipEletronico || "",
      raca: animal.raca || "",
      sexo: animal.sexo || "",
      categoria: animal.categoria || "",
      dataEntrada: animal.dataEntrada || "",
      idadeMeses: animal.idadeMeses || "",
      peso: animal.peso || "",
      fazenda: animal.fazenda || "",
      lote: animal.lote || "",
      observacoes: animal.observacoes || "",
    });

    setMostrarFormulario(true);
  }

  async function excluirAnimal(id) {
    const confirmar = confirm("Deseja excluir este animal?");
    if (!confirmar) return;

    await db.animais.update(id, {
      status: "deletado",
    });

    carregarAnimais();
  }

  return (
    <main className="min-h-screen bg-[#f5f7f2] p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-green-700 font-semibold">
              Gestão de Rebanho
            </p>

            <h1
              className="text-4xl font-bold text-green-900 mt-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Animais
            </h1>
          </div>

          <button
            onClick={() => {
              setAnimalEditando(null);
              limparFormulario();
              setMostrarFormulario(true);
            }}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all"
          >
            + Novo Animal
          </button>
        </div>

        {mostrarFormulario && (
          <div className="bg-white rounded-3xl shadow-md p-8 border border-green-100 mb-10">
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              {animalEditando ? "Editar Animal" : "Cadastro de Animal"}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Identificação / Brinco"
                value={form.identificacao}
                onChange={(e) => atualizarCampo("identificacao", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700"
              />

              <input
                type="text"
                placeholder="Chip eletrônico"
                value={form.chipEletronico}
                onChange={(e) => atualizarCampo("chipEletronico", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700"
              />

              <select
                value={form.raca}
                onChange={(e) => atualizarCampo("raca", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700"
              >
                <option value="" disabled hidden>
  Raça
</option>
                {racas.map((raca) => (
                  <option key={raca} value={raca}>
                    {raca}
                  </option>
                ))}
              </select>

              <select
                value={form.sexo}
                onChange={(e) => {
                  const sexoSelecionado = e.target.value;

                  setForm((formAtual) => ({
                    ...formAtual,
                    sexo: sexoSelecionado,
                    categoria: "",
                  }));
                }}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700 bg-white"
              >
                <option value="" disabled hidden>
  Sexo
</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>

              <select
                value={form.categoria}
                onChange={(e) => atualizarCampo("categoria", e.target.value)}
                disabled={!form.sexo}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700 bg-white disabled:bg-gray-100"
              >
               <option value="" disabled hidden>
  {form.sexo ? "Categoria" : "Selecione o sexo primeiro"}
</option>

                {(categoriasPorSexo[form.sexo] || []).map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={form.dataEntrada}
                onChange={(e) => atualizarCampo("dataEntrada", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700"
              />

            
                <input
  type="number"
  min="0"
  placeholder="Idade"
  value={form.idade}
  onChange={(e) => atualizarIdade(e.target.value)}
  className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700"
/>

<select
  value={form.idadeMeses}
  disabled
  className="border border-gray-200 rounded-2xl p-4 outline-none bg-gray-100 text-gray-700"
>
  <option value="" disabled hidden>
  Idade em Meses
</option>

  {idades.map((idade) => (
    <option key={idade} value={idade}>
      {idade}
    </option>
  ))}
</select>

              <input
                type="number"
                placeholder="Peso aproximado (kg)"
                value={form.peso}
                onChange={(e) => atualizarCampo("peso", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700"
              />

              <select
        
                value={form.fazenda}
                onChange={(e) => atualizarCampo("fazenda", e.target.value)}
                className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700 bg-white"
              >
                <option value="" disabled hidden>
  Fazenda
</option>
                {fazendasCadastradas.map((fazenda) => (
                  <option key={fazenda} value={fazenda}>
                    {fazenda}
                  </option>
                ))}
              </select>
<select
  value={form.fazendaOrigem}
  onChange={(e) => atualizarCampo("fazendaOrigem", e.target.value)}
  className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700 bg-white"
>
  <option value="" disabled hidden>
  Fazenda de origem
</option>

  {fazendasCadastradas.map((fazenda) => (
    <option key={fazenda} value={fazenda}>
      {fazenda}
    </option>
  ))}
</select>

              <select
  value={form.lote}
  onChange={(e) => atualizarCampo("lote", e.target.value)}
  className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700 bg-white"
>
  <option value="" disabled hidden>
    Lote
  </option>

  {lotesCadastrados.map((lote) => (
    <option key={lote} value={lote}>
      {lote}
    </option>
  ))}
</select>

<select
  value={form.piquete || ""}
  onChange={(e) => atualizarCampo("piquete", e.target.value)}
  className="border border-gray-200 rounded-2xl p-4 outline-none focus:border-green-700 bg-white"
>
  <option value="" disabled hidden>
    Piquete
  </option>

  {piquetesCadastrados.map((piquete) => (
    <option key={piquete} value={piquete}>
      {piquete}
    </option>
  ))}
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
                onClick={salvarAnimal}
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-2xl font-semibold"
              >
                {animalEditando ? "Salvar Alterações" : "Salvar Animal"}
              </button>

              <button
                onClick={() => {
                  setMostrarFormulario(false);
                  setAnimalEditando(null);
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
            Animais Cadastrados
          </h2>

          {animais.length === 0 ? (
            <p className="text-gray-600">
              Nenhum animal cadastrado ainda.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {animais.map((animal) => (
                <div
                  key={animal.id}
                  className="border border-green-100 rounded-3xl p-6 bg-[#f8faf6]"
                >
                  <h3 className="text-xl font-bold text-green-900">
                    {animal.identificacao}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Chip: {animal.chipEletronico || "Não informado"}
                  </p>

                  <p className="text-gray-600 mt-1">
                    Raça: {animal.raca || "Não informada"}
                  </p>

                  <p className="text-gray-600 mt-1">
                    Sexo: {animal.sexo || "Não informado"}
                  </p>

                  <p className="text-gray-600 mt-1">
                    Categoria: {animal.categoria || "Não informada"}
                  </p>

                  <p className="mt-4 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                    {animal.status || "ativo"}
                  </p>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => editarAnimal(animal)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-xl font-semibold text-sm transition-all"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => excluirAnimal(animal.id)}
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
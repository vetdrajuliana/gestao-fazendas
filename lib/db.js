import Dexie from "dexie";

export const db = new Dexie("GestaoFazendasDB");

db.version(2).stores({
  animais: "++id, identificacao, chipEletronico, raca, sexo, categoria, dataEntrada, idade, idadeMeses, peso, fazenda, fazendaOrigem, lote, piquete, status, observacoes, createdAt",

  fazendas: "++id, nome, createdAt",

  lotes: "++id, nome, fazenda, createdAt",
});
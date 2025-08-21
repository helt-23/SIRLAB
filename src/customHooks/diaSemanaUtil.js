// customHooks/diaSemanaUtils.js
export const DIAS_SEMANA = {
  SEGUNDA: 0,
  TERCA: 1,
  QUARTA: 2,
  QUINTA: 3,
  SEXTA: 4,
  SABADO: 5,
  DOMINGO: 6,
};

export const DIAS_SEMANA_ABREVIADO = {
  0: "Seg",
  1: "Ter",
  2: "Qua",
  3: "Qui",
  4: "Sex",
  5: "Sab",
  6: "Dom",
};

export const DIAS_SEMANA_COMPLETO = {
  0: "segunda",
  1: "terça",
  2: "quarta",
  3: "quinta",
  4: "sexta",
  5: "sábado",
  6: "domingo",
};

// Converter string do backend para número
export const diaStringParaNumero = (diaString) => {
  const mapa = {
    SEGUNDA: 0,
    TERCA: 1,
    QUARTA: 2,
    QUINTA: 3,
    SEXTA: 4,
    SABADO: 5,
    DOMINGO: 6,
  };
  return mapa[diaString] ?? 0; // Default para segunda-feira
};

// Converter número para string abreviada
export const numeroParaDiaAbreviado = (numero) => {
  return DIAS_SEMANA_ABREVIADO[numero] || "Seg";
};

// Converter número para string completa
export const numeroParaDiaCompleto = (numero) => {
  return DIAS_SEMANA_COMPLETO[numero] || "segunda";
};

// Converter string abreviada para número
export const diaAbreviadoParaNumero = (abreviacao) => {
  const mapa = {
    Seg: 0,
    Ter: 1,
    Qua: 2,
    Qui: 3,
    Sex: 4,
    Sab: 5,
    Dom: 6,
  };
  return mapa[abreviacao] ?? 0;
};

// Obter array ordenado de números de dias da semana
export const getDiasNumerosOrdenados = () => [0, 1, 2, 3, 4, 5, 6];

// Obter array de dias abreviados ordenados
export const getDiasAbreviadosOrdenados = () =>
  getDiasNumerosOrdenados().map(numeroParaDiaAbreviado);

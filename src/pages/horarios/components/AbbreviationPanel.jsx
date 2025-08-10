import { Info } from "lucide-react";

// Dicionário de abreviações acadêmicas
const academicAbbreviations = {
  IHC: "Interação Humano Computador",
  ES: "Engenharia de Software",
  BD: "Banco de Dados",
  SO: "Sistemas Operacionais",
  ML: "Machine Learning",
  EC: "Engenharia da Computação",
  SI: "Sistemas de Informação",
};

export function AbbreviationPanel() {
  // Converter o dicionário em array para mapeamento
  const abbreviationsList = Object.entries(academicAbbreviations);

  // Dividir em 2 colunas
  const half = Math.ceil(abbreviationsList.length / 2);
  const col1 = abbreviationsList.slice(0, half);
  const col2 = abbreviationsList.slice(half);

  return (
    <section className="abbreviation-panel">
      <h3 className="abbreviation-panel__header">
        <Info size={18} /> Legenda de Disciplinas
      </h3>

      <div className="abbreviation-panel__columns">
        <div className="abbreviation-panel__column">
          {col1.map(([abbr, meaning]) => (
            <div key={abbr} className="abbreviation-panel__item">
              <span className="abbreviation-panel__abbr">{abbr}:</span>
              <span className="abbreviation-panel__meaning">{meaning}</span>
            </div>
          ))}
        </div>

        <div className="abbreviation-panel__column">
          {col2.map(([abbr, meaning]) => (
            <div key={abbr} className="abbreviation-panel__item">
              <span className="abbreviation-panel__abbr">{abbr}:</span>
              <span className="abbreviation-panel__meaning">{meaning}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

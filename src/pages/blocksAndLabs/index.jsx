// pages/labSelection/index.js
import { useState, useEffect } from "react";
import { Breadcrumb } from "../../components";
import { useLabData } from "../../context/LabDataContext";
import { useNavigate, useLocation } from "react-router-dom";
import { LabsGridSection, Sidebar, WelcomeScreen } from "./labSelectComponents";
import "./styles/global.css";

export function LabSelection() {
  const { blocos, laboratorios, getLabSchedule } = useLabData();
  const [blocoSelecionado, setBlocoSelecionado] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Resetar seleção quando o breadcrumb for clicado
  useEffect(() => {
    if (location.state?.resetSelection) {
      setBlocoSelecionado(null);
    }
  }, [location.state]);

  const blocoAtual = blocoSelecionado
    ? blocos.find((b) => b.id === blocoSelecionado)
    : null;

  const labsDoBloco = blocoAtual
    ? blocoAtual.laboratorios.map((labId) => laboratorios[labId])
    : [];

  const handleVerHorarios = (labId) => {
    getLabSchedule(labId);
    navigate(`/laboratorios/${labId}`);
  };

  return (
    <div className="app-container">
      <main className="main-content-lab">
        <Sidebar
          blocos={blocos}
          blocoSelecionado={blocoSelecionado}
          setBlocoSelecionado={setBlocoSelecionado}
        />

        <section className="labs-section">
          <select
            className="block-select"
            value={blocoSelecionado || ""}
            onChange={(e) => setBlocoSelecionado(e.target.value || null)}
          >
            <option value="">Selecione um bloco</option>
            {blocos.map((bloco) => (
              <option key={bloco.id} value={bloco.id}>
                {bloco.nome}
              </option>
            ))}
          </select>

          <Breadcrumb />

          {!blocoSelecionado ? (
            <WelcomeScreen />
          ) : (
            <LabsGridSection
              blocoAtual={blocoAtual}
              labsDoBloco={labsDoBloco}
              handleVerHorarios={handleVerHorarios}
            />
          )}
        </section>
      </main>
    </div>
  );
}

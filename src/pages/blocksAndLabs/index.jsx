// pages/labSelection/index.js
import { useState, useEffect } from "react";
import { Breadcrumb } from "../../components";
import { useLabData } from "../../context/LabDataContext";
import { useNavigate, useLocation } from "react-router-dom";
import { LabsGridSection, Sidebar, WelcomeScreen } from "./labSelectComponents";
import { useLaboratorioManager} from "../../features/laboratorio/useLaboratorio"
import {useBlocoManager} from "../../features/bloco/useBloco"
import "./styles/global.css";

export function LabSelection() {
  const { getLabSchedule } = useLabData();
  const [blocoSelecionado, setBlocoSelecionado] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const useLaboratorio = useLaboratorioManager()
  const laboratorio = useLaboratorio.laboratorios

  const useBloco = useBlocoManager()
  const bloco = useBloco.blocos
  // Resetar seleção quando o breadcrumb for clicado
  useEffect(() => {
    if (location.state?.resetSelection) {
      setBlocoSelecionado(null);
    }
  }, [location.state]);

  useEffect(() => {
    useLaboratorio.setBlocoId(blocoAtual?.id)
  }, [blocoSelecionado])

  const blocoAtual = blocoSelecionado
    ? bloco.find((b) => b.id === blocoSelecionado)
    : null;

  const handleVerHorarios = (labId) => {
    getLabSchedule(labId);
    navigate(`/laboratorios/${labId}`);
  };

  return (
    <div className="app-container">
      <main className="main-content-lab">
        <Sidebar
          blocos={bloco}
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
            {bloco.map((bloco) => (
              <option key={bloco.id} value={bloco.id}>
                {bloco.descricao}
              </option>
            ))}
          </select>

          <Breadcrumb />

          {!blocoSelecionado ? (
            <WelcomeScreen />
          ) : (
            <LabsGridSection
              blocoAtual={blocoAtual}
              labsDoBloco={laboratorio}
              handleVerHorarios={handleVerHorarios}
            />
          )}
        </section>
      </main>
    </div>
  );
}

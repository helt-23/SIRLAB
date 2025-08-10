import { LaboratoryCard } from "./laboratoryCard";
import {LaboratorioServices} from "../../../services/laboratorio.services"
import { useLaboratorioManager} from "../../../features/laboratorio/useLaboratorio"

export function LabsGridSection({blocoAtual, labsDoBloco, handleVerHorarios})
{
  const useLaboratorio = useLaboratorioManager()
  const laboratorios = useLaboratorio.laboratorios
  return (
    <>
      <h3 className="section-title">Laboratórios em {blocoAtual?.nome}</h3>
      <div className="labs-grid">
        {laboratorios.map((lab) => (
          <div className="card-container" key={lab.id}>
            <LaboratoryCard
              lab={{
                ...lab,
                name: lab.localizacao,
                capacity: lab.capacidade,
                description: lab.descricao || lab.observacao || "",
                image: lab.image,
              }}
              handleVerHorarios={handleVerHorarios}
            />
          </div>
        ))}
      </div>
    </>
  );
}

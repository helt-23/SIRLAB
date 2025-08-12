import { LaboratoryCard } from "./laboratoryCard";

export function LabsGridSection({blocoAtual, labsDoBloco, handleVerHorarios})
{
  
  return (
    <>
      <h3 className="section-title">Laboratórios em {blocoAtual?.descricao}</h3>
      <div className="labs-grid">
        {labsDoBloco.map((lab) => (
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

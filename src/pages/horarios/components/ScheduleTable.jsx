// src/pages/labSchedulePage/components/ScheduleTable.jsx
import { diaAbreviadoParaNumero } from "../../../customHooks/diaSemanaUtil";
export function ScheduleTable({
  diasSemana,
  horariosUnicos,
  horarios,
  onCellClick,
  currentShift,
  currentWeek,
  weekDates,
  getDayOfMonth,
}) {
  const statusStyles = {
    livre: {
      className: "bg-green-100 border border-green-500 text-green-800",
      label: "Disponível",
    },
    reservado: {
      className: "bg-blue-100 border border-blue-500 text-blue-900",
      label: "Reserva em Análise",
    },
    aula: {
      className: "bg-yellow-100 border border-yellow-500 text-yellow-800",
      label: "Aula",
    },
  };

  const renderCellContent = (horario) => {
    switch (horario.tipo) {
      case "aula":
        return (
          <div className="flex flex-col justify-center items-center p-1">
            <div className="font-semibold text-sm">
              {horario.dados?.descricao || "Aula"}
            </div>
            <div className="text-xs">
              {horario.dados?.usuarioNome || "Professor"}
            </div>
          </div>
        );

      case "reservado":
        return (
          <div className="flex flex-col justify-center items-center p-1">
            <div className="font-semibold text-sm">
              {horario.isUserBooking ? "Em análise" : "Reservado"}
            </div>
            <div className="text-xs">
              {horario.dados?.usuarioNome || "Usuário"}
            </div>
          </div>
        );

      default: // livre
        return (
          <div className="flex flex-col justify-center items-center p-1">
            <div className="font-semibold text-sm">Livre</div>
            <div className="text-xs">Clique para reservar</div>
          </div>
        );
    }
  };

  return (
    <div className="overflow-x-auto mb-8 rounded-lg shadow-sm">
      <table
        className="w-full border-collapse table-fixed bg-white min-w-[800px]"
        key={`${currentShift}-${currentWeek}`}
      >
        <thead className="bg-gradient-to-r from-blue-900 to-blue-600 text-white sticky left-0">
          <tr>
            <th className="p-4 font-semibold uppercase tracking-wider min-w-[100px] h-16 border-b border-white/10">
              Horário
            </th>
            {diasSemana?.map((dia, index) => {
              const diaNumero = diaAbreviadoParaNumero(dia);
              const dayOfMonth = getDayOfMonth(diaNumero);
              return (
                <th
                  key={dia}
                  className="p-4 font-semibold uppercase tracking-wider min-w-[100px] h-16 border-b border-white/10"
                >
                  {dia}
                  <br />
                  <span className="text-sm font-normal">{dayOfMonth}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {horariosUnicos?.map((time) => (
            <tr key={time}>
              <td className="p-2 border border-gray-200 text-center align-middle h-20 font-medium">
                {time}
              </td>
              {diasSemana?.map((dia) => {
                const horario = horarios?.find(
                  (h) => h.diaSemana === dia && h.horario === time
                );

                if (!horario)
                  return (
                    <td
                      key={`${time}-${dia}`}
                      className="p-2 border border-gray-200"
                    ></td>
                  );

                return (
                  <td
                    key={`${time}-${dia}`}
                    className={`p-2 border border-gray-200 text-center align-middle h-20 ${
                      horario.tipo === "livre" ? "cursor-pointer" : ""
                    }`}
                    onClick={() => {
                      if (horario.tipo === "livre") {
                        onCellClick(dia);
                      }
                    }}
                  >
                    <div
                      className={`h-full p-2 rounded flex flex-col justify-center items-center transition-all duration-200 ${
                        statusStyles[horario.tipo]?.className || ""
                      }`}
                    >
                      {renderCellContent(horario)}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legenda de cores */}
      <div className="mt-8 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(statusStyles).map(([key, style]) => (
            <div key={key} className="flex items-center">
              <div
                className={`w-5 h-5 rounded-sm mr-2 ${style.className}`}
              ></div>
              <span className="text-sm">{style.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

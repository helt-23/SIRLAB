const ScheduleTable = ({
  diasSemana,
  horariosUnicos,
  horarios,
  onCellClick,
}) => {
  // Mapeamento de status para estilos
  const statusStyles = {
    livre: {
      className: "available",
      style: {
        background: "#dcfce7",
        border: "1px solid #22c55e",
        color: "#166534",
      },
      label: "Disponível",
    },
    reservado: {
      className: "reserved",
      style: {
        background: "#d1e1f0",
        border: "1px solid #3b82f6",
        color: "#031273",
      },
      label: "Reservado",
    },
    aula: {
      className: "class",
      style: {
        background: "#ffffe0",
        border: "1px solid #eab308",
        color: "#c49102",
      },
      label: "Aula",
    },
  };

  const renderCellContent = (horario) => {
    switch (horario.tipo) {
      case "aula":
        return (
          <div className="cell-content">
            <div className="cell-title">{horario.dados.materia}</div>
            <div className="cell-subtitle">{horario.dados.professor}</div>
          </div>
        );

      case "reservado":
        return (
          <div className="cell-content">
            <div className="cell-title">
              {horario.isUserBooking ? "Sua Reserva" : "Reservado"}
            </div>
            <div className="cell-subtitle">{horario.dados.usuario.nome}</div>
          </div>
        );

      default: // livre
        return (
          <div className="cell-content">
            <div className="cell-title">Livre</div>
            <div className="cell-subtitle">Clique para reservar</div>
          </div>
        );
    }
  };

  return (
    <div className="schedule-table-wrapper">
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Horário</th>
            {diasSemana.map((dia) => (
              <th key={dia}>{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horariosUnicos.map((time) => (
            <tr key={time}>
              <td>{time}</td>
              {diasSemana.map((dia) => {
                const horario = horarios.find(
                  (h) =>
                    h.diaSemana === dia &&
                    `${h.horaInicio} - ${h.horaFim}` === time
                );

                if (!horario) return <td key={`${time}-${dia}`}></td>;

                return (
                  <td
                    key={`${time}-${dia}`}
                    className={horario.tipo === "livre" ? "clickable-cell" : ""}
                    onClick={() => {
                      if (horario.tipo === "livre") {
                        onCellClick(dia);
                      }
                    }}
                  >
                    <div
                      className={`cell-status ${
                        statusStyles[horario.tipo].className
                      }`}
                      style={statusStyles[horario.tipo].style}
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
      <div className="legend-container mt-8">
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(statusStyles).map(([key, style]) => (
            <div key={key} className="flex items-center">
              <div
                className="legend-color-box w-5 h-5 rounded-sm mr-2"
                style={{
                  background: style.style.background,
                  border: style.style.border,
                }}
              ></div>
              <span className="text-sm">{style.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;

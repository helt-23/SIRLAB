import { Building } from "lucide-react";
import {useBlocoManager} from "../../../features/bloco/useBloco"
import "../styles/sidebar.css";

export function Sidebar({ blocoSelecionado, setBlocoSelecionado }) {
  const useBloco = useBlocoManager()
  const blocos = useBloco.blocos

  return (
    <aside className="sidebar">
      <h2 className="sidebar-header">
        <Building className="icon" size={20} />
        Blocos
      </h2>

      <nav className="sidebar-nav">
        <ul>
          {blocos.map((bloco) => (
            <li key={bloco.id}>
              <button
                className={`sidebar-button ${
                  blocoSelecionado === bloco.id ? "selected" : "unselected"
                }`}
                onClick={() => setBlocoSelecionado(bloco.id)}
              >
                <Building className="icon" />
                {bloco.descricao}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

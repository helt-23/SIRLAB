import {
  CalendarDays,
  Building,
  FlaskConical,
  Settings,
  Clock,
  Book,
  GraduationCap,
} from "lucide-react";

export const navItems = [
  {
    key: "Visualizar Horários",
    title: "Visualizar Horários",
    description: "Consulte a grade de horários por bloco e laboratório.",
    icon: <CalendarDays size={20} />,
  },
  {
    key: "Gerenciar Blocos",
    title: "Gerenciar Blocos",
    description: "Adicione ou remova blocos e prédios da instituição.",
    icon: <Building size={20} />,
  },
  {
    key: "Gerenciar Laboratórios",
    title: "Gerenciar Laboratórios",
    description: "Cadastre laboratórios e associe-os a um bloco.",
    icon: <FlaskConical size={20} />,
  },
  {
    key: "Gerenciar Cursos e Disciplinas",
    title: "Cursos e Disciplinas",
    description: "Cadastre cursos e as disciplinas de cada um.",
    icon: <GraduationCap size={20} />,
  },
  {
    key: "Configurar Padrões",
    title: "Configurar Padrões",
    description: "Crie tipos e padrões de horários para reutilização.",
    icon: <Settings size={20} />,
  },
  {
    key: "Atribuir Aulas",
    title: "Atribuir Aulas",
    description: "Atribua disciplinas a horários vagos na grade.",
    icon: <Book size={20} />,
  },
  {
    key: "Atribuir Horários",
    title: "Atribuir Horários",
    description: "Atribua padrões de horários a laboratórios específicos.",
    icon: <Clock size={20} />,
  },
];

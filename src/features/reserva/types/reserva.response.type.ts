import { ResponseHorarioSemReserva } from "../../horario/types/";

export type ResponseReservaType = {
  id: number;
  descricao: string;
  caminhoPdf: string;
  tipoReserva: string;
  statusReserva: string;
  laboratorioDescricao: string;
  usuarioNome: string;
};

export type ResponseReservaHorarioType = {
  id: number;
  descricao: string;
  caminhoPdf: string;
  tipoReserva: string;
  statusReserva: string;
  laboratorioDescricao: string;
  usuarioNome: string;
  horarios: ResponseHorarioSemReserva[]

};
import { IActaEvento, IResultado } from './../services/verPartido';
export interface Ipartido {
  _id: string;
  local_id: string;
  visitante_id: string;
  arbitro_id: object;
  resultado: IResultado;
  deporte: string;
  acta?: IActaEvento[]
 }

 
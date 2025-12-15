import { IActaEvento } from './../services/verPartido';
export interface Ipartido {
  local_id: string;
  visitante_id: string;
  arbitro_id: object;
  deporte: string;
  acta?: IActaEvento[]
 }

import { Data } from '../EdiTable/EdiTable.types';

export interface Inputs extends Data {
  password: string;
}

export interface RegistrationType {
  modalClose: (arg: boolean) => void;
  rowsState: Data[];
  setRowsState: React.Dispatch<React.SetStateAction<Data[]>>;
}

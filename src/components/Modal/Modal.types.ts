import { Data } from '../EdiTable/EdiTable.types';
import { ModalDataType } from '../EdiTable/EdiTable.types';

export interface ModalType {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  rowsState: Data[];
  setRowsState: React.Dispatch<React.SetStateAction<Data[]>>;
  modalType: ModalDataType;
}

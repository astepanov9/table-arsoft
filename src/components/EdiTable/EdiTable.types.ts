export interface Data {
  company: string;
  id: string;
  images: string;
  lastname: string;
  name: string;
  roles: string;
  username: string;
}

export interface EdiTableType {
  columns: {
    field: string;
    fieldName: string;
  }[];
  rowsState: Data[];
  setRowsState: React.Dispatch<React.SetStateAction<Data[]>>;
  loading: boolean;
}

export interface ModalDataType {
  action: '' | 'delete' | 'add';
  rowDeleteId: string;
}

export interface EditedRow {
  id: string;
  name: string;
  lastname: string;
  username: string;
  roles: string;
  company: string;
}

export enum RolesPropertyEnum {
  ROLE_USER = 'Пользователь',
  ROLE_ADMIN = 'Администратор',
  ROLE_SUPERADMIN = 'Суперпользователь',
}

export interface RolesListObj {
  name: string;
  translate: RolesPropertyEnum;
}

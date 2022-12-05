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
}

export interface ModalDataType {
  action: '' | 'delete' | 'add';
  rowDeleteId: string;
}

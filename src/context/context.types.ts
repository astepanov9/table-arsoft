export interface ToastType {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

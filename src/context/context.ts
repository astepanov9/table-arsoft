import React from 'react';
import { ToastType } from './context.types';

const defaultState = {
  visible: false,
  setVisible: () => void {},
  status: '',
  setStatus: () => void {},
  title: '',
  setTitle: () => void {},
};

const AppContext = React.createContext<ToastType>(defaultState);

export default AppContext;

import React from 'react';

import { ButtonType } from './Button.types';

const Button: React.FC<ButtonType> = ({ name, onClickButton }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 sm:py-4 sm:px-8 rounded transition"
      onClick={onClickButton}
    >
      {name}
    </button>
  );
};

export default Button;

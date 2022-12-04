import React from 'react';

interface Button {
  name: string;
  onClickButton: () => void;
}

const Button: React.FC<Button> = ({ name, onClickButton }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded transition"
      onClick={onClickButton}
    >
      {name}
    </button>
  );
};

export default Button;

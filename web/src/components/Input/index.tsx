/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ name, label, children, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}{children && children}</label>
      <input type="text" {...rest} />
    </div>
  );
};

export default Input;

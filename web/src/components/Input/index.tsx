/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { InputHTMLAttributes, FormEvent } from 'react';

import './styles.css';
import { phone, currency } from '../../utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  upLabel?: { active: boolean };
  name: string;
  mask?: 'phone' | 'currency';
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  upLabel,
  mask,
  setValue,
  children,
  ...rest
}) => {
  console.log(upLabel);
  function handleKeyUp(e: FormEvent<HTMLInputElement>) {
    if (mask === 'phone') {
      const value = phone(e);
      if (setValue) {
        setValue(value);
      }
    }

    if (mask === 'currency') {
      const value = currency(e);
      if (setValue) {
        setValue(value);
      }
    }
  }

  return (
    <div className="input-block">
      <label
        htmlFor={name}
        className={upLabel ? `upLabel${upLabel.active ? ' up' : ''}` : ''}
      >
        {label}
        {children && children}
      </label>
      <input type="text" {...rest} name={name} onKeyUp={handleKeyUp} />
    </div>
  );
};

export default Input;

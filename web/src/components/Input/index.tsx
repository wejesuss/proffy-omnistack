/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { InputHTMLAttributes, FormEvent } from 'react';

import './styles.css';
import { phone, currency } from '../../utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftBar?: boolean;
  label: string;
  upLabel?: { active: boolean };
  name: string;
  mask?: 'phone' | 'currency';
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  symbol?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  leftBar = false,
  name,
  label,
  upLabel,
  mask,
  setValue,
  children,
  symbol,
  ...rest
}) => {
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
    <div className={leftBar ? 'input-block left-bar' : 'input-block'}>
      <label
        htmlFor={name}
        className={upLabel ? `upLabel${upLabel.active ? ' up' : ''}` : ''}
      >
        {label}
        {children && children}
      </label>

      <input type="text" {...rest} name={name} onKeyUp={handleKeyUp} />

      {symbol && <div className="symbol">{symbol}</div>}
    </div>
  );
};

export default Input;

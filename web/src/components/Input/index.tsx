import React, { FormEvent, memo } from 'react';
import { InputProps } from '../../@types';

import { phone, currency } from '../../utils';

import './styles.css';

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

export default memo(Input);

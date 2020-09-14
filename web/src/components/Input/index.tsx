/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { InputHTMLAttributes, FormEvent } from 'react';

import './styles.css';
import { phone, currency } from '../../utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  mask?: "phone" | "currency";
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<InputProps> = ({ name, label, mask, setValue, children, ...rest }) => {
  function handleKeyUp(e: FormEvent<HTMLInputElement>) {
    if(mask === "phone") {
      let value = phone(e);
      if(setValue) {
        setValue(value)
      }
    }

    if(mask === "currency") {
      let value = currency(e);
      if(setValue) {
        setValue(value);
      }
    }
  }

  return (
    <div className="input-block">
      <label htmlFor={name}>{label}{children && children}</label>
      <input type="text" {...rest} onKeyUp={handleKeyUp} />
    </div>
  );
};

export default Input;

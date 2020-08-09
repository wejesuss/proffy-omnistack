/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  labelExtraInfo?: React.ReactNode;
  options: Array<{
    value: string;
    label: string;
  }>
}

const Select: React.FC<SelectProps> = ({ name, label, labelExtraInfo, options, children, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}{labelExtraInfo && labelExtraInfo}</label>
      <select value="" {...rest}>
          <option value="" disabled hidden>Selecione uma opção</option>
          {options.map(option => (
            <option value={option.value} key={option.value}>{option.label}</option>
          ))}
      </select>
    </div>
  );
};

export default Select;
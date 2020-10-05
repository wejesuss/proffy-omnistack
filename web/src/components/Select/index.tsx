import React from 'react';
import { SelectProps } from '../../@types';

import './styles.css';

const Select: React.FC<SelectProps> = ({
  name,
  label,
  labelExtraInfo,
  options,
  ...rest
}) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>
        {label}
        {labelExtraInfo && labelExtraInfo}
      </label>

      <select
        value=""
        {...rest}
        style={
          rest.value === '' ? { color: 'var(--color-small-info)' } : undefined
        }
      >
        <option value="" disabled hidden>
          Selecione
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

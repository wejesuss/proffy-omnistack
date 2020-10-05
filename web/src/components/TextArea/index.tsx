import React from 'react';
import { TextAreaProps } from '../../@types';

import './styles.css';

const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  children,
  ...rest
}) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>
        {label}
        {children && children}
      </label>
      <textarea {...rest} />
    </div>
  );
};

export default TextArea;

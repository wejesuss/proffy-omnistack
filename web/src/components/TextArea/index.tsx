/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ name, label, children, ...rest }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}{children && children}</label>
      <textarea {...rest} />
    </div>
  );
};

export default TextArea;

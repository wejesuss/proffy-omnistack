import React from 'react';
import { Link } from 'react-router-dom';
import { ControlContainerProps } from '../../@types';

import backIcon from '../../assets/images/icons/back.svg';

const ControlContainer: React.FC<ControlContainerProps> = ({
  backLink,
  pageId,
  children,
}) => {
  return (
    <div id={pageId}>
      {backLink && (
        <Link to={backLink}>
          <img src={backIcon} alt="Voltar" />
        </Link>
      )}

      {children && children}
    </div>
  );
};

export default ControlContainer;

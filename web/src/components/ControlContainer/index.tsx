import React from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg';

interface ControlContainerProps {
  pageId: string;
  backLink?: string;
}

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

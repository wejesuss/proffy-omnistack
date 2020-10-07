import React from 'react';
import { TrashProps } from '../../@types';

import trashIcon from '../../assets/images/icons/trash.svg';
import './styles.css';

const Trash: React.FC<TrashProps> = ({ removeScheduleItem }) => {
  return (
    <div className="input-block trash">
      <button
        type="button"
        onClick={() => {
          removeScheduleItem();
        }}
      >
        <img src={trashIcon} alt="Apagar campo" />
      </button>
    </div>
  );
};

export default Trash;

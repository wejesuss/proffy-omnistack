import React from 'react';

import trashIcon from '../../assets/images/icons/trash.svg';

import './styles.css';

interface TrashProps {
  removeScheduleItem: () => void;
}

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

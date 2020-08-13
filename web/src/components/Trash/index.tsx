import React from 'react';

import trashIcon from '../../assets/images/icons/trash.svg'

import './styles.css';

interface TrashProps {
  removeScheduleItem: Function;
}

const Trash: React.FC<TrashProps> = ({ removeScheduleItem }) => {
  return (
    <div className="input-block trash">
      <img src={trashIcon} alt="Apagar campo" onClick={() => {removeScheduleItem()}} />
    </div>
  );
}

export default Trash;

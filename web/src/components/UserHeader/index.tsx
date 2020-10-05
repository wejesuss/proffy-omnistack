import React from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../../utils';

interface UserHeaderProps {
  name: string;
  image: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  name,
  image,
}: UserHeaderProps) => {
  const history = useHistory();

  function handleLogout() {
    logout();
    history.push('/login');
  }

  return (
    <div className="user-container">
      <div className="user">
        <img src={image} alt="Conta do usuário" />
        {name}
      </div>
      <div className="logout">
        <svg
          onClick={handleLogout}
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="8" fill="#774DD6" />
          <path
            d="M25.3 15.5332C26.3487 16.5822 27.0627 17.9186 27.3519 19.3734C27.6411 20.8282 27.4924 22.336 26.9247 23.7063C26.357 25.0766 25.3957 26.2478 24.1624 27.0718C22.9291 27.8958 21.4791 28.3356 19.9959 28.3356C18.5126 28.3356 17.0626 27.8958 15.8293 27.0718C14.596 26.2478 13.6347 25.0766 13.067 23.7063C12.4993 22.336 12.3506 20.8282 12.6398 19.3734C12.929 17.9186 13.643 16.5822 14.6917 15.5332"
            stroke="#D4C2FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 11.6665V19.9998"
            stroke="#D4C2FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default UserHeader;

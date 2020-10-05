/* eslint-disable react/no-danger */
import React from 'react';

import { RoutesPath, TeacherProps } from '../../@types';
import api from '../../services/api';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

const TeacherItem: React.FC<TeacherProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post(RoutesPath.connections, {
      user_id: teacher.user_id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img
          src={RoutesPath.baseURL + teacher.avatar}
          alt={`${teacher.name} ${teacher.surname}`}
        />
        <div>
          <strong>
            {teacher.name}
            {'  '}
            {teacher.surname}
          </strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p
        dangerouslySetInnerHTML={{
          __html: teacher.bio.replace(/(\r\n)?(\n)/g, '<br />'),
        }}
      />

      <footer>
        <p>
          Preço/hora
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(teacher.cost)}
          </strong>
        </p>
        <a
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}?text=Olá, tenho interesse na sua aula de ${teacher.subject}, ${teacher.name}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={whatsappIcon} alt="Entrar em contato por Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;

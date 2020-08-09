import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface Teacher {
  id: number;
  user_id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post("/connections", {
      user_id: teacher.user_id
    })
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p dangerouslySetInnerHTML={{ __html: teacher.bio.replace(/(\r\n)?(\n)/g, "<br />") }}>
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>{new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(teacher.cost)}</strong>
        </p>
        <a onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}?text=Olá, tenho interesse na sua aula de ${teacher.subject}, ${teacher.name}`} target="_blank" rel="noreferrer noopener">
          <img src={whatsappIcon} alt="Entrar em contato por Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;

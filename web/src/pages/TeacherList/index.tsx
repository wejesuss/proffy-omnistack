/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, FormEvent, useEffect } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import './styles.css';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

const TeacherList: FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [subjects] = useState([
    {value: "Artes", label: "Artes"},
    {value: "Biologia", label: "Biologia"},
    {value: "Ciências", label: "Ciências"},
    {value: "Educação Física", label: "Educação Física"},
    {value: "Física", label: "Física"},
    {value: "Geografia", label: "Geografia"},
    {value: "História", label: "História"},
    {value: "Matemática", label: "Matemática"},
    {value: "Português", label: "Português"},
    {value: "Química", label: "Química"}
  ])

  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [week_day, setWeekday] = useState("");

  async function searchProffys(e: FormEvent) {
    e.preventDefault()
    if(!subject || !time || !week_day) return false

    const { data: teachers } = await api.get<Teacher[]>("/classes", {
      params: {
        subject,
        week_day: Number(week_day),
        time
      }
    })

    setTeachers(teachers)
  }

  useEffect(() => {
    const today = new Date(Date.now())
    const weekday = today.getDay()
    const now = `${today.getHours()}:${today.getMinutes()}`

    subjects.forEach(subject => {
      api.get<Teacher[]>("/classes", {
        params: {
          subject: subject.value,
          week_day: weekday,
          time: now
        }
      }).then((response) => {
        setTeachers(teachers => teachers.concat(response.data))
      }).catch((reason) => {
        console.error(reason)
      })
    })
  }, [subjects])

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers" onSubmit={searchProffys}>
          <Select
            name="subject"
            label="Matéria"
            options={subjects}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <Select
            name="week_day"
            label="Dia da Semana"
            options={[
              {value: "0", label: "Domigo"},
              {value: "1", label: "Segunda-feira"},
              {value: "2", label: "Terça-feira"},
              {value: "3", label: "Quarta-feira"},
              {value: "4", label: "Quinta-feira"},
              {value: "5", label: "Sexta-feira"},
              {value: "6", label: "Sábado"},
            ]}
            value={week_day}
            onChange={(e) => setWeekday(e.target.value)}
          />

          <Input
            name="time"
            label="Hora"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button type="submit">Filtrar</button>
        </form>
      </PageHeader>

      <main>
        { teachers.map(teacher => (
          <TeacherItem key={teacher.id} teacher={teacher}/>
        ))}
      </main>
    </div>
  );
};

export default TeacherList;

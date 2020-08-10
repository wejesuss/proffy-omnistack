/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';
import warningIcon from '../../assets/images/icons/warning.svg'
import { useHistory } from 'react-router-dom';

const TeacherForm: FC = () => {
  const [days, setDays] = useState([0, 1, 2, 3, 4, 5, 6])
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: ''}
  ])
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const history = useHistory();

  function addNewScheduleItem() {
    const schedules = document.querySelectorAll(".schedule-item")
    const lastAddedSchedule = schedules[schedules.length - 1]

    const weekday = (lastAddedSchedule.querySelector(".select-block select") as HTMLSelectElement)?.value
    const from = (lastAddedSchedule.querySelector(".input-block input.from") as HTMLInputElement)?.value
    const to = (lastAddedSchedule.querySelector(".input-block input.to") as HTMLInputElement)?.value

    if(!weekday || !from || !to || scheduleItems.length > 6) {
      return false
    }

    let secureDayToUse = 0

    scheduleItems.forEach(schedule => {
      days.filter(day => {
        if(day !== schedule.week_day) {
          secureDayToUse = day
          return true
        } else {
          const arrayOfUsed = days.splice(days.indexOf(schedule.week_day), 1)
          const newArray = days.filter(day => !arrayOfUsed.includes(day))
          setDays(newArray)
          return false
        }
      })
    })

    setScheduleItems([
      ...scheduleItems,
      { week_day: secureDayToUse, from: '', to: '' }
    ])
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const newSchedule = scheduleItems.map((schedule, index) => {
      if(index === position) {
        return {...schedule, [field]: (field === "week_day" ? +value : value)}
      }

      return schedule
    })

    setScheduleItems(newSchedule)
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault()

    api.post("/classes", {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastrado com sucesso')
      history.push("/study")
    }).catch((reason) => {
      console.error(reason)
      alert("Erro no cadastro!")
    })
  }

  return (
    <div id="page-give-classes" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de incrição"
      />

      <main>
        <form id="create-class" onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seu dados</legend>

            <Input
              label="Nome Completo"
              name="name"
              id="name"
              value={name}
              onChange={(e) => { setName(e.target.value)}}
            />
            <Input
              label="Link da sua foto"
              name="avatar"
              type="url"
              id="avatar"
              value={avatar}
              onChange={(e) => { setAvatar(e.target.value)}}
            >
              <small>(começe com https://)</small>
            </Input>
            <Input
              label="Whatsapp"
              name="whatsapp"
              type="number"
              id="whatsapp"
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value)}}
            >
              <small>(somente números)</small>
            </Input>
            <TextArea
              label="Biografia"
              name="bio"
              id="bio"
              value={bio}
              onChange={(e) => { setBio(e.target.value)}}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select name="subject" label="Matéria" id="subject" options={[
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
              ]}
              value={subject}
              onChange={(e) => { setSubject(e.target.value)}}
            />

            <Input
              name="cost"
              label="Custo da sua hora/aula"
              max="10000"
              type="number"
              id="cost"
              value={cost}
              onChange={(e) => { setCost(e.target.value)}}
            >
              <small>(R$)</small>
            </Input>
          </fieldset>

          <fieldset id="schedule-items">
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo Horários
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div className="schedule-item" key={scheduleItem.week_day}>
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
                  value={scheduleItem.week_day}
                  onChange={(e) => { setScheduleItemValue(index, "week_day", e.target.value)}}
                />

                <Input
                  name="from"
                  label="Das"
                  type="time"
                  className="from"
                  value={scheduleItem.from}
                  onChange={(e) => { setScheduleItemValue(index, "from", e.target.value)}}
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  className="to"
                  value={scheduleItem.to}
                  onChange={(e) => { setScheduleItemValue(index, "to", e.target.value)}}
                />
              </div>
            ))}
          </fieldset>
        </form>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            <>
              Importante!
              <br />
              Preencha todos os dados.
            </>
          </p>
          <button type="submit" form="create-class">
            Salvar
          </button>
        </footer>
      </main>
    </div>
  );
};

export default TeacherForm;

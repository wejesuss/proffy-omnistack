import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { RoutesPath, ScheduleItem } from '../../@types';

import { useAuth } from '../../contexts/auth';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import Trash from '../../components/Trash';

import api from '../../services/api';
import { getErrorMessage } from '../../utils';

import warningIcon from '../../assets/images/icons/warning.svg';
import rocketIcon from '../../assets/images/icons/rocket.svg';
import './styles.css';

const TeacherForm: React.FC = () => {
  const { user } = useAuth();
  const [days, setDays] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();

  function addNewScheduleItem() {
    const schedules = document.querySelectorAll('.schedule-item');
    const lastAddedSchedule = schedules[schedules.length - 1];

    const weekday = (lastAddedSchedule.querySelector(
      '.select-block select',
    ) as HTMLSelectElement)?.value;
    const from = (lastAddedSchedule.querySelector(
      '.input-block input.from',
    ) as HTMLInputElement)?.value;
    const to = (lastAddedSchedule.querySelector(
      '.input-block input.to',
    ) as HTMLInputElement)?.value;

    if (!weekday || !from || !to || scheduleItems.length > 6) {
      return;
    }

    let secureDayToUse = 0;

    scheduleItems.forEach((schedule) => {
      days.filter((day) => {
        if (day !== schedule.week_day) {
          secureDayToUse = day;
          return true;
        }
        const arrayOfUsed = days.splice(days.indexOf(schedule.week_day), 1);
        const newArray = days.filter(
          (usedDay) => !arrayOfUsed.includes(usedDay),
        );
        setDays(newArray);
        return false;
      });
    });

    setScheduleItems([
      ...scheduleItems,
      { week_day: secureDayToUse, from: '', to: '' },
    ]);
  }

  function removeScheduleItem(index: number) {
    const newSchedule = scheduleItems.filter(
      (_, position) => position !== index,
    );
    setScheduleItems(newSchedule);
    console.log(scheduleItems, newSchedule);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string,
  ) {
    const newSchedule = scheduleItems.map((schedule, index) => {
      if (index === position) {
        return { ...schedule, [field]: field === 'week_day' ? +value : value };
      }

      return schedule;
    });

    setScheduleItems(newSchedule);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    setMessage('');

    api
      .post(RoutesPath.classes, {
        email: user?.email,
        whatsapp: whatsapp.replace(/\D/g, ''),
        bio,
        subject,
        cost: Number(cost.replace(/\D/g, '')) / 100,
        schedule: scheduleItems,
      })
      .then(() => {
        history.push('/success', {
          success: true,
          messageTitle: 'Cadastro salvo!',
          message:
            'Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp.',
          buttonText: 'Acessar lista',
          buttonLink: '/study',
        });
      })
      .catch((reason) => {
        console.error(reason?.response?.data?.error);
        setMessage(
          getErrorMessage(reason?.response?.data?.error || reason?.message),
        );
      });
  }

  useEffect(() => {
    api
      .get(RoutesPath.searchUser)
      .then((res) => {
        const { data } = res;

        if (data.schedule) {
          const schedule = (data.schedule as ScheduleItem[]).map(
            (classSchedule) => {
              return {
                week_day: classSchedule.week_day,
                from: classSchedule.from,
                to: classSchedule.to,
              };
            },
          );

          setScheduleItems(schedule);
        }

        if (data.user) {
          setWhatsapp(
            data.user.whatsapp.replace(
              /^(\(?\d{2}\)?)(\d{5})(\d{4})/g,
              '($1) $2-$3',
            ),
          );
          setBio(data.user.bio);
          setSubject(data.user.subject);
          setCost(
            Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            }).format(data.user.cost),
          );
        }
      })
      .catch((reason) => {
        console.error(reason.response.data.error);
      });
  }, [user]);

  return (
    <div id="page-give-classes" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas"
        topBarTitle="Dar aulas"
        description="O primeiro passo é preencher esse formulário de incrição"
      >
        <div className="rocket-message">
          <img src={rocketIcon} alt="Rocket" />
          <p>
            <>
              Preparare-se!
              <br />
            </>
            vai ser o máximo.
          </p>
        </div>
      </PageHeader>

      <main>
        <form id="create-class" onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seu dados</legend>
            <div className="user-container group-container">
              <div className="user-info">
                <img src={user?.avatar} alt="Conta do usuário" />
                {user?.name}
                {'  '}
                {user?.surname}
              </div>
              <Input
                label="Whatsapp"
                name="whatsapp"
                placeholder="(  ) _ ____ ____"
                mask="phone"
                id="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                setValue={setWhatsapp}
              >
                <small>(+55)</small>
              </Input>
            </div>

            <TextArea
              label="Biografia"
              name="bio"
              id="bio"
              maxLength={300}
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            >
              <small>(Máximo 300 caracteres)</small>
            </TextArea>
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <div className="group-container">
              <Select
                name="subject"
                label="Matéria"
                id="subject"
                options={[
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Biologia', label: 'Biologia' },
                  { value: 'Ciências', label: 'Ciências' },
                  { value: 'Educação Física', label: 'Educação Física' },
                  { value: 'Física', label: 'Física' },
                  { value: 'Geografia', label: 'Geografia' },
                  { value: 'História', label: 'História' },
                  { value: 'Matemática', label: 'Matemática' },
                  { value: 'Português', label: 'Português' },
                  { value: 'Química', label: 'Química' },
                ]}
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />

              <Input
                name="cost"
                label="Custo da sua hora/aula"
                placeholder="R$"
                mask="currency"
                id="cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                setValue={setCost}
              >
                <small>(R$)</small>
              </Input>
            </div>
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
                    { value: '0', label: 'Domigo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                  value={scheduleItem.week_day}
                  onChange={(e) => {
                    setScheduleItemValue(index, 'week_day', e.target.value);
                  }}
                />

                <Input
                  name="from"
                  label="Das"
                  type="time"
                  className="from"
                  value={scheduleItem.from}
                  onChange={(e) => {
                    setScheduleItemValue(index, 'from', e.target.value);
                  }}
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  className="to"
                  value={scheduleItem.to}
                  onChange={(e) => {
                    setScheduleItemValue(index, 'to', e.target.value);
                  }}
                />
                {index > 0 && (
                  <Trash removeScheduleItem={() => removeScheduleItem(index)} />
                )}
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
              Preencha todos os dados corretamente.
            </>
          </p>
          <button type="submit" form="create-class">
            Salvar cadastro
          </button>
        </footer>

        <p className="message">{message}</p>
      </main>
    </div>
  );
};

export default TeacherForm;

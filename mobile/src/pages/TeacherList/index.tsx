import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';
import styles from './styles';

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFilterVisible] = useState(false);
  const [
    isTeachersEmptyAndHasParams,
    setIsTeachersEmptyAndHasParams,
  ] = useState(false);
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [week_day, setWeekday] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [subjects] = useState([
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
  ]);

  function handleToggleFiltersVisibility() {
    setIsFilterVisible(!isFiltersVisible);
  }

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => teacher.user_id
        );

        setFavorites(favoritedTeachersIds);
      }
    });
  }

  async function handleSearchProffys() {
    loadFavorites();
    if (!subject || !time || !week_day) {
      return false;
    }

    const { data: teachers } = await api.get<Teacher[]>('/classes', {
      params: {
        subject,
        week_day: Number(week_day),
        time,
      },
    });

    if (teachers.length < 1 && subject && week_day && time) {
      setIsTeachersEmptyAndHasParams(true);
    } else {
      setIsTeachersEmptyAndHasParams(false);
    }

    setIsFilterVisible(false);
    setTeachers(teachers);
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  useEffect(() => {
    const today = new Date(Date.now());
    const weekday = today.getDay();
    const now = `${today.getHours()}:${today.getMinutes()}`;

    subjects.forEach((subject) => {
      api
        .get<Teacher[]>('/classes', {
          params: {
            subject: subject.value,
            week_day: weekday,
            time: now,
          },
        })
        .then((response) => {
          setTeachers((teachers) => teachers.concat(response.data));
        })
        .catch((reason) => {
          console.error(reason);
        });
    });
  }, [subjects]);

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisibility}>
            <Feather
              name="filter"
              size={24}
              color="#fff"
              style={{ paddingHorizontal: 8, paddingVertical: 8 }}
            />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={(text) => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                  value={week_day}
                  onChangeText={(text) => setWeekday(text)}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={(text) => setTime(text)}
                />
              </View>
            </View>
            <RectButton
              style={styles.submitButton}
              onPress={handleSearchProffys}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      {teachers.length > 0 && (
        <ScrollView
          style={styles.teacherList}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        >
          {teachers.map((teacher) => (
            <TeacherItem
              key={teacher.user_id}
              favorited={favorites.includes(teacher.user_id)}
              teacher={teacher}
            />
          ))}
        </ScrollView>
      )}

      {isTeachersEmptyAndHasParams && (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>
            Nehum professor encontrado com a sua pesquisa
          </Text>
        </View>
      )}
    </View>
  );
};

export default TeacherList;

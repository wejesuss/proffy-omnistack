import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import styles from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Teacher[]>([]);
  const [isFavoritesEmpty, setIsFavoritesEmpty] = useState(false);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);

        if (favoritedTeachers.length < 1) {
          setIsFavoritesEmpty(true);
        } else {
          setIsFavoritesEmpty(false);
        }

        setFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />
      {favorites.length > 0 && (
        <ScrollView
          style={styles.teacherList}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        >
          {favorites.map((teacher) => (
            <TeacherItem key={teacher.user_id} favorited teacher={teacher} />
          ))}
        </ScrollView>
      )}

      {isFavoritesEmpty && (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>
            Nehum professor encontrado como favorito
          </Text>
        </View>
      )}
    </View>
  );
};

export default Favorites;

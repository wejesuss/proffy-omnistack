import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import studyIcon from '../../assets/images/icons/study.png';
import landingIcon from '../../assets/images/landing.png';
import api from '../../services/api';
import styles from './styles';

const Landing: React.FC = () => {
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();

  function handleNavigateToGiveClasses() {
    navigation.navigate('GiveClasses');
  }

  function handleNavigateToStudyPages() {
    navigation.navigate('Study');
  }

  useFocusEffect(
    React.useCallback(() => {
      api.get('/connections').then((result) => {
        const { total } = result.data;
        setTotal(total);
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image source={landingIcon} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToStudyPages}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon} />

          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          onPress={handleNavigateToGiveClasses}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={giveClassesIcon} />

          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de <Text style={styles.titleBold}>{total}</Text> conexões já
        realizadas <Image source={heartIcon} />
      </Text>
    </View>
  );
};

export default Landing;

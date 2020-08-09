import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import giveClassesBgImage from '../../assets/images/icons/background.png';
import styles from './styles';

const GiveClasses: React.FC = () => {
  const { goBack } = useNavigation();

  function handleNavigateBack() {
    goBack();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={giveClassesBgImage}
        resizeMode="contain"
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Param começar, primeiro você precisa se cadastrar como professor na
          nossa plataforma web.
        </Text>

        <RectButton style={styles.okButton} onPress={handleNavigateBack}>
          <Text style={styles.okButtonText}>Tudo Bem</Text>
        </RectButton>
      </ImageBackground>
    </View>
  );
};

export default GiveClasses;

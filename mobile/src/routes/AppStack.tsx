import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import GiveClasses from '../pages/GiveClasses';
import Landing from '../pages/Landing';
import StudyTabs from './StudyTabs';

const { Navigator, Screen } = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />

        <Screen
          name="GiveClasses"
          component={GiveClasses}
          options={{ headerShown: false }}
        />

        <Screen
          name="Study"
          component={StudyTabs}
          options={{ headerShown: false }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppStack;

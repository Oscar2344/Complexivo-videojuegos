import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface UserAuth {
  name: string;
}

export const HomeScreen = () => {
  const [UserAuth, setUserAuth] = useState<UserAuth>({
    name: ''
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth({ name: user.displayName ?? 'NA' });
      }
    });
  }, []);

  return (
    <View style={styles.rootHome}>
      <View style={styles.headerHome}>
    
        <Icon name="gamepad-variant" size={50} color="#000" /> 
        <View>
          <Text variant="bodySmall">Bienvenid@</Text>
          <Text variant="labelLarge">{UserAuth.name}</Text>
        </View>
      </View>
    </View>
  );
};

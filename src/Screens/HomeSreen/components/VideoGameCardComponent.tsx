import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { VideoGame } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';


interface Props{
  VideoGame:VideoGame
}

export const VideoGameCardComponent = ({VideoGame}:Props) => {

  const navigation =useNavigation();
    return (
      <View style={styles.rootListProduct}>
        <View>
          <Text variant="labelLarge">Nombre:{VideoGame.nameVideoGame} </Text>
          <Text variant="bodyMedium">Precio:{VideoGame.price} </Text>
        </View>
        <View style={styles.iconHeader}>
          <IconButton
            icon="arrow-right-bold-outline"
            size={25}
            mode="contained"
            onPress={() => navigation.dispatch(CommonActions.navigate({name:'Detail',params:{VideoGame}}))}
          />
        </View>
      </View>
    );
  };
  
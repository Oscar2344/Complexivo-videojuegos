import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ref, update, remove } from 'firebase/database'; // Added remove here
import { auth, dbRealTime } from './config/firebaseConfig';
import { VideoGame } from './HomeSreen/HomeScreen';

export const DetailProductScreen = () => {
  const route = useRoute();
  //@ts-ignore
  const { VideoGame } = route.params;
  const navigation = useNavigation();
  const [formEdit, setFormEdit] = useState<VideoGame>({
    id: '',
    code: "",
    nameVideoGame: "",
    price: 0,
    stock: 0,
    description: "",
    genre: "",
    platform: "",
  });

  useEffect(() => {
    setFormEdit(VideoGame);
  }, []);

  const handleSetValues = (key: string, value: string) => {
    setFormEdit({ ...formEdit, [key]: value });
  };

  const handleUpdateVideogame = async () => {
    const dbRef = ref(dbRealTime, 'videogame/'+auth.currentUser?.uid + '/' + formEdit.id);
    try {
      await update(dbRef, {
        code: formEdit.code,
        nameVideoGame: formEdit.nameVideoGame,
        price: formEdit.price,
        stock: formEdit.stock,
        description: formEdit.description,
        genre: formEdit.genre,
        platform: formEdit.platform
      });
      navigation.goBack();
    }  catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDeleteVideogame = async () => {
    const dbRef = ref(dbRealTime, 'videogame/'+auth.currentUser?.uid + '/' +formEdit.id);
    try {
      await remove(dbRef); 
      navigation.goBack(); 
    }  catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <ScrollView style={styles.rootDetail}>
      <View>
        <Text style={styles.textDetail}>Código:</Text>
        <TextInput
          value={formEdit.code}
          onChangeText={(value) => handleSetValues("code", value)}
        />
        <Divider />
      </View>

      <View>
        <Text style={styles.textDetail}>Nombre:</Text>
        <TextInput
          value={formEdit.nameVideoGame}
          onChangeText={(value) => handleSetValues("nameVideoGame", value)}
        />
        <Divider />
      </View>
      <View >
  <View >
    <Text style={styles.textDetail}>Precio: </Text>
    <TextInput
      value={formEdit.price.toString()}
      onChangeText={(value) => handleSetValues("price", value)}
      
      keyboardType="numeric"
    />
  </View>

    <Text style={styles.textDetail}>Stock: </Text>
    <TextInput
      value={formEdit.stock.toString()}
      onChangeText={(value) => handleSetValues("stock", value)}
     
      keyboardType="numeric"
    />
  
</View>

      
        <Text style={styles.textDetail}>Género:</Text>
        <TextInput
          value={formEdit.genre}
          onChangeText={(value) => handleSetValues("genre", value)}
        />
    

      <View>
        <Text style={styles.textDetail}>Plataforma:</Text>
        <TextInput
          value={formEdit.platform}
          onChangeText={(value) => handleSetValues("platform", value)}
        />
      </View>
      <View>
        <Text style={styles.textDetail}>Descripción:</Text>
        <TextInput
          value={formEdit.description}
          multiline
          numberOfLines={4}
          onChangeText={(text) => handleSetValues("description", text)}
        />
      </View>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <Button
          mode='contained'
          icon='update'
          onPress={handleUpdateVideogame}>
          Actualizar
        </Button>
        <Button
          mode='contained'
          icon='delete-empty-outline'
          onPress={handleDeleteVideogame}> 
          Eliminar
        </Button>
      </View>
    </ScrollView>
  );
};

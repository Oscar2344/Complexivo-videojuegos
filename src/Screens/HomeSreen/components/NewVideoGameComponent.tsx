import React, { useState } from "react";
import { Button,Divider,IconButton, Modal, Portal, Text,TextInput,} from "react-native-paper";
import { styles } from "../../../theme/styles";
import { View } from "react-native";
import { auth, dbRealTime } from '../../config/firebaseConfig';
import { push, ref, set } from "firebase/database";


interface Props {
    showModalVideoGame: boolean;
    setShowModalVideoGame: Function;
  }
  
  interface FormVideogame {
    code: string;
    nameVideoGame: string;
    price: number;
    stock: number;
    description: string;
    genre: string;
    platform: string;
  }
  
  export const NewVideoGameComponent = ({
    showModalVideoGame,
    setShowModalVideoGame,
  }: Props) => {
    const [formVideogame, setFormVideogame] = useState<FormVideogame>({
      code: "",
      nameVideoGame: "",
      price: 0,
      stock: 0,
      description: "",
      genre: "",
      platform: "",
    });
  
    const [errorMessage, setErrorMessage] = useState<string>("");
  
    const handleSetValues = (key: string, value: string) => {
      setFormVideogame({ ...formVideogame, [key]: value });
     
    };
  
    const handleSaveVideogame = async () => {
      if (
        !formVideogame.code ||
        !formVideogame.nameVideoGame ||
        !formVideogame.price ||
        !formVideogame.stock ||
        !formVideogame.description ||
        !formVideogame.genre ||
        !formVideogame.platform
      ) {
        setErrorMessage("Por favor, complete todos los campos.");
        return;
      }
  const dbRef =ref(dbRealTime,'videogame/'+auth.currentUser?.uid);

  const saveVideogame =push(dbRef)
  try{
      await set(saveVideogame,formVideogame);
      setShowModalVideoGame(false);
  } catch (error) {
    console.log("Error: ", error);
  }

 
      setErrorMessage(""); 
    };
  
    return (
      <Portal>
        <Modal visible={showModalVideoGame} contentContainerStyle={styles.modal}>
          <View style={styles.header}>
            <Text variant="headlineSmall">Nuevo Video juego</Text>
            <View style={styles.iconHeader}>
              <IconButton
                icon="close-circle-outline"
                size={30}
                onPress={() => setShowModalVideoGame(false)}
              />
            </View>
          </View>
          <Divider />
          <TextInput
            label="Código"
            mode="outlined"
            onChangeText={(value) => handleSetValues("code", value)}
          />
          <TextInput
            label="Nombre"
            mode="outlined"
            onChangeText={(value) => handleSetValues("nameVideoGame", value)}
          />
          <TextInput
            label="Género"
            mode="outlined"
            onChangeText={(value) => handleSetValues("genre", value)}
          />
          <TextInput
            label="Plataforma"
            mode="outlined"
            onChangeText={(value) => handleSetValues("platform", value)}
          />
          <View style={styles.rootInputsProduct}>
            <TextInput
              label="Precio"
              mode="outlined"
              keyboardType="numeric"
              style={{ width: "45%" }}
              onChangeText={(value) => handleSetValues("price", value)}
            />
            <TextInput
              label="Stock"
              mode="outlined"
              keyboardType="numeric"
              style={{ width: "45%" }}
              onChangeText={(value) => handleSetValues("stock", value)}
            />
          </View>
  
          <TextInput
            label="Descripción"
            mode="outlined"
            onChangeText={(value) => handleSetValues("description", value)}
            multiline
            numberOfLines={3}
          />
          
          {errorMessage ? (
            <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
          ) : null}
  
          <Button mode="contained" onPress={handleSaveVideogame}>
            Agregar
          </Button>
        </Modal>
      </Portal>
    );
  };

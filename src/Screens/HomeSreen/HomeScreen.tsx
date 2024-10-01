import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput, } from "react-native-paper";
import { styles } from "../../theme/styles";
import { onAuthStateChanged } from "firebase/auth";
import { auth, dbRealTime } from "../config/firebaseConfig";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from '@firebase/auth';
import { updateProfile ,signOut } from 'firebase/auth';
import { FlatList } from "react-native-gesture-handler";
import { VideoGameCardComponent } from "./components/VideoGameCardComponent";
import { NewVideoGameComponent } from "./components/NewVideoGameComponent";
import { onValue, ref } from "firebase/database";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface FormUser {
  name: string;
}
export interface VideoGame {
  id: string;
  code: string;
  nameVideoGame: string;
  price: number;
  stock: number;
  description: string;
  genre: string;
  platform: string;
}

export const HomeScreen = () => {

  const navigation =useNavigation();
  const [FormUser, setFormUser] = useState<FormUser>({
    name: "",
  });

  const [userData, setUserData] = useState<firebase.User | null>(null);

  const [videoGames, setVideoGames] = useState<VideoGame[]>([

  ]);

  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

  const [showModalVideoGame, setShowModalVideoGame] = useState<boolean>(false);

  useEffect(() => {
    setUserData(auth.currentUser);
    setFormUser({ name: auth.currentUser?.displayName ?? "" });
    getAllVideo();
  }, []);

  const handleSetValues = (key: string, value: string) => {
    setFormUser({ ...FormUser, [key]: value });
  };

  const handleUpdateUser = async () => {
    try {
      await updateProfile(userData!, {
        displayName: FormUser.name,
      });
    }  catch (error) {
      console.log("Error: ", error);
    }
    //ocultar modal
    setShowModalProfile(false);
  }

  const getAllVideo = () => {
    const dbRef = ref(dbRealTime, 'videogame/' + auth.currentUser?.uid);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const getKeys = Object.keys(data);
        const listVideo: VideoGame[] = [];
        getKeys.forEach((Key) => {
          const value = { ...data[Key], id: Key };
          listVideo.push(value);
        });
        setVideoGames(listVideo);
      }
    });
  };
  
const handleSingnOut = async()=>{
  try{
  await signOut(auth);
  navigation.dispatch(CommonActions.reset({index:0,routes:[{name:'Login'}]}))
  setShowModalProfile(false);
  }
  catch (error) {
    console.log("Error: ", error);
  


}}

  return (
    <>
      <View style={styles.rootHome}>
        <View style={styles.header}>
          <Icon name="gamepad-variant" size={50} color="#000" />
          <View>
            <Text variant="bodySmall">Bienvenid@</Text>
            <Text variant="labelLarge">{userData?.displayName}</Text>
          </View>
          <View style={styles.iconHeader}>
            <IconButton
              icon="account-edit"
              size={30}
              mode="contained"
              onPress={() => setShowModalProfile(true)}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={videoGames}
            renderItem={({ item }) => <VideoGameCardComponent VideoGame={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <Portal>
        <Modal
          visible={showModalProfile}
          contentContainerStyle={styles.modal}
        >
          <View style={styles.header}>
            <Text variant="headlineSmall">Mi Perfil</Text>
            <View style={styles.iconHeader}>
              <IconButton
                icon="close-circle-outline"
                size={30}
                onPress={() => setShowModalProfile(false)}
              />
            </View>
          </View>
          <Divider />
          <TextInput
            mode="outlined"
            label="Nombre"
            value={FormUser.name}
            onChangeText={(value) => handleSetValues("name", value)}
          />
          <TextInput
            mode="outlined"
            label="Correo"
            disabled
            value={userData?.email!}
          />

          <Button mode="contained" onPress={handleUpdateUser}>
            Actualizar
          </Button>
          <View style={styles.iconSignOut}>
          <IconButton
              icon="logout-variant"
              size={50}
              mode='contained'
              onPress={handleSingnOut}
            />
            </View>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fabProduct}
        onPress={() => setShowModalVideoGame(true)}
      />

      <NewVideoGameComponent showModalVideoGame={showModalVideoGame} setShowModalVideoGame={setShowModalVideoGame} />
    </>
  );
};

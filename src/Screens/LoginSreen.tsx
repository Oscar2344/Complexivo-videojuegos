import React, { useState } from "react";
import { View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { styles } from "../theme/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebaseConfig"; 
import { CommonActions, useNavigation } from "@react-navigation/native";

interface FormLogin {
  email: string;
  password: string;
}

interface showMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const LoginScreen = () => {
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: "",
    password: "",
  });

  const [ShowMessage, setShowMessage] = useState<showMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation  = useNavigation();
  const handleSetValues = (Key: string, value: string) => {
    setFormLogin({ ...formLogin, [Key]: value });
  };

  const handleLogin = async () => {
    if (!formLogin.email || !formLogin.password) {
      setShowMessage({
        visible: true,
        message: "Completa todos los campos!",
        color: "#c82a08",
      });
      return;
    }
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
      );
      navigation.dispatch(CommonActions.navigate({name:'Home'}));
    }catch (error) {
      console.log("Error: ", error);
      setShowMessage({
        visible: true,
        message: "No se pudo iniciar sesión, intente más tarde!",
        color: "#ff4633",
      });
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Inicia Sesión</Text>
      <TextInput
        label="Correo"
        mode="outlined"
        placeholder="Escribe tu correo"
        onChangeText={(value) => handleSetValues("email", value)}
      />
      <TextInput
        label="Contraseña"
        mode="outlined"
        placeholder="Escribe tu contraseña"
        secureTextEntry={!passwordVisible}
        onChangeText={(value) => handleSetValues("password", value)}
        right={
          <TextInput.Icon
            icon={passwordVisible ? "eye-off" : "eye"}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
      />
      <Button mode="contained" onPress={handleLogin}>
        Iniciar Sesión
      </Button>
      <Text style={styles.textRedirect}
      onPress={()=> navigation.dispatch(CommonActions.navigate({name:'Register'}))}>
        No tienes una cuenta? Regístrate ahora
      </Text>
      <Snackbar
        visible={ShowMessage.visible}
        onDismiss={() => setShowMessage({ ...ShowMessage, visible: false })}
        style={{
          ...styles.message,
          backgroundColor: ShowMessage.color,
        }}
      >
        {ShowMessage.message}
      </Snackbar>
      
    </View>
  );
};

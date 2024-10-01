//rafc +  TAB

import React, { useState } from "react";
import { View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { styles } from "../theme/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface FormRegister {
  email: string;
  password: string;

}



interface showMessage{
  visible:boolean;
  message: string;
  color:string;
}

export const ResgisterScreens = () => {

  const [formRegister, setformRegister] = useState<FormRegister>({
    email: "",
    password: "",
  });


  const [ShowMessage, setShowMessage] = useState<showMessage>({
    visible: false,
    message:"",
    color: "#fff",

  });

 const [passwordVisible, setPasswordVisible] = useState(false);

 const navigation  = useNavigation();

  const handleSetValues = (Key: string, value: string) => {
    setformRegister({ ...formRegister, [Key]: value });
  };

  const handleResgister = async () => {
    if (!formRegister.email || !formRegister.password) {
      setShowMessage({visible:true,
        message:'Completa todos los campos!',
        color:'#c82a08'
      
      });
      return;
    }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password
      );
      setShowMessage({
        visible: true,
        message:'Registro exitoso',
        color: '#1d7c2c' ,
      })
    }  catch (error) {
      console.log("Error: ", error);
      setShowMessage({
        visible: true,
        message:'No se logro completar la transacción , intente mas tarde !',
        color: '#ff4633' ,
      })
    }
  };
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Regístrate</Text>
      <TextInput
        label=" Correo"
        mode="outlined"
        placeholder="Escribe tu correo"
        onChangeText={(value) => handleSetValues("email", value)}
      />
      <TextInput
        label=" Contraseña"
        mode="outlined"
        placeholder="Escribe tu contraseña"
        secureTextEntry={!passwordVisible} 
        onChangeText={(value) => handleSetValues("password", value)}
        right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"}
            onPress={() => setPasswordVisible(!passwordVisible)} 
          />
        }
      />
      <Button mode="contained" onPress={handleResgister}>
        Registrar
      </Button>
      <Text style={styles.textRedirect}
      onPress={()=> navigation.dispatch(CommonActions.navigate({name:'Login'}))}>
        ¿Ya tienes una cuenta? Inicia sesión ahora
      </Text>
      <Snackbar
        visible={ShowMessage.visible}
        onDismiss={() => setShowMessage({ ...ShowMessage,visible:false})}
        style={{
          ...styles.message,
        backgroundColor:ShowMessage.color
        }}>
      {ShowMessage.message}
      </Snackbar>
    </View>
  );
};

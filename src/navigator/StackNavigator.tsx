import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../Screens/LoginSreen";
import { ResgisterScreens } from "../Screens/ResgisterScreens";
import { HomeScreen} from "../Screens/HomeSreen/HomeScreen";

import { auth } from "../Screens/config/firebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { styles } from "../theme/styles";

interface Routes {
  name: string;
  screen: () => JSX.Element;
}

const routesNoAuth: Routes[] = [
  { name: "Login", screen: LoginScreen },
  { name: "Register", screen: ResgisterScreens },
];

const routesAuth: Routes[] = [
  {
    name: "Home",
    screen: HomeScreen,
  },
];

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    onAuthStateChanged(auth, (user) => {
      if (user) {//Existe autenticación
        // console.log(user);
        setIsAuth(true);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
    {isLoading ?(
    <View style={styles.rootActivity}>
      <ActivityIndicator animating={true} size={35} />

    </View>
    
  ) : (
    <Stack.Navigator>
      {!isAuth ? 
      routesNoAuth.map((item, index) => (
            <Stack.Screen
              key={index}
              name={item.name}
              options={{ headerShown: false }}
              component={item.screen}
            />
          ))
        : 
        routesAuth.map((item, index) => (
            <Stack.Screen
              key={index}
              name={item.name}
              options={{ headerShown: false }}
              component={item.screen}
            />
          ))}
    </Stack.Navigator>
  )}
    </>
  );
};

import { createStackNavigator } from "@react-navigation/stack"; // Importación correcta
import { LoginScreen } from "../Screens/LoginSreen";
import { ResgisterScreens } from "../Screens/ResgisterScreens";
import { HomeScreen } from "../Screens/HomeSreen/HomeScreen";
import { auth } from "../Screens/config/firebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { styles } from "../theme/styles";
import { DetailProductScreen } from "../Screens/DetailProductScreen";

interface Routes {
  name: string;
  screen: () => JSX.Element;
  headerShow?: boolean;
  title?: string;
}

const routes: Routes[] = [
  { name: "Login", screen: LoginScreen },
  { name: "Register", screen: ResgisterScreens },
  { name: "Home", screen: HomeScreen, title: "Home" },
  { name: "Detail", screen: DetailProductScreen, headerShow: true, title: " Detalle de Video juegos" },

];


const Stack = createStackNavigator();

export const StackNavigator = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={styles.rootActivity}>
          <ActivityIndicator animating={true} size={35} />
        </View>
      ) : (
        <Stack.Navigator initialRouteName={isAuth ? 'Home':'Login'}> 
          {
         routes.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{
                    headerShown: item.headerShow ?? false,
                    title: item.title ?? '',
                    
                  }}
                  component={item.screen}
                />
              ))
              }
        </Stack.Navigator>
      )}
    </>
  );
};

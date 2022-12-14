import {createNativeStackNavigator, useNavigation} from "@react-navigation/native-stack"


import Welcome from "../pages/Welcome"
import SingIn from "../pages/SingIn"
import SingUp from "../pages/SingUp"
import Home from "../pages/Home"


const Stack = createNativeStackNavigator();

export default function Routes() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
      <Stack.Screen name="SingIn" component={SingIn} options={{headerShown: false}}/>
      <Stack.Screen name="SingUp" component={SingUp} options={{headerShown: false}}/>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}
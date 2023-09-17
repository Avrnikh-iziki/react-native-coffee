import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { Bottomtabs } from "./src/components/TabNavigation"
import { CoffeeDetail, Open, Search, Register } from "./src/screens/index"
import { Provider } from "react-redux"
import { store } from "./src/Redux/Store"


const Stack = createNativeStackNavigator()
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Index" component={Open} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Bottomtabs} options={{ headerShown: false }} />
          <Stack.Screen name="CofeeDetail" component={CoffeeDetail} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}



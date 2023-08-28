import ListView from "./src/pages/list-view";
import DetailView from "./src/pages/detail-view";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ListView}
          options={{ title: "ListView" }}
        />
        <Stack.Screen name="Details" component={DetailView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// TODO
// 4. Add Detail view logic
// 5. Implement Searchbar and debounce method

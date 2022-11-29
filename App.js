import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Provider } from "react-redux";

import Home from "./src/screens/Home";
import AddChild from "./src/screens/AddChild";
import CustomHeader from "./src/components/CustomHeader";

import { store } from "./src/redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Add Child"
            component={AddChild}
            options={({ navigation }) => ({
              headerBackVisible: false,
              headerTitle: () => <CustomHeader text="Add Child" />,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    console.log("🚀 ~ file: App.js ~ line 28 ~ App ~ onPress");
                    navigation.goBack();
                  }}
                >
                  <AntDesign name="close" size={16} color="black" />
                </TouchableOpacity>
              ),
              headerStyle: {
                backgroundColor: "#FFFFFF",
              },
              headerTitleStyle: {
                marginHorizontal: 0,
                padding: 0,
                hight: 300,
              },
              headerTitleContainerStyle: {
                margin: 0,
                padding: 0,
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

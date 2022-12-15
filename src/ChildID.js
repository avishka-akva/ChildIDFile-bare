import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import Home from "./screens/Home";
import AddChild from "./screens/AddChild";
import CustomHeader from "./components/CustomHeader";
import { toggleExit } from "./redux/childManageSlice";

const Stack = createNativeStackNavigator();

export default function ChildID() {
  const dispatch = useDispatch();
  const { currentChild, childManage} = useSelector((state) => state);

  return (
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
            headerTitle: () => <CustomHeader text={`Child Profile${childManage.hederNameShow ? ` - ${currentChild.firstName}` : ""}`} />,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  dispatch(toggleExit());
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
  );
}

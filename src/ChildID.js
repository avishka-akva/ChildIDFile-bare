import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import Home from "./screens/Home";
import ChildProfile from "./screens/ChildProfile";
import CustomHeader from "./components/CustomHeader";
import { toggleExit, setView } from "./redux/childManageSlice";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { COLOR } from "./shared/const";

const Stack = createNativeStackNavigator();

export default function ChildID() {
  const dispatch = useDispatch();
  const { currentChild, childManage } = useSelector((state) => state);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChildProfile"
          component={ChildProfile}
          options={({ navigation }) => ({
            headerBackVisible: false,
            headerTitle: () => (
              <CustomHeader
                text={`Child Profile${
                  childManage.hederNameShow
                    ? ` - ${currentChild.firstName}`
                    : ""
                }`}
              />
            ),
            headerRight: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {childManage.view && (
                  <Pressable
                    onPress={() => {
                      dispatch(setView(false));
                    }}
                  >
                    <Text style={{ marginRight: 10, color: COLOR.primary }}>
                      Edit
                    </Text>
                  </Pressable>
                )}

                <TouchableOpacity
                  onPress={() => {
                    dispatch(toggleExit());
                  }}
                  style={{ padding: 10 }}
                >
                  <AntDesign name="close" size={16} color="black" />
                </TouchableOpacity>
              </View>
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

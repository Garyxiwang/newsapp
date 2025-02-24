import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // 使用 Expo 图标库
import Chat from "./src/chat";
import RedBook from "./src/redbook";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="发现" component={RedBook} />
      <Tab.Screen name="对话" component={Chat} />
      <Tab.Screen name="我" component={Chat} />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "新闻") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "对话") {
              iconName = focused ? "chatbox" : "chatbox-outline";
            } else if (route.name === "我") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato", // 激活状态颜色
          tabBarInactiveTintColor: "gray", // 非激活状态颜色
        })}
      >
        <Tab.Screen name="新闻" component={RedBook} />
        <Tab.Screen name="对话" component={Chat} />
        <Tab.Screen name="我" component={Chat} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;

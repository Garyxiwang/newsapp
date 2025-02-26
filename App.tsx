import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // 使用 Expo 图标库
import Chat from "./src/chat";
import RedBook from "./src/redbook";

const Tab = createBottomTabNavigator();

// TODO: 底部导航样式优化，去掉图标
function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "news") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "chat") {
              iconName = focused ? "chatbox" : "chatbox-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato", // 激活状态颜色
          tabBarInactiveTintColor: "gray", // 非激活状态颜色
        })}
      >
        <Tab.Screen
          name="news"
          component={RedBook}
          options={{ title: "新闻" }}
        />
        <Tab.Screen name="chat" component={Chat} options={{ title: "对话" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;

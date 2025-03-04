import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ArticleListScreen from "./src/reeder/list";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import { FEEDS } from "./src/models/feeds";
import chatScreen from "./src/chat";

// 创建抽屉导航器
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f1eb" />
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#f3f1eb",
            width: "100%",
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={ArticleListScreen}
          initialParams={{ feedId: FEEDS[0].id }}
        />
        <Drawer.Screen name="Chat" component={chatScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

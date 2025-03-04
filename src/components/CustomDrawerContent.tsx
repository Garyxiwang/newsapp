import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { FEEDS } from "../models/feeds";
import AddFeedMenu from "./AddFeedMenu";
import AddFeedSheet from "./AddFeedSheet";

interface CustomDrawerContentProps {
  navigation: any;
  state: any;
}

const CustomDrawerContent = (props: CustomDrawerContentProps) => {
  const { navigation, state } = props;
  const [menuVisible, setMenuVisible] = useState(false);
  const [addFeedSheetVisible, setAddFeedSheetVisible] = useState(false);

  const handleAddFeed = () => {
    // 关闭菜单，显示添加 Feed 的底部弹出页面
    setMenuVisible(false);
    setAddFeedSheetVisible(true);
  };

  const handleAddFeedSubmit = (url: string) => {
    // 处理添加 Feed 的逻辑
    Alert.alert("Feed Added", `Added feed with URL: ${url}`);
    setAddFeedSheetVisible(false);
  };

  const handleNewFilter = () => {
    Alert.alert("New Filter", "You can create a new filter here");
  };

  const handleNewFolder = () => {
    Alert.alert("New Folder", "You can create a new folder here");
  };

  const handleNewTag = () => {
    Alert.alert("New Tag", "You can create a new tag here");
  };

  return (
    <>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        {/* 顶部工具栏 */}
        <View style={styles.toolbar}>
          <Ionicons name="options-outline" size={24} color="#8e8e8e" />
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="add-outline" size={24} color="#8e8e8e" />
          </TouchableOpacity>
          
        </View>

        {/* 添加菜单弹窗 */}
        <AddFeedMenu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          onAddFeed={handleAddFeed}
          onNewFilter={handleNewFilter}
          onNewFolder={handleNewFolder}
          onNewTag={handleNewTag}
        />

        {/* Home 分类 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons
                name="flash"
                size={24}
                color="#e74c3c"
                style={styles.sectionIcon}
              />
              <Text style={styles.sectionTitle}>Home</Text>
            </View>
            <Ionicons name="chevron-down-outline" size={20} color="#8e8e8e" />
          </View>
          <Text style={styles.subTitle}>All feeds</Text>
        </View>

        {/* Saved 分类 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved</Text>
            <Ionicons name="chevron-down-outline" size={20} color="#8e8e8e" />
          </View>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => console.log("Links pressed")}
          >
            <Ionicons
              name="link-outline"
              size={24}
              color="#42403b"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Links</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => console.log("Later pressed")}
          >
            <Ionicons
              name="layers-outline"
              size={24}
              color="#42403b"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Later</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => console.log("Bookmarks pressed")}
          >
            <Ionicons
              name="bookmark-outline"
              size={24}
              color="#42403b"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Bookmarks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => console.log("Favorites pressed")}
          >
            <Ionicons
              name="heart-outline"
              size={24}
              color="#42403b"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Favorites</Text>
          </TouchableOpacity>
        </View>

        {/* Feeds 分类 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Feeds</Text>
            <Ionicons name="chevron-down-outline" size={20} color="#8e8e8e" />
          </View>

          {FEEDS.map((feed) => (
            <TouchableOpacity
              key={feed.id}
              style={[
                styles.menuItem,
                state.routes[state.index]?.params?.feedId === feed.id &&
                  styles.activeMenuItem,
              ]}
              onPress={() => {
                navigation.navigate("Home", { feedId: feed.id });
              }}
            >
              <View style={styles.feedIcon}>
                <Ionicons name={feed.icon} size={16} color="#42403b" />
              </View>
              <Text style={styles.menuText}>{feed.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>

      {/* 添加 Feed 的底部弹出页面 */}
      <AddFeedSheet
        visible={addFeedSheetVisible}
        onClose={() => setAddFeedSheetVisible(false)}
        onAdd={handleAddFeedSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
    paddingHorizontal: 15,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    marginTop: 30,
    paddingHorizontal: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#42403b",
  },
  subTitle: {
    fontSize: 14,
    color: "#8e8e8e",
    marginLeft: 5,
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  activeMenuItem: {
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#42403b",
  },
  feedIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
});

export default CustomDrawerContent;

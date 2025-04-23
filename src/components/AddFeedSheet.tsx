import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AddFeedSheetProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (url: string) => void;
}

const AddFeedSheet = ({ visible, onClose, onAdd }: AddFeedSheetProps) => {
  const [url, setUrl] = useState("");
  const slideAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setUrl("");
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // 自动聚焦到输入框
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      });
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get("window").height, 0],
  });

  const handleAdd = () => {
    if (url.trim()) {
      onAdd(url.trim());
      setUrl("");
    }
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Animated.View
            style={[
              styles.sheetContainer,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            {/* 顶部导航栏 */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              
              <View style={styles.headerCenter}>
                <Ionicons name="add-circle-outline" size={24} color="#999" />
              </View>
              
              <TouchableOpacity 
                onPress={handleAdd} 
                style={[styles.addButton, !url.trim() && styles.addButtonDisabled]}
                disabled={!url.trim()}
              >
                <Text style={[styles.addText, !url.trim() && styles.addTextDisabled]}>
                  Add
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.divider} />
            
            {/* Feed 标题 */}
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Feed</Text>
              <Ionicons name="wifi-outline" size={24} color="#999" />
            </View>
            
            <View style={styles.divider} />
            
            {/* URL 输入框 */}
            <View style={styles.inputContainer}>
              <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Feed or Site URL"
                placeholderTextColor="#999"
                value={url}
                onChangeText={setUrl}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleAdd}
              />
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
            
            <View style={styles.divider} />
            
            {/* OPML 导入部分 */}
            {/* <View style={styles.opmlContainer}>
              <Text style={styles.opmlTitle}>OPML Import</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.opmlDescContainer}>
              <Text style={styles.opmlDesc}>
                Import a list of feeds from an OPML file. This feature is only available to subscribers.
              </Text>
              <View style={styles.plusBadge}>
                <Ionicons name="lock-closed" size={14} color="#fff" style={styles.lockIcon} />
                <Text style={styles.plusText}>PLUS</Text>
              </View>
            </View> */}
          </Animated.View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: "#f3f1eb",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: "80%",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cancelText: {
    fontSize: 17,
    color: "#666",
  },
  headerCenter: {
    alignItems: "center",
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#e6e6e6",
    borderRadius: 8,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },
  addTextDisabled: {
    color: "#999",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 0,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: "#333",
    paddingVertical: 8,
  },
  opmlContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  opmlTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  opmlDescContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  opmlDesc: {
    flex: 1,
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    marginRight: 10,
  },
  plusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e74c3c",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  lockIcon: {
    marginRight: 4,
  },
  plusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default AddFeedSheet; 
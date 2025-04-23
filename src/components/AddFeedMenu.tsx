import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AddFeedMenuProps {
  visible: boolean;
  onClose: () => void;
  onAddFeed: () => void;
  onNewFilter: () => void;
  onNewFolder: () => void;
  onNewTag: () => void;
}

const AddFeedMenu = ({
  visible,
  onClose,
  onAddFeed,
  onNewFilter,
  onNewFolder,
  onNewTag,
}: AddFeedMenuProps) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.menuContainer,
                {
                  opacity: opacityAnim,
                  transform: [{ translateY }],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onAddFeed();
                  onClose();
                }}
              >
                <Text style={styles.menuText}>Add Feed...</Text>
                <View style={styles.iconContainer}>
                  <Ionicons name="add-circle-outline" size={24} color="#333" />
                </View>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onNewFilter();
                  onClose();
                }}
              >
                <Text style={styles.menuText}>New Filter...</Text>
                <View style={styles.iconContainer}>
                  <Ionicons name="options-outline" size={24} color="#333" />
                </View>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onNewFolder();
                  onClose();
                }}
              >
                <Text style={styles.menuText}>New Folder...</Text>
                <View style={styles.iconContainer}>
                  <Ionicons name="folder-outline" size={24} color="#333" />
                </View>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onNewTag();
                  onClose();
                }}
              >
                <Text style={styles.menuText}>New Tag...</Text>
                <View style={styles.iconContainer}>
                  <Ionicons name="pricetag-outline" size={24} color="#333" />
                </View>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menuContainer: {
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 120,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 18,
    color: "#333",
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
  },
});

export default AddFeedMenu;

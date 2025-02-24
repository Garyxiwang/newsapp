import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isDeepThinking, setIsDeepThinking] = useState(false);
  const [isWebSearching, setIsWebSearching] = useState(false);
  const flatListRef = React.useRef<FlatList>(null);

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "这是一个模拟的AI回复消息",
        isUser: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleDeepThinking = () => {
    setIsDeepThinking(!isDeepThinking);
    setIsWebSearching(false); // 关闭另一个选项
  };

  const toggleWebSearching = () => {
    setIsWebSearching(!isWebSearching);
    setIsDeepThinking(false); // 关闭另一个选项
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="给小i发送消息..."
            multiline
            onFocus={scrollToBottom}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.leftButtons}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  isDeepThinking && styles.actionButtonActive,
                ]}
                onPress={toggleDeepThinking}
              >
                <Text
                  style={[
                    styles.actionButtonText,
                    isDeepThinking && styles.actionButtonTextActive,
                  ]}
                >
                  深度思考
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  isWebSearching && styles.actionButtonActive,
                ]}
                onPress={toggleWebSearching}
              >
                <Text
                  style={[
                    styles.actionButtonText,
                    isWebSearching && styles.actionButtonTextActive,
                  ]}
                >
                  联网搜索
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rightButtons}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="attach-file" size={24} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconButton, styles.sendButton]}
                onPress={sendMessage}
                disabled={!inputText.trim()}
              >
                <MaterialIcons 
                  name="send" 
                  size={24} 
                  color={inputText.trim() ? "#fff" : "#rgba(255,255,255,0.5)"} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  chatList: {
    flex: 1,
    padding: 10,
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 12,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  inputWrapper: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    padding: 10,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    minHeight: 40,
    maxHeight: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  leftButtons: {
    flexDirection: "row",
    gap: 8,
  },
  rightButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  actionButtonActive: {
    backgroundColor: "#007AFF",
  },
  actionButtonText: {
    fontSize: 14,
    color: "#666",
  },
  actionButtonTextActive: {
    color: "#fff",
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  sendButton: {
    backgroundColor: "#007AFF",
  },
});

export default Chat;

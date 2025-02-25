import React, { useState, useEffect } from "react";
import { chatAPI } from '../services/api';
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
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface ApiError {
  response?: {
    data?: {
      detail?: string;
    };
  };
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isDeepThinking, setIsDeepThinking] = useState(false);
  const [isWebSearching, setIsWebSearching] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const flatListRef = React.useRef<FlatList>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageId, setLoadingMessageId] = useState<string | null>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() === "" || isLoading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "思考中...",
      isUser: false,
    };

    setMessages([...messages, newMessage, loadingMessage]);
    setLoadingMessageId(loadingMessage.id);
    setInputText("");
    setIsLoading(true);

    try {
      const { data } = await chatAPI.sendMessage(inputText, isDeepThinking, isWebSearching);
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, text: data.response }
          : msg
      ));
    } catch (error) {
      console.error('Error:', error);
      const apiError = error as ApiError;
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, text: apiError.response?.data?.detail || "抱歉，发生了一些错误，请稍后再试。" }
          : msg
      ));
    } finally {
      setIsLoading(false);
      setLoadingMessageId(null);
    }
  };

  const toggleDeepThinking = () => {
    setIsDeepThinking(!isDeepThinking);
  };

  const toggleWebSearching = () => {
    setIsWebSearching(!isWebSearching);
  };

  const toggleAttachments = () => {
    setShowAttachments(!showAttachments);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      {!item.isUser && (
        <View style={styles.avatarContainer}>
          <MaterialIcons name="android" size={24} color="#007AFF" />
        </View>
      )}
      <View style={[
        styles.messageBubble,
        item.isUser ? styles.userBubble : styles.aiBubble,
      ]}>
        <Text style={[
          styles.messageText,
          item.isUser && styles.userMessageText
        ]}>
          {item.text}
        </Text>
        {loadingMessageId === item.id && (
          <ActivityIndicator 
            size="small" 
            color={item.isUser ? "#fff" : "#666"} 
            style={styles.messageLoader}
          />
        )}
      </View>
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
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
        />
        <View style={styles.inputWrapper}>
          {showAttachments && (
            <View style={styles.attachmentBar}>
              <TouchableOpacity style={styles.attachmentButton}>
                <MaterialIcons name="camera-alt" size={24} color="#666" />
                <Text style={styles.attachmentText}>拍照</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentButton}>
                <MaterialIcons name="image" size={24} color="#666" />
                <Text style={styles.attachmentText}>图片</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentButton}>
                <MaterialIcons name="folder" size={24} color="#666" />
                <Text style={styles.attachmentText}>文件</Text>
              </TouchableOpacity>
            </View>
          )}
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="给小d发送消息..."
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
              <TouchableOpacity 
                style={[
                  styles.iconButton,
                  showAttachments && styles.iconButtonActive
                ]}
                onPress={toggleAttachments}
              >
                <MaterialIcons 
                  name="attach-file" 
                  size={22} 
                  color={showAttachments ? "#007AFF" : "#666"} 
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={sendMessage}
                disabled={!inputText.trim()}
              >
                <MaterialIcons 
                  name="send" 
                  size={22} 
                  color={inputText.trim() ? "#007AFF" : "#666"} 
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
    paddingVertical: 15,
  },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 12,
    borderRadius: 18,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    marginLeft: "auto",
  },
  aiBubble: {
    backgroundColor: "#f0f0f0",
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#000",
  },
  userMessageText: {
    color: "#fff",
  },
  inputWrapper: {
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#e0e0e0",
    padding: 10,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 15,
    minHeight: 36,
    maxHeight: 100,
    textAlignVertical: "center",
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
    gap: 12,
    paddingHorizontal: 4,
  },
  actionButton: {
    paddingHorizontal: 12,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  actionButtonActive: {
    backgroundColor: "#007AFF",
  },
  actionButtonText: {
    fontSize: 13,
    color: "#666",
  },
  actionButtonTextActive: {
    color: "#fff",
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  attachmentBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  attachmentButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  attachmentText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  iconButtonActive: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
  },
  messageLoader: {
    marginLeft: 10,
    marginTop: 5,
  },
});

export default Chat;

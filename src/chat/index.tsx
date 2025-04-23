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
  Image,
} from "react-native";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  imageUrl?: string;
}

interface ApiError {
  response?: {
    data?: {
      detail?: string;
    };
  };
}

// 定义路由参数类型
type ChatRouteParams = {
  question?: string;
  imageUrl?: string;
  title?: string;
  author?: string;
};

function Chat() {
  const route = useRoute<RouteProp<Record<string, ChatRouteParams>, string>>();
  const navigation = useNavigation<any>();
  const { question, imageUrl, title, author } = route.params || {};
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState(question || "");
  const [isDeepThinking, setIsDeepThinking] = useState(false);
  const [isWebSearching, setIsWebSearching] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const flatListRef = React.useRef<FlatList>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageId, setLoadingMessageId] = useState<string | null>(null);

  // 如果有传入的问题，自动发送
  useEffect(() => {
    if (question) {
      // 创建初始用户消息
      const initialMessage: Message = {
        id: Date.now().toString(),
        text: question,
        isUser: true,
      };
      
      // 如果有图片，添加到消息中
      if (imageUrl) {
        initialMessage.imageUrl = imageUrl;
      }
      
      // setMessages([initialMessage]);
      
      // 延迟一点时间后自动发送消息
      // setTimeout(() => {
      //   handleAutoSend(question);
      // }, 500);
    }
  }, [route.params]);

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

  // 添加带图片发送消息的方法
  const sendMessageWithImage = async (text: string, imgUrl: string) => {
    if (text.trim() === "" || isLoading) return;
    
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "思考中...",
      isUser: false,
    };

    setMessages(prev => [...prev, loadingMessage]);
    setLoadingMessageId(loadingMessage.id);
    setInputText("");
    setIsLoading(true);

    try {
      // 这里可以修改API调用，传入图片URL
      const { data } = await chatAPI.sendMessage(text, isDeepThinking, isWebSearching);
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

  // 处理自动发送消息
  const handleAutoSend = (text: string) => {
    if (text.trim() === "" || isLoading) return;
    
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "思考中...",
      isUser: false,
    };

    setMessages(prev => [...prev, loadingMessage]);
    setLoadingMessageId(loadingMessage.id);
    setIsLoading(true);

    try {
      // 发送消息到API
      chatAPI.sendMessage(text, isDeepThinking, isWebSearching)
        .then(({ data }) => {
          setMessages(prev => prev.map(msg => 
            msg.id === loadingMessage.id 
              ? { ...msg, text: data.response }
              : msg
          ));
        })
        .catch((error) => {
          console.error('Error:', error);
          const apiError = error as ApiError;
          setMessages(prev => prev.map(msg => 
            msg.id === loadingMessage.id 
              ? { ...msg, text: apiError.response?.data?.detail || "抱歉，发生了一些错误，请稍后再试。" }
              : msg
          ));
        })
        .finally(() => {
          setIsLoading(false);
          setLoadingMessageId(null);
        });
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      setLoadingMessageId(null);
    }
  };

  // 处理发送按钮点击
  const handleSendPress = () => {
    if (inputText.trim() === "" || isLoading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };

    setMessages([...messages, newMessage]);
    const currentText = inputText;
    setInputText("");
    
    handleAutoSend(currentText);
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
        {item.imageUrl && (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.messageImage}
            resizeMode="cover"
          />
        )}
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

  // 处理返回按钮点击
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {title ? title : "聊天"}
        </Text>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
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
                onPress={handleSendPress}
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
    backgroundColor: "#f3f1eb",
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
    height: 60,
    backgroundColor: "#f3f1eb",
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40, // 保持左右对称
  },
  chatList: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
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
  messageImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
  },
});

export default Chat;

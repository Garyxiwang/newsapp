import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Animated,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Article, FEEDS } from "../models/feeds";

// 文章项组件
const ArticleItem = ({
  item,
  feedTitle,
}: {
  item: Article;
  feedTitle: string;
}) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate('Chat', {
      question: `关于"${item.title}"的详细信息是什么？`,
      title: item.title,
      author: item.author
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.articleContainer}>
        <View style={styles.articleHeader}>
          <View style={styles.authorIcon}>
            <Ionicons name="flash-outline" size={18} color="#42403b" />
          </View>
          <View style={styles.articleMeta}>
            <Text style={styles.articleSource}>{feedTitle}</Text>
            <Text style={styles.articleAuthor}>{item.author}</Text>
          </View>
          <Text style={styles.articleTime}>{item.time}</Text>
        </View>

        <Text style={styles.articleTitle}>{item.title}</Text>

        <View style={styles.articleLinks}>
          <Text style={styles.linkLabel}>Article URL: </Text>
          <Text style={styles.linkUrl} numberOfLines={1} ellipsizeMode="tail">
            {item.articleUrl}
          </Text>
        </View>

        <View style={styles.articleLinks}>
          <Text style={styles.linkLabel}>Comments URL: </Text>
          <Text style={styles.linkUrl} numberOfLines={1} ellipsizeMode="tail">
            {item.commentsUrl}
          </Text>
        </View>

        {(item.points !== undefined || item.comments !== undefined) && (
          <View style={styles.articleStats}>
            {item.points !== undefined && (
              <Text style={styles.statsText}>Points: {item.points}</Text>
            )}
            {item.comments !== undefined && (
              <Text style={styles.statsText}># Comments: {item.comments}</Text>
            )}
          </View>
        )}

        <View style={styles.divider} />
      </View>
    </TouchableOpacity>
  );
};

// 旋转动画组件
const RotatingIcon = ({ isRefreshing }: { isRefreshing: boolean }) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (isRefreshing) {
      // 创建循环旋转动画
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      );
      
      spinAnimation.start();
      
      return () => {
        spinAnimation.stop();
        spinValue.setValue(0);
      };
    }
  }, [isRefreshing]);
  
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Ionicons name="refresh-outline" size={24} color="#42403b" />
    </Animated.View>
  );
};

// 列表页组件
const ArticleListScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<any>(null);
  
  // 获取路由参数中的 feedId，如果没有则默认使用第一个 feed
  const feedId = route.params?.feedId || FEEDS[0].id;
  
  // 根据 feedId 找到对应的 feed
  const currentFeed = FEEDS.find((feed) => feed.id === feedId) || FEEDS[0];

  // 监听滚动位置变化
  useEffect(() => {
    const scrollListener = scrollY.addListener(({ value }) => {
      if (value > 60 && !isScrolled) {
        setIsScrolled(true);
      } else if (value <= 60 && isScrolled) {
        setIsScrolled(false);
      }
    });

    return () => {
      scrollY.removeListener(scrollListener);
    };
  }, [isScrolled]);

  // 处理刷新
  const handleRefresh = () => {
    if (refreshing) return;
    
    setRefreshing(true);
    
    // 如果列表不在顶部，先滚动到顶部
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
    
    // 模拟网络请求
    setTimeout(() => {
      // 这里可以添加实际的数据刷新逻辑
      setRefreshing(false);
    }, 2000);
  };

  // 标题透明度动画
  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  // 大标题透明度动画（反向）
  const bigTitleOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [1, 0.3, 0],
    extrapolate: "clamp",
  });

  // 处理跳转到聊天页面
  const handleNavigateToChat = () => {
    navigation.navigate('Chat', {
      question: `关于 ${currentFeed.title} 的最新内容是什么？`,
      title: currentFeed.title,
      author: currentFeed.source
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f1eb" />

      {/* 头部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu-outline" size={28} color="#42403b" />
        </TouchableOpacity>

        <Animated.View
          style={[styles.headerCenter, { opacity: headerTitleOpacity }]}
        >
          <Text style={styles.headerTitle}>{currentFeed.title}</Text>
          <Text style={styles.headerSubtitle}>{currentFeed.source}</Text>
        </Animated.View>

        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? (
              <RotatingIcon isRefreshing={refreshing} />
            ) : (
              <Ionicons name="refresh-outline" size={24} color="#42403b" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search-outline" size={24} color="#42403b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 大标题区域 - 仅在顶部显示 */}
      {!isScrolled && (
        <Animated.View
          style={[styles.bigTitleContainer, { opacity: bigTitleOpacity }]}
        >
          <Text style={styles.bigTitle}>{currentFeed.title}</Text>
          <Text style={styles.bigSubtitle}>{currentFeed.source}</Text>
        </Animated.View>
      )}

      {/* 文章列表 */}
      <Animated.FlatList
        ref={flatListRef}
        data={currentFeed.articles}
        renderItem={({ item }) => (
          <ArticleItem item={item} feedTitle={currentFeed.title} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            // 设置指示器颜色为透明，使其不可见
            progressBackgroundColor="transparent"
            colors={["transparent"]}
            tintColor="transparent"
            progressViewOffset={-100} // 将指示器移出可见区域
            size={0} // 尽可能小的尺寸
            // 保留下拉刷新功能，但隐藏视觉指示器
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f1eb",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: 60,
    backgroundColor: "#f3f1eb",
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerCenter: {
    flex: 1,
    marginLeft: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "600",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  headerRight: {
    flexDirection: "row",
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  bigTitleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#f3f1eb",
  },
  bigTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  bigSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  articleContainer: {
    marginBottom: 16,
  },
  articleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  authorIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  articleMeta: {
    flex: 1,
  },
  articleSource: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  articleAuthor: {
    fontSize: 14,
    color: "#666",
  },
  articleTime: {
    fontSize: 14,
    color: "#999",
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
    lineHeight: 24,
  },
  articleLinks: {
    flexDirection: "row",
    marginBottom: 4,
  },
  linkLabel: {
    fontSize: 14,
    color: "#666",
  },
  linkUrl: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  articleStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statsText: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginTop: 16,
  },
});

export default ArticleListScreen;

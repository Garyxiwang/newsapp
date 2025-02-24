import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
  Image,
  ListRenderItem,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const data = [
  {
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241106/8e557ed95639f6d81032ac39a2c26843/1040g2sg31e920b4jge005ni1d0fg8qe4k7tclm0!nc_n_webp_mw_1",
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    title:
      "小莎宝宝起落平安小莎宝宝起落平安小莎宝宝起落平安小莎宝宝起落平安小莎宝宝起落平安小莎宝宝起落平安",
    author: "作者莎宝宝莎宝宝123",
    likeNum: 12000,
  },
  {
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241424/df4a85b2afec28ec40c9d2bf610dd13d/1040g00831e93bidv0s405pm00mbnee9apqrbec8!nc_n_webp_mw_1",
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    title: "李诞都看什么视频",
    author: "诞总解忧小卖铺",
    likeNum: 61,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241551/f71c2b3c63def987c69dff056860173c/1040g00831e92h2r0gm6g5o3mls7g9epo8j5stjo!nc_n_webp_mw_1",
    title: "名称3",
    author: "作者2",
    likeNum: 2,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241551/6bace9c331299c79863050059db2dbed/1040g2sg31dvicvjdgmcg42ae35225nkfur9vsa0!nc_n_webp_mw_1",
    title: "名称4",
    author: "作者3",
    likeNum: 3,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241551/42b2be003623fd3413fa20d4a91d8936/1040g00831e8cb77l0k205oeuabvk0qgq597fbkg!nc_n_webp_mw_1",
    title: "名称5",
    author: "作者4",
    likeNum: 4,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241551/a2ffc75d366d2c96b338256e7770ee4a/1040g2sg31e96dfl0086g5p53nmik3klri0um7fo!nc_n_webp_mw_1",
    title: "名称6",
    author: "作者5",
    likeNum: 5,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241551/6ed76e804e5dedefb87402f5ebe7327d/1040g00831e6olghlg80g456j1oj42hqk7fn68l8!nc_n_webp_mw_1",
    title: "名称7",
    author: "作者6",
    likeNum: 6,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241551/434d323f4eba294d63f0015212eb2c40/1040g2sg31dlpjmff0u705nq0edcgbv013j5o56g!nc_n_webp_mw_1",
    title: "名称8",
    author: "作者7",
    likeNum: 7,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241551/31b69e45f72f810252500b731be985a6/1040g00831e1d3f5p0e004bv06vl5qe68nni0ba0!nc_n_webp_mw_1",
    title: "名称9",
    author: "作者8",
    likeNum: 88,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241551/aa8d812a86ee38777a33a7f163b17050/1040g00831djr7c0bgk0g4bfslhlegjind34sdmo!nc_n_webp_mw_1",
    title: "名称10",
    author: "作者10",
    likeNum: 234,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241551/03e7e2969473ae577fdd2a376ae282cf/1040g00831d9f34960e6g5os365snr1fimbpemn0!nc_n_webp_mw_1",
    title: "名称11",
    author: "作者11",
    likeNum: 776,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241555/9579298b194ef6b337850c4a275d3e0a/1040g00831e6r74g6h0005p9n88p1gg57c6o8s10!nc_n_webp_mw_1",
    title: "名称12",
    author: "作者12",
    likeNum: 3,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241555/ee350652a9895fd6114a12701f648ccf/1040g00831e6pi0ehgm505p69crr2otktbvv2lso!nc_n_webp_mw_1",
    title: "名称13",
    author: "作者13",
    likeNum: 23,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241555/a77829164740dc98ed949820f4caf18f/1040g00831doacf040m6g5n3f7d4k01c6vce1hi8!nc_n_webp_mw_1",
    title: "名称14",
    author: "作者14",
    likeNum: 4,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241555/ac7f7c91f51c31000f8d27230af4eda2/1040g00831dmd0rck10405pl39mbne4n3oij1se0!nc_n_webp_mw_1",
    title: "名称15",
    author: "作者15",
    likeNum: 2148,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image:
      "https://sns-webpic-qc.xhscdn.com/202502241555/83e1fd56b1db028ea3946e7e33ac6a1e/1040g00831ddeujr40e005o7brfi85qn34nmq9l0!nc_n_webp_mw_1",
    title: "名称16",
    author: "作者16",
    likeNum: 788,
  },
];

type ItemProps = {
  title: string;
  image: string;
  author: string;
  likeNum: number;
  avatar: string;
};

const convertLikeNum = (num: number) => {
  if (num > 10000) {
    return `${num / 10000}w`;
  }
  return num;
};

const onItemPress = (item: ItemProps) => {
  // 处理点击事件
};

const renderItem: ListRenderItem<ItemProps> = ({ item }) => (
  <TouchableOpacity 
    style={styles.item}
    onPress={() => onItemPress(item)}
    activeOpacity={0.7}
  >
    <Image
      source={{ uri: item.image }}
      style={styles.img}
      resizeMode="cover"
      progressiveRenderingEnabled={true}
    />
    <Text numberOfLines={2} style={styles.title}>
      {item.title}
    </Text>
    <View style={styles.content}>
      <View style={styles.header}>
        <Image
          src={item.avatar}
          style={{ width: 20, height: 20, borderRadius: 15 }}
        />
        <Text numberOfLines={1} style={styles.author}>
          {item.author}
        </Text>
      </View>

      <View style={styles.like}>
        <FontAwesome5
          name="heart"
          size={16}
          color="#333"
          light
          style={{ display: "block", marginRight: 5 }}
        />
        <Text style={styles.likeText}>{item.likeNum !== undefined ? convertLikeNum(item.likeNum) : 0}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

function RedBook() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // 刷新数据
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={data}
        numColumns={2}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export default RedBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  item: {
    backgroundColor: "#fff",
    width: '48%',
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  img: {
    width: '100%',
    height: undefined,
    aspectRatio: 3/4,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#333',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  author: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    flex: 1,
  },
  like: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

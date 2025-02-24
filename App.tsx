import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
  Image,
  ListRenderItem,
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
    author: "作者莎宝宝莎宝宝",
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
    image: "https://sns-webpic-qc.xhscdn.com/202502241551/f71c2b3c63def987c69dff056860173c/1040g00831e92h2r0gm6g5o3mls7g9epo8j5stjo!nc_n_webp_mw_1",
    title: "名称3",
    author: "作者2",
    likeNum: 2,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image: "https://sns-webpic-qc.xhscdn.com/202502241551/6bace9c331299c79863050059db2dbed/1040g2sg31dvicvjdgmcg42ae35225nkfur9vsa0!nc_n_webp_mw_1",
    title: "名称4",
    author: "作者3",
    likeNum: 3,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image: "https://sns-webpic-qc.xhscdn.com/202502241551/42b2be003623fd3413fa20d4a91d8936/1040g00831e8cb77l0k205oeuabvk0qgq597fbkg!nc_n_webp_mw_1",
    title: "名称5",
    author: "作者4",
    likeNum: 4,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image: "https://sns-webpic-qc.xhscdn.com/202502241551/a2ffc75d366d2c96b338256e7770ee4a/1040g2sg31e96dfl0086g5p53nmik3klri0um7fo!nc_n_webp_mw_1",
    title: "名称6",
    author: "作者5",
    likeNum: 5,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image: "https://sns-webpic-qc.xhscdn.com/202502241551/6ed76e804e5dedefb87402f5ebe7327d/1040g00831e6olghlg80g456j1oj42hqk7fn68l8!nc_n_webp_mw_1",
    title: "名称7",
    author: "作者6",
    likeNum: 6,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image: "https://sns-webpic-qc.xhscdn.com/202502241551/434d323f4eba294d63f0015212eb2c40/1040g2sg31dlpjmff0u705nq0edcgbv013j5o56g!nc_n_webp_mw_1",
    title: "名称8",
    author: "作者7",
    likeNum: 7,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image: "https://sns-webpic-qc.xhscdn.com/202502241551/31b69e45f72f810252500b731be985a6/1040g00831e1d3f5p0e004bv06vl5qe68nni0ba0!nc_n_webp_mw_1",
    title: "名称9",
    author: "作者8",
    likeNum: 88,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image: "https://sns-webpic-qc.xhscdn.com/202502241551/aa8d812a86ee38777a33a7f163b17050/1040g00831djr7c0bgk0g4bfslhlegjind34sdmo!nc_n_webp_mw_1",
    title: "名称10",
    author: "作者10",
    likeNum: 234,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image: "https://sns-webpic-qc.xhscdn.com/202502241551/03e7e2969473ae577fdd2a376ae282cf/1040g00831d9f34960e6g5os365snr1fimbpemn0!nc_n_webp_mw_1",
    title: "名称11",
    author: "作者11",
    likeNum: 776,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image: "https://sns-webpic-qc.xhscdn.com/202502241555/9579298b194ef6b337850c4a275d3e0a/1040g00831e6r74g6h0005p9n88p1gg57c6o8s10!nc_n_webp_mw_1",
    title: "名称12",
    author: "作者12",
    likeNum: 3,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image: "https://sns-webpic-qc.xhscdn.com/202502241555/ee350652a9895fd6114a12701f648ccf/1040g00831e6pi0ehgm505p69crr2otktbvv2lso!nc_n_webp_mw_1",
    title: "名称13",
    author: "作者13",
    likeNum: 23,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image: "https://sns-webpic-qc.xhscdn.com/202502241555/a77829164740dc98ed949820f4caf18f/1040g00831doacf040m6g5n3f7d4k01c6vce1hi8!nc_n_webp_mw_1",
    title: "名称14",
    author: "作者14",
    likeNum: 4,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image: "https://sns-webpic-qc.xhscdn.com/202502241555/ac7f7c91f51c31000f8d27230af4eda2/1040g00831dmd0rck10405pl39mbne4n3oij1se0!nc_n_webp_mw_1",
    title: "名称15",
    author: "作者15",
    likeNum: 2148,
  },
  {
    avatar:
      "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31aveleki7g6g5pm00mbnee9a33541so?imageView2/2/w/60/format/webp|imageMogr2/strip",
    image: "https://sns-webpic-qc.xhscdn.com/202502241555/83e1fd56b1db028ea3946e7e33ac6a1e/1040g00831ddeujr40e005o7brfi85qn34nmq9l0!nc_n_webp_mw_1",
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

const renderItem: ListRenderItem<ItemProps> = ({ item }) => {
  const { image, avatar, title, author, likeNum } = item; // 使用 item 直接解构
  return (
    <View style={styles.item}>
      <Image src={image} style={styles.img} />
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            src={avatar}
            style={{ width: 20, height: 20, borderRadius: 15 }}
          />
          <Text numberOfLines={1} style={styles.author}>
            {author}
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
          <Text>{likeNum !== undefined ? convertLikeNum(likeNum) : 0}</Text>
        </View>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList data={data} numColumns={2} renderItem={renderItem}></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center", // 垂直居中
    alignItems: "center", // 水平居中
  },
  item: {
    backgroundColor: "#fff",
    padding: 5,
    marginVertical: 2,
  },
  title: {
    fontSize: 14,
    padding: 5,
    width: 180,
  },
  img: {
    width: "100%",
    height: 280,
    aspectRatio: 200 / 300,
    borderRadius: 15,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    color: "#007aff",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  author: {
    width: 90,
    marginLeft: 3,
  },
  like: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

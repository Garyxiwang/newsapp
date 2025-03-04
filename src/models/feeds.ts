import { Ionicons } from "@expo/vector-icons";

// 获取 Ionicons 支持的图标名称类型
type IconName = React.ComponentProps<typeof Ionicons>["name"];

// 文章数据类型
export interface Article {
  id: string;
  title: string;
  author: string;
  time: string;
  articleUrl: string;
  commentsUrl: string;
  points?: number;
  comments?: number;
}

// Feed 数据类型
export interface Feed {
  id: string;
  title: string;
  source: string;
  icon: IconName;
  articles: Article[];
}

// 模拟 Feeds 数据
export const FEEDS: Feed[] = [
  {
    id: "ruanyifeng",
    title: "阮一峰的网络日志",
    source: "ruanyifeng.com",
    icon: "flash-outline",
    articles: [
      {
        id: "r1",
        title: "科技爱好者周刊（第 248 期）：不要夸大 AI 的影响",
        author: "阮一峰",
        time: "3d",
        articleUrl:
          "https://www.ruanyifeng.com/blog/2023/03/weekly-issue-248.html",
        commentsUrl:
          "https://www.ruanyifeng.com/blog/2023/03/weekly-issue-248.html#comments",
        comments: 12,
      },
      // 更多文章...
    ],
  },
  {
    id: "hackernews",
    title: "Hacker News: Newest",
    source: "news.ycombinator.com",
    icon: "flash-outline",
    articles: [
      {
        id: "1",
        title:
          "Tech companies' proposed new safety codes won't protect all kids online",
        author: "billybuckwheat",
        time: "29m",
        articleUrl:
          "https://theconversation.com/tech-companies-proposed-new-safety-codes-wont-protect-all-kids-online-251266",
        commentsUrl: "https://news.ycombinator.com/item?id=43251023",
      },
      {
        id: "2",
        title: "What can Anthropic's $3.5B round buy?",
        author: "Olshansky",
        time: "29m",
        articleUrl: "https://twitter.com/olshansky/status/1896810284049924398",
        commentsUrl: "https://news.ycombinator.com/item?id=43251022",
        points: 1,
      },
      {
        id: "3",
        title: "Will's Workshop",
        author: "RyanOD",
        time: "31m",
        articleUrl: "https://willsworkshop.com/workshop/",
        commentsUrl: "https://news.ycombinator.com/item?id=43251009",
        points: 1,
        comments: 0,
      },
      {
        id: "4",
        title: "Will's Workshop",
        author: "RyanOD",
        time: "31m",
        articleUrl: "https://willsworkshop.com/workshop/",
        commentsUrl: "https://news.ycombinator.com/item?id=43251009",
        points: 1,
        comments: 0,
      },
      {
        id: "5",
        title: "Will's Workshop",
        author: "RyanOD",
        time: "31m",
        articleUrl: "https://willsworkshop.com/workshop/",
        commentsUrl: "https://news.ycombinator.com/item?id=43251009",
        points: 1,
        comments: 0,
      },
      {
        id: "6",
        title: "Will's Workshop",
        author: "RyanOD",
        time: "31m",
        articleUrl: "https://willsworkshop.com/workshop/",
        commentsUrl: "https://news.ycombinator.com/item?id=43251009",
        points: 1,
        comments: 0,
      },
      {
        id: "7",
        title: "Will's Workshop",
        author: "RyanOD",
        time: "31m",
        articleUrl: "https://willsworkshop.com/workshop/",
        commentsUrl: "https://news.ycombinator.com/item?id=43251009",
        points: 1,
        comments: 0,
      },
      {
        id: "8",
        title: "Will's Workshop",
        author: "RyanOD",
        time: "31m",
        articleUrl: "https://willsworkshop.com/workshop/",
        commentsUrl: "https://news.ycombinator.com/item?id=43251009",
        points: 1,
        comments: 0,
      },
      {
        id: "9",
        title: "Will's Workshop",
        author: "RyanOD",
        time: "31m",
        articleUrl: "https://willsworkshop.com/workshop/",
        commentsUrl: "https://news.ycombinator.com/item?id=43251009",
        points: 1,
        comments: 0,
      },
      {
        id: "10",
        title: "Will's Workshop",
        author: "RyanOD",
        time: "31m",
        articleUrl: "https://willsworkshop.com/workshop/",
        commentsUrl: "https://news.ycombinator.com/item?id=43251009",
        points: 1,
        comments: 0,
      },
      // 其他文章...
    ],
  },
  {
    id: "nature",
    title: "Nature",
    source: "nature.com",
    icon: "flash-outline",
    articles: [
      {
        id: "n1",
        title: "The race to make a variant-proof COVID vaccine",
        author: "Nature",
        time: "1d",
        articleUrl: "https://www.nature.com/articles/d41586-023-00789-5",
        commentsUrl:
          "https://www.nature.com/articles/d41586-023-00789-5#comments",
      },
      // 更多文章...
    ],
  },
]; 
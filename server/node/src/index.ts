import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { BufferMemory } from "langchain/memory";
import { ChatMessage } from "./types/chat";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 初始化LangChain聊天模型
const model = new ChatOpenAI({
  openAIApiKey: process.env.DEEPSEEK_API_KEY,
  configuration: {
    baseURL: "https://api.deepseek.com",
  },
  modelName: "deepseek-chat",
  maxTokens: 1000,
});

// 初始化内存
const memory = new BufferMemory({
  returnMessages: true,
  memoryKey: "history",
});

app.post("/chat", async (req, res) => {
  try {
    const message: ChatMessage = req.body;
    console.log(`Received chat message: ${message.text.slice(0, 50)}...`);

    // 获取历史对话
    const history = await memory.loadMemoryVariables({});
    const pastMessages = history.history || [];

    // 构建完整的消息列表
    const messages = [
      new SystemMessage("You are a helpful assistant"),
      ...pastMessages,
      new HumanMessage(message.text),
    ];

    // 发送对话
    const result = await model.invoke(messages);
    const response = result.content.toString();

    // 保存新的对话到历史记录
    await memory.saveContext({ input: message.text }, { output: response });

    console.log(`Sending response: ${response.slice(0, 50)}...`);
    res.json({ response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      detail: error instanceof Error ? error.message : "An error occurred",
    });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import uvicorn
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.schema import SystemMessage, HumanMessage, AIMessage
import logging

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 加载环境变量
load_dotenv()

# 检查必要的环境变量
if not os.getenv("DEEPSEEK_API_KEY"):
    logger.error("DEEPSEEK_API_KEY not found in environment variables!")
    raise ValueError("DEEPSEEK_API_KEY is required")

app = FastAPI()

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有方法
    allow_headers=["*"],  # 允许所有头
)

try:
    # 初始化LangChain聊天模型
    model = ChatOpenAI(
        api_key=os.getenv("DEEPSEEK_API_KEY"),
        base_url="https://api.deepseek.com",
        model_name="deepseek-chat",
        max_tokens=1000
    )

    # 初始化内存
    memory = ConversationBufferMemory(
        return_messages=True,
        memory_key="history"
    )
except Exception as e:
    logger.error(f"Error initializing LangChain: {str(e)}")
    raise

class ChatMessage(BaseModel):
    text: str
    isDeepThinking: bool = False
    isWebSearching: bool = False

@app.post("/chat")
async def chat(message: ChatMessage):
    try:
        logger.info(f"Received chat message: {message.text[:50]}...")
        
        # 获取历史对话
        history = memory.load_memory_variables({})
        past_messages = history.get("history", [])
        
        # 构建完整的消息列表
        messages = [
            SystemMessage(content="You are a helpful assistant"),
            *past_messages,
            HumanMessage(content=message.text)
        ]
        
        # 发送对话
        result = model.invoke(messages)
        response = result.content
        
        # 保存新的对话到历史记录
        memory.save_context(
            {"input": message.text}, 
            {"output": response}
        )
        
        logger.info(f"Sending response: {response[:50]}...")
        return {"response": response}
    
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    try:
        port = int(os.getenv("PORT", 8000))
        logger.info(f"Starting server on port {port}")
        
        # 打印网络接口信息
        import socket
        hostname = socket.gethostname()
        local_ip = socket.gethostbyname(hostname)
        logger.info(f"Server is accessible at: http://{local_ip}:{port}")
        
        uvicorn.run(app, host="0.0.0.0", port=port)
    except Exception as e:
        logger.error(f"Failed to start server: {str(e)}")
        raise
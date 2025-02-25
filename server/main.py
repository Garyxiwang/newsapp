from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from langchain.llms.base import LLM
from langchain.agents import initialize_agent, AgentType
from langchain.tools import Tool
from langchain.memory import ConversationBufferMemory
import os
import logging
from openai import OpenAI
from dotenv import load_dotenv

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# 加载环境变量
load_dotenv()

class DeepseekLLM(LLM):
    api_key: str = Field(...)  # 使用Field(...)表示必需字段
    client: Optional[OpenAI] = None

    class Config:
        arbitrary_types_allowed = True

    def __init__(self, **kwargs: Any):
        super().__init__(**kwargs)
        self.client = OpenAI(
            api_key=self.api_key,
            base_url="https://api.deepseek.com"
        )
    
    def _call(self, prompt: str, **kwargs: Any) -> str:
        try:
            logger.info(f"Sending request to Deepseek API with prompt: {prompt[:50]}...")
            response = self.client.chat.completions.create(
                model="deepseek-chat",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant"},
                    {"role": "user", "content": prompt}
                ],
                temperature=kwargs.get("temperature", 0.7),
                stream=False
            )
            logger.info("Received response from Deepseek API")
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Error calling Deepseek API: {str(e)}")
            raise Exception(f"Error calling Deepseek API: {str(e)}")

    @property
    def _llm_type(self) -> str:
        return "deepseek"

    @property
    def _identifying_params(self) -> Dict[str, Any]:
        """Get the identifying parameters."""
        return {"model": "deepseek-chat"}

app = FastAPI()

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 定义请求模型
class ChatMessage(BaseModel):
    text: str
    isDeepThinking: bool
    isWebSearching: bool

# 初始化LangChain组件
llm = DeepseekLLM(
    api_key=os.getenv("DEEPSEEK_API_KEY", "")
)
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

# 这里可以添加更多的tools
tools = []

# 初始化agent
agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
    verbose=True,
    memory=memory,
)

@app.post("/chat")
async def chat(message: ChatMessage):
    try:
        logger.info(f"Received chat message: {message.text[:50]}...")
        logger.info(f"Mode - Deep Thinking: {message.isDeepThinking}, Web Searching: {message.isWebSearching}")
        
        if message.isDeepThinking:
            logger.info("Using deep thinking mode")
            response = llm(message.text, temperature=0.9)
        elif message.isWebSearching:
            logger.info("Using web searching mode")
            response = agent.run(message.text)
        else:
            logger.info("Using normal chat mode")
            response = llm(message.text)
            
        logger.info(f"Sending response: {response[:50]}...")
        return {"response": response}
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    logger.info("Starting server...")
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 
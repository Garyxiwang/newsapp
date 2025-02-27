# 导入fastapi
from fastapi import FastAPI
# 模型
from langchain.chat_models import init_chat_model
# 输出解析器
from langchain_core.output_parsers import StrOutputParser
# 提示模板
from langchain_core.prompts import ChatPromptTemplate
# 加载.env文件中的环境变量
from langserve import add_routes
# 加载.env文件中的环境变量
import os
# 获取密码
import getpass
# 加载.env文件中的环境变量
from dotenv import load_dotenv

# 加载.env文件中的环境变量
print("Loading environment variables from .env file...")
load_dotenv()

# 初始化模型
print("Initializing DeepSeek model...")
model = init_chat_model("deepseek-chat", model_provider="deepseek")

# 提示模板
system_template = "Translate the following into {language}:"
prompt_template = ChatPromptTemplate.from_messages(
    [("system", system_template), ("user", "{text}")]
)

# 输出解析器
parser = StrOutputParser()

# 4. Create chain
chain = prompt_template | model | parser
# 4. App definition
app = FastAPI(
    title="LangChain Server",
    version="1.0",
    description="A simple API server using LangChain's Runnable interfaces",
)
# 5. Adding chain route
add_routes(
    app,
    chain,
    path="/chain",
)
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)

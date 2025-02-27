# 消息
from langchain_core.messages import HumanMessage, SystemMessage
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

# 检查并设置必要的环境变量
if not os.environ.get("LANGSMITH_TRACING"):
    os.environ["LANGSMITH_TRACING"] = "true"

if not os.environ.get("LANGSMITH_API_KEY"):
    os.environ["LANGSMITH_API_KEY"] = getpass.getpass(
        "Enter LANGSMITH API key: ")

# 检查 DeepSeek API 密钥
if not os.environ.get("DEEPSEEK_API_KEY"):
    os.environ["DEEPSEEK_API_KEY"] = getpass.getpass(
        "Enter API key for DeepSeek: ")

# 初始化模型
print("Initializing DeepSeek model...")
model = init_chat_model("deepseek-chat", model_provider="deepseek")

# 输出解析器
parser = StrOutputParser()

# 提示模板
system_template = "Translate the following into {language}:"
prompt_template = ChatPromptTemplate.from_messages(
    [("system", system_template), ("user", "{text}")]
)
# 创建消息
messages = [
    SystemMessage(content="把下面的句子中文翻译英语"),
    HumanMessage(content="中国大模型全世界第一!"),
]

# 5. Adding chain route
add_routes(
    app,
    chain,
    path="/chain",
)
# 调用模型并打印结果
print("Calling DeepSeek model...")
result = model.invoke(messages)
parser.invoke(result)
chain = prompt_template | model | parser
chain = chain.invoke({"language": "english", "text": "中国大模型全世界第一!"})
print("\nTranslation result:")
print(result.content)

# 消息
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
#
from langchain_core.chat_history import (
    BaseChatMessageHistory,
    InMemoryChatMessageHistory,
)
from langchain_core.runnables.history import RunnableWithMessageHistory

# 模型
from langchain.chat_models import init_chat_model
# 输出解析器
from langchain_core.output_parsers import StrOutputParser
# 提示模板
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

# 加载.env文件中的环境变量
from dotenv import load_dotenv

# 加载.env文件中的环境变量
print("Loading environment variables from .env file...")
load_dotenv()

# 初始化模型
print("Initializing DeepSeek model...")
model = init_chat_model("deepseek-chat", model_provider="deepseek")

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a helpful assistant. Answer all questions to the best of your ability in {language}.",
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]
)
# 创建链
chain = prompt | model

store = {}


def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]


with_message_history = RunnableWithMessageHistory(
    chain, get_session_history, input_messages_key="messages",)

config = {"configurable": {"session_id": "abc2"}}

print("Hi! I'm Bob")
result = with_message_history.invoke(
    {"messages": [HumanMessage(content="hi! I'm todd. tell me a joke")], "language": "chinese"}, config=config
)
print("\n result:", result.content)
# for r in with_message_history.stream(
#     {
#         "messages": [HumanMessage(content="hi! I'm todd. tell me a joke")],
#         "language": "chinese",
#     },
#     config=config,
# ):
#     print("\n result:", r.content)

print("What's my name?")
result = with_message_history.invoke(
    {"messages": [HumanMessage(content="What's my name?")],
     "language": "chinese"},
    config=config,
)

print("\n result:", result.content)

import os

from langchain_community.document_loaders import TextLoader
from langchain_openai import AzureChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import CharacterTextSplitter
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_community.vectorstores import Chroma
loader = TextLoader("jobs.txt")
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=600, chunk_overlap=0)
docs = text_splitter.split_documents(documents)
os.environ["OPENAI_API_KEY"] = "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"
embeddings_model = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(docs, embeddings_model)
retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 4})
os.environ["AZURE_OPENAI_API_KEY"] = "18bbaa1334e948068f3da34f913a12c6"
os.environ["AZURE_OPENAI_ENDPOINT"] = "https://openainewdata.openai.azure.com/"
llm = AzureChatOpenAI(
    openai_api_version="2024-02-15-preview",
    azure_deployment="assist"
)
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

input = input("Enter your question: ")
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI assistant that helps people find information about the job market. Be as concise as possible, it's very important. If someone asks information unrelated to jobs reply \"SALSA\". The list of available jobs is " + format_docs(docs)),
    ("user", "{prompt}"),
])
rag_chain = (
     prompt
    | llm
    | StrOutputParser()
)
print (rag_chain.invoke({"prompt": input}))
#print(rag_chain.invoke({"input": "Describe the job of a software engineer", "context": format_docs(docs)}))
#output_parser = StrOutputParser()
#chain = prompt | llm | output_parser
#print(chain.invoke({"input": "how can langsmith help with testing?"}))






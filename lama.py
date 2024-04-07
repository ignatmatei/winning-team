import sys
from llama_index.core import VectorStoreIndex
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.embeddings.openai import OpenAIEmbedding
from pinecone.grpc import PineconeGRPC
from llama_index.vector_stores.pinecone import PineconeVectorStore
import os

os.environ["OPENAI_API_KEY"] = "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"
string_argument = sys.argv[1]
pc = PineconeGRPC(api_key="99df26e7-8d54-4ce7-ad97-5a370ba9b6c7")
index_name = "test"
pinecone_index = pc.Index(index_name)
vector_store = PineconeVectorStore(pinecone_index=pinecone_index)
embed_model = OpenAIEmbedding(model="text-embedding-3-large",api_key="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")
vector_index = VectorStoreIndex.from_vector_store(vector_store=vector_store)
retriever = VectorIndexRetriever(index=vector_index, similarity_top_k=5, embed_model=embed_model)

query_engine = RetrieverQueryEngine(retriever=retriever)

llm_query = query_engine.query(string_argument)
print(llm_query.response)
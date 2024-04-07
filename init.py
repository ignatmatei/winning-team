from llama_index.core import SimpleDirectoryReader
from llama_index.embeddings.openai import OpenAIEmbedding
from pathlib import Path
from llama_index.core.ingestion import IngestionPipeline
from llama_index.core.node_parser import SemanticSplitterNodeParser
from pinecone.grpc import PineconeGRPC
from llama_index.vector_stores.pinecone import PineconeVectorStore
import os

reader = SimpleDirectoryReader(
    input_files=["./data/jobs.txt"]
)

docs = reader.load_data()

embed_model = OpenAIEmbedding(model="text-embedding-3-large",api_key="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")

pc = PineconeGRPC(api_key="99df26e7-8d54-4ce7-ad97-5a370ba9b6c7")
index_name = "test"
pinecone_index = pc.Index(index_name)
vector_store = PineconeVectorStore(pinecone_index=pinecone_index)

pipeline = IngestionPipeline(
    transformations=[
        SemanticSplitterNodeParser(
            buffer_size=1,
            breakpoint_percentile_threshold=95, 
            embed_model=embed_model,
            ),
        embed_model,
        ],
        vector_store=vector_store
    )

pipeline.run(documents=docs)
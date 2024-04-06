#Note: The openai-python library support for Azure OpenAI is in preview.

      #Note: This code sample requires OpenAI Python library version 1.0.0 or higher.

import os

from openai import AzureOpenAI



client = AzureOpenAI(

  azure_endpoint = "https://openainewdata.openai.azure.com/", 

  api_key="18bbaa1334e948068f3da34f913a12c6",  

  api_version="2024-02-15-preview"

)
jobs = open("jobs.txt", "r")
jobs = jobs.read()
message_text = [{"role":"system","content":"You are an AI assistant that helps people find information about the job market. Be as concise as possible. If someone asks information unrelated to jobs reply \"SALSA\". The list of available jobs is " + jobs}]
first_message = [{"role":"user", "content": "Can you provide me with a job description for a software engineer?"}]
#append the first message to the message_text list
message_text.append(first_message[0])
completion = client.chat.completions.create(

  model="assist", # model = "deployment_name"

  messages = message_text,

  temperature=0.7,

  max_tokens=800,

  top_p=0.95,

  frequency_penalty=0,

  presence_penalty=0,

  stop=None

)
response = completion.choices[0]
print(response.message.content)

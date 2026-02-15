
from django.shortcuts import render,HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
import requests
from dotenv import load_dotenv
# Create your views here.
def index(request):
    return render(request,"pages/index.html")

@csrf_exempt
def chat(request):
    load_dotenv()
    data = json.loads(request.body)
    prompt = data.get("prompt")
    API_URL = "https://router.huggingface.co/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {os.environ['HF_TOKEN']}",
    }

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    response = query({
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "model": "deepseek-ai/DeepSeek-V3-0324"
    })

    # print(response["choices"][0]["message"])
    print(response)
    answer = response["choices"][0]["message"]["content"]
    return HttpResponse(answer)
























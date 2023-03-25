
import base64
import os
import requests
import contextlib
from PIL import Image
from typing import Tuple
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import CLIPProcessor, CLIPModel

from templates.best_bin_request import BestBinRequest

def load_model() -> Tuple[CLIPModel, CLIPProcessor]:
    if (os.path.exists("models/openai-clip/model") and os.path.exists("models/openai-clip/processor")):
        # load model from disk
        model = CLIPModel.from_pretrained("models/openai-clip/model")
        processor = CLIPProcessor.from_pretrained("models/openai-clip/processor")
    else:
        # load model from Hugging Face
        model_name: str = "openai/clip-vit-base-patch32"
        model= CLIPModel.from_pretrained(model_name)
        processor = CLIPProcessor.from_pretrained(model_name)
        
        # save model to disk for use in other files
        model.save_pretrained("models/openai-clip/model")
        processor.save_pretrained("models/openai-clip/processor")
    return model, processor

@contextlib.asynccontextmanager
async def lifespan(app: FastAPI) -> None:
    app.state.model, app.state.processor = load_model()
    yield
    
app = FastAPI(title="BinGo", description="BinGo is a tool to identify the correct bin that your trash goes into.", version="0.1.0", lifespan=lifespan)

origins = [
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
        

@app.get("/")
async def read_root():
    if (app.state.model is None or app.state.processor is None):
        return {"suspicious_ai": "Model not loaded"}
    return {"suspicious_ai": "This api allows you to check for suspicious activity within a image or video."}


@app.post("/best_bin")
async def best_bin(request: BestBinRequest) -> dict:
    model, processor = app.state.model, app.state.processor
    temp_image_path: str = "images/temp.jpg"
    with open(temp_image_path, "wb") as f:
        f.write(base64.b64decode(request.image_base64.encode()))
        image = Image.open(temp_image_path)
        f.close()

    print(image)
    inputs = processor(text=request.bin_names, images=image, return_tensors="pt", padding=True)
    outputs = model(**inputs)
    probabilities = outputs.logits_per_image.softmax(dim=1)
    return {"probs": probabilities.tolist()}



if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=5000, log_level="info")
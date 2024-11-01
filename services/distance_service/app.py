from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"Title": "Hello World", "Description": "This is the distance service!!"}


from fastapi import APIRouter
import logging

router = APIRouter()

@router.get("courses/search")
async def search(query: str):
    pass
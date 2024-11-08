import time
import asyncio

import httpx


async def client_get(client, url, retries=3, timeout=30):
    
    for att in range(retries):
        try:
            res = await client.get(url, timeout=timeout)
            res.raise_for_status()
            return res
        except (httpx.RequestError, httpx.HTTPStatusError) as e:
            print(f"Failed Attempt {att+1} - {url} - {e}")
            if att+1 == retries:
                raise
            await asyncio.sleep(2 ** att)

async def single_get(url):
    async with httpx.AsyncClient() as client:
        return await client_get(client, url)


def log(start, msg):
    print(f"[{time.time()-start:5.2f}] {msg}")
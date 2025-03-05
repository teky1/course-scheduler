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
            await asyncio.sleep(3 ** att)

async def single_get(url):
    async with httpx.AsyncClient() as client:
        return await client_get(client, url)

async def multi_get(url_list, concurrent=25):
    async with httpx.AsyncClient() as client:
        out_list = []
        for i in range(0, len(url_list), concurrent):
            res = await asyncio.gather(*(client_get(client, url) for url in url_list[i:i+concurrent]))
            out_list += res

            await asyncio.sleep(1)

        return out_list



def log(start, msg):
    print(f"[{time.time()-start:7.2f}] {msg}", flush=True)
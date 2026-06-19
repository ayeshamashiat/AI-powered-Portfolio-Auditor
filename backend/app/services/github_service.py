import httpx


async def get_user_repos(username: str):
    url = f"https://api.github.com/users/{username}/repos"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        return response.json()
    
async def has_readme(owner: str, repo: str):
    url = f"https://api.github.com/repos/{owner}/{repo}/readme"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.status_code == 200

async def has_license(owner: str, repo: str):
    url = f"https://api.github.com/repos/{owner}/{repo}/license"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.status_code == 200

async def has_description(owner: str, repo: str):
    url = f"https://api.github.com/repos/{owner}/{repo}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        repo_info = response.json()
        description = repo_info.get("description")
        return description is not None

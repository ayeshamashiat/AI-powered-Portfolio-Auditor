import httpx
from dotenv import load_dotenv
import os

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
HEADERS = {
    "Authorization": f"Bearer {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json"
}

GITHUB_API_BASE = "https://api.github.com"

async def github_get(url: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            url,
            headers=HEADERS,
            timeout=10
        )

        response.raise_for_status()

        return response

async def get_user_repos(username: str):
    url = f"{GITHUB_API_BASE}/users/{username}/repos"

    try:
        async with httpx.AsyncClient() as client:
            response = await github_get(url)

            if response.status_code == 404:
                raise ValueError(f"GitHub user '{username}' not found")

            response.raise_for_status()

            return response.json()

    except httpx.HTTPError as e:
        raise Exception(f"GitHub API error: {str(e)}")


async def has_readme(owner: str, repo: str):
    url = f"{GITHUB_API_BASE}/repos/{owner}/{repo}/readme"

    try:
        response = await github_get(url)
        return response.status_code == 200

    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            return False

        raise Exception(f"Error checking README: {str(e)}")



async def get_topics(owner: str, repo: str):
    url = f"{GITHUB_API_BASE}/repos/{owner}/{repo}/topics"

    try:
        response = await github_get(url)

        data = response.json()

        print(data)

        return data.get("names", [])

    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            return []

        raise Exception(f"Error fetching topics: {str(e)}")
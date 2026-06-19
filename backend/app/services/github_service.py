import httpx

GITHUB_API_BASE = "https://api.github.com"


async def get_user_repos(username: str):
    url = f"{GITHUB_API_BASE}/users/{username}/repos"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)

            if response.status_code == 404:
                raise ValueError(f"GitHub user '{username}' not found")

            response.raise_for_status()

            return response.json()

    except httpx.HTTPError as e:
        raise Exception(f"GitHub API error: {str(e)}")


async def has_readme(owner: str, repo: str):
    url = f"{GITHUB_API_BASE}/repos/{owner}/{repo}/readme"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)

            if response.status_code == 404:
                return False

            response.raise_for_status()

            return True

    except httpx.HTTPError as e:
        raise Exception(f"Error checking README: {str(e)}")


async def has_license(owner: str, repo: str):
    url = f"{GITHUB_API_BASE}/repos/{owner}/{repo}/license"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)

            if response.status_code == 404:
                return False

            response.raise_for_status()

            return True

    except httpx.HTTPError as e:
        raise Exception(f"Error checking license: {str(e)}")


async def get_topics(owner: str, repo: str):
    url = f"{GITHUB_API_BASE}/repos/{owner}/{repo}/topics"

    headers = {
        "Accept": "application/vnd.github+json"
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers)

            if response.status_code == 404:
                return []

            response.raise_for_status()

            data = response.json()

            return data.get("names", [])

    except httpx.HTTPError as e:
        raise Exception(f"Error fetching topics: {str(e)}")
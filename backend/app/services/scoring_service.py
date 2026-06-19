from services.github_service import (
    has_readme,
    has_license,
    get_topics
)


async def calculate_repo_score(repo):
    score = 0
    issues = []

    repo_name = repo.get("name")

    if not repo_name:
        raise ValueError("Repository name missing")

    owner = repo.get("owner", {}).get("login")

    if not owner:
        raise ValueError("Repository owner missing")

    # README
    readme_exists = await has_readme(owner, repo_name)

    if readme_exists:
        score += 20
    else:
        issues.append("Missing README")

    # Description
    if repo.get("description"):
        score += 10
    else:
        issues.append("Missing Description")

    # License
    license_exists = await has_license(owner, repo_name)

    if license_exists:
        score += 10
    else:
        issues.append("Missing License")

    # Topics
    topics = await get_topics(owner, repo_name)

    if topics:
        score += 10
    else:
        issues.append("No Topics")

    return {
        "score": score,
        "issues": issues
    }
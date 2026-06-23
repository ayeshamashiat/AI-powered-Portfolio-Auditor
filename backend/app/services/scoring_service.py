from app.services.github_service import (
    has_readme,
    get_topics
)

from datetime import datetime, timezone
import asyncio


async def calculate_repo_score(repo):
    score = 0
    issues = []

    repo_name = repo.get("name")

    if not repo_name:
        raise ValueError("Repository name missing")

    owner = repo.get("owner", {}).get("login")

    if not owner:
        raise ValueError("Repository owner missing")

    # Run GitHub checks concurrently
    readme_exists, topics = await asyncio.gather(
        has_readme(owner, repo_name),
        get_topics(owner, repo_name)
    )

    # README (30 points)
    if readme_exists:
        score += 30
    else:
        issues.append("Missing README")

    # Description (20 points)
    if repo.get("description"):
        score += 20
    else:
        issues.append("Missing Description")

    # License (20 points)
    if repo.get("license") is not None:
        score += 20
    else:
        issues.append("Missing License")

    # Topics (10 points)
    if topics:
        score += 10
    else:
        issues.append("No Topics")

    # Activity (20 points)
    updated_at = repo.get("updated_at")

    if updated_at:
        last_update = datetime.fromisoformat(
            updated_at.replace("Z", "+00:00")
        )

        days_since_update = (
            datetime.now(timezone.utc) - last_update
        ).days

        if days_since_update <= 365:
            score += 20
        else:
            issues.append("Repository inactive (>1 year)")
    else:
        issues.append("Unknown activity status")

    return {
        "score": score,
        "issues": issues
    }
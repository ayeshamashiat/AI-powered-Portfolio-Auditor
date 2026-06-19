from fastapi import APIRouter, HTTPException
import httpx

from services.github_service import get_user_repos
from services.scoring_service import calculate_repo_score

router = APIRouter()


@router.post("/audit/github")
async def audit_github(username: str):
    try:
        repos = await get_user_repos(username)

        if not repos:
            raise HTTPException(
                status_code=404,
                detail="No repositories found"
            )

        audit_results = []
        total_score = 0

        for repo in repos:
            result = await calculate_repo_score(repo)

            total_score += result["score"]

            audit_results.append({
                "repo_name": repo.get("name"),
                "score": result["score"],
                "issues": result["issues"]
            })

        portfolio_score = round(
            total_score / len(repos),
            2
        )

        return {
            "username": username,
            "repo_count": len(repos),
            "portfolio_score": portfolio_score,
            "audit_results": audit_results
        }

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except httpx.HTTPError as e:
        raise HTTPException(
            status_code=500,
            detail=f"GitHub API Error: {str(e)}"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
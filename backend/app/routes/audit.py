from fastapi import APIRouter, FastAPI, HTTPException
import httpx
import os
from dotenv import load_dotenv
from services.github_service import get_user_repos
from services.scoring_service import calculate_repo_score

router = APIRouter()

@router.post("/audit/github")
async def audit_github(username: str):
    try:
        repos = await get_user_repos(username)
        if not repos:
            raise HTTPException(status_code=404, detail="No repositories found for this user")
        
        audit_results = []
        for repo in repos:
            score = await calculate_repo_score(repo)
            audit_results.append({
                "repo_name": repo.get("name"),
                "score": score
            })
        
        return {"username": username, "audit_results": audit_results}
    
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
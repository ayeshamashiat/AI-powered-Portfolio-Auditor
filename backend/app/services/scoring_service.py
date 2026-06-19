from fastapi import HTTPException


def calculate_repo_score(repo):
    repo_name = repo.get("name")
    score = 0
    if not repo_name:
        raise HTTPException(status_code=400, detail="Repository name is missing")
    if repo.get("readme"):
        score += 20
    if repo.get("description"):
        score += 10
    if repo.get("license"):
        score += 10
    if repo.get("topics"):
        score += 10
    
    return score
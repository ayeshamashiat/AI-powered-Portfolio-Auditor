export interface RepoAuditResult {
  repo_name: string;
  score: number;
  issues: string[];
}

export interface PortfolioAuditResponse {
  username: string;
  portfolio_score: number;
  repo_count: number;
  audit_results: RepoAuditResult[];
}

import { PortfolioAuditResponse } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function auditGithub(username: string): Promise<PortfolioAuditResponse> {
  const url = `${API_BASE_URL}/audit/github?username=${encodeURIComponent(username)}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData?.detail) {
        errorMessage = errorData.detail;
      }
    } catch {
      // JSON parsing failed, keep default message
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

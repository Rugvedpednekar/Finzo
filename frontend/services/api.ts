import { API_URL } from "@/constants/config";
import type { AuthResponse, Backtest, CompareResult, Dashboard, Report, SentimentResult, StrategyType } from "@/types";

const TOKEN_KEY = "finzo.auth.token";
let memoryToken: string | null = null;

type BacktestPayload = {
  symbol: string;
  strategy_type: StrategyType;
  starting_capital: number;
  start_date: string;
  end_date: string;
};

type AuthPayload = {
  email: string;
  password: string;
};

type RegisterPayload = AuthPayload & {
  name: string;
};

function getStorage() {
  if (typeof globalThis !== "undefined" && "localStorage" in globalThis) {
    return globalThis.localStorage;
  }
  return null;
}

export const tokenStore = {
  get(): string | null {
    const storage = getStorage();
    return storage?.getItem(TOKEN_KEY) || memoryToken;
  },
  set(token: string) {
    memoryToken = token;
    getStorage()?.setItem(TOKEN_KEY, token);
  },
  clear() {
    memoryToken = null;
    getStorage()?.removeItem(TOKEN_KEY);
  }
};

async function request<T>(path: string, options?: RequestInit & { auth?: boolean }): Promise<T> {
  const token = tokenStore.get();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string> | undefined)
  };
  if (token && options?.auth !== false) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    tokenStore.clear();
    throw new Error("Your session expired. Please log in again.");
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

async function authRequest(path: string, payload: AuthPayload | RegisterPayload): Promise<AuthResponse> {
  const response = await request<AuthResponse>(path, {
    method: "POST",
    body: JSON.stringify(payload),
    auth: false
  });
  tokenStore.set(response.access_token);
  return response;
}

export const api = {
  login: (payload: AuthPayload) => authRequest("/auth/login", payload),
  register: (payload: RegisterPayload) => authRequest("/auth/register", payload),
  me: () => request<AuthResponse>("/auth/me"),
  logout: () => tokenStore.clear(),
  dashboard: () => request<Dashboard>("/dashboard"),
  runBacktest: (payload: BacktestPayload) =>
    request<Backtest>("/backtests/run", { method: "POST", body: JSON.stringify(payload) }),
  backtests: () => request<Backtest[]>("/backtests"),
  analyzeSentiment: (text: string) =>
    request<SentimentResult>("/sentiment/analyze", { method: "POST", body: JSON.stringify({ text }) }),
  compare: (payload: BacktestPayload & { sentiment_text: string }) =>
    request<CompareResult>("/compare", { method: "POST", body: JSON.stringify(payload) }),
  reports: () => request<Report[]>("/reports")
};

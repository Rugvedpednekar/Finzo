# Finzo Demo Script

1. Open the landing page and point out the educational-only disclaimer.
2. Go to Dashboard to show seeded metrics: total backtests, best return, average win rate, and recent strategy.
3. Open Run Backtest, enter a symbol such as `AAPL`, choose `SMA crossover`, set capital to `10000`, and run the simulation.
4. Explain that historical candles come from Yahoo Finance through the backend, with mock fallback data for offline demos.
5. Review total return, final portfolio value, win rate, max drawdown, Sharpe ratio, and simulated trades.
6. Open Sentiment Analyzer, paste a sentence such as `Revenue increased and profit hit a record after strong growth`, then run the analysis.
7. Open Compare Results to compare a technical-only strategy with a sentiment-adjusted strategy.
8. Open Saved Reports to show generated summaries from previous backtests.
9. Mention `GET /market/quote/AAPL` for backend-only Finnhub quote support.
10. Close by explaining that no real brokerage or trading execution is connected.

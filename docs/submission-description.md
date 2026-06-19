# Finzo Submission Description

Finzo is an AI-powered paper-trading and backtesting sandbox for educational strategy testing. Users can run technical strategies, paste market news for rule-based sentiment analysis, compare technical-only and sentiment-adjusted outcomes, and review generated reports.

The MVP includes an Expo React Native frontend for web, Android, and iOS, plus a FastAPI backend with SQLAlchemy models compatible with Amazon Aurora PostgreSQL. Historical backtesting uses Yahoo Finance through `yfinance` with mock fallback data, while live quotes use Finnhub with the API key kept safely on the backend.

Core features:

- SMA crossover, RSI, and MACD paper backtests
- Simulated trades and portfolio metrics
- Rule-based financial sentiment analyzer
- Technical-only versus sentiment-adjusted comparison
- Saved reports and seeded sample data
- Clear educational paper-trading disclaimer

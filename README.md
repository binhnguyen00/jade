<h1 align="center"> Project Jade </h1>

## 1. What is this?
- This is a client for many AI models (OpenAI, DeepSeek, Claude, Gemini, ...).
- Completely free APIs, Unlimited - no catches ✌🏾.

## 2. Tech Stack
- React
- Vite
- TypeScript
- Python
- MongoDB

## 3. Inspired by [OpenRouter](https://openrouter.ai/)
- Provides free APIs for many AI models.
- **[👉🏾 Documentation inspiration](https://openrouter.ai/docs/)**
- **[👉🏾 Free AI Models](https://openrouter.ai/models)**

## 4. Setup and Run
### 4.1 Client
```bash
cd ./jade/ui

./ui.sh install
./ui.sh build
./ui.sh run -server
```

### 4.2 Server
#### Setup MongoDB Env
```bash
# edit variables in ./env.sh
cd ./jade/server/runtime/jade
cp ./env.sh.example ./env.sh
```
#### Setup Flask
```bash
cd ./jade/server/runtime/jade
./flask.sh venv --create
./flask.sh venv --install
```
#### Start MongoDB service
```bash
cd ./jade/server/runtime/jade
mongodb.sh run --dev/--prod
```
#### Start Flask service
```bash
cd ./jade/server/runtime/jade
flask.sh run
# or flask.sh debug
```

## 5. Author - Binh Nguyen
- **[Github](https://github.com/binhnguyen00)**
- **[Gmail](mailto:jackjack2000.kahp@gmail.com)**

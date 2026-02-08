#!/bin/bash

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   启动前后端服务${NC}"
echo -e "${GREEN}========================================${NC}"

# 检查并创建日志目录
LOG_DIR="./logs"
mkdir -p "$LOG_DIR"

# 后端启动函数
start_backend() {
    echo -e "\n${YELLOW}[后端]${NC} 正在启动后端服务..."
    cd backend

    # 检查虚拟环境是否存在
    if [ ! -d ".venv" ]; then
        echo -e "${YELLOW}[后端]${NC} 未找到虚拟环境，正在创建..."
        python3 -m venv .venv
        source .venv/bin/activate
        pip install -r requirements.txt
    else
        source .venv/bin/activate
    fi

    # 启动 FastAPI 服务
    echo -e "${GREEN}[后端]${NC} 后端服务启动在 http://localhost:8000"
    uvicorn main:app --reload --host 0.0.0.0 --port 8000 > "../$LOG_DIR/backend.log" 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID > "../$LOG_DIR/backend.pid"
    cd ..
}

# 前端启动函数
start_frontend() {
    echo -e "\n${YELLOW}[前端]${NC} 正在启动前端服务..."
    cd frontend

    # 检查 node_modules 是否存在
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}[前端]${NC} 未找到依赖，正在安装..."
        npm install
    fi

    # 启动 Vite 开发服务器
    echo -e "${GREEN}[前端]${NC} 前端服务启动中..."
    npm run dev > "../$LOG_DIR/frontend.log" 2>&1 &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > "../$LOG_DIR/frontend.pid"
    cd ..
}

# 清理函数
cleanup() {
    echo -e "\n${RED}正在关闭服务...${NC}"

    if [ -f "$LOG_DIR/backend.pid" ]; then
        BACKEND_PID=$(cat "$LOG_DIR/backend.pid")
        kill $BACKEND_PID 2>/dev/null
        rm "$LOG_DIR/backend.pid"
        echo -e "${GREEN}[后端]${NC} 后端服务已停止"
    fi

    if [ -f "$LOG_DIR/frontend.pid" ]; then
        FRONTEND_PID=$(cat "$LOG_DIR/frontend.pid")
        kill $FRONTEND_PID 2>/dev/null
        rm "$LOG_DIR/frontend.pid"
        echo -e "${GREEN}[前端]${NC} 前端服务已停止"
    fi

    exit 0
}

# 捕获 Ctrl+C 信号
trap cleanup SIGINT SIGTERM

# 启动服务
start_backend
sleep 2
start_frontend

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}   服务启动成功！${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${YELLOW}后端地址:${NC} http://localhost:8000"
echo -e "${YELLOW}前端地址:${NC} http://localhost:5173 或 http://localhost:5174"
echo -e "${YELLOW}后端日志:${NC} tail -f $LOG_DIR/backend.log"
echo -e "${YELLOW}前端日志:${NC} tail -f $LOG_DIR/frontend.log"
echo -e "\n${RED}按 Ctrl+C 停止所有服务${NC}\n"

# 保持脚本运行并显示日志
tail -f "$LOG_DIR/backend.log" "$LOG_DIR/frontend.log"

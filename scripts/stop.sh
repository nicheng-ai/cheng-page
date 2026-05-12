#!/bin/bash

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

LOG_DIR="./logs"

echo -e "${RED}正在停止所有服务...${NC}\n"

# 停止后端
if [ -f "$LOG_DIR/backend.pid" ]; then
    BACKEND_PID=$(cat "$LOG_DIR/backend.pid")
    if kill -0 $BACKEND_PID 2>/dev/null; then
        kill $BACKEND_PID
        echo -e "${GREEN}✓${NC} 后端服务已停止 (PID: $BACKEND_PID)"
    else
        echo -e "${RED}✗${NC} 后端服务未运行"
    fi
    rm "$LOG_DIR/backend.pid"
else
    echo -e "${RED}✗${NC} 未找到后端 PID 文件"
fi

# 停止前端
if [ -f "$LOG_DIR/frontend.pid" ]; then
    FRONTEND_PID=$(cat "$LOG_DIR/frontend.pid")
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        kill $FRONTEND_PID
        echo -e "${GREEN}✓${NC} 前端服务已停止 (PID: $FRONTEND_PID)"
    else
        echo -e "${RED}✗${NC} 前端服务未运行"
    fi
    rm "$LOG_DIR/frontend.pid"
else
    echo -e "${RED}✗${NC} 未找到前端 PID 文件"
fi

# 额外清理：查找并停止可能遗留的进程
echo -e "\n${GREEN}检查遗留进程...${NC}"
pkill -f "uvicorn main:app" 2>/dev/null && echo -e "${GREEN}✓${NC} 清理了遗留的 uvicorn 进程"
pkill -f "vite" 2>/dev/null && echo -e "${GREEN}✓${NC} 清理了遗留的 vite 进程"

echo -e "\n${GREEN}所有服务已停止${NC}"

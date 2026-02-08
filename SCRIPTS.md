# 启动脚本使用说明

本项目提供了方便的启动和停止脚本，用于同时管理前后端服务。

## 快速开始

### 启动所有服务
```bash
./start.sh
```

这个脚本会：
- 启动后端服务 (FastAPI) 在 `http://localhost:8000`
- 启动前端服务 (Vite) 在 `http://localhost:5173` 或 `http://localhost:5174`
- 自动检查并安装缺失的依赖
- 创建日志文件在 `./logs/` 目录

### 停止所有服务
```bash
./stop.sh
```

或者在运行 `start.sh` 的终端按 `Ctrl+C`

## 日志查看

启动后，脚本会自动显示日志。你也可以单独查看：

```bash
# 查看后端日志
tail -f logs/backend.log

# 查看前端日志
tail -f logs/frontend.log
```

## 服务地址

- **后端 API**: http://localhost:8000
- **后端文档**: http://localhost:8000/docs (Swagger UI)
- **前端页面**: http://localhost:5173 或 http://localhost:5174

## 手动启动（如果需要）

### 后端
```bash
cd backend
source .venv/bin/activate  # 激活虚拟环境
uvicorn main:app --reload --port 8000
```

### 前端
```bash
cd frontend
npm run dev
```

## 常见问题

1. **端口被占用**
   - 后端默认 8000 端口
   - 前端默认 5173 端口，如果被占用会自动尝试 5174

2. **依赖安装失败**
   - 后端：检查 Python 版本 (需要 3.8+)
   - 前端：检查 Node.js 版本 (需要 16+)

3. **虚拟环境问题**
   - 删除 `backend/.venv` 目录后重新运行 `start.sh`

## 项目结构
```
.
├── backend/          # FastAPI 后端
│   ├── app/
│   ├── main.py
│   └── requirements.txt
├── frontend/         # React + Vite 前端
│   ├── src/
│   └── package.json
├── logs/            # 日志文件目录
├── start.sh         # 启动脚本
└── stop.sh          # 停止脚本
```

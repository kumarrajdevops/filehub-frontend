# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

# 1. Create new Vite project with React + TypeScript template

```bash
npm create vite@latest filehub-frontend --template react-ts
```

# 2. Install dependencies

```bash
cd filehub-frontend
npm install
```

# 3. Install React Router and Axios

```bash
# Install React Router and Axios
npm install react-router-dom axios

# Install GitHub Pages as dev dependency
npm install gh-pages --save-dev
```

# 4. Start development server

```bash
npm run dev
```

# Difference Between npm run dev, build, and serve

| Command         | Purpose                                                    |
| --------------- | ---------------------------------------------------------- |
| npm run dev     | Starts a development server (fast refresh, local testing). |
| npm run build   | Compiles the project for production (creates dist/).       |
| npm run preview | Serves the built project (dist/) like a real deployment.   |

# Notes:

- There were some Node.js version compatibility warnings (project requires Node.js ^18.0.0 || ^20.0.0 || >=22.0.0)
- The development server runs on http://localhost:5173/
- The project uses:
  - React with TypeScript
  - SWC compiler
  - Vite as build tool
  - React Router for routing
  - Axios for HTTP requests
  - GitHub Pages for deployment

# Warning Resolution:

If you're seeing Node.js version warnings, consider:

- Upgrading Node.js to a compatible version (18.x, 20.x, or 22.x)
- Using a version manager like nvm to switch between Node.js versions

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

# Deployment Guide for FastAPI + PostgreSQL + React

## **Step 1: Setup and Deploy Frontend (React + Vite)**

### **1.1 Install Dependencies**

```bash
npm install
```

### **1.2 Configure API Base URL in **``

Modify the `base` property:

```ts
export default defineConfig({
  base: "/",
});
```

### **1.3 Update **``

```env
VITE_API_URL=https://filehub-backend.onrender.com
```

### **1.4 Build and Deploy**

```bash
npm run build
npm run deploy
```

---

## **Step 2: Setup Backend (FastAPI)**

### **2.1 Install Dependencies**

```bash
pip install fastapi uvicorn sqlalchemy asyncpg alembic pydantic
```

### **2.2 Create **``

```python
from fastapi import FastAPI
from routers import auth, blogs
from database import engine, Base

app = FastAPI()

app.include_router(auth.router)
app.include_router(blogs.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to FileHub"}
```

### **2.3 Create **``

```python
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql+asyncpg://myuser:mypassword@localhost:5432/mydatabase"

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

Base = declarative_base()

async def get_db():
    async with SessionLocal() as session:
        yield session
```

### **2.4 Start FastAPI Server**

```bash
uvicorn main:app --reload
```

---

## **Step 3: Setup PostgreSQL in Docker**

### **3.1 Run PostgreSQL Container**

```bash
docker run --name postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres
```

### **3.2 Check Running Containers**

```bash
docker ps
```

### **3.3 Connect to PostgreSQL**

```bash
docker exec -it postgres psql -U myuser -d mydatabase
```

### **3.4 Verify Database Connection**

```sql
\l  -- List all databases
\c mydatabase  -- Connect to the database
\dt  -- Show all tables
```

---

## **Step 4: Authentication System (OAuth2 + JWT)**

### **4.1 Install Authentication Dependencies**

```bash
pip install passlib bcrypt python-jose
```

### **4.2 Create **``** for JWT Token Generation**

```python
from datetime import datetime, timedelta
from jose import JWTError, jwt

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
```

---

## **Step 5: Database Migrations with Alembic**

### **5.1 Initialize Alembic**

```bash
alembic init alembic
```

### **5.2 Edit **``** to Configure Database URL**

```ini
sqlalchemy.url = postgresql+asyncpg://myuser:mypassword@localhost:5432/mydatabase
```

### **5.3 Generate Migration File**

```bash
alembic revision --autogenerate -m "Create users and blogs table"
```

### **5.4 Apply Migrations**

```bash
alembic upgrade head
```

---

## **Step 6: Deployment on Render**

### **6.1 Deploy FastAPI Backend**

- Add **Render service** → Choose **FastAPI**
- Set **Start Command**:
  ```bash
  gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
  ```
- Add **Environment Variables**:
  ```
  DATABASE_URL=postgresql+asyncpg://myuser:mypassword@mydb.render.com:5432/mydatabase
  ```

### **6.2 Deploy PostgreSQL on Render**

- Create a new **Render Database**
- Copy the database connection string.

---

## **Step 7: Security Best Practices**

### **7.1 Encrypt **``** Before Pushing to Git**

1. **Use **``** file** and add `.gitignore` entry:
   ```
   .env
   ```
2. **Store secrets securely in Render**:
   - Go to **Render Dashboard** → Settings → Environment Variables
   - Add `DATABASE_URL` as a **secret variable**.

---

## **Step 8: Running SQL Commands in PostgreSQL**

### **8.1 Connect to PostgreSQL**

```bash
docker exec -it postgres psql -U myuser -d mydatabase
```

### **8.2 Common SQL Commands**

```sql
\l  -- List all databases
\c mydatabase  -- Connect to database
\dt  -- Show all tables
SELECT * FROM users;  -- Query users table
```

---

## **Final Notes**

- **Alembic versioning should be pushed to Git**, so that migrations are version-controlled.
- **For local database connection to Render**, update `.env` with:
  ```env
  DATABASE_URL=postgresql+asyncpg://myuser:mypassword@mydb.render.com:5432/mydatabase
  ```
- **Run database migrations after deployment**:
  ```bash
  alembic upgrade head
  ```

This guide contains **all execution steps, commands, and code snippets** to ensure smooth deployment and troubleshooting. 🚀

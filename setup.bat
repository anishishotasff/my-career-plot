@echo off
echo 🚀 Setting up CareerPilot AI...

REM Backend setup
echo 📦 Installing backend dependencies...
cd backend
call npm install

REM Create .env file
if not exist .env (
  echo 📝 Creating backend .env file...
  copy .env.example .env
  echo ⚠️  Please add your OPENAI_API_KEY to backend\.env
)

cd ..

REM Frontend setup
echo 📦 Installing frontend dependencies...
cd frontend
call npm install

REM Create .env file
if not exist .env (
  echo 📝 Creating frontend .env file...
  copy .env.example .env
)

cd ..

echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Add your OpenAI API key to backend\.env
echo 2. Run 'npm run dev' in backend folder
echo 3. Run 'npm run dev' in frontend folder
echo 4. Open http://localhost:5173
pause

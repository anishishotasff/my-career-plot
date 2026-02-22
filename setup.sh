#!/bin/bash

echo "🚀 Setting up CareerPilot AI..."

# Backend setup
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Create .env file
if [ ! -f .env ]; then
  echo "📝 Creating backend .env file..."
  cp .env.example .env
  echo "⚠️  Please add your OPENAI_API_KEY to backend/.env"
fi

cd ..

# Frontend setup
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

# Create .env file
if [ ! -f .env ]; then
  echo "📝 Creating frontend .env file..."
  cp .env.example .env
fi

cd ..

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your OpenAI API key to backend/.env"
echo "2. Run 'npm run dev' in backend folder"
echo "3. Run 'npm run dev' in frontend folder"
echo "4. Open http://localhost:5173"

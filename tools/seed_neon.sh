#!/bin/bash

# Seed Neon Database Helper Script
# This script helps you seed your Neon PostgreSQL database

echo "🌱 CRM Arena - Neon Database Seeding Script"
echo "============================================"
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable is not set!"
    echo ""
    echo "Please set your Neon PostgreSQL connection string:"
    echo ""
    echo "Method 1: Export in terminal"
    echo '  export DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require"'
    echo ""
    echo "Method 2: Create a .env file in backend/ directory with:"
    echo "  DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require"
    echo ""
    exit 1
fi

echo "✅ DATABASE_URL is set"
echo "📊 Database: ${DATABASE_URL:0:50}..."
echo ""

# Navigate to backend directory
cd "$(dirname "$0")/../backend" || exit 1

echo "🔧 Installing dependencies..."
pip install -q -r requirements.txt

echo ""
echo "🌱 Running seed script..."
python ../tools/seed_neon.py

echo ""
echo "✨ Done!"

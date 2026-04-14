# 🌱 Quick Seed Guide

## Copy-Paste Instructions

1. **Get your Neon connection string** from https://console.neon.tech
   - Select your `crm-arena` project
   - Copy the **Pooled Connection** string

2. **Run these commands:**

```bash
# Set your Neon connection string (replace with your actual URL)
export DATABASE_URL="postgresql://neondb_owner:npg_xxxxx@ep-xxx.neon.tech/neondb?sslmode=require"

# Navigate to backend
cd backend

# Run seed script
python ../tools/seed_neon.py
```

## What You'll Get

✅ 10 sample leads  
✅ 10 sample contacts  
✅ 11 sample opportunities (across all pipeline stages)

## Expected Output

```
🌱 Starting Neon database seeding...
📊 Database URL: postgresql://neondb_owner:npg_xxxxx@ep-xxx...
✅ Database tables created/verified

🗑️  Clearing existing records...
   Cleared existing records.

📋 Inserting leads...
   ✅ Inserted 10 leads.

👥 Inserting contacts...
   ✅ Inserted 10 contacts.

💼 Inserting opportunities...
   ✅ Inserted 11 opportunities.

🎉 Database seeded successfully!

📊 Summary:
   • 10 leads
   • 10 contacts
   • 11 opportunities

✨ Your CRM is ready to use!
```

## Troubleshooting

**Problem:** "DATABASE_URL not set"  
**Fix:** Make sure you ran the `export DATABASE_URL=...` command

**Problem:** "Import could not be resolved"  
**Fix:** Make sure you're in the `backend/` directory

**Problem:** "No module named 'sqlmodel'"  
**Fix:** Run `pip install -r requirements.txt` first

---

For detailed instructions, see: `SEED_INSTRUCTIONS.md`

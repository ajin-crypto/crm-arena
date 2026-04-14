# 🌱 Seeding Your Neon Database

## Quick Start (Copy & Paste)

### 1. Set your Neon connection string:
```bash
export DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@YOUR_ENDPOINT.neon.tech/YOUR_DATABASE?sslmode=require"
```

Replace with your actual Neon connection string from: https://console.neon.tech

### 2. Run the seed script:
```bash
cd backend
python ../tools/seed_neon.py
```

## Alternative: Using the Shell Script

```bash
# Set your DATABASE_URL first (see above)
export DATABASE_URL="postgresql://..."

# Run the helper script
./tools/seed_neon.sh
```

## What Gets Seeded?

- **10 Leads** - Sample sales leads in various stages (NEW, CONTACTED, QUALIFIED, LOST)
- **10 Contacts** - Sample contact records with companies and engagement levels
- **11 Opportunities** - Sample deals across pipeline stages (Prospecting → Closed)

## Sample Data Overview

### Leads
- Jordan Donovan @ Vortex Dynamics (QUALIFIED)
- Sarah Jenkins @ Lumina Creative (NEW)
- Marcus Knight @ Zenith Global (CONTACTED)
- ... and 7 more

### Contacts
- Elena Rodriguez - Strategic Account Manager @ Global Dynamics Inc.
- Marcus Sterling - COO @ NorthStar Logistics
- Dr. Sarah Jenkins - VP of Innovation @ BioTech Solutions
- ... and 7 more

### Opportunities
- **Prospecting:** Cloud Platform Upgrade ($85K), Annual SaaS Contract ($120K)
- **Investigation:** ERP Integration Suite ($195K), Data Analytics Package ($78K)
- **Value Prop:** Security Audit ($230K), Global Rollout License ($420K)
- **Negotiation:** Enterprise Premium Tier ($182.5K), Custom API Gateway ($95K)
- **Closed:** Q3 Platform License ($245K), APAC Distribution ($72.5K), EMEA SaaS Renewal ($125K)

## Troubleshooting

### Error: "DATABASE_URL environment variable not set"
**Solution:** Make sure you exported the DATABASE_URL:
```bash
export DATABASE_URL="postgresql://..."
```

### Error: "Import could not be resolved"
**Solution:** Make sure you're running from the `backend/` directory:
```bash
cd backend
python ../tools/seed_neon.py
```

### Error: "No module named 'sqlmodel'"
**Solution:** Install dependencies:
```bash
cd backend
pip install -r requirements.txt
python ../tools/seed_neon.py
```

### Error: Connection timeout
**Solution:** 
1. Check your internet connection
2. Verify the Neon connection string is correct
3. Make sure `?sslmode=require` is included in the URL

## Verify Seeding Success

After running the script, you should see:
```
🎉 Database seeded successfully!

📊 Summary:
   • 10 leads
   • 10 contacts
   • 11 opportunities

✨ Your CRM is ready to use!
```

You can verify by:
1. Visiting your Railway API docs: `https://your-backend.railway.app/docs`
2. Testing the GET endpoints:
   - `GET /api/leads` - should return 10 leads
   - `GET /api/contacts` - should return 10 contacts
   - `GET /api/opportunities` - should return 11 opportunities

## Re-seeding

The script is safe to run multiple times. It will:
1. Clear existing data (DELETE all records)
2. Insert fresh seed data

⚠️ **Warning:** This will delete ALL existing data in your database!


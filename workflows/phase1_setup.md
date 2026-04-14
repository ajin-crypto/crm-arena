# Phase 1: Project Setup & Architecture

## Objective
Set up the foundational architecture for CRM Arena with React + Vite frontend, establish design system, and prepare for component extraction.

## Prerequisites
- Node.js 18+ installed
- Git initialized
- Design mockups reviewed
- Kinetic Blue design system documented

## Steps

### 1. Initialize Frontend (React + Vite)
**Tool:** Terminal commands
**Input:** None
**Output:** Working React application with Vite

```bash
cd frontend
npm create vite@latest . -- --template react
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Install Core Dependencies
**Required packages:**
- `react-router-dom` - Routing
- `axios` - API calls
- `@headlessui/react` - Accessible UI components
- `clsx` - Conditional classes
- `date-fns` - Date formatting

```bash
npm install react-router-dom axios @headlessui/react clsx date-fns
```

### 3. Configure Tailwind with Kinetic Blue Design System
**Tool:** File creation/editing
**Input:** Design tokens from `kinetic_blue/DESIGN.md`
**Output:** Custom tailwind.config.js with complete color palette

### 4. Create Directory Structure
```
frontend/src/
├── components/
│   ├── shared/          # Reusable UI components
│   ├── layout/          # Navigation, headers
│   ├── contacts/        # Contact-specific components
│   ├── dashboard/       # Dashboard components
│   ├── leads/           # Lead management components
│   ├── analytics/       # Analytics/reporting components
│   └── pipeline/        # Pipeline kanban components
├── pages/               # Page-level components
├── styles/              # Global styles
├── utils/               # Helper functions
├── hooks/               # Custom React hooks
├── services/            # API service layer
└── constants/           # Constants and configs
```

### 5. Set Up Backend Structure (Placeholder)
**Tool:** Directory creation
**Output:** Backend folder structure ready for API development

### 6. Create Design System CSS
**Tool:** CSS file with design tokens
**Output:** `kinetic-blue.css` with all custom properties

## Success Criteria
- ✅ React app runs on `localhost:5173`
- ✅ Tailwind configured with Kinetic Blue tokens
- ✅ Directory structure created
- ✅ All dependencies installed
- ✅ No console errors

## Next Steps
After completion:
- Proceed to Phase 2: Component Extraction
- Start with TopNavBar component
- Set up routing structure

## Notes
- Use ES6 modules throughout
- Follow Kinetic Blue "No-Line" design philosophy
- Maintain WAT framework separation (this workflow = instructions, tools = execution)
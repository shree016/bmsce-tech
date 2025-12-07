# ClassPulse

A minimal, professional web application for class CRs and lecturers to post quick questions and view student responses.

## Features

### 📝 Create Questions

- Quick question creation with customizable settings
- Choose between Yes/No or Short Answer format
- Target specific audiences (All Students or CR Only)
- Optional anonymous responses
- Optional name requirement
- Instant shareable link generation

### 👨‍🎓 Student Response

- Clean, intuitive interface for answering questions
- Large, easy-to-tap Yes/No buttons
- Short answer text input option
- Optional name field
- Success confirmation after submission

### 📊 Dashboard

- View all created questions
- Click to see detailed responses
- Response statistics at a glance
- Export responses to CSV
- Copy question links easily

## Tech Stack

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** components
- **Lucide React** icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating a Question

1. Navigate to the home page
2. Fill in the question form:
   - Enter your question text
   - Select question type (Yes/No or Short Answer)
   - Choose audience (All Students or CR Only)
   - Toggle anonymous responses if needed
   - Toggle name requirement if needed
3. Click "Create Question"
4. Copy the generated link and share with students

### Answering a Question

1. Open the shared question link (e.g., `/q/abc123`)
2. Read the question
3. For Yes/No: Click the appropriate button
4. For Short Answer: Type your response
5. Enter your name if required
6. Submit your response

### Viewing Responses

1. Click "Dashboard" in the navigation
2. See all your questions with response counts
3. Click on a question to view detailed responses
4. Export responses to CSV if needed
5. Copy question link to share again

## Project Structure

```
app/
├── page.tsx              # Home page - Create Question
├── q/[id]/page.tsx       # Student answer page
├── dashboard/page.tsx    # Dashboard with response table
├── layout.tsx            # Root layout with Toaster
└── globals.css           # Global styles

components/
└── ui/                   # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    ├── dialog.tsx
    ├── input.tsx
    ├── label.tsx
    ├── select.tsx
    ├── switch.tsx
    ├── table.tsx
    └── sonner.tsx

lib/
├── types.ts              # TypeScript interfaces
├── store.ts              # In-memory data store
└── utils.ts              # Utility functions
```

## Data Storage

This is a demo application that uses **in-memory storage**. All data is stored in the browser session and will be lost when the page is refreshed or the browser is closed.

For production use, you would need to:

- Implement a backend API
- Add a database (PostgreSQL, MongoDB, etc.)
- Add authentication
- Implement proper data persistence

## Design Features

- **Clean, minimal interface** with subtle gradients
- **Responsive layout** that works on mobile and desktop
- **Professional color scheme** with blue/purple accents
- **Smooth interactions** with hover effects and transitions
- **Toast notifications** for user feedback
- **Accessible components** from shadcn/ui
- **Type-safe** with TypeScript throughout

## Future Enhancements

- Backend API integration
- Database persistence
- User authentication
- Real-time response updates
- Question scheduling
- Response analytics and charts
- Question templates
- Bulk question creation
- Email/SMS notifications

## License

MIT

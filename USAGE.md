# ClassPulse - Quick Start Guide

## 🚀 Running the Application

The application is currently running at: **http://localhost:3000**

## 📖 How to Use

### For Teachers/CRs:

#### 1. Create a Question

1. Go to the home page (http://localhost:3000)
2. Fill out the form:
   - **Question**: Enter your question (e.g., "Have you completed registration?")
   - **Type**: Choose "Yes/No" or "Short Answer"
   - **Audience**: Select "All Students" or "CR Only"
   - **Anonymous**: Toggle on if you want anonymous responses
   - **Require Name**: Toggle on if name is mandatory
3. Click **Create Question**
4. Copy the generated link from the dialog
5. Share the link with students via WhatsApp, email, etc.

#### 2. View Responses

1. Click **Dashboard** in the top navigation
2. You'll see all your created questions
3. Click on any question to view detailed responses
4. Use the **Export CSV** button to download responses
5. Click the external link icon to copy the question link again

### For Students:

#### 1. Answer a Question

1. Open the link shared by your teacher/CR
2. Read the question
3. For Yes/No questions: Click the appropriate button
4. For Short Answer: Type your response
5. Enter your name if required
6. Click **Submit Response** (or the Yes/No button)
7. You'll see a success confirmation

## ✨ Features Showcase

### Clean UI Elements

- **Gradient backgrounds**: Subtle slate gradients for visual appeal
- **Card-based design**: Clean, organized content sections
- **Responsive layout**: Works on mobile and desktop
- **Professional colors**: Blue/purple accents throughout

### Interactive Components

- **Switch toggles**: Smooth toggle for Anonymous/Require Name
- **Dialog modals**: Copy link dialog with one-click copy
- **Toast notifications**: Success/error feedback
- **Large buttons**: Easy-to-tap Yes/No buttons

### Dashboard Features

- **Question cards**: Overview of all questions with stats
- **Response table**: Clean table showing all responses
- **CSV export**: Download responses for further analysis
- **Quick actions**: Copy links, view details

## 🎨 Design Highlights

- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Generous padding and margins for breathing room
- **Colors**: Professional palette with subtle accents
- **Animations**: Smooth transitions and hover effects
- **Icons**: Lucide icons for visual clarity

## 📝 Example Workflow

1. **Teacher creates**: "Have you submitted your assignment?"

   - Type: Yes/No
   - Audience: All Students
   - Anonymous: Off
   - Require Name: On

2. **Teacher shares** link in class WhatsApp group

3. **Students respond** by clicking Yes or No

4. **Teacher views** dashboard to see:

   - 25 Yes responses
   - 5 No responses
   - Names of all students who responded

5. **Teacher exports** CSV for record keeping

## 🔄 Data Persistence Note

⚠️ **Important**: This is a demo app with in-memory storage. Data is lost when you:

- Refresh the page
- Close the browser
- Restart the server

For production use, you would need to add a backend database.

## 🛠️ Technical Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Lucide React** icons
- **Sonner** for toast notifications

## 📱 Testing the App

1. Open http://localhost:3000 in your browser
2. Create a test question
3. Copy the generated link
4. Open the link in a new incognito/private window (to simulate a student)
5. Submit a response
6. Go back to the original window and check the dashboard
7. View your response in the table
8. Export to CSV to see the download

Enjoy using ClassPulse! 🎉

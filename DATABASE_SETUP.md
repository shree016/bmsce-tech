# Database Setup Guide

## Prerequisites

1. PostgreSQL database (local or cloud-hosted)
2. Database credentials (username, password, host, port, database name)

## Setup Steps

### 1. Configure Database Connection

Edit the `.env` file and replace the DATABASE_URL with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

**Note:** This project uses Prisma 7, which requires the database URL to be configured in both:

- `.env` file (for the application runtime)
- `prisma.config.ts` (for migrations and CLI commands)

The configuration is already set up in `prisma.config.ts` to read from the `DATABASE_URL` environment variable.

**Examples:**

Local PostgreSQL:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/classpulse?schema=public"
```

Cloud PostgreSQL (e.g., Neon, Supabase, Railway):

```env
DATABASE_URL="postgresql://user:pass@abc-xyz-123.us-east-1.aws.neon.tech:5432/classpulse?sslmode=require"
```

### 2. Generate Prisma Client

Run the following command to generate the Prisma Client:

```bash
npx prisma generate
```

### 3. Create Database Tables

Run the migration to create the database tables:

```bash
npx prisma migrate dev --name init
```

This will:

- Create the `Question` and `Response` tables
- Set up indexes for better performance
- Create relations between tables

### 4. (Optional) Seed Demo Data

If you want to add some demo data to test the application, create a seed script:

**prisma/seed.ts:**

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create demo questions
  const question1 = await prisma.question.create({
    data: {
      question: "Have you completed registration?",
      type: "yes-no",
      audience: "all",
      isAnonymous: false,
      requireName: true,
      responses: {
        create: [
          { answer: "Yes", name: "Rahul Kumar" },
          { answer: "Yes", name: "Priya Sharma" },
          { answer: "No", name: "Amit Patel" },
        ],
      },
    },
  });

  const question2 = await prisma.question.create({
    data: {
      question: "Do you need help with the assignment?",
      type: "yes-no",
      audience: "all",
      isAnonymous: true,
      requireName: false,
      responses: {
        create: [{ answer: "Yes" }, { answer: "No" }],
      },
    },
  });

  console.log("✅ Demo data seeded successfully!");
  console.log({ question1, question2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Then run:

```bash
npx tsx prisma/seed.ts
```

### 5. Verify Database Connection

Test the connection with Prisma Studio:

```bash
npx prisma studio
```

This will open a web interface at http://localhost:5555 where you can view and edit your data.

### 6. Start the Application

```bash
npm run dev
```

Visit http://localhost:3000 to use the application!

## Database Schema

### Question Table

- `id` (String, Primary Key) - Unique identifier (cuid)
- `question` (String) - The question text
- `type` (String) - "yes-no" or "short-answer"
- `audience` (String) - "all" or "cr-only"
- `isAnonymous` (Boolean) - Whether responses are anonymous
- `requireName` (Boolean) - Whether name is required
- `createdAt` (DateTime) - Timestamp of creation

### Response Table

- `id` (String, Primary Key) - Unique identifier (cuid)
- `questionId` (String, Foreign Key) - References Question.id
- `answer` (String) - The response answer
- `name` (String, Optional) - Responder's name
- `submittedAt` (DateTime) - Timestamp of submission

## Troubleshooting

### Connection Issues

If you get a connection error:

1. Verify your DATABASE_URL is correct
2. Ensure PostgreSQL is running
3. Check firewall settings
4. For cloud databases, verify IP whitelist settings

### Migration Issues

If migrations fail:

```bash
# Reset the database (WARNING: Deletes all data)
npx prisma migrate reset

# Or manually drop tables and run migration again
npx prisma db push --force-reset
```

### Prisma Client Issues

If Prisma Client is not found:

```bash
npm install @prisma/client
npx prisma generate
```

## Production Deployment

For production:

1. Set `DATABASE_URL` in your hosting environment variables
2. Run migrations in production:
   ```bash
   npx prisma migrate deploy
   ```
3. Ensure connection pooling is configured for serverless environments
4. Consider using Prisma Data Platform or connection pooling services like PgBouncer

## Cloud Database Providers

### Recommended Services:

- **Neon** - https://neon.tech (Free tier available, serverless)
- **Supabase** - https://supabase.com (Free tier, includes auth)
- **Railway** - https://railway.app (Simple deployment)
- **Vercel Postgres** - https://vercel.com/storage/postgres (Integrated with Vercel)
- **PlanetScale** - https://planetscale.com (MySQL alternative)

## Security Notes

⚠️ **Important:**

- Never commit the `.env` file to version control
- Use strong passwords for production databases
- Enable SSL/TLS for database connections
- Restrict database access by IP when possible
- Use connection pooling in production

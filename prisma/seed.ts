import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const indianNames = [
  "Aarav Kumar",
  "Vivaan Sharma",
  "Aditya Patel",
  "Vihaan Singh",
  "Arjun Reddy",
  "Sai Verma",
  "Ayaan Khan",
  "Krishna Rao",
  "Ishaan Nair",
  "Shaurya Gupta",
  "Atharv Joshi",
  "Advik Desai",
  "Reyansh Mehta",
  "Aadhya Iyer",
  "Ananya Menon",
  "Diya Malhotra",
  "Ira Kapoor",
  "Saanvi Agarwal",
  "Navya Chopra",
  "Pari Jain",
  "Kavya Bhat",
  "Myra Shah",
  "Aanya Pandey",
  "Sara Kulkarni",
  "Kiara Shetty",
  "Riya Deshpande",
  "Anvi Pillai",
  "Aarohi Saxena",
  "Ishita Varma",
  "Advika Rajan",
  "Priya Subramanian",
  "Neha Krishnan",
  "Rohan Mishra",
  "Karan Thakur",
  "Arnav Banerjee",
  "Dhruv Ghosh",
  "Kabir Sen",
  "Yash Bose",
  "Vedant Chatterjee",
  "Aryan Das",
  "Sahil Mukherjee",
  "Harsh Roy",
  "Dev Bhattacharya",
  "Tanvi Jha",
  "Shreya Yadav",
  "Pooja Singh",
  "Simran Kaur",
  "Anjali Rajput",
  "Meera Chaudhary",
  "Ritu Bhardwaj",
];

async function main() {
  console.log("🌱 Starting seed...");

  // Create students
  const students = await Promise.all(
    indianNames.map((name, index) => {
      const rollNo = `BT${(2024).toString()}${String(index + 1).padStart(
        3,
        "0"
      )}`;
      return prisma.student.create({
        data: {
          name,
          rollNo,
        },
      });
    })
  );

  console.log(`✅ Created ${students.length} students`);

  // Create some demo questions
  const question1 = await prisma.question.create({
    data: {
      question: "Have you completed registration?",
      type: "yes-no",
      audience: "all",
      isAnonymous: false,
      requireName: true,
    },
  });

  const question2 = await prisma.question.create({
    data: {
      question: "Do you need help with the assignment?",
      type: "yes-no",
      audience: "all",
      isAnonymous: true,
      requireName: false,
    },
  });

  const question3 = await prisma.question.create({
    data: {
      question: "What topics would you like to cover in the next session?",
      type: "short-answer",
      audience: "all",
      isAnonymous: false,
      requireName: false,
    },
  });

  // Create some demo responses
  await prisma.response.createMany({
    data: [
      { questionId: question1.id, answer: "Yes", studentId: students[0].id },
      { questionId: question1.id, answer: "Yes", studentId: students[1].id },
      { questionId: question1.id, answer: "No", studentId: students[2].id },
      { questionId: question2.id, answer: "Yes", studentId: students[3].id },
      { questionId: question2.id, answer: "No", studentId: students[4].id },
      {
        questionId: question3.id,
        answer: "Machine Learning and AI fundamentals",
        studentId: students[5].id,
      },
    ],
  });

  console.log("✅ Created demo questions and responses");
  console.log("\n📊 Summary:");
  console.log(`   Students: ${students.length}`);
  console.log(`   Questions: 3`);
  console.log(`   Responses: 6`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

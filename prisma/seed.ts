import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const studentInfo = [
  { name: "P S SAI RAKSHITHA", usn: "1BM25MCA050-T", section: "B" },
  { name: "AKHILESH N SHET", usn: "1BM25MCA120-T", section: "B" },
  { name: "DAYESH S AMIN", usn: "1BM25MCA121-T", section: "B" },
  { name: "KEERTHI B M", usn: "1BM25MCA118-T", section: "B" },

  { name: "DHEERAJ KUMAR RAY", usn: "1BM25MCA061-T", section: "B" },
  { name: "PRASHANT KUMAR THAKUR", usn: "1BM25MCA083-T", section: "B" },
  { name: "SHARANYA M P", usn: "1BM25MCA058-T", section: "B" },
  { name: "SHREYA KARN", usn: "1BM25MCA059-T", section: "B" },
  { name: "PADMAJA NINGAPPA BILL", usn: "1BM25MCA016-T", section: "B" },
  { name: "PAVAN R SHETTY", usn: "1BM25MCA03-T", section: "B" },
  { name: "PIYUSH KUMAR", usn: "1BM25MCA067-T", section: "B" },
  { name: "PRAJESH L", usn: "1BM25MCA002-T", section: "B" },
  { name: "PRARTHANA SHETTY", usn: "1BM25MCA065-T", section: "B" },
  { name: "PRATHVIRAJ SAGAR", usn: "1BM25MCA098-T", section: "B" },
  { name: "PUTTAMMA M", usn: "1BM25MCA012-T", section: "B" },

  { name: "RAHUL S M", usn: "1BM25MCA028-T", section: "B" },
  { name: "RAIHAAN ISMAIL JUKAKU", usn: "1BM25MCA112-T", section: "B" },
  { name: "RAKSHITH GOWDA P", usn: "1BM25MCA119-T", section: "B" },
  { name: "RAKSHITHA MAIYA S", usn: "1BM25MCA063-T", section: "B" },
  { name: "RASHMI", usn: "1BM25MCA094-T", section: "B" },
  { name: "RISHON RAYMOND BARNES", usn: "1BM25MCA088-T", section: "B" },
  { name: "RUKKAIYA", usn: "1BM25MCA054-T", section: "B" },
  { name: "S P VIJAYRAJ", usn: "1BM25MCA014-T", section: "B" },
  { name: "SAHISHNU JOGUR", usn: "1BM25MCA103-T", section: "B" },
  { name: "SAI KUMAR", usn: "1BM25MCA037-T", section: "B" },
  { name: "SAMARTHA H G", usn: "1BM25MCA111-T", section: "B" },

  { name: "SANDEEPA N R", usn: "1BM25MCA092-T", section: "B" },
  { name: "SARVASETTY VARSHITHA", usn: "1BM25MCA072-T", section: "B" },
  { name: "SHAHEEN TAJ M", usn: "1BM25MCA108-T", section: "B" },
  { name: "SHAMANTH KODGI M", usn: "1BM25MCA046-T", section: "B" },
  { name: "SHIRAVAN S BABU", usn: "1BM25MCA07-T", section: "B" },
  { name: "SHREE RAKSHA R", usn: "1BM25MCA062-T", section: "B" },
  { name: "SHRILAXMI HERALAGI", usn: "1BM25MCA038-T", section: "B" },
  { name: "SNEHA H", usn: "1BM25MCA105-T", section: "B" },
  { name: "SNEHA M N", usn: "1BM25MCA005-T", section: "B" },
  { name: "SNEHA UDAY NAIK", usn: "1BM25MCA040-T", section: "B" },

  { name: "SRIVATSA S", usn: "1BM25MCA047-T", section: "B" },
  { name: "SRUJAN J K UPADHYA", usn: "1BM25MCA070-T", section: "B" },
  { name: "SUBHIKSHA R C", usn: "1BM25MCA031-T", section: "B" },
  { name: "SUHAS E", usn: "1BM25MCA109-T", section: "B" },
  { name: "SUHAS R", usn: "1BM25MCA114-T", section: "B" },
  { name: "TANISH G", usn: "1BM25MCA089-T", section: "B" },
  { name: "TANUSHA AVINASH", usn: "1BM25MCA091-T", section: "B" },
  { name: "TARUN G", usn: "1BM25MCA010-T", section: "B" },
  { name: "TARUN P", usn: "1BM25MCA078-T", section: "B" },
  { name: "TARUN S U", usn: "1BM25MCA084-T", section: "B" },
  { name: "TEJDEEP B N", usn: "1BM25MCA086-T", section: "B" },

  { name: "USMANUL AFWAN D K", usn: "1BM25MCA042-T", section: "B" },
  { name: "VARUN M K", usn: "1BM25MCA023-T", section: "B" },
  { name: "VIGHNESH NAYAK", usn: "1BM25MCA013-T", section: "B" },
  { name: "VIJAYALAXMI HADIMANI", usn: "1BM25MCA080-T", section: "B" },
  { name: "VIJETH V", usn: "1BM25MCA011-T", section: "B" },
  { name: "VIKAS H B", usn: "1BM25MCA095-T", section: "B" },
  { name: "VISHRUTH T S", usn: "1BM25MCA085-T", section: "B" },
  { name: "VISHWA MOORTHY S", usn: "1BM25MCA020-T", section: "B" },
  { name: "VITTAL SATTEPPA KEMPASATTI", usn: "1BM25MCA079-T", section: "B" },
  { name: "YASHAS M", usn: "1BM25MCA055-T", section: "B" },
  { name: "SATHWIK G", usn: "1BM25MCA122-T", section: "B" },
];

async function main() {
  console.log("🌱 Starting seed...");

  // Create or get students (upsert to avoid duplicates)
  const students = await Promise.all(
    studentInfo.map(async (student) => {
      return prisma.student.upsert({
        where: { usn: student.usn },
        update: {},
        create: {
          name: student.name,
          usn: student.usn,
          section: student.section,
        },
      });
    })
  );

  console.log(`✅ Ensured ${students.length} students exist`);

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

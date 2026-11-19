// prisma/seed.ts
// Membuat 1 user demo + beberapa post supaya frontend langsung punya data.
// Jalankan: npm run seed
import bcrypt from "bcryptjs";
import prisma from "../src/config/prisma";

const main = async () => {
  const user = await prisma.user.upsert({
    where: { email: "budi@santoso.id" },
    update: {},
    create: {
      email: "budi@santoso.id",
      name: "Budi Santoso",
      password: await bcrypt.hash("rahasia123", 10),
      posts: {
        create: [
          { title: "Belajar Express dan Prisma", content: "Seru ternyata!" },
          { title: "Mengenal React + TypeScript", content: "Komponen, props, dan state." },
        ],
      },
    },
  });

  console.log(`Seed selesai. User demo: ${user.email} (id ${user.id})`);
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

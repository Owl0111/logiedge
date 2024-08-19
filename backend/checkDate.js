import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getInvoicesCreatedAt() {
  const invoices = await prisma.invoice.findMany({
    select: {
      createdAt: true,
    },
  });

  console.log(invoices);
}

getInvoicesCreatedAt()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

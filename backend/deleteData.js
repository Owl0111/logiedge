import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


async function main(){
    
    
    await prisma.invoiceItems.deleteMany();
    await prisma.invoice.deleteMany();
    await prisma.itemMaster.deleteMany();
    await prisma.custMaster.deleteMany()

   
}

main()
    .catch(e => {
        console.error(e.message);
    })
    .finally(async ()=> {
        await prisma.$disconnect()
    }) 
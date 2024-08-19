/*
  Warnings:

  - The primary key for the `CustMaster` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CustMaster` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `CustMaster` table. All the data in the column will be lost.
  - Added the required column `Address` to the `CustMaster` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `CustMaster` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Name` to the `CustMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PAN` to the `CustMaster` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('Active', 'Inactive');

-- AlterTable
ALTER TABLE "CustMaster" DROP CONSTRAINT "CustMaster_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "GST" TEXT,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "PAN" TEXT NOT NULL,
ADD CONSTRAINT "CustMaster_pkey" PRIMARY KEY ("Id");

-- CreateTable
CREATE TABLE "ItemMaster" (
    "ItemID" TEXT NOT NULL,
    "ItemName" TEXT NOT NULL,
    "Cost" INTEGER NOT NULL,
    "Status" "status" NOT NULL,

    CONSTRAINT "ItemMaster_pkey" PRIMARY KEY ("ItemID")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "InvoiceID" TEXT NOT NULL,
    "Cost" INTEGER NOT NULL,
    "CustomerID" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("InvoiceID")
);

-- CreateTable
CREATE TABLE "InvoiceItems" (
    "InvoiceItemID" TEXT NOT NULL,
    "ItemCost" INTEGER NOT NULL,
    "ItemName" TEXT NOT NULL,
    "InvoiceID" TEXT NOT NULL,

    CONSTRAINT "InvoiceItems_pkey" PRIMARY KEY ("InvoiceItemID")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "CustMaster"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItems" ADD CONSTRAINT "InvoiceItems_InvoiceID_fkey" FOREIGN KEY ("InvoiceID") REFERENCES "Invoice"("InvoiceID") ON DELETE RESTRICT ON UPDATE CASCADE;

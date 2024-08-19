/*
  Warnings:

  - Added the required column `GSTApplied` to the `InvoiceItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Quantity` to the `InvoiceItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvoiceItems" ADD COLUMN     "GSTApplied" BOOLEAN NOT NULL,
ADD COLUMN     "Quantity" INTEGER NOT NULL;

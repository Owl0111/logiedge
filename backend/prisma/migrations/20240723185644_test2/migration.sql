/*
  Warnings:

  - Added the required column `status` to the `CustMaster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustMaster" ADD COLUMN     "status" "status" NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

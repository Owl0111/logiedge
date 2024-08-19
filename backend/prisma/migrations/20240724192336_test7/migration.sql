/*
  Warnings:

  - You are about to drop the column `status` on the `CustMaster` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `ItemMaster` table. All the data in the column will be lost.
  - Added the required column `isActive` to the `CustMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `ItemMaster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustMaster" DROP COLUMN "status",
ADD COLUMN     "isActive" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "ItemMaster" DROP COLUMN "Status",
ADD COLUMN     "isActive" BOOLEAN NOT NULL;

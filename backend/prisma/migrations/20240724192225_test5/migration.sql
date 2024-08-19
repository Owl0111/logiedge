/*
  Warnings:

  - Changed the type of `status` on the `CustMaster` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Status` on the `ItemMaster` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CustMaster" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "ItemMaster" DROP COLUMN "Status",
ADD COLUMN     "Status" BOOLEAN NOT NULL;

-- DropEnum
DROP TYPE "status";

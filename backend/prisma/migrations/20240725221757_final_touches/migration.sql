/*
  Warnings:

  - A unique constraint covering the columns `[PAN]` on the table `CustMaster` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[GST]` on the table `CustMaster` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustMaster_PAN_key" ON "CustMaster"("PAN");

-- CreateIndex
CREATE UNIQUE INDEX "CustMaster_GST_key" ON "CustMaster"("GST");

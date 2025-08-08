/*
  Warnings:

  - You are about to drop the column `brand` on the `QrDeviceInfo` table. All the data in the column will be lost.
  - You are about to drop the column `deviceType` on the `QrDeviceInfo` table. All the data in the column will be lost.
  - You are about to drop the column `extraInfo` on the `QrDeviceInfo` table. All the data in the column will be lost.
  - You are about to drop the column `firmwareVersion` on the `QrDeviceInfo` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `QrDeviceInfo` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `QrDeviceInfo` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseDate` on the `QrDeviceInfo` table. All the data in the column will be lost.
  - You are about to drop the column `registeredTo` on the `QrDeviceInfo` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `QrDeviceInfo` table. All the data in the column will be lost.
  - You are about to drop the column `supportContact` on the `QrDeviceInfo` table. All the data in the column will be lost.
  - You are about to drop the column `warrantyPeriod` on the `QrDeviceInfo` table. All the data in the column will be lost.
  - You are about to drop the column `warrantyStatus` on the `QrDeviceInfo` table. All the data in the column will be lost.
  - Added the required column `batteryId` to the `QrDeviceInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."DeviceComplaint" DROP CONSTRAINT "DeviceComplaint_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DeviceComplaint" DROP CONSTRAINT "DeviceComplaint_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."QrDeviceInfo" DROP CONSTRAINT "QrDeviceInfo_userId_fkey";

-- DropIndex
DROP INDEX "public"."QrDeviceInfo_serialNumber_key";

-- AlterTable
ALTER TABLE "public"."QrDeviceInfo" DROP COLUMN "brand",
DROP COLUMN "deviceType",
DROP COLUMN "extraInfo",
DROP COLUMN "firmwareVersion",
DROP COLUMN "location",
DROP COLUMN "model",
DROP COLUMN "purchaseDate",
DROP COLUMN "registeredTo",
DROP COLUMN "serialNumber",
DROP COLUMN "supportContact",
DROP COLUMN "warrantyPeriod",
DROP COLUMN "warrantyStatus",
ADD COLUMN     "batteryId" INTEGER NOT NULL,
ADD COLUMN     "purchasedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."Battery" (
    "id" SERIAL NOT NULL,
    "qr_code_id" TEXT NOT NULL,
    "model_name" TEXT,
    "product_type" TEXT,
    "capacity_ah" INTEGER,
    "voltage" TEXT,
    "technology" TEXT,
    "warranty_months" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Battery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Battery_qr_code_id_key" ON "public"."Battery"("qr_code_id");

-- AddForeignKey
ALTER TABLE "public"."QrDeviceInfo" ADD CONSTRAINT "QrDeviceInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."QrDeviceInfo" ADD CONSTRAINT "QrDeviceInfo_batteryId_fkey" FOREIGN KEY ("batteryId") REFERENCES "public"."Battery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DeviceComplaint" ADD CONSTRAINT "DeviceComplaint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DeviceComplaint" ADD CONSTRAINT "DeviceComplaint_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."QrDeviceInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "public"."QrDeviceInfo" (
    "id" SERIAL NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "brand" TEXT,
    "model" TEXT,
    "warrantyStatus" TEXT,
    "warrantyPeriod" INTEGER,
    "deviceType" TEXT,
    "supportContact" TEXT,
    "firmwareVersion" TEXT,
    "registeredTo" TEXT,
    "location" TEXT,
    "extraInfo" JSONB,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QrDeviceInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QrDeviceInfo_serialNumber_key" ON "public"."QrDeviceInfo"("serialNumber");

-- AddForeignKey
ALTER TABLE "public"."QrDeviceInfo" ADD CONSTRAINT "QrDeviceInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

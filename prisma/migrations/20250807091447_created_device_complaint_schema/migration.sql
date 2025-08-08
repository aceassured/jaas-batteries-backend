-- CreateTable
CREATE TABLE "public"."DeviceComplaint" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "complaintType" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "raisedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "ticketNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeviceComplaint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceComplaint_ticketNumber_key" ON "public"."DeviceComplaint"("ticketNumber");

-- AddForeignKey
ALTER TABLE "public"."DeviceComplaint" ADD CONSTRAINT "DeviceComplaint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DeviceComplaint" ADD CONSTRAINT "DeviceComplaint_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."QrDeviceInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

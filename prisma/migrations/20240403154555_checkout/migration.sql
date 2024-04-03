/*
  Warnings:

  - You are about to drop the column `Availability` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Availability",
ADD COLUMN     "availability" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'flower';

-- CreateTable
CREATE TABLE "Checkout" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Checkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckoutOnProduct" (
    "productId" INTEGER NOT NULL,
    "checkoutId" TEXT NOT NULL,
    "checkoutAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkoutQuantity" INTEGER NOT NULL,

    CONSTRAINT "CheckoutOnProduct_pkey" PRIMARY KEY ("productId","checkoutId")
);

-- AddForeignKey
ALTER TABLE "CheckoutOnProduct" ADD CONSTRAINT "CheckoutOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckoutOnProduct" ADD CONSTRAINT "CheckoutOnProduct_checkoutId_fkey" FOREIGN KEY ("checkoutId") REFERENCES "Checkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

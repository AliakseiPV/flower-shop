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

    CONSTRAINT "Checkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CheckoutToProduct" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CheckoutToProduct_AB_unique" ON "_CheckoutToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CheckoutToProduct_B_index" ON "_CheckoutToProduct"("B");

-- AddForeignKey
ALTER TABLE "_CheckoutToProduct" ADD CONSTRAINT "_CheckoutToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Checkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CheckoutToProduct" ADD CONSTRAINT "_CheckoutToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

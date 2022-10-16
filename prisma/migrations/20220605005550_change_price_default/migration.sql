-- DropIndex
DROP INDEX "price_product_id_key";

-- AlterTable
ALTER TABLE "price" ALTER COLUMN "value" SET DEFAULT 0.00;

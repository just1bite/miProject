/*
  Warnings:

  - Added the required column `expiredDate` to the `Point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiredDate` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `point` ADD COLUMN `expiredDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `voucher` ADD COLUMN `expiredDate` DATETIME(3) NOT NULL;

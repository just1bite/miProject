/*
  Warnings:

  - You are about to drop the `paidevent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `paidevent` DROP FOREIGN KEY `PaidEvent_eventId_fkey`;

-- DropTable
DROP TABLE `paidevent`;

-- CreateTable
CREATE TABLE `TicketTier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tierName` VARCHAR(191) NOT NULL,
    `discount` DOUBLE NOT NULL,
    `eventId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TicketTier` ADD CONSTRAINT `TicketTier_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

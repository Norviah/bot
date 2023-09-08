-- CreateTable
CREATE TABLE `Guild` (
    `id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Guild_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Command` (
    `name` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NULL,

    UNIQUE INDEX `Command_name_key`(`name`),
    UNIQUE INDEX `Command_id_key`(`id`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GuildCommand` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `guildId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GuildCommand` ADD CONSTRAINT `GuildCommand_name_fkey` FOREIGN KEY (`name`) REFERENCES `Command`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GuildCommand` ADD CONSTRAINT `GuildCommand_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `Guild`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

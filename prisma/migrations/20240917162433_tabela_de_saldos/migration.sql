-- CreateTable
CREATE TABLE `Saldos` (
    `codigo` VARCHAR(191) NOT NULL,
    `forecast` DOUBLE NOT NULL,
    `vendido` DOUBLE NOT NULL,
    `estoqueTotal` DOUBLE NOT NULL,
    `politica` DOUBLE NOT NULL,
    `coefForecast` DOUBLE NOT NULL,

    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

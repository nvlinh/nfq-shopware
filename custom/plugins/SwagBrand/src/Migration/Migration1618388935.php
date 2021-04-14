<?php declare(strict_types=1);

namespace SwagBrand\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1618388935 extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1618388935;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement('
            CREATE TABLE `swag_brand` (
              `id` BINARY(16) NOT NULL,
              `link` VARCHAR(255) COLLATE utf8mb4_unicode_ci NULL,
              `media_id` BINARY(16) NULL,
              `created_at` DATETIME(3) NOT NULL,
              `updated_at` DATETIME(3) NULL,
               PRIMARY KEY (`id`),
               CONSTRAINT `fk.swag_brand.media_id` FOREIGN KEY (`media_id`)
                 REFERENCES `media` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ');

        $connection->executeUpdate('
            CREATE TABLE `swag_brand_translation` (
              `swag_brand_id` BINARY(16) NOT NULL,
              `language_id` BINARY(16) NOT NULL,
              `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NULL,
              `description` LONGTEXT COLLATE utf8mb4_unicode_ci NULL,
              `custom_fields` JSON NULL,
              `created_at` DATETIME(3) NOT NULL,
              `updated_at` DATETIME(3) NULL,
              PRIMARY KEY (`swag_brand_id`, `language_id`),
              CONSTRAINT `fk.brand_translation.brand_id` FOREIGN KEY (`swag_brand_id`)
                REFERENCES `swag_brand` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
              CONSTRAINT `fk.brand_translation.language_id` FOREIGN KEY (`language_id`)
                REFERENCES `language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ');
    }

    public function updateDestructive(Connection $connection): void
    {
        // implement update destructive
    }
}

<?php declare(strict_types=1);

namespace SwagBrand;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\ActivateContext;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;

class SwagBrand extends Plugin
{
    public function activate(ActivateContext $activateContext): void
    {
    }

    public function uninstall(UninstallContext $context): void
    {
        parent::uninstall($context);

        if ($context->keepUserData()) {
            return;
        }

        $connection = $this->container->get(Connection::class);

        $connection->executeUpdate('DROP TABLE IF EXISTS `swag_brand`');
        $connection->executeUpdate('DROP TABLE IF EXISTS `swag_brand_translation`');
        $connection->executeUpdate('ALTER TABLE `product` DROP COLUMN `product_brand_id`');
    }
}

<?php declare(strict_types=1);

namespace SwagBrand;

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
    }
}

<?php declare(strict_types=1);

namespace MyTheme\DataResolver;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Media\Cms\ImageCmsElementResolver;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;

class CustomCmsElementResolver extends ImageCmsElementResolver
{
    public function getType(): string
    {
        return 'ele_basic_call_to_action';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $config = $slot->getFieldConfig();
        $myCustomMedia = $config->get('media');

        if (!$myCustomMedia) {
            return null;
        }

        $mediaId = $myCustomMedia->getValue();
        $criteria = new Criteria([$mediaId]);
        $criteriaCollection = new CriteriaCollection();
        $criteriaCollection->add('media_' . $slot->getUniqueIdentifier(), MediaDefinition::class, $criteria);

        return $criteriaCollection;
    }
}

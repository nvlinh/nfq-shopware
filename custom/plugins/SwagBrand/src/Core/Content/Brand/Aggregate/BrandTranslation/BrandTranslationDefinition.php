<?php declare(strict_types=1);

namespace SwagBrand\Core\Content\Brand\Aggregate\BrandTranslation;

use Shopware\Core\Framework\DataAbstractionLayer\EntityTranslationDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\CustomFields;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\AllowHtml;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\LongTextField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use SwagBrand\Core\Content\Brand\BrandDefinition;

class BrandTranslationDefinition extends EntityTranslationDefinition
{
    public const ENTITY_NAME = 'swag_brand_translation';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return BrandTranslationCollection::class;
    }

    public function getEntityClass(): string
    {
        return BrandTranslationEntity::class;
    }

    public function getParentDefinitionClass(): string
    {
        return BrandDefinition::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new StringField('name', 'name'))->addFlags(new ApiAware(), new Required()),
            (new LongTextField('description', 'description'))->addFlags(new ApiAware(), new AllowHtml()),
            (new CustomFields())->addFlags(new ApiAware()),
        ]);
    }
}

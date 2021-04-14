<?php declare(strict_types=1);

namespace SwagBrand\Core\Content\Brand\Aggregate\BrandTranslation;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void                         add(BrandTranslationEntity $entity)
 * @method void                         set(string $key, BrandTranslationEntity $entity)
 * @method BrandTranslationEntity[]    getIterator()
 * @method BrandTranslationEntity[]    getElements()
 * @method BrandTranslationEntity|null get(string $key)
 * @method BrandTranslationEntity|null first()
 * @method BrandTranslationEntity|null last()
 */
class BrandTranslationCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return BrandTranslationEntity::class;
    }

    public function getBrandIds(): array
    {
        return $this->fmap(function (BrandTranslationEntity $brandTranslation) {
            return $brandTranslation->getBrandId();
        });
    }

    public function filterByBrandId(string $id): self
    {
        return $this->filter(function (BrandTranslationEntity $brandTranslation) use ($id) {
            return $brandTranslation->getBrandId() === $id;
        });
    }

    public function getLanguageIds(): array
    {
        return $this->fmap(function (BrandTranslationEntity $brandTranslation) {
            return $brandTranslation->getLanguageId();
        });
    }

    public function filterByLanguageId(string $id): self
    {
        return $this->filter(function (BrandTranslationEntity $brandTranslation) use ($id) {
            return $brandTranslation->getLanguageId() === $id;
        });
    }

    public function getApiAlias(): string
    {
        return 'swag_brand_translation_collection';
    }
}

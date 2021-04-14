<?php declare(strict_types=1);

namespace SwagBrand\Core\Content\Brand;

use Shopware\Core\Content\Media\MediaEntity;
use Shopware\Core\Content\Product\ProductCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use SwagBrand\Core\Content\Brand\Aggregate\BrandTranslation\BrandTranslationCollection;

class BrandEntity extends Entity
{
    use EntityIdTrait;

    /**
     * @var string|null
     */
    protected $mediaId;

    /**
     * @var string|null
     */
    protected $name;

    /**
     * @var string|null
     */
    protected $link;

    /**
     * @var string|null
     */
    protected $description;

    /**
     * @var MediaEntity|null
     */
    protected $media;

    /**
     * @var BrandTranslationCollection|null
     */
    protected $translations;

//    /**
//     * @var ProductCollection|null
//     */
//    protected $products;

    /**
     * @var array|null
     */
    protected $customFields;

    public function getMediaId(): ?string
    {
        return $this->mediaId;
    }

    public function setMediaId(?string $mediaId): void
    {
        $this->mediaId = $mediaId;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(?string $link): void
    {
        $this->link = $link;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getMedia(): ?MediaEntity
    {
        return $this->media;
    }

    public function setMedia(MediaEntity $media): void
    {
        $this->media = $media;
    }

    public function getTranslations(): ?BrandTranslationCollection
    {
        return $this->translations;
    }

    public function setTranslations(BrandTranslationCollection $translations): void
    {
        $this->translations = $translations;
    }

//    public function getProducts(): ?ProductCollection
//    {
//        return $this->products;
//    }
//
//    public function setProducts(ProductCollection $products): void
//    {
//        $this->products = $products;
//    }

    public function getCustomFields(): ?array
    {
        return $this->customFields;
    }

    public function setCustomFields(?array $customFields): void
    {
        $this->customFields = $customFields;
    }
}

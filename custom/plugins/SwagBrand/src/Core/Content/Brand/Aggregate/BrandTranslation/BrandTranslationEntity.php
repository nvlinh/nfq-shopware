<?php declare(strict_types=1);

namespace SwagBrand\Core\Content\Brand\Aggregate\BrandTranslation;

use Shopware\Core\Framework\DataAbstractionLayer\TranslationEntity;
use SwagBrand\Core\Content\Brand\BrandEntity;

class BrandTranslationEntity extends TranslationEntity
{
    /**
     * @var string
     */
    protected $brandId;

    /**
     * @var string|null
     */
    protected $name;

    /**
     * @var string|null
     */
    protected $description;

    /**
     * @var BrandEntity|null
     */
    protected $brand;

    /**
     * @var array|null
     */
    protected $customFields;

    public function getBrandId(): string
    {
        return $this->brandId;
    }

    public function setBrandId(string $brandId): void
    {
        $this->brandId = $brandId;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getBrand(): ?BrandEntity
    {
        return $this->brand;
    }

    public function setBrand(BrandEntity $brand): void
    {
        $this->brand = $brand;
    }

    public function getCustomFields(): ?array
    {
        return $this->customFields;
    }

    public function setCustomFields(?array $customFields): void
    {
        $this->customFields = $customFields;
    }
}

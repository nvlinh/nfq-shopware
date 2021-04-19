<?php declare(strict_types=1);

namespace SwagBrand\Core\Content\Product;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Inherited;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use SwagBrand\Core\Content\Brand\BrandDefinition;

class ProductExtension extends EntityExtension
{
    public function extendFields(FieldCollection $collection): void
    {
        $collection->add(
            (new FkField(
                'product_brand_id',
                'productBrandId',
                BrandDefinition::class,
                'id',
            ))->addFlags(new ApiAware(), new Inherited())
        );

//        $collection->add(
//            (new ManyToOneAssociationField(
//                'productBrand',
//                'product_brand_id',
//                BrandDefinition::class,
//                'id',
//                false
//            ))->addFlags(new Inherited(), new ApiAware())
//        );

        $collection->add(
            (new OneToOneAssociationField(
                'productBrand',
                'product_brand_id',
                'id',
                BrandDefinition::class,
                true
            ))
        );
    }

    public function getDefinitionClass(): string
    {
        return ProductDefinition::class;
    }
}

import template from './sw-product-detail-base.html.twig';

const { Component } = Shopware;
const { mapPropertyErrors } = Shopware.Component.getComponentHelper();

Component.override('sw-product-detail-base', {
    template,

    computed: {
        productRepository() {
            return this.repositoryFactory.create('product');
        },

        ...mapPropertyErrors('product', [
            'brandId',
        ]),
    },

    methods: {
        saveProduct() {
            if (this.product) {
                this.productRepository.save(this.product, Shopware.Context.api);
            }
        }
    },
});

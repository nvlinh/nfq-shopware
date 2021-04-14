import template from './swag-brand-list.html.twig';

const { Component, Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('swag-brand-list', {
    template,

    inject: [
        'repositoryFactory'
    ],

    mixins: [
        Mixin.getByName('listing')
    ],

    data() {
        return {
            repository: null,
            brands: null,
            isLoading: true,
            sortBy: 'name',
            sortDirection: 'ASC',
            total: 0,
            searchPlaceHolder: 'Brands'
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    computed: {
        columns() {
            return [{
                property: 'name',
                dataIndex: 'name',
                allowResize: true,
                routerLink: 'swag.brand.detail',
                label: 'swag-brand.list.columnName',
                inlineEdit: 'string',
                primary: true
            }, {
                property: 'link',
                label: 'swag-brand.list.columnLink',
                inlineEdit: 'string'
            }];
        }
    },

    created() {
        this.repository = this.repositoryFactory.create('swag_brand');
    },

    methods: {
        onChangeLanguage(languageId) {

        },

        getList() {
            this.isLoading = true;

            this.repository
                .search(new Criteria(), Shopware.Context.api)
                .then((result) => {
                    this.brands = result;
                    this.total = result.total;
                    this.isLoading = false;
                });
        },

        updateTotal({ total }) {
            this.total = total;
        }
    }
});

import template from './import-export-order.html.twig';
import './import-export-order.scss';

Shopware.Component.register('import-export-order', {
    template,

    metaInfo() {
        return {
            title: this.$createTitle()
        }
    },

    created() {
        this.httpClient = Shopware.Application.getContainer('init').httpClient;
    },

    methods: {

    },
});

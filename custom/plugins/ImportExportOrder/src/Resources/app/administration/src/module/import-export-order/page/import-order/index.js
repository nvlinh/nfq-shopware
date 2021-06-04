import template from './import-order.html.twig';
import './import-order.scss';

/**
 * @private
 */
Shopware.Component.register('import-order-view', {
    template,

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    methods: {
        reloadContent() {
            this.$refs.activityGrid.fetchActivities();
        }
    }
});

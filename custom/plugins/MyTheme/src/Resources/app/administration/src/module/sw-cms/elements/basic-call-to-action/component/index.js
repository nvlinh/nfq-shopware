import {Component, Mixin, Filter} from 'src/core/shopware';
import template from './sw-cms-el-basic-call-to-action.html.twig';
import './sw-cms-el-basic-call-to-action.scss';

Component.register('sw-cms-el-basic-call-to-action', {
    template,

    mixins: [Mixin.getByName('cms-element')],

    created() {
        this.createdComponent()
    },

    computed: {
        mediaUrl() {
            return this.getMediaUrl();
        },

        assetFilter() {
            return Filter.getByName('asset');
        },

        mediaConfigValue() {
            return 'config.sliderItems.value';
        }
    },

    methods: {
        createdComponent() {
            this.initElementConfig('ele_basic_call_to_action')
            this.initElementData('ele_basic_call_to_action');
        },

        getMediaUrl() {
            const elemData = this.element.data.media;
            const mediaSource = this.element.config.media.source;

            if (mediaSource === 'mapped') {
                const demoMedia = this.getDemoValue(this.element.config.media.value);

                if (demoMedia && demoMedia.url) {
                    return demoMedia.url;
                }

                return this.assetFilter('administration/static/img/cms/preview_mountain_large.jpg');
            }

            if (elemData && elemData.id) {
                return this.element.data.media.url;
            }

            if (elemData && elemData.url) {
                return this.assetFilter(elemData.url);
            }

            return this.assetFilter('administration/static/img/cms/preview_mountain_large.jpg');
        },
    },

    watch: {
        cmsPageState: {
            deep: true,
            handler() {
                this.$forceUpdate();
            }
        },

        mediaUrl() {
            return this.getMediaUrl();
        },
    }
})

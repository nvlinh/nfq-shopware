import {Component, Mixin} from 'src/core/shopware';
import template from './sw-cms-el-config-basic-call-to-action.html.twig';
import './sw-cms-el-config-basic-call-to-action.scss';

Component.register('sw-cms-el-config-basic-call-to-action', {
    template,

    mixins: [Mixin.getByName('cms-element')],

    inject: ['repositoryFactory'],

    data() {
        return {
            mediaModalIsOpen: false,
            initialFolderId: null
        };
    },

    created() {
        this.createdComponent()
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `cms-element-media-config-${this.element.id}`;
        },

        previewSource() {
            if (this.element.data && this.element.data.media && this.element.data.media.id) {
                return this.element.data.media;
            }

            return this.element.config.media.value;
        }
    },

    methods: {
        createdComponent() {
            this.initElementConfig('ele_basic_call_to_action');
        },

        async onImageUpload({targetId}) {
            const mediaEntity = await this.mediaRepository.get(targetId, Shopware.Context.api);

            this.element.config.media.value = mediaEntity.id;

            this.updateElementData(mediaEntity);

            this.$emit('element-update', this.element);
        },

        onImageRemove() {
            this.element.config.media.value = null;

            this.updateElementData();

            this.$emit('element-update', this.element);
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        onSelectionChanges(mediaEntity) {
            const media = mediaEntity[0];
            this.element.config.media.value = media.id;

            this.updateElementData(media);

            this.$emit('element-update', this.element);
        },

        updateElementData(media = null) {
            const mediaId = media === null ? null : media.id;

            if (!this.element.data) {
                this.$set(this.element, 'data', {mediaId});
                this.$set(this.element, 'data', {media});
            } else {
                this.$set(this.element.data, 'mediaId', mediaId);
                this.$set(this.element.data, 'media', media);
            }
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onChangeMinHeight(value) {
            this.element.config.minHeight.value = value === null ? '' : value;

            this.$emit('element-update', this.element);
        },

        onChangeDisplayMode(value) {
            if (value === 'cover') {
                this.element.config.verticalAlign.value = null;
            }

            this.$emit('element-update', this.element);
        }
    }
})

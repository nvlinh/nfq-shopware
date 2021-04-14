import template from './swag-brand-detail.html.twig';

const {Component, Mixin, Data: {Criteria}} = Shopware;

const {mapPropertyErrors} = Shopware.Component.getComponentHelper();

Component.register('swag-brand-detail', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('placeholder'),
        Mixin.getByName('notification'),
        Mixin.getByName('discard-detail-page-changes')('brand')
    ],

    props: {
        brandId: {
            type: String,
            required: false,
            default: null
        }
    },

    data() {
        return {
            brand: null,
            customFieldSets: [],
            isLoading: false,
            isSaveSuccessful: false,
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle(this.identifier)
        };
    },

    computed: {
        identifier() {
            return this.placeholder(this.brand, 'name');
        },

        brandIsLoading() {
            return this.isLoading || this.brand == null;
        },

        brandRepository() {
            return this.repositoryFactory.create('swag_brand');
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        customFieldSetRepository() {
            return this.repositoryFactory.create('custom_field_set');
        },

        customFieldSetCriteria() {
            const criteria = new Criteria();
            criteria.setPage(1);
            criteria.setLimit(100);
            criteria.addFilter(
                Criteria.equals('relations.entityName', 'swag_brand')
            );

            criteria.getAssociation('customFields')
                .addSorting(Criteria.sort('config.customFieldPosition', 'ASC', true))
                .setLimit(100);

            return criteria;
        },

        mediaUploadTag() {
            return `sw-brand-detail--${this.brand.id}`;
        },

        ...mapPropertyErrors('brand', ['name'])
    },

    watch: {
        brandId() {
            this.createdComponent();
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            if (this.brandId) {
                this.loadEntityData();
                return;
            }

            Shopware.State.commit('context/resetLanguageToDefault');
            this.brand = this.brandRepository.create(Shopware.Context.api);
        },

        loadEntityData() {
            this.isLoading = true;

            this.brandRepository
                .get(this.brandId, Shopware.Context.api)
                .then((brand) => {
                    this.isLoading = false;
                    this.brand = brand;
                });

            this.customFieldSetRepository
                .search(this.customFieldSetCriteria, Shopware.Context.api)
                .then((result) => {
                    this.customFieldSets = result.filter((set) => set.customFields.length > 0);
                });
        },

        abortOnLanguageChange() {
            return this.brandRepository.hasChanges(this.brand);
        },

        saveOnLanguageChange() {
            return this.onSave();
        },

        onChangeLanguage() {
            this.loadEntityData();
        },

        setMediaItem({targetId}) {
            this.brand.mediaId = targetId;
        },

        setMediaFromSidebar(media) {
            this.brand.mediaId = media.id;
        },

        onUnlinkLogo() {
            this.brand.mediaId = null;
        },

        openMediaSidebar() {
            this.$refs.mediaSidebarItem.openContent();
        },

        onDropMedia(dragData) {
            this.setMediaItem({targetId: dragData.id});
        },

        onSave() {
            this.isLoading = true;

            this.brandRepository.save(this.brand, Shopware.Context.api).then(() => {
                this.isLoading = false;
                this.isSaveSuccessful = true;
                if (this.brandId === null) {
                    this.$router.push({name: 'swag.brand.detail', params: {id: this.brand.id}});
                    return;
                }

                this.loadEntityData();
            }).catch((exception) => {
                this.isLoading = false;
                this.createNotificationError({
                    message: this.$tc(
                        'global.notification.notificationSaveErrorMessageRequiredFieldsInvalid'
                    )
                });
                throw exception;
            });
        },

        onCancel() {
            this.$router.push({name: 'swag.brand.list'});
        }
    }
});

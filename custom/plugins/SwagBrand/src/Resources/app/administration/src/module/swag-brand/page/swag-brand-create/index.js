const { Component } = Shopware;

Component.extend('swag-brand-create', 'swag-brand-detail', {
    methods: {
        getBrand() {
            this.brand = this.repository.create(Shopware.Context.api);
        },

        onClickSave() {
            this.isLoading = true;

            this.repository
                .save(this.brand, Shopware.Context.api)
                .then(() => {
                    this.isLoading = false;
                    this.$router.push({ name: 'swag.brand.detail', params: { id: this.brand.id } });
                }).catch((exception) => {
                    this.isLoading = false;

                    this.createNotificationError({
                        title: this.$t('swag-brand.detail.errorTitle'),
                        message: exception
                    });
                });
        }
    }
});

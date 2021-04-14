import './page/swag-brand-list';
import './page/swag-brand-detail';
import './page/swag-brand-create';
import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

const { Module } = Shopware;

Module.register('swag-brand', {
    type: 'plugin',
    name: 'Brand',
    title: 'swag-brand.general.mainMenuItemGeneral',
    description: 'sw-property.general.descriptionTextModule',
    color: '#ff3d58',
    icon: 'default-shopping-paper-bag-product',
    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    routes: {
        list: {
            component: 'swag-brand-list',
            path: 'list'
        },
        detail: {
            component: 'swag-brand-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'swag.brand.list'
            },
            props: {
                default(route) {
                    return {
                        brandId: route.params.id
                    };
                }
            }
        },
        create: {
            component: 'swag-brand-create',
            path: 'create',
            meta: {
                parentPath: 'swag.brand.list'
            }
        }
    },

    navigation: [{
        label: 'swag-brand.general.mainMenuItemGeneral',
        color: '#ff3d58',
        path: 'swag.brand.list',
        icon: 'default-shopping-paper-bag-product',
        position: 100,
        parent: 'sw-catalogue',
    }]
});

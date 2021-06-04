import './page/import-export-order';
import './page/import-order';
import './page/export-order';

import deDE from './snippet/de-DE';
import enGB from './snippet/en-GB';

Shopware.Module.register('import-export-order', {
    name: 'general.name',
    type: 'plugin',
    color: '#ff3d58',
    icon: 'default-action-move-file',
    title: 'general.title',
    description: 'general.description',
    routes: {
        index: {
            component: 'import-export-order',
            path: 'index',
            meta: {
                parentPath: 'import-export-order.index'
            },
            redirect: {
                name: 'import.export.order.index.import'
            },
            children: {
                import: {
                    component: 'import-order-view',
                    path: 'import',
                    meta: {
                        parentPath: 'import-export-order.index',
                    }
                },
                export: {
                    component: 'export-order-view',
                    path: 'export',
                    meta: {
                        parentPath: 'import-export-order.index',
                    }
                }
            }
        },
    },

    navigation: [{
        label: 'navigation.label',
        color: '#ffffff',
        path: 'import.export.order.index',
        icon: 'default-action-move-file',
        position: 100,
        parent: 'sw-order'
    }],

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB,
    },

});

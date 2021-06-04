import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'ele_basic_call_to_action',
    label: 'elements.label',
    component: 'sw-cms-el-basic-call-to-action',
    configComponent: 'sw-cms-el-config-basic-call-to-action',
    previewComponent: 'sw-cms-el-preview-basic-call-to-action',
    defaultConfig: {
        title: {
            source: 'static',
            value: 'Title',
        },
        content: {
            source: 'static',
            value: `
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat</p>
            `.trim()
        },
        verticalAlign: {
            source: 'static',
            value: null
        },
        gsymbolcolor: {
            source: 'static',
            value: '#082F25',
        },
        gsymbol: {
            source: 'static',
            value: 'symbol1',
        },
        gsymbolsize: {
            source: 'static',
            value: '120px',
        },
        linkBool: {
            source: 'static',
            value: true,
        },
        btnText: {
            source: 'static',
            value: 'View',
        },
        btnUrl: {
            source: 'static',
            value: '',
        },
        newTab: {
            source: 'static',
            value: false,
        },
        media: {
            source: 'static',
            value: null,
            required: true,
            entity: {
                name: 'media'
            }
        },
        imagePosition: {
            source: 'static',
            value: 'right',
        },
        mediaMaxWidth: {
            source: 'static',
            value: '',
        },
    },
    slots: {
        image: {
            type: 'image',
            default: {
                config: {
                    displayMode: { source: 'static', value: 'standard' }
                },
                data: {
                    media: {
                        url: '/administration/static/img/cms/preview_mountain_large.jpg'
                    }
                }
            }
        }

    }
})

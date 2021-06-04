import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
  name: 'basic-call-to-action',
  label: 'elements.label',
  category: 'text-image',
  component: 'sw-cms-block-basic-call-to-action',
  previewComponent: 'sw-cms-preview-basic-call-to-action',
  defaultConfig: {
    marginBottom: '20px',
    marginTop: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    sizingMode: 'boxed',
  },
  slots: {
      block: 'ele_basic_call_to_action'
  },
})

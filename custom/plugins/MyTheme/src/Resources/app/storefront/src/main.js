import ProductPlugin from './product-plugin/product-plugin.plugin'

// Register your plugin via the existing PluginManager
const PluginManager = window.PluginManager;
PluginManager.register('ProductPlugin', ProductPlugin, '[data-product-detail-plugin]');

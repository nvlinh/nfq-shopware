import template from './export-order.html.twig';
import './export-order.scss';

const { Criteria } = Shopware.Data;

Shopware.Component.register('export-order-view', {
    template,

    inject: [
        'repositoryFactory'
    ],

    data(){
        return {
            fromDate: new Date('2018-01-01T00:00:00').toISOString(),
            toDate: new Date().toISOString(),
            httpClient: null,
            lastExportAt: '',
            errorMessage: null,
            exportRunning: false,
            exportPageIndex: 1,
            exportPageSize: 500,
            exportRows: []
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    methods: {
        reloadContent() {
            this.$refs.activityGrid.fetchActivities();
        },

        formatDate(date) {
            if (typeof date === 'string') {
                return date;
            }
            return `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${date.getDate()}`;
        },

        formatAddress(address) {
            return [address.street, address.city, address.zipcode, address.country.name].join(', ');
        },

        csvToString(heading, rows) {
            let string = [heading.join(',')]

            rows.forEach((row) => {
                string.push(row.join(','));
            });

            return string.join('\n');
        },

        generateCsv() {
            let blob = new Blob([this.csvToString([
                'Order number',
                'Order date',
                'Payment date',
                'Order total',
                'Order status',
                'Payment status',
                'Item number',
                'Item name',
                'Quantity',
                'Item price',
                'VAT rate',
                'Shipping address',
                'Shipping cost',
                'Shipment date',
                'Shipping method chosen',
                'Delivery status',
                'Manufacturer',
                'MPN',
                'EAN',
            ], this.exportRows)], { type: 'text/csv;charset=utf8;' });

            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, 'order-export.csv');
            } else {
                let link = document.createElement("a");
                link.href = URL.createObjectURL(blob);

                link.setAttribute('visibility', 'hidden');
                link.download = 'order-export.csv';

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            this.exportRunning = false;
        },

        startExport(){
            console.log("=startExport");
            this.exportPageIndex = 1;
            this.exportRows = [];
            this.exportRunning = true;

            const criteria = new Criteria(this.exportPageIndex, this.exportPageSize);

            criteria.addFilter(Criteria.range('orderDate', {
                gte: this.formatDate(this.fromDate),
                lte: this.formatDate(this.toDate)
            }));

            criteria.addSorting(Criteria.sort('orderDateTime', 'DESC'));
            criteria.addAssociation('addresses');
            criteria.addAssociation('addresses.country');
            criteria.addAssociation('lineItems');
            criteria.addAssociation('lineItems.product.manufacturer');
            criteria.addAssociation('salesChannel');
            criteria.addAssociation('orderCustomer');
            criteria.addAssociation('currency');
            criteria.addAssociation('transactions');
            criteria.addAssociation('deliveries');
            criteria.addAssociation('deliveries.shippingMethod');
            criteria.addAssociation('deliveries.shippingOrderAddress.country');
            criteria.addAssociation('stateMachineState');
            criteria.getAssociation('transactions').addSorting(Criteria.sort('createdAt'));

            const orderRepository = this.repositoryFactory.create('order');
            orderRepository.search(criteria, Shopware.Context.api).then((response) => {
                let resultCount = 0;
                // --- add result to export
                response.forEach((order) => {
                    ++ resultCount;
                    try {
                        let delivery = order.deliveries[0],
                            transaction = order.transactions[0],
                            stateMachineState = order.stateMachineState;
                        order.lineItems.forEach((line) => {
                            try {
                                let productNumber = line.payload.productNumber || '',
                                    unitPrice = line.price ? line.price.unitPrice : 0,
                                    taxRate = (line.price.taxRules && line.price.taxRules.length > 0 && line.price.taxRules[0]) ? line.price.taxRules[0].taxRate : 0,
                                    manufacturer,
                                    MPN,
                                    EAN;
                                if (typeof(line.product && line.product.manufacturer) == 'undefined') {
                                    manufacturer = "";
                                } else {
                                    manufacturer = line.product.manufacturer.translated.name
                                }
                                if (line.product && line.product.manufacturerNumber == null ||
                                    typeof(line.product && line.product.manufacturerNumber) == 'undefined') {
                                    MPN = "";
                                } else {
                                    MPN = line.product.manufacturerNumber
                                }
                                if (line.product && line.product.ean == null ||
                                    typeof(line.product && line.product.ean) == 'undefined') {
                                    EAN = "";
                                } else {
                                    EAN = line.product.ean
                                }
                                const row = [
                                    order.orderNumber,
                                    order.createdAt,
                                    transaction.updatedAt,
                                    order.price.totalPrice,
                                    stateMachineState.technicalName,
                                    transaction.stateMachineState.translated.name,
                                    productNumber,
                                    '"' + line.label + '"',
                                    line.quantity,
                                    unitPrice,
                                    taxRate,
                                    '"' + this.formatAddress(delivery.shippingOrderAddress) + '"',
                                    order.shippingCosts.totalPrice,
                                    delivery.stateMachineState.technicalName === 'shipped' ? delivery.updatedAt : '',
                                    delivery.shippingMethod.translated.name,
                                    delivery.stateMachineState.translated.name,
                                    manufacturer,
                                    MPN,
                                    EAN
                                ];
                                this.exportRows.push(row);
                            } catch(e) {
                                console.error('Failed to export line item ' + line.payload.productNumber, e);
                            }
                        });
                    } catch(e) {
                        console.error('Failed to export order ' + order.orderNumber, e);
                    }
                })

                if (resultCount < this.exportPageSize) {
                    // --- generate and return the CSV
                    return this.generateCsv();
                } else {
                    ++ this.exportPageIndex;
                    //return this.exportPage();
                }
            }).catch((err) => {
                // --- error handling
                console.error('Export error', err);
                this.exportRunning = false;
                this.$emit('reset');
            });
        }
    }
});

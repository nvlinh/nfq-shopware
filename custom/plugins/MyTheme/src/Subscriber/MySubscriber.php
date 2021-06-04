<?php declare(strict_types=1);

namespace MyTheme\Subscriber;

use Psr\Log\LoggerInterface;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityLoadedEvent;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Aggregation\Metric\CountAggregation;
use Shopware\Core\Framework\DataAbstractionLayer\Search\AggregationResult\Metric\CountResult;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Shopware\Storefront\Pagelet\Footer\FooterPageletLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Shopware\Core\Content\Product\ProductEvents;

class MySubscriber implements EventSubscriberInterface
{
    /**
     * @var SystemConfigService
     */
    private SystemConfigService $systemConfigService;

    private LoggerInterface $logger;

    /**
     * @var EntityRepositoryInterface
     */
    private $productRepository;


    public function __construct(
        EntityRepositoryInterface $productRepository,
        SystemConfigService $systemConfigService,
        LoggerInterface $logger
    )
    {
        $this->systemConfigService = $systemConfigService;
        $this->logger = $logger;
        $this->productRepository = $productRepository;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            FooterPageletLoadedEvent::class => 'addActiveProductCount',
            //ProductEvents::PRODUCT_LOADED_EVENT => 'onProductsLoaded'
        ];
    }

    public function addActiveProductCount(FooterPageletLoadedEvent $event): void
    {
        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('product.active', true));
        $criteria->addAggregation(new CountAggregation('productCount', 'product.id'));

        /** @var CountResult $productCountResult */
        $productCountResult = $this->productRepository
            ->aggregate($criteria, $event->getContext())
            ->get('productCount');

        $event->getPagelet()->addExtension('product_count', $productCountResult);
    }
}

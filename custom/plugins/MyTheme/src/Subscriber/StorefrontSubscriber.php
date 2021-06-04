<?php declare(strict_types=1);

namespace MyTheme\Subscriber;

use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\System\Tag\TagCollection;
use Shopware\Storefront\Page\Product\ProductPageLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class StorefrontSubscriber implements EventSubscriberInterface
{
    /**
     * @var EntityRepositoryInterface
     */
    protected $tagRepository;

    public function __construct(
        EntityRepositoryInterface $tagRepository
    )
    {
        $this->tagRepository = $tagRepository;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            ProductPageLoadedEvent::class => 'onProductPageLoadedEvent'
        ];
    }

    public function onProductPageLoadedEvent(ProductPageLoadedEvent $event): void
    {
        $tagIds = $event->getPage()->getProduct()->getTagIds();
        if (empty($tagIds)) {
            return;
        }

        $criteria = new Criteria($tagIds);

        /** @var TagCollection $tags */
        $tags = $this->tagRepository->search($criteria, $event->getContext())->getEntities();

        $event->getPage()->getProduct()->addExtension('tags', $tags);
    }
}

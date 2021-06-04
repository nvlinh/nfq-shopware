<?php declare(strict_types=1);

namespace SwagBrand\Core\Api;

use Faker\Factory;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\Filter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\NotFilter;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\Country\CountryEntity;
use Shopware\Core\System\Country\Exception\CountryNotFoundException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @RouteScope(scopes={"api"})
 */
class TestController extends AbstractController
{
    private EntityRepositoryInterface $countryRepository;
    private EntityRepositoryInterface $brandRepository;

    public function __construct(EntityRepositoryInterface $countryRepository)
    {
        $this->countryRepository = $countryRepository;
        $this->brandRepository = $brandRepository;
    }

    /**
     * @Route("/api/swag-brand/my-api-action", name="api.action.swag-brand.my-api-action", methods={"GET"})
     */
    public function myFirstApi(): JsonResponse
    {
        return new JsonResponse(['You successfully created your first controller route']);
    }

    /**
     * @Route("/api/_action/swag-brand/generate", name="api.custom.swag_brand.generate", methods={"GET"})
     * @param Context $context
     * @return Response
     */
    public function generate(Context $context): Response
    {
//        $criteria = new Criteria();
//        //$criteria->addFilter(new EqualsFilter('name', 'HCM'));
//        $criteria->addFilter(
//            new NotFilter(
//                NotFilter::CONNECTION_OR,
//                [
//                    new EqualsFilter('name', 'HCM'),
//                ]
//            )
//        );
        //$data = $this->brandRepository->search($criteria, $context);


        $faker = Factory::create();
        $country = $this->getActiveCountry($context);
        $data = [];

        for ($i = 0; $i < 10; $i++) {
            $data[] = [
                'id' => Uuid::randomHex(),
                'name' => $faker->name,
                'street' => $faker->streetAddress,
            ];
        }

        return new Response('', Response::HTTP_NO_CONTENT);
    }

    private function getActiveCountry(Context $context): CountryEntity
    {
        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('active', 1));
        $criteria->setLimit(1);

        $country = $this->countryRepository->search($criteria, $context)->getEntities()->first();
        if ($country === null) {
            throw new CountryNotFoundException('');
        }

        return $country;
    }
}

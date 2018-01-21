<?php

namespace App\Repository;

use App\Entity\Figure;
use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class FigureRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Figure::class);
    }
    
    public function findAllMessages()
	{
    return $this->createQueryBuilder('p')
        // p.category refers to the "category" property on product
        ->innerJoin('p.category', 'c')
        // selects all the category data to avoid the query
        ->addSelect('c')
        ->andWhere('p.id = :id')
        ->setParameter('id', $productId)
        ->getQuery()
        ->getResult();
	}

}

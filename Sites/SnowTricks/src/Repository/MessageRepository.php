<?php

namespace App\Repository;

use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class MessageRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Message::class);
    }

    
    public function findMessageByFigure($figure_id)
    {
		return $this->createQueryBuilder('message')
        ->where('message.figure = :figure')
    	->setParameter('figure', '2017-01-14')
    	//->orderBy('p.price', 'ASC')
        ->getQuery()
        ->getResult();
    }
    
}













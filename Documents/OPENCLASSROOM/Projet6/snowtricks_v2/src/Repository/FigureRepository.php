<?php
namespace App\Repository;
use App\Entity\Tag;
use App\Entity\Figure;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;


class FigureRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Figure::class);
    }
    
    
	/**
     * @param $difficulty
     * @return Figure[]
     */
    public function findAllMoreDifficultThan($difficulty): array
    {
        $qb = $this->createQueryBuilder('f')
            ->andWhere('f.difficulty > :difficulty')
            ->setParameter('difficulty', $difficulty)
            ->orderBy('f.difficulty', 'ASC')
            ->getQuery();

        return $qb->execute();
	}
	
	
	
	
	/**
     * @param $difficulty
     * @return Figure[]
     */
    public function findAllWhoseCreatorIs($creatorName): array
    {
         $qb = $this->createQueryBuilder('f')
         	->innerJoin('f.snowboarder', 's')
         	->addSelect('s')
         	->andWhere('s.name = :creatorName')
         	->setParameter('creatorName', $creatorName)
            ->getQuery();

        return $qb->execute();
	}
	
	
	
	
}







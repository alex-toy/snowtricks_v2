<?php
namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Form\Extension\Core\Type\DateType;




/**
 * @ORM\Entity(repositoryClass="App\Repository\CommentRepository")
 */
class Comment
{
    
    
    
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;
    public function getId()
    {
        return $this->id;
    }
    
    
    
    
    
    
    /**
     * @ORM\Column(type="string", length=500, name="contenu")
     */
    private $contenu;
    public function getContenu()
    {
        return $this->contenu;
    }
    public function setContenu($contenu)
    {
        $this->contenu = $contenu;
    }
    
    
    
    
    
    
    
    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Figure", inversedBy="comments")
     * @ORM\JoinColumn(nullable=true)
     */
    private $figure;
    
    public function getFigure(): Figure
    {
        return $this->figure;
    }
    public function setFigure(Figure $figure)
    {
        $this->figure = $figure;
    }
    
    
    
    
    
    
    
    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Snowboarder", inversedBy="comments")
     * @ORM\JoinColumn(nullable=true)
     */
    private $snowboarder;
    
    public function getSnowboarder(): Snowboarder
    {
        return $this->snowboarder;
    }
    public function setSnowboarder(Snowboarder $snowboarder)
    {
        $this->snowboarder = $snowboarder;
    }
    
    
    
    /**
     * @ORM\Column(type="date", length=500, name="dateCreation")
     * @Assert\DateTime()
     */
    private $dateCreation;
    public function getDateCreation()
    {
        return $this->dateCreation;
    }
    public function setDateCreation($dateCreation)
    {
        $this->dateCreation = $dateCreation;
    }
    
    
    
    
    
}




























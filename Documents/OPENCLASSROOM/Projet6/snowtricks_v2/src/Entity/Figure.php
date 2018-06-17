<?php
namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\FigureRepository")
 */
class Figure
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
	 * @Assert\NotBlank()
     * @ORM\Column(type="string", length=100)
     */
    private $name;
    public function getName()
    {
        return $this->name;
    }
    public function setName($name)
    {
        $this->name = $name;
    }
    
    
    
    /**
     * @Assert\DateTime()
     */
    private $createdAt;
    public function getCreatedAt()
    {
        return $this->createdAt;
    }
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }
      
    
    
    
    /**
     * @ORM\Column(type="string", length=500)
     */
    private $description;
    public function getDescription()
    {
        return $this->description;
    }
    public function setDescription($description)
    {
        $this->description = $description;
    }
    
    
    
    
    /**
     * @ORM\Column(type="string")
     *
     * @Assert\NotBlank(message="Please, upload the image as a jpeg file.")
     * @Assert\File(mimeTypes={ "image/jpeg" })
     */
    private $mainimage;
    public function getMainimage()
    {
        return $this->mainimage;
    }
    public function setMainimage($mainimage)
    {
        $this->mainimage = $mainimage;
        return $this;
    }
    
    
    
    
    /**
     * @ORM\Column(type="decimal", scale=2)
     */
    private $difficulty;
    public function getDifficulty()
    {
        return $this->difficulty;
    }
    public function setDifficulty($difficulty)
    {
        $this->difficulty = $difficulty;
    }
    
    
    
    
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Tag", mappedBy="figure", cascade={"persist"}, orphanRemoval=true)
     */
    protected $tags;
	public function getTags()
    {
        return $this->tags;
    }
    public function addTag(Tag $tag)
    {
        $tag->setFigure($this);
		$this->tags->add($tag);  
    }
	public function removeTag(Tag $tag)
    {
        $this->tags->removeElement($tag);
		return $this;
    }
    
    
    
    
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="figure", orphanRemoval=true, cascade={"persist"})
     */
    private $comments;
    /**
     * @return Collection|Comment[]
     */
    public function getComments()
    {
        return $this->comments;
    }
    
    
    
   
    
    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->messages = new ArrayCollection();
    }
    
    
    
    
}

?>

















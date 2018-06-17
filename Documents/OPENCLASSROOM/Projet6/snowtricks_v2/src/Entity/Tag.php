<?php
namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;


/**
 * @ORM\Entity(repositoryClass="App\Repository\TagRepository")
 */
class Tag
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
     * @ORM\Column(type="string")
     *
     * @Assert\File(mimeTypes={ "image/jpeg" })
     */
    private $image;
    public function getImage()
    {
        return $this->image;
    }
    public function setImage($image)
    {
        $this->image = $image;
        return $this;
    }
    
    
    
    
    
    /**
     * @ORM\Column(type="string")
     *
     * @Assert\File(mimeTypes={ "video/mp4" })
     */
    private $video;
    public function getVideo()
    {
        return $this->video;
    }
    public function setVideo($video)
    {
        $this->image = $video;
        return $this;
    }
    
    


    
    
    /**
     * @ORM\Column(type="string", length=500)
     */
    private $explanation;
    public function getExplanation()
    {
        return $this->explanation;
    }
    public function setExplanation($explanation)
    {
        $this->explanation = $explanation;
    }
    
    
    
    
    
    
    
    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Figure", inversedBy="tags", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $figure;
	public function getFigure(): ?Figure
    {
        return $this->figure;
    }
	public function setFigure(?Figure $figure): self
    {
        $this->figure = $figure;
		return $this;
    }
    
    
    
    
}






















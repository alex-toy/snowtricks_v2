<?php
namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;




/**
 * @ORM\Entity(repositoryClass="App\Repository\SnowboarderRepository")
 */
class Snowboarder
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;
    
    /**
	 * @Assert\NotBlank()
     * @ORM\Column(type="string", length=100)
     */
    private $name;
    
    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     */
    private $password;
    
    
    /**
	 * @Assert\NotBlank()
     * @ORM\Column(type="string", length=100)
     */
    private $email;
    
    
    /**
     * @ORM\Column(type="float", length=100)
     */
    private $token;
    
    
    
    /**
     * @ORM\Column(type="boolean")
     */
    private $isValidated;
    
    
    
    
    function __construct() {
        $this->setToken();
        $this->unValidateAccount();
    }
    
    
    public function getId()
    {
        return $this->id;
    }
    public function getName()
    {
        return $this->name;
    }
    public function setName($name)
    {
        $this->name = $name;
    }
    
    public function getPassword()
    {
        return $this->password;
    }
    public function setPassword($password)
    {
        $this->password = $password;
    }
    
    
    public function getEmail()
    {
        return $this->email;
    }
    public function setEmail($email)
    {
        $this->email = $email;
    }
    
    
    public function getToken()
    {
        return $this->token;
    }
    public function setToken()
    {
        $this->token = time() . $this->getId();
    }
    
    
    public function isValidated()
    {
        return $this->isValidated;
    }
    public function ValidateAccount()
    {
        $this->isValidated = true;
    }
    public function unValidateAccount()
    {
        $this->isValidated = false;
    }
    
    
    
    
    
    /**
     * @ORM\Column(type="string")
     *
     * @Assert\NotBlank(message="Please, upload the image as a jpeg file.")
     * @Assert\File(mimeTypes={ "image/jpeg" })
     */
    private $portrait;
    public function getPortrait()
    {
        return $this->portrait;
    }
    public function setPortrait($portrait)
    {
        $this->portrait = $portrait;
        return $this;
    }
    
    
    
    
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="snowboarder", orphanRemoval=true, cascade={"persist"})
     */
    private $comments;
    /**
     * @return Collection|Comment[]
     */
    public function getComments()
    {
        return $this->comments;
    }
    
    
    
    
    
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Figure", mappedBy="snowboarder", orphanRemoval=true, cascade={"persist"})
     */
    private $figures;
    /**
     * @return Collection|Figure[]
     */
    public function getFigures()
    {
        return $this->figures;
    }
    
    
    
    
    
    
}























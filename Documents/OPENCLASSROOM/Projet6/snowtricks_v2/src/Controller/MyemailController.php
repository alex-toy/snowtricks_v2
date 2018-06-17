<?php
namespace App\Controller;
//require_once '/Users/alexei/Documents/OPENCLASSROOM/Projet6/SnowTricks/vendor/autoload.php';


use Symfony\Component\Finder\Finder;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\Forms;
use Symfony\Component\Form\Extension\HttpFoundation\HttpFoundationExtension;
use Symfony\Component\Form\Extension\HttpFoundation\HttpFoundationRequestHandler;
use Symfony\Component\Form\RequestHandlerInterface;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Twig\Environment;

use App\Entity\Image;
use App\Entity\Figure;
use App\Entity\Message;
use App\Entity\Myemail;

//use Symfony\Component\Validator\Constraints\Email;

use App\Form\MyemailType;



class MyemailController extends Controller
{
   
   	/**
     * @Route("/sendMail", name="sendMail")
     */
   	public function index($name = "alex", \Swift_Mailer $mailer, Request $request)
	{
    
    	$email = new Myemail();
    	$mailform = $this->createForm(MyemailType::class, $email);
		
		
		$mailform->handleRequest($request);
		if ($mailform->isSubmitted() && $mailform->isValid()) {
         	$email = $mailform->getData();
        	
         	$message = (new \Swift_Message('Hello Email'))
        	->setFrom($email->getFrom())
        	->setTo('alexei.80@hotmail.fr')
        	->setBody($email->getBody());
        	$mailer->send($message);
        	
         	
         	$this->addFlash('messages', 'Merci pour votre message, ' . $email->getName() . '!!' );
        	
         	return $this->redirectToRoute('index');
     	}
    
    
    	return $this->render('emails/registration.html.twig', array(
        	'form' => $mailform->createView(),
    	));
    

    return $this->redirectToRoute('index');
}
    
    
    
    
	
	
	
	
	
    
    

	
   
}

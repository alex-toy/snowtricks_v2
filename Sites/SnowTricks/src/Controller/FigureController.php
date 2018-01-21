<?php

namespace App\Controller;

require_once '/Users/alexei/Sites/SnowTricks/vendor/autoload.php';

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

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;

use Symfony\Component\HttpFoundation\Session\SessionInterface;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;



use App\Entity\Figure;
use App\Entity\Message;


class FigureController extends Controller
{
    /**
     * @Route("/figures", name="figures")
     */
    public function index(SessionInterface $session)
    {
        $session->set('foo', 'bar');

    	// get the attribute set by another controller in another request
    	$foobar = $session->get('foobar');

    	// use a default value if the attribute doesn't exist
    	$filters = $session->get('filters', array());
        
        
        $repository = $this->getDoctrine()->getRepository(Figure::class);
		$figures = $repository->findAll();
		//echo $figures[0]->getDescription();

        return $this->render('accueil/figures.html.twig', ['figures' => $figures]); 
    }
    
    
    
    /**
 	* @Route("/figure/{id}", name="figure_show")
 	*/
	public function showFigureByIdAction($id, Request $request)
	{
    $figure = $this->getDoctrine()
        ->getRepository(Figure::class)
        ->find($id);
        
	$messages = $figure->getMessages();
         

    if (!$figure) {
        throw $this->createNotFoundException(
            'No figure found for id '.$id
        );
    }
    
    $message = new Message();

    $form = $this->createFormBuilder($message)
    ->add('contenu',     TextType::class)
    ->add('author',     TextType::class)
    //->add('dateCreation',     DateType::class)
	->add('save',      SubmitType::class)
    ->getForm();

	$form->handleRequest($request);

	if ($form->isSubmitted() && $form->isValid()) {
        $message = $form->getData();
        $message->setFigure($figure);

        $em = $this->getDoctrine()->getManager();
        $em->persist($message);
        $em->flush();
        	
        //$this->addFlash('creation_figure', 'Vous venez de créer une figure!!' );

        return $this->redirectToRoute('figures');
    	}

    return $this->render('accueil/showfigure.html.twig', ['figure' => $figure, 'messages' => $messages, 'form' => $form->createView()]);
	}
	
	

	
	/**
 	* @Route("/createfigure", name="createfigure")
 	*/
	public function createFigureAction(Request $request)
	{
		$figure = new Figure();

    	$form = $this->createFormBuilder($figure)
        ->add('name',     TextType::class)
    	->add('description',   TextareaType::class)
    	->add('difficulty', ChoiceType::class, array(
    		'choices'  => array(
        	'1' => 1,
        	'2' => 2,
        	'3' => 3,
        	'4' => 4,
        	'5' => 5,
        	'6' => 6,
        	'7' => 7,
        	'8' => 8,
        	'9' => 9,
        	'10' => 10,
    	),
		)) //difficulté
		->add('save',      SubmitType::class)
        ->getForm();

		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
        	$figure = $form->getData();

        	$em = $this->getDoctrine()->getManager();
        	$em->persist($figure);
        	$em->flush();
        	
        	$this->addFlash('creation_figure', 'Vous venez de créer une figure!!' );

        	//return $this->redirectToRoute('figure/' . $figure->getId());  Pourquoi ça ne marche pas???
        	return $this->redirectToRoute('figures');
    	}

    return $this->render('accueil/createfigure.html.twig', array(
        'form' => $form->createView(),
    ));
		
	}
	
	
	
	
	/**
 	* @Route("/modifyfigure/{id}", name="modifyfigure")
 	*/
	public function modifyfigureAction(Request $request, $id)
	{
		echo $id;
		$em = $this->getDoctrine()->getManager();
		$figure = $em->getRepository(Figure::class)->find($id);

    	$form = $this->createFormBuilder($figure)
        ->add('name',     TextType::class)
    	->add('description',   TextareaType::class)
    	->add('difficulty', ChoiceType::class, array(
    		'choices'  => array(
        	'1' => 1,
        	'2' => 2,
        	'3' => 3,
        	'4' => 4,
        	'5' => 5,
        	'6' => 6,
        	'7' => 7,
        	'8' => 8,
        	'9' => 9,
        	'10' => 10,
    	),
		)) //difficulté
		->add('save',      SubmitType::class)
        ->getForm();
				
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {        	
        	$figure_form = $form->getData();
        	$figure->setName($figure_form->getName());
        	$figure->setDescription($figure_form->getDescription());
        	$figure->setDescription($figure_form->getDescription());
        	$figure->setDifficulty($figure_form->getDifficulty());
        	
        	$em->flush();
        	
        	$this->addFlash('modification_figure', 'Vous venez de modifier une figure!!' );

        	
        	return $this->redirectToRoute('figures');
    	}
    
    //return $this->redirectToRoute('figure/' . $figure->getId());  Pourquoi ça ne marche pas???	
    return $this->render('accueil/modifyfigure.html.twig', array(
        'form' => $form->createView(),
    ));
		
	}
	
	
	
	/**
 	* @Route("/deletefigure/{id}", name="deletefigure")
 	*/
	public function deletefigureAction($id)
	{
		$em = $this->getDoctrine()->getManager();
    	$figure = $em->getRepository(Figure::class)->find($id);
		
		$em->remove($figure);
		$em->flush();

    	return $this->redirectToRoute('figures');
	}
	

	
   
}




















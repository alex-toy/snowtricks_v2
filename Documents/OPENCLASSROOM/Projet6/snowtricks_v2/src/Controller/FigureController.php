<?php
namespace App\Controller;

use App\Entity\Figure;
use App\Entity\Tag;
use App\Entity\Comment;
use App\Entity\Snowboarder;
use App\Form\FigureType;
use App\Form\ModifyFigureType;
use App\Form\CommentType;

use App\Form\AddTagToFigureType;
use App\Form\RemoveTagType;
use App\Form\ModifyTagType;
use App\Form\SearchType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\Routing\Annotation\Route;

use App\Service\RemoveTagGenerator;

class FigureController extends Controller
{
    
    
    /**
     * @Route("/index", name="index")
     */
    public function index(){
          
        $repository = $this->getDoctrine()->getRepository(Figure::class);
		$figures = $repository->findAll(['createdAt' => 'ASC']);
		
		return $this->render('accueil/figures.html.twig', 
		[
         	'figures' => $figures,
        	'numberFigures' => count($figures)
        ]); 
    }
    
    
    
    
    
    /**
      * @Route("/createfigure", name="createfigure")
      */
    public function createfigure(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $figureRepository = $this->getDoctrine()->getRepository(Figure::class);
        $figures = $figureRepository->findAll();
        
        
        $snowboarderRepository = $this->getDoctrine()->getRepository(Snowboarder::class);
        $session = $request->getSession();
        $snowboarder = $snowboarderRepository->findOneby(array('id' => $session->get('id') ));
        
        
        $figure = new Figure();
        $tags = Array();
        $form = $this->createForm(FigureType::class, $figure);
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
        	$figure = $form->getData();
        	
        	$figure->setCreatedAt( new \DateTime('now') );
        	
        	$mainfile = $figure->getMainimage();
 			$mainfileName = $this->generateUniqueFileName().'.'.$mainfile->guessExtension();
 			$mainfile->move( $this->getParameter('images_directory'), $mainfileName );
 			$figure->setMainimage($mainfileName);
 			$figure->setSnowboarder($snowboarder);
        	
        	
        	$tags = $figure->getTags();
        	foreach($tags as $tag){
				$file = $tag->getImage();
 				$fileName = $this->generateUniqueFileName().'.'.$file->guessExtension();
 				$file->move( $this->getParameter('images_directory'), $fileName );
 				$tag->setImage($fileName);
				$em->persist($tag);
			}
        	
        	$em->persist($figure);
        	$em->flush();
        	
        	$this->addFlash('messages', 'Félicitation, vous venez de créer la figure ' . $figure->getName() . '!!' );

        	return $this->redirectToRoute('index');
    	}
        
        return $this->render('accueil/createfigure.html.twig', array(
            'form' => $form->createView(),
            'figures' => $figures,
        ));
    }
    
    
    
    
    
    /**
 	* @Route("/figure/{figureId}", name="figure")
 	*/
	public function figure($figureId, Request $request)
	{
	
		$em = $this->getDoctrine()->getManager();
        
        $figureRepository = $this->getDoctrine()->getRepository(Figure::class);
        $figure = $figureRepository->findOneby(array('id' => $figureId));
        
        $snowboarderRepository = $this->getDoctrine()->getRepository(Snowboarder::class);
        
        $tagRepository = $this->getDoctrine()->getRepository(Tag::class);
        $tags = $tagRepository->findAll();
		
		$comments = $figure->getComments();
		
		$tagform = $this->get("form.factory")
			->createNamedBuilder( $figureId, AddTagToFigureType::class, new Tag() )
			->getForm();
		$tagformview = $tagform->createView();
		$tagform->handleRequest($request);
		if ($tagform->isSubmitted() && $tagform->isValid()) {
            	
            	$tagtest = new Tag();
            	$tagtest = $tagform->getData();
            	
            	if($tagtest->getImage()){
            		$file = $tagtest->getImage();
 					$fileName = $this->generateUniqueFileName().'.'.$file->guessExtension();
 					$file->move( $this->getParameter('images_directory'), $fileName );
 					$tagtest->setImage($fileName);
 				} else {
 					//image par défault
 				}
 				
 				$tagtest->setFigure($figure);
            	$figure->addTag($tagtest);
 				
 				$em->persist($tagtest);
 				$em->persist($figure);
 				$em->flush();
            	
 				return $this->redirectToRoute('figure', array('figureId' => $figureId ));
         }
		
		
		
		$removetagforms = array();
        $removetagformviews = array();
        foreach($tags as $tag){
			
			$tagtempRemove = $this->get("form.factory")->createNamedBuilder( $tag->getId(), RemoveTagType::class, new Tag() );
			$tagtempRemoveForm = $tagtempRemove->getForm();
			
			
			$removetagforms[$tag->getId()] = $tagtempRemoveForm;
			$removetagformviews[$tag->getId()] = $tagtempRemoveForm->createView();
			
		}
        foreach($removetagforms as $removetagform){
        	$removetagform->handleRequest($request);
        	if($removetagform->isSubmitted() ) {
            	
            	foreach($tags as $tag){
            		if ($request->request->has($tag->getId())) {
            			$tagId = $tag->getId();
            		}
            	}
            	$tagToRemove = $tagRepository->findOneBy(['id' => $tagId ]);
            	if (!$tagToRemove) { throw $this->createNotFoundException( 'No tag found for id '. $tagId ); }
            	
 				$em->remove($tagToRemove);
 				$em->flush();
 				
 				return $this->redirectToRoute('figure', array('figureId' => $figureId ));
            	
            }
        }
        
        $modifytagforms = array();
        $modifytagformviews = array();
        foreach($tags as $tag){
			
			$tagtempModify = $this->get("form.factory")->createNamedBuilder( 'modif'.$tag->getId(), ModifyTagType::class, new Tag() );
			$tagtempModifyForm = $tagtempModify->getForm();
			
			$modifytagforms['modif'.$tag->getId()] = $tagtempModifyForm;
			$modifytagformviews['modif'.$tag->getId()] = $tagtempModifyForm->createView();
			
		}
        foreach($modifytagforms as $modifytagform){
        	$modifytagform->handleRequest($request);
        	if($modifytagform->isSubmitted() ) {
            	echo 'test';
            	foreach($tags as $tag){
            		if ($request->request->has('modif'.$tag->getId())) {
            			$tagId = $tag->getId();
            		}
            	}
            	$tagFromForm = $modifytagform->getData();
            	$tagToModify = $tagRepository->findOneBy(['id' => $tagId ]);
            	if (!$tagToModify) { throw $this->createNotFoundException( 'No tag found for id '. $tagId ); }
            	
 				$tagToModify->setExplanation($tagFromForm->getExplanation());
 				
 				$file = $tagFromForm->getImage();
 				$fileName = $this->generateUniqueFileName().'.'.$file->guessExtension();
 				$file->move( $this->getParameter('images_directory'), $fileName );
 				$tagToModify->setImage($fileName);
 				
 				
 				$em->persist($tagToModify);
 				$em->flush();
 				
 				return $this->redirectToRoute('figure', array('figureId' => $figureId ));
 				
 			}
        }
			
			
		
         
		if (!$figure) {
			throw $this->createNotFoundException(
				'No figure found for id '.$id
			);
		}
	
		$comment = new Comment();
		$form = $this->createForm(CommentType::class, $comment);
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			
			$commentData = $form->getData();
			$commentData->setFigure($figure);
			$session = $request->getSession();
			$snowboarder = $snowboarderRepository->findOneby(array('id' => $session->get('id') ));
			$commentData->setSnowboarder($snowboarder);
			$commentData->setDateCreation( new \DateTime('now') );
			
			//$commentData->setDateCreation( \DateTime::createFromFormat('Y-m-d', date('Y-m-d H:i:s')) );
			
			$em = $this->getDoctrine()->getManager();
			$em->persist($commentData);
			$em->flush();
			
			
			
			
			$this->addFlash('messages', 'Merci, ' . $snowboarder->getName() . ' pour votre commentaire!!' );
			return $this->redirectToRoute('figure', array('figureId' => $figureId ));
		}
		
		
	
		return $this->render('accueil/showfigure.html.twig', 
		[
			'figure' => $figure, 
			'comments' => $comments, 
			'form' => $form->createView(),
			'tagformview' => $tagformview,
			'removetagformviews' => $removetagformviews,
			'modifytagformviews' => $modifytagformviews,
		]);
		
		
	
		
	}
	
	
	
	
	
	/**
 	* @Route("/modifyfigure/{id}", name="modifyfigure")
 	*/
	public function modifyfigure(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();
		$figure = $em->getRepository(Figure::class)->find($id);
    	//$form = $this->createForm(FigureType::class, $figure);
    	
    	
    	$modifiedfigure = new Figure();
        $form = $this->createForm(ModifyFigureType::class, $modifiedfigure);
    	$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
         	$modifiedfigure = $form->getData();
         	
         	$figure->setName($modifiedfigure->getName());
         	$figure->setDescription($modifiedfigure->getDescription());
         	$figure->setDifficulty($modifiedfigure->getDifficulty());
         	
         	$file = $modifiedfigure->getMainimage();
 			$fileName = $this->generateUniqueFileName().'.'.$file->guessExtension();
 			$file->move( $this->getParameter('images_directory'), $fileName );
 			$figure->setMainimage($fileName);
         	
         	$em->persist($figure);
         	$em->flush();
         	
         	$this->addFlash('messages', 'Vous venez de modifier la figure ' . $figure->getName() . '!!' );
        	
         	return $this->redirectToRoute('figure', array('figureId' => $id ));
     	}
    
    //return $this->redirectToRoute('figure/' . $figure->getId());
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
    	return $this->redirectToRoute('index');
	}
	
	
	
	
	
	/**
 	* @Route("/search", name="search")
 	*/
	public function search(Request $request){
          
        $repository = $this->getDoctrine()->getRepository(Figure::class);
		$figures = array();
		$figuresByDifficulty = array();
		$figuresByName = array();
		
		$form = $this->createForm(SearchType::class, new Figure());
		$form->handleRequest($request);
		if ($form->isSubmitted()) {
			$diffmin = $form->getData()->getDifficulty();
			$name = $form->getData()->getName();
			
			$figuresByDifficulty = $repository->findAllMoreDifficultThan($diffmin);
			
			$figuresByName = $repository->findAllWhoseCreatorIs($name);
			
			$figures = array_merge($figuresByDifficulty, $figuresByName);
		}
		
        return $this->render('accueil/search.html.twig', 
		[
         	'form' => $form->createView(),
         	'figures' => $figures
        ]); 
    }
    
    
    
    
    
    
    /**
     * @return string
     */
    private function generateUniqueFileName()
    {
        // md5() reduces the similarity of the file names generated by
        // uniqid(), which is based on timestamps
        return md5(uniqid());
    }
    
    
}




































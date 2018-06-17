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
		$figures = $repository->findAll();
		
		
        return $this->render('accueil/figures.html.twig', 
		[
         	'figures' => $figures,
        	'numberFigures' => count($figures)
        ]); 
    }
    
    
    
    
    
    /**
      * @Route("/show/{id}", name="show")
      */
    public function showold($id, Request $request, RemoveTagGenerator $removeTagGenerator)
    {
        $em = $this->getDoctrine()->getManager();
        
        $taskRepository = $this->getDoctrine()->getRepository(Task::class);
        $tasks = $taskRepository->findby(array('id' => $id));
        
        $tagRepository = $this->getDoctrine()->getRepository(Tag::class);
        $tags = $tagRepository->findAll();
        
        
        $tagforms = array();
        $tagformviews = array();
        foreach($tasks as $task){
			
			$temp = $this->get("form.factory")->createNamedBuilder( $task->getId(), AddTagToTaskType::class, new Tag() );
			$tempForm = $temp->getForm();
			
			$tagforms[] = $tempForm;
			$tagformviews[] = $tempForm->createView();
			
			
			
			$tempRemove = $this->get("form.factory")->createNamedBuilder( $task->getId(), RemoveTaskType::class, new Task() );
			$tempRemoveForm = $tempRemove->getForm();
			
			
			$removetaskforms[] = $tempRemoveForm;
			$removetaskformviews[] = $tempRemoveForm->createView();
			
			
		}
		foreach($tagforms as $tagform){
        	$tagform->handleRequest($request);
        	if ($tagform->isSubmitted() && $tagform->isValid()) {
            	
            	foreach($tasks as $task){
            		if ($request->request->has($task->getId())) {
            			$taskId = $task->getId();
            		}
            	}
            	
            	$tagtest = new Tag();
            	$tagtest = $tagform->getData();
            	
            	$task = $taskRepository->findOneBy(['id' => $taskId]);
            	if (!$task) { throw $this->createNotFoundException( 'No task found for id '. $taskId ); }
            	
            	$file = $tagtest->getImage();
 				$fileName = $this->generateUniqueFileName().'.'.$file->guessExtension();
 				$file->move( $this->getParameter('images_directory'), $fileName );
 				$tagtest->setImage($fileName);
 				
 				
 				$tagtest->setTask($task);
            	$task->addTag($tagtest);
 				
 				$em->persist($tagtest);
 				$em->persist($task);
 				$em->flush();
            	
 				
         	}
        }
        
        
        // $removetagforms = array();
//         $removetagformviews = array();
//         foreach($tags as $tag){
// 			
// 			$tagtempRemove = $this->get("form.factory")->createNamedBuilder( $tag->getId(), RemoveTagType::class, new Tag() );
// 			$tagtempRemoveForm = $tagtempRemove->getForm();
// 			
// 			$removetagforms[$tag->getId()] = $tagtempRemoveForm;
// 			$removetagformviews[$tag->getId()] = $tagtempRemoveForm->createView();
// 			
// 		}
//         foreach($removetagforms as $removetagform){
//         	$removetagform->handleRequest($request);
//         	if($removetagform->isSubmitted() ) {
//             	
//             	foreach($tags as $tag){
//             		if ($request->request->has($tag->getId())) {
//             			$tagId = $tag->getId();
//             		}
//             	}
//             	$tagToRemove = $tagRepository->findOneBy(['id' => $tagId ]);
//             	if (!$tagToRemove) { throw $this->createNotFoundException( 'No tag found for id '. $tagId ); }
//             	
//  				$em->remove($tagToRemove);
//  				$em->flush();
//  				
//  			}
//         }
        
        $removeTagGenerator->getRemoveTagForm($tags);
        
        
        
        $modifytagforms = array();
        $modifytagformviews = array();
        foreach($tags as $tag){
			
			$tagtempModify = $this->get("form.factory")->createNamedBuilder( $tag->getId(), ModifyTagType::class, new Tag() );
			$tagtempModifyForm = $tagtempModify->getForm();
			
			$modifytagforms[$tag->getId()] = $tagtempModifyForm;
			$modifytagformviews[$tag->getId()] = $tagtempModifyForm->createView();
			
		}
        foreach($modifytagforms as $modifytagform){
        	$modifytagform->handleRequest($request);
        	if($modifytagform->isSubmitted() ) {
            	
            	foreach($tags as $tag){
            		if ($request->request->has($tag->getId())) {
            			$tagId = $tag->getId();
            		}
            	}
            	$tagtemp = $modifytagform->getData();
            	$tagToModify = $tagRepository->findOneBy(['id' => $tagId ]);
            	if (!$tagToModify) { throw $this->createNotFoundException( 'No tag found for id '. $tagId ); }
            	
 				
 				
 				$em->persist($tagToModify);
 				$em->flush();
 				
 			}
        }
    
        
        
		return $this->render('show.html.twig', array(
			'tasks' => $tasks,
			'tagformviews' => $tagformviews,
			'removetagformviews' => $removetagformviews,
			'modifytagformviews' => $modifytagformviews,
		));
        
    }
    
    
    
    
    
    /**
      * @Route("/createfigure", name="createfigure")
      */
    public function createfigure(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $figureRepository = $this->getDoctrine()->getRepository(Figure::class);
        $figures = $figureRepository->findAll();
        
        $figure = new Figure();
        $tags = Array();
        $form = $this->createForm(FigureType::class, $figure);

    	$form->handleRequest($request);

    	if ($form->isSubmitted() && $form->isValid()) {
        	$figure = $form->getData();
        	
        	//$figure->setCreatedAt();
        	$figure->setCreatedAt( new \DateTime('now') );
        	
        	$mainfile = $figure->getMainimage();
 			$mainfileName = $this->generateUniqueFileName().'.'.$mainfile->guessExtension();
 			$mainfile->move( $this->getParameter('images_directory'), $mainfileName );
 			$figure->setMainimage($mainfileName);
        	
        	
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
            	
            	//$task = $figureRepository->findOneBy(['id' => $figureId]);
            	//if (!$task) { throw $this->createNotFoundException( 'No task found for id '. $figureId ); }
            	
            	$file = $tagtest->getImage();
 				$fileName = $this->generateUniqueFileName().'.'.$file->guessExtension();
 				$file->move( $this->getParameter('images_directory'), $fileName );
 				$tagtest->setImage($fileName);
 				
 				
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
     * @return string
     */
    private function generateUniqueFileName()
    {
        // md5() reduces the similarity of the file names generated by
        // uniqid(), which is based on timestamps
        return md5(uniqid());
    }
    
    
}




































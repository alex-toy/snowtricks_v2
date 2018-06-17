<?php
namespace App\Service;

use App\Entity\Figure;
use App\Entity\Tag;
use App\Entity\Comment;
use App\Form\FigureType;
use App\Form\ModifyFigureType;
use App\Form\CommentType;

use App\Form\AddTagToFigureType;
use App\Form\RemoveTagType;
use App\Form\ModifyTagType;

use Symfony\Component\HttpFoundation\Request;

class RemoveTagGenerator
{
    public function getRemoveTagForm($tags, $controler, Request $request )
    {
        
        $removetagforms = array();
        $removetagformviews = array();
        foreach($tags as $tag){
			
			$tagtempRemove = $controler->createNamedBuilder( $tag->getId(), RemoveTagType::class, new Tag() );
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
 				
 			}
        }
        
        return $removetagformviews;
        
    }
}




?>














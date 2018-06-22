<?php
namespace App\Form;

use App\Entity\Tag;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class AddTagToFigureType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        	->add('explanation', TextareaType::class)
        	->add('image', FileType::class)
        	->add('video', FileType::class)
        	->add('save', SubmitType::class);
        
        
        
        //->add('explanation',     TextareaType::class, array( 'attr' => array('class' => 'form-control mb-10')))
        //->add('image', FileType::class, array('label' => 'Image (jpg file)'))
        //->add('video', FileType::class, array('label' => 'Video (mp4 file)'))
        //->add('save', SubmitType::class, array( 'attr' => array('label' => 'Add Tag', 'class' => 'primary-btn mt-20')));
        
     }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Tag::class,
        ));
    }
}


?>







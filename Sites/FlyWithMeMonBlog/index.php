<?php

require 'vendor/autoload.php';







$file =  __DIR__ . '/templates';
//echo $file;
$loader = new Twig_Loader_Filesystem($file);
$twig = new Twig_Environment($loader);



//echo "Mon nom est " , get_class($twig) , "\n";




//if(isset($twig)){ echo 'ok';}
$twig->render('home.twig');
//if(isset($twig)){ echo 'ok';}


echo "Mon nom est " , get_class($twig) , "\n";





if($page === 'home'){
	echo $page;
	//require $file . '/home.twig';
	echo $twig->render('home.twig');
	//echo 'apres';
}














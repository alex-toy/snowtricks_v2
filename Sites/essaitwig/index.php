<?php




$path = __DIR__ . '/vendor/autoload.php';
//echo $path;
require_once $path;





$loader = new Twig_Loader_Filesystem('templates');



$twig = new Twig_Environment($loader);




echo $twig->render('index.html', array('name' => 'Fabien'));
  
echo 'ici';  

    
?>




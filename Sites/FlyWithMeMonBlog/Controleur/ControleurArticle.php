<?php

require_once 'Modele/Article.php';
require_once 'Modele/Commentaire.php';
require_once 'Vue/Vue.php';

class ControleurArticle {

    private $article;
    
    public function __construct() {
        $this->article = new Article();
    }

    // Affiche les détails sur un billet
    public function Titre_Articles() {
        $article = $this->article->titreArticles();
        //echo $article;
        
        //$vue = new Vue("Article");
        //$vue->generer(array('article' => $article);
    }


}


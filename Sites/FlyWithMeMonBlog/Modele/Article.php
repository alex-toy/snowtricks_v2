<?php

require_once 'Modele/Modele.php';
/**
 * Fournit les services d'accès aux genres musicaux 
 * 
 * @author Baptiste Pesquet
 */
class Article extends Modele {

// Renvoie la liste des commentaires associés à un billet
    public function titreArticles() {
        $sql = 'SELECT titre from Article';
        $titre_articles = $this->executerRequete($sql);
        return $titre_articles;
    }
    
    
    

    
}
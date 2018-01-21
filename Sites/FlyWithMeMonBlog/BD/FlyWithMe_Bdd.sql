CREATE DATABASE IF NOT EXISTS Fly_WithMe CHARACTER SET 'utf8';

USE Fly_WithMe


DROP TABLE IF EXISTS Image_Article;
DROP TABLE IF EXISTS Commentaire;
DROP TABLE IF EXISTS Image;
DROP TABLE IF EXISTS Article;






CREATE TABLE IF NOT EXISTS Article (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    
    titre VARCHAR(40) NOT NULL,
    dateAjout DATETIME NOT NULL,
    dateModif DATETIME,
    contenu TEXT
    
)
ENGINE=INNODB;





CREATE TABLE IF NOT EXISTS Image (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    
    nom VARCHAR(40) NOT NULL,
    date_prise DATE,
    legende TEXT
    
)
ENGINE=INNODB;



CREATE TABLE IF NOT EXISTS Commentaire (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    
    titre VARCHAR(40) NOT NULL,
    date_post DATE,
    contenu TEXT
    
)
ENGINE=INNODB;




CREATE TABLE IF NOT EXISTS Image_Article (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    
    id_image SMALLINT UNSIGNED NOT NULL,
    id_article SMALLINT UNSIGNED NOT NULL
    
)
ENGINE=INNODB;













































































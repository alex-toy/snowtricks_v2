DROP PROCEDURE IF EXISTS Liste_titres_articles;
DELIMITER | 
CREATE PROCEDURE Liste_titres_articles()  
   
BEGIN
    SELECT titre FROM Article ORDER BY dateAjout ASC;
END |
DELIMITER ;    
    
-- CALL Liste_titres_articles();





















-- ==============================================================

DROP PROCEDURE IF EXISTS Creation_plat;
DELIMITER | 
CREATE PROCEDURE Creation_plat (IN n VARCHAR(40), IN d TEXT, IN p FLOAT, IN cat VARCHAR(12))
BEGIN
    INSERT INTO Plat(nom, description, prix, categorie)
    VALUES(n, d, p, cat);
END |
DELIMITER ;    
    
-- CALL Creation_plat ('tarte poire', 'à la bolognaise', 10, 'dessert');



DROP PROCEDURE IF EXISTS Modif_plat;
DELIMITER | 
CREATE PROCEDURE Modif_plat (IN n VARCHAR(40), IN d TEXT, IN p FLOAT, IN cat VARCHAR(12), IN id_p SMALLINT)
BEGIN
    UPDATE Plat 
    SET nom = n, description = d, prix = p, categorie = cat 
    WHERE id = id_p;

END |
DELIMITER ;    
    
-- CALL Modif_plat ('tarte poire', 'à la bolognaise', 10, 'dessert', 4);


DROP PROCEDURE IF EXISTS Liste_nom_plat;
DELIMITER | 
CREATE PROCEDURE Liste_nom_plat ()
BEGIN
   SELECT nom FROM Plat WHERE categorie='plat';

END |
DELIMITER ;    
    
-- CALL Liste_nom_plat ();



DROP PROCEDURE IF EXISTS Liste_nom_dessert;
DELIMITER | 
CREATE PROCEDURE Liste_nom_dessert ()
BEGIN
   SELECT nom FROM Plat WHERE categorie='dessert';

END |
DELIMITER ;    
    
-- CALL Liste_nom_dessert ();




DROP PROCEDURE IF EXISTS Creation_plat;
DELIMITER | 
CREATE PROCEDURE Creation_plat (IN n VARCHAR(40), IN d TEXT, IN p VARCHAR(40), IN cat VARCHAR(12))
BEGIN
    INSERT INTO Plat(nom, description, prix, categorie)
    VALUES(n, d, p, cat);
END |
DELIMITER ;    
    
-- CALL Creation_plat ('tarte pomme', 'à la bolognaise', 10, 'dessert');





DROP PROCEDURE IF EXISTS Creation_menu;
DELIMITER | 
CREATE PROCEDURE Creation_menu (IN id_p1 SMALLINT, IN id_p2 SMALLINT, IN id_d1 SMALLINT, IN id_d2 SMALLINT)
BEGIN
    INSERT INTO Menu(date_jour, id_plat1, id_plat2, id_dessert1, id_dessert2)
    VALUES(DATE(NOW()), id_p1, id_p2, id_d1, id_d2);
END |
DELIMITER ;    
    
-- CALL Creation_menu (1, 1, 2, 2);




DROP PROCEDURE IF EXISTS Modif_menu;
DELIMITER | 
CREATE PROCEDURE Modif_menu (IN id_p1 SMALLINT, IN id_p2 SMALLINT, IN id_d1 SMALLINT, IN id_d2 SMALLINT)
BEGIN
    UPDATE Menu
    SET id_plat1 = id_p1, id_plat2 = id_p2, id_dessert1 = id_d1, id_dessert2 = id_d2
    WHERE date_jour = DATE(NOW());
END |
DELIMITER ;    
    
-- CALL Modif_menu (1, 1, 2, 2);



DROP PROCEDURE IF EXISTS Modif_menu_plats;
DELIMITER | 
CREATE PROCEDURE Modif_menu_plats (IN nom_plat_1 VARCHAR(40), IN nom_plat_2 VARCHAR(40))
BEGIN
    DECLARE id_plat_1 SMALLINT;
    DECLARE id_plat_2 SMALLINT;
    
    SELECT id FROM Plat WHERE nom = nom_plat_1 INTO id_plat_1;
    SELECT id FROM Plat WHERE nom = nom_plat_2 INTO id_plat_2;
    
    
    UPDATE Menu
    SET id_plat1 = id_plat_1, id_plat2 = id_plat_2
    WHERE date_jour = DATE(NOW());
END |
DELIMITER ;    
    
-- CALL Modif_menu_plats ('spaghetti', 'couscous');



DROP PROCEDURE IF EXISTS Modif_menu_desserts;
DELIMITER | 
CREATE PROCEDURE Modif_menu_desserts (IN nom_dessert_1 VARCHAR(40), IN nom_dessert_2 VARCHAR(40))
BEGIN
    DECLARE id_dessert_1 SMALLINT;
    DECLARE id_dessert_2 SMALLINT;
     
    SELECT id FROM Plat WHERE nom = nom_dessert_1 INTO id_dessert_1;
    SELECT id FROM Plat WHERE nom = nom_dessert_2 INTO id_dessert_2;
    
    UPDATE Menu
    SET id_dessert1 = id_dessert_1, id_dessert2 = id_dessert_2
    WHERE date_jour = DATE(NOW());
END |
DELIMITER ;    
    
-- CALL Modif_menu_desserts ('tiramisu', 'café gourmand');




DROP PROCEDURE IF EXISTS menu_jour;
DELIMITER | 
CREATE PROCEDURE menu_jour(IN d DATE)
BEGIN
    DECLARE date_j DATE;
    DECLARE plat1 VARCHAR(40);
    DECLARE prix_plat1 FLOAT;
    DECLARE plat2 VARCHAR(40);
    DECLARE prix_plat2 FLOAT;
    DECLARE dessert1 VARCHAR(40);
    DECLARE prix_dessert1 FLOAT;
    DECLARE dessert2 VARCHAR(40);
    DECLARE prix_dessert2 FLOAT;
    
    SET date_j = d; 
    SELECT Plat.nom AS plat1 FROM Menu JOIN Plat ON Menu.id_plat1 = plat.id  WHERE date_jour = d  LIMIT 1 INTO plat1 ;
    SELECT Plat.prix AS prix_plat1 FROM Menu JOIN Plat ON Menu.id_plat1 = plat.id  WHERE date_jour = d  LIMIT 1 INTO prix_plat1 ;
    
    SELECT Plat.nom AS plat2 FROM Menu JOIN Plat ON Menu.id_plat2 = plat.id  WHERE date_jour = d LIMIT 1 INTO plat2;
    SELECT Plat.prix AS prix_plat2 FROM Menu JOIN Plat ON Menu.id_plat2 = plat.id  WHERE date_jour = d  LIMIT 1 INTO prix_plat2 ;
    
    SELECT Plat.nom AS dessert1 FROM Menu JOIN Plat ON Menu.id_dessert1 = plat.id  WHERE date_jour = d LIMIT 1 INTO dessert1;
    SELECT Plat.prix AS prix_dessert1 FROM Menu JOIN Plat ON Menu.id_dessert1 = plat.id  WHERE date_jour = d  LIMIT 1 INTO prix_dessert1 ;
    
    SELECT Plat.nom AS dessert2 FROM Menu JOIN Plat ON Menu.id_dessert2 = plat.id  WHERE date_jour = d LIMIT 1 INTO dessert2;
    SELECT Plat.prix AS prix_dessert2 FROM Menu JOIN Plat ON Menu.id_dessert2 = plat.id  WHERE date_jour = d  LIMIT 1 INTO prix_dessert2 ;
    
    SELECT date_j, plat1, prix_plat1, plat2, prix_plat2, dessert1, prix_dessert1, dessert2, prix_dessert2 ; 
    
END |
DELIMITER ;    
    
-- CALL menu_jour ('2017-10-29');





DROP PROCEDURE IF EXISTS mise_a_jour_prix_plat1;
DELIMITER | 
CREATE PROCEDURE mise_a_jour_prix_plat1 (IN nprix_plat1 FLOAT)
BEGIN
    UPDATE Menu SET prix_plat1 = nprix_plat1 WHERE date_jour = DATE(NOW());
END |
DELIMITER ;    
    
-- CALL mise_a_jour_prix_plat1 (777);




DROP PROCEDURE IF EXISTS mise_a_jour_plat1;
DELIMITER | 
CREATE PROCEDURE mise_a_jour_plat1 (IN nplat1 TEXT)
BEGIN
    UPDATE Menu SET plat1 = nplat1 WHERE date_jour = DATE(NOW());
END |
DELIMITER ;    
    
-- CALL mise_a_jour_plat1 ('UUUU');


DROP PROCEDURE IF EXISTS mise_a_jour_dessert1;
DELIMITER | 
CREATE PROCEDURE mise_a_jour_dessert1 (IN ndessert1 TEXT)
BEGIN
    UPDATE Menu SET dessert1 = ndessert1 WHERE date_jour = DATE(NOW());
END |
DELIMITER ;    
    
-- CALL mise_a_jour_dessert1 (3333333);




DROP PROCEDURE IF EXISTS mise_a_jour_prix_dessert1;
DELIMITER | 
CREATE PROCEDURE mise_a_jour_prix_dessert1 (IN nprix_dessert1 FLOAT)
BEGIN
    UPDATE Menu SET prix_dessert1 = nprix_dessert1 WHERE date_jour = DATE(NOW());
END |
DELIMITER ;    
    
-- CALL mise_a_jour_prix_dessert1 (111);




DROP PROCEDURE IF EXISTS mise_a_jour_plat2;
DELIMITER | 
CREATE PROCEDURE mise_a_jour_plat2 (IN nplat2 TEXT)
BEGIN
    UPDATE Menu SET plat2 = nplat2 WHERE date_jour = DATE(NOW());
END |
DELIMITER ;    
    
-- CALL mise_a_jour_plat2 ('BBBBBB');




DROP PROCEDURE IF EXISTS mise_a_jour_prix_plat2;
DELIMITER | 
CREATE PROCEDURE mise_a_jour_prix_plat2 (IN nprix_plat2 FLOAT)
BEGIN
    UPDATE Menu SET prix_plat2 = nprix_plat2 WHERE date_jour = DATE(NOW());
END |
DELIMITER ;    
    
-- CALL mise_a_jour_prix_plat2 (66666);






DROP PROCEDURE IF EXISTS mise_a_jour_dessert2;
DELIMITER | 
CREATE PROCEDURE mise_a_jour_dessert2 (IN ndessert2 TEXT)
BEGIN
    UPDATE Menu SET dessert2 = ndessert2 WHERE date_jour = DATE(NOW());
END |
DELIMITER ;    
    
-- CALL mise_a_jour_dessert2('ABCD');




DROP PROCEDURE IF EXISTS mise_a_jour_prix_dessert2;
DELIMITER | 
CREATE PROCEDURE mise_a_jour_prix_dessert2 (IN nprix_dessert2 FLOAT)
BEGIN
    UPDATE Menu SET prix_dessert2 = nprix_dessert2 WHERE date_jour = DATE(NOW());
END |
DELIMITER ;    
    
-- CALL mise_a_jour_prix_dessert2 (999);







DROP PROCEDURE IF EXISTS afficher_livraisons;
DELIMITER | 
CREATE PROCEDURE afficher_livraisons (IN date_liv DATETIME)  
   
BEGIN
    SELECT * FROM Livraison
    WHERE Livraison.date_livraison = date_liv; 
END |
DELIMITER ;    
    
-- CALL afficher_livraisons ('2017-09-03 17:56:00');
   





DROP PROCEDURE IF EXISTS afficher_commandes_non_terminees;
DELIMITER | 
CREATE PROCEDURE afficher_commandes_non_terminees()  
   
BEGIN
    SELECT * FROM Commande WHERE etat = 'non_traitee' OR etat = 'en_cours'; 
END |
DELIMITER ;    
    
-- CALL afficher_commandes_non_terminees();




DROP PROCEDURE IF EXISTS afficher_commandes_annullables;
DELIMITER | 
CREATE PROCEDURE afficher_commandes_annullables()  
   
BEGIN
    SELECT * FROM Commande WHERE etat = 'non_traitee'; 
END |
DELIMITER ;    
    
-- CALL afficher_commandes_annullables();







DROP PROCEDURE IF EXISTS afficher_commandes_en_cours;
DELIMITER | 
CREATE PROCEDURE afficher_commandes_en_cours()  
   
BEGIN
    SELECT * FROM Commande WHERE Commande.etat = 'en_cours'; 
END |
DELIMITER ;    
    
-- CALL afficher_commandes_en_cours();





DROP PROCEDURE IF EXISTS afficher_commandes_non_traitees;
DELIMITER | 
CREATE PROCEDURE afficher_commandes_non_traitees()  
   
BEGIN
    SELECT * FROM Commande WHERE Commande.etat = 'non_traitee' OR Commande.etat = 'en_cours' 
    							AND NOT Commande.etat = 'facturee' AND NOT Commande.etat = 'annullee'; 
END |
DELIMITER ;    
    
-- CALL afficher_commandes_non_traitees();





DROP PROCEDURE IF EXISTS annuller_commande;
DELIMITER | 
CREATE PROCEDURE annuller_commande(IN id_comm_a_annuller SMALLINT)  
BEGIN
    UPDATE Commande 
	SET etat = 'annullee', date_annullation = NOW()
	WHERE id = id_comm_a_annuller; 
END |
DELIMITER ;    
    
-- CALL annuller_commande(2);




DROP PROCEDURE IF EXISTS affecter_commande;
DELIMITER | 
CREATE PROCEDURE affecter_commande(IN id_livreur SMALLINT, IN id_commande SMALLINT)  
   
BEGIN
    UPDATE Livreur 
	SET Livreur.id_commande = id_commande , Livreur.statut = 'occupe'
	WHERE Livreur.id = id_livreur;
	
	UPDATE Commande 
	SET Commande.etat = 'en_cours'
	WHERE Commande.id = id_commande;
END |
DELIMITER ;    
    
-- CALL affecter_commande(3, 2);










DROP PROCEDURE IF EXISTS creer_livreur;
DELIMITER | 
CREATE PROCEDURE creer_livreur (	IN id_e SMALLINT, 
									IN secteur TEXT, 
									IN sp1 INTEGER, 
									IN sp2 INTEGER, 
									IN sd1 INTEGER, 
									IN sd2 INTEGER, 
									IN caisse FLOAT)
BEGIN          
	INSERT INTO Livreur(id_employe, id_commande, date_poste, secteur, stock_plat1, stock_plat2, stock_dessert1, stock_dessert2, caisse, statut) 
	VALUES(	id_e , 
			NULL, 		
			NOW(), 	
			secteur, 
			sp1, 
			sp2, 
			sd1, 
			sd2, 
			caisse,
			'libre');
END |
DELIMITER ;








DROP PROCEDURE IF EXISTS supprimer_livreur;
DELIMITER | 
CREATE PROCEDURE supprimer_livreur (IN id SMALLINT)
BEGIN
    DELETE FROM Livreur WHERE id_employe = id AND date_poste = DATE(NOW());
END |
DELIMITER ;

-- CALL supprimer_livreur(3);





DROP PROCEDURE IF EXISTS modifier_livreur;
DELIMITER | 
CREATE PROCEDURE modifier_livreur(	IN sp1 INTEGER,
									IN sp2 INTEGER,
									IN sd1 INTEGER,
									IN sd2 INTEGER,
									IN caisse FLOAT,
									IN s TEXT,
									IN id_e SMALLINT
									)  
   
BEGIN
    UPDATE Livreur SET 	stock_plat1 = sp1, 
						stock_plat2 = sp2,
						stock_dessert1 = sd1, 
						stock_dessert2 = sd2,
						caisse = caisse,
						secteur = s											
	WHERE date_poste = DATE(NOW()) AND id_employe = id_e;
    
END |
DELIMITER ;    
    
-- CALL modifier_livreur(2, 2, 2, 2, 100, '3', 3);







DROP PROCEDURE IF EXISTS Liberer_livreur;
DELIMITER | 
CREATE PROCEDURE Liberer_livreur(IN id_livreur SMALLINT)  
   
BEGIN
    UPDATE Livreur 
	SET Livreur.statut = 'libre' , Livreur.id_commande = NULL
	WHERE Livreur.id = id_livreur;
END |
DELIMITER ;    
    
-- CALL Liberer_livreur(2);





DROP PROCEDURE IF EXISTS livreurs_libres_secteur;
DELIMITER | 
CREATE PROCEDURE livreurs_libres_secteur(IN num_secteur SMALLINT)  
   
BEGIN
    SELECT * FROM Livreur JOIN Employe
    ON Livreur.id_employe = Employe.id
    WHERE Livreur.secteur = num_secteur AND Livreur.statut = 'libre' AND date_poste = DATE(NOW());
END |
DELIMITER ;    
    
-- CALL livreurs_libres_secteur(2);



-- DROP PROCEDURE IF EXISTS livreurs_libres_secteur_plus_stock_suffisant();
-- DELIMITER | 
-- CREATE PROCEDURE livreurs_libres_secteur_plus_stock_suffisant(IN id_commande SMALLINT)  
--    
-- BEGIN
--     SELECT * FROM Livreur JOIN Employe
--     ON Livreur.id_employe = Employe.id
--     WHERE Livreur.secteur = num_secteur AND Livreur.statut = 'libre' AND date_poste = DATE(NOW());
-- END |
-- DELIMITER ;    
--     
-- -- CALL livreurs_libres_secteur_plus_stock_suffisant(2);




DROP PROCEDURE IF EXISTS livreurs_libres_date;
DELIMITER | 
CREATE PROCEDURE livreurs_libres_date()  
   
BEGIN
    SELECT * FROM Employe JOIN Livreur ON Employe.id = Livreur.id_employe
	WHERE Livreur.date_poste = DATE(NOW());
END |
DELIMITER ;    
    
-- CALL livreurs_libres_date();






DROP PROCEDURE IF EXISTS liste_livreurs_modifiables;
DELIMITER | 
CREATE PROCEDURE liste_livreurs_modifiables()  
   
BEGIN
    SELECT Employe.id FROM Employe JOIN Livreur ON Employe.id = Livreur.id_employe
    WHERE date_poste = DATE(NOW());
END |
DELIMITER ;    
    
-- CALL liste_livreurs_modifiables();




DROP PROCEDURE IF EXISTS liste_employe_role_livreur;
DELIMITER | 
CREATE PROCEDURE liste_employe_role_livreur()  
   
BEGIN
    SELECT Employe.id FROM Employe
    WHERE Employe.id IN (SELECT id_employe FROM Livreur WHERE date_poste = DATE(NOW()) );
END |
DELIMITER ;    
    
-- CALL liste_employe_role_livreur();






DROP PROCEDURE IF EXISTS liste_employe_dispo_pour_livrer;
DELIMITER | 
CREATE PROCEDURE liste_employe_dispo_pour_livrer()  
   
BEGIN
    SELECT Employe.id FROM Employe
    WHERE Employe.id NOT IN (SELECT id_employe FROM Livreur WHERE date_poste = DATE(NOW()) );
    
END |
DELIMITER ;    
    
-- CALL liste_employe_dispo_pour_livrer();






DROP PROCEDURE IF EXISTS livreurs_occupe;
DELIMITER | 
CREATE PROCEDURE livreurs_occupe()  
   
BEGIN
    SELECT * FROM Livreur 
    JOIN Employe ON Livreur.id_employe = Employe.id 
    WHERE statut = 'occupe'; 
END |
DELIMITER ;    
    
-- CALL livreurs_occupe();






DROP PROCEDURE IF EXISTS livraisons_relatives_commande;
DELIMITER | 
CREATE PROCEDURE livraisons_relatives_commande(IN id_comm SMALLINT)  
   
BEGIN
    SELECT * FROM Livraison 
    WHERE id_commande = id_comm; 
END |
DELIMITER ;    
    
-- CALL livraisons_relatives_commande(4);








DROP PROCEDURE IF EXISTS Remplissage_initial_Livraison;
DELIMITER | 
CREATE PROCEDURE Remplissage_initial_Livraison (id_liv SMALLINT, id_com SMALLINT)
   
BEGIN
    INSERT INTO Livraison (id_livreur, id_commande, date_attribution, date_livraison, nbre_plat1_livres, nbre_plat2_livres, nbre_dessert1_livres, nbre_dessert2_livres, prix) 
VALUES 	(id_liv, id_com, NOW(), NULL, 0, 0, 0, 0, 0);
END |
DELIMITER ;

-- CALL Remplissage_initial_Livraison(3, 4);







DROP FUNCTION IF EXISTS Prix_livraison;
DELIMITER //
CREATE FUNCTION Prix_livraison (nbre_plat1 INTEGER, nbre_plat2 INTEGER, nbre_dessert1 INTEGER, nbre_dessert2 INTEGER, date_liv DATE)
RETURNS FLOAT

BEGIN
	DECLARE prix_p1 FLOAT;
	DECLARE prix_p2 FLOAT;
	DECLARE prix_d1 FLOAT;
	DECLARE prix_d2 FLOAT;
	DECLARE prix_total FLOAT;
	
	SELECT Plat.prix FROM Menu JOIN Plat ON Menu.id_plat1 = Plat.id WHERE date_jour = date_liv INTO prix_p1;
	SELECT Plat.prix FROM Menu JOIN Plat ON Menu.id_plat2 = Plat.id WHERE date_jour = date_liv INTO prix_p2;
	SELECT Plat.prix FROM Menu JOIN Plat ON Menu.id_dessert1 = Plat.id WHERE date_jour = date_liv INTO prix_d1;
	SELECT Plat.prix FROM Menu JOIN Plat ON Menu.id_dessert2 = Plat.id WHERE date_jour = date_liv INTO prix_d2;
	
	SET prix_total = nbre_plat1*prix_p1 + nbre_plat2*prix_p2 + nbre_dessert1*prix_d1 + nbre_dessert2*prix_d2;
	

	RETURN prix_total;

END; //

DELIMITER ;




DROP PROCEDURE IF EXISTS Remplissage_final_Livraison;
DELIMITER | 
CREATE PROCEDURE Remplissage_final_Livraison (	id_liv SMALLINT, 
												id_com SMALLINT, 
												nbre_plat1 INTEGER, nbre_plat2 INTEGER, 
												nbre_dessert1 INTEGER, nbre_dessert2 INTEGER)
BEGIN
    UPDATE Livraison
    SET date_livraison = NOW(), 
    	nbre_plat1_livres = nbre_plat1, 
    	nbre_plat2_livres = nbre_plat2, 
    	nbre_dessert1_livres = nbre_dessert1, 
    	nbre_dessert2_livres = nbre_dessert2, 
    	prix = Prix_livraison(nbre_plat1, nbre_plat2, nbre_dessert1, nbre_dessert2, DATE(date_livraison) )
    WHERE id_livreur = id_liv AND id_commande = id_com;
    
    
    -- liberation du livreur et mise à jour du stock :
    UPDATE Livreur
    SET statut = 'libre',
    	id_commande = null,
    	stock_plat1 = stock_plat1 - nbre_plat1,
	    stock_plat2 = stock_plat2 - nbre_plat2,
	    stock_dessert1 = stock_dessert1 - nbre_dessert1,
	    stock_dessert2 = stock_dessert2 - nbre_dessert2 
    WHERE id = id_liv;
    
END |
DELIMITER ;



-- CALL Remplissage_final_Livraison(3, 4, 1, 0, 1, 0);






DROP FUNCTION IF EXISTS Id_facture;
DELIMITER //
CREATE FUNCTION Id_facture (date_livraison DATETIME, id_liv SMALLINT)
RETURNS BIGINT

BEGIN
	DECLARE date_year INT;
	DECLARE date_month INT;
	DECLARE date_day INT;
	DECLARE Id_fact BIGINT;
	DECLARE id_existant BIGINT;
	DECLARE array_id BIGINT;
	DECLARE id_empl SMALLINT;
	DECLARE max_id BIGINT;
	

	SET date_year = YEAR(date_livraison);
	SET date_month = MONTH(date_livraison);
	SET date_day = DAY(date_livraison);
	
	
	SELECT Employe.id FROM Employe JOIN Livreur ON Employe.id = Livreur.id_employe WHERE Livreur.id = id_liv INTO id_empl;
	
	SELECT MAX(id) FROM Facture WHERE id_livreur = id_liv INTO max_id;	
	SET Id_fact = ((date_day + date_month*100 + date_year*10000)*100 + id_empl)*100 + 1;
	
	
	WHILE (Id_fact <= max_id) DO
		SET Id_fact = Id_fact + 1;
	END WHILE;
	
	
	RETURN Id_fact;
	

END; //

DELIMITER ;






DROP PROCEDURE IF EXISTS Creation_facture;
DELIMITER | 
CREATE PROCEDURE Creation_facture (IN id_com SMALLINT)
   
BEGIN
    DECLARE id_last_emp SMALLINT;
    DECLARE montant FLOAT;
    DECLARE id_liv_last SMALLINT;
    DECLARE date_livraison_last DATETIME;
    
    
    -- livreur ayant fait la dernière livraison
	SELECT MAX(date_livraison) FROM Livraison 
	WHERE id_commande = id_com
	INTO date_livraison_last;
	
	SELECT temp.id_livreur FROM(
	SELECT id_livreur, date_livraison
	FROM Livraison 
	WHERE id_commande = id_com
	HAVING date_livraison = date_livraison_last) AS temp
 	INTO id_liv_last;
    
    
    -- somme des prix de toutes les livraisons correspondant à cette commande
    SELECT SUM(prix) FROM Livraison WHERE id_commande = id_com GROUP BY id_commande INTO montant;
    
    UPDATE Commande
    SET etat = 'facturee'
    WHERE id = id_com;

    
    INSERT INTO Facture (id, date_facturation, montant, id_livreur, id_commande) 
	VALUES 	(Id_facture(NOW(), id_liv_last), NOW(), montant, id_liv_last, id_com);
END |
DELIMITER ;


-- CALL Creation_facture (2);








DROP PROCEDURE IF EXISTS liste_facture;
DELIMITER | 
CREATE PROCEDURE liste_facture()  
   
BEGIN
    SELECT 	
			Facture.montant,
    		Livraison.id_commande, 
    		SUM(Livraison.nbre_plat1_livres) AS nbre_plat1_final, 
    		SUM(Livraison.nbre_plat2_livres) AS nbre_plat2_final, 
    		SUM(Livraison.nbre_dessert1_livres) AS nbre_dessert1_final, 
    		SUM(Livraison.nbre_dessert2_livres) AS nbre_dessert2_final
    FROM Facture JOIN Livraison 
    ON Facture.id_commande = Livraison.id_commande
    GROUP BY Livraison.id_commande, Facture.montant;
    			-- , Facture.id, Facture.date_facturation, ;
END |
DELIMITER ;    
    
-- CALL liste_facture();







DROP PROCEDURE IF EXISTS Creation_client;
DELIMITER | 
CREATE PROCEDURE Creation_client (IN n VARCHAR(40), IN p VARCHAR(40), IN eml VARCHAR(40), IN pwd VARCHAR(6))
   
BEGIN
    INSERT INTO Client(nom, prenom, email, password) VALUES(n , p, eml, pwd);
END |
DELIMITER ;


-- CALL Creation_client ('rea', 'ales', 'al@truc.com', 'hdh');


													

DROP PROCEDURE IF EXISTS Modifier_client;
DELIMITER | 
CREATE PROCEDURE Modifier_client (IN n VARCHAR(40), IN p VARCHAR(40), IN eml VARCHAR(40), IN pwd VARCHAR(6), IN i SMALLINT)
   
BEGIN
    UPDATE Client 
	SET nom = n, prenom = p, email = eml, password = pwd 
	WHERE id = i;
END |
DELIMITER ;


-- CALL Modifier_client ('rea', 'ales', 'al@truc.com', 'hdh', 1);






DROP PROCEDURE IF EXISTS Creation_commande;
DELIMITER | 
CREATE PROCEDURE Creation_commande (IN id_client SMALLINT,
									IN Qt_plat1 INTEGER,
									IN Qt_plat2 INTEGER,
									IN Qt_dessert1 INTEGER,
									IN Qt_dessert2 INTEGER,
									IN ad_livr VARCHAR(40),
									IN secteur TEXT
									)
BEGIN
	
		INSERT INTO Commande(	id_client, 
								date_parution, 
								nbre_plat1_commande, 
								nbre_plat2_commande, 
								nbre_dessert1_commande, 
								nbre_dessert2_commande, 
								date_annullation, 
								adresse_livraison, 
								etat,
								secteur )
	VALUES(	id_client, 
			NOW(), 
			Qt_plat1, Qt_plat2, Qt_dessert1, Qt_dessert2,  
			null,  
			ad_livr, 
			'non_traitee',
			secteur);
     
END |
DELIMITER ;


-- CALL Creation_commande (1, 2, 2, 2, 2, 'hhjgvghv', 4);


    




    


DROP PROCEDURE IF EXISTS liste_facture_test;
DELIMITER | 
CREATE PROCEDURE liste_facture_test()  
   
BEGIN
    DECLARE somme_nbre_plat1_livres INTEGER;
    DECLARE somme_nbre_plat2_livres INTEGER;
    DECLARE somme_nbre_dessert1_livres INTEGER;
    DECLARE somme_nbre_dessert2_livres INTEGER;
    DECLARE montant FLOAT;
    
    
    DROP TABLE IF EXISTS tmp_facture;
    CREATE TEMPORARY TABLE tmp_facture (
    	nbre_plat1_final INTEGER,
    	nbre_plat2_final INTEGER,
    	nbre_dessert1_final INTEGER,
    	nbre_dessert2_final INTEGER,
    	montant FLOAT
	);
	-- DESCRIBE tmp_facture;  
	
	SELECT Facture.montant FROM Facture JOIN Livraison ON Facture.id_commande = Livraison.id_commande INTO montant;
	SELECT SUM(Livraison.nbre_plat1_livres) FROM Facture JOIN Livraison ON Facture.id_commande = Livraison.id_commande GROUP BY Livraison.id_commande, Facture.montant INTO somme_nbre_plat1_livres;
 	SELECT SUM(Livraison.nbre_plat2_livres) FROM Facture JOIN Livraison ON Facture.id_commande = Livraison.id_commande GROUP BY Livraison.id_commande, Facture.montant  INTO somme_nbre_plat2_livres;
	SELECT SUM(Livraison.nbre_dessert1_livres) FROM Facture JOIN Livraison ON Facture.id_commande = Livraison.id_commande GROUP BY Livraison.id_commande, Facture.montant INTO somme_nbre_dessert1_livres;
	SELECT SUM(Livraison.nbre_dessert2_livres) FROM Facture JOIN Livraison ON Facture.id_commande = Livraison.id_commande GROUP BY Livraison.id_commande, Facture.montant INTO somme_nbre_dessert2_livres;
	
	SELECT * FROM tmp_facture; 
	
	SELECT somme_nbre_plat1_livres;

END |
DELIMITER ;    
    
-- CALL liste_facture_test();






-- Facture.id_livreur,
-- 			Facture.montant,
--     		Livraison.id_commande, 
--     		SUM(Livraison.nbre_plat1_livres) AS nbre_plat1_final, 
--     		SUM(Livraison.nbre_plat2_livres) AS nbre_plat2_final, 
--     		SUM(Livraison.nbre_dessert1_livres) AS nbre_dessert1_final, 
--     		SUM(Livraison.nbre_dessert2_livres) AS nbre_dessert2_final
--     FROM Facture JOIN Livraison 
--     ON Facture.id_commande = Livraison.id_commande
--     GROUP BY Livraison.id_commande, Facture.montant;
--     			-- , Facture.id, Facture.date_facturation, ;





DROP PROCEDURE IF EXISTS stock_plat_1;
DELIMITER | 
CREATE PROCEDURE stock_plat_1(IN id_livreur SMALLINT)  
   
BEGIN
    SELECT stock_plat1 FROM Livreur WHERE id = id_livreur;
END |
DELIMITER ;    
    
-- CALL stock_plat_1(1);



DROP PROCEDURE IF EXISTS stock_plat_2;
DELIMITER | 
CREATE PROCEDURE stock_plat_2(IN id_livreur SMALLINT)  
   
BEGIN
    SELECT stock_plat2 FROM Livreur WHERE id = id_livreur;
END |
DELIMITER ;    
    
-- CALL stock_plat_2(1);


DROP PROCEDURE IF EXISTS stock_dessert_1;
DELIMITER | 
CREATE PROCEDURE stock_dessert_1(IN id_livreur SMALLINT)  
   
BEGIN
    SELECT stock_dessert1 FROM Livreur WHERE id = id_livreur;
END |
DELIMITER ;    
    
-- CALL stock_dessert_1(1);































   










    
 

    



 
    
  
    
    
    

   
    






























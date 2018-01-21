$(document).ready(function(){

	
	//$("#select").click(function() 
	
	
	$("body").delegate( "#select", "click", function()
	{
		
		$(".spectateursupprimé").remove();
		$(".filmsupprimé").remove();
		$("#suppressionséance").remove();
		$("#filmrajouté").remove();
		$(".séancemodifiée").remove();
		$("#modifpriseencompte").remove();
		$("#comptespectateursupprimé").remove();
		$(".séancerajoutée").remove();
		$(".editionspectateur").remove();
		$("#choixspectateur").remove();
		$(".modifdesc").remove();
		$("#rajoutséance").remove();
		$(".modifséance").remove();
		$(".modif").remove();
		$(".suppress").remove();
		$(".rajout").remove();
		$(".modifséancefilm").remove();
		
		var value =  $(this).find("option:selected").text();	
		
		
		if(value == "Choix de l'action")
		{
			
			$(".rajoutséance").remove();
			$(".suppress").remove();
			$(".modif").remove();
			$(".rajout").remove();
			
		}
		else if(value == "Rajouter un film")
		{
			$(".rajoutséance").remove();
			$(".rajout").remove();
			$(".suppress").remove();
			$(".modif").remove();
			$("#filmrajouté").remove();	
			$('.container').append(	'<div class="row"></div>'+
									'<div class="rajout encart-titre col-lg-offset-1 col-lg-11 formulaire">'+
									
										'<div><h3>Rajout d\'un film</h3></div>' +
									
										'<div class="row">'	+	
											'<div class="col-lg-5">' +
												'<p>Eléments de description du film :</p>' +
												'<div class="input-group formulaire">' +
												'<input type="text" id="titre" class="form-control" placeholder="titre du film" aria-describedby="basic-addon1">' +
												'<input type="text" id="auteur" class="form-control" placeholder="Nom du réalisateur" aria-describedby="basic-addon1">' +
												'<input type="text" id="résumé" class="form-control" placeholder="Résumé du film" aria-describedby="basic-addon1" rows=4 cols=40 >' +
											'</div>' +
										'</div>' +
									
										// <!-- bouton ================= -->
										'<div class="col-lg-12">' +
										'<a id="boutonrajoutfilm" class="btn btn-primary">Rajouter un film</a>' +
										'</div>' +
									'</div>');
								
			$( "#boutonrajoutfilm" ).click(function()
			{
				var titre=$("#titre").val();
			    var regextitre = new RegExp("^[a-zA-Z]{3,}$");
				var auteur=$("#auteur").val();
				var regexauteur = new RegExp("^[a-zA-Z]{3,}$");
				var résumé=$("#résumé").val();
				var regexrésumé = new RegExp("^[a-zA-Z]{3,}$");

				if(!regextitre.test(titre)) 
				{
					alert("Le titre contient au moins 3 caractères");
					return;
			     	} 
				else if(!regexauteur.test(auteur)) 
				{
			          	alert("L'auteur contient au moins 3 caractères");
					return;
			     	}	
			    else if(!regexrésumé.test(résumé)) 
				{
			          	alert("Le résumé contient au moins 3 caractères");
					b_lieu = false;
					return;
			     	}
				else
				{
					$("#filmrajouté").remove();
					$('.container').append('<div id="filmrajouté" class="encart-titre col-lg-offset-1 col-lg-11"><h4>Le film a bien été rajouté</h4></div>');	
					return;
			    }
			});
			
									
		}
		else if(value == "Modifier un film")
		{
			$(".modifdesc").remove();
			$(".séancesupprimée").remove();
			$("#modifpriseencompte").remove();
			$(".modifséance").remove();
			$(".séancerajoutée").remove();
			$(".séancemodifiée").remove();
			$(".modiffilm").remove();
			
			$('.container').append('<div class="row"></div>' +
		'<div class="modif encart-titre col-lg-offset-1 col-lg-11 formulaire2">' +
			
			'<div><h3>Modification d\'un film</h3></div>' +
			'<div class="row modiffilm">'		 +

				// <!-- cadre gauche ================= -->
				'<div class="col-lg-5">' +
					'<label for="select">Titre du film à modifier</label>'+
					'<select id="selfilm" class="rajouterséance form-control">'+
						'<option>choix du film</option>'+
						'<option>film 1</option>'+
						'<option>film 2</option>'+
						'<option>film 3</option>'+
						'<option>film 4</option>'+
						'<option>film 5</option>'+
						'<option>film 6</option>'+
					'</select>'+
						
					'<label for="select">Type de modification</label>'+
					'<select id="selmodiffilm" class="form-control">'+
						'<option>Choix de la modification</option>'+
						'<option>Modifier la description</option>'+
						'<option>Modifier une séance</option>'+
						'<option>Rajouter une séance</option>'+
						'<option>Supprimer une séance</option>'+
					'</select>'+
					
				'</div>'+

			'</div>');
			
			$("#selmodiffilm").click(function() {
				$("#modifpriseencompte").remove();
				$("#rajoutséance").remove();
								
				var film =  $("#selfilm").find("option:selected").text();
				
				var val =  $('#selmodiffilm').find("option:selected").text();
				if(val == "Modifier la description")
				{
					$("#modifpriseencompte").remove();
					$(".modifdesc").remove();
					$(".séancerajoutée").remove();
					$(".modifséance").remove();
					
					$("#selfilm").click(function() {
						var film =  $("#selfilm").find("option:selected").text();
						if(film=="choix du film")
						{
							$(".modifdesc").remove();
							$("#rajoutséance").remove();
							$(".modifséance").remove();
							$(".séancerajoutée").remove();
							alert("choisir le film dabord")
						}
						else
						{
							$("#modifpriseencompte").remove();
							$(".modifdesc").remove();
							$("#rajoutséance").remove();
							$(".modifséance").remove();
							$(".séancerajoutée").remove();
							$('.container').append(
 					//<!-- Modification description ================= -->
					'<div class="encart-titre col-lg-offset-1 col-lg-11 modifdesc">'+
						
						'<h4>Nouvelle description du film : ' + film +'</h4>'+
						'<div class="input-group formulaire">'+
							'<input type="text" id="titre" class="form-control" placeholder="nouveau titre" aria-describedby="basic-addon1">'+
							'<input type="text" id="auteur" class="form-control" placeholder="nouvel auteur" aria-describedby="basic-addon1">'+
							'<input type="text" id="résumé" class="form-control" placeholder="nouveau résumé" aria-describedby="basic-addon1" rows=4 cols=40 >'+
						'</div>'+
						
						//<!-- bouton ================= -->
						'<a class="boutonmodiffilm btn btn-primary">Modifier la description</a>' +
 					'</div>'
 					);
							$('.boutonmodiffilm').click(function() {clicmodiffilm();});
						}
					});

					
				}
				else if(val == "Modifier une séance")
				{
					$(".modifdesc").remove();
					$("#rajoutséance").remove();
					$(".séancemodifiée").remove();
					$(".modifséance").remove();
					$(".séancerajoutée").remove();
					$("#modifpriseencompte").remove();	

					$("#selfilm").click(function() {
						var film =  $("#selfilm").find("option:selected").text();
						if(film=="choix du film")
						{
							$(".modifdesc").remove();
							$(".rajoutséance").remove();
							$(".modifséance").remove();
							$(".séancerajoutée").remove();
							alert("choisir le film dabord")
						}
						else
						{
							$(".modifdesc").remove();
							$("#rajoutséance").remove();
							$(".modifséance").remove();
							$(".séancerajoutée").remove();
							$(".séancemodifiée").remove();
							$('.container').append(
						//<!-- Modification description ================= -->
						'<div class="encart-titre col-lg-offset-1 col-lg-11 modifséance">'+
							'<div><h3>Modification d\'une séance au film : '+ film +'</h3></div>'+
							'<div class="row">'+		
								'<div class="col-lg-5">'+
									'<label for="select">Séance à modifier</label>'+
									'<select id="selectséance" class="form-control">'+
										'<option>séance 1</option>'+
										'<option>séance 2</option>'+
										'<option>séance 3</option>'+
										'<option>séance 4</option>'+
										'<option>séance 5</option>'+
										'<option>séance 6</option>'+
									'</select>'+
								'</div>'	+
			
									
								'<div class="col-lg-offset-1 col-lg-5">'+
					
									'<div class="input-group formulaire">'+
										'<input type="text" id="date" class="form-control" placeholder="date" aria-describedby="basic-addon1">'+
										'<input type="text" id="heure" class="form-control" placeholder="heure" aria-describedby="basic-addon1">'+
										'<input type="text" id="lieu" class="form-control" placeholder="lieu" aria-describedby="basic-addon1" rows=4 cols=40 >'+
									'</div>'+
		
								'</div> '+
							'<a id="boutonmodifséance" class="btn btn-primary ">Modifier la séance</a>'+
							
					'</div>'

					);
							
							var séance;
							$('#selectséance').click(function() 
							{
								$(".séancemodifiée").remove(); 
								séance =  $("#selectséance").find("option:selected").text();
							});
							$('#boutonmodifséance').click(function() {clicmodifséance(film, séance);});
							
						}
					});
				}
				else if(val == "Rajouter une séance")
				{
					$(".modifdesc").remove();
					$("#rajoutséance").remove();
					$(".modifséance").remove();
					$(".séancerajoutée").remove();
					$("#modifpriseencompte").remove();
					
					$("#selfilm").click(function() {
						var film =  $("#selfilm").find("option:selected").text();
						if(film=="choix du film")
						{
							$(".modifdesc").remove();
							$(".rajoutséance").remove();
							$(".modifséance").remove();
							$(".séancerajoutée").remove();
							alert("choisir le film dabord")
						}
						else
						{
							$(".modifdesc").remove();
							$("#rajoutséance").remove();
							$(".modifséance").remove();
							$(".séancerajoutée").remove();
							
							$('.container').append(	
									'<div class="row"></div>'+
									'<div id="rajoutséance" class=" encart-titre col-lg-offset-1 col-lg-11 formulaire">'+
				
									'<div><h3>Rajout d\'une séance au film : '+ film +' </h3></div>'+
				
									'<div class="row">'+
				
										//<!-- cadre gauche ================= -->
										'<div class="col-lg-offset-1 col-lg-5">'+
						
											'<p>Rajouter une séance :</p>'+
											'<div class="input-group formulaire">'+
												'<input type="text" id="date" class="form-control" placeholder="date" aria-describedby="basic-addon1">'+
												'<input type="text" id="heure" class="form-control" placeholder="heure" aria-describedby="basic-addon1">'+
												'<input type="text" id="lieu" class="form-control" placeholder="lieu" aria-describedby="basic-addon1" rows=4 cols=40 >'+
											'</div>'+
 						
											//<!-- bouton ================= -->
											'<a id="boutonrajoutséance" class="btn btn-primary ">Rajouter une séance</a>'+
 						
 										'</div> '+
		
										'</div>'+	
				
									'</div>');
							$('#boutonrajoutséance').click(function() {clicrajoutséance(film);});
						}
					});
					
					
				}
				else if(val == "Supprimer une séance")
				{
					$(".modifdesc").remove();
					$(".séancesupprimée").remove();
					$("#rajoutséance").remove();
					$(".modifséance").remove();
					$(".séancerajoutée").remove();
					$("#modifpriseencompte").remove();
					
					$("#selfilm").click(function() {
						var film =  $("#selfilm").find("option:selected").text();
						if(film=="choix du film")
						{
							$(".modifdesc").remove();
							$(".séancesupprimée").remove();
							$(".rajoutséance").remove();
							$(".modifséance").remove();
							$(".séancerajoutée").remove();
							alert("choisir le film dabord")
						}
						else
						{
							$(".modifdesc").remove();
							$(".séancesupprimée").remove();
							$("#rajoutséance").remove();
							$(".modifséance").remove();
							$(".séancerajoutée").remove();
							
							$('.container').append(
						//<!-- Modification description ================= -->
						'<div class="encart-titre col-lg-offset-1 col-lg-11 modifséance">'+
							'<div><h3>Suppression d\'une séance au film : '+ film +'</h3></div>'+
							'<div class="row">'+		
								'<div class="col-lg-offset-3 col-lg-5">'+
									'<select id="selectsuppresseance" class="form-control">'+
										'<option>séance 1</option>'+
										'<option>séance 2</option>'+
										'<option>séance 3</option>'+
										'<option>séance 4</option>'+
										'<option>séance 5</option>'+
										'<option>séance 6</option>'+
									'</select>'+
								'</div>'	+
							'</div>'	+
									
								
							'<a id="boutonsuppressséance" class="btn btn-primary ">Supprimer la séance</a>'+
							
					'</div>'

					);
							$('#boutonsuppressséance').click(function() 
							{
								var séance =  $("#selectsuppresseance").find("option:selected").text();
								$('.container').append(
						
						'<div class="séancesupprimée encart-titre col-lg-offset-1 col-lg-11 modifséance">'+
							
							'<div><h3>La séance ' + séance + ' du film '+ film +' est bien supprimée</h3></div>'+
							
						'</div>');
							});
						}
					});

					
				}
				else if(val == "Choix de la modification")
				{
					$(".modifdesc").remove();
					$(".rajoutséance").remove();
					$(".modifséance").remove();
					$(".séancerajoutée").remove();
					$("#modifpriseencompte").remove();	
				}
			});

		}
		else if(value == "Supprimer un film")
		{
			$(".modifdesc").remove();
			$(".filmsupprimé").remove();
			$(".séancesupprimée").remove();
			$("#modifpriseencompte").remove();
			$(".modifséance").remove();
			$(".séancerajoutée").remove();
			$(".modiffilm").remove();
			
			$('.container').append(	
									'<div class="row"></div>'+
									'<div class="suppress encart-titre col-lg-offset-1 col-lg-11 formulaire">'+
									'<div class="col-lg-offset-3 col-lg-5">'+
										'<div><h3>Suppression d\'un film</h3></div>'+
					
										'<label for="select">Titre du film à supprimer</label>'+
										'<select id="selectsuppressfilm" class="form-control">'+
											'<option>film 1</option>'+
											'<option>film 2</option>'+
											'<option>film 3</option>'+
											'<option>film 4</option>'+
											'<option>film 5</option>'+
											'<option>film 6</option>'+
										'</select>'+
			
										//<!-- bouton ================= -->
										'<a id="boutonsuppressfilm" class="btn btn-primary">supprimer le film</a> '+

									'</div>'	+		
									'</div>'
									
									);
									
									
									
			$("#selectsuppressfilm").click(function() { $(".filmsupprimé").remove(); });
			$("#boutonsuppressfilm").click(function() {
				$(".filmsupprimé").remove();
				
				var film =  $("#selectsuppressfilm").find("option:selected").text();
				$('.container').append('<div class="row"></div>'+
								'<div class="filmsupprimé encart-titre col-lg-offset-1 col-lg-11 formulaire"><h4>Vous avez supprimé le film : ' + film + '</h4></div>');				
				
			});
			
		}
		else if(value == "Editer un spectateur")
		{
			$('.container').append('<div class="row"></div>' +
		'<div class="modif encart-titre col-lg-offset-1 col-lg-11 formulaire2">' +
			
			'<div><h3>Edition d\'un spectateur</h3></div>' +
			'<div class="row modiffilm">'		 +

				// <!-- cadre gauche ================= -->
				'<div class="col-lg-offset-4 col-lg-5">' +
					'<label for="select">Nom du spectateur à modifier</label>'+
					'<select id="selnomspectateur" class="rajouterséance form-control">'+
						'<option>nom du spectateur</option>'+
						'<option>spectateur 1</option>'+
						'<option>spectateur 2</option>'+
						'<option>spectateur 3</option>'+
						'<option>spectateur 4</option>'+
						'<option>spectateur 5</option>'+
						'<option>spectateur 6</option>'+
					'</select>'+
						
					'<label for="select">Type de modification</label>'+
					'<select id="seleditionspectateur" class="form-control">'+
						'<option>Choix de la modification</option>'+
						'<option>Supprimer une séance</option>'+
						'<option>Supprimer le compte</option>'+
					'</select>'+
					
					'<div class="col-lg-12">' +
					'<a id="boutonchoix" class="btn btn-primary">ok</a>' +
					'</div>' +
					
				'</div>'+

			'</div>');	
				
			$("#boutonchoix").click(function() 
			{ 
				
				var selnomspectateur =  $("#selnomspectateur").find("option:selected").text();
				var seleditionspectateur =  $("#seleditionspectateur").find("option:selected").text();
				
				if(seleditionspectateur == "Supprimer le compte")
				{
					$(".séancesupprimé").remove();
					$("#suppressionséance").remove();
					$(".spectateursupprimé").remove();
					$('.container').append('<div class="row"></div>'+
								'<div class="spectateursupprimé encart-titre col-lg-offset-1 col-lg-11 formulaire"><h4>Vous avez supprimé le compte du spectateur : ' + selnomspectateur + '</h4></div>');
				}
				else if(seleditionspectateur == "Supprimer une séance")
				{
					$(".spectateursupprimé").remove();
					$("#suppressionséance").remove();
					$('.container').append(	
									'<div class="row"></div>'+
									'<div id="suppressionséance" class=" encart-titre col-lg-offset-1 col-lg-11 formulaire">'+
				
									'<div><h3>Suppression d\'une séance au spectateur : '+ selnomspectateur +' </h3></div>'+
				
									'<div class="row">'+
				
										//<!-- cadre gauche ================= -->
										'<div class="col-lg-offset-1 col-lg-5">'+
						
											'<div class="row">'+		
												'<div class="col-lg-offset-3 col-lg-5">'+
													'<select id="selectsuppresseance" class="form-control">'+
														'<option>séance 1</option>'+
														'<option>séance 2</option>'+
														'<option>séance 3</option>'+
														'<option>séance 4</option>'+
														'<option>séance 5</option>'+
														'<option>séance 6</option>'+
													'</select>'+
												'</div>'	+
											'</div>'	+
 						
											//<!-- bouton ================= -->
											'<a id="boutonsuppressionséance" class="btn btn-primary ">Supprimer une séance</a>'+
 						
 										'</div> '+
		
										'</div>'+	
				
									'</div>');
					$("#boutonsuppressionséance").click(function() {
						var séancesupprimée =  $("#selectsuppresseance").find("option:selected").text();
						$(".spectateursupprimé").remove();
						$(".séancesupprimé").remove();
						$("#suppressionséance").remove();
						$('.container').append('<div class="row"></div>'+
								'<div class="séancesupprimé encart-titre col-lg-offset-1 col-lg-11 formulaire"><h4>Vous avez supprimé la séance  ' + séancesupprimée + ' au spectateur ' + selnomspectateur + '</h4></div>');
					});
				}
				else if(seleditionspectateur == "Choix de la modification")
				{
					$(".séancesupprimé").remove();
					$("#suppressionséance").remove();
					$(".spectateursupprimé").remove();
					alert("faire un choix");	
				}

			});
		}
		

	});

		
});	
	
	




function clicrajoutséance(f)
{
		var date=$("#date").val();
		var regexdate = new RegExp("^(([0-2][0-9])|([3][0-1]))\/(([0][0-9])|([1][0-2]))\/[2][0-9]{3}$");
		var heure=$("#heure").val();
		var regexheure = new RegExp("^(([0-1][0-9])|([2][0-4]))\:([0-5][0-9])$");
		var lieu=$("#lieu").val();
		var regexlieu = new RegExp("^[a-zA-Z]{3,}$");
		var film=$("#film").val();
		var regexfilm = new RegExp("^[a-zA-Z]{3,}$");
		var réalisateur=$("#réalisateur").val();
		var regexréalistateur = new RegExp("^[a-zA-Z]{3,}$");
		var résumé=$("#résumé").val();
		var regexrésumé = new RegExp("^[a-zA-Z]{3,}$");
		
		if (!regexdate.test(date)) 
		{
			alert("La date doit être au format jj/mm/aaaa avec année compris entre 1900 et 2099");
			return;
     	} 
		else if (!regexheure.test(heure)) 
		{
          	alert("L'heure doit être au format hh:mm avec hh compris entre 00 et 24 et mm compris entre 00 et 59");
			return;
     	}
		else if (!regexlieu.test(lieu)) 
		{
          	alert("Le lieu contient au moins 3 caractères");
			return;
     	}
		else
		{
			$('.container').append('<div class="row"></div>'+
								'<div class="séancerajoutée encart-titre col-lg-offset-1 col-lg-11 formulaire">Vous avez rajouté la séance suivante : '+
									'<h4>le ' + date + ' à ' + heure + ' à ' + lieu +' pour le film ' + f +'</h4>'+
								'</div>');
     	}
		
		
		
			
		
	
}



function clicmodifséance(f, s)
{
		var date=$("#date").val();
		var regexdate = new RegExp("^(([0-2][0-9])|([3][0-1]))\/(([0][0-9])|([1][0-2]))\/[2][0-9]{3}$");
		var heure=$("#heure").val();
		var regexheure = new RegExp("^(([0-1][0-9])|([2][0-4]))\:([0-5][0-9])$");
		var lieu=$("#lieu").val();
		var regexlieu = new RegExp("^[a-zA-Z]{3,}$");
		var film=$("#film").val();
		var regexfilm = new RegExp("^[a-zA-Z]{3,}$");
		var réalisateur=$("#réalisateur").val();
		var regexréalistateur = new RegExp("^[a-zA-Z]{3,}$");
		var résumé=$("#résumé").val();
		var regexrésumé = new RegExp("^[a-zA-Z]{3,}$");
		
		if (!regexdate.test(date)) 
		{
			alert("La date doit être au format jj/mm/aaaa avec année compris entre 1900 et 2099");
			return;
     	} 
		else if (!regexheure.test(heure)) 
		{
          	alert("L'heure doit être au format hh:mm avec hh compris entre 00 et 24 et mm compris entre 00 et 59");
			return;
     	}
		else if (!regexlieu.test(lieu)) 
		{
          	alert("Le lieu contient au moins 3 caractères");
			return;
     	}
		else
		{	
			$('.container').append(
								'<div class="row"></div>'+
								'<div class="séancemodifiée encart-titre col-lg-offset-1 col-lg-11 formulaire">La séance ' + s +' devient : '+
									'<h4>le ' + date + ' à ' + heure + ' à ' + lieu +' pour le film ' + f +'</h4>'+
								'</div>');
     	}
		
		
		
			
		
	
}



function clicmodiffilm()
{
		var titre=$("#titre").val();
     	var regextitre = new RegExp("^[a-zA-Z]{3,}$");
		var auteur=$("#auteur").val();
		var regexauteur = new RegExp("^[a-zA-Z]{3,}$");
		var résumé=$("#résumé").val();
		var regexrésumé = new RegExp("^[a-zA-Z]{3,}$");
		
		
		if (!regextitre.test(titre)) 
		{
			alert("Le titre contient au moins 3 caractères");
			return;
     	} 
		else if (!regexauteur.test(auteur)) 
		{
          	alert("L'auteur contient au moins 3 caractères");
			return;
     	}	
     	else if (!regexrésumé.test(résumé)) 
		{
          	alert("Le résumé contient au moins 3 caractères");
			b_lieu = false;
			return;
     	}
		else
		{
			$('.container').append('<div id="modifpriseencompte" class="encart-titre col-lg-offset-1 col-lg-11">Votre modification est prise en compte</h4></div>');	
			return;
     	}
	
}



function clic()
{
		var date=$("#date").val();
     	var regexdate = new RegExp("^(([0-2][0-9])|([3][0-1]))\/(([0][0-9])|([1][0-2]))\/[2][0-9]{3}$");
		if (!regexdate.test(date)) 
		{
			alert("La date doit être au format jj/mm/aaaa avec année compris entre 1900 et 2099");
			b_date = false;
			return;
     	} 
		

		var heure=$("#heure").val();
		var regexheure = new RegExp("^(([0-1][0-9])|([2][0-4]))\:([0-5][0-9])$");
     	if (!regexheure.test(heure)) 
		{
          	alert("L'heure doit être au format hh:mm avec hh compris entre 00 et 24 et mm compris entre 00 et 59");
			return;
     	}
		

		var lieu=$("#lieu").val();
		var regexlieu = new RegExp("^[a-zA-Z]{3,}$");
     	if (!regexlieu.test(lieu)) 
		{
          	alert("Le lieu contient au moins 3 caractères");
			b_lieu = false;
			return;
     	}
		
		
		$('.container').append('<div class="encart-titre col-lg-offset-1 col-lg-11 formulaire">Vous avez rajouté la séance suivante : '	+
									'le <h4>' + date + 
      								'</h4> à <h4>' + heure + 
      								'</h4> à <h4>' + lieu +
      								'</h4> pour le film <h4>' + film +
								'</h4></div>');	
		
	
}















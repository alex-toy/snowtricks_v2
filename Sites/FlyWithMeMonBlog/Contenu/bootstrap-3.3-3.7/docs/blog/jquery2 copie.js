$(document).ready(function(){

	var b_date = false;
	var b_heure = false;
	var b_lieu = false;
	var b_film = false;
	var b_réalisateur = false;
	var b_résumé = false;
	
	
	
	
	

	$( '.btn-primary' ).click(function() {

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
		
		
		
		var film=$("#film").val();
		var regexfilm = new RegExp("^[a-zA-Z]{3,}$");
     	if (!regexfilm.test(film)) 
		{
          	alert("Le film contient au moins 3 caractères");
			b_film = false;
			return;
     	}
		
		var réalisateur=$("#réalisateur").val();
		var regexréalistateur = new RegExp("^[a-zA-Z]{3,}$");
     	if (!regexréalistateur.test(réalistateur)) 
		{
          	alert("Le réalisateur contient au moins 3 caractères");
			b_réalisateur = false;
			return;
     	}
		
		
		var résumé=$("#résumé").val();
		var regexrésumé = new RegExp("^[a-zA-Z]{3,}$");
     	if (!regexrésumé.test(résumé)) 
		{
          	alert("Le résumé contient au moins 3 caractères");
			return;
     	}
		
		
		
		
		
		$('.container').append('<div class="encart-titre col-lg-offset-1 col-lg-11 formulaire">Vous avez rajouté la séance suivante : '	+
									'le <h4>' + date + 
      								'</h4> à <h4>' + heure + 
      								'</h4> à <h4>' + lieu +
      								'</h4> pour le film <h4>' + film +
								'</h4></div>');	
		
	
	});	
	
	
	
	
	
	

});































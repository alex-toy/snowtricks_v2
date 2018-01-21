$(document).ready(function(){


	$encart = $('.encart');
	$projection = $('.projection');
	$actu = $('.actu');
	$résumé = $('.résumé');
	$bouton = $('.btn');


	$actu.on('mouseenter', function(){

		$(this).css("border-color" , "yellow");
		$(this).append('<div class="row"><a class="btn btn-primary" href="/Users/alexei/Documents/OPENCLASSROOM/projet3/prototype/bootstrap-3.3-3.7/docs/examples/Festival/actualité1.html">Visualiser l\'actualité</a></div>');
	});


	$actu.on('mouseleave', function(){

	
		$(this).css("border-color" , "blue");
		$fils = $(this).find('a');
		$fils.remove();
	});


	$projection.on('mouseenter', function(){

		$(this).css("border-color" , "yellow");
	


		$(this).append('<div class="row"><div class="col-lg-5"></div><div class="col-lg-3"><a class="btn btn-primary btn-block">S\'inscrire</a></div></div>');
					
	});


	$projection.on('mouseleave', function(){

	
		$(this).css("border-color" , "blue");
		$fils = $(this).find('a');
	
	
		$fils.remove();
	
	});
					


	$résumé.on('mouseenter', function(){

		$(this).css("border-color" , "yellow");	

		$(this).append('<div class="row"><a class="btn btn-primary" href="/Users/alexei/Documents/OPENCLASSROOM/projet3/prototype/bootstrap-3.3-3.7/docs/examples/Festival/inscription.html">S\'inscrire à cette projection</a></div>' );
		
	});


	$résumé.on('mouseleave', function(){

	
		$(this).css("border-color" , "blue");
		$fils = $(this).find('a');
	
	
		$fils.remove();
	
	});


	$( "#select" ).click(function() {

		$('.séance').remove();
		$('.séance2').remove();
		var value =  $(this).find("option:selected").text();
		$('.app').append('<div class="séance">' + 
      							'<label for="select"> Les séances du '  + value + ' sont : </label>' +
      								'<select id="select2" class="form-control">' +
      									'<option value="1">choisir une séance</option>' +
        								'<option value="1">séance 1</option>' +
        								'<option value="2">séance 2</option>' +
        								'<option value="3">séance 3</option>' +
      								'</select>' +
    							'</div>');	
		$('.btn').remove();
		$('.formulaire').append('<a class="btn btn-primary" disabled = "true">éditer</a>');
				
    	$( "#select2").click(function() {
  			$('.séance2').remove();
			$('.app').append('<div class="séance2">' + 
      							'<label for="select2"> Que voulez vous faire sur cette séance ? </label>' +
      								'<select id="select3" class="form-control">' +
        								'<option value="1">choisir une action</option>' +
        								'<option value="1">déplacer la séance</option>' +
        								'<option value="2">supprimer la séance</option>' +
      								'</select>' +
    						'</div>');

			$( "#select3").click(function() {
			
				$('.btn').remove();
				$('.formulaire').append('<div class="row"><a class="btn btn-primary" href="/Users/alexei/Documents/OPENCLASSROOM/projet3/prototype/bootstrap-3.3-3.7/docs/examples/Festival/seanceéditée.html">éditer</a></div>');

			});
			
			
				
	});
    	
    	
    	
    	
    								
	});


  
  
  
  	
  
  
  
  
  
  
   

	
	















});































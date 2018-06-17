



function lazyload(numberFigures) {
    
    //alert('test : ', numberFigures)
    
    var showNumber = 0;
    var step = 5;
    var figures = document.getElementsByClassName("figure_min");
    
    
    window.addEventListener('scroll', function ( event ) {
        
        var total = document.body.scrollTop + window.innerHeight;
        
        
        
        if(total >= document.body.scrollHeight && showNumber < numberFigures ){
            showNumber += step;
            var start = (showNumber-step)>=0 ? showNumber-step : 0
            if( showNumber > numberFigures ){ showNumber = figures.length }
            
            for (var i = start ; i < showNumber ; i++) {
                figures[i].style.display = "block";
            }
            
            
            for (var opacity = 0; opacity < 1; opacity += 0.00001) {
                for (var i = showNumber-step; i < showNumber; i++) {
                    figures[i].style.opacity = opacity;
                }
                
            }
            
        }
        
}, false);
    
    
}


lazyload(numberFigures)


$(document).ready(function(){
    /*
	$('#toggle-panel-left').click(function(){
        $('.panel').slideToggle('slow');
        });
    */

	$('#toggle-panel-left').click(function(){
		$('#show-ns').slideUp('slow', function() { 
			$('#show-vnfs').slideToggle('slow');
        });
		$(this).toggleClass("active");
    });
	
	$('#toggle-panel-left-ns').click(function(){
        $('#show-vnfs').slideUp('slow', function() {
			$('#show-ns').slideToggle('slow');
        });
		$(this).toggleClass("active");
    });
    
});
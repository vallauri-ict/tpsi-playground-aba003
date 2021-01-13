$(document).ready(function(){
	var rangePercent = $('[type="range"]').val();
	$('h4').text(rangePercent + " users");
	$('[type="range"]').on('change input', function() {
		rangePercent = $('[type="range"]').val();
		if(rangePercent == "1") {
			$('h4').text(rangePercent + " user");
		}
		else{
			$('h4').text(rangePercent + " users");
		};
		
	});
});

$(document).ready(function(){
    
    $(".minicart select#country_txt").change(function(){
    	this.form.submit();
    });
});
 function priceQtip(){
    $('span.calcprice,img.discount,.minicartline td.calcprice').each(function(){
        $(this).qtip(
	       {
				content: {
				// Set the text to an image HTML string with the correct src URL to the loading image you want to use
				text: '<img class="throbber" src="/images/common/throbber.gif" alt="Loading..." />',
				ajax: {
					url: '/includes/ajax.price.php?action=getPriceTable&optprod_id='+$(this).parents('tr').attr('id').split('-')[1] // Use the rel attribute of each element for the url to load
				},
				title: {
					text: 'Volume discount', // Give the tooltip a title using each elements text
					button: false
				}
			},
			position: {
				at: 'bottom center', // Position the tooltip above the link
				my: 'top center',
				viewport: $(window), // Keep the tooltip on-screen at all times
				effect: true //  positioning animation
			},
			show: {
				event: 'mouseover',
				solo: true // Only show one tooltip at a time
			},
			hide: 'mouseout',
			style: {
				classes: 'ui-tooltip-pricetable ui-tooltip-plain ui-tooltip-shadow'
			}
		}
);

});

		}

$(document).ready(function(){


    $('.productoptions tr input[name="size"],.productoptions tr input[name="unit"]').live('keyup',function(){
                        zthis=$(this);
                        delay(function(){
                            lengthcalculprice(zthis);
                        }, 500 );

    })

    function lengthcalculprice(zthis){
                        var formid = zthis.data('formid');
                        var pricepercut = zthis.data('pricepercut');
                        var price = zthis.data('price');
                        var length= $('form[id="pf-'+formid+'"] input[name="size"]').val().replace(",",".");
                        var unit= $('form[id="pf-'+formid+'"] input[name="unit"]').val().replace(",",".");
                        var finalPrice = (price*length*unit + unit*pricepercut).toFixed(2);
                        $('form[id="pf-'+formid+'"]  input[name="price"]').val(finalPrice);
    }

    $('.productoption input[type="text"],.fullproductname,.delprod img,img.emptycart,img.delprod,.helptooltip').qtip(
    	{
    				position: {
    					my: 'top left', // Use the corner...
    					at: 'bottom center', // ...and opposite corner
    					viewport: $(window), // Keep the tooltip on-screen at all times
    					effect: true //  positioning animation
    				},

    				style: {
    					classes: 'ui-tooltip-shadow ui-tooltip-plain'
    				}
    			}

    );

		priceQtip();
});


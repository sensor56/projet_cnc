/* ----------------------------------------
   Template Prestashop VapoteShop
   Copyright Prestacrea
   Author: Prestacrea
   Website: http://www.prestacrea.com
   ---------------------------------------- */

$(document).ready(function() {
	quick_view();
});

function quick_view()
{
	$(document).on('click', '.quick-view:visible', function(e) 
	{
		e.preventDefault();
		var url = this.rel;
		if (url.indexOf('?') != -1)
			url += '&';
		else
			url += '?';

		if (!!$.prototype.fancybox)
			$.fancybox({
				'padding':  0,
				'width':    740,
				'height':   610,
				'type':     'iframe',
				'href':     url + 'content_only=1',
				onStart: function(){
					$("html").css({'overflow-y':'hidden'});
				},
				'onComplete' : function(){
					jQuery.fancybox.showActivity();
					jQuery('#fancybox-frame').load(function(){
						jQuery.fancybox.hideActivity();
					});

				},
				onClosed: function(){
					$("html").css({'overflow-y':'visible'});
				}
			});
	});
}
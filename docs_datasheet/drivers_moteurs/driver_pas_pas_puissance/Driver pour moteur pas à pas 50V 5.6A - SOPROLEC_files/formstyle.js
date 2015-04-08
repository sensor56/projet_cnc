/* ----------------------------------------
   Template Prestashop VapoteShop
   Copyright Prestacrea
   Author: Prestacrea
   Website: http://www.prestacrea.com
   ---------------------------------------- */

$(function() {
	$("select").select_style();
	$("#locationSelect").select_unstyle();
	$("#order-opc #days").select_unstyle();
	$("#order-opc #months").select_unstyle();
	$("#order-opc #years").select_unstyle();
});

$(function() {

	$.fn.select_style = function() {
		return this.each(function() {
			selectElement = $(this);
			if (!selectElement.attr('multiple')) {
				// create the select container
				selectElement.wrap('<div class="styled-select"></div>');
				selectContainer = selectElement.parent();
				selectContainer.children().before('<div class="styled-select-text">&nbsp;</div>').each(function() {
					if (this.selectedIndex >= 0) $(this).prev().html(this.options[this.selectedIndex].innerHTML)
				});
				if (selectElement.parent().is(':visible'))
				selectContainer.width(selectElement.outerWidth());
				else
				selectContainer.width(selectElement.outerWidth()-6);
				// hide the original select
				selectElement.css({'opacity':0,'position':'relative','left':'-1px','height':'24px','z-index':100});
				if (selectElement.css('display') == 'none')
				selectContainer.css({'display':'none'});
				// get and style the select text
				var selectText = selectContainer.children().prev();
				selectText.width(selectContainer.innerWidth()-selectElement.css('padding-right').replace(/px,*\)*/g,"")-selectElement.css('padding-left').replace(/px,*\)*/g,"")-selectText.css('padding-right').replace(/px,*\)*/g,"")-selectText.css('padding-left').replace(/px,*\)*/g,"")-selectContainer.innerHeight());
				// add events
				selectContainer.children().click(function() {
					selectText.html((this.options.length > 0 && this.selectedIndex >= 0 ? this.options[this.selectedIndex].innerHTML : ''));
				});
				selectContainer.children().change(function() {
					selectText.html((this.options.length > 0 && this.selectedIndex >= 0 ? this.options[this.selectedIndex].innerHTML : ''));
				});
			}
		});
	}
	
	$.fn.select_unstyle = function() {
		return this.each(function() {
			selectElement = $(this);
			if (!selectElement.attr('multiple') && selectElement.parent().hasClass('styled-select')) {
				selectElement.siblings('.styled-select-text').remove();
				selectElement.css({'opacity':100,'position':'static','left':'0','height':'26px','z-index':0}).unwrap();
			}
		});
	}

}(jQuery));
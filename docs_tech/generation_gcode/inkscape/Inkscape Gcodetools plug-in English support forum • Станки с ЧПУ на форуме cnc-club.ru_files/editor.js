/**
* bbCode control by subBlue design [ www.subBlue.com ]
* Includes unixsafe colour palette selector by SHS`
*/

// Startup variables
var imageTag = false;
var theSelection = false;

var bbcodeEnabled = true;
// Check for Browser & Platform for PC & IE specific bits
// More details from: http://www.mozilla.org/docs/web-developer/sniffer/browser_type.html
var clientPC = navigator.userAgent.toLowerCase(); // Get client info
var clientVer = parseInt(navigator.appVersion); // Get browser version

var is_ie = ((clientPC.indexOf('msie') != -1) && (clientPC.indexOf('opera') == -1));
var is_win = ((clientPC.indexOf('win') != -1) || (clientPC.indexOf('16bit') != -1));
var baseHeight;

/**
* Shows the help messages in the helpline window
*/
function helpline(help)
{
	document.forms[form_name].helpbox.value = help_line[help];
}

/**
* Fix a bug involving the TextRange object. From
* http://www.frostjedi.com/terra/scripts/demo/caretBug.html
*/ 
function initInsertions() 
{
	var doc;

	if (document.forms[form_name])
	{
		doc = document;
	}
	else 
	{
		doc = opener.document;
	}

	var textarea = doc.forms[form_name].elements[text_name];

	if (is_ie && typeof(baseHeight) != 'number')
	{
		textarea.focus();
		baseHeight = doc.selection.createRange().duplicate().boundingHeight;

		if (!document.forms[form_name])
		{
			document.body.focus();
		}
	}
}

/**
* bbstyle
*/
function bbstyle(bbnumber)
{	
	if (bbnumber != -1)
	{
		bbfontstyle(bbtags[bbnumber], bbtags[bbnumber+1]);
	} 
	else 
	{
		insert_text('[*]');
		document.forms[form_name].elements[text_name].focus();
	}
}

/**
* Apply bbcodes
*/
function bbfontstyle(bbopen, bbclose)
{
	theSelection = false;

	var textarea = document.forms[form_name].elements[text_name];

	textarea.focus();

	if ((clientVer >= 4) && is_ie && is_win)
	{
		// Get text selection
		theSelection = document.selection.createRange().text;

		if (theSelection)
		{
			// Add tags around selection
			document.selection.createRange().text = bbopen + theSelection + bbclose;
			document.forms[form_name].elements[text_name].focus();
			theSelection = '';
			return;
		}
	}
	else if (document.forms[form_name].elements[text_name].selectionEnd && (document.forms[form_name].elements[text_name].selectionEnd - document.forms[form_name].elements[text_name].selectionStart > 0))
	{
		mozWrap(document.forms[form_name].elements[text_name], bbopen, bbclose);
		document.forms[form_name].elements[text_name].focus();
		theSelection = '';
		return;
	}
	
	//The new position for the cursor after adding the bbcode
	var caret_pos = getCaretPosition(textarea).start;
	var new_pos = caret_pos + bbopen.length;		

	// Open tag
	insert_text(bbopen + bbclose);

	// Center the cursor when we don't have a selection
	// Gecko and proper browsers
	if (!isNaN(textarea.selectionStart))
	{
		textarea.selectionStart = new_pos;
		textarea.selectionEnd = new_pos;
	}	
	// IE
	else if (document.selection)
	{
		var range = textarea.createTextRange(); 
		range.move("character", new_pos); 
		range.select();
		storeCaret(textarea);
	}

	textarea.focus();
	return;
}

/**
* Insert text at position
*/
function insert_text(text, spaces, popup)
{
	var textarea;
	
	if (!popup) 
	{
		textarea = document.forms[form_name].elements[text_name];
	} 
	else 
	{
		textarea = opener.document.forms[form_name].elements[text_name];
	}
	if (spaces) 
	{
		text = ' ' + text + ' ';
	}

	// Since IE9, IE also has textarea.selectionStart, but it still needs to be treated the old way.
	// Therefore we simply add a !is_ie here until IE fixes the text-selection completely.
	if (!isNaN(textarea.selectionStart) && !is_ie)
	{
		var sel_start = textarea.selectionStart;
		var sel_end = textarea.selectionEnd;

		mozWrap(textarea, text, '');
		textarea.selectionStart = sel_start + text.length;
		textarea.selectionEnd = sel_end + text.length;
	}
	else if (textarea.createTextRange && textarea.caretPos)
	{
		if (baseHeight != textarea.caretPos.boundingHeight) 
		{
			textarea.focus();
			storeCaret(textarea);
		}

		var caret_pos = textarea.caretPos;
		caret_pos.text = caret_pos.text.charAt(caret_pos.text.length - 1) == ' ' ? caret_pos.text + text + ' ' : caret_pos.text + text;
	}
	else
	{
		textarea.value = textarea.value + text;
	}
	if (!popup) 
	{
		textarea.focus();
	}
}

/**
* Add inline attachment at position
*/
function attach_inline(index, filename)
{
	insert_text('[attachment=' + index + ']' + filename + '[/attachment]');
	document.forms[form_name].elements[text_name].focus();
}

/**
* Add quote text to message
*/
function addquote(post_id, username, l_wrote)
{
	var message_name = 'message_' + post_id;
	var theSelection = '';
	var divarea = false;

	if (l_wrote === undefined)
	{
		// Backwards compatibility
		l_wrote = 'wrote';
	}

	if (document.all)
	{
		divarea = document.all[message_name];
	}
	else
	{
		divarea = document.getElementById(message_name);
	}

	// Get text selection - not only the post content :(
	// IE9 must use the document.selection method but has the *.getSelection so we just force no IE
	if (window.getSelection && !is_ie && !window.opera)
	{
		theSelection = window.getSelection().toString();
	}
	else if (document.getSelection && !is_ie)
	{
		theSelection = document.getSelection();
	}
	else if (document.selection)
	{
		theSelection = document.selection.createRange().text;
	}

	if (theSelection == '' || typeof theSelection == 'undefined' || theSelection == null)
	{
		if (divarea.innerHTML)
		{
			theSelection = divarea.innerHTML.replace(/<br>/ig, '\n');
			theSelection = theSelection.replace(/<br\/>/ig, '\n');
			theSelection = theSelection.replace(/&lt\;/ig, '<');
			theSelection = theSelection.replace(/&gt\;/ig, '>');
			theSelection = theSelection.replace(/&amp\;/ig, '&');
			theSelection = theSelection.replace(/&nbsp\;/ig, ' ');
		}
		else if (document.all)
		{
			theSelection = divarea.innerText;
		}
		else if (divarea.textContent)
		{
			theSelection = divarea.textContent;
		}
		else if (divarea.firstChild.nodeValue)
		{
			theSelection = divarea.firstChild.nodeValue;
		}
	}

	if (theSelection)
	{
		if (bbcodeEnabled)
		{
			insert_text('[quote="' + username + '"]' + theSelection + '[/quote]');
		}
		else
		{
			insert_text(username + ' ' + l_wrote + ':' + '\n');
			var lines = split_lines(theSelection);
			for (i = 0; i < lines.length; i++)
			{
				insert_text('> ' + lines[i] + '\n');
			}
		}
	}

	return;
}

function split_lines(text)
{
	var lines = text.split('\n');
	var splitLines = new Array();
	var j = 0;
	for(i = 0; i < lines.length; i++)
	{
		if (lines[i].length <= 80)
		{
			splitLines[j] = lines[i];
			j++;
		}
		else
		{
			var line = lines[i];
			do
			{
				var splitAt = line.indexOf(' ', 80);
				
				if (splitAt == -1)
				{
					splitLines[j] = line;
					j++;
				}
				else
				{
					splitLines[j] = line.substring(0, splitAt);
					line = line.substring(splitAt);
					j++;
				}
			}
			while(splitAt != -1);
		}
	}
	return splitLines;
}
/**
* From http://www.massless.org/mozedit/
*/
function mozWrap(txtarea, open, close)
{
	var selLength = (typeof(txtarea.textLength) == 'undefined') ? txtarea.value.length : txtarea.textLength;
	var selStart = txtarea.selectionStart;
	var selEnd = txtarea.selectionEnd;
	var scrollTop = txtarea.scrollTop;

	if (selEnd == 1 || selEnd == 2) 
	{
		selEnd = selLength;
	}

	var s1 = (txtarea.value).substring(0,selStart);
	var s2 = (txtarea.value).substring(selStart, selEnd);
	var s3 = (txtarea.value).substring(selEnd, selLength);

	/* Add [*] to each line inside list bbcodes*/
	if (open == '[list]' || open == '[list=]')
	{
		lines = s2.split('\n');
		s2 = '';
		for(i = 0; i < lines.length; i++)
		{
			s2 += '[*]'+lines[i]+"\n";
		}
	}

	txtarea.value = s1 + open + s2 + close + s3;
	txtarea.selectionStart = selStart + open.length;
	txtarea.selectionEnd = selEnd + open.length;
	txtarea.focus();
	txtarea.scrollTop = scrollTop;

	return;
}

/**
* Insert at Caret position. Code from
* http://www.faqts.com/knowledge_base/view.phtml/aid/1052/fid/130
*/
function storeCaret(textEl)
{
	if (textEl.createTextRange)
	{
		textEl.caretPos = document.selection.createRange().duplicate();
	}
}

/**
* Color pallette
*/
function colorPalette(dir, width, height)
{
	var r = 0, g = 0, b = 0;
	var numberList = new Array(6);
	var color = '';

	numberList[0] = '00';
	numberList[1] = '40';
	numberList[2] = '80';
	numberList[3] = 'BF';
	numberList[4] = 'FF';

	document.writeln('<table cellspacing="1" cellpadding="0" border="0">');

	for (r = 0; r < 5; r++)
	{
		if (dir == 'h')
		{
			document.writeln('<tr>');
		}

		for (g = 0; g < 5; g++)
		{
			if (dir == 'v')
			{
				document.writeln('<tr>');
			}
			
			for (b = 0; b < 5; b++)
			{
				color = String(numberList[r]) + String(numberList[g]) + String(numberList[b]);
				document.write('<td bgcolor="#' + color + '" style="width: ' + width + 'px; height: ' + height + 'px;">');
				document.write('<a href="#" onclick="bbfontstyle(\'[color=#' + color + ']\', \'[/color]\'); return false;"><img src="images/spacer.gif" width="' + width + '" height="' + height + '" alt="#' + color + '" title="#' + color + '" /></a>');
				document.writeln('</td>');
			}

			if (dir == 'v')
			{
				document.writeln('</tr>');
			}
		}

		if (dir == 'h')
		{
			document.writeln('</tr>');
		}
	}
	document.writeln('</table>');
}


/**
* Caret Position object
*/
function caretPosition()
{
	var start = null;
	var end = null;
}


/**
* Get the caret position in an textarea
*/
function getCaretPosition(txtarea)
{
	var caretPos = new caretPosition();
	
	// simple Gecko/Opera way
	if(txtarea.selectionStart || txtarea.selectionStart == 0)
	{
		caretPos.start = txtarea.selectionStart;
		caretPos.end = txtarea.selectionEnd;
	}
	// dirty and slow IE way
	else if(document.selection)
	{
	
		// get current selection
		var range = document.selection.createRange();

		// a new selection of the whole textarea
		var range_all = document.body.createTextRange();
		range_all.moveToElementText(txtarea);
		
		// calculate selection start point by moving beginning of range_all to beginning of range
		var sel_start;
		for (sel_start = 0; range_all.compareEndPoints('StartToStart', range) < 0; sel_start++)
		{		
			range_all.moveStart('character', 1);
		}
	
		txtarea.sel_start = sel_start;
	
		// we ignore the end value for IE, this is already dirty enough and we don't need it
		caretPos.start = txtarea.sel_start;
		caretPos.end = txtarea.sel_start;			
	}

	return caretPos;
}

function code_variants() {
	code = $('input[name="addbbcode8"]');
	code.wrap("<div style='display:inline; position:relative;'>")
	code_var = $(
		'<div class="code-variants" style="display:none;">'+
			'<a href="#" onclick="bbfontstyle(\'[code]\', \'[/code]\'); return false;">Auto</a><br>'+
			'<a href="#" onclick="bbfontstyle(\'[code=python]\', \'[/code]\'); return false;">Python</a><br>'+
			'<a href="#" onclick="bbfontstyle(\'[code=ini]\', \'[/code]\'); return false;">ini</a><br>'+
			'<a href="#" onclick="bbfontstyle(\'[code=hal]\', \'[/code]\'); return false;">hal</a><br>'+
			'<a href="#" onclick="bbfontstyle(\'[code=gcode]\', \'[/code]\'); return false;">Gcode</a><br>'+
			'<a href="#" onclick="bbfontstyle(\'[code=xml]\', \'[/code]\'); return false;">XML</a><br>'+
			'<a href="#" onclick="bbfontstyle(\'[code=off]\', \'[/code]\'); return false;">Нет</a><br>'+
		'</div>'
		);
	code.after(code_var);
		
	code.hover(function(){code_var.show();},function(){code_var.hide();});
	code_var.hover(function(){code_var.show();},function(){code_var.hide();});

}

onload_functions.push('code_variants()');

function remove_h_and_table_spaces()
{
	var textarea = document.forms[form_name].elements[text_name];
	textarea.value = textarea.value.replace(/(\[\/h(1|2|3)\])\s+/gim, "$1 ");
	textarea.value = textarea.value.replace(/\s*(\[\/?(td|tr)\])\s*/gim, "$1");
	textarea.value = textarea.value.replace(/\s*(\[\/?list(=[0-9A-Za-z])?\])\s*/gim, "$1");
	
	return true;
}


function add_h_and_table_spaces()
{
	if (typeof form_name === "undefined") return;
	var textarea = document.forms[form_name].elements[text_name];
	remove_h_and_table_spaces();
	textarea.value = textarea.value.replace(/(\[\/h(1|2|3)\])\s*/gim, "$1\n");
	textarea.value = textarea.value.replace(/(\[td\])/gim, "\n		$1\n			");
	textarea.value = textarea.value.replace(/(\[tr\])/gim, "\n	$1");
	textarea.value = textarea.value.replace(/(\[\/td\])/gim, "\n		$1");
	textarea.value = textarea.value.replace(/(\[\/tr\])/gim, "\n	$1\n");
	textarea.value = textarea.value.replace(/(\[\/list\])/gim, "\n$1\n\n");
	textarea.value = textarea.value.replace(/(\[list(=[0-9A-Za-z])?\])/gim, "\n\n$1\n");
	
	return;

}

var show_img_bbcode_warn = true;
var show_img_bbcode_warn_button;

function img_bbcode_check(){
	jQuery("#postform .button1").click(function(e) {
		var self = this;
		show_img_bbcode_warn_button = self;
		if (show_img_bbcode_warn)
		{
		  	show_img_bbcode_warn = false;		
			console.log(e);
			text = $("textarea#message").val();
			if ( text.search("\\\[img\\\]")>0 )
			{
				e.preventDefault();
			
				$.colorbox({html:"<div class='image-bbcode-error'><a href='/forum/styles/prosilver/imageset/images-bbcode.png' target='_blank'><img src='/forum/styles/prosilver/imageset/images-bbcode-small.png'></a>"+
				"<h1>Загружайте изображения прямо на форум!</h1>"+
				"<p>Можете загрузить несколько файлов одновременно, для этого выбирайте их при помощи Shift или Ctrl.</p>"+
				"<p>Изображения размещенные на сторонних ресурсах очень часто исчезают через непродолжительное время и мы не можем гаранитировать их доступность в будущем. Файлы загруженные на форум не пропадают бесследно, мы их бережно храним.</p>"+
				"<p>Более того мы не можем правильно обработать (уменьшить, добавить ссылки на оригинал и т.д.) изображения расположенные на сторонних серверах, они могут выходить за размеры экрана и потреблять дополнительный трафик пользователей.</p>"+
				"<p>Спасибо за понимание.</p>"+
				"<input type='button' onclick='$.colorbox.close()' value='Ок сейчас исправлю'> <input type='button' onclick='show_img_bbcode_warn_button.click();' value='Я все понимаю и хочу отправить сообщение всеравно'>"+
				"<h1>Upload all images to the forum!</h1>"+
				"<p>Please upload all images to the forum! You can upload several images simultaneously by choosing them with Shift or Ctrl.</p>"+
				"<input type='button' onclick='$.colorbox.close()' value='Ok, let me upload them'> <input type='button' onclick='show_img_bbcode_warn_button.click();' value='Submit the form anyway'></div>"
						});
			 	return false; //is superfluous, but I put it here as a fallback
		  	}
	
		}
	});
}

onload_functions.push("img_bbcode_check();");


try {
	document.forms[form_name].onsubmit = 	remove_h_and_table_spaces();
	onload_functions.push('add_h_and_table_spaces();');
} 
catch(e) {}


function add_quick_quote_to_pm() {
	$(".postbody div.content").mouseup(function(event) {
			quick_quoute($(this).parent().children("p.author").children("strong.author").text(), event);
		});

}
onload_functions.push('add_quick_quote_to_pm();');




function quick_quoute(author,event)
{
	//alert(author);
	// Get cursor coordinates
	// Which mouse button is pressed?
	var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft; // FF || IE
	var pageY = event.pageY || event.clientY + document.documentElement.scrollTop; // FF || IE
	var key = event.button || event.which || null; // IE || FF || Unknown
	setTimeout(function() { // Timeout prevents popup when clicking on selected text
		var sel = '';
		if (window.getSelection)
			sel = window.getSelection().toString();
		else if (document.getSelection)
			sel = document.getSelection();
		else if (document.selection)
			sel = document.selection.createRange().text;
		if (sel && key <= 1) 
		{ // If text selected && right mouse button not pressed
			$("#quote_selected").css({top: (pageY + 20), left: (pageX > 64 ? pageX - 64 : pageX - 20)}).show("fast");
			$(document.body).unbind("mouseup");
			$("#quote_selected a").live("mousedown", function() {
					if ($("#qr_editor_div").length>0 && $("#qr_editor_div").css("display") != "block") {dE('qr_editor_div');dE('qr_showeditor_div');}
//							.val( $("#message-box textarea").val()+'[quote="'+author+'"]'+sel+'[/quote]\r\n' );
					mozWrap($("#message-box textarea").get(0),'[quote="'+author+'"]'+sel+'[/quote]\r\n',"");
					// textarea.caretPos
					$("#quote_selected a").die("mousedown");
					$("#quote_selected").hide("fast");
					$(document.body).unbind('click');
				});

			setTimeout( function (){
				$(document.body).mouseup(function() {
								$("#quote_selected a").die("mousedown");
								$("#quote_selected").hide("fast");
								$(document.body).unbind('click');
							}
						);
				},10);

		}	
	
	},0);

}

function bbcodes_hotkeys() {
	$("#message-box textarea").bind('keydown', function(e)
			{
				if (String.fromCharCode(e.keyCode) == 'B' && event.ctrlKey)
					{bbfontstyle("[b]","[/b]"); return false;}
				else if (String.fromCharCode(e.keyCode) == 'I' && event.ctrlKey)
					{bbfontstyle("[i]","[/i]"); return false;}
				else if (String.fromCharCode(e.keyCode) == '1' && event.ctrlKey)
					{bbfontstyle("[h1]","[/h1]"); return false;}
				else if (String.fromCharCode(e.keyCode) == '2' && event.ctrlKey)
					{bbfontstyle("[quote]","[/quote]"); return false;}
				else if (String.fromCharCode(e.keyCode) == '3' && event.ctrlKey)
					{bbfontstyle("[code]","[/code]"); return false;}
				 }
			 )
}
onload_functions.push('bbcodes_hotkeys();');

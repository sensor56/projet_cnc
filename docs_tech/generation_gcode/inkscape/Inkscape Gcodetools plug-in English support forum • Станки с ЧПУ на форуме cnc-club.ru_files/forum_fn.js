/**
* phpBB3 forum functions
*/

$ = jQuery;

/**
* Window popup
*/
function popup(url, width, height, name)
{
	if (!name)
	{
		name = '_popup';
	}

	window.open(url.replace(/&amp;/g, '&'), name, 'height=' + height + ',resizable=yes,scrollbars=yes, width=' + width);
	return false;
}

/**
* Jump to page
*/
function jumpto()
{
	var page = prompt(jump_page, on_page);

	if (page !== null && !isNaN(page) && page == Math.floor(page) && page > 0)
	{
		if (base_url.indexOf('?') == -1)
		{
			document.location.href = base_url + '?start=' + ((page - 1) * per_page);
		}
		else
		{
			document.location.href = base_url.replace(/&amp;/g, '&') + '&start=' + ((page - 1) * per_page);
		}
	}
}

/**
* Mark/unmark checklist
* id = ID of parent container, name = name prefix, state = state [true/false]
*/
function marklist(id, name, state)
{
	var parent = document.getElementById(id);
	if (!parent)
	{
		eval('parent = document.' + id);
	}

	if (!parent)
	{
		return;
	}

	var rb = parent.getElementsByTagName('input');
	
	for (var r = 0; r < rb.length; r++)
	{	
		if (rb[r].name.substr(0, name.length) == name)
		{
			rb[r].checked = state;
		}
	}
}

/**
* Resize viewable area for attached image or topic review panel (possibly others to come)
* e = element
*/
function viewableArea(e, itself)
{
	if (!e) return;
	if (!itself)
	{
		e = e.parentNode;
	}
	
	if (!e.vaHeight)
	{
		// Store viewable area height before changing style to auto
		e.vaHeight = e.offsetHeight;
		e.vaMaxHeight = e.style.maxHeight;
		e.style.height = 'auto';
		e.style.maxHeight = 'none';
		e.style.overflow = 'visible';
	}
	else
	{
		// Restore viewable area height to the default
		e.style.height = e.vaHeight + 'px';
		e.style.overflow = 'auto';
		e.style.maxHeight = e.vaMaxHeight;
		e.vaHeight = false;
	}
}

/**
* Set display of page element
* s[-1,0,1] = hide,toggle display,show
* type = string: inline, block, inline-block or other CSS "display" type
*/
function dE(n, s, type)
{
	if (!type)
	{
		type = 'block';
	}

	var e = document.getElementById(n);
	if (!s)
	{
		s = (e.style.display == '' || e.style.display == type) ? -1 : 1;
	}
	e.style.display = (s == 1) ? type : 'none';
}

/**
* Alternate display of subPanels
*/
function subPanels(p)
{
	var i, e, t;

	if (typeof(p) == 'string')
	{
		show_panel = p;
	}

	for (i = 0; i < panels.length; i++)
	{
		e = document.getElementById(panels[i]);
		t = document.getElementById(panels[i] + '-tab');

		if (e)
		{
			if (panels[i] == show_panel)
			{
				e.style.display = 'block';
				if (t)
				{
					t.className = 'activetab';
				}
			}
			else
			{
				e.style.display = 'none';
				if (t)
				{
					t.className = '';
				}
			}
		}
	}
}

/**
* Call print preview
*/
function printPage()
{
	if (is_ie)
	{
		printPreview();
	}
	else
	{
		window.print();
	}
}

/**
* Show/hide groups of blocks
* c = CSS style name
* e = checkbox element
* t = toggle dispay state (used to show 'grip-show' image in the profile block when hiding the profiles) 
*/
function displayBlocks(c, e, t)
{
	var s = (e.checked == true) ?  1 : -1;

	if (t)
	{
		s *= -1;
	}

	var divs = document.getElementsByTagName("DIV");

	for (var d = 0; d < divs.length; d++)
	{
		if (divs[d].className.indexOf(c) == 0)
		{
			divs[d].style.display = (s == 1) ? 'none' : 'block';
		}
	}
}

function viewableCode(a)
{
	// Get ID of code block
	var e = a.parentNode.parentNode.getElementsByTagName('CODE')[0];

	viewableArea(e, true);
	if (a.firstChild.data == expand_view) { a.firstChild.data = collapse_view }
	else if (a.firstChild.data == collapse_view) { a.firstChild.data = expand_view }
} 



function highlightInit() {
	var boxes = document.getElementsByTagName('code');
	for (i = 0; i < boxes.length; i++) {
		if (boxes[i].innerHTML.indexOf('<span') < 0) {
			hljs.highlightBlock(boxes[i], null, true);
		}
	}
}
onload_functions.push('highlightInit()');



function selectCode(a)
{
	// Get ID of code block
	var e = a.parentNode.parentNode.getElementsByTagName('CODE')[0];

	// Not IE and IE9+
	if (window.getSelection)
	{
		var s = window.getSelection();
		// Safari
		if (s.setBaseAndExtent)
		{
			s.setBaseAndExtent(e, 0, e, e.innerText.length - 1);
		}
		// Firefox and Opera
		else
		{
			// workaround for bug # 42885
			if (window.opera && e.innerHTML.substring(e.innerHTML.length - 4) == '<BR>')
			{
				e.innerHTML = e.innerHTML + '&nbsp;';
			}

			var r = document.createRange();
			r.selectNodeContents(e);
			s.removeAllRanges();
			s.addRange(r);
		}
	}
	// Some older browsers
	else if (document.getSelection)
	{
		var s = document.getSelection();
		var r = document.createRange();
		r.selectNodeContents(e);
		s.removeAllRanges();
		s.addRange(r);
	}
	// IE
	else if (document.selection)
	{
		var r = document.body.createTextRange();
		r.moveToElementText(e);
		r.select();
	}
}

/**
* Play quicktime file by determining it's width/height
* from the displayed rectangle area
*/
function play_qt_file(obj)
{
	var rectangle = obj.GetRectangle();

	if (rectangle)
	{
		rectangle = rectangle.split(',');
		var x1 = parseInt(rectangle[0]);
		var x2 = parseInt(rectangle[2]);
		var y1 = parseInt(rectangle[1]);
		var y2 = parseInt(rectangle[3]);

		var width = (x1 < 0) ? (x1 * -1) + x2 : x2 - x1;
		var height = (y1 < 0) ? (y1 * -1) + y2 : y2 - y1;
	}
	else
	{
		var width = 200;
		var height = 0;
	}

	obj.width = width;
	obj.height = height + 16;

	obj.SetControllerVisible(true);
	obj.Play();
}

/**
* Check if the nodeName of elem is name
* @author jQuery
*/
function is_node_name(elem, name)
{
	return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
}

/**
* Check if elem is in array, return position
* @author jQuery
*/
function is_in_array(elem, array)
{
	for (var i = 0, length = array.length; i < length; i++)
		// === is correct (IE)
		if (array[i] === elem)
			return i;

	return -1;
}

/**
* Find Element, type and class in tree
* Not used, but may come in handy for those not using JQuery
* @author jQuery.find, Meik Sievertsen
*/
function find_in_tree(node, tag, type, class_name)
{
	var result, element, i = 0, length = node.childNodes.length;

	for (element = node.childNodes[0]; i < length; element = node.childNodes[++i])
	{
		if (!element || element.nodeType != 1) continue;

		if ((!tag || is_node_name(element, tag)) && (!type || element.type == type) && (!class_name || is_in_array(class_name, (element.className || element).toString().split(/\s+/)) > -1))
		{
			return element;
		}

		if (element.childNodes.length)
			result = find_in_tree(element, tag, type, class_name);

		if (result) return result;
	}
}

var in_autocomplete = false;
var last_key_entered = '';

/**
* Check event key
*/
function phpbb_check_key(event)
{
	// Keycode is array down or up?
	if (event.keyCode && (event.keyCode == 40 || event.keyCode == 38))
		in_autocomplete = true;

	// Make sure we are not within an "autocompletion" field
	if (in_autocomplete)
	{
		// If return pressed and key changed we reset the autocompletion
		if (!last_key_entered || last_key_entered == event.which)
		{
			in_autocompletion = false;
			return true;
		}
	}

	// Keycode is not return, then return. ;)
	if (event.which != 13)
	{
		last_key_entered = event.which;
		return true;
	}

	return false;
}

/**
* Usually used for onkeypress event, to submit a form on enter
*/
function submit_default_button(event, selector, class_name)
{
	// Add which for key events
	if (!event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode))
		event.which = event.charCode || event.keyCode;

	if (phpbb_check_key(event))
		return true;

	var current = selector['parentNode'];

	// Search parent form element
	while (current && (!current.nodeName || current.nodeType != 1 || !is_node_name(current, 'form')) && current != document)
		current = current['parentNode'];

	// Find the input submit button with the class name
	//current = find_in_tree(current, 'input', 'submit', class_name);
	var input_tags = current.getElementsByTagName('input');
	current = false;

	for (var i = 0, element = input_tags[0]; i < input_tags.length; element = input_tags[++i])
	{
		if (element.type == 'submit' && is_in_array(class_name, (element.className || element).toString().split(/\s+/)) > -1)
			current = element;
	}

	if (!current)
		return true;

	// Submit form
	current.focus();
	current.click();
	return false;
}

/**
* Apply onkeypress event for forcing default submit button on ENTER key press
* The jQuery snippet used is based on http://greatwebguy.com/programming/dom/default-html-button-submit-on-enter-with-jquery/
* The non-jQuery code is a mimick of the jQuery code ;)
*/
function apply_onkeypress_event()
{
	// jQuery code in case jQuery is used
	if (jquery_present)
	{
		jQuery('form input[type=text], form input[type=password]').live('keypress', function (e)
		{
			var default_button = jQuery(this).parents('form').find('input[type=submit].default-submit-action');
			
			if (!default_button || default_button.length <= 0)
				return true;

			if (phpbb_check_key(e))
				return true;

			if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13))
			{
				default_button.click();
				return false;
			}

			return true;
		});
	
		return;
	}

	var input_tags = document.getElementsByTagName('input');

	for (var i = 0, element = input_tags[0]; i < input_tags.length ; element = input_tags[++i])
	{
		if (element.type == 'text' || element.type == 'password')
		{
			// onkeydown is possible too
			element.onkeypress = function (evt) { submit_default_button((evt || window.event), this, 'default-submit-action'); };
		}
	}
}

function activate_colorbox()
{
	$(".post").each(function(){
		id = this.id;
		$("a.colorbox",this).colorbox({
										rel:id,
										transition:"none",
										photo:true,
										maxWidth:"95%",maxHeight:"95%",
										scalePhotos:true, 
										title: function(){return $("img",this).attr("title")+" <a href='"+this.href.replace(/&mt=1/g, '')+"' target='_blank'>Загрузить оригинал</a>";}
									} );
	});
}
onload_functions.push('activate_colorbox();');




/*-----------------------------------------------------------------*/
/*-               Shrink profile                                  -*/
/*-----------------------------------------------------------------*/

function show_profile(id)
{
	$(id).css({"height":"auto"});
	$(".show-profile-div",id).hide();
}
profile_id = 0;
function shrink_profiles()
{
	$(".post").each(function(){
			post_bg = $(this).hasClass('bg1') ? "bg2" : ""
			post = $(".postbody", this);
			profile = $(".postprofile", this);
			h = post.height()-15;
			h1 = profile.height();
			if (h1>h)
			{
				avatar = $(".postprofile dt a img", this);
				h1 = avatar.height();
				profile.height(Math.max(h, h1+35));
				id = profile.attr("id");
				profile.addClass("profile_"+profile_id);
				profile.prepend("<div class='show-profile-div " + post_bg + "'>"+
				 "<a onclick='show_profile(\".profile_"+profile_id+"\");'></a>"+
				 "</div>");
				profile_id++;

			}
		});
}


/*-----------------------------------------------------------------*/


var dragging_textarea_handle = null;
var dragging_textarea_handle_y;
var dragging_textarea_handle_h;

function make_textareas_resizable()
{
//	return;
	$("div#message-box textarea.inputbox").each(function (){
		var txt=$(this);
		var w = 100 * parseFloat(txt.css('width')) / parseFloat(txt.parent().css('width'));
		if (w>100){w=100;}
		w = w+"%";
		
	//	txt.wrap("<div style='margin-bottom:7px;'>");
		div = txt.parent();
		div.css({"height": txt.css("height"), "position":"relative", "margin-bottom":"15px"});
		txt.css({"width": "100%","height": "100%"});
		txt.after("<div class='resize-v-handle'>&nbsp;</div>");
	});

	$(".resize-v-handle").mousedown(function(event){
		dragging_textarea_handle = $(this).parent();
		dragging_textarea_handle_h = parseFloat(dragging_textarea_handle.css("height"));
		dragging_textarea_handle_y = parseFloat(event.pageY || event1.clientY + document.documentElement.scrollTop); // FF || IE);
		$(document.body).mousemove(function(event1){
			if (dragging_textarea_handle != null)
			{
				y = parseFloat(event1.pageY || event1.clientY + document.documentElement.scrollTop); // FF || IE
				dragging_textarea_handle.css("height", dragging_textarea_handle_h + y - dragging_textarea_handle_y);
				$(document.body).css({"cursor":"s-resize"});
				$(document.body).mouseup(function(){
					$(document.body).unbind("mousemove");
					$(document.body).unbind("mouseup");
					$(document.body).css({"cursor":"default"});
				});
			}
			else
			{$(document.body).unbind("mousemove");}

		});

	});

	$(document.body).append("<style type='text/css'>.resize-v-handle{ position: absolute;font-size: 0.1px;z-index: 1100; bottom: -13px; left: 0; display: block; height:8px;cursor: s-resize; width: 100%; background: url(data:image/gif;base64,R0lGODlhMgAHAIQUAKqqqry8vL29vcPDw8fHx8vLy9DQ0NHR0dbW1tfX19jY2NnZ2dvb29zc3N7e3uTk5Ovr6/Hx8fPz8/r6+v///////////////////////////////////////////////yH+IUNyZWF0ZWQgd2l0aCBHSU1QIGZvciBjbmMtY2x1Yi5ydQAh+QQBCgAfACwAAAAAMgAHAAAFZ+BnDEJgnmiqrqwqDMbHIE1t33iu73yDMIWHcEgECI0PpPLITDaRRGKBAKlar4BqFrLtar9c8PZ6JRwk6LQagGZL3PC2/D13q9UHR2TC7/v/gIGCgxMRDh8JCwqLjI2Oj5CRkQsJHyEAOw==) no-repeat center 0px;}</style>");


}
onload_functions.push('make_textareas_resizable();');

/*
* Set header image gallery
*/

function  add_header_image_gallery()
{
	$.get(
			"/custom_scripts/forum_header_gallery.php?width="+($("#page-header .inner").width()-450-220-10),
			function(data){$("#site-description").after(data);}
		);



}

onload_functions.push('add_header_image_gallery()');

/**
* Detect JQuery existance. We currently do not deliver it, but some styles do, so why not benefit from it. ;)
*/
var jquery_present = typeof jQuery == 'function';

function copyToClipboard (text) {
  window.prompt ("Copy to clipboard: Ctrl+C, Enter", text.replace('"',""));
}

function replace_youtube()
{
	$(".postbody .content a").each(function(){
		a = $(this);
		if ( a.attr("href").match(/^https?:\/\/(www.)?(youtube\.|youtu.be)/g) )
		{	
			console.log(a);			
			if ( a.attr("href").match(/^https?:\/\/(www\.)?youtu\.be\/[-0-9A-Za-z_]+$/g) )
			{
				v = a.attr("href").match(/\/([-A-Za-z0-9_]+)$/g);
				console.log(v);			
				if (v) v = v[0].substring(1)
				else v = false;
			}
			else
			{
				v = a.attr("href").match(/(\?|&)v=([-A-Za-z0-9_]+)/g);
				if (v) v = v[0].substring(3)
				else v = false;
			}
			list = a.attr("href").match(/(\?|&)list=([-A-Za-z0-9_]+)/g);
			if (list) {list="?"+list[0].substring(1);}
			else {list="";}
			if (v){





				a.before('<iframe width="560" height="315" src="'+('https:' == document.location.protocol ? 'https://' : 'http://')+'www.youtube.com/embed/'+v+list+'" frameborder="0" allowfullscreen></iframe>');
				a.addClass("youtube-inserted");
			}
		}
	});
}

onload_functions.push('replace_youtube()');


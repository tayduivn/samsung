/**
 * Bind enter key to element
 */
$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        });
    });
};

/**
 * Number
 */

$.fn.numeric = function(){
	$(this).keydown(function(event){
        if (event.keyCode == 46 || event.keyCode == 8  || event.keyCode == 9) {
        }
        else {
            if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
            }
            else {
                event.preventDefault();
            }
        }
	});
}
/**
 * Tabs
 * Tab contents wrapper : tabs-content
 */
$.fn.tabs = function(hover){
	$(this).children().each(function(){
		var index = $(this).index();
		if($(this).is(':first-child')){$(this).addClass('tab-active');
		$(this).parent().parent().children ('.tabs-content').children().each(function(){if($(this).index() == index){$(this).show().addClass('tab-content-active');}
		else {$(this).hide().removeClass('tab-content-active');}
		});
		}
	}); 
	$(this).children().click(function(){
		var index = $(this).index();
		$(this).parent().children().removeClass('tab-active');
		$(this).addClass('tab-active');
		$(this).parent().parent().find('.tabs-content').children().each(function(){
			if($(this).index() == index){
				$(this).show().addClass('tab-content-active');
			} else {$(this).hide().removeClass('tab-content-active');}
		});
	});
	if(hover == true){
	$(this).children().hover(function(){
		var index = $(this).index();
		$(this).parent().children().removeClass('tab-active');
		$(this).addClass('tab-active');
		$(this).parent().parent().find('.tabs-content').children().each(function(){
			if($(this).index() == index){
				$(this).fadeIn().addClass('tab-content-active');
			} else {$(this).fadeOut().removeClass('tab-content-active');}
		});
	});
	}
};
// Set class to menu tree generator from Zend nav
//$('.classMenu').menuClass();
$.fn.menuClass = function ($lv){
	if(!$lv){$lv=1;}
	if($(this).children("li").children("ul").length!=0){
		$(this).children("li").children("ul").menuClass($lv+1);
	}
	$(this).children("li").addClass('level'+$lv);
	$(this).addClass('level'+$lv);
};

function changeUriParam(paramName, paramValue,url)
{
	if(url == null){
    var url = window.location.href;
	}
    if (url.indexOf(paramName + "=") >= 0)
    {
        var prefix = url.substring(0, url.indexOf(paramName));
        var suffix = url.substring(url.indexOf(paramName)).substring(url.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + paramName + "=" + paramValue + suffix;
    }
    else
    {
    if (url.indexOf("?") < 0)
        url += "?" + paramName + "=" + paramValue;
    else
        url += "&" + paramName + "=" + paramValue;
    }
   return url;
}

function getUriParam(name,url)
{
name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
var regexS = "[\\?&]"+name+"=([^&#]*)";
var regex = new RegExp(regexS);
var results = regex.exec(url);
if(results == null) {return '';}
else{return results[1];};
}
var Validator = {
		validateRequired : function(val,minLength,maxLength){
			var val = val.trim();
			var lengthVal = val.length; 
			if(lengthVal === 0){return false;}
			if(lengthVal < minLength){return false;}
			if(lengthVal > maxLength) {return false;}
			return true;
		},
		validateNumber : function(val, min, max){
			if(isNaN(val)){return false;}
			if(min && val < min) {return false;}
			if(max && val > max){return false;}
			return true;
		},
		validateEmail : function(val){
			var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
		    return pattern.test(val);
		},
}

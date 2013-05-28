$(document).ready(function(){
    var thisclass = $('.formgui');
    
     /*INPUTS*/
    thisclass.find('input:not(.isStyled)').each(function(i){
        var inputType = $(this).attr('type');
        var inputID = $(this).attr('id');
        var thisVal = $(this).val();
        if(inputID == '' || inputID == undefined){
            if(inputType == '' || inputType == undefined ){inputType = 'def';}
            inputID = inputType + '-' + i;
            $(this).attr('id' , inputID);
        }
        if( $(this).parent().get(0).tagName == 'LABEL' && ( inputType == 'checkbox' || inputType == 'radio' )){ $(this).parent().css({'cursor':'pointer'});}
        if( inputType != 'file' && inputType != 'radio' && inputType != 'checkbox' && inputType != 'button' && inputType != 'reset' && inputType != 'submit' && inputType != 'range' ){
            $(this).addClass('input isStyled');
        }
        else if(inputType == 'checkbox'){
            if($(this).prop("checked")){ $(this).after('<span class="checkbox checkbox2"  onclick="' + "$('#" + inputID + "').trigger('click');return false;" + '" ></span>'); }
            else{ $(this).after('<span class="checkbox"  onclick="' + "$('#" + inputID + "').trigger('click');return false;" + '" ></span>');}
            $(this).addClass('isStyled');
        }
        else if(inputType == 'radio'){
            if($(this).prop("checked")){$(this).after('<span class="radio radio2"  onclick="' + "$('#" + inputID + "').trigger('click');return false;" + '" ></span>');}
            else{$(this).after('<span class="radio"  onclick="' + "$('#" + inputID + "').trigger('click');return false;" + '" ></span>');}
            $(this).addClass('isStyled');
        }
        else if(inputType == 'reset' || inputType == 'button'){
            $(this).after('<a href="#" class="button" id="ib-' + i + '" onclick="' + "$('#" + inputID + "').trigger('click');return false;" + '" >' + $(this).val() + '</a>');
            $(this).addClass('isStyled');
        }
        else if(inputType == 'submit'){
            $(this).after('<a href="#" class="button" id="submitFormTrigger-' + i + '" onclick="' + "$(this).closest('form').submit();return false;" + '" >' + thisVal + '</a>');
            $(this).addClass('isStyled');
        }
    });
    
    $('input[type=checkbox]').change(function(){
        if($(this).prop("checked")){ $(this).parent().children('span.checkbox').addClass('checkbox2');}
        else{ $(this).parent().children('span.checkbox').removeClass('checkbox2'); }
    });
      
    $('input[type=radio]').change(function(){
        $('input[name=' + $(this).attr('name') + ']').parent().children('span.radio').removeClass('radio2');
        $(this).parent().children('span.radio').addClass('radio2');
    });
    
    /*BUTTONS*/
    thisclass.find('button:not(.isStyled)').each(function(i){
        var btnType = $(this).attr('type');
        var buttonName = $(this).attr('id');
        var buttonClasses = $(this).attr('class');
        if(buttonName == '' || buttonName == undefined){
            buttonName = 'bt-' + i ;
            $(this).attr('id' , buttonName);
        }
        if( btnType != 'submit'){
            $(this).addClass('isStyled').hide().after('<a href="#" class="button ' + buttonClasses + '" id="sb-' + i + '" onclick="' + "$('#" + buttonName + "').trigger('click');return false;" + '" >' + $(this).html() + '</a>');
        }
        else{
            $(this).addClass('isStyled').after('<a href="#" class="button ' + buttonClasses + '" id="submitFormTrigger-' + i + '" onclick="' + "$(this).closest('form').submit();return false;" + '" >' + $(this).html() + '</a>');
        }
    });
    /*SELECT*/
   thisclass.find('select:not(.isStyled)').each(function(i){
        if( $(this).attr('multiple') != 'multiple' ){
            var selectID = $(this).attr('id');
            if(selectID == '' || selectID == undefined){
                selectID = 'selectname-' + i ;
                $(this).attr('id' , selectID);
            }
            var strSelectedName = '....';
            var strInner = '';
            var intCount = 0;
            $(this).find('option').each(function(){
                strInner += '<a href="#' + $(this).val() + '" class="selectitems">' + $(this).text() + '</a>';
                intCount++;
                if( $(this).prop('selected') ){
                   strSelectedName = $(this).text(); 
                }
            });
            var strBigSelect = '';
            if(intCount >= 4){
                strBigSelect = ' bigselect';
            }
            $(this).addClass('isStyled').after('<div class="selectcontainer " rel="' + selectID + '" id="s-' + selectID + '" ><div data-sid ="#'+ selectID +'" class="selectname" rel="' + selectID + '-options" ><div class="selecttitle">' + strSelectedName + '</div><div class="selectarrow"><span></span></div></div><div id="' + selectID + '-options" class="selectbox' + strBigSelect + '" >' 
            + strInner + '</div></div>');
            
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ){
            	$(this).css({'width' : $('#s-' + selectID ).width() , 'height' : $('#s-' + selectID ).height() , 'opacity' : 0 ,'display':'block' });
            }else{
	            $(this).css({'opacity' : 0 , 'margin-left': '-50000px' , 'display' : 'none' });
            }
        
            $('#s-' + selectID ).prepend($(this));
        }
    });
    
    thisclass.find('.selectname').on('touchstart click',function(){
    	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    		var thisSel = $(this).data('sid') ;
	    	$(thisSel).focus().trigger('touchstart click').show();
	    }else{
			$('#' + $(this).attr('rel') ).slideToggle();
			$('.selectbox:not(#' + $(this).attr('rel') + ')').slideUp(100);
		}
        
        return false;
    });
       
    thisclass.find('.selectitems').on('click', function(){
        $(this).parent().find('a.activeSelect').removeClass('activeSelect');
        var thisSel = '#'  + $(this).parent().parent().attr('rel');
        var titleID = '#s'  + $(this).parent().parent().attr('rel') + ' .selecttitle';
        $( thisSel ).removeProp('selected');
        $( thisSel ).val( $(this).attr('href').replace('#' , '')  );
        $( titleID ).html($(this).html());
        $(this).addClass('activeSelect');
        $(this).parent().slideUp();
        $(thisSel).change();
        return false;
    });
    
    thisclass.find('select').on('change' ,function(){
        $(this).each(function(){
            if( $(this).attr('multiple') != 'multiple' ){
                var thisID = $(this).attr('id');
                var selText = $('#' + thisID + ' option:selected').text();
                $('#s-' + thisID + ' .selecttitle').html(selText);
            }
        })
    });
    /*FILE*/
    thisclass.find('input[type=file]:not(.isStyled)').each(function(i){
        var fileID = $(this).attr('id');
        if(fileID == '' || fileID == undefined){
            fileID = 'file-' + i ;
            $(this).attr('id' , fileID);
        }
        $(this).addClass('oldfileinput isStyled');
        $(this).data('ftitle','ftitle-' + i);
        var fileTitle = $(this).attr('title');
        if(fileTitle == '' || fileTitle == undefined){
            fileTitle = 'Choose File';
            $(this).attr('title' , fileTitle);
        }
        $('#' + fileID ).after('<div class="fileinput" data-id="' + fileID + '"><label><div class="filebtn">' + fileTitle + '</div><div class="filename" id="ftitle-' + i +'" ></div></label></div>');
        
    });
    
    thisclass.find('.fileinput').each(function(){
        var thisW = $(this).width();
        var filebW = $(this).find('.filebtn').width();
        $(this).find('.filename').width( (thisW - filebW -2 ));
        $(this).find('label').prepend( $( '#' + $(this).data('id')) );
        $($( '#' + $(this).data('id'))).width(thisW);
    });
    
     thisclass.find('input[type=file]').on('change' ,function(){
        var myfilename = $(this).val();
        myfilename = myfilename.replace(/C:\\fakepath\\/gi, "");
        if(myfilename != myfilename.substring(0,26) ){
            myfilename = myfilename.substring(0,25) + '...'
        }
        if($( '#' + $(this).data('ftitle') ).html() != myfilename ){
            $( '#' + $(this).data('ftitle') ).html(myfilename);
        }
    });
    
    thisclass.find('.overmenu').on('click' , function(){
    	var thisFor = '#' + $(this).data('menu');
        var of = $(this).offset();
        var w = $(this).outerWidth();
        
    	$('.menuopen').each(function(){
    		if( '#' + $(this).attr('id') !=  thisFor ){
	    		$(this).hide().removeClass('menuopen');
    		}
    	});
    
        $(thisFor).css({'top' : of.top - ($(this).outerHeight() / 2) - $(thisFor).outerHeight() , 'left' : of.left -  ($(thisFor).outerWidth() / 2) + ($(this).outerWidth() / 2) });
        $(thisFor).toggle(200,'swing');
        if($(thisFor).hasClass('menuopen') == false ){
	        $(thisFor).show();
	        $(thisFor).addClass('menuopen')
        }
        return false;
    });
    
    thisclass.find('.overmenu').each(function(){
	    var thisFor = '#' + $(this).data('menu');
	    $(thisFor).addClass('data-menu');
    });
    
    
});
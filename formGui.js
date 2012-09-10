$(document).ready(function(){
    var thisclass = $('.formgui');
     /*INPUTS*/
    thisclass.find('input').each(function(i){
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
            $(this).addClass('input');
        }
        else if(inputType == 'checkbox'){
            if($(this).attr('checked')){ $(this).after('<span class="checkbox checkbox2"  onclick="' + "$('#" + inputID + "').trigger('click');return false;" + '" ></span>'); }
            else{ $(this).after('<span class="checkbox"  onclick="' + "$('#" + inputID + "').trigger('click');return false;" + '" ></span>');}
        }
        else if(inputType == 'radio'){
            if($(this).attr('checked')){$(this).after('<span class="radio radio2"  onclick="' + "$('#" + inputID + "').trigger('click');return false;" + '" ></span>');}
            else{$(this).after('<span class="radio"  onclick="' + "$('#" + inputID + "').trigger('click');return false;" + '" ></span>');}
        }
        else if(inputType == 'reset' || inputType == 'button'){
            $(this).after('<a href="#" class="button" id="ib-' + i + '" onclick="' + "$('#" + inputID + "').trigger('click');return false;" + '" >' + $(this).val() + '</a>');
        }
        else if(inputType == 'submit'){
            $(this).after('<a href="#" class="button" id="submitFormTrigger-' + i + '" onclick="' + "$(this).closest('form').submit();return false;" + '" >' + thisVal + '</a>');
        }
    });
    
    $('input[type=checkbox]').change(function(){
        if($(this).attr('checked')){ $(this).parent().children('span.checkbox').addClass('checkbox2');}
        else{ $(this).parent().children('span.checkbox').removeClass('checkbox2'); }
    });
      
    $('input[type=radio]').change(function(){
        $('input[name=' + $(this).attr('name') + ']').parent().children('span.radio').removeClass('radio2');
        $(this).parent().children('span.radio').addClass('radio2');
    });
    
    /*BUTTONS*/
    thisclass.find('button').each(function(i){
        var btnType = $(this).attr('type');
        var buttonName = $(this).attr('id');
        if(buttonName == '' || buttonName == undefined){
            buttonName = 'bt-' + i ;
            $(this).attr('id' , buttonName);
        }
        if( btnType != 'submit'){
            $(this).hide().after('<a href="#" class="button" id="sb-' + i + '" onclick="' + "$('#" + buttonName + "').trigger('click');return false;" + '" >' + $(this).html() + '</a>');
        }
        else{
            $(this).after('<a href="#" class="button" id="submitFormTrigger-' + i + '" onclick="' + "$(this).closest('form').submit();return false;" + '" >' + $(this).html() + '</a>');
        }
    });
    /*SELECT*/
   thisclass.find('select').each(function(i){
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
            $(this).after('<div class="selectcontainer " rel="' + selectID + '" id="s-' + selectID + '" ><div class="selectname" rel="' + selectID + '-options" ><div class="selecttitle">' + strSelectedName + '</div><div class="selectarrow"><span></span></div></div><div id="' + selectID + '-options" class="selectbox' + strBigSelect + '" >' 
            + strInner + '</div></div>');
        
            $('#s-' + selectID ).prepend($(this));
        }
    });
    
    thisclass.find('.selectname').live('click',function(){
        $('.selectbox').slideUp(100);
        $('#' + $(this).attr('rel') ).slideToggle();
        return false;
    });
       
    thisclass.find('.selectitems').live('click', function(){
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
    
    thisclass.find('select').live('change' ,function(){
        $(this).each(function(){
            if( $(this).attr('multiple') != 'multiple' ){
                var thisID = $(this).attr('id');
                var selText = $('#' + thisID + ' option:selected').text();
                $('#s-' + thisID + ' .selecttitle').html(selText);
            }
        })
    });
    /*FILE*/
    thisclass.find('input[type=file]').each(function(i){
        var fileID = $(this).attr('id');
        if(fileID == '' || fileID == undefined){
            fileID = 'file-' + i ;
            $(this).attr('id' , fileID);
        }
        $(this).addClass('oldfileinput');
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
    
     thisclass.find('input[type=file]').live('change' ,function(){
        var myfilename = $(this).val();
        myfilename = myfilename.replace(/C:\\fakepath\\/gi, "");
        if(myfilename != myfilename.substring(0,26) ){
            myfilename = myfilename.substring(0,25) + '...'
        }
        if($( '#' + $(this).data('ftitle') ).html() != myfilename ){
            $( '#' + $(this).data('ftitle') ).html(myfilename);
        }
    });
});
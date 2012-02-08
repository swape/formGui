$(document).ready(function(){
    $('input').each(function(){
        var inputType = $(this).attr('type');
        if( inputType != 'radio' && inputType != 'checkbox' && inputType != 'button' && inputType != 'reset' && inputType != 'submit' && inputType != 'range' ){
            $(this).addClass('input');
        }
    });
    
    $('input[type=checkbox]').each(function(){
        if($(this).attr('checked')){
            $(this).after('<span class="checkbox checkbox2"></span>');
        }
        else{
            $(this).after('<span class="checkbox"></span>');
        }
    });
    
    $('input[type=checkbox]').change(function(){
        if($(this).attr('checked')){
            $(this).parent().children('span.checkbox').addClass('checkbox2');
        }
        else{
            $(this).parent().children('span.checkbox').removeClass('checkbox2')
        }
    });
    
    $('input[type=radio]').each(function(){
        if($(this).attr('checked')){
            $(this).after('<span class="radio radio2"></span>');
        }
        else{
            $(this).after('<span class="radio"></span>');
        }
    });
       
    $('input[type=radio]').change(function(){
        $('input[name=' + $(this).attr('name') + ']').parent().children('span.radio').removeClass('radio2');
        $(this).parent().children('span.radio').addClass('radio2');
    });
    
    $('button').each(function(i){
        $(this).after('<a href="#" class="button" id="sb-' + i + '" onclick="' + "$('#sbs-" + i + "').trigger('click');return false;" + '" >' + $(this).html() + '</a>');
        $(this).attr('id', 'sbs-' + i ).hide();
    });
    
    $('input[type=submit] , input[type=reset] , input[type=button]').each(function(i){
        $(this).after('<a href="#" class="button" id="ib-' + i + '" onclick="' + "$('#ibs-" + i + "').trigger('click');return false;" + '" >' + $(this).val() + '</a>');
        $(this).attr('id', 'ibs-' + i ).hide();
    });
 
   $('select').each(function(i){
        if( $(this).attr('multiple') != 'multiple' ){
            var strInner = '';
            var intCount = 0;
            $(this).find('option').each(function(){
                strInner += '<a href="#' + $(this).val() + '" class="selectitems">' + $(this).text() + '</a>';
                intCount++;
            });
            var strBigSelect = '';
            if(intCount >= 4){
                strBigSelect = ' bigselect';
            }
            $(this).after('<div class="selectcontainer " rel="' + 's-' + i + '" id="ss-' + i + '" ><div class="selectname" rel="selOp' + i + '" ><div class="selecttitle">...</div><div class="selectarrow"><span></span></div></div><div id="selOp' + i + '" class="selectbox' + strBigSelect + '" >' 
            + strInner + '</div></div>');
            $(this).attr('id', 's-' + i );
            $(this).hide();
        }
    });
    
    $('.selectname').live('click',function(){
        $('#' + $(this).attr('rel') ).slideToggle();
        return false;
    });
    
    $('.selectitems').live('click', function(){
        $(this).parent().find('a.activeSelect').removeClass('activeSelect');
        var thisSel = '#'  + $(this).parent().parent().attr('rel');
        var titleID = '#s'  + $(this).parent().parent().attr('rel') + ' .selecttitle';
        $( thisSel ).removeProp('selected');
        
        $( thisSel ).val($(this).attr('href').replace('#' , '') );
        $( titleID ).html($(this).html());
        
        $(this).addClass('activeSelect');
        $(this).parent().slideUp();
        $(thisSel).change();
        return false;
    });
    
    $('select').live('change' ,function(){
        $(this).each(function(){
            if( $(this).attr('multiple') != 'multiple' ){
                var thisID = $(this).attr('id');
                var selText = $('#' + thisID + ' option:selected').text();
                $('#s' + thisID + ' .selecttitle').html(selText);
        }
        })
    });
    
    $('select').change();
    
    
    /* File upload */
    $('input[type=file]').each(function(i){
        var selFirst = 'Select file';
        if($(this).attr('title')){ selFirst = $(this).attr('title'); }
            $(this).after('<div class="filecontainer" rel="' + 'f-' + i + '" id="if-' + i + '" ><div class="fileuploadtitle" >' 
            + selFirst + '</div><div class="filenamediv"><span class="filename"></span></div></div>');
            $(this).attr('id', 'f-' + i );
    });
    
    $('input[type=file]').change(function(){
        var spanid = $(this).attr('id');
        $(this).hide();
        var myfilename = $(this).val();
        myfilename = myfilename.replace(/C:\\fakepath\\/gi, "");
           if(myfilename != myfilename.substring(0,26) ){
               myfilename = myfilename.substring(0,25) + '...'
           }
           if($( '#i' + spanid + ' .filename').html() != myfilename ){
              $( '#i' + spanid +  ' .filename').html(myfilename);
           }
    });
    $('label.niceprelabel2 span').css({'height' :  ( $('label.niceprelabel2 input').outerHeight() - $('label.niceprelabel2 span').css('padding-top')) })
    $('.filecontainer').click(function(){
        $( '#' + $(this).attr('rel') ).trigger('click');
    });
});
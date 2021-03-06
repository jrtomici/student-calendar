/**
 * Created by Дмитрий on 25.08.2015.
 */
// JavaScript Document
// кодировка UTF-8


function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}


function htmlspecialchars(html) {
    // Сначала необходимо заменить & 
    html = html.replace(/&/g, "&amp;");
    // А затем всё остальное в любой последовательности 
    html = html.replace(/</g, "&lt;");
    html = html.replace(/>/g, "&gt;");
    html = html.replace(/"/g, "&quot;");
    // Возвращаем полученное значение 
    return html;
}

var number_format  = function number_format (number, decimals, dec_point, thousands_sep) {
    // http://kevin.vanzonneveld.net
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://getsprink.com)
    // +     bugfix by: Benjamin Lupton
    // +     bugfix by: Allan Jensen (http://www.winternet.no)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +     bugfix by: Howard Yeend
    // +    revised by: Luke Smith (http://lucassmith.name)
    // +     bugfix by: Diogo Resende
    // +     bugfix by: Rival
    // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
    // +   improved by: davook
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Jay Klehr
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Amir Habibi (http://www.residence-mixte.com/)
    // +     bugfix by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // +      input by: Amirouche
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: number_format(1234.56);
    // *     returns 1: '1,235'
    // *     example 2: number_format(1234.56, 2, ',', ' ');
    // *     returns 2: '1 234,56'
    // *     example 3: number_format(1234.5678, 2, '.', '');
    // *     returns 3: '1234.57'
    // *     example 4: number_format(67, 2, ',', '.');
    // *     returns 4: '67,00'
    // *     example 5: number_format(1000);
    // *     returns 5: '1,000'
    // *     example 6: number_format(67.311, 2);
    // *     returns 6: '67.31'
    // *     example 7: number_format(1000.55, 1);
    // *     returns 7: '1,000.6'
    // *     example 8: number_format(67000, 5, ',', '.');
    // *     returns 8: '67.000,00000'
    // *     example 9: number_format(0.9, 0);
    // *     returns 9: '1'
    // *    example 10: number_format('1.20', 2);
    // *    returns 10: '1.20'
    // *    example 11: number_format('1.20', 4);
    // *    returns 11: '1.2000'
    // *    example 12: number_format('1.2000', 3);
    // *    returns 12: '1.200'
    // *    example 13: number_format('1 000,50', 2, '.', ' ');
    // *    returns 13: '100 050.00'
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
};

var checkFloat = function(inp) {
    var num = $(inp).val();
    num = num.replace(",",".");
    num = num.replace(" ","");
    num = parseFloat(num);
    $(inp).val(isNaN(num)?0:num);
}
var checkInt = function(inp) {
    var num = $(inp).val();
    num = num.replace(" ","");
    num = parseInt(num);
    $(inp).val(isNaN(num)?0:num);
}

var checkRequired = function(fm){
    var ret = false;
    $(fm).find('input[required]:enabled, select[required]:enabled').each(function () {
        if (this.value.length < 1) {
            $(this).parents('.form-group').addClass('has-error');
            ret = 'Please fill in all required fields!';
        }
        else {
            $(this).parents('.form-group').removeClass('has-error');
        }
    });
    return ret;
};

var resetForm = function(fm){
    $(fm).find('input[type="text"], select').val("");
};
var insertInput = function(link, inp) {

    var tag = $(link).data('tag');
    var close =  $(link).data('close');
    var str=$(link).html();
    var el = $(inp)[0];

    var cursorpos = el.selectionStart;

    var out = $(inp).val();


    if(el.selectionStart==el.selectionEnd) {
        out = el.value.substring(0,el.selectionStart) + str + el.value.substring(el.selectionEnd);
        cursorpos += str.length;
    }
    else {
        out = el.value.substring(0,el.selectionStart);
        if(tag) {
            out += tag +
                el.value.substring(el.selectionStart,el.selectionEnd) +
                    close;
            cursorpos += tag.length + (el.selectionEnd -  el.selectionStart)+ close.length;
        }
        else {
            out += str;
            cursorpos += str.length;
        }
        out +=  el.value.substring(el.selectionEnd);
    }
    $(inp).val(out);

    el.setSelectionRange(cursorpos, cursorpos);
    el.focus();

};

function str_replace ( search, replace, subject ) {	// Replace all occurrences of the search string with the replacement string
    // 
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni

    if(!(replace instanceof Array)){
        replace=new Array(replace);
        if(search instanceof Array){//If search	is an array and replace	is a string, then this replacement string is used for every value of search
            while(search.length>replace.length){
                replace[replace.length]=replace[0];
            }
        }
    }

    if(!(search instanceof Array))search=new Array(search);
    while(search.length>replace.length){//If replace	has fewer values than search , then an empty string is used for the rest of replacement values
        replace[replace.length]='';
    }

    if(subject instanceof Array){//If subject is an array, then the search and replace is performed with every entry of subject , and the return value is an array as well.
        for(k in subject){
            subject[k]=str_replace(search,replace,subject[k]);
        }
        return subject;
    }

    for(var k=0; k<search.length; k++){
        var i = subject.indexOf(search[k]);
        while(i>-1){
            subject = subject.replace(search[k], replace[k]);
            i = subject.indexOf(search[k],i);
        }
    }

    return subject;

}


var convDate = function(dat, to){
    var fnd = new Array("янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"," в",".","Янв","Фев","Мар","Апр","Май","Июн","Июл","Фвг","Сен","Окт","Роя","Дек");
    var repl = new Array("01","02","03","04","05","06","07","08","09","10","11","12",""," ","01","02","03","04","05","06","07","08","09","10","11","12");
    console.log(".."+dat);
    var ret = str_replace(fnd, repl, dat);
    var reta= ret.split(" ");
    return reta[2]+"-"+addZero(reta[1])+"-"+addZero(reta[0])+" "+reta[3]+":00";
};

var render = {
    "money":function(summ) {
        var show = number_format(summ, 2, ',', ' ');
        return show;
    },
    'select':function(elm, list){
        var placeholder = elm.data('placeholder');
        var def = elm.data('default');
        elm.empty();
        if(placeholder) {
            $("<option  value=\"\" disabled selected style='display:none;'>" + def + "</option>").appendTo(elm);
            $('<option  value="">All</option>').appendTo(elm);
        }
        else if(def) {
            $('<option  value="">'+ def + '</option>').appendTo(elm);
        }
        else {
            $('<option  value=""></option>').appendTo(elm);
        }
        $.each(list,function(k,v){
            $('<option  value="' + v.id + '">' + v.name + '</option>').appendTo(elm);
        });
    },
};

var binder = {
    "tooltip":function(selector){
        if(!selector) {
            selector = '[data-toggle="tooltip"]';
        }
        $(selector).tooltip({"html":true});
    },
    "tablesorter":function(table){
        if(!table) {
            table = "#report_table";
        }
        if($(table).find("tbody tr").length) {
            $(table).tablesorter();
        }
    }
};

var makeModal = function(title,buttons,size){
    switch(size){
        case 'lg': var modal_size = 'modal-lg';
            break;
        case 'sm': var modal_size = 'modal-lg';
            break;
        default: var modal_size = '';
    }
    var dlg =$('<div class="modal" id="myModal" tabindex="-1" role="dialog" data-backdrop="true" aria-labelledby="myModalLabel" aria-hidden="false">');

    var html = '<div class="modal-dialog ' + modal_size + '">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
        '<h4 id="myModalLabel" class="modal-title">' + title + '</h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="loading">Loading</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    dlg.appendTo(document.body);
    dlg.html(html);
    $.each(buttons, function(key, val) {
        var btn = $('<button class="btn btn-primary">' + key + '</button>').click(function(){
            val(dlg);
        })
        dlg.find('.modal-footer').append(btn);
    });






    dlg.modal({
        show: true,
        backdrop:'static'
    });
    dlg.on('hidden.bs.modal', function (e) {
        $(this).remove();
    });


    return {"dialog":dlg,"title":dlg.find('.modal-title'),"body":dlg.find('.modal-body')};

};

var showError = function(msg, title){
    var btn = {};
    var dlg = makeModal(title?title:'Error',btn);
    dlg.body.html(msg);

};
var showConfirm = function(msg, title, fnc){
    var btn = { "OK": function(){
                        fnc(dlg);
                        }
    };
    var dlg = makeModal(title?title:'Confirmation',btn);
    dlg.body.html(msg);
};


var showNotify = function (elm, clear, add) {

    var dv = $('#showNotify');
    if(!dv.prop('id'))
        var dv = $('<div id="showNotify">').appendTo(document.body);

    if(add)
        elm.appendTo(dv);
    else
        elm.appendTo(dv.empty());
    if(clear)
        setTimeout(function(){
            elm.fadeOut(400,function(){
                $(this).remove();
                var ntf = $('#showNotify');
                if(!ntf.html())
                    ntf.remove();
            });
        },clear);
}
var hideNotify = function(elm) {
    $('#showNotify').remove();
}
var contentLoading = function(div){

    $('#container').html('<div class="loading">loading</div>');
}

var openPdf = function(file,uin,opt) {
    console.log('загружаем пдф');
    window.open('/pdf/'+file+'.php?uin='+uin+(opt?'&'+opt+'=1':''), '_blank');
};

/* mails */
var mailer = {
    "getTemplate": function(sel){
        var id = $(sel).val();
        $.ajax({
            type: "get",
            url: '/json/get-template.php',
            dataType: 'json',
            data: {'mtid':id},
            success: function(jsn){
                var fm = $(sel).parents('form');
                $(fm).find('input[name="subject"]').val(jsn.subject);
                $(fm).find('textarea[name="text"]').val(jsn.text);
            }
        });

    },
    "getPreviewOrder":function(fm){
        var oids = $(fm).find('input[name="oid[]"]');
        var btn = {};
        btn["SEND "+ oids.length +" EMAIL" + (oids.length>1?"S":"")] = function(dlg){

            var set_template = dlg.find("#set_template").prop("checked");
            if(set_template) {
                var name_template = dlg.find("#set_template_name").val();
                if(!name_template) {
                    name_template = fm.find('input[name="subject"]').val();
                }
                var prm = {
                    "name" : name_template,
                    "subject" : fm.find('input[name="subject"]').val(),
                    "text" : fm.find('textarea[name="text"]').val(),
                    "model" : "order"
                };
                $.ajax({
                    type: "post",
                    url: '/json/set-template.php',
                    dataType: 'json',
                    data: prm,
                    success: function(jsn){
                        var msg = $('<div>The template is saved</div>');
                        showNotify(msg,3000,1);
                    }
                });

            }
            $.ajax({
                type: "post",
                url: '/json/mail-send.php',
                dataType: 'json',
                data: fm.serialize(),
                success: function(jsn){
                    if(jsn.error) {
                        showError(jsn.error);
                    }
                    else {
                        dlg.modal('hide');
                        $(fm).parents('.modal').modal('hide');
                        $('input.set_checked:checked').click();
                        var msg = $('<div>Messages sent</div>');
                        showNotify(msg,3000,1);
                    }

                }
            });
        };
        var dlg = makeModal('Preview',btn, 'lg');
        $.ajax({
            type: "post",
            url: '/html/mail-preview.php',
            dataType: 'html',
            data: fm.serialize(),
            success: function(dat){
                dlg.body.html(dat);
                dlg.body.find("#set_template").click(function(){
                    if(this.checked) {
                        dlg.body.find("#set_template_name").show();
                    }
                    else {
                        dlg.body.find("#set_template_name").hide();
                    }
                });
            }
        });
    },
    "getPreviewSection":function(fm){
        var prsid = $(fm).find('.instructors');
        var btn = {};
        btn["SEND "+ prsid.length +" EMAIL" + (prsid.length>1?"S":"")] = function(dlg){

            var set_template = dlg.find("#set_template").prop("checked");
            if(set_template) {
                var name_template = dlg.find("#set_template_name").val();
                if(!name_template) {
                    name_template = fm.find('input[name="subject"]').val();
                }
                var prm = {
                    "name" : name_template,
                    "subject" : fm.find('input[name="subject"]').val(),
                    "text" : fm.find('textarea[name="text"]').val(),
                    "model" : "section"
                };
                $.ajax({
                    type: "post",
                    url: '/json/set-template.php',
                    dataType: 'json',
                    data: prm,
                    success: function(jsn){
                        var msg = $('<div>The template is saved</div>');
                        showNotify(msg,3000,1);
                    }
                });

            }
            $.ajax({
                type: "post",
                url: '/json/mail-send-section.php',
                dataType: 'json',
                data: fm.serialize(),
                success: function(jsn){
                    if(jsn.error) {
                        showError(jsn.error);
                    }
                    else {
                        dlg.modal('hide');
                        $(fm).parents('.modal').modal('hide');
                        $('input.set_checked:checked').click();
                        var msg = $('<div>Messages sent</div>');
                        showNotify(msg,3000,1);
                    }

                }
            });
        };
        var dlg = makeModal('Preview',btn, 'lg');
        $.ajax({
            type: "post",
            url: '/html/mail-preview-section.php',
            dataType: 'html',
            data: fm.serialize(),
            success: function(dat){
                dlg.body.html(dat);
                dlg.body.find("#set_template").click(function(){
                    if(this.checked) {
                        dlg.body.find("#set_template_name").show();
                    }
                    else {
                        dlg.body.find("#set_template_name").hide();
                    }
                });
            }
        });
    },
    "getPreviewInstructor":function(fm){
        var prsid = $(fm).find('.instructors');
        var btn = {};
        btn["SEND "+ prsid.length +" EMAIL" + (prsid.length>1?"S":"")] = function(dlg){

            var set_template = dlg.find("#set_template").prop("checked");
            if(set_template) {
                var name_template = dlg.find("#set_template_name").val();
                if(!name_template) {
                    name_template = fm.find('input[name="subject"]').val();
                }
                var prm = {
                    "name" : name_template,
                    "subject" : fm.find('input[name="subject"]').val(),
                    "text" : fm.find('textarea[name="text"]').val(),
                    "model" : "instructor"
                };
                $.ajax({
                    type: "post",
                    url: '/json/set-template.php',
                    dataType: 'json',
                    data: prm,
                    success: function(jsn){
                        var msg = $('<div>The template is saved</div>');
                        showNotify(msg,3000,1);
                    }
                });

            }
            $.ajax({
                type: "post",
                url: '/json/mail-send-instructor.php',
                dataType: 'json',
                data: fm.serialize(),
                success: function(jsn){
                    if(jsn.error) {
                        showError(jsn.error);
                    }
                    else {
                        dlg.modal('hide');
                        $(fm).parents('.modal').modal('hide');
                        $('input.set_checked:checked').click();
                        var msg = $('<div>Messages sent</div>');
                        showNotify(msg,3000,1);
                    }

                }
            });
        };
        var dlg = makeModal('Preview',btn, 'lg');
        $.ajax({
            type: "post",
            url: '/html/mail-preview-instructor.php',
            dataType: 'html',
            data: fm.serialize(),
            success: function(dat){
                dlg.body.html(dat);
                dlg.body.find("#set_template").click(function(){
                    if(this.checked) {
                        dlg.body.find("#set_template_name").show();
                    }
                    else {
                        dlg.body.find("#set_template_name").hide();
                    }
                });
            }
        });
    },
    "getPreviewUser": function(fm){
        var uids = $(fm).find('input[name="uid[]"]');
        var btn = {};
        btn["SEND "+ uids.length +" EMAIL" + (uids.length>1?"S":"")] = function(dlg){
            var set_template = dlg.find("#set_template").prop("checked");
            if(set_template) {
                var name_template = dlg.find("#set_template_name").val();
                if(!name_template) {
                    name_template = fm.find('input[name="subject"]').val();
                }
                var prm = {
                    "name" : name_template,
                    "subject" : fm.find('input[name="subject"]').val(),
                    "text" : fm.find('textarea[name="text"]').val(),
                    "model" : "user"
                };
                $.ajax({
                    type: "post",
                    url: '/json/set-template.php',
                    dataType: 'json',
                    data: prm,
                    success: function(jsn){
                        var msg = $('<div>The template is saved</div>');
                        showNotify(msg,3000,1);
                    }
                });

            }
            $.ajax({
                type: "post",
                url: '/json/mail-send-user.php',
                dataType: 'json',
                data: fm.serialize(),
                success: function(jsn){
                    if(jsn.error) {
                        showError(jsn.error);
                    }
                    else {
                        dlg.modal('hide');
                        $(fm).parents('.modal').modal('hide');
                        $('input.set_checked:checked').click();
                        var msg = $('<div>Messages sent</div>');
                        showNotify(msg,3000);
                    }

                }
            });

        };
        var dlg = makeModal('Preview',btn, 'lg');
        $.ajax({
            type: "post",
            url: '/html/mail-preview-user.php',
            dataType: 'html',
            data: fm.serialize(),
            success: function(dat){
                dlg.body.html(dat);
                dlg.body.find("#set_template").click(function(){
                    if(this.checked) {
                        dlg.body.find("#set_template_name").show();
                    }
                    else {
                        dlg.body.find("#set_template_name").hide();
                    }
                });
            }
        });
    },
    "bindDropper": function(fm){
        $(fm).find(".uploader").dropper({
            action: "/uploader/mail.php",
            maxSize: 8*1024*1024,
            label: "attach a files",
            maxQueue:5
        }).on("start.dropper", mailer.dropperStart)
            .on("fileProgress.dropper",  mailer.dropperProgress)
            .on("fileComplete.dropper",  mailer.dropperComplete)
            .on("fileError.dropper",  mailer.dropperError);
    },
    "dropperStart": function(e, files) {
        console.log("Start");
        var text =  '<div class="progress">' +
        '<div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%">' +
        '<span class="sr-only">loading</span>' +
        '</div></div>';
        $(this).next().html(text);
        $(this).next().css({'background-image':'none'});
    },
    "dropperProgress": function(e, file, percent) {
        $(this).next().find('.progress-bar').css('width',percent+'%');
    },
    "dropperComplete": function(e, file, response) {
        var resp = $.parseJSON(response);
        console.log(resp);
        var progress = $(this).next().empty();
        var fl = $("<div>").insertAfter(progress);
        fl.html(resp.file+" - "+resp.size);
        var fm = $(this).parents('form');
        var fi = $('<input type="hidden" name="files[]">').appendTo($(fm));
        fi.val(resp.file);
    },
    "dropperError": function(e, file, error) {
        showError(error,"File Error");
        $(this).next().empty();
    }
};

/* /mails */

/* обновление контента по кнопкам в браузере вперед/назад */
window.addEventListener("popstate", function(s){
    var currentPage, currentUin;
    if(s.state) {
        currentPage = s.state.page;
        currentUin = s.state.uin; }
    else {
        console.log(window.location);
        var spu=window.location.pathname.split("/");
        if(spu[1])
            currentPage = spu[1]+(spu[3]?"-"+spu[3]:"");
        if(spu[2])
            currentUin = spu[2];
    }

    loadContent(currentPage,currentUin);
}, false);

var ajaxInterval = new Array();

$(document).ready(function(){

    /* загрузка контента при открытии страницы */
    var currentPage, currentUin;
    var spu=window.location.pathname.split("/");
    if(spu[1])
        currentPage = spu[1]+(spu[3]?"-"+spu[3]:"");
    if(spu[2])
        currentUin = spu[2];



    tinymce.init({
        height: 500,
        plugins: [
            'advlist autolink lists link charmap anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime contextmenu paste code'
        ],
        toolbar: 'styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link'
    });


    $('#container').on('click','.link',function(){
        var page = $(this).data('page');
        var id = $(this).data('id');
        loadContent(page,id,1);

    });

});
	
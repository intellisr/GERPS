function goBack() {
    history.go(-1);
}

currentRequest = null;

function CheckAll(option) {
    this.option = option;
    this.pEle = this.option.parentEle;
    this.sEle = this.option.childEle;

    this.selectAll();
}

CheckAll.prototype.selectAll = function () {
    var subEle = this.sEle;

    $(this.pEle).click(function () {
        if ($(this).prop('checked')) {
            $(subEle).prop('checked', true);
        } else {
            $(subEle).prop('checked', false);
        }
    });

};

// Upload button
$(document).on('change', '.upload-box .btn-upload input[type="file"]', function () {
    $(this).parents('.upload-box').find('.upload-text span').text($(this).val()).attr('title', $(this).val());
})

// Number input
$(function () {
    $('input[type="text"].number').on('keyup', function (evt) {
        var val = $(this).val();
        var r = /[0-9]+/;

        if (r.test(val)) {
            $(this).val(r.exec(val)[0]);
        } else {
            $(this).val('');
        }
    });
});

// Text Limit
// Ex : <p data-text-limit="20">Lorem ipsum</p>
(function () {

    $('[data-text-limit]').each(function () {
        var $this = $(this);

        if ($this.attr('data-text-limit')) {
            var limit = $this.attr('data-text-limit');
            var text = $this.html();

            if (text.length > limit) {
                $this.html(text.substr(0, limit) + '...');
            }

        }

    })
})();

//function showInfoMessage(cl) {
//    $(".message").html("Processing Please Wait....");
//    $(".message").removeClass("error");
//    $(".message").removeClass("success");
//    $(".message").addClass("info");
//    $(".message").stop().slideDown("slow");
//
//}
//function showErrorMessage(message) {
//
//    $(".message").html(message);
//    $(".message").removeClass("success");
//    $(".message").removeClass("info");
//    $(".message").addClass("error");
//    setTimeout(function () {
//        $(".message").slideUp()
//    }, 2500);
//
//}
//
//function showSuccessMessage(message) {
//    $(".message").html(message);
//    $(".message").removeClass("error");
//    $(".message").removeClass("info");
//    $(".message").addClass("success");
//    setTimeout(function () {
//        $(".message").slideUp()
//    }, 2500);
//}

function showInfoMessage(cl) {
    if (cl && $(".message").hasClass(cl)) {
        $("." + cl).html("Processing Please Wait....");
        $("." + cl).removeClass("error");
        $("." + cl).removeClass("success");
        $("." + cl).addClass("info");
        $("." + cl).stop().slideDown("slow");
    } else {
        $(".message").html("Processing Please Wait....");
        $(".message").removeClass("error");
        $(".message").removeClass("success");
        $(".message").addClass("info");
        $(".message").stop().slideDown("slow");
    }

}

function showErrorMessage(message, cl) {
    if (cl && $(".message").hasClass(cl)) {
        $("." + cl).html(message);
        $("." + cl).removeClass("success");
        $("." + cl).removeClass("info");
        $("." + cl).addClass("error");
        setTimeout(function () {
            $(".message").slideUp();
            $("." + cl).removeClass("error");
        }, 4000);
    } else {
        $(".message").html(message);
        $(".message").removeClass("success");
        $(".message").removeClass("info");
        $(".message").addClass("error");
        setTimeout(function () {
            $(".message").slideUp();
            $(".message").removeClass("error");
        }, 4000);
    }
}

function showSuccessMessage(message, cl) {
    if (cl && $(".message").hasClass(cl)) {
        //$(".message").addClass(cl);
        $("." + cl).html(message);
        $("." + cl).removeClass("error");
        $("." + cl).removeClass("info");
        $("." + cl).addClass("success");
        setTimeout(function () {
            $(".message").slideUp();
            $("." + cl).removeClass("success");
        }, 4000);
    } else {
        $(".message").html(message);
        $(".message").removeClass("error");
        $(".message").removeClass("info");
        $(".message").addClass("success");
        setTimeout(function () {
            $(".message").slideUp();
            $(".message").removeClass("success");
        }, 4000);
    }
}

function displayLoader(class_e) {
    $(class_e).html('<center><img src="' + http_path + '/images/ajax-loader.gif" /></center>');
}

function hideLoader(class_e) {
    $(class_e).html('');
}

function displayMiniLoader(class_e) {
    $(class_e).html('<center><img src="' + ajax_loader + '" /></center>');
}

function hideMiniLoader(class_e) {
    $(class_e).html('');
}


function scrollToElement(ele) {
    var elementOffset = $("#" + ele);

    if ($(elementOffset).length > 0) {
        $('html,body').animate(
            {
                scrollTop: $(elementOffset).offset().top
            },
            {duration: 'slow'}
        );
    }


}

function scrollToObject(ele, time, callback) {

    $('html, body').animate({scrollTop: $(ele).offset().top}, time, callback);

}

function sendData(from, extraData, path, callback) {
    $.ajax({
        type: "POST",
        url: http_path + path,
        data: $('#' + from).serialize() + extraData,
        success: function (res) {
            callback(res);
            UIUpdate.all();
        }
    });

}

function sendDataAbort(from, extraData, path, callback) {
    if (currentRequest != null) {
        currentRequest.abort();
    }
    currentRequest = $.ajax({
        type: "POST",
        url: http_path + path,
        data: $('#' + from).serialize() + extraData,
        success: function (res) {
            callback(res);
            UIUpdate.all();
        }
    });

}

function quickSearchEmp(inputString, fun,div,before,callback) {
    if (before) {
        before();//Don't reomove
    }
    if (inputString.length == 0) {
        // Hide the suggestion box.
        $('#'+ div).hide();
    } else {
        $('#'+ div).show();
        var extraData = "&queryString=" + inputString + "&function=" + fun;
        displayLoader('#'+ div);
        sendDataAbort('', extraData, 'empDetails/quickSearchEmp', function (res) {
            $('#'+ div).html(res);
            if (callback) {
                callback();//Don't reomove
            }
        });
    }
} // lookup

function quickSearchEmpSubordinate(inputString, fun, before, callback) {

    if (before) {
        before();//Don't reomove
    }

    if (inputString.length == 0) {
        // Hide the suggestion box.
        $('#suggestions').hide();
    } else {
        $('#suggestions').show();
        var extraData = "&queryString=" + inputString + "&function=" + fun;
        displayLoader("#suggestions");
        sendData('', extraData, 'empDetails/quickSearchEmpSubordinate', function (res) {
            $("#suggestions").html(res);
            if (callback) {
                callback();//Don't reomove
            }
        });
    }
} // lookup

function fill(thisValue) {
    $('#inputString').val(thisValue);
    setTimeout("$('#suggestions').hide();", 200);
}



function UIButton() {

    $buton = $('a.bx-but,button.bx-but,button.bx-sm-but');


    function init() {
        createAnimateWrp();
    }

    function callUrl(ele) {
        window.location.href = ele.attr('href');
    }

    function createAnimateWrp() {

        var $span = '<span class="bx-animate-container"></span>';

        $buton.each(function () {

            if ($(this).find('span.bx-animate-container').length) {
                $(this).find('span.bx-animate-container').remove();
            }

            $(this).append($span);


        });

    }

    $buton.on('mousedown', function (evt) {
        evt.stopPropagation();

        $buton = $(this);
        var $thisBtn = $(this);

        if ($(evt.target).parent().is('a')) {
            var offset = $thisBtn.parent().offset();
            var pos_x = evt.pageX - offset.left;
            var middle = $thisBtn.parent().outerWidth() / 2;

            if (pos_x < middle) {
                callUrl($(evt.target).parent());
            }
            else {
                // alert('right part');
            }

        }

        var bxAnimat = $(this).find('.bx-animate-container');
        var animte = '<span class="bx-animate"></span>';

        bxAnimat.html('').append(animte);

        var animateBox = bxAnimat.find('.bx-animate');

        var getHalf = function (width) {
            return width / 2;
        };

        animateBox.width($buton.outerWidth());
        animateBox.height($buton.outerWidth());

        var postion = $buton.offset();

        var left = (evt.pageX - postion.left) - (animateBox[0].style.width.split('px')[0]) / 2;
        var top = (evt.pageY - postion.top) - (animateBox[0].style.width.split('px')[0]) / 2;

        bxAnimat.find('.bx-animate').css({
            'top': top,
            'left': left
        }).animate({
            opacity: 0.8
        }, {
            step: function (now) {
                var sc = 4 * Math.pow(now, 3);
                $(this).css({'transform': 'scale(' + sc + ')'})
            },
            complete: function () {
                $(this).animate(
                    {opacity: 0}
                    , {
                        complete: function () {
                            $(this).remove();
                        }
                    }, 2000)
            }

        }, 300)
    });

    init();

}

var UIUpdate = (function () {

    function all() {
        updateButton();
        formRt();
    }

    function updateButton() {
        UIButton();
    }

    function formRt() {
        if (typeof form != 'undefined') {
            form.reset();
        }
        ;

    }

    return {
        all: all,
        form: formRt,
        button: updateButton
    };

})();
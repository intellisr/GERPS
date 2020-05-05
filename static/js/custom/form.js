var form = (function () {
    return {
        reset: function () {
            $('input[type="text"],input[type="password"], select').each(function () {
                if ($(this).val() != null && $(this).val().length > 0) {
                    $(this).nextAll('label').addClass('focusLbl');
                } else {
                    $(this).nextAll('label').removeClass('focusLbl');
                }

            });

            $('select.selectFirst').each(function () {
                if ($(this).find('option').length > 1) {
                    $(this).find('option:nth-child(2)').prop('selected', true);
                    $(this).next('label').addClass('focusLbl');
                } else {
                    if ($(this).find('option:nth-child(1)').val() !== '') {
                        $(this).prepend('<option value="0"></option>');
                    }
                }
            });
        }
    };
}());
//example
//form.reset();


// Remove * for required field
$(window).load(function () {
    $("span.required:contains('*')").empty();

    UIUpdate.button();
    lableReset();

});
function lableReset() {

    $('input[type="text"],input[type="password"], select').not(function () {
        if ($(this).val() != null) {
            return $(this).val().length > 0;
        } else {
            return false;
        }
    }).each(function () {
        $(this).next().removeClass('focusLbl');
    });
}

$(window).on('load', function () {
    $('input[type="text"],input[type="password"], select').each(function () {
        if ($(this).val() != null && $(this).val().length > 0) {
            $(this).nextAll('label').addClass('focusLbl');
        } else {
            $(this).nextAll('label').removeClass('focusLbl');
        }

    });

    $('select.selectFirst').each(function () {
        if ($(this).find('option').length > 1) {
            $(this).find('option:nth-child(2)').prop('selected', true);
            $(this).next('label').addClass('focusLbl');
        } else {
            if ($(this).find('option:nth-child(1)').val() !== '') {
                $(this).prepend('<option value="0"></option>');
            }
        }
    });

});

// Textbox and Label
$(function () {
    $('input[type="text"],input[type="password"], select').each(function () {
        if ($(this).val() != null && $(this).val().length > 0) {
            $(this).next().addClass('focusLbl');
        } else {
            $(this).next().removeClass('focusLbl');
        }


    });
    // Text box &amp; Lable
    $(document).on('focus', 'input[type="text"],input[type="password"], select', function () {
        var curSelect = $(this);
        curSelect.nextAll('label:not(.error)').addClass('focusLbl').fadeIn("slow");
        curSelect.next('label:contains("This field is required.")').removeClass('focusLbl').hide();
    });
    $(document).on('blur', 'input[type="text"],input[type="password"], select.lblSelect, select', function () {
        var curSelect = $(this);
        if (curSelect.val() === null || curSelect.val().length === 0 || curSelect.val() === '') {
            curSelect.nextAll('label:not(.error)').removeClass('focusLbl');
        }
    });
});

//use for some filds as a callback function.
//setEffect(this)
function setEffect(ele) {
    if ($(ele).val().length > 0) {
        $(ele).next().addClass('focusLbl');
    } else {
        $(ele).next().removeClass('focusLbl');
    }
}

// Input defualt Layout
$(document).on('focus', '.input-default input[type="text"],.input-default input[type="password"],.input-default select', function () {
    var curSelect = $(this);
    curSelect.parents('.input-default').find('label').addClass('lb_focus');

});
$(document).on('blur', '.input-default input[type="text"],.input-default input[type="password"],.input-default select', function () {
    var curSelect = $(this);
    curSelect.parents('.input-default').find('label').removeClass('lb_focus');

});
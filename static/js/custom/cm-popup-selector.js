
$.fn.PopupSelector = function (options) {


    this.each(function () {
        this.item = $(this);
        createSelector($(this));
        event($(this));
    });

    var setting = $.extend({
        select: null
    }, options);

    function getParent(ele) {
        return ele.parent();
    }

    function getSelectedItem(ele) {
        var opt = ele.find('option:selected');
        return {
            'text': opt.text(),
            'val': opt.val()
        }
    }

    function createHeader() {
        return $('<div class="cm-select-header"></div>');
    }

    function createBody() {
        return $('<div class="cm-select-body"></div>');
    }

    function createHeaderText(ele) {
        var item = getSelectedItem(ele);
        return $('<div class="text"><span>' + item.text + '</span></div>');
    }

    function createUl(ele) {
        var ul = $('<ul></ul>');

        ele.find('option').each(function () {
            var val = $(this).val();
            var text = $(this).text();

            var li = $('<li data-val="' + val + '">' + text + '</li>');

            if ($(this).is(':selected')) {
                li.addClass('active');
            }

            ul.append(li);
        });

        return ul;
    }


    function createSelector(ele) {
        var _ele = ele;
        var appendEle = getParent(_ele);

        var cmSelector = $('<div class="cm-popup-select cm-select-wrp"></div>');
        appendEle.append(cmSelector);

        cmSelector.append(_ele).find(_ele).hide();

        var header = createHeader();
        cmSelector.append(header);
        header.append(createHeaderText(_ele));
        header.append($('<div class="icon-more"><i></i></div>'));

        var body = createBody();
        cmSelector.append(body);

        var ul = createUl(_ele);
        body.append(ul);
    }


    function event(ele) {
        var cmParent = ele.parent('.cm-popup-select');

        cmParent.find('.cm-select-header').on('click', function () {
            var parent = $(this).parents('.cm-popup-select');
            parent.find('.cm-select-body').css('transform', 'scale(1)').addClass('on');
        });

        cmParent.find('.cm-select-body ul li').on('click', function () {
            var dataVal = $(this).attr('data-val');

            cmParent.find('.cm-select-body ul li').removeClass('active');
            $(this).addClass('active');
            cmParent.find('.cm-select-header .text span').text($(this).text());
            cmParent.find('select option[value="' + dataVal + '"]').prop('selected', true);
            cmParent.find('.cm-select-body').css('transform', 'scale(0)').removeClass('on');

            setting.select.call(this, dataVal, $(this).text());

        });

        $(document).on('click', function (evt) {

            if (!$(evt.target).parents('.cm-popup-select').hasClass('cm-select-wrp')) {
                $('.cm-select-body').css('transform', 'scale(0)');
            }
        });
    }

    return this;

};

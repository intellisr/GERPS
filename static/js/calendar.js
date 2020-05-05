

$(function () {

    var cellEle = '',
            timeRow = '',
            btnFlag = "Save";

    itemClass = '';

    cellName = '';
    TimeRange = '';
    $modal = $('#clnModal');



    editContent = '';

    var globleEvent = events;


    var $maxHeight = 60,
            eventItemId = 0;

    var leave = {
        startTime: '00',
        endTime: '00',
        create: function (startTime, endTime) {
//            console.log(this);
            this.startTime = startTime;
            this.endTime = endTime;
            return this.buildBox();
        },
        getHourAndMinute: function (obj) {
            return obj.split(':');
        },
        getTimeDuration: function () {


            var date = new Date(0, 0, 0, this.getHourAndMinute(this.startTime)[0], this.getHourAndMinute(this.startTime)[1]);
            var date2 = new Date(0, 0, 0, this.getHourAndMinute(this.endTime)[0], this.getHourAndMinute(this.endTime)[1]);

            var diff = date2.getTime() - date.getTime();
            return (diff / 1000 / 60);
        },
        buildBox: function () {

            var html = '';
            var style = '';
            var timeDur = this.getTimeDuration();
            var height = $maxHeight;


            if (timeDur < 0) {

                height = 0;
                return '';
            }
            if (timeDur > 60) {

                height = $maxHeight + (timeDur - 60);
            } else {

                height = timeDur;
            }


            html = html + '<div class="half-leave" style="height: ' + height + 'px">';



            html = html + '</div>';

            return html;
        }
    };
    var event = {
        id: '0',
        startTime: '00',
        endTime: '00',
        title: '',
        category: '',
        sub_category: '',
        status: '',
        create: function (startTime, endTime, title, id, status) {
            this.id = id;
            this.startTime = startTime;
            this.endTime = endTime;
            this.title = title;
            this.status = status;
            return this.buildBox();
        },
        getHourAndMinute: function (obj) {
            return obj.split(':');
        },
        getTimeDuration: function () {


            var date = new Date(0, 0, 0, this.getHourAndMinute(this.startTime)[0], this.getHourAndMinute(this.startTime)[1]);
            var date2 = new Date(0, 0, 0, this.getHourAndMinute(this.endTime)[0], this.getHourAndMinute(this.endTime)[1]);

            var diff = date2.getTime() - date.getTime();
            return (diff / 1000 / 60);
        },
        buildBox: function () {

            var html = '';
            var style = '';
            var timeDur = this.getTimeDuration();
            var height = $maxHeight;


            if (timeDur < 0) {
                height = 0;
                return '';
            }
            if (timeDur > 60) {

                height = $maxHeight + (timeDur - 60);
            } else {

                height = timeDur;
            }

            if (this.status === "0") {
                html = html + '<div class="events" style="height: ' + height + 'px;background-color:#f9d453">';
            } else {
                html = html + '<div class="events" style="height: ' + height + 'px">';
            }

            html = html + '<span>' + this.startTime.substring(0, 5) + ' - ' + this.endTime.substring(0, 5) + '</span>';
            html = html + '<span>' + this.title + '</span>';
            html = html + '</div>';

            return html;
        }
    };




    var timeBy = function (time, action) {
        var date = new Date(0, 0, 0, time.split(':')[0], time.split(':')[1]);
        var time;
        if (action === "Min") {
        } else {
            time = date.getTime();
        }
        return time;

    };

    var positionByTime = function (startTime) {

        var hour = startTime.split(':');

        return (($maxHeight) * (hour[0] * 1)) + (hour[1] * 1);
    };

    var cellCount = function () {
        return $('.cln-cell .dates-wrp').length;
    };

    init();

    function init() {
        loadTimeRow();
        loadMonthRows();
        loadHalfDates();
        loadData(events);
        onResizeEvents();
        loadMonthData(events);

    }


    function loadHalfDates() {

        var index = 1;
        while (index <= cellCount()) {
            var wrpItem = $(".cell" + index);
            var timeRange;
            var isHalfDay = getClass(wrpItem, 'time_');
            //$('div[class^="time_"]');

            if (isHalfDay !== undefined) {
                timeRange = (getClass(wrpItem, 'time_').substr(5)).split("-");
                var startTime = timeRange[0];
                var endTime = timeRange [1];
                var cell = (getClass(wrpItem, 'cell').substr(4));

                if ($('.dates-wrp .event-wrp').parent('.halfLeave').length) {
                    createLeaveBox($('.cell' + cell).find('.event-wrp'), startTime, endTime);
                }
            }
            //(getClass(wrpItem, 'time_').substr(5)).split("-");

            index++;
        }
    }

    //All event item sort by time
    function sortElement(callback) {
        var index = 1;

        while (index <= cellCount()) {

            var ele = $('.cell' + index);

            var parentEle = ele.find('.event-wrp');
            var $allItem = parentEle.find('.ent-item');

            function shortByTime(arr) {

                function compare(ele1, ele2) {
                    var val1 = $(ele1).css('top').split('px')[0];
                    var val2 = $(ele2).css('top').split('px')[0];

                    if (val1 < val2) {
                        return -1;
                    } else if (val1 > val2) {
                        return 1;
                    } else {
                        return 0;
                    }
                }

                parentEle.empty();
                var el = 0;
                var sortedItem = arr.sort(compare);
                while (el < sortedItem.length) {
                    parentEle.append(sortedItem[el]);
                    el++;
                }

            }

            var sortArr = [];

            for (var f = 0; f < $allItem.length; f++)
                sortArr.push($allItem[f]);

            shortByTime(sortArr);

            if (index === cellCount()) {
                callback();
            }

            index++;
        }

    }

    function loadTimeRow() {

        var index = 1;
        while (index <= cellCount()) {
            for (var i = 0; i < 24; i++) {
                var cls = 'tm-' + i;
                $('.cell' + index).append('<div class="tb-row ' + cls + '"></div>');
            }
            index++;
        }
    }


    function onResizeEvents() {

        // sortElement(function () {
        //
        // });
        setSize();

    }

    function setSize() {
        var index = 1;

        var getTime = function (ele, type) {
            var time = $(ele).find('.events span:first').text();
            if (type === "start") {
                return time.split('- ')[0];
            } else if (type === "end") {
                return time.split('- ')[1];
            }
        };

        var isTimeGreaterThan = function (time1, time2) {
            var date = new Date(0, 0, 0, time1.split(':')[0], time1.split(':')[1]);
            var date2 = new Date(0, 0, 0, time2.split(':')[0], time2.split(':')[1]);

            if (date2.getTime() < date.getTime()) {
                return true;
            } else {
                return false;
            }

        };

        var eventsSort = function (arrItem) {
            var arr = arrItem;
            var items = {};

            var reorder = function (item, agTime) {

                var outputObj = {};

                function getStartEndTime(el) {
                    var times = $(el).find('.events span:first').text().split('- ');
                    return [times[0], times[1]];
                }

                function compare(val1, val2) {

                    if (val1 < val2) {
                        return -1;
                    } else if (val1 > val2) {
                        return 1;
                    } else {
                        return 0;
                    }
                }

                var index = 0;

                while (index < (item.length - 1)) {
                    var val1 = getStartEndTime(item[index]);
                    var val2 = getStartEndTime(item[index + 1]);

                    // Check start time is same
                    if (timeBy(val1[0]) === timeBy(val2[0])) {
                        // check what is the max durtion event.
                        //item[]
                    } else {

                    }


//                    console.log('=================================================================');
//                    console.log('Element 1 ', item[index], 'Start Time ', val1[0], 'End Time ', val1[1]);
//                    console.log('Element 2 ', item[index + 1], 'Start Time ', val2[0], 'End Time ', val2[1]);
//                    console.log('=================================================================');
                    index++;
                }
            }

            var sortByTime = function () {
                var x = 0,
                        time;

                while (x < arr.length) {
                    time = arr[x][0].split(':')[0];

                    if (!items[time])
                        items[time] = [];

                    items[time].push(arr[x][1]);

                    x++;
                }
                return this;
            };

            var reorderByTime = function () {
                var x;
                var arrOut = [];

                for (x in items) {
                    var c = 0;

                    reorder(items[x], x);

                    while (c < items[x].length) {

                        var leg = items[x].length;
                        var w;
                        var left = 0;
                        var leftVal = 0;
                        var v = 0;


                        if (1 < leg) {
                            w = 100 / leg;
                            leftVal = (Math.floor(100 - w)) / leg;
                            while (v < leg) {
                                //console.log('Inner while ', items[x][v], 'Left ', left);
                                $(items[x][v]).css('left', left + '%');
                                left = left + leftVal;
                                v++;
                            }
                            //arrOut.push($(items[x]).css('left', left + '%'));
                        } else {
                            w = 90;
                        }
                        $(items[x]).css('width', w + '%');

                        c++;
                    }

                    arrOut.push($(items[x]));
                    //console.log('Out with width ', arrOut);
                }

                return this;
            };

            var toObject = function () {
                return items;
            }

            return {
                sortByTime: sortByTime,
                reorderByTime: reorderByTime,
                toObject: toObject
            };
        }

        // while (index <= 1) {
        while (index <= cellCount()) {

            var ele = $('.cell' + index);

            var x = 0;
            var itemObj = ele.find('.event-wrp .ent-item');

            var existTimeRange = [];
            var eleObj = [];

            while (x < itemObj.length) {
                var stTime = getTime(itemObj[x], "start");
                eleObj = [stTime, itemObj[x]];
                existTimeRange.push(eleObj);
                x++;
            }

            var events = eventsSort(existTimeRange);
            events.sortByTime().reorderByTime();

            //console.log(existTimeRange);
            // while (x < (itemObj.size() - 1)) {
            //
            //     var firstEndTime = getTime(itemObj[x], "end");
            //     var secondStratTime = getTime(itemObj[x + 1], "start");
            //
            //     if (isTimeGreaterThan(firstEndTime, secondStratTime)) {
            //         $(itemObj[x]).css('width', '50%');
            //         $(itemObj[x + 1]).css('width', '50%');
            //         $(itemObj[x + 1]).css('left', '33%');
            //     } else {
            //         $(itemObj[x + 1]).css('width', '85%');
            //     }
            //     x++;
            // }

//            function checkBy(i) {
//                // if (ele.find('.event-wrp .ent-item').hasClass('ev-' + i)) {
//                //
//                //     var $ele = ele.find('.event-wrp .ev-' + i),
//                //         $count = $ele.size(),
//                //         width = 0,
//                //         eleArr = null;
//                //
//                //     if ($count > 1) {
//                //
//                //         width = 100 / ($count - 1);
//                //         var index = 0,
//                //             left = 20;
//                //         eleArr = $ele;
//                //
//                //         while (index < eleArr.length) {
//                //
//                //             var item = eleArr[index + 1];
//                //             left = left * (index + 1);
//                //             $(item).css('width', width + '%');
//                //             $(item).css('left', left + '%');
//                //             index++;
//                //         }
//                //
//                //         //console.log('Event item ev-' + i);
//                //         //console.log('Event item Array ', eleArr);
//                //         //eleArr = [];
//                //         // console.log('Event item Array ', eleArr);
//                //
//                //     } else {
//                //         width = 85;
//                //     }
//                // }
//                //console.log('Event item count cell' + i, $('.cell1').find('.ev-' + i).size());
//            }
//
//            // for (var i = 0; i <= 23; i++) {
//            //     checkBy(i);
//            // }
            index++;
        }
    }

    function loadData(json) {

        json.forEach(function (item) {
            createEvtBox($('.cell' + item.cell).find('.event-wrp'), item.evtItem.startTime, item.evtItem.endTime, item.evtItem.title, item.evtId, item.status);
        });

    }

    function createLeaveBox(target, startTime, endTime) {


        var stTime = 'ev-' + startTime.split(':')[0];
        var style = '';
        style += 'top:' + positionByTime(startTime) + 'px;';
        style += 'left:0;';
        style += 'z-index:' + startTime.split(':')[0] + ';';
        style += 'width:100%';


        var eventItem = leave.create(startTime, endTime);

        var html = '<div class="leave-item ' + stTime + '" style="' + style + '">' + eventItem + '</div>';

        target.append(html);
    }




    function createEvtBox(target, startTime, endTime, title, id, status) {


        var stTime = 'ev-' + startTime.split(':')[0];
        var style = '';
        style += 'top:' + positionByTime(startTime) + 'px;';
        style += 'left:0;';
        style += 'z-index:' + startTime.split(':')[0] + ';';


        var eventItem = event.create(startTime, endTime, title, id, status);

        var html = '<div class="ent-item ' + stTime + ' ' + id + '" style="' + style + '">' + eventItem + '</div>';

        target.append(html);
    }

    function setSizeItem() {
        var index = 1;
        while (index <= cellCount()) {

            var ele = $('.cell' + index);

            function checkBy(i) {

                if (ele.find('.event-wrp .ent-item').hasClass('ev-' + i)) {

                    var $ele = ele.find('.event-wrp .ev-' + i),
                            $count = $ele.size(),
                            width = 0,
                            eleArr = null;

                    if ($count > 1) {

                        width = 100 / ($count - 1);
                        var index = 0,
                                left = 20;
                        eleArr = $ele;

                        while (index < eleArr.length) {

                            var item = eleArr[index + 1];
                            left = left * (index + 1);
                            $(item).css('width', width + '%');
                            $(item).css('left', left + '%');
                            index++;
                        }

                        //console.log('Event item ev-' + i);
                        //console.log('Event item Array ', eleArr);
                        //eleArr = [];
                        // console.log('Event item Array ', eleArr);

                    } else {
                        width = 85;
                    }
                }
                //console.log('Event item count cell' + i, $('.cell1').find('.ev-' + i).size());
            }

            for (var i = 0; i <= 23; i++) {
                checkBy(i);
            }
            index++;
        }

    }

    function reloadEvents(ele) {


        var allClass = [], items = [];


        $(ele).find('.event-wrp div[class*="ev-"]').each(function (i, el) {
            items = [el.className.match(/\ev-\d{1,2}/), 1];
            allClass.push(items);
        });

        //console.log('Ele ', ele);

        var items = {}, base, key;
        for (var i = 0; i < allClass.length; i++) {
            base = allClass[i];
            key = base[0];
            if (!items[key]) {
                items[key] = 0;
            }
            items[key] += base[1];
        }

        var outputArr = [], temp;
        for (key in items) {
            temp = [key, items[key]];
            outputArr.push(temp);
        }
        //console.log(outputArr);


        $.each(outputArr, function (i, d) {
            var count = d[1];
            var width;

            if (count > 1) {
                width = 100 / count;
            } else {
                width = 90;
            }


            //console.log(count, width, 'as ' + d[0]);

            $(document).find(ele).find('.' + d[0]).each(function (i, el) {
                $(this).css('width', width + '%');
                status = true;
            });
        });

    }

    function getClass(element, startsWith) {

        var result = undefined;
        $(element.attr('class').split(' ')).each(function () {

            if (this.indexOf(startsWith) > -1)
                result = this;
        });
        return result;
    }
    //Click event for time row and month row
    $(document).on('click', function (e) {

        if ($(e.target).hasClass('tb-row')) {
            if (!($(e.target).parents('.disable').length) && !($(e.target).parents('.leave').length) && !($(e.target).parents('.holiday').length)) {
                timeRow = $(e.target);
                cellEle = $(e.target).parent();
                cellName = (getClass(cellEle, 'date_')).substr(5);
                var stTime;

                if (/tm-\d{1,2}/.test(timeRow.attr('class'))) {
                    stTime = timeRow.attr('class').match(/tm-\d{1,2}/)[0].match(/\d{1,2}/);

                }
//            $modal = $('#clnModal');
                $modal.find('.modal-title').text('Add Task');
                $modal.find('.btnSave').text('Save').removeClass('edit').addClass('save');
                $modal.find('.btnDelete').addClass('hide');
                $modal.find('.txt-title').val('');
                $modal.find('.txt-stTime').val(stTime + ':00');
                $modal.find('.txt-endTime').val(stTime + ':59');
                btnFlag = "Save";
                $(".btnSave").prop("disabled", false);
                $modal.modal('show');

                form.reset();
            } else if (($(e.target).parents('.leave').length)) {

                onLeave();

            } else if (($(e.target).parents('.holiday').length)) {
                onHoliday();
            }

        } else if ($(e.target).hasClass('event-list')) {
            if (!$(e.target).parents('.leave').length && !$(e.target).parents('.holiday').length) {


                cellEle = $(e.target).parent();
                cellName = (getClass(cellEle, 'setData_')).substr(8);

                var stTime = 0;
                timeRow = parseFloat(($(e.target).attr('class')).match(/\d+/)[0]);

                $modal = $('#clnModal');
                $modal.find('.modal-title').text('Add Task');
                $modal.find('.btnSave').text('Save').removeClass('editMonth').addClass('saveMonth');
                $modal.find('.btnDelete').addClass('hide');
                $modal.find('.txt-title').val('');
                $modal.find('.txt-stTime').val(stTime + ':00');
                $modal.find('.txt-endTime').val(stTime + ':59');
                $modal.find('.txt-id').val(timeRow);
                btnFlag = "Save";
                $(".btnSave").prop("disabled", false);
                $modal.modal('show');

                form.reset();
            } else if ($(e.target).parents('.leave').length) {
                onLeave();
            } else if ($(e.target).parents('.holiday').length) {
                onHoliday();
            }



        }
    });


    //Click event for event items
    $(document).on('click', function (e) {


        if ($(e.target).parents().hasClass('ent-item')) {
            itemClass = $(e.target).parents('.ent-item'),
                    $modal = $('#clnModal');


            if (/event-\w+/.test(itemClass.attr('class'))) {
                eventItemId = itemClass.attr('class').match(/(\event-)(\w+)/)[0];
//                console.log('event id');
//                console.log(eventItemId);

                editContent = getEventDetails(eventItemId);
//                console.log('taken detials');
//                console.log(editContent);


                $modal.find('.modal-title').text('Edit Event');
                $modal.find('.btnSave').text('Edit').removeClass('save').addClass('edit');
                $modal.find('.btnDelete').removeClass('hide');

                $modal.find('.txt-title').val(editContent.evtItem.title);
                $modal.find('.txt-stTime').val(editContent.evtItem.startTime);
                $modal.find('.txt-endTime').val(editContent.evtItem.endTime);
                $modal.find('.txt-note').val(editContent.evtItem.note);
                $modal.find('.txt-category').val(editContent.evtItem.category);
                $modal.find('.txt-subCategory').val(editContent.evtItem.sub_category);
                $(".btnSave").prop("disabled", false);
                $('.txt-stTime').css({"border-bottom-color": "rgba(78, 79, 75, 0.2)"});
                $('.txt-endTime').css({"border-bottom-color": "rgba(78, 79, 75, 0.2)"});

                // var isMeeting = true;
                btnFlag = "Edit";
                $modal.modal('show');

                form.reset();

            }
        } else if ($(e.target).parents().hasClass('ev-item')) {


            itemClass = $(e.target).parents('.ev-item');
            $modal = $('#clnModal');
            eventItemId = itemClass.attr('class').match(/(\event-ev)(\w+)/)[0];
            editContent = getEventDetails(eventItemId);
//            console.log('event details');



            $modal.find('.modal-title').text('Edit Event');
            $modal.find('.btnSave').text('Edit').removeClass('saveMonth').addClass('editMonth');
            $modal.find('.btnDelete').removeClass('hide');
            $modal.find('.txt-title').val(editContent.evtItem.title);
            $modal.find('.txt-stTime').val(editContent.evtItem.startTime);
            $modal.find('.txt-endTime').val(editContent.evtItem.endTime);
            $modal.find('.txt-note').val(editContent.evtItem.note);
            $modal.find('.txt-category').val(editContent.evtItem.category);
            $modal.find('.txt-subCategory').val(editContent.evtItem.sub_category);
            $(".btnSave").prop("disabled", false);
            $('.txt-stTime').css({"border-bottom-color": "rgba(78, 79, 75, 0.2)"});
            $('.txt-endTime').css({"border-bottom-color": "rgba(78, 79, 75, 0.2)"});
            // var isMeeting = true;
            btnFlag = "Edit";
            $modal.modal('show');

            form.reset();

        } else if ($(e.target).parents().hasClass('leave-item')) {
            onLeave();

        }

    });


    $('.txt-stTime').on('change', function () {
        validateDates($('#clnModal').find('.txt-stTime').val(), $('#clnModal').find('.txt-endTime').val());

    });

    $('.txt-endTime').on('change', function () {
        validateDates($('#clnModal').find('.txt-stTime').val(), $('#clnModal').find('.txt-endTime').val());

    });


    // function for modal save event
    $('.btnSave').unbind().on('click', function () {


        $modal = $('#clnModal');

        var title = $modal.find('.txt-title').val();
        var stTime = $modal.find('.txt-stTime').val();
        var endTime = $modal.find('.txt-endTime').val();
        var note = $modal.find('.txt-note').val();
        var category = $modal.find('.txt-category').val();
        var sub_category = $modal.find('.txt-subCategory').val();
//        var isMeeting = true;

        var modalReset = function () {
            //Hide modal
            $('#clnModal').modal('hide');

            //Reset all fields
            $modal.find('.txt-title').val('');
            $modal.find('.txt-stTime').val('00:00');
            $modal.find('.txt-endTime').val('00:00');
            $modal.find('.txt-note').val('');
            $modal.find('.txt-category').val('');
            $modal.find('.txt-subCategory').val('');
            form.reset();
        };

        var obj = {
            "id": "0",
            "cell": cellName,
            "startTime": stTime,
            "endTime": endTime,
            "title": title,
            "category": category,
            "sub_category": sub_category,
            "note": note
        };
        if ($(this).hasClass('save') && btnFlag === "Save") {
            onEventSave(obj);
            reloadEvents();
            onResizeEvents();
            modalReset();

        } else if ($(this).hasClass('edit') && btnFlag === "Edit") {

            obj.id = editContent.id;
            onEventEdit(obj);
            reloadEvents();
            onResizeEvents();
            modalReset();


        } else if ($(this).hasClass('saveMonth') && btnFlag === "Save") {
            var item = $modal.find('.txt-id').val();
            onEventSave(obj);

            reloadEvents();
            onResizeEvents();
            modalReset();

        } else if ($(this).hasClass('editMonth') && btnFlag === "Edit") {


            onEventEdit(obj);

            reloadEvents();
            onResizeEvents();
            modalReset();

        }

    });

    $('.btnDelete').on('click', function () {

        deletEvent(editContent);
        $modal.modal('hide');
    });


    //Month calendar functions
    function addMonthEvent(date, obj) {
        var html;
        html = '<span>' + obj.evtItem.title;
//        + ' - ' + obj.evtItem.startTime.substring(0,5) + ' ' + obj.evtItem.endTime.substring(0,5) + '</span>';
        if (obj.status === "0") {
            $(".dt-" + date).append("<li style='background-color:#f9d453'; class='ev-item " + obj.id + "'>" + html + "</li>").addClass('event-item');
        } else {
            $(".dt-" + date).append("<li class='ev-item " + obj.id + "'>" + html + "</li>").addClass('event-item');
        }


    }

    function loadMonthRows() {

        var monthIndex;
        $(".date .content").each(function () {

            if (!($(this).parents('.disable').length)) {
                monthIndex = $(this).siblings('.date .header').find('.num').text();
                $(this).append("<ul class='event-list dt-" + monthIndex + "' onclick='addMonthEvent(" + monthIndex + ")'></ul>")

            }
        });
    }

    function validateDates(stTime, enTime) {

        var validDate = validateTimeDuration(stTime, enTime);

        if (validDate > 0) {

            $('.txt-stTime').css({"border-bottom-color": "rgba(78, 79, 75, 0.2)"});
            $('.txt-endTime').css({"border-bottom-color": "rgba(78, 79, 75, 0.2)"});

            $(".btnSave").prop("disabled", false);

        } else {
            $('.txt-stTime').css({"border-bottom-color": "#F26B55"});
            $('.txt-endTime').css({"border-bottom-color": "#F26B55"});

            $(".btnSave").prop("disabled", true);
        }
    }

    function  validateTimeDuration(stTime, endTime)
    {
        var date = new Date(0, 0, 0, getMinutes(stTime)[0], getMinutes(stTime)[1]);
        var date2 = new Date(0, 0, 0, getMinutes(endTime)[0], getMinutes(endTime)[1]);

        var diff = date2.getTime() - date.getTime();
        return (diff / 1000 / 60);
    }
    function getMinutes(obj) {
        return obj.split(':');
    }

    function loadMonthData(json) {
        json.forEach(function (item) {
            ;
            addMonthEvent(item.cell, item);
        });
    }


});
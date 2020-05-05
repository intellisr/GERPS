

// CMAccordion
// ----------------------
//  callback function
// ----------------------
// onClick: function(ele){}
// onSlideDown: function(ele){}
// onSlideUp: function(ele){}
!function(a){a.fn.CMAccordion=function(b,c){function e(b){return b.each(function(){var b={onClick:null,onSlideDown:null,onSlideUp:null},e=a.extend(b,c);a(this).find(d.linkClass).on("click",function(b){b.preventDefault(),function(a){var b=a;b.hasClass("active-link")?(b.removeClass("active-link"),b.nextAll(d.boxClass).slideUp("slow",function(){e.onSlideUp&&e.onSlideUp.call(this,b)}).removeClass("active")):(e.onClick&&e.onClick.call(this,b),b.addClass("active-link"),b.nextAll(d.boxClass).slideDown("slow",function(){e.onSlideDown&&e.onSlideDown.call(this,b)}).addClass("active"))}(a(this))})})}if(b){var d={wrapper:"",linkClass:"",boxClass:""};"black"===b?d={wrapper:".ui_accordion",linkClass:".ui-link",boxClass:".ui-box-wrp"}:"red"===b&&(d={wrapper:".ui-sm-accordion",linkClass:".ui-sm-link",boxClass:".ui-sm-box-wrp"}),e(this)}}}(jQuery);


// CardBox
// ----------------------
//  callback function
// ----------------------
// init: function(ele){}
// onExpand: function(ele){}
// onCollapse: function(ele){}
// onSlideDown: function(ele){}
// onSlideUp: function(ele){}

!function(a){a.fn.cardBox=function(b){return this.each(function(){var c={init:null,onExpand:null,onCollapse:null,onSlideDown:null,onSlideUp:null},d=a.extend(c,b);d.init&&d.init.call(this,a(this)),a(this).find(".btn-expand-wrp a").on("click",function(b){b.preventDefault();var c=a(this),e=c.parents(".card-content-wrp");c.hasClass("btn-expand-down")?d.onCollapse&&d.onCollapse.call(this,c):d.onExpand&&d.onExpand.call(this,c),c.hasClass("btn-expand-down")?(c.removeClass("btn-expand-down"),e.find(".box-body").slideUp("slow",function(){d.onSlideUp&&d.onSlideUp.call(this,c),e.removeClass("on")}).removeClass("active-box")):(c.addClass("btn-expand-down"),e.addClass("on"),e.find(".box-body").slideDown("fast",function(){d.onSlideDown&&d.onSlideDown.call(this,c)}).addClass("active-box"))})})}}(jQuery);

// UI Selector
// ----------------------
//  callback function
// ----------------------
// onClick: function(ele){}
// onSelect: function(ele,val){}

// !function(a){a.fn.UISelect=function(b){var c=100,d={maxHeight:210,onClick:null,onSelect:null},e=a.extend(d,b);return this.each(function(){function l(a){var b=a.parents(".ui-selector"),c=b.find("select").val();b.find(".ui-selector-bottom li").removeClass("selected"),b.find('.ui-selector-bottom li[data-val="'+c+'"]').addClass("selected")}function m(){var c=a('<div class="text"><span class="selected"></span><span class="icon"><i></i></span></div>'),d=a('<span class="text-label"><span class="t-label"></span><span class="required"></span></span>');c.find("span.selected").text(j().text).attr("data-val",j().val),d.find(".t-label").text(k()),b.hasClass("required")||d.find(".required").remove(),g.append(c).append(d),h.append(i()),k()&&g.addClass("selected");var e=b.parent();f.append(g).append(h).append(b),b.hide(),e.append(f)}var b=a(this),d=null,f=a('<div class="ui-selector ui-enable"></div>'),g=a('<div class="ui-selector-top"></div>'),h=a('<div class="ui-selector-bottom"></div>'),i=function(){var c=a("<ul></ul>");return b.find("option").each(function(b){var d=a(this);if(""!==d.text()&&null!==d.text()){var e=a("<li></li>");d.is(":selected")&&e.addClass("selected"),e.attr("data-val",d.val()).text(d.text()),e.attr("data-index",b),c.append(e)}}),c},j=function(){return{val:b.find("option:selected").val(),text:b.find("option:selected").text()}},k=function(){if(b.data("label"))return b.data("label")};g.on("click",function(){d=a(this),f.addClass("focus"),e.onClick&&e.onClick.call(this,b),a(".ui-selector-bottom").fadeOut(c),h.height()>e.maxHeight&&(h.css("height",e.maxHeight),h.addClass("scrollable")),l(d),h.fadeIn("fast").addClass("on")}),h.on("click","ul li",function(){var d=a(this),f=d.data("val");d.parents(".ui-selector").find(".ui-selector-top .text .selected").text(d.text()).attr("data-val",f),b.find('option[value="'+f+'"]').prop("selected",!0),l(d),d.parents(".ui-selector-bottom").fadeOut(c).removeClass("on"),a(".ui-selector").removeClass("focus"),e.onSelect&&e.onSelect.call(this,b,f)}),a(document).on("click",function(b){a(b.target).parents(".ui-selector").hasClass("ui-enable")||(a(".ui-selector-bottom").fadeOut(c),a(".ui-selector").removeClass("focus"))}),m()})}}(jQuery);

//Box tab
// ----------------------
//  callback function
// ----------------------
// onClick: function(ele){}
!function(){function t(t,i){this.ele=t,this.selector=$(t),this.option=i,this.tabContainer=this.selector.find(".box-tab-container"),this.selector.find("ul li a").on("click",this.onClick.bind(this)),this.init(),this.calcTabWidth()}var i=t.prototype;i.activeTab=function(){return this.selector.find("ul li.active a")},i.init=function(){var t=this.activeTab(),i=this,a=t.attr("href"),n=i.tabContainer.find(".tab-item").length;n>1?(i.tabContainer.find(".tab-item").removeClass("active"),i.tabContainer.find(a).addClass("active")):i.tabContainer.find(".tab-item").addClass("active")},i.calcTabWidth=function(){var t,i=this.selector.find("ul li").length,a=Math.abs(100/i);t=a===Math.floor(a)?Number(a):Number(parseFloat(a).toFixed(2)),this.selector.find("ul li").css("width",t+"%")},i.onClick=function(t){t.preventDefault();var i=$(t.target),a=this,n=i.attr("href"),e=i.parent(),s=a.tabContainer.find(".tab-item").length;e.hasClass("active")||(a.selector.find("ul li").removeClass("active"),e.addClass("active"),s>1?(a.tabContainer.find(".tab-item").removeClass("active"),a.tabContainer.find(n).addClass("active")):a.tabContainer.find(".tab-item").addClass("active"),null!==a.option.onClick&&a.option.onClick.call(this,i))},$.fn.boxTab=function(i){return $(this).each(function(){var a={onClick:null},n=$.extend(a,i);new t($(this),n)})}}();
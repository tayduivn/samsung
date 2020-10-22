$(window).on('popstate', function() {
    location.reload(true);
});

var selectedSortby;
var tt = 'Thứ tự';

var filter = new Haravan.SearchFilter()

if(colId > 0){
    filter.addValue("collection", "collections", '(collectionid%3Aproduct%3D'+colId+')', "AND");
}else{
    filter.addValue("collection", "collections", '(collectionid%3Aproduct>=0)', "AND");
}
function toggleFilter(e) {
    _toggleFilter(e);
    renderFilterdItems();
    doSearch(1);
}
function _toggleFilterdqdt(e) {

    var $element = $(e);
    var group = 'khoanggia';
    var field = 'price_min';
    var operator = 'OR';
    var value = $element.attr("data-value");

    filter.deleteValuedqdt(group, field, value, operator);
    filter.addValue(group, field, value, operator);
    renderFilterdItems();
    doSearch(1);
}

function _toggleFilter(e){
    var $element = $(e);
    var group = $element.attr("data-group");
    var field = $element.attr("data-field");
    var text = $element.attr("data-text");
    var value = $element.attr("value");
    var operator = $element.attr("data-operator");
    var filterItemId = $element.attr("id");



    if (!$element.is(':checked')) {
        filter.deleteValue(group, field, value, operator);
    }
    else{
        filter.addValue(group, field, value, operator);
    }

    $(".catalog_filters li[data-handle='" + filterItemId + "']").toggleClass("active");
}

function renderFilterdItems() {
    var $container = $(".filter-container__selected-filter-list ul");
    $container.html("");

    $(".filter-container input[type=checkbox]").each(function(index) {
        if ($(this).is(':checked')) {
            var id = $(this).attr("id");
            var name = $(this).closest("label").text();

            addFilteredItem(name, id);
        }
    });

    if($(".filter-container input[type=checkbox]:checked").length > 0)
        $(".filter-container__selected-filter").show();
    else
        $(".filter-container__selected-filter").hide();
}
function addFilteredItem(name, id) {
    var filteredItemTemplate = "<li class='filter-container__selected-filter-item' for='{3}'><a href='javascript:void(0)' onclick=\"{0}\"><i class='fa fa-close'></i> {1}</a></li>";
    filteredItemTemplate = filteredItemTemplate.replace("{0}", "removeFilteredItem('" + id + "')");
    filteredItemTemplate = filteredItemTemplate.replace("{1}", name);
    filteredItemTemplate = filteredItemTemplate.replace("{3}", id);
    var $container = $(".filter-container__selected-filter-list ul");
    $container.append(filteredItemTemplate);
}
function removeFilteredItem(id) {
    $(".filter-container #" + id).trigger("click");
}
function clearAllFiltered() {
    filter = new Haravan.SearchFilter();
    if(colId > 0){
        filter.addValue("collection", "collections", colId, "AND");

    }


    $(".filter-container__selected-filter-list ul").html("");
    $(".filter-container input[type=checkbox]").attr('checked', false);
    $(".filter-container__selected-filter").hide();

    doSearch(1);
}
function doSearch(page, options) {

    //Fixharavan filter
    if(!filter.fields.khoanggia&&!filter.fields.Hãng&&!filter.fields.Loại&&!filter.fields.tag1&&!filter.fields.Hãng&&!filter.fields.tag2){
        var url = new URL(window.location.href);
        var xsb = selectedSortby;
        var xpage = page;
        var psb = url.searchParams.get("sort_by");
        var ppage = url.searchParams.get("page");
        var checktt1 = 0;
        var usb;

        console.log(selectedViewData);
        if(!xsb&&!psb){
            checktt1=checktt1+1;
        }else{
            if(!xsb){
                usb=psb;
            }else{
                switch(selectedSortby) {
                    case "(price:product=asc)":
                        usb = "price-ascending";
                        break;
                    case "price_min:asc":
                        usb = "price-ascending";
                        break;
                    case "(price:product=des)":
                        usb = "price-descending";
                        break;
                    case "price_min:desc":
                        usb = "price-descending";
                        break;
                    case "(title:product=asc)":
                        usb = "title-ascending";
                        break;
                    case "name:asc":
                        usb = "title-ascending";
                        break;
                    case "(title:product=des)":
                        usb = "title-descending";
                        break;
                    case "name:desc":
                        usb = "title-descending";
                        break;
                    case "(created:product=des)":
                        usb = "created-ascending";
                        break;
                    case "created_on:desc":
                        usb = "created-ascending";
                        break;
                    case "(created:product=asc)":
                        usb = "created-descending";
                        break;
                    case "created_on:asc":
                        usb = "created-ascending";
                        break;
                    default:
                        usb = "default";
                        break;
                }
            }
        }
        var upage;
        if(!xpage&&!ppage){
            checktt1=checktt1+1;
        }else{
            if(!xpage){
                upage=ppage;
            }else{
                upage=xpage;
            }
        }

        if(checktt1<2){
            url = window.location.origin + window.location.pathname;

            if((usb!=null&&usb!="default")||(upage!=null&&upage!=1)){
                url = url + "?";
            }

            if(usb!=null&&usb!="default"){
                url = url + "sort_by="+usb;
            }

            if(upage!=null&&upage!=1){
                if(usb!=null&&usb!='default'){
                    url = url + "&page="+upage;
                }else{
                    url = url + "page="+upage;
                }
            }
            console.log(url);
            window.location.href = url;

            var checkfilter = 1;


        }

    }else{

    }

    if(!options) options = {};
    //NProgress.start();
    $('.aside.aside-mini-products-list.filter').removeClass('active');
    awe_showPopup('.loading');
    if(checkfilter!=1){
        filter.search({
            view: selectedViewData,
            page: page,
            sortby: selectedSortby,
            success: function (html) {
                var $html = $(html);
                // Muốn thay thẻ DIV nào khi filter thì viết như này
                var $categoryProducts = $($html[0]);


                $(".category-products").html($categoryProducts.html());
                pushCurrentFilterState({sortby: selectedSortby, page: page});
                awe_hidePopup('.loading');
                awe_lazyloadImage();

                $('.add_to_cart').click(function(e){
                    e.preventDefault();
                    var $this = $(this);
                    var form = $this.parents('form');
                    $.ajax({
                        type: 'POST',
                        url: '/cart/add.js',
                        async: false,
                        data: form.serialize(),
                        dataType: 'json',
                        error: addToCartFail,
                        beforeSend: function() {
                            if(window.theme_load == "icon"){
                                awe_showLoading('.btn-addToCart');
                            } else{
                                awe_showPopup('.loading');
                            }
                        },
                        success: addToCartSuccess,
                        cache: false
                    });
                });
                $('.collection .box-heading .title-head').text(colName);
                $('html, body').animate({
                    scrollTop: $('.filter-content').offset().top
                }, 0);
                if($(window).width() > 1200){
                    setTimeout(function(){
                        $('.products-view-list .product-box').each(function(e){
                            var hMax = Math.max($(this).find('.border-right').height(), $(this).find('.border-height').height(),$(this).find('.border-left').height());
                            $(this).find('.border-left').height(hMax);
                        })
                    },600)


                }else{
                    $('.products-view-list .product-box .border-left').css('height','auto');
                }
                resortby(selectedSortby);



            }
        });
    }
}

function sortby(sort) {
    switch(sort) {
        case "price-asc":
            selectedSortby = "price_min:asc";
            break;
        case "price-desc":
            selectedSortby = "price_min:desc";
            break;
        case "alpha-asc":
            selectedSortby = "name:asc";
            break;
        case "alpha-desc":
            selectedSortby = "name:desc";
            break;
        case "created-desc":
            selectedSortby = "created_on:desc";
            break;
        case "created-asc":
            selectedSortby = "created_on:asc";
            break;
        default:
            selectedSortby = "";
            break;
    }

    doSearch(1);
}

function resortby(sort) {
    switch(sort) {
        case "(price:product=asc)":
            tt = "price-asc";
            break;
        case "price-ascending":
            tt = "price-asc";
            break;
        case "(price:product=des)":
            tt = "price-desc";
            break;
        case "price-descending":
            tt = "price-desc";
            break;
        case "(title:product=asc)":
            tt = "alpha-asc";
            break;
        case "title-ascending":
            tt = "alpha-asc";
            break;
        case "(title:product=des)":
            tt = "alpha-desc";
            break;
        case "title-descending":
            tt = "alpha-desc";
            break;
        case "(created:product=des)":
            tt = "created-asc";
            break;
        case "(created:product=asc)":
            tt = "created-desc";
            break;
        default:
            tt = "default";
            break;
    }
    console.log(tt);
    $('#sort-by select').val(tt);
}


function _selectSortby(sort) {
    resortby(sort);
    switch(sort) {
        case "price-asc":
            selectedSortby = "price_min:asc";
            break;
        case "price-desc":
            selectedSortby = "price_min:desc";
            break;
        case "alpha-asc":
            selectedSortby = "name:asc";
            break;
        case "alpha-desc":
            selectedSortby = "name:desc";
            break;
        case "created-desc":
            selectedSortby = "created_on:desc";
            break;
        case "created-asc":
            selectedSortby = "created_on:asc";
            break;
        default:
            selectedSortby = sort;
            break;
    }
}

function toggleCheckbox(id) {
    $(id).click();
}

function pushCurrentFilterState(options) {

    if(!options) options = {};
    var url = filter.buildSearchUrl(options);
    var queryString = url.slice(url.indexOf('?'));
    if(selectedViewData == 'data_list'){
        queryString = queryString + '&view=list';
        $('.button-view-mode').removeClass('active');
        $('.button-view-mode.view-mode-list').addClass('active');
    }
    else{
        queryString = queryString + '&view=grid';
        $('.button-view-mode').removeClass('active');
        $('.button-view-mode.view-mode-grid').addClass('active');
    }

    pushState(queryString);
}

function pushState(url) {
    window.history.pushState({
        turbolinks: true,
        url: url
    }, null, url)
}
function switchView(view) {
    switch(view) {
        case "list":
            $('.button-view-mode').removeClass('active');
            $('.button-view-mode.view-mode-list').addClass('active');
            selectedViewData = "data_list";
            break;
        default:
            $('.button-view-mode').removeClass('active');
            $('.button-view-mode.view-mode-grid').addClass('active');
            selectedViewData = "data";
            break;
    }
    var url = window.location.href;
    var page = getParameter(url, "page");
    if(page != '' && page != null){
        doSearch(page);
    }else{
        doSearch(1);
    }
}


function selectFilterByCurrentQuery() {
    var isFilter = false;
    var url = window.location.href;
    var queryString = decodeURI(window.location.search);
    var filters = queryString.match(/\(.*?\)/g);
    var page = 0;
    if(queryString) {
        isFilter = true;
        $.urlParam = function(name){
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if(!results){
                return 1;
            }else{

                return results[1] || 0;
            }
        }
        page = $.urlParam('page');
    }
    if(filters && filters.length > 0) {
        filters.forEach(function(item) {
            item = item.replace(/\(\(/g, "(");
            var element = $(".aside-content input[value='" + item + "']");
            element.attr("checked", "checked");
            _toggleFilter(element);
        });

        isFilter = true;
    }

    var sortOrder = getParameter(url, "sortby");
    console.log(sortOrder);
    if(!sortOrder){
        sortOrder = getParameter(url, "sort_by");
    }
    console.log(sortOrder);
    if(sortOrder) {
        _selectSortby(sortOrder);

    }
    if(isFilter) {
        //fixharavanfilter
        if(!filter.fields.khoanggia&&!filter.fields.Hãng&&!filter.fields.tag1&&!filter.fields.tag2){
        }else{
            doSearch(page);
            renderFilterdItems();
        }
    }
}
function getParameter(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


$( document ).ready(function() {
    selectFilterByCurrentQuery();
    $('.filter-group .filter-group-title').click(function(e){
        $(this).parent().toggleClass('active');
    });

    $('.filter-mobile').click(function(e){
        $('.aside.aside-mini-products-list.filter').toggleClass('active');
    });

    $('#show-admin-bar').click(function(e){
        $('.aside.aside-mini-products-list.filter').toggleClass('active');
    });

    $('.filter-container__selected-filter-header-title').click(function(e){
        $('.aside.aside-mini-products-list.filter').toggleClass('active');
    });
});



var maxx = 10000000/10;
var slider = $('#slider');
if (slider ){

    slider.slider({
        min: '0',
        max: maxx,
        range: true,
        values: [0,10000000],
        slide: function(event, ui) {
            if(ui.values[0] >= ui.values[1]) {
                if(ui.handle == $("#slider a")[0]) {
                    $("#slider").slider("values", 1, ui.value);
                    ui.values[0] = ui.value;
                    ui.values[1] = ui.value;
                } else {
                    $("#slider").slider("values", 0, ui.value);
                    ui.values[0] = ui.value;
                    ui.values[1] = ui.value;
                }
            }

            var uimax =ui.values[1]+1;

            if(ui.values[0] > 0){
                var v1 = Haravan.formatMoney(ui.values[0], "{{amount_no_decimals_with_comma_separator}}₫");
            }else{
                var v1 = ui.values[0];
            }
            var v2 = Haravan.formatMoney((ui.values[1]+1), "{{amount_no_decimals_with_comma_separator}}₫");



            $('#start input').val(v1);
            $('#stop input').val(v2);
            var uimin =ui.values[0]-1;
            var uimax =ui.values[1]+2;
            $('#filter-value').attr('data-value','(>'+uimin+' AND <'+uimax+')');
        }
    });
    $(document).on('change','#start',function(e){
        var val = parseInt($('#start input').val())-1;
        var val2 = parseInt($('#stop input').val())+1;

        $("#slider").slider("values",0,parseInt(val));
        $('#filter-value').attr('data-value','(>'+val+' AND <'+val2+')');
    });
    $(document).on('change','#stop',function(e){
        var val = parseInt($('#start input').val())-1;
        var val2 = parseInt($('#stop input').val())+1;

        $("#slider").slider("values",1,parseInt(val2));
        $('#filter-value').attr('data-value','(>'+val+' AND <'+val2+')');
    });
}


$('.filter-item--check-box input').change(function(e){
    var $this = $(this);
    toggleFilter($this);
})
$('a#filter-value').click(function(e){
    var $this = $(this);
    _toggleFilterdqdt($this);
})
$('.dosearch').click(function(e){
    var $data = $(this).attr('data-onclick');
    doSearch($data);
})
$('.awe_sortby').on('click',function(e){
    var $data = $(this).attr('data-onclick');
    sortby($data);

})
function filterItemInList(object) {
    q = object.val().toLowerCase();
    object.parent().next().find('li').show();
    if (q.length > 0) {
        object.parent().next().find('li').each(function() {
            if ($(this).find('label').attr("for").indexOf(q) == -1)
                $(this).hide();
        })
    }
}
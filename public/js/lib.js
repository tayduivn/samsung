$(function() {
    $('input[name=customerName]').focus();
    $('input[name=username]').focus();
    // lưu cookie theo chi nhánh
    try {
        if ($('#loadStoreBranchs').length) {
            $('#loadStoreBranchs').modal({
                show: true,
                backdrop: 'static'
            });
            $('#storeBranch>button').click(function() {
                $.cookie('STORE_BRANCH', $(this).data('id'), { path: '/', expires: 10 });
                $('#loadStoreBranchs').modal('hide');
                location.reload();
            });
        }
        $('.brandSelect').change(function() {
            $.cookie('STORE_BRANCH', $(this).val(), { path: '/', expires: 10 });
            location.reload();
        });
    } catch (e) {
        // TODO: handle exception
    }
    $(".showHideArticleSectionMenu").on("click", function() {
        if ($(this).text() == "show" || $(this).text() == "Show") {
            $(".boxContentGuide").css('display', 'block');
            $(this).text('hide');
        } else {
            $(".boxContentGuide").css('display', 'none');
            $(this).text('show');
        }
    });
    // change Skin
    $('#settingSkins>div>.fa-cog').click(function() {
        $('#settingSkins').toggleClass('showSkin');
    });
    if ($('.tooltipSkin').length) {
        $('.tooltipSkin').tooltip();
    }

    $('#settingSkins>div>ul>li').click(function() {
        $.removeCookie("skin");
        $.cookie('skin', $(this).attr('data-color'), { path: '/' });
        location.reload();
    });
    $('#skinDefault').click(function() {
        $.removeCookie("skin");
        location.reload();
    });
});

function mapGeneratorWithCurrentData(data, idMap) {
    let zoom = 17;
    if (data !== '') {
        query = data;
    }

    idMap.attr("src", generateMapUrl(query, zoom));
}

function generateMapUrl(query, zoom) {
    let googleMapsHostUrl = "https://maps.google.com/maps",
        paramString = "",
        urlParams = {
            hl: "vi",
            q: query,
            t: 'satellite',
            z: zoom,
            ie: "UTF8",
            iwloc: "B",
            output: "embed"
        };
    for (let key in urlParams) {
        paramString += key + "=" + urlParams[key] + "&";
    }
    return googleMapsHostUrl + "?" + encodeURI(paramString.replace(/.$/, ""));
}

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

/**
 * @param products array
 * @param mode int (1=>add|2=>update)
 * @param callback (return data)
 */
function addToCart(products, mode, callback) {
    $.post(
        '/cart/add', {
            'products': products,
            'mode': mode
        },
        function(rs) {
            callback(rs);
        }
    );
}

function addToBook(products, mode, callback) {
    $.post(
        '/cart/addbook', {
            'products': products,
            'mode': mode
        },
        function(rs) {
            callback(rs);
        }
    )
}

function addToBaseCart(options) {
    $.post('/carts/add', { 'products': options.products, 'mode': options.mode },
        function(rs) {
            options.onSuccess(rs);
        }, 'json'
    );
}

function flyfly(options) {
    var position = options.position,
        itemDrag = options.iDrag,
        effect = options.effect;
    if (!effect) {
        effect = 'easeOutExpo';
    }
    if (itemDrag && position) {
        var itemClone = itemDrag.clone()
            .offset({
                top: itemDrag.offset().top,
                left: itemDrag.offset().left
            })
            .css({
                'opacity': '0.5',
                'position': 'absolute',
                'height': itemDrag.width(),
                'width': itemDrag.height(),
                'z-index': '999'
            })
            .appendTo($('body'))
            .animate({
                'top': position.offset().top + 5,
                'left': position.offset().left + 5,
                'width': position.width() - 10,
                'height': position.height() - 10
            }, 1000, effect);
        itemClone.animate({
            'width': 0,
            'height': 0
        }, function() {
            $(this).detach();
        });
    }
}

/**
 * remove cart items ($_$)
 * @param id int|array
 * @param callback (return data)
 * @param redirect bool
 */
function removeCart(id, redirect, callback) {
    if (!id) { /* remove all*/
        $.post('/cart/remove',
            function(rs) {
                if (redirect) {
                    window.location.reload();
                }
                callback(rs);
            }, 'json'
        );
    } else {
        $.post('/cart/remove', { 'psId': id },
            function(rs) {
                if (redirect) {
                    window.location.reload();
                }
                callback(rs);
            }, 'json'
        );
    }
}

function removeBook(id, redirect, callback) {
    if (!id) { /* remove all*/
        $.post('/cart/removebook',
            function(rs) {
                if (redirect) {
                    window.location.reload();
                }
                callback(rs);
            }, 'json'
        );
    } else {
        $.post('/cart/removebook', { 'psId': id },
            function(rs) {
                if (redirect) {
                    window.location.reload();
                }
                callback(rs);
            }, 'json'
        );
    }
}

/**
 * @param options object
 */
function removeBaseCart(options) {
    if (!options.id) { /* remove all*/
        $.post('/carts/remove',
            function(rs) {
                if (options.redirect) {
                    document.location.href = document.URL;
                }
                options.onSuccess(rs);
            }, 'json'
        );
    } else {
        $.post('/carts/remove', { 'psId': options.id },
            function(rs) {
                if (options.redirect) {
                    document.location.href = document.URL;
                }
                options.onSuccess(rs);
            }, 'json'
        );
    }
}

/**
 * @param options
 */
function calculateShipFee(options) {
    var param = { 'toCity': options.toCity, 'toDistrict': options.toDistrict, 'products': options.products, 'totalMoney': options.totalMoney };
    var isChecked = $('input[name="paymentMethod"]:checked');
    if (isChecked.length && isChecked.val() != 1) {
        var param = { 'toCity': options.toCity, 'toDistrict': options.toDistrict, 'totalCod': true };
    }
    $.post(
        '/order/caculateshipfee',
        param,
        function(rs) {
            options.onSuccess(rs);
        },
        'json'
    );
}

/**
 * @param param string
 * @param value string
 * @param mode int (1|2) //2==replace
 */
function addFilter(param, value, mode) {
    var path = window.location.pathname,
        pr = window.location.search,
        params = {};
    parse_str(pr.replace('?', ''), params);

    if (isset(params[param]) && params[param] && mode == 1) {
        // mode 1: append new value
        var values = explode(',', params[param]);
        if (!in_array(value, values)) {
            values.push(value);
            params[param] = implode(',', values);
        }
    } else if (value.length) {
        params[param] = value;
    }
    $.each(params, function(pKey, pVal) {
        params[pKey] = pKey + '=' + pVal;
    });
    if (mode == 3) {
        return path + '?' + implode('&', params);
    }
    window.history.pushState(null, null, path + '?' + implode('&', params));
}

/**
 * @param param string
 * @param value string
 */
function removeFilter(param, value) {
    var path = window.location.pathname,
        pr = window.location.search,
        params = {};
    parse_str(pr.replace('?', ''), params);

    if (isset(params[param]) && params[param]) {
        var values = explode(',', params[param]);
        if (isset(value)) {
            if (in_array(value, values)) {
                params[param] = implode(',', array_diff(values, [value]));
            }
        } else {
            delete params[param];
        }
    } else if (value.length) {
        params[param] = value;
    }

    $.each(params, function(pKey, pVal) {
        if (pVal) {
            params[pKey] = pKey + '=' + pVal;
        } else {
            delete params[pKey];
        }
    });

    window.history.pushState(null, null, path + '?' + implode('&', params));
}

function checkInventory(ps, callback) {
    var uri = window.location.href.search("\\?");
    var params = '';
    if (uri >= 0) {
        params = window.location.href.slice(uri);
    }

    $.post('/product/checkinventory' + params, { 'ps': ps },
        function(rs) {
            callback(rs);
        }, 'json'
    );
}

function getallchildimg(ps, callback) {
    $.post('/product/getallchildimg', { 'ps': ps },
        function(rs) {
            callback(rs);
        }, 'json'
    );
}

function buyProductNumber(options) {
    $.post('/product/totalcustomerbuyproduct', { 'productIds': options.productIds },
        function(rs) {
            options.onSuccess(rs);
        }, 'json'
    );
}

function getBrandTags(ps, callback) {
    $.post('/product/getbrandtag', { 'ps': ps },
        function(rs) {
            callback(rs);
        }, 'json'
    );
}

function loadView(viewName, data, delay, callback) {
    if (!data) {
        data = '';
    }
    delay = parseInt(delay);
    if (delay > 0) {
        setTimeout(function() {
            $.post(
                '/loadview?v=' + viewName, { 'variable': data },
                function(rs) {
                    callback(rs);
                }
            );
        }, delay);
    } else {
        $.post(
            '/loadview?v=' + viewName, { 'variable': data },
            function(rs) {
                callback(rs);
            }
        );
    }
}

function ajaxLoadView(options) {
    if (!options.data) {
        options.data = '';
    }
    if (!options.async) {
        options.async = true;
    }
    if (!options.delay) {
        options.delay = 0;
    } else {
        options.delay = parseInt(options.delay);
    }
    if (!options.params) {
        options.params = '';
    } else {
        if (options.params.charAt(0) != '&') {
            options.params = '&' + options.params;
        }
    }

    setTimeout(function() {
        $.post(
            '/loadview?v=' + options.view + options.params, {
                variable: options.data
            },
            function(response) {
                options.onSuccess(response);
            }
        );
    }, options.delay);
}

var visits = {
    trackingAction: function(element) {
        element.click(function(e) {
            e.stopPropagation();
            var t = $(this),
                page = '',
                item = '',
                section = '',
                element = '',
                type = '';
            if (t.attr('data-t-page')) {
                page = t.attr('data-t-page');
            }
            if (t.attr('data-t-i')) {
                item = t.attr('data-t-i');
            }
            if (t.attr('data-t-sec')) {
                section = t.attr('data-t-sec');
            }
            if (t.attr('data-t-uie')) {
                element = t.attr('data-t-uie');
            }
            if (t.attr('data-t-type')) {
                type = t.attr('data-t-type');
            }
            if (type == 'ac') {

            } else {
                setCookie('tracking', '{"page":"' + page + '","item":"' + item + '","section":"' + section + '","element":"' + element + '"}', 0);
            }
            //$.post(
            //    '/home/visit',
            //    {
            //        dataTracking: {
            //            page: page,
            //            item: item,
            //            section: section,
            //            element: element
            //        },
            //        type: type
            //    },
            //    'json'
            //);
        });
    }
};
/*
 * param:
 * inputCoupon: id ô input coupon
 * buttonCoupon: id button coupon
 * showCoupon: id show tiền coupon sau khi tính toán
 * shipFee: id show phí vận chuyển
 * totalMoney: id show tổng tiền
 * currency: dạng hiện thị tiền tệ (đ, vnd, Đ,...)
 * thousands:  format định dạng tiền từ dấu phẩy -> dấu chấm
 * isTextCoupon:  truyền text mong muốn
 * thousands : loại bỏ các ký tự ",","." ở giá tiền
 */
var CheckCouponCode = {
    load: function(toCity, toDistrict, inputCoupon, buttonCoupon, showCoupon, shipFee, totalMoney, currency, isTextCoupon, thousands) {
        $(buttonCoupon).click(function() {
            if (!currency || currency === '') {
                currency = " đ";
            }

            var textCoupon = "";
            if (isTextCoupon != false) {
                textCoupon = "<span class='cpText'>Mã giảm giá: </span>";
            }

            var totalMoneyVal = parseInt($(totalMoney).attr('value'));
            if ($(inputCoupon).val()) {
                $.post(
                    '/promotion/checkcoupon', {
                        couponCode: $(inputCoupon).val()
                    },
                    function(rs) {
                        var shipFeeVal = parseInt($(shipFee).attr('value'));
                        if (!shipFeeVal) {
                            shipFeeVal = 0;
                        }
                        if (rs.code == 1) {
                            var value = rs.value;
                            if (rs.useCouponPromotion == 1) {
                                totalMoneyVal = rs.totalMoney;
                                $.each(rs.productPrice, function(index, value) {
                                    $('span[name="' + index + '"]').html($.number(value) + '₫');
                                });
                            }
                            $(inputCoupon).attr('data-value', rs.value);
                            if ($(showCoupon).attr('data-value')) {
                                value = parseInt(value) + parseInt($(showCoupon).attr('data-value'));
                            }
                            $(showCoupon).html(textCoupon + ' - ' + (thousands ? $.number(value).replace(",", ".") : $.number(value)) + currency);
                            $(totalMoney).html((thousands ? $.number(totalMoneyVal + shipFeeVal - value).replace(",", ".") : $.number(totalMoneyVal + shipFeeVal - value)) + currency).attr('current-value', totalMoneyVal + shipFeeVal - value).attr('value', totalMoneyVal);
                            $('span[name="totalCart"]').html($.number(totalMoneyVal - value) + '₫');
                            totalMoneyVal = totalMoneyVal - value;

                        } else {
                            $(inputCoupon).attr('data-value', 0);
                            $(showCoupon).html('<span style="color: red;font-weight: bold;font-style: italic">' + msgCheckCouponError + '</span>');
                            $(totalMoney).html((thousands ? $.number(totalMoneyVal + shipFeeVal).replace(",", ".") : $.number(totalMoneyVal + shipFeeVal)) + currency);
                        }
                        CustomerShipFee.updateCustomershipFee(toCity, toDistrict, shipFee, totalMoney, inputCoupon, currency, 1, totalMoneyVal, thousands);
                    },
                    'json'
                );
            } else {
                $(showCoupon).html('<span style="color: red;font-weight: bold;font-style: italic">' + msgCheckCouponValid + '</span>');
                $(inputCoupon).attr('data-value', 0);
                CustomerShipFee.updateCustomershipFee(toCity, toDistrict, shipFee, totalMoney, inputCoupon, currency, 1, totalMoneyVal, thousands);
            }
        });
    }
};

/**
 *  Hàm tính phí vận chuyển mới
 * param:
 * toCity: Thành phố đến
 * toDistrict: Quận huyện đến
 * shipFee: id hiển thị phí vận chuyển
 * totalMoney: id hiển thị tổng tiền khi change phí vận chuyển
 * couponCode: id coupon input
 * currency: dạng hiện thị tiền tệ (đ, vnd, Đ,...)
 * thousands:  format định dạng tiền từ dấu phẩy -> dấu chấm
 */
var CustomerShipFee = {
    load: function(toCity, toDistrict, shipFee, totalMoney, couponCode, currency, thousands) {
        if (!currency || currency === '') {
            currency = " đ";
        }
        if ($(toCity).val() && $(toDistrict).val()) {
            CustomerShipFee.updateCustomershipFee(toCity, toDistrict, shipFee, totalMoney, couponCode, currency, 1, '', thousands);
        }
        $(toDistrict).change(function() {
            $(shipFee).removeAttr('data-curentvalue').removeAttr('codfee');
            CustomerShipFee.updateCustomershipFee(toCity, toDistrict, shipFee, totalMoney, couponCode, currency, 1, '', thousands);
        });
        $('select[name="customerWardId"]').change(function() {
            $('input[name="selectIdWard"]').val($(this).val());
            CustomerShipFee.updateCustomershipFee(toCity, toDistrict, shipFee, totalMoney, couponCode, currency, 1, '', thousands);
        });

        $('input[name="paymentMethod"]').change(function() {
            CustomerShipFee.updateCustomershipFee(toCity, toDistrict, shipFee, totalMoney, couponCode, currency, '', '', thousands);
        });
        $('#tableShipFee').on('click', '.cusShipFeeChange', function() {
            $(shipFee).html($.number($(this).attr('data-customershipfee')) + currency).attr('value', $(this).attr('data-customershipfee')).attr('codFee', $(this).attr('data-codFee')).attr('data-curentValue', $(this).attr('data-customershipfee'));
            $('#showCarrier').html('<img src="/images/shipper.png" style="margin-right: 2px;"/>' + $(this).attr('data-carriername') + ' (' + $(this).attr('data-serviceName') + ')<i class="changeOrtherShipFee" style="display: block;cursor: pointer">(Chọn hãng vận chuyển khác)</i>');
            CustomerShipFee.updateCustomershipFee(toCity, toDistrict, shipFee, totalMoney, couponCode, currency, '', '', thousands);
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        });
        $('#formCheckOut').on('click', '.changeOrtherShipFee', function() {
            $('#tableShipFee').show();
            $('html, body').animate({ scrollTop: parseInt($('#tableShipFee').offset().top) }, 'slow');
        });

    },
    updateCustomershipFee: function(toCity, toDistrict, shipFee, totalMoney, couponCode, currency, tableShipFee, moneyCurrent, thousands) {
        if (!$(toCity).val() || !$(toDistrict).val()) {
            return;
        }
        if (!tableShipFee || tableShipFee === '') {
            tableShipFee = null;
        }
        if ((!moneyCurrent || moneyCurrent === '') && $(couponCode).attr('data-value')) {
            if ($(couponCode).attr('data-value')) {
                moneyCurrent = parseInt($(totalMoney).attr('value')) - parseInt($(couponCode).attr('data-value'));
            }
        }
        var paymentMethod = $('input[name="paymentMethod"]:checked').val();
        var wardId = $('input[name="selectIdWard"]').val();
        $.post(
            '/order/caculateshipfee', {
                toCity: $(toCity).val(),
                toDistrict: $(toDistrict).val(),
                toWardId: wardId,
                showAllShipFee: 1,
                totalMoney: moneyCurrent,
            },
            function(rs) {
                if (rs) {
                    var defaultShipFee = Object.values(rs)[0];
                    if (defaultShipFee.hasSupport) {
                        $(shipFee).html(defaultShipFee.hasSupport);
                        $('#tableShipFee').hide();
                        $('#showCarrier').hide();
                        $('#tableShipFee>div').remove();
                        return;
                    }
                    // thay đổi hãng cập nhật phí ship
                    var cShipFee = parseInt(defaultShipFee.customerShipFee);
                    var cCodFee = parseInt(defaultShipFee.codFee);
                    var totalFee = parseInt(defaultShipFee.totalFee);
                    if ($(shipFee).attr('data-curentValue')) {
                        cShipFee = parseInt($(shipFee).attr('data-curentValue'));
                    }
                    if ($(shipFee).attr('codFee')) {
                        cCodFee = parseInt($(shipFee).attr('codFee'));
                    }

                    // thanh toán tại cửa hàng => customerShipFee = 0
                    if (paymentMethod == 2) {
                        cShipFee = 0;
                        cCodFee = 0;
                    }

                    var cTotalMoney = parseInt($(totalMoney).attr('value')) + cShipFee;
                    if (paymentMethod != 1 && (totalFee == cShipFee)) {
                        cShipFee = parseInt(defaultShipFee.shipFee);
                        cTotalMoney = parseInt($(totalMoney).attr('value')) + cShipFee;
                    }
                    if ($(couponCode).attr('data-value')) {
                        cTotalMoney = cTotalMoney - parseInt($(couponCode).attr('data-value'));
                    }

                    $(shipFee).html((thousands ? $.number(cShipFee).replace(",", ".") : $.number(cShipFee)) + currency).attr('value', cShipFee).attr('codFee', cCodFee);
                    $(totalMoney).html((thousands ? $.number(cTotalMoney).replace(",", ".") : $.number(cTotalMoney)) + currency).attr('current-value', cTotalMoney);
                    if (rs.showAllShipFee != 0) {
                        if (tableShipFee && $('#tableShipFee').length) {
                            // show hãng có phí rẻ nhất
                            $('#showCarrier').html('<img src="/images/shipper.png" style="margin-right: 2px;"/>' + defaultShipFee.carrierName + '(' + defaultShipFee.serviceName + ')<i class="changeOrtherShipFee" style="display: block;cursor: pointer; font-weight:normal">(Chọn hãng vận chuyển khác)</i>').css({ 'font-size': '12px', 'font-weight': 'bold' });

                            // show bảng giá các hãng
                            var tableFee = '<div><p style="margin: 10px 0;">Chọn hãng vận chuyển</p><table class="table table-bordered" style="margin-bottom: 5px;"><thead>';
                            tableFee += '<tr><th></th><th>Hãng vận chuyển</th><th>Thời gian</th><th>Phí vận chuyển</th><th>Phí thu hộ</th>';
                            tableFee += '<th>Tổng phí</th></tr></thead><tbody>';
                            var i = 0;
                            $.each(rs, function(key, value) {
                                var textTotalFeeNoPromotion = '';
                                if (value.shipFeePromotion || value.codFeePromotion) {
                                    if ((value.shipFee + value.codFee) > value.totalFee) {
                                        textTotalFeeNoPromotion = '<br><span style="text-decoration: line-through;">' + (thousands ? $.number(value.shipFee + value.codFee).replace(",", ".") : $.number(value.shipFee + value.codFee)) + '</span>';
                                    }
                                }
                                var checked = '';
                                if (i == 0) {
                                    checked = 'checked';
                                }
                                tableFee += '<tr class="rowTableFee"><td title="' + value.carrierName + '" class="colAct text-center" style="vertical-align: middle;text-align: left;"><input type="radio" ' + checked + ' id="content' + value.contentId + '" data-carrierid="' + value.carrierId + '" class="cusShipFeeChange" name="cusShipFee" value="' + value.contentId + '" data-customerShipFee = "' + value.customerShipFee + '" data-carrierName="' + value.carrierName + '" data-serviceName="' + value.serviceName + '" data-codFee="' + value.codFee + '" /></td>';
                                tableFee += '<td style="padding: 5px;vertical-align: middle"><img title="' + value.carrierName + '" alt="' + value.carrierName + '" style="max-width: 150px;" src="' + value.logo + '" /></td>';
                                tableFee += '<td style="vertical-align: middle"><div class="description">' + value.serviceDescription + '</div></td>';
                                tableFee += '<td style="vertical-align: middle" class="text-right">' + (value.shipFee != value.shipFee - value.shipFeePromotion ? '<span>' + $.number(value.shipFee - value.shipFeePromotion) + '</span><br>' : '') + '<span ' + (value.shipFee != value.shipFee - value.shipFeePromotion ? 'style="text-decoration:line-through;"' : '') + ' class="shipFee" data-shipFeePromotion="' + (value.shipFeePromotion) + '" data-sender="' + value.sender + '" data-mainShipFee="' + value.mainShipFee + '" data-routetypeid="' + (value.routeTypeId ? value.routeTypeId : '') + '" data-receiver="' + value.receiver + '" data-shipFee="' + value.shipFee + '">' + $.number(value.shipFee) + '</span></td>';
                                tableFee += '<td style="vertical-align: middle" class="text-right">' + (value.codFee != value.codFee - value.codFeePromotion ? '<span>' + $.number(value.codFee - value.codFeePromotion) + '</span><br>' : '') + '<span class="codFee" ' + (value.codFee != value.codFee - value.codFeePromotion ? 'style="text-decoration:line-through;"' : '') + ' data-codFee="' + value.codFee + '" data-codFeePromotion="' + value.codFeePromotion + '">' + (value.codFee ? $.number(value.codFee) : '') + '</span></td>';
                                tableFee += '<td style="vertical-align: middle" class="text-right"><span class="totalFee">' + $.number(parseInt(value.totalFee)) + '</span>' + textTotalFeeNoPromotion + '</td>';
                                i++;
                            });
                            tableFee += '</tbody></table></div>';
                            $('#tableShipFee').html(tableFee);
                            $('#showCarrier').show();
                        }
                    } else {
                        $('#tableShipFee').hide();
                        $('#showCarrier').hide();
                        $('#tableShipFee>div').remove();
                    }
                }
            },
            'json'
        );
    }

};

/**
 * get address ($_$)
 * @param cId (select city ID)
 * @param dId (select district ID)
 * @param sel (selected district option) :D
 */
var Address = {
    load: function(cId, dId, wId) {
        var c = cId ? cId : '#cityId';
        var d = dId ? dId : '#districtId';
        var w = wId ? wId : '#wardId';
        $(c).change(function() {
            if ($(this).val() && $(d).length) {
                Address.getDistricts($(this).val(), d);
            }
        });
        $(d).change(function() {
            if ($(this).val() && $(w).length) {
                Address.getWards($(this).val(), w);
            }
        })
    },
    getCities: function(cId) {
        var c = cId ? cId : '#cityId';
        Address.updateDistrict(cId, cacheCities[cId], 0);
    },
    getDistricts: function(cid, dId, sel) {
        Address.updateDistrict(dId, cacheDistricts[cid], sel);
    },
    getWards: function(cid, wId, sel) {
        Address.updateWards(wId, cacheWards[cid], sel);
    },
    updateDistrict: function(id, d, sel) {
        if ($(id).length) {
            var options = "";
            for (var i in d) {
                if (sel == i) {
                    options += "<option selected value='" + i + "'>" + d[i] + "</option>";
                } else {
                    options += "<option value='" + i + "'>" + d[i] + "</option>";
                }
            }
            if (!$(id).find('option:first').val()) {
                options = "<option value=''>" + $(id).find('option:first').text() + "</option>" + options;
            }
            $(id).html(options);
        }
    },
    updateWards: function(id, d, sel) {
        if ($(id).length) {
            var options = "";
            for (var i in d) {
                if (sel == i) {
                    options += "<option selected value='" + i + "'>" + d[i] + "</option>";
                } else {
                    options += "<option value='" + i + "'>" + d[i] + "</option>";
                }
            }
            if (!$(id).find('option:first').val()) {
                options = "<option value=''>" + $(id).find('option:first').text() + "</option>" + options;
            }
            $(id).html(options);
        }
    }
};

function setCookie(name, value, time, path) {
    var expires;
    if (time && time > 0) {
        var date = new Date();
        date.setTime(date.getTime() + (parseInt(time) * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    if (!path) {
        path = '/';
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=" + path;
}

function getCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function parse_str(str, array) {
    // http://kevin.vanzonneveld.net
    // +   original by: Cagri Ekin
    // +   improved by: Michael White (http://getsprink.com)
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +   reimplemented by: stag019
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: stag019
    // +   input by: Dreamer
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)
    // +   input by: Zaide (http://zaidesthings.com/)
    // +   input by: David Pesta (http://davidpesta.com/)
    // +   input by: jeicquest
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: When no argument is specified, will put variables in global scope.
    // %        note 1: When a particular argument has been passed, and the returned value is different parse_str of PHP. For example, a=b=c&d====c
    // *     example 1: var arr = {};
    // *     example 1: parse_str('first=foo&second=bar', arr);
    // *     results 1: arr == { first: 'foo', second: 'bar' }
    // *     example 2: var arr = {};
    // *     example 2: parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.', arr);
    // *     results 2: arr == { str_a: "Jack and Jill didn't see the well." }
    // *     example 3: var abc = {3:'a'};
    // *     example 3: parse_str('abc[a][b]["c"]=def&abc[q]=t+5');
    // *     results 3: JSON.stringify(abc) === '{"3":"a","a":{"b":{"c":"def"}},"q":"t 5"}';

    var strArr = String(str).replace(/^&/, '').replace(/&$/, '').split('&'),
        sal = strArr.length,
        i, j, ct, p, lastObj, obj, lastIter, undef, chr, tmp, key, value,
        postLeftBracketPos, keys, keysLen,
        fixStr = function(str) {
            return decodeURIComponent(str.replace(/\+/g, '%20'));
        };

    if (!array) {
        array = this.window;
    }

    for (i = 0; i < sal; i++) {
        tmp = strArr[i].split('=');
        key = fixStr(tmp[0]);
        value = (tmp.length < 2) ? '' : fixStr(tmp[1]);

        while (key.charAt(0) === ' ') {
            key = key.slice(1);
        }
        if (key.indexOf('\x00') > -1) {
            key = key.slice(0, key.indexOf('\x00'));
        }
        if (key && key.charAt(0) !== '[') {
            keys = [];
            postLeftBracketPos = 0;
            for (j = 0; j < key.length; j++) {
                if (key.charAt(j) === '[' && !postLeftBracketPos) {
                    postLeftBracketPos = j + 1;
                } else if (key.charAt(j) === ']') {
                    if (postLeftBracketPos) {
                        if (!keys.length) {
                            keys.push(key.slice(0, postLeftBracketPos - 1));
                        }
                        keys.push(key.substr(postLeftBracketPos, j - postLeftBracketPos));
                        postLeftBracketPos = 0;
                        if (key.charAt(j + 1) !== '[') {
                            break;
                        }
                    }
                }
            }
            if (!keys.length) {
                keys = [key];
            }
            for (j = 0; j < keys[0].length; j++) {
                chr = keys[0].charAt(j);
                if (chr === ' ' || chr === '.' || chr === '[') {
                    keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
                }
                if (chr === '[') {
                    break;
                }
            }

            obj = array;
            for (j = 0, keysLen = keys.length; j < keysLen; j++) {
                key = keys[j].replace(/^['"]/, '').replace(/['"]$/, '');
                lastIter = j !== keys.length - 1;
                lastObj = obj;
                if ((key !== '' && key !== ' ') || j === 0) {
                    if (obj[key] === undef) {
                        obj[key] = {};
                    }
                    obj = obj[key];
                } else { // To insert new dimension
                    ct = -1;
                    for (p in obj) {
                        if (obj.hasOwnProperty(p)) {
                            if (+p > ct && p.match(/^\d+$/g)) {
                                ct = +p;
                            }
                        }
                    }
                    key = ct + 1;
                }
            }
            lastObj[key] = value;
        }
    }
}

function isset() {
    var a = arguments,
        l = a.length,
        i = 0,
        undef;

    if (l === 0) {
        throw new Error('Empty isset');
    }

    while (i !== l) {
        if (a[i] === undef || a[i] === null) {
            return false;
        }
        i++;
    }
    return true;
}

function explode(delimiter, string, limit) {

    if (arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined') return null;
    if (delimiter === '' || delimiter === false || delimiter === null) return false;
    if (typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string === 'object') {
        return { 0: '' };
    }
    if (delimiter === true) delimiter = '1';

    // Here we go...
    delimiter += '';
    string += '';

    var s = string.split(delimiter);

    if (typeof limit === 'undefined') return s;

    // Support for limit
    if (limit === 0) limit = 1;

    // Positive limit
    if (limit > 0) {
        if (limit >= s.length) return s;
        return s.slice(0, limit - 1).concat([s.slice(limit - 1).join(delimiter)]);
    }

    // Negative limit
    if (-limit >= s.length) return [];

    s.splice(s.length + limit);
    return s;
}

function implode(glue, pieces) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Waldo Malqui Silva
    // +   improved by: Itsacon (http://www.itsacon.net/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
    // *     returns 2: 'Kevin van Zonneveld'
    var i = '',
        retVal = '',
        tGlue = '';
    if (arguments.length === 1) {
        pieces = glue;
        glue = '';
    }
    if (typeof pieces === 'object') {
        if (Object.prototype.toString.call(pieces) === '[object Array]') {
            return pieces.join(glue);
        }
        for (i in pieces) {
            retVal += tGlue + pieces[i];
            tGlue = glue;
        }
        return retVal;
    }
    return pieces;
}

function in_array(needle, haystack, argStrict) {
    var key = '',
        strict = !!argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }

    return false;
}

function array_diff(arr1) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Sanjoy Roy
    // +    revised by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld']);
    // *     returns 1: {0:'Kevin'}
    var retArr = {},
        argl = arguments.length,
        k1 = '',
        i = 1,
        k = '',
        arr = {};

    arr1keys: for (k1 in arr1) {
        for (i = 1; i < argl; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (arr[k] === arr1[k1]) {
                    // If it reaches here, it was found in at least one array, so try next value
                    continue arr1keys;
                }
            }
            retArr[k1] = arr1[k1];
        }
    }

    return retArr;
}

function json_encode(mixed_val) {
    //       discuss at: http://phpjs.org/functions/json_encode/
    //      original by: Public Domain (http://www.json.org/json2.js)
    // reimplemented by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      improved by: Michael White
    //         input by: felix
    //      bugfixed by: Brett Zamir (http://brett-zamir.me)
    //        example 1: json_encode('Kevin');
    //        returns 1: '"Kevin"'

    /*
     http://www.JSON.org/json2.js
     2008-11-19
     Public Domain.
     NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
     See http://www.JSON.org/js.html
     */
    var retVal, json = this.window.JSON;
    try {
        if (typeof json === 'object' && typeof json.stringify === 'function') {
            retVal = json.stringify(mixed_val); // Errors will not be caught here if our own equivalent to resource
            //  (an instance of PHPJS_Resource) is used
            if (retVal === undefined) {
                throw new SyntaxError('json_encode');
            }
            return retVal;
        }

        var value = mixed_val;

        var quote = function(string) {
            var escapable =
                /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            var meta = { // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            };

            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
                var c = meta[a];
                return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0)
                        .toString(16))
                    .slice(-4);
            }) + '"' : '"' + string + '"';
        };

        var str = function(key, holder) {
            var gap = '';
            var indent = '    ';
            var i = 0; // The loop counter.
            var k = ''; // The member key.
            var v = ''; // The member value.
            var length = 0;
            var mind = gap;
            var partial = [];
            var value = holder[key];

            // If the value has a toJSON method, call it to obtain a replacement value.
            if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }

            // What happens next depends on the value's type.
            switch (typeof value) {
                case 'string':
                    return quote(value);

                case 'number':
                    // JSON numbers must be finite. Encode non-finite numbers as null.
                    return isFinite(value) ? String(value) : 'null';

                case 'boolean':
                case 'null':
                    // If the value is a boolean or null, convert it to a string. Note:
                    // typeof null does not produce 'null'. The case is included here in
                    // the remote chance that this gets fixed someday.
                    return String(value);

                case 'object':
                    // If the type is 'object', we might be dealing with an object or an array or
                    // null.
                    // Due to a specification blunder in ECMAScript, typeof null is 'object',
                    // so watch out for that case.
                    if (!value) {
                        return 'null';
                    }
                    if ((this.PHPJS_Resource && value instanceof this.PHPJS_Resource) || (window.PHPJS_Resource &&
                            value instanceof window.PHPJS_Resource)) {
                        throw new SyntaxError('json_encode');
                    }

                    // Make an array to hold the partial results of stringifying this object value.
                    gap += indent;
                    partial = [];

                    // Is the value an array?
                    if (Object.prototype.toString.apply(value) === '[object Array]') {
                        // The value is an array. Stringify every element. Use null as a placeholder
                        // for non-JSON values.
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }

                        // Join all of the elements together, separated with commas, and wrap them in
                        // brackets.
                        v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind +
                            ']' : '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }

                    // Iterate through all of the keys in the object.
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }

                    // Join all of the member texts together, separated with commas,
                    // and wrap them in braces.
                    v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                        '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
                case 'undefined':
                    // Fall-through
                case 'function':
                    // Fall-through
                default:
                    throw new SyntaxError('json_encode');
            }
        };

        // Make a fake root object containing our value under the key of ''.
        // Return the result of stringifying the value.
        return str('', {
            '': value
        });

    } catch (err) { // Todo: ensure error handling above throws a SyntaxError in all cases where it could
        // (i.e., when the JSON global is not available and there is an error)
        if (!(err instanceof SyntaxError)) {
            throw new Error('Unexpected error type in json_encode()');
        }
        this.php_js = this.php_js || {};
        this.php_js.last_error_json = 4; // usable by json_last_error()
        return null;
    }
}

function json_decode(str_json) {
    //       discuss at: http://phpjs.org/functions/json_decode/
    //      original by: Public Domain (http://www.json.org/json2.js)
    // reimplemented by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      improved by: T.J. Leahy
    //      improved by: Michael White
    //        example 1: json_decode('[ 1 ]');
    //        returns 1: [1]

    /*
     http://www.JSON.org/json2.js
     2008-11-19
     Public Domain.
     NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
     See http://www.JSON.org/js.html
     */

    var json = this.window.JSON;
    if (typeof json === 'object' && typeof json.parse === 'function') {
        try {
            return json.parse(str_json);
        } catch (err) {
            if (!(err instanceof SyntaxError)) {
                throw new Error('Unexpected error type in json_decode()');
            }
            this.php_js = this.php_js || {};
            this.php_js.last_error_json = 4; // usable by json_last_error()
            return null;
        }
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var j;
    var text = str_json;

    // Parsing happens in four stages. In the first stage, we replace certain
    // Unicode characters with escape sequences. JavaScript handles many characters
    // incorrectly, either silently deleting them, or treating them as line endings.
    cx.lastIndex = 0;
    if (cx.test(text)) {
        text = text.replace(cx, function(a) {
            return '\\u' + ('0000' + a.charCodeAt(0)
                    .toString(16))
                .slice(-4);
        });
    }

    // In the second stage, we run the text against regular expressions that look
    // for non-JSON patterns. We are especially concerned with '()' and 'new'
    // because they can cause invocation, and '=' because it can cause mutation.
    // But just to be safe, we want to reject all unexpected forms.
    // We split the second stage into 4 regexp operations in order to work around
    // crippling inefficiencies in IE's and Safari's regexp engines. First we
    // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
    // replace all simple value tokens with ']' characters. Third, we delete all
    // open brackets that follow a colon or comma or that begin the text. Finally,
    // we look to see that the remaining characters are only whitespace or ']' or
    // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
    if ((/^[\],:{}\s]*$/)
        .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

        // In the third stage we use the eval function to compile the text into a
        // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.
        j = eval('(' + text + ')');

        return j;
    }

    this.php_js = this.php_js || {};
    this.php_js.last_error_json = 4; // usable by json_last_error()
    return null;
}

function base64_decode(data) {
    //  discuss at: http://phpjs.org/functions/base64_decode/
    // original by: Tyler Akins (http://rumkin.com)
    // improved by: Thunder.m
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //    input by: Aman Gupta
    //    input by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: Onno Marsman
    // bugfixed by: Pellentesque Malesuada
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //   example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
    //   returns 1: 'Kevin van Zonneveld'
    //   example 2: base64_decode('YQ===');
    //   returns 2: 'a'

    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = '',
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data += '';

    do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);

    dec = tmp_arr.join('');

    return dec.replace(/\0+$/, '');
}

function base64_encode(data) {
    //  discuss at: http://phpjs.org/functions/base64_encode/
    // original by: Tyler Akins (http://rumkin.com)
    // improved by: Bayron Guevara
    // improved by: Thunder.m
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Rafał Kukawski (http://kukawski.pl)
    // bugfixed by: Pellentesque Malesuada
    //   example 1: base64_encode('Kevin van Zonneveld');
    //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
    //   example 2: base64_encode('a');
    //   returns 2: 'YQ=='

    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = '',
        tmp_arr = [];

    if (!data) {
        return data;
    }

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    var r = data.length % 3;

    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

function validateMobile(mobile) {
    mobile = mobile.replace(/\s/g, '');
    mobile = mobile.replace(/\./g, '');
    mobile = mobile.replace(/,/g, '');
    mobile = mobile.replace(/^(\+84|84|\(84\))/, '0');

    if (/^0/.exec(mobile) == null) {
        mobile = '0' + mobile;
    }
    if (isNaN(mobile) || mobile.length < 10 || mobile.length > 11) {
        return false;
    }

    return true;
}

function validateEmail(email) {
    var regexPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexPattern.test(email)) {
        return false;
    }
    return true;
}

/**
 *
 * @type {{load: CheckPromotionOrder.load, updateOrder: CheckPromotionOrder.updateOrder}}
 */
var CheckPromotionOrder = {
    load: function(totalDiscount, totalMoney, shipFee, currency) {
        var customerMobile = $('input[name=customerMobile]').val();
        if (!currency || currency === '') {
            currency = " đ";
        }
        if (customerMobile && validateMobile(customerMobile)) {
            CheckPromotionOrder.updateOrder(customerMobile, totalDiscount, totalMoney, shipFee, currency)
        }
        $('input[name=customerMobile]').on('change', function() {
            var t = $(this);
            if (validateMobile(t.val())) {
                CheckPromotionOrder.updateOrder(t.val(), totalDiscount, totalMoney, shipFee, currency)
            }
        });
    },
    updateOrder: function(customerMobile, totalDiscount, totalMoney, shipFee, currency) {
        $.post(
            '/promotion/checkpromotionorder', {
                customerMobile: customerMobile
            },
            function(rs) {
                var shipFeeVal = parseInt($(shipFee).attr('value'));
                if (rs.code == 1) {
                    var disVal = parseInt(rs.moneyDiscount);
                    if (disVal > 0) {
                        if ($(totalDiscount).attr('value')) {
                            var ttDisVal = parseInt($(totalDiscount).attr('value')) + disVal;
                        } else {
                            var ttDisVal = parseInt($(totalDiscount).attr('data-value')) + disVal;
                        }
                        if ($(totalMoney).attr('data-value')) {
                            var ttMonVal = parseInt($(totalMoney).attr('data-value')) - disVal + shipFeeVal;
                        } else {
                            var ttMonVal = parseInt($(totalMoney).attr('value')) - disVal + shipFeeVal;
                        }
                        $(totalDiscount).html($.number(ttDisVal) + currency).attr('data-currentValue', ttDisVal).attr('data-value', ttDisVal).attr('value', 0);
                        $(totalMoney).html($.number(ttMonVal) + currency).attr('current-value', ttMonVal).attr('value', ttMonVal);
                    }
                    //CustomerShipFee.updateCustomershipFee(toCity,toDistrict,shipFee, totalMoney, inputCoupon, currency, 1, ttMonVal- shipFeeVal,'');
                } else {
                    if ($(totalDiscount).attr('data-currentvalue')) {
                        var ttDisVal = parseInt($(totalDiscount).attr('data-currentvalue')) - parseInt($(totalDiscount).attr('data-value'));
                    } else {
                        var ttDisVal = parseInt($(totalDiscount).attr('data-value'));
                    }
                    if ($(totalMoney).attr('data-value')) {
                        var ttMonVal = parseInt($(totalMoney).attr('data-value')) + shipFeeVal;
                    } else {
                        var ttMonVal = parseInt($(totalMoney).attr('value')) + shipFeeVal;
                    }

                    $(totalDiscount).html($.number(ttDisVal) + currency).attr('data-currentvalue', ttDisVal).attr('data-value', ttDisVal);
                    $(totalMoney).html($.number(ttMonVal) + currency).attr('current-value', ttMonVal).attr('value', ttMonVal);
                }
            }
        )
    }
};

function checkCoupon() {
    var totalMoney = parseInt($('.totalCurentMoney').val());
    $.post(
        '/promotion/checkcoupon', { couponCode: $('#coupon').val() },
        function(rs) {
            if (rs.code == 1) {
                $('.showTotalCurentMoney').html($.number(totalMoney - parseInt(rs.value)) + ' đ');
                $('.messageCouponDefault').html('Mã giảm giá: ' + ' : - ' + $.number(rs.value) + ' đ');
                $('.totalCurentMoney').val(totalMoney - parseInt(rs.value));
                $('.messageCouponDefault').attr('data-valueTemp', rs.value);
            } else {
                alert(rs.msg);
                $('.showTotalCurentMoney').html($.number((totalMoney + parseInt($('.messageCouponDefault').attr('data-valueTemp')))) + ' đ');
                $('.totalCurentMoney').val(totalMoney + parseInt($('.messageCouponDefault').attr('data-valueTemp')));
                $('.messageCouponDefault').attr('data-valueTemp', 0);
                $('.messageCouponDefault').html('');
            }
        },
        'json'
    );
}

/*
 * check tồn SP
 * btnAddToCart: nút mua hàng
 * quantity: input số lượng
 * req: class đi với màu và size
 * color: ô chưa foreach màu (VD: .req.color)
 * colorItem: ô chọn màu
 * colorActiveItem: ô màu được active
 * size: ô chưa foreach size (VD: .req.size)
 * sizeItem: ô chọn size
 * sizeActiveItem: size được active
 * mainPrice: class để đổi giá trong các trường hợp size, màu được active
 * currency: đơn vị tiền tệ
 * */
function checkInvProduct(options) {
    if (typeof options == 'undefined') {
        options = {};
    }
    var attrs = {},
        atc = options.btnAddToCart ? options.btnAddToCart : $('body .btnAddToCart'),
        qtt = options.quantity ? options.quantity : $('body #pquantity'),
        req = options.req ? options.req.length : $('body .req').length,
        color = options.color ? options.color : $('body .req.color'),
        colorItem = options.colorItem ? options.colorItem : $('body .req.color a'),
        colorActiveItem = options.colorActiveItem ? options.colorActiveItem : $('body .req.color a.active'),
        size = options.size ? options.size : $('body .req.size'),
        sizeItem = options.sizeItem ? options.sizeItem : $('body .req.size a'),
        sizeActiveItem = options.sizeActiveItem ? options.sizeActiveItem : $('body .req.size a.active'),
        mainPrice = options.mainPrice ? options.mainPrice : $('body .main-price'),
        currency = options.currency ? options.currency : '';

    if (req == 1) {
        if (color.length) {
            if (colorActiveItem.length) {
                attrs[color.attr('data-column')] = colorActiveItem.attr('data-value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'), { 'attrs': attrs },
                    function(rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            qtt.attr('max', rs.data.available);
                            atc.attr({
                                    'data-selId': rs.data.id,
                                    'data-ck': 1
                                })
                                .removeAttr('title data-original-title').removeClass('unsel');
                            mainPrice.html($.number(rs.data.price) + currency);
                        } else {
                            atc.attr('title', msgOutofStock);
                        }
                    },
                    'json'
                );
            } else {
                colorItem.each(function() {
                    var t = $(this);
                    attrs[color.attr('data-column')] = t.attr('data-value');
                    $.post(
                        '/product/child?psId=' + atc.attr('data-psid'), { 'attrs': attrs },
                        function(rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr({
                                    'qtt': rs.data.available,
                                    'data-selId': rs.data.id,
                                    'data-price': rs.data.price,
                                    'data-oldPrice': rs.data.oldPrice,
                                    'data-moneyDiscount': rs.data.moneyDiscount,
                                });
                            } else {
                                t.addClass('deactive').attr('title', msgOutofStock);
                            }
                        },
                        'json'
                    );
                });
            }
        } else {
            if (sizeActiveItem.length) {
                attrs[size.attr('data-column')] = sizeActiveItem.attr('data-value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'), { 'attrs': attrs },
                    function(rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            qtt.attr('max', rs.data.available);
                            atc.attr({
                                'data-selId': rs.data.id,
                                'data-ck': 1
                            }).removeAttr('title data-original-title').removeClass('unsel');
                            mainPrice.html($.number(rs.data.price) + currency);
                        } else {
                            atc.attr('title', msgOutofStock);
                        }
                    },
                    'json'
                );
            } else {
                sizeItem.each(function() {
                    var t = $(this);
                    attrs[size.attr('data-column')] = t.attr('data-value');
                    $.post(
                        '/product/child?psId=' + atc.attr('data-psid'), { 'attrs': attrs },
                        function(rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr({
                                    'qtt': rs.data.available,
                                    'data-selId': rs.data.id,
                                    'data-price': rs.data.price,
                                    'data-oldPrice': rs.data.oldPrice,
                                    'data-moneyDiscount': rs.data.moneyDiscount,
                                });
                            } else {
                                t.addClass('deactive').attr('title', msgOutofStock);
                            }
                        },
                        'json'
                    );
                });
            }
        }
        return false;
    }
    if (req > 1) {
        if (colorActiveItem.length && sizeActiveItem.length) {
            attrs[color.attr('data-column')] = colorActiveItem.attr('data-value');
            attrs[size.attr('data-column')] = sizeActiveItem.attr('data-value');
            $.post(
                '/product/child?psId=' + atc.attr('data-psid'), { 'attrs': attrs },
                function(rs) {
                    if (rs.code == 1 && rs.data.available > 0) {
                        qtt.attr('max', rs.data.available);
                        atc.removeAttr('title data-original-title')
                            .removeClass('unsel')
                            .attr({
                                'data-selId': rs.data.id,
                                'data-ck': 1
                            });
                        mainPrice.html($.number(rs.data.price) + currency);
                    } else {
                        sizeActiveItem.addClass('deactive').attr('title', msgOutofStock);
                        atc.attr('title', msgOutofStock);
                    }
                },
                'json'
            );
            return false;
        }
        if (colorActiveItem.length && !sizeActiveItem.length) {
            attrs[color.attr('data-column')] = colorActiveItem.attr('data-value');
            sizeItem.each(function() {
                var t = $(this);
                attrs[size.attr('data-column')] = t.attr('data-value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'), { 'attrs': attrs },
                    function(rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            t.attr({
                                'qtt': rs.data.available,
                                'data-selId': rs.data.id,
                                'data-price': rs.data.price,
                                'data-oldPrice': rs.data.oldPrice,
                                'data-moneyDiscount': rs.data.moneyDiscount,
                            });
                        } else {
                            t.addClass('deactive').attr('title', msgOutofStock);
                        }
                    },
                    'json'
                );
            });
            return false;
        }
        if (!colorActiveItem.length && sizeActiveItem.length) {
            attrs[size.attr('data-column')] = sizeActiveItem.attr('data-value');
            colorItem.each(function() {
                var t = $(this);
                attrs[color.attr('data-column')] = t.attr('data-value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'), { 'attrs': attrs },
                    function(rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            t.attr({
                                'qtt': rs.data.available,
                                'data-selId': rs.data.id,
                                'data-price': rs.data.price,
                                'data-oldPrice': rs.data.oldPrice,
                                'data-moneyDiscount': rs.data.moneyDiscount,
                            });
                        } else {
                            t.addClass('deactive').attr('title', msgOutofStock);
                        }
                    },
                    'json'
                );
            });
            return false;
        }
    }
}
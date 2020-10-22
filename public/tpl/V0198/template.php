<?php
use Website\Model\ContentKey;
return [
    'author' => 'Toannv',
    'sourceLink' => 'http://www.juno.vn',
    'domain' => [
        'storeId' => 1642,
        'name' => 'V0198.cuongnvstore.bot3s.net',
        'alias' => 'V0198.cuongnvstore.bot3s.net'
    ],
    'contents' => array(
        'HOME' => array(
            'name' => 'Trang chủ',
            'keys' => array(

                'ABOUT_US' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Về Hami'
                ),
                'FOOTER_ABOUT_US' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<p>CAPTOT.VN - Website bán cặp học sinh siêu nhẹ với hơn 5000 sản phẩm,
							hơn 500 mẫu cặp cho bạn lựa chọn. Thoải mái mua hàng trên captot.vn
							với chính sách giao hàng toàn quốc, đổi trả trong 07 ngày cùng nhiều ưu đãi hấp hẫn.
						</p>'
                ),
                'FACEBOOK_FANPAGE' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => 'https://www.facebook.com/nhanh.vn/?fref=ts'
                ),
                'FACEBOOK_MESSENGER' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => ''
                ),
                'FOOTER_CUSTOMER_BUY' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<ul>
						<li><a><i class="fa fa-angle-right"></i>Bảo mật thông tin</a></li>
						<li><a><i class="fa fa-angle-right"></i>Chính sách bảo hành</a></li>
						<li><a><i class="fa fa-angle-right"></i>Chương trình khuyến mại</a></li>
						<li><a><i class="fa fa-angle-right"></i>Mua hàng và thanh toán</a></li>
					</ul>'
                ),
                'YOUTUBE_LINK' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'https://www.youtube.com/channel/UCj4rlhg6LgoYBdqkw6vXLpw'
                ),
            )
        ),
    )
//    'hasResponsive' => true,
//    'customStyle' => 1,
//    'skins' => [
//        'lightblue' => [
//            'name' => 'lightblue',
//            'colorCode' => '#57bdb0',
//        ],
//        'green' => [
//            'name' => 'green',
//            'colorCode' => '#388e3c',
//        ],
//        'orange' => [
//            'name' => 'orange',
//            'colorCode' => '#f58634',
//        ],
//        'red' => [
//            'name' => 'red',
//            'colorCode' => '#ff302c',
//        ],
//    ],
//    'banners' => array(
//        'BANNER_STORES_INTRO' => array(
//            'name' => 'Banner danh sách intro 1 trang hệ thống cửa hàng',
//            'description' => 'Kích cỡ banner 380x275',
//            'size' => '380x275'
//        ),
//        'BANNER_STORES_SLIDE' => array(
//            'name' => 'Banner slide danh sách trang hệ thống cửa hàng',
//            'description' => 'Kích cỡ banner 800x533',
//            'size' => '800x533'
//        ),
//        'BANNER_LIST_STORES' => array(
//            'name' => 'Banner danh sách cửa hàng mới',
//            'description' => 'Kích cỡ banner 380x275',
//            'size' => '380x275'
//        ),
//        'SLIDER_INDEX' => array(
//            'name' => 'Slider trang chủ',
//            'description' => 'Kích cỡ banner 1350x385',
//            'size' => '1350x385'
//        ),
//        'SLIDER_BANNER_TOP_INDEX' => array(
//            'name' => 'banner top trang chủ',
//            'description' => 'Kích cỡ banner 1349x48',
//            'size' => '1349x48'
//        ),
//        'BANNER_STORE' => array(
//            'name' => 'Banner hệ thống cửa hàng chân trang',
//            'description' => 'Kích cỡ banner 1350x215',
//            'size' => '1350x215'
//        ),
//        'BANNER_EVENT' => array(
//            'name' => 'Banner sự kiện nằm dưới phần tin tức',
//            'description' => 'Kích cỡ banner 400x400',
//            'size' => '400x400'
//        ),
//        'BANNER_VIDEO' => array(
//            'name' => 'Banner sự kiện nằm dưới phần tin tức',
//            'description' => 'Kích cỡ banner 400x400',
//            'size' => '400x400'
//        ),
//        'HOME_FEEDBACK' => array(
//            'name' => 'Banner feedback',
//            'description' => 'Kích cỡ banner 300x300',
//            'size' => '300x300'
//        ),
//        'HOME_BANNER_MIDDLE' => array(
//            'name' => 'Banner trang video trang chủ',
//            'description' => 'Kích cỡ banner auto',
//            'size' => 'auto'
//        ),
//        'BANNER_MENU_HEADER' => array(
//            'name' => 'Banner thêm các mục trên thanh menu',
//            'description' => 'Kích cỡ banner 45x45',
//            'size' => '45x45'
//        ),
//        'PRODUCT_BANNER' => array(
//            'name' => 'banner thương hiệu',
//            'description' => 'Kích cỡ banner 196x121',
//            'size' => '196x121'
//        ),
//        'BANNER_ADV' => array(
//            'name' => 'banner dưới banner chính',
//            'description' => 'Kích cỡ banner 196x121',
//            'size' => '196x121'
//        ),
//        'BN_POPUP_HOME' => array(
//            'name' => 'Banner Popup trang chủ',
//            'description' => 'Kích cỡ banner Auto',
//            'size' => 'Auto'
//        ),
//        'BANNER_MIDDLE_MIDDLE' => array(
//            'name' => 'Banner dưới sản phẩm hot',
//            'description' => 'Kích cỡ banner Auto',
//            'size' => 'Auto'
//        ),
//        'BANNER_INSTAGRAM' => array(
//            'name' => 'Ảnh phần instagram',
//            'description' => 'Kích cỡ banner 150x150',
//            'size' => '150x150'
//        ),
//        'BANNER_AD_HOME' => array(
//            'name' => 'Banner quảng cáo sản phẩm trang chủ',
//            'description' => 'Kích cỡ banner 610x175',
//            'size' => '610x175'
//        ),
//        'BANNER_POLICY' => array(
//            'name' => 'Banner các chính sách',
//            'description' => 'Kích cỡ banner 70x70',
//            'size' => '70x70'
//        ),
//        'BANNER_PROMOTION' => array(
//            'name' => 'Banner các chính sách',
//            'description' => 'Kích cỡ banner 1350x80',
//            'size' => '1350x80'
//        ),
//        'BANNER_BOTTOM_IMG' => array(
//            'name' => 'Banner hình ảnh về shop',
//            'description' => 'Kích cỡ banner Auto',
//            'size' => 'Auto'
//        ),'BANNER_FEEDBACK_LEFT' => array(
//            'name' => 'Banner trái feedback',
//            'description' => 'Kích cỡ banner Auto',
//            'size' => 'Auto'
//        ),'BANNER_FEEDBACK_RIGHT_TOP' => array(
//            'name' => 'Banner phải feedback',
//            'description' => 'Kích cỡ banner Auto',
//            'size' => 'Auto'
//        ),'BANNER_FEEDBACK_RIGHT_BOTTOM' => array(
//            'name' => 'Banner phải feedback',
//            'description' => 'Kích cỡ banner Auto',
//            'size' => 'Auto'
//        ),
//        'BANNER_HEADER_TOP' => array(
//            'name' => 'Banner khuyến mãi đầu trang',
//            'description' => 'Kích cỡ banner Auto',
//            'size' => 'Auto'
//        ),
//        'BANNER_IMAGE_PRODUCT_VIEW' => array(
//            'name' => 'Banner trang chi tiết sản phẩm',
//            'description' => 'Kích cỡ banner Auto',
//            'size' => 'Auto'
//        ),
//        'BANNER_CUSTOMER' => array(
//            'name' => 'Banner feed back dưới footer',
//            'description' => 'Kích cỡ banner 126x126',
//            'size' => '126x126'
//        ),
//        //----- landingpage
//        'LANDING_MAIN_BANNER' => array(
//            'name' => 'Landing banner chính',
//            'description' => 'Kích cỡ banner auto',
//            'size' => 'auto'
//        ),
//        'LANDING_SERVICE' => array(
//            'name' => 'Landing banner chất lượng, dịch vụ',
//            'description' => 'Kích cỡ banner auto',
//            'size' => 'auto'
//        ),
//        'LANDING_REAL_IMG' => array(
//            'name' => 'Landing ảnh thực tế',
//            'description' => 'Kích cỡ banner auto',
//            'size' => 'auto'
//        ),
//        'LANDING_FEEDBACK' => array(
//            'name' => 'Landing banner khách hàng',
//            'description' => 'Kích cỡ banner auto',
//            'size' => 'auto'
//        ),
//        'BANNER_FOOTER' => array(
//            'name' => 'banner phần footer',
//            'description' => 'Kích cỡ banner auto',
//            'size' => 'auto'
//        ),
//        'BANNER_FLASHSALE_TOP' => array(
//            'name' => 'banner phần flashsale mobie',
//            'description' => 'Kích cỡ banner auto',
//            'size' => 'auto'
//        ),
//    ),
//    'contents' => array(
//        'HOME' => array(
//            'name' => 'Trang chủ',
//            'keys' => array(
//                'META_TITLE' => array(
//                    'type' => ContentKey::TYPE_META_TITLE,
//                    'content' => 'Phần mềm quản lý bán hàng thông minh'
//                ),
//                'META_DESCRIPTION' => array(
//                    'type' => ContentKey::TYPE_META_DESCRIPTION,
//                    'content' => 'Phần mềm quản lý bán hàng Nhanh.vn giúp bạn dễ dàng quản lý kho hàng, đơn hàng, khách hàng, tiết kiệm thời gian, tăng doanh thu, giảm chi phí cho việc quản lý cửa hàng.....'
//                ),
//                'META_KEYWORDS' => array(
//                    'type' => ContentKey::TYPE_META_KEYWORDS,
//                    'content' => 'Phần mềm quản lý bán hàng.....   '
//                ),
//                'USER_TOP_LINK' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '/profile'
//                ),
//                'USER_TOP_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Tài khoản'
//                ),
//                'SOCIAL_FACEBOOK' => array(
//                    'type' => ContentKey::TYPE_SOCIAL_FACEBOOK,
//                    'content' => 'https://www.facebook.com/nhanh.vn'
//                ),
//                'SOCIAL_YOUTUBE' => array(
//                    'type' => ContentKey::TYPE_SOCIAL_YOUTUBE,
//                    'content' => 'https://youtube.com/'
//                ),
//                'SOCIAL_INSTAGRAM' => array(
//                    'type' => ContentKey::TYPE_SOCIAL_INSTAGAM,
//                    'content' => 'https://instagram.com/'
//                ),
//                'INSTAGRAM_NAME' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'SOCIAL_GOOGLE' => array(
//                    'type' => ContentKey::TYPE_SOCIAL_GOOGLE_PLUS,
//                    'content' => 'https://plus.google.com/'
//                ),
//                'SOCIAL_TWITTER' => array(
//                    'type' => ContentKey::TYPE_SOCIAL_TWITTER,
//                    'content' => 'https://twitter.com/'
//                ),
//                'SOCIAL_PINTERREST' => array(
//                    'type' => ContentKey::TYPE_SOCIAL_PINTERREST,
//                    'content' => ''
//                ),
//                'SOCIAL_SKYPE' => array(
//                    'type' => ContentKey::TYPE_SOCIAL_SKYPE,
//                    'content' => ''
//                ),
//                'SOCIAL_VIBER' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'SOCIAL_ZALO' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'SOCIAL_MESSENGER' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '//www.messenger.com/t/nhanh.vn'
//                ),
//                'SOCIAL_LINE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'PAYMENT_ONLINE_CUSTOMER' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'SOCIAL_SHOPEE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'ORDER_TOP_TEXT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Nhập mã đơn hàng'
//                ),
//                'ZALO_BTN_TEXT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '0989.834.xxx'
//                ),
//                'HOTLINE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '0989.834.xxx'
//                ),
//                'HOTLINE_HEADER_TOP' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'LIVE_CHAT_FACEBOOK' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'PRICE_ZERO' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Liên hệ'
//                ),
//                'CUSTOMER_BLOCK_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'CẢM NHẬN KHÁCH HÀNG'
//                ),
//                'PAY_NOW' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Thanh toán ngay'
//                ),
//                'PAY' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Thanh toán >'
//                ),
//                'NOTE_SEARCH' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<p><b><i class="fa fa-2x fa-lightbulb-o" style="color: #f37021"></i> Chú thích trạng thái đơn hàng :</b></p>
//                            <p><b>- Mới :</b> Ofélia chưa xác nhận được tiền chuyển khoản của bạn</p>
//                            <p><b>- Đang xác nhận :</b> Ofélia đang xác nhận tiền chuyển khoản của bạn</p>
//                            <p><b>- Đã xác nhận :</b> Ofélia đã xác nhận xong tiền chuyển khoản và sẽ gửi hàng cho bạn.</p>
//                            <p><b>- Chờ đi nhận :</b> Hãng vận chuyển đang tới lấy hàng , khi nào hãng lấy hàng xong sẽ có mã bưu phẩm cho bạn kiểm tra lịch trình.</p>
//                            <p><b>- Thất bại :</b> Bưu tá phát đến địa chỉ khách hàng nhưng thất bại do không liên lạc được với bạn/ không tìm thấy địa chỉ.</p>
//                            <p><b>- Đang chuyển hoàn/ Đã chuyển hoàn :</b> đơn hàng sau 3 lần phát không thành công , sẽ hoàn về cho Ofélia</p>'
//                ),
//                'EMAIL' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'contact@nhanh.vn'
//                ),
//                'HEADER_POLICY' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Shop giao hàng toàn quốc từ 3-5 ngày . Thanh toán khi nhận hàng'
//                ),
//                'HEADER_KEY_SEARCH' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ' Từ khóa đang HOT: Giày công sở | Thời trang công sở | Giày đồng giá | Giày nữ'
//                ),
//                'VIDEO_BACKGROUND_COLOR' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '60b2be'
//                ),
//                'HOTLINE_ICON_FOOTER' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<p><img src="/tpl/T0198/img/icon_phone.jpg" alt="Icon Phone"></p>'
//                ),
//                'HOTLINE_DESCRIPTION_1' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Gọi mua hàng(8:30-21:30)'
//                ),
//                'HOTLINE_DESCRIPTION_2' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Tất cả các ngày trong tuần'
//                ),
//                'HOTLINE_DESCRIPTION_3' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Góp ý, khiếu nại(8:30-21:30)'
//                ),
//                'HOTLINE_DESCRIPTION_4' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Nghỉ chiều thứ 7, Chủ nhật, ngày lễ'
//                ),
//                'HOTLINE_DESCRIPTION_5' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'FOOTER_SOCIAL_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Like  trên mạng xã hội'
//                ),
//                'HOTLINE_2' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '0247.309.9966'
//                ),
//                'HOTLINE_3' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'STORE_TOP_LINK' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '/he-thong-dai-ly'
//                ),
//                'STORE_TOP_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Xem hệ thống cửa hàng'
//                ),
//                'STORE_TOP_NAME' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ' Mời bạn xem địa chỉ hệ thống cửa hàng'
//                ),
//                'POLICY_LINK_SHIPPING' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'POLICY_IMAGES_SHIPPING' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<img src="/tpl/T0198/img/icon-deliver.png">'
//                ),
//                'FOOTER_INFO_ADDRESS' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'IMG_ADVERTISEMENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<img src="">'
//                ),
//                'SUBCRIBLE_TITLE_FOOTER' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Đăng ký nhận thông tin mới'
//                ),
//                'SUBCRIBLE_FOOTER_CONTENT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Nhập email của bạn tại đây'
//                ),
//                'SUBCRIBLE_CONTENT_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'GIẢM NGAY 10%'
//                ),
//                'SUBCRIBLE_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<span>Cho đơn hàng đầu tiên</span>
//                                  <span>từ 699.000 VND</span>'
//                ),
//                'SUPPORT_ONLINE' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'POLICY_TITLE_SHIPPING' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Giao hàng miễn phí'
//                ),
//                'POLICY_TEXT_SHIPPING' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'sản phẩm trên 300,000đ'
//                ),
//                'POLICY_LINK_RETURN_PRODUCT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'POLICY_IMAGES_RETURN_PRODUCT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<img src="/tpl/T0198/img/icon-day90.png">'
//                ),
//                'POLICY_TITLE_RETURN_PRODUCT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Đổi trả miễn phí'
//                ),
//                'POLICY_TEXT_RETURN_PRODUCT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Đổi trả miễn phí 90 ngày'
//                ),
//                'POLICY_LINK_PAYMENT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'POLICY_IMAGES_PAYMENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<img src="/tpl/T0198/img/icon-pay.png">'
//                ),
//                'POLICY_TITLE_PAYMENT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'thanh toán'
//                ),
//                'POLICY_TEXT_PAYMENT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Thanh toán khi nhận hàng'
//                ),
//                'POLICY_IMAGES_HOTLINE' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<img src="/tpl/T0198/img/icon-phonehot.png">'
//                ),
//                'POLICY_TITLE_HOTLINE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Hỗ trợ mua nhanh'
//                ),
//                'POLICY_TEXT_HOTLINE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'từ 8:30 - 21:30 mỗi ngày'
//                ),
//                'TEL_SUPPORT1' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Hotline Mua Hàng 1: 1800xxx (Miễn phí)'
//                ),
//                'TEL_SUPPORT2' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Hotline Mua Hàng 2: 1800xxx (Miễn phí)'
//                ),
//                'TEL_SUPPORT3' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Hotline Mua Hàng 3: 1800xxx (Miễn phí)'
//                ),
//                'POLICY_TEXT_TIME' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Thời gian làm việc 08h00 - 19h30(Từ thứ 2 - đến thứ 7)'
//                ),
//                'NEWS_HOME_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Tin tức mỗi ngày'
//                ),
//                'NEWS_HOME_DESC' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Hiểu thời trang và thật thời trang mỗi ngày!'
//                ),
//                'TITLE_NEWS_VISITED' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'BÀI ĐƯỢC XEM NHIỀU NHẤT'
//                ),
//                'TITLE_TOP_PRODUCT_HOT_HOME' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Top 05 sản phẩm hot nhất tuần'
//                ),
//                'HREF_TOP_PRODUCT_HOT_HOME' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '/product?show=hot'
//                ),
//                'TITLE_TOP_PRODUCT_NEWS_HOME' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'TOP sản phẩm mới nhất tuần này'
//                ),
//                'HREF_TOP_PRODUCT_NEWS_HOME' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '/product?show=new'
//                ),
//                'TITLE_TOP_PRODUCT_DISCOUNT_HOME' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'TOP sản phẩm đang khuyến mại'
//                ),
//                'HREF_TOP_PRODUCT_DISCOUNT_HOME' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '/product?show=discount'
//                ),
//                'TITLE_TOP_PRODUCT_PROMOTION_HOME' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Sản phẩm SALE - Khuyến mãi đặc biệt'
//                ),
//                'HREF_TOP_PRODUCT_PROMOTION_HOME' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '/promotion'
//                ),
//                'SLOGAN_SUBCRIBE' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '
//                        <p>
//                            Chiết khấu ngay 100.000 VNĐ trên hóa đơn, bạn có thấy hào hứng không?
//                            <br>
//                            Cập nhật ngay thông tin để nhận món quà này
//                        </p>
//                    '
//                ),
//                'VALUE_SUBCRIBE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Mã giảm giá 100.000 VNĐ'
//                ),
//                'TEXT_BUTTON_SUBCRIBE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Gửi mã giảm giá 100.000 VNĐ ngay'
//                ),
//                'EMAIL_DESCRIPTION_POPUP' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ' <p style="color:#000;font-size: 14px">Nhập địa chỉ email để cập nhật các chương trình khuyến mại sớm nhất</p>'
//                ),
//                'TITLE_COUNT_PROMOTION' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Thời gian còn lại để diễn ra chương trình'
//                ),
//                'DESCRIPTION_COUNT_PROMOTION' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'SHOW_SYSTEM_STORE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'TITLE_PROMOTION_PAGE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Các chương trình khuyến mại'
//                ),
//                'TITLE_REGISTER_FOOTER' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<h1>Đặt lịch sửa giày</h1>'
//                ),
//                'SUCCESS_CONTACT_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Gửi thông tin liên hệ thành công!'
//                ),
//                'SUGGEST_SEARCH_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'SIGNIN_SIGNUP' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'LINK_SALE_2260' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '#'
//                ),
//                'TEXT_INFORMATION' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'TITLE_INFORMATION' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Thông tin liên hệ'
//                ),
//                'STORE_LOCATION' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<ul>
//                                <li>
//                                    <i class="fa fa-map-marker" aria-hidden="true"></i><span>Địa chỉ: abc</span>
//                                </li>
//                                <li>
//                                    <i class="fa fa-phone" aria-hidden="true"></i><span>Điện thoại: <a href="tel:0123456" class="text-location">0123456</a></span>
//                                </li>
//                                <li>
//                                    <i class="fa fa-envelope" aria-hidden="true"></i><span>Email: <a href="mailto: aaaaaa" class="text-location">aaaaaa</a></span>
//                                </li>
//                                <li>
//                                    <i class="fa fa-home" aria-hidden="true"></i><span>Website: <a href="http://nguyengiapharma.store.nhanh.vn/" class="text-location">http://nguyengiapharma.store.nhanh.vn/</a></span>
//                                </li>
//                            </ul>'
//                ),
//                'MAPS' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.592638403607!2d105.817991414407!3d21.008960293831066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac828a8d097f%3A0x7149275aa4ecd1df!2zTmhhbmgudm4gLSBQaOG6p24gbeG7gW0gcXXhuqNuIGzDvSBiw6FuIGjDoG5n!5e0!3m2!1svi!2s!4v1537432373459" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'
//                ),
//                'MENU_TOP_LINK' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<ul>
//                                        <li><a href="/">Blog</a></li>
//                                        <li><a href="/lien-he">Liên hệ</a></li>
//                                        <li><a href="/he-thong-dai-ly">Hệ thống cửa hàng</a></li>
//                                  </ul>'
//                ),
//                'POLICIES_FREE_ICON' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<img src="/tpl/T0198/img/stores/31348/policies_icon_1.png" alt="alt">'
//                ),
//                'POLICIES_FREE_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Giao hàng toàn quốc'
//                ),
//                'POLICIES_FREE_SMALL' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Miễn phí vận chuyển đối với đơn hàng từ 300K'
//                ),
//
//                'POLICIES_SUPPORT_ICON' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<img src="/tpl/T0198/img/stores/31348/policies_icon_2.png" alt="alt">'
//                ),
//                'POLICIES_SUPPORT_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Hỗ trợ tư vấn'
//                ),
//                'POLICIES_SUPPORT_SMALL' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Thứ 2 - CN : 08g30 - 17g30'
//                ),
//                'POLICIES_WARRANTY_ICON' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<img src="/tpl/T0198/img/stores/31348/policies_icon_3.png" alt="alt">'
//                ),
//                'POLICIES_WARRANTY_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Cam kết bảo hành'
//                ),
//                'POLICIES_WARRANTY_SMALL' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Sản phẩm được bảo hành 12 tháng'
//                ),
//                'POLICIES_HOTLINE_ICON' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<img src="/tpl/T0198/img/stores/31348/policies_icon_4.png" alt="alt">'
//                ),
//                'POLICIES_HOTLINE_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Đặt hàng ngay'
//                ),
//                'POLICIES_HOTLINE_SMALL' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '1900565683'
//                ),
//                'ID_LINK_YOUTUBE_HOME_1' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'ID_LINK_YOUTUBE_HOME_2' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'ID_LINK_YOUTUBE_HOME_3' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'ID_LINK_YOUTUBE_HOME_4' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'ID_LINK_YOUTUBE_HOME_5' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'LINK_PRODUCT_YOUTUBE_HOME_1' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '/'
//                ),
//                'LINK_PRODUCT_YOUTUBE_HOME_2' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '/'
//                ),
//                'LINK_PRODUCT_YOUTUBE_HOME_3' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '/'
//                ),
//                'LINK_PRODUCT_YOUTUBE_HOME_4' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '/'
//                ),
//                'LINK_PRODUCT_YOUTUBE_HOME_5' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '/'
//                ),
//                'NAME_PRODUCT_YOUTUBE_HOME_1' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'MAGIC! - Rude'
//                ),
//                'NAME_PRODUCT_YOUTUBE_HOME_2' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'MAGIC! - Rude'
//                ),
//                'NAME_PRODUCT_YOUTUBE_HOME_3' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'MAGIC! - Rude'
//                ),
//                'NAME_PRODUCT_YOUTUBE_HOME_4' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'MAGIC! - Rude'
//                ),
//                'NAME_PRODUCT_YOUTUBE_HOME_5' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'MAGIC! - Rude'
//                ),
//                'VIDEO_TITLE_HOME_LINK' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'VIDEO_TITLE_HOME' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Sản phẩm video thực tế'
//                ),
//                'BRAND_TITLE_IN_CATEGORY' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Thương hiệu'
//                ),
//                'FOOTER_LEFT_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Liên hệ'
//                ),
//                'FOOTER_LEFT_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '  <li class="footer-address">Số 102 Thái Thịnh, phường Trung Liệt, quận Đống Đa, TP Hà Nội</li>
//        							<li class="fooer-phone"><label class="mr5">Phone: </label><span><a href="tel:02473099966">0247.309.9966</a></span></li>
//        							<li class="footer-email"><label class="mr5">Email: </label><span>contact@nhanh.vn</span></li>
//                                 '
//                ),
//                'FOOTER_CENTER_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Chính sách hỗ trợ'
//                ),
//                'FOOTER_CENTER_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '  <li><a href="#" title="Giới thiệu">Giới thiệu</a></li>
//        							<li><a href="#" title="Liên hệ">Liên hệ</a></li>
//        							<li><a href="#" title="Chính sách vận chuyển">Chính sách vận chuyển</a>
//        							<li><a href="#" title="Chính sách đổi trả">Chính sách đổi trả</a></li>
//        							<li><a href="#" title="Hình thức thanh toán">Hình thức thanh toán</a></li>'
//                ),
//                'FEEDBACK_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Khách hàng nói gì'
//                ),
//                'FEEDBACK_DETAIL' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' =>  'Về chúng tôi'
//                ),
//                'MAX_PRICE_FILTER' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content'  => '5000000'
//                ),
//                'FOOTER_SHIP_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Miễn phí vận chuyển'
//                ),
//                'FOOTER_SHIP_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Cho đơn hàng trên 5 triệu'
//                ),
//                'FOOTER_ENSURE_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Cam kết chính hãng'
//                ),
//                'FOOTER_ENSURE_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Đảm bảo chất lượng 100%'
//                ),
//                'FOOTER_ADVISE_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Hỗ trợ tư vấn'
//                ),
//                'FOOTER_ADVISE_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Thứ 2-Thứ 7 : 08g30 - 17g30'
//                ),
//                'FOOTER_PHONE_ORDER_TITILE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '0247 309 9966'
//                ),
//                'FOOTER_PHONE_ORDER_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Đặt hàng ngay'
//                ),
//                'NEWSLETTER_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Cập nhật thông tin khuyến mãi nhanh nhất'
//                ),
//                'PRODUCT_SUGGEST' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'GỢI Ý SẢN PHẨM NÊN MUA CÙNG BỘ'
//                ),
//                'PRODUCT_RELATED' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'MIX ĐỒ XINH'
//                ),
//                'HOME_PROMOTION_ID' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'HEADER_TOP_CONTENT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'HOME_IMG_BLOCK_1' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'HOME_IMG_BLOCK_2' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'HOME_IMG_BLOCK_3' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'HOME_IMG_BLOCK_4' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'BANNER_MAIN_TITLE_CENTER' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Free ship'
//                ),
//                'BANNER_MAIN_TITLE_RIGHT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Hộ trợ tư vấn'
//                ),
//                'TITLE_IMG_SHOP' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Hình ảnh về shop'
//                ),
//                'TITLE_FEEDBACK' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Feedback'
//                ),
//                'TITLE_MAIL_FOOTER' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'nhanh.vn@gmail.com'
//                ),
//                'TAB_CONTENT_TITLE_1' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Chi tiết sản phẩm'
//                ),
//                'TAB_CONTENT_TITLE_2' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Chọn size số'
//                ),
//                'TAB_CONTENT_TITLE_3' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Chính sách đổi trả'
//                ),
//                'RETURN_POLICY' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'STORAGE_INSTRUCTION' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'PROMOTION_ID' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'MENU_HOME_MOBILE' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<ul>
//                                    <li><a href="/">Nam</a></li>
//                                    <li><a href="/">Nữ</a></li>
//                                    <li><a href="/">Bộ sưu tập</a></li>
//                                    <li><a href="/">Công sở</a></li>
//                                </ul>'
//                ),
//                'BACKGROUND_IMAGE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'LABEL_OPEN' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'ORDER_TITLE_INDEX' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Tra cứu tình trạng đơn hàng và tích điểm của bạn'
//                ),
//                'HOTLINE_MOBILE_HEADER' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//            ),
//        ),
//        'STORES_SYSTEM' => array(
//            'name' => 'Trang hệ thống cửa hàng',
//            'keys' => array(
//                'SLIDE_STORE_DESCRIPTION' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '
//                    Với mong muốn mang đến cho khách hàng sự trải nghiệm tốt nhất khi mua sắm các sản phẩm thời trang, trong thời gian qua không ngừng mở rộng các cửa hàng trên mọi miền đất nước.
//					<br>
//					<br>
//					Năm 2019, mục tiêu của chúng tôi sẽ tiếp tục mở thêm nhiều hệ thống cửa hàng nữa để đem đến cho khách hàng những sản phẩm thời trang phù hợp với nhu cầu, giá cả tốt nhất và dịch vụ hoàn hảo.
//					<br>
//					<br>
//					Mời bạn xem một số hình ảnh sinh động tại cửa hàng.
//                    '
//                ),
//                'STORES_TITLE_1' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '60'
//                ),
//                'STORES_CONTENT_1' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '
//                    Cửa hàng<br>trên toàn quốc
//                    '
//                ),
//                'STORES_TITLE_2' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Khai trương'
//                ),
//                'STORES_CONTENT_2' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '
//                    Luôn có<br>Khuyến mãi
//                    '
//                ),
//                'TITLE_RIGHT_NEWS' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'STORES_TITLE_3' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '4000'
//                ),
//                'STORES_CONTENT_3' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '
//                    Phụ nữ được<br>phục vụ mỗi ngày
//                    '
//                ),
//                'STORES_TITLE_4' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '08:30 - 21:30'
//                ),
//                'STORES_CONTENT_4' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '
//                    Mỗi ngày<br>cả ngày lễ &amp; Chủ nhật
//                    '
//                ),
//
//            )
//        ),
//        'FOOTER' => array(
//            'name' => 'Footer website',
//            'keys' => array(
//                'FOOTER_MENU' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<ul class="instuction_footer">
//                                    <li><a href="/" title="Hướng dẫn chọn cỡ giày">Tin tức, khuyến mãi </a></li>
//                                    <li><a href="/" title="Hướng dẫn chọn cỡ giày">Hướng dẫn chọn cỡ giày</a></li>
//                                    <li><a href="/" title="Chính sách khách hàng thân thiết">Chính sách khách hàng thân thiết</a></li>
//                                    <li><a href="/" title="Chính sách đổi trả">Chính sách Đổi/Trả</a></li>
//                                    <li><a href="/" title="Thanh toán giao nhận">Thanh toán giao nhận</a></li>
//                                    <li><a href="/" title="Chính sách bảo mật">Chính sách bảo mật</a></li>
//                                    <li><a href="/" title="Giới thiệu; Liên hệ...">Các thông tin khác</a></li>
//                                </ul>'
//                ),
//                'FOOTER_MENU_TITLE' => array(
//                    'type' => ContentKey::TYPE_TEXTBOX,
//                    'content' => 'HƯỚNG DẪN MUA HÀNG'
//                ),
//                'FOOTER_ADDRESS' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'FOOTER_ADDRESS2' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'FOOTER_ADDRESS3' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'ADDRESS_LINE' => array(
//                    'type' => ContentKey::TYPE_TEXTBOX,
//                    'content' => 'Số 102 Thái Thịnh, phường Trung Liệt, quận Đống Đa, TP Hà Nội.'
//                ),
//                'CONTENT_BO_CONG_THUONG' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'LINK_BO_CONG_THUONG' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Các Sao Việt nô nức tới ủng hộ chương trình'
//                ),
//                'PARTNER_TEXT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '<span></span>'
//                ),
//                'FOOTER_1_TITLE' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'FOOTER_2_TITLE' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'FOOTER_3_TITLE' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'FOOTER_4_TITLE' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'FOOTER_1_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'FOOTER_2_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'FOOTER_3_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'FOOTER_4_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'COPYRIGHT_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<a class="design" target="_blank" href="https://nhanh.vn/" title="Thiết kế web bởi Nhanh.vn">
//                                    <img src="/img/nhanh_16x16.png" alt="Thiết kế web bởi Nhanh.vn"> Thiết kế bởi Nhanh.vn
//                                </a>'
//                ),
//            ),
//        ),
//        'PRODUCT_DETAIL' => array(
//            'name' => 'Trang chi tiết sản phẩm',
//            'keys' => array(
//                'FORGET_SIZE' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<p>Bạn không nhớ size của mình? Mời bạn xem hướng dẫn chọn size.</p>'
//                ),
//                'FORGET_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<img src="/tpl/T0198/image_team/view/sizegiay.png"/>'
//                ),
//                'FORGET_CONTENT_2' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<img src="/tpl/T0198/image_team/view/sizegiay.png"/>'
//                ),
//                'TRANSPORT_TITLE' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Sẽ có tại nhà bạn'
//                ),
//                'TRANSPORT_TIME' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Từ 1-5 ngày làm việc'
//                ),
//                'BUY_NOW' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'MUA NGAY'
//                ),
//                'UNDER_BUY_NOW' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Mua online giao hàng tận nơi'
//                ),
//                'SALE_NOW' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Nhận ngay 15% chiết khấu'
//                ),
//                'PRODUCT_TAB_DESCRIPTION' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Thông số sản phẩm'
//                ),
//                'PRODUCT_TAB_CONTENT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Chi tiết sản phẩm'
//                ),
//                'PRODUCT_TAB_VIDEO' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Video sản phẩm'
//                ),
//                'PRODUCT_TAB_COMMENT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Đánh giá sản phẩm'
//                ),
//                'TEXT_CHOOSE_SIZE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Chọn size của bạn'
//                ),
//                'ALERT_CHOOSE_SIZE_AND_COLOR' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Vui lòng chọn màu sắc hoặc kích cỡ'
//                ),
//
//                'PRODUCT_TAB_INSTRUCTIONS' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'HƯỚNG DẪN BẢO QUẢN'
//                ),
//                'PRESERVATION_INSTRUCTIONS' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Hương dẫn bảo quản đang cập nhật...'
//                ),
//                'PRODUCT_TAB_RETURN_POLICY' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'CHÍNH SÁCH ĐỔI TRẢ'
//                ),
//                'RETURN_POLICY' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Chính sách đổi trả đang cập nhật...'
//                ),
//                'TITLE_COLOR_DETAIL' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Màu sắc:'
//                ),
//                'CHAT_FACEBOOK' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'https://messenger.com/nhanh.vn/'
//                ),
//                'CHAT_ZALO' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'https://zalo.me/nhanh.vn/'
//                ),
//                'USER_LINK'=> array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '/profile'
//                ),
//                'CART_LINK'=> array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '/cart'
//                ),
//                'CHAT_MAIL' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'https://zalo.me/nhanh.vn/'
//                ),
//                'TITLE_FACEBOOK' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Chat ngay để nhận tư vấn'
//                ),
//                'TITLE_ZALO' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Chat với chung tôi qua Zalo'
//                ),
//                'TITLE_USER' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Đăng nhập | Đăng ký'
//                ),
//                'TITLE_CART'=> array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Đi tới giỏ hàng'
//                ),
//                'TITLE_MAIL' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Để lại lời nhắn cho chung tôi'
//                ),
//                'TITLE_CALL' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Gọi ngay'
//                ),
//                'HOTLINE_MOBILE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '0466.578.056'
//                ),
//                'DIRECTORY' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '129977#129978'
//                ),
//                'ID_PRODUCT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '5828764'
//                ),
//                'FACE_PAGE_HOME' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'https://www.facebook.com/VTVtoiyeu'
//                ),
//            ),
//        ),
//        'ORDER' => array(
//            'name' => 'Trang thanh toán đơn hàng',
//            'keys' => array(
//                'ORDER_SUCCESS_CART' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '
//                    <p>Mã đơn đặt hàng của bạn là <b>_MA_DON_HANG_</b><br></p>
//                    <p>Bạn sẽ sớm nhận được email đến <b class="red">_EMAIL_KHACH_HANG_</b>
//                        xác nhận thông tin đơn hàng và một đường link để kiểm tra tình trạng đơn hàng. </br>
//                        Hy vọng bạn sẽ hài lòng với sản phẩm vừa đặt mua.</p>'
//                ),
//                'LISTBANKCUSTOMER' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'INFOR_PAYMENT_TRANSFER' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'SUGGEST_SIGNUP' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<p>Đăng ký tài khoản tại <a href="/user/signup" class="text-danger">đây</a> để nhận những thông tin khuyến mại mới nhất</p>'
//                ),
//                'SHIPPING_SERVICE_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '
//                        <a><img src="tp/T0198/img/ship/viet-post.png" alt="Việt Post"></a>
//                        <a><img src="tp/T0198/img/ship/giaohang-tietkiem.png" alt="Giao hàng tiết kiệm"></a>
//                        <a><img src="tp/T0198/img/ship/giaohang-nhanh.png" alt="Giao hàng nhanh"></a>
//                    '
//                ),
//                'PAYMENT_METHOD_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '
//                        <a><img src="tp/T0198/img/payment/tien-mat.png" alt="Tiền mặt"></a>
//                        <a><img src="tp/T0198/img/payment/visa.png" alt="Visa"></a>
//                        <a><img src="tp/T0198/img/payment/mastercard.png" alt="Mastercard"></a>
//                        <a><img src="tp/T0198/img/payment/bao-kim.png" alt="Bảo Kim"></a>
//                        <a><img src="tp/T0198/img/payment/one-pay.png" alt="OnePay"></a>
//                    '
//                ),
//                'CHECKOUT_NOTE' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'CHECK_POLICY' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => 'Tôi đồng ý với <a target="_blank" style="color: #1e90ff;" href="">chính sách</a> của website'
//                ),
//                'PAYMENT_ONLINE_CUSTOM' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '
//                       <p>Ngân hàng - Chi nhánh: [TÊN NGÂN HÀNG - CHI NHÁNH]</p>
//                        <p>Số tài khoản: [ SỐ TÀI KHOẢN ] </p>
//                        <p>Chủ tài khoản: [CHỦ TÀI KHOẢN] </p>
//                        <p>&nbsp;</p>
//                        <p>&nbsp;</p>
//                        <p>&nbsp; &nbsp; &nbsp; &nbsp;</p>
//                    '
//                ),
//                'PAY_NOW_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Thanh toán khi nhận sản phẩm'
//                ),
//            )
//        ),
//        'AGENCY' => array(
//            'name' => 'Trang hệ thống đại lý',
//            'keys' => array(
//                'AGENCY_TITLE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => 'Danh sách địa chỉ các cửa hàng'
//                ),
//                'AGENCY_WORKING' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//            )
//        ),
//        'LANDING_PAGE' => array(
//            'name' => 'Landing page',
//            'keys' => array(
//                'LANDING_PRODUCT_ID' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'LANDING_MULTI_PRODUCT_ID' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'TOTAL_BUY_PRODUCT' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'LANDING_HOTLINE' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => '1900 986XXX'
//                ),
//                'LANDING_EMAIL' => array(
//                    'type' => ContentKey::TYPE_LABEL,
//                    'content' => ''
//                ),
//                'LANDING_POLICY_IMG' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'LANDING_FOOTER_1_CONTENT' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => ''
//                ),
//                'LANDING_CUSTOMERS' => array(
//                    'type' => ContentKey::TYPE_TEXTEDITOR,
//                    'content' => '<p>Nguyễn Thanh Hằng đang xem#Nguyễn Ngọc Khánh vừa mua#Tạ Văn Trường vừa mua#Nguyễn Lê Bảo Minh đang xem#Hà Anh Tuấn vừa mua#Nguyễn Phương Linh vừa mua#Đỗ Văn Đại đang xem#Trịnh Ngọc Quý đang xem#Doãn Văn Vinh vừa mua#Lại Thúy Hạnh vừa mua#Hoàng Thu Trang vừa mua#Đào Thanh Tâm vừa mua#Nguyễn Trung Kiên đang xem#Nguyễn Linh Chi đang xem#Trần Phương Thảo vừa mua</p>'
//                ),
//            )
//        ),
//    )
];

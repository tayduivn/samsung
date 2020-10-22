<?php

use Website\Model\ContentKey;

return [
    'author' => 'sonlq',
    'sourceLink' => 'https://juno.vn/ template dùng chung', //from V0298
    'domain' => [
        'storeId' => 9570,
        'name' => 'V0298.sonlqstore2.bot3s.net',
        'alias' => 'V0298.sonlqstore2.bot3s.net'
    ],
    'banners' => array(
        'IMG_CUSTOMER' => array(
            'name' => 'icon ảnh kèm theo tiêu đề Kiểm tra tích điểm',
            'description' => 'Kích cỡ 20x20',
            'size' => '20x20'
        ),
        'SLIDE_BANNER' => array(
            'name' => 'Ảnh chạy slide trang chủ',
            'description' => 'Kích cỡ 945x945',
            'size' => '945x945'
        ),
        'BANNER_TOP' => array(
            'name' => 'ảnh banner chính bên phải trên',
            'description' => 'Kích cỡ 930x468',
            'size' => '930x468'
        ),
        'BANNER_BOTTOM' => array(
            'name' => 'ảnh banner chính bên phải dưới',
            'description' => 'Kích cỡ 930x468',
            'size' => '930x468'
        ),
        'BANNER_INTRODUCE' => array(
            'name' => 'ảnh giới thiệu',
            'description' => '1600x900',
            'size' => 'auto'
        ),
        'SLIDE_BANNER_MOBILE' => array(
            'name' => 'Ảnh chạy slide trang chủ mobile',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'PRODUCT_BANNER' => array(
            'name' => 'Ảnh banner bên dưới slide trang chủ',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'LEFT_PRODUCT_BANNER' => array(
            'name' => 'Ảnh banner nằm giữa trang chủ',
            'description' => 'Kích cỡ 897x670',
            'size' => '897x670'
        ),
        'BREADCRUMB_MEMBERSHIP_PAGE' => array(
            'name' => 'Ảnh banner trang membership',
            'description' => 'Kích cỡ 1427x400',
            'size' => '1427x400'
        ),
        'BANNER_MEMBERSHIP_1' => array(
            'name' => 'Ảnh chính sách 1 trang membership',
            'description' => 'Kích cỡ 115x115',
            'size' => '115x115'
        ),
        'BANNER_MEMBERSHIP_2' => array(
            'name' => 'Ảnh chính sách 2 trang membership',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'BANNER_MEMBERSHIP_3' => array(
            'name' => 'Ảnh chính sách 3 trang membership',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'BANNER_MEMBERSHIP_4' => array(
            'name' => 'Ảnh chính sách 4 trang membership',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'BANNER_POLICY_PVIEW' => array(
            'name' => 'Phần chính sách trang chi tiết sản phẩm',
            'description' => 'Kích cỡ 20x20',
            'size' => '20x20'
        ),
        'BANNER_POPUP' => array(
            'name' => 'Banner popup trang chủ',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'BANNER_STORE_FOOTER' => array(
            'name' => 'Ảnh hệ thống cửa hàng footer',
            'description' => 'Kích cỡ 1500x250',
            'size' => '1500x250'
        ),
        'BANNER_PRODUCT_MID' => array(
            'name' => 'Ảnh banner sản phẩm giữa home',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'BANNER_PRODUCT_BOT' => array(
            'name' => 'Ảnh banner sản phẩm cuối home',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'BANNER_CHECKOUT_OPTION' => array(
            'name' => 'Danh sách cửa hàng',
            'description' => '',
            'size' => 'auto'
        ),
        'BANNER_FEEDBACK' => array(
            'name' => 'Banner feedback của khách hàng',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'BANNER_NEWS_TOP_MOBILE' => array(
            'name' => 'Banner ở đầu trang news cho mobile',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'BANNER_NEWS_RIGHT_TOP' => array(
            'name' => 'Banner trên cùng - bên phải trang news',
            'description' => '346.66 x 600',
            'size' => '346.66 x 600'
        ),
        'BANNER_NEWS_RIGHT_CENTER' => array(
            'name' => 'Banner trên ở giữa - bên phải trang news',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'BANNER_NEWS_BOTTOM' => array(
            'name' => 'Banner ở cuối trang news',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'LANDING_HEADER' => array(
            'name' => 'Landing - header',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'LANDING_GALLERY_1' => array(
            'name' => 'Landing - bộ sưu tập 1',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'LANDING_GALLERY_2' => array(
            'name' => 'Landing - bộ sưu tập 2',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'LANDING_SLIDE_1' => array(
            'name' => 'Landing - slide ảnh 1',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'LANDING_SLIDE_2' => array(
            'name' => 'Landing - slide ảnh 2',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'LANDING_TEXT' => array(
            'name' => 'Landing - banner giới thiệu kèm ảnh',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'LANDING_INFO' => array(
            'name' => 'Landing - nội dung footer',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'PRODUCT_BANNER_LEFT' => array(
            'name' => 'Banner bên trái dưới banner trang chủ',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'PRODUCT_BANNER_RIGHT' => array(
            'name' => 'Banner bên phải dưới banner trang chủ',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'BANNER_IMAGE_POPUP' => array(
            'name' => 'Banner ảnh popup đăng nhập',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'PRODUCT_WHOLE_BANNER' => array(
            'name' => 'Ảnh banner bên dưới banner chính trang buôn( Check riêng doanh nghiệp)',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'PRODUCT_WHOLE_BANNER_LEFT' => array(
            'name' => 'Banner bên trái dưới banner chính trang buôn( Check riêng doanh nghiệp)',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
        'PRODUCT_WHOLE_BANNER_RIGHT' => array(
            'name' => 'Banner bên phải dưới banner chính trang chủ( Check riêng doanh nghiệp)',
            'description' => 'Kích cỡ auto',
            'size' => 'auto'
        ),
    ),
    'contents' => array(
        'HOME' => array(
            'name' => 'Trang chủ',
            'keys' => array(
                'META_TITLE' => array(
                    'type' => ContentKey::TYPE_META_TITLE,
                    'content' => 'Nhanh.vn'
                ),
                'META_DESCRIPTION' => array(
                    'type' => ContentKey::TYPE_META_DESCRIPTION,
                    'content' => 'Phần mềm quản lý bán hàng Nhanh.vn giúp bạn dễ dàng quản lý kho hàng, đơn hàng, khách hàng, tiết kiệm thời gian, tăng doanh thu, giảm chi phí cho việc quản lý cửa hàng'
                ),
                'META_KEYWORDS' => array(
                    'type' => ContentKey::TYPE_META_KEYWORDS,
                    'content' => 'Phần mềm quản lý bán hàng'
                ),
                'SOCIAL_FACEBOOK' => array(
                    'type' => ContentKey::TYPE_SOCIAL_FACEBOOK,
                    'content' => 'https://www.facebook.com/nhanh.vn'
                ),
                'SOCIAL_YOUTUBE' => array(
                    'type' => ContentKey::TYPE_SOCIAL_YOUTUBE,
                    'content' => ''
                ),
                'SOCIAL_INSTAGRAM' => array(
                    'type' => ContentKey::TYPE_SOCIAL_INSTAGAM,
                    'content' => ''
                ),
                'SOCIAL_ZALO' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'SOCIAL_TWITTER' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'SOCIAL_GOOGLE_PLUS' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'HOTLINE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => '0247.309.9966'
                ),
                'SECOND_HOTLINE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'ZALO_NUMBER' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => '0123456789'
                ),
                'ADDRESS' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Số 102 Thái Thịnh, Phường Trung Liệt, Quận Đống Đa, Hà Nội'
                ),
                'EMAIL' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'contact@nhanh.vn'
                ),
                'FAX' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => '0247.309.9966'
                ),
                'PAYMENT_METHOD' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'POLICY_SHIP' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'AGENCY_WORKING' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => '8h-17h30'
                ),
                'HOT_LINE_TITLE' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => 'Hotline'
                ),
                'PROMOTION_TOP_CONTENT' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => ''
                ),
                'FEEDBACK_TITLE' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => ''
                ),
                'TOP_SYSTEM_STORE' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => 'Hệ thống <b>96</b> cửa hàng'
                ),
                'MAPS' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => '
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5497788272964!2d105.81617031436815!3d21.01067699377253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7d58d6ec3d%3A0x2679fe35efef4ebf!2zMTAyIFRow6FpIFRo4buLbmgsIFRydW5nIExp4buHdCwgxJDhu5FuZyDEkGEsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1502875894822" width="100%" height="400px" frameborder="0" style="border:0" allowfullscreen></iframe>
                    '
                ),
                'PRICE_CONTACT' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Liên hệ'
                ),
                'PROMOTION_ID' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'HOME_NEW_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Sản phẩm mới'
                ),
                'HOME_PRODUCT_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Sản phẩm trang chủ'
                ),
                'HOT_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Sản phẩm hot'
                ),
                'BEST_SELLER_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Sản phẩm bán chạy'
                ),
                'HOME_NEWS_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Tin tức'
                ),
                'HOME_ALBUM_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Album'
                ),
                'COPY_RIGHT' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => ''
                ),
                'DISCOUNT_PRODUCT_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Sản phẩm khuyến mại'
                ),
                'MIDDLE_PRODUCT_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Trào lưu không thể bỏ lỡ'
                ),
                'MIDDLE_PRODUCT_SUB_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Phụ kiện không thể thiếu của bất kỳ bạn nào muốn biến bộ trang phục của mình trở nên cá tính...'
                ),
                'STORE_FOOTER_1_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'GỌI MUA HÀNG ( 08:30-21:30 )'
                ),
                'STORE_FOOTER_1_HOTLINE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => '1100 2468'
                ),
                'STORE_FOOTER_1_SUBTITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Tất cả các ngày trong tuần'
                ),
                'STORE_FOOTER_2_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'GÓP Ý, KHIẾU NẠI ( 08:30-20:30 )'
                ),
                'STORE_FOOTER_2_HOTLINE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => '1101 3579'
                ),
                'STORE_FOOTER_2_SUBTITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Các ngày trong tuần ( trừ ngày lễ )'
                ),
                'POLICY_1' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<h5>MIỄN PHÍ GIAO HÀNG TOÀN QUỐC</h5>
                                  <span>(Sản phẩm trên 300,000đ)</span>'
                ),
                'POLICY_2' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<h5>ĐỔI TRẢ DỄ DÀNG</h5>
                                  <span>(Đổi trả 90 ngày cho Giày và 30 ngày cho Túi)</span>'
                ),
                'POLICY_3' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<h5>TỔNG ĐÀI BÁN HÀNG 1800 1162</h5>
                                  <span>(Miễn phí từ 8h30 - 21:30 mỗi ngày)</span>'
                ),
                'FOOTER_1_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'HỖ TRỢ KHÁCH HÀNG'
                ),
                'FOOTER_1_CONTENT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '
                        <ul>
                            <li><a href="">Hướng dẫn chọn size</a></li>
                            <li><a href="">Chính sách khách hàng thân thiết</a></li>
                            <li><a href="">Chính sách đổi/Trả</a></li>
                            <li><a href="">Chính sách bảo mật</a></li>
                            <li><a href="">Thanh toán, Giao nhận</a></li>
                            <li><a href="">Câu hỏi thường gặp</a></li>
                        </ul>
                    '
                ),
                'FOOTER_2_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'VỀ CHÚNG TÔI'
                ),
                'FOOTER_2_CONTENT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '
                        <ul>
                            <li><a href="">Giới thiệu</a></li>
                            <li><a href="">Liên hệ</a></li>
                            <li><a href="">Tìm đại lý</a></li>
                        </ul>
                    '
                ),
                'FOOTER_3_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'HỆ THỐNG CỬA HÀNG'
                ),
                'FOOTER_3_CONTENT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '
                        <ul>
                            <li><a href="" class="a-link">Facebook</a></li>
                            <li><a href="" class="a-link">Pinterest</a></li>
                            <li><a href="" class="a-link">Instagram</a></li>
                            <li><a href="" class="a-link">Spotify</a></li>
                        </ul>
                    '
                ),
                'MIDDLE_PRODUCT_TITLE_LINK' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'FOOTER_4_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'FANPAGE CHÚNG TÔI'
                ),
                'FOOTER_4_CONTENT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '
                        <ul>
                            <li><a href="">Giới thiệu</a></li>
                            <li><a href="">Blog</a></li>
                            <li><a href="">Những câu hỏi thường gặp</a></li>
                            <li><a href="">Đổi trả và giao hàng</a></li>
                            <li><a href="">Liên hệ</a></li>
                        </ul>
                    '
                ),
                'FOOTER_5_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'FANPAGE CHÚNG TÔI'
                ),
                'COMPANY_DESC_FOOTER' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => ''
                ),
                'CUSTOMERS' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<p>Lê Thị Đào đang xem#Nguyễn Ngọc Khánh vừa mua#Tạ Văn Trường vừa mua#Nguyễn Lê Bảo Minh đang xem#Hà Anh Tuấn vừa mua#Nguyễn Phương Linh vừa mua#Đỗ Văn Đại đang xem#Trịnh Ngọc Quý đang xem#Doãn Chí Bình vừa mua#Lại Thúy Hạnh vừa mua#Hoàng Thu Trang vừa mua#Đào Thanh Tâm vừa mua#Nguyễn Trung Kiên đang xem#Nguyễn Linh Chi đang xem#Trần Phương Thảo vừa mua</p>'
                ),
                'SHOPEE_LINK' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'TIKTOK_LINK' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'LAZADA_LINK' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'SENDO_LINK' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'MAX_PRICE_FILTER' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content'  => '3000000'
                ),
                'PRODUCT_VIEW' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Xem chi tiết'
                ),
                'PRODUCT_CART' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Mua nhanh'
                ),
                'POLICY_LINK_SHIPPING' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'POLICY_SHIPPING' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<h3>Miễn phí vận chuyển</h3>
                                  <span>POLICY_TITLE_SHIP POLICY_TITLE_SHIP POLICY_TITLE_SHIP</span>'
                ),
                'POLICY_LINK_SWAPT' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'POLICY_SWAPT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<h3>Đổi hàng miễn phí</h3>
                                  <span>POLICY_TITLE_SHIP POLICY_TITLE_SHIP POLICY_TITLE_SHIP</span>'
                ),
                'POLICY_LINK_SUPPORT' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'POLICY_SUPPORT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<h3>Hỗ trợ tư vấn miễn phí</h3>
                                  <span>POLICY_TITLE_SHIP POLICY_TITLE_SHIP POLICY_TITLE_SHIP</span>'
                ),
                'POP_UP_BUTTON_LEFT_LINK' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => '#'
                ),
                'POP_UP_BUTTON_LEFT_LABEL' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Khuyến mãi'
                ),
                'POP_UP_BUTTON_RIGHT_LINK' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => '#'
                ),
                'POP_UP_BUTTON_RIGHT_LABEL' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Bộ sưu tập'
                ),
                'STORE_SERVICE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => '
                    '
                ),
                'STORE_SERVICE_LINK' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'LIST_SERVICE_STORE' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<ul>
                                     <li><a href="#">Giới thiệu</a></li>
                                     <li><a href="#">Phương thức thanh toán</a></li>
                                     <li><a href="#">Phương thức giao hàng</a></li>
                                     <li><a href="#">Chính sách bảo mật</a></li>
                                     <li><a href="#">Quy định đổi trả</a></li>
                                     <li><a href="#">Chính sách bán sỉ</a></li>
                                     <li><a href="#">Địa chỉ cửa hàng</a></li>
                                     <li><a href="#">Liên hệ phản hồi</a></li>
                                  </ul>
                    '
                ),
                'SUPPORT_CUSTOMER_LINK' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'LIST_SUPPORT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<ul>
                                     <li><a href="/order/search">Tra cứu đơn hàng</a></li>
                                     <li><a href="#">Hướng dẫn mua hàng</a></li>
                                     <li><a href="#">Hướng dẫn chọn size</a></li>
                                     <li><a href="#">Bí quyết & mẹo vặt</a></li>
                                  </ul>
                    '
                ),
                'ALBUM_FEEDBACK_ID' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => '5685'
                ),
                'ALBUM_FEEDBACK_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Our Feedback'
                ),
                'IFRAME_NEWS' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'LINK_RECRUIT' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => '#'
                ),
                'SALEOFF_HEADER' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => '$2 + 5% OFF'
                ),
                'LIST_HEADER_RIGHT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '
                    <li><a href="#">NOTICE</a></li>
                    <li><a href="#">REVIEW</a></li>
                    <li><a href="#">WEEKLY TOP 10</a></li>
                    <li><a href="#">1:1 Q &amp; A</a></li>'
                ),
                'NOTE_STATUS' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '
                    <p><b><i class="fa fa-2x fa-lightbulb-o" style="color: #f37021"></i> Chú thích trạng thái đơn hàng:</b></p>
                                    <p><b>- "Mới":</b>  Chúng tôi đang trong quá trình liên hệ bạn để xác nhận đơn hàng. </p>
                                    <p><b>- "Đang đóng gói":</b> Chúng tôi đang tiến hành đóng gói và gửi hàng cho bạn.</p>
                                    <p><b>- "Chờ đi nhận":</b> Hãng vận chuyển đang tới lấy hàng, khi nào hãng lấy hàng xong sẽ có mã bưu phẩm cho bạn kiểm tra lịch trình.</p>
                                    <p><b>- "Đang chuyển":</b> Hãng vận chuyển đang trong quá trình xử lý và giao hàng cho bạn đó.</p>
                                    <p><b>- "Thất bại":</b> Bưu tá phát đến địa chỉ khách hàng nhưng thất bại do không liên lạc được với bạn/ không tìm thấy địa chỉ.</p>
                                    <p><b>- "Đang chuyển hoàn/ Đã chuyển hoàn":</b> Đơn hàng sau 3 lần phát không thành công, sẽ hoàn về cho chúng tôi.</p>
                                    <p><b>- "Thành công":</b> Bạn đã nhận được hàng rồi, đừng quên góp ý cho chúng tôi về đơn hàng của bạn nhé.</p>'
                ),
                'PAGE_FACEBOOK_LINK' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'PAGE_FACEBOOK_COLOR' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'rgb(0, 132, 255)'
                ),
                'WHOLESALE_CATEGORY_ID' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'CUSTOM_FILTER_PRICE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
            )
        ),
        'PRODUCT_PAGE' => array(
            'name' => 'Trang chi tiết sản phẩm',
            'keys' => array(
                'BTN_BUYNOW_TEXT' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Thêm vào giỏ hàng'
                ),
                'BTN_BUYNOW_TEXT_SMALL' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'BTN_BUYNOW_BACKGROUND' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'SIZE_GUIDE_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Hướng dẫn chọn size'
                ),
                'SIZE_GUIDE_CONTENT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<p>Hướng dẫn chọn size</p>'
                ),
                'RETURN_POLICY_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Chính sách đổi trả'
                ),
                'RETURN_POLICY_CONTENT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => ''
                ),
                'PRESERVATION_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Hướng dẫn bảo quản'
                ),
                'RESERVATION_CONTENT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => ''
                ),
                'LOYALTY_POLICY_TITLE' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Chính sách khách hàng thân thiết'
                ),
                'LOYALTY_POLICY_CONTENT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => ''
                ),
                'STORE_INVENTORY' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => '37 cửa hàng còn sản phẩm này'
                ),
                'SIZE_LABEL' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'kích thước'
                ),
                'ADD_CART_BUTTON' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Thêm vào giỏ hàng'
                ),
                'BUY_NOW_BUTTON' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Mua ngay'
                ),
                'CATEGORY_ID' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'PROMOTION_HOURS_END' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'PROMOTION_CONTENT' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Thời gian ưu đãi còn'
                ),
                'TITLE_PRODUCT_SPECIFICATIONS' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Thông số sản phẩm'
                ),
                'TITLE_PRODUCT_CONTENT' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => 'Nội dung sản phẩm'
                ),
            )
        ),
        'CONTACT_PAGE' => array(
            'name' => 'Trang liên hệ',
            'keys' => array(
                'INFO_CONTACT_CONTENT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '
                        <ul>
                            <li>
                                <p>Địa chỉ chúng tôi</p>
                                <p><strong>13 Nguyễn Thị Định, Phường Tân Phú, Quận 7, Tp. Hồ Chí Minh.</strong></p>
                            </li>
                            <li>
                                <p>Email chúng tôi</p>
                                <p><strong>cskh@support.vn</strong></p>
                            </li>
                            <li>
                                <p>Điện thoại</p>
                                <p><strong>1800 xxxx</strong></p>
                            </li>
                            <li>
                                <p>Thời gian làm việc</p>
                                <p><strong>Thứ 2 đến Thứ 6 từ 8h30 đến 17h30</strong></p>
                            </li>
                        </ul>
                    '
                ),
            )
        ),
        'ORDER_CART_CHECKOUT' => array(
            'name' => 'Trang thanh toán',
            'keys' => array(
                'NOTICE_CHECKOUT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '
                        Chúng tôi sẽ XÁC NHẬN đơn hàng bằng TIN NHẮN SMS hoặc GỌI ĐIỆN. Bạn vui lòng kiểm tra TIN NHẮN hoặc NGHE MÁY ngay khi đặt hàng thành công và CHỜ NHẬN HÀNG
                    '
                ),
                'NOTICE_CHECKOUT_BEFORE' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => ''
                ),
                'PAYMENT_ONLINE_CUSTOMER' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '
                        <p>Thanhn toán khi nhận hàng</p>
                    '
                ),
                'ORDER_SUCCESSFUL' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<p>
								            Chúc mừng quý khách hàng đã thanh toán thành công đơn hàng ORDER_ID tại nhanh.vn.
											Nhân viên chăm sóc khách hàng của chúng tôi sẽ liên hệ với quý khách hàng khi đơn hàng được xác nhận. <br>
											Chúng tôi sẽ gửi link theo dõi đơn hàng đến Email của quý khách hàng.
								        </p>
								        <p>
								            Quý khách hàng cũng có thể theo dõi đơn hàng bằng cách đăng nhập và theo dõi đơn hàng trên website của chúng tôi
								        </p>'
                ),
                'ORDER_SUCCESSFUL_TITLE' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => 'Đơn hàng được thực hiện thành công!'
                ),
                'ALERT_CHECKOUT' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => ''
                ),
                'TRANSFER_INFORMATION' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => ''
                ),
                'DESCRIPTION_ORDER' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => 'Cửa hàng nhận hàng:'
                ),
                'CHECKOUT_STORE_LINK' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => 'https://nhanh.vn/'
                ),
                'PAYMENT_METHOD_TITLE' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => 'Phương thức thanh toán'
                ),
                'PAYMENT_METHOD_COD' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => 'Thanh toán khi nhận hàng (COD)'
                ),
                'PAYMENT_METHOD_COD_DESCRIPTION' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => ''
                ),
                'PAYMENT_METHOD_STORE' => array(
                    'type' => ContentKey::TYPE_TEXTBOX,
                    'content' => 'Mua hàng tại cửa hàng - Thanh toán tại cửa hàng'
                ),
                'MOBILE_INFO_CONTENT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => ''
                ),
            )
        ),
        'MEMBERSHIP_PAGE' => array(
            'name' => 'Trang khách hàng',
            'keys' => array(
                'MEMBERSHIP_CONTENT_1' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<p>Cùng nhiều chương trình và ưu đãi hấp dẫn khác dành riêng cho thành viên.</p>'
                ),
                'MEMBERSHIP_CONTENT_2' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '
                        <ul>
                            <li>Tài khoản Thành Viên được quản lý và cập nhật theo <b>số điện thoại</b></li>
                            <li>Thành viên được xếp hạng dựa vào chi tiêu tích lũy khi mua sắm tại cửa hàng hoặc
                                online trong vòng 12 tháng (kể từ ngày đăng ký hoặc ngày thay đổi hạng thành
                                viên gần nhất).
                            </li>
                        </ul>
                    '
                ),
                'MEMBERSHIP_MOBILE_CONTENT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '
                        <p><img src="/tpl/V0298/img/tmp/member_ship_mobile.jpg"/></p>
                    '
                ),
                'FAQ_LARGE_TITLE' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '
                        <p><img src="/tpl/V0298/img/tmp/faq_pc.jpg" alt=""></p>
                    '
                ),
                'MEMBERSHIP_FAQ_CONTENT' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => ''
                ),
                'ADDRESS_INFOR' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<p>
                                    <b>Địa chỉ:</b>
                                    <span>21 Đại Cồ Việt, q.Hai Bà Trưng, Hà Nội</span>
                                </p>
                                <p>
                                    <b>Hotline:</b>
                                    <span>043.1234.567</span>
                                </p>
                                <p>
                                    <b>Giờ mở cửa:</b>
                                    <span>9.00 A.M - 22.00 P.M</span>
                                </p>'
                ),
                'STORE_NAME' => array(
                    'type' => ContentKey::TYPE_LABEL,
                    'content' => ''
                ),
                'NOTICE_CUSTOMER' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => ''
                ),
            )
        ),
        'LANDING_PAGE' => array(
            'name' => 'Trang landingpage',
            'keys' => array(
                'LANDING_FOOTER_1' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<h3>Hệ thống cửa hàng</h3>
                        <p><a href="">Xem hệ thống cửa hàng của chúng tôi</a></p>'
                ),
                'LANDING_FOOTER_2' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<h3>Hotline</h3>
                        <p><a href="">1900xxxx</a></p>'
                ),
                'LANDING_FOOTER_3' => array(
                    'type' => ContentKey::TYPE_TEXTEDITOR,
                    'content' => '<h3>Fanpage</h3>
                        <p><a href="">https://www.facebook.com/nhanhvn</a></p>'
                ),
            )
        ),
    )
];

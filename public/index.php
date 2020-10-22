<?php
// check ảnh, file không tồn tại thì exit luôn, tránh phải xử lý với các link 404
$staticSrcs = ['/cdn/', '/js/', '/css/', '/images/', '/img/', '/font/', '/fonts/', '/tp/', '/min/'];
if (isset($_SERVER['REQUEST_URI']) && $_SERVER['REQUEST_URI']) {
    foreach ($staticSrcs as $staticSrc) {
        if (substr($_SERVER['REQUEST_URI'], 0, strlen($staticSrc)) == $staticSrc) {
            echo '<h1 style="text-align: center">404</h1>';
            echo '<h2 style="text-align: center">Nội dung không tồn tại</h2>';
            echo '<h3 style="text-align: center"><a href="/" style="text-decoration: underline;color: #0078d7;">Trở về trang chủ</a></h3>';
            http_response_code(404);
            die;
        }
    }
}
echo "Store Templates";
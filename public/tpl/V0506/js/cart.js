$(document).ready(function() {
    $('.updateCart').change(function () {
        var products = [
            {id: $(this).attr('data-id'), quantity: $(this).val()}
        ];
        addToCart(products, 2, function (rs) {
            location.reload();
        });
    });
    $('.removeCart').click(function(){
        var psId = $(this).attr('data-id');
        if(psId > 0){
            removeCart(psId);
        }
    });
});
/*** CART SCRIPT ***/
function removeCart(prodId) {
    var check = confirm('Bạn muốn xóa sản phẩm ra khỏi giỏ hàng ?');
    if(check) {
        $.post(
            '/cart/remove',
            {'psId' : prodId},
            function(rp){
                window.location.reload();
            }
        );
    }
}
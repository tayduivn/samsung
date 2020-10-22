$(function () {
    $('#searchauto').submit(function(e){
        e.preventDefault();
        window.location = `/search?q=${$('#searchtext').val()}&type=product`;
    })

    function showSearch() {
        var box1 = document.querySelector('.search-form-wrapper');
        var outside1 = function(event) {
            if (!box1.contains(event.target)) {
                $(".search-form-wrapper").removeClass('active');
                $('#searchtext').val('');
                $('#search_smart #product').html('');
                $('#search_smart #article').html('');
                this.removeEventListener(event.type, outside1);
            }
        }
        document.querySelector('#show_search_smart').addEventListener('click', function(event){
            event.preventDefault();
            event.stopPropagation();
            $(".search-form-wrapper").toggleClass('active');
            document.addEventListener('click', outside1);
        });
    }

    showSearch();
})



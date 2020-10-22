$(document).ready(function () {
    $('body').addClass('collection');

    $('.filter-item').click(function () {
        location.href = $(this).attr('data-filter')
        // appendSearch()
    })
});
$(function () {
    $('#searchauto').submit(function(e){
        e.preventDefault();
        window.location = `/search?q=${$('#searchtext').val()}&type=product`;
    })
})



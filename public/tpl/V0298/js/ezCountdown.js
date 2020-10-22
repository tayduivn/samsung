$(function () {
    var endTime = $('.enddate').val() + ' ' + $('.endtime').val();
    $('#coutnDown').npyScorecount({
        endDate: endTime,
        displayDays: true,
        gmt: '+0700',
        startDate: new Date(),
        imageCounter: false,
        digitSize: [50, 70],
        tokens: ['<li><b class="days"></b><p class="smalltext">Ngày</p></li>', '<li><b class="hours"></b><p class="smalltext">Giờ</p></li>', '<li><b class="minutes"></b><p class="smalltext">Phút</p></li>', '<li><b class="seconds"></b><p class="smalltext">Giây</p></li>'],
        tokens: ['']
    });
});
$(function () {
    if ($('.endDateTime').length) {
        // Grab the current date
        var currentDate = new Date($('.endDateTime').val());

        // Set some date in the past. In this case, it's always been since Jan 1
        var pastDate  =  new Date();
        // Calculate the difference in seconds between the future and current date
        var diff = currentDate.getTime() / 1000 - pastDate.getTime() / 1000;

        clock = $('.clock').FlipClock(diff, {
            clockFace: 'DailyCounter',
            autoStart: false,
        });

        clock.setTime(diff);
        clock.setCountdown(true);
        clock.start();
    }
})
/***********************************************************************************************************
 * 1npy0 Scorecount 1.0.0 (https://github.com/1npy0/npy-scorecount)
 * Developed by Inpyo Jeon (inpyoj@gmail.com)
 * Images used for the sample page are designed by Ga Ae Lim.
 ***********************************************************************************************************/


function datetimeParse(str) {
    if (typeof str == 'number') str = str.toString();
    var strParse = (typeof str == 'string') ? (str.length == 14) ? [parseInt(str.substring(0,4)),parseInt(str.substring(4,6)),parseInt(str.substring(6,8)),parseInt(str.substring(8,10)),parseInt(str.substring(10,12)),parseInt(str.substring(12,14))] : str.split(/\D/) : str;
    return (typeof str == 'string') ? new Date(strParse[0],strParse[1]-1,strParse[2],strParse[3],strParse[4],strParse[5]) : str;
}


function gmtParse(date, gmt) {
    var gmtOperator = (gmt) ? gmt.substring(0,1) : '+'; // GMT 연산자 추출
    var gmtApply = (gmt) ? (parseInt(gmt.substring(1,3))*60 + parseInt(gmt.substring(3,5)))*60000 : 0; // GMT 시분 추출 및 환산 합계
    var gmtZero = (gmtOperator == '+') ? new Date(date*1 - gmtApply) : new Date(date*1 + gmtApply); // GMT 기준시 환산 (Psuedo)
    var gmtDate = new Date();


    gmtDate.setUTCFullYear(gmtZero.getFullYear());
    gmtDate.setUTCMonth(gmtZero.getMonth());
    gmtDate.setUTCDate(gmtZero.getDate());
    gmtDate.setUTCHours(gmtZero.getHours());
    gmtDate.setUTCMinutes(gmtZero.getMinutes());
    gmtDate.setUTCSeconds(gmtZero.getSeconds());

    return gmtDate;
}

var countTitle = 'Kết thúc khuyến mại sau:';
if (window.innerWidth < 380) {
    var countTitle = 'Thời gian:';
}
else if (window.innerWidth < 1024) {
    var countTitle = 'Kết thúc sau:';
}
(function($) {
    $.fn.npyScorecount = function(options) {
        var obj = $(this);
        var opt = $.extend({
            startDate: new Date(),
            endDate: '',
            gmt: '',
            displayDays: true,
            imageCounter: false,
            digitSize: [100, 140],
            tokens: ['&nbsp;', ':', ':', '&nbsp;Left.']
        }, options);

        var $now = datetimeParse(opt.startDate);
        var $end = (opt.endDate) ? gmtParse(datetimeParse(opt.endDate), opt.gmt) : $now; // 종료 시점 파싱

        var remain = Math.floor(($end - $now) / 1000);
        var remainStr = ''; // 값 변화 캐치를 위한 임시 변수
        var flipDuration = 50; // 플립 애니메이션 시간 (단위: 밀리초)
        var $digitWidth = opt.digitSize[0]; // 스코어보드 카드 너비
        var $digitHeight = opt.digitSize[1]; // 스코어보드 카드 높이
        var $responsive = (typeof opt.digitSize[0] == 'string'); // 크기 옵션 값이 퍼센트 형식 입력일 때 반응형으로 전환

        tic(); // 틱 활성화

        function tic() {
            var remainDays = (opt.displayDays) ? Math.floor(remain/60/60/24) : ''; // 남은 일수
            var remainHours = (opt.displayDays) ? Math.floor(remain/60/60%24) : Math.floor(remain/60/60); // 남은 시간
            var remainMinutes = Math.floor(remain/60%60); // 남은 분
            var remainSeconds = Math.floor(remain%60); // 남은 초

            countdown(remainDays, remainHours, remainMinutes, remainSeconds); // 카운터 출력

            if (remain > 0) remain--; // 남은 시간 감소
            setTimeout(tic, 1000); // 1초 주기 틱 재귀
        }

        function countdown(d, h, m, s) { // 카운트다운 출력
            if (opt.imageCounter) { // 이미지 카운터 출력 활성화시
                var str = d + addZero(h) + addZero(m) + addZero(s); // 남은 시간을 'D+HHMMSS' 스트링 형식으로 저장

                if (remainStr.length == 0) initScoreboard(str.length); // 이미지 카운터 스코어보드 생성

                for (var i=0; i<str.length; i++) {
                    if (str[i] != remainStr[i]) flip(str[i], i); // 스코어카드 플리핑 애니메이션
                }

                remainStr = str; // 임시 변수에 날짜 및 시간 스트링 저장
            } else { // 이미지 카운터 출력 비활성화시
                var days = (opt.displayDays) ? d + opt.tokens[0] : ''; // 날짜 표기시 해당 토큰 추가
                obj.html('<li><b class="days">' + days + '</b><p class="smalltext">Ngày</p></li>' + '<li><b class="hours">' + addZero(h) + '</b><p class="smalltext">Giờ</p></li>' + '<li><b class="minutes">' + addZero(m) + '</b><p class="smalltext">Phút</p></li>'+ '<li><b class="seconds">' + addZero(s) + '</b><p class="smalltext">Giây</p></li>');
                // obj.html('<div><span class="days">' + days + '</span><div class="smalltext">Ngày</div></div>' + '<div><span class="hours">' + addZero(h) + '</span><div class="smalltext">Giờ</div></div>' + '<div><span class="minutes">' + addZero(m) + '</span><div class="smalltext">Phút</div></div>' + '<div><span class="seconds">' + addZero(s) + '</span><div class="smalltext">SECONDS</div></div>');
            }
        }

        function initScoreboard(length) { // 스코어보드 생성
            obj.append('<div class="npy-scwrap"></div>'); // 스코어보드 랩 생성

            for (var i=0; i<length; i++) {
                obj.find('.npy-scwrap').append('<div class="npy-scdigit _' + i + '"><div class="npy-scdigit-curr"></div><div class="npy-scdigit-flip"></div><div class="npy-scdigit-prev"></div></div>');
            } // 스코어보드 카드 생성

            for (var j=(opt.displayDays)?3:2; j>=0; j--) { // 날짜 표기시 해당 토큰 추가
                var token = '<span class="npy-tokens _' + i + '">' + opt.tokens[3-j] + '</span>';
                $(token).insertAfter(obj.find('.npy-scdigit').eq(length-j*2-1));
            }

            obj.find('.npy-scwrap').css({ position: 'relative' });
            obj.find('.npy-scdigit').css({ position: 'relative', width: $digitWidth, height: $digitHeight, backgroundImage: 'url(sc_digits.png)', backgroundSize: '1100%', backgroundPositionX: ($responsive) ? '100%' : $digitWidth*(-10), backgroundPositionY: 0, backgroundRepeat: 'no-repeat', display: 'inline-block', verticalAlign: 'middle' });
            obj.find('.npy-scdigit > div').css({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url(sc_digits.png)', backgroundSize: '1100%', backgroundPositionX: 0, backgroundRepeat: 'no-repeat', display: 'inline-block' });
            obj.find('.npy-scdigit-curr').css({ backgroundPositionY: 0, zIndex: 10 });
            obj.find('.npy-scdigit-flip').css({ backgroundPositionY: 0, zIndex: 20 });
            obj.find('.npy-scdigit-prev').css({ backgroundPositionY: ($responsive) ? '70%' : $digitHeight * (-7), zIndex: 10 });
            obj.find('.npy-tokens').css({ display: 'inline-block', verticalAlign: 'middle' });
        }

        function flip(str, i) { // 플립 시퀀스
            obj.find('.npy-scdigit').eq(i).find('.npy-scdigit-curr').css({ backgroundPositionX: ($responsive) ? str * 10 + '%' : str * $digitWidth * (-1) }); // 뒷장 변경

            flipper(i, 1); // 플립 애니메이션

            setTimeout(function() {
                obj.find('.npy-scdigit').eq(i).find('.npy-scdigit-flip').css({ backgroundPositionX: ($responsive) ? str * 10 + '%' : str * $digitWidth * (-1) }); // 플립 실행
            }, flipDuration*3); // 4번째 애니메이션 프레임에서 숫자 변경

            setTimeout(function() {
                obj.find('.npy-scdigit').eq(i).find('.npy-scdigit-prev').css({ backgroundPositionX: ($responsive) ? str * 10 + '%' : str * $digitWidth * (-1) }); // 앞장 변경
            }, flipDuration*6); // 7번째 애니메이션 프레임에서 숫자 변경
        }

        function flipper(i, flipcnt) { // 플립 애니메이션
            if (flipcnt < 7) obj.find('.npy-scdigit').eq(i).find('.npy-scdigit-flip').css({ backgroundPositionY: ($responsive) ? flipcnt * 10 + '%' : flipcnt * $digitHeight * (-1) });
            else obj.find('.npy-scdigit').eq(i).find('.npy-scdigit-flip').css({ backgroundPositionY: 0 }); // 0번 프레임으로 복귀

            setTimeout(function() {
                if (flipcnt < 8) flipper(i, flipcnt+1); // 플립 재귀
                else flipcnt = 0; // 플립 카운터 초기화
            }, flipDuration);
        }

        function addZero(num) { // 10의 자리 숫자가 없을 때 임의로 0을 추가하여 스트링 값으로 반환
            return (num < 10) ? '0' + num : num;
        }

        return this;
    };
})(jQuery);

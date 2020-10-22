/**
 * Copyright Nhanh company.
 *
 * https://nhanh.vn
 */
try {
    (function (window) {
        var document = window.document;

        // browser compatibility: get method for event
        // addEventListener(FF, Webkit, Opera, IE9+) and attachEvent(IE5-8)
        var myEventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        // create event listener
        var myEventListener = window[myEventMethod];
        // browser compatibility: attach event uses onmessage
        var myEventMessage = myEventMethod == "attachEvent" ? "onmessage" : "message";

        var elements = document.getElementsByClassName('nhanh-call-product');
//        var callUrl = "http://api.hoangth.store.dev.nhanh.vn/api/product/embedui";
		var callUrl = "http://api.store.nhanh.vn/api/product/embedui";

        if (elements.length) {
            var t = elements[0], j, cn = "?";
            for (j = 0; j < t.attributes.length; j++) {
                if (t.attributes[j].name.indexOf("data-") > -1) {
                    callUrl += cn + t.attributes[j].name.replace("data-", "") + "=" + t.attributes[j].value;
                    cn = "&";
                }
            }
            var html = '<iframe id="nhanh-embed-0" allowfullscreen="true" allowtransparency="true" frameborder="0" width="100%" height="350px" src="' + callUrl + '"></iframe>';
            t.innerHTML = (html);

            // register callback function on incoming message
            myEventListener(myEventMessage, function (e) {
                if (e.data.iframeHeight) {
                    document.getElementById('nhanh-embed-0').height = e.data.iframeHeight + "px";
                }
            }, false);
        }

    }).call({}, window.inDapIF ? parent.window : window);
} catch (e) {

}

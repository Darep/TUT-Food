
;(function (Ruoka, $, document, window, undefined) {

    var START_INDEX = 0;
    var TouchUI = Ruoka.TouchUI || {};

    TouchUI.init = function (element, paging) {

        this.paging = paging;
        this.setPagingTo(START_INDEX);

        this.swipe = new Swipe(element[0], {
            startSlide: START_INDEX,
            callback: function (event, index, elem) {
                paging.children().removeClass('act');
                this.setPagingTo(index);
            }.bind(this)
        });
    };

    TouchUI.setPagingTo = function (index) {
        this.paging.find(':nth-child(' + (index + 1) + ')').addClass('act');
    };

    TouchUI.paging = null;

    Ruoka.TouchUI = TouchUI;

}(window.Ruoka = window.Ruoka || {}, jQuery, document, window));

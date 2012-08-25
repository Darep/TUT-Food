
(function (Ruoka, $, document, window, undefined) {

    var TouchUI = Ruoka.TouchUI || {};

    TouchUI.init = function (element) {
        this.swipe = new Swipe(element[0]);
    };

    Ruoka.TouchUI = TouchUI;

}(window.Ruoka = window.Ruoka || {}, jQuery, document, window));

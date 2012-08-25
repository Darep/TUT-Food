
(function (Ruoka, $, document, window, undefined) {
    Ruoka.Api = Ruoka.Api || {};

    Ruoka.Api = {
        fetchMenus: function () {
            return $.ajax({
                url: 'api.php?refresh',
                type: 'GET'
            });
        }
    };

}(window.Ruoka = window.Ruoka || {}, jQuery, document, window));

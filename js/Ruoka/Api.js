
(function (Ruoka, $, document, window, undefined) {
    Ruoka.Api = Ruoka.Api || {};

    Ruoka.Api = {
        fetchMenus: function () {
            return $.ajax({
                type: 'GET',
                url: 'api.php?refresh'
            });
        }
    };

}(window.Ruoka = window.Ruoka || {}, jQuery, document, window));


(function (Ruoka, $, document, window, undefined) {

    var templateBase = $('#templates .tmpl-menu').detach().removeClass('tmpl-menu');

    Ruoka.Menu = Ruoka.Menu || null;

    Ruoka.Menu = function (args) {
        $.extend(this, args);
        this.template = templateBase.clone();

        if (this.model.ruoka.length > 0) {
            // Hide the "no food" message
            this.template.find('.none').remove();
        }
    };

    Ruoka.Menu.prototype.el = null;
    Ruoka.Menu.prototype.model = null;

    Ruoka.Menu.prototype.render = function () {
        var data = {
            title: this.model.nimi,
            foods: []
        };

        $.each(this.model.ruoka, function () {
            data.foods.push({ name: this.toString() });
        });

        this.el = this.template.render(data);

        return this;
    };

}(window.Ruoka = window.Ruoka || {}, jQuery, document, window));

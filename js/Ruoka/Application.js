/*!
 * TUT-Food main application logic
 */

(function (Ruoka, $, document, window, undefined) {
    Ruoka.Application = Ruoka.Application || {};

    Ruoka.Application = {
        container: null,
        model: {},
        template: null,
        templateBase: $('#templates .tmpl-base').detach(),

        init: function () {
            this.container = $('#app');
            this.template = this.templateBase.clone();

            // fetch the menus, show the menus and init the touch UI
            var menuRequest = Ruoka.Api.fetchMenus();
            menuRequest.success(function (data) {
                this.addMenus(data);
                this.render(data);
                //Ruoka.TouchUI.init(element);
            }.bind(this));
        },

        render: function () {
            // fade the loading away
            this.container.find('#boot').fadeOut('slow', function () {
                var renderedTemplate = this.template.render(this.model).children();
                this.container.html(renderedTemplate);
            }.bind(this));
        },

        addMenus: function (data) {
            var menus = [];
            var self = this;

            // Only show Juvenes menus for now
            $.each(data.menus.juvenes, function () {
                var model = this;
                var menu = new Ruoka.Menu({
                    model: model
                });
                self.template.find('.menus > ul').append(menu.render().el);
            });
        }
    };

}(window.Ruoka = window.Ruoka || {}, jQuery, document, window));


// Return the template
function getTemplate(sel) {
    return $($('#templates ' + sel).html());
}

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
                var render = this.render(data);

                render.done(function () {
                    if ( Modernizr.csstransforms ) {
                        Ruoka.TouchUI.init( this.container.find('.menus') );
                    }
                }.bind(this))
                .fail(function () {
                    // TODO: this
                });

            }.bind(this));
        },

        render: function () {
            var defer = $.Deferred();

            // fade the loading away
            this.container.find('#boot').fadeOut('slow', function () {
                var renderedTemplate = this.template.render(this.model).children();
                this.container.html(renderedTemplate);

                defer.resolve();
            }.bind(this));

            return defer.promise();
        },

        addMenus: function (data) {
            var menus = [];
            var self = this;

            // Render menus to the template
            $.each(data.menus.juvenes, function () {
                var model = this;
                var menu = new Ruoka.Menu({
                    model: model
                });
                var menuEl = menu.render().el;
                menuEl.hide();
                menus.push(menuEl);
            });
            self.template.find('.menus > ul').append(menus);
            $(menus[0]).show();
        }
    };

}(window.Ruoka = window.Ruoka || {}, jQuery, document, window));


// Return the template
function getTemplate(sel) {
    return $($('#templates ' + sel).html());
}

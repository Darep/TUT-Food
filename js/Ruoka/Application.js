
/*!
 * TUT-Food main application logic
 */
;(function (Ruoka, $, document, window, undefined) {

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
                        Ruoka.TouchUI.init( this.container.find('.menus'), this.container.find('.paging') );
                    }
                }.bind(this))
                .fail(function () {
                    // TODO: show a notification up top saying that we could not fetch information
                });

            }.bind(this));
        },

        render: function () {
            var defer = $.Deferred();

            // fade the loading away
            this.container.find('#boot').fadeOut('slow', function () {
                var renderedTemplate = this.template.render(this.model).children();
                this.container.html(renderedTemplate);

                this.setFoodsHeights();

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
                menus.push(menuEl);
            });
            self.template.find('.menus > ul').append(menus);

            this.setPaging(menus.length);
        },

        setFoodsHeights: function() {
            var totalHeight = this.container.find('.menu-wrap').height();
            var nameHeight = this.container.find('.name').height();
            var menuHeight = totalHeight - nameHeight;

            this.container.find('.foods').height(menuHeight);
        },

        setPaging: function (count) {
            var paging = this.template.find('.paging');
            var page = paging.children().first().detach();

            var pages = [];
            for (var i = 0; i < count; i++) {
                var newPage = page.clone();
                pages.push(newPage);
            }

            paging.empty().append(pages);
        }
    };

}(window.Ruoka = window.Ruoka || {}, jQuery, document, window));

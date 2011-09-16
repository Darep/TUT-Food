/*!
 * Application.js
 * Ruoka.Application-module. Application logic.
 *
 */

var Ruoka = Ruoka || [];

Ruoka.Application = {
    container: null,
    
    init: function () {
        var self = this;
        this.container = $('#container');
        
        // hide boot
        this.container.empty().hide();
        
        // add the base and start fetching data
        render('base', null, function (res) {
            self.container.append(res);
            self.container.fadeIn('fast');
            
            self.refresh();
        });
    },
    
    refresh: function () {
        var statusbar = this.container.find('#statusbar');
        statusbar.addClass('loading');
        Ruoka.Progressbar.start(statusbar, 2);
        this.getMenusFromServer();
    },
    
    getMenusFromServer: function () {
        var self = this;
        $.ajax({
            url: 'act.php?refresh',
            type: 'GET',
            success: function (menus) {
                console.log(menus);
                self.renderMenus(menus);
            }
        });
    },
    
    renderMenus: function (menus) {
        Ruoka.Progressbar.move();
        
        var element = $('#menus');
        
        var self = this;
        $(menus).each(function () {
            if (!this.name) { return; }
            
            render('menu', this, function (res) {
                element.append(res);
            });
        });
        
        Ruoka.Progressbar.done();
    }
};

function render(templateFile, data, callback) {
    $.ajax({
        url: 'js/templates/' + templateFile + '.html',
        type: 'GET',
        async: false,
        success: function (template) {
            callback($.tmpl(template, data));
        }
    });
    /*
    $.get('js/template/' + templateFile + '.html', function(template) {
        callback($.tmpl(template, data));
    });
    */
}
    

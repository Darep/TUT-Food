/*!
 * Ruoka main application logic
 */

(function () {
	var Ruoka = window.Ruoka || [];
	
	Ruoka.Application = {
	    container: null,
	    
	    init: function () {
	        var self = this;
	        this.container = $('#container');
	        
	        // hide boot
	        this.container.empty().hide();
	        
	        // add the base and start fetching data
	        render('baseTemplate', null, function (res) {
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
	            success: function (data) {
	                self.renderMenus(data);
	            }
	        });
	    },
	    
	    renderMenus: function (data) {
	        Ruoka.Progressbar.move();
	        
	        var element = $('#menus');
	        
	        var self = this;
	        
	        $.each(data.menus, function () {
	        	$.each(this, function () {
	        		if (!this.nimi) { return; }
		            
		            render('menuTemplate', this, function (res) {
		                element.append(res);
		            });
	        	});
	        });
	        
	        Ruoka.Progressbar.done(data.time_updated);
	        
	        Ruoka.TouchUI.init(element);
	    }
	};
	
	window.Ruoka = Ruoka;
	
})();


/**
 * Render a template
 * 
 * @param templateFile Template to be rendered
 * @param data Data for the template
 * @param callback Callback function
 */
function render(templateFile, data, callback) {
	var template = $('#' + templateFile);
	callback($.tmpl(template, data));
}


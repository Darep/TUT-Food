/*!
 * Progressbar.js
 * Ruoka.Progressbar-module. Progress bar
 *
 */

var Ruoka = Ruoka || [];

Ruoka.Progressbar = {
    container: null,
    steps: 1,
    amount: 0,
    
    start: function (container, steps) {
        this.container = container;
        this.steps = steps;
        this.amount = 0;
        
        var self = this;
        render('progressbar', { progress: 0 }, function (res) {
            self.container.html(res);
        });
    },
    
    move: function () {
        var progressbar = this.container.find('#progressbar'),
            bar = progressbar.find('span');
        
        tmp = 100 / this.steps;
        this.amount = this.amount + tmp;
        amount = this.amount;
        
        bar.width(amount + '%');
        progressbar.html(amount + '%');
        progressbar.removeClass().addClass('p-' + amount);

        if (amount == 100) {
            this.done();
        }
    },

    done: function () {
        var progressbar = this.container.find('#progressbar'),
            bar = progressbar.find('span');
        
        var data = {
            lastupdate: new Date
        };
        
        render('statusbar', data, function (res) {
            setTimeout(function () {
                var statusbar = progressbar.parent();
                statusbar.empty().removeClass('loading').append(res);
            }, 100);
        });
    }
};

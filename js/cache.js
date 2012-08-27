
window.addEventListener('load', function (e) {

    window.applicationCache.addEventListener('updateready', function (e) {
        var cache = window.applicationCache;
        if (cache.status == cache.UPDATEREADY) {
            console.log('Cache manifest updated');

            if (confirm('New version installed. Reload?')) {
                cache.swapCache();
                window.location.reload();
            }
        }
    }, false);

}, false);

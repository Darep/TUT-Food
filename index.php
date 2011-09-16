<?php
/*!
 * index.php
 *
 */

ini_set('default_charset', 'iso-8859-15');

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="iso-8859-15" />
	<title>Ruokalistat</title>
	<meta name="description" content="TTY:n ruokalistat koskettelulaitteille" /> 
    
	<link rel="apple-touch-icon" href="img/apple-touch-icon.png" />
    <link rel="apple-touch-icon-precomposed" href="img/apple-touch-icon-precomposed.png" />
    <link rel="apple-touch-startup-image" href="img/startup.png" />

    <!-- use , or ; here? -->
    <meta name="viewport" content="user-scalable=no; width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    
    <style type="text/css">
        /* styles for the loading page */
        body {
            background:#f9f9f9;
            font:14px/1.2 sans-serif;
        }
        #boot {
            text-align:center;
        }
        #boot .slow, #boot .fail {
            visibility:hidden;
        }
        #boot.slow .slow, #boot.fail .fail {
            visibility:visible;
        }
        #boot.fail .slow {
            visibility:hidden;
        }
    </style>
</head>  
<body onorientationchange="updateOrientation()">

<noscript>
    <strong>Please</strong> enable JavaScript to use this app!
</noscript>

<div id="container">
    <div id="boot">
        <div class="spinner"></div>
        <p class="init">Loading&hellip;</p>
        <p class="slow">Still loading, just a moment&hellip;</p>
        <p class="fail">Loading failed. <a href="#" onclick="">Try again</a></p>
    </div>
</div>

<script type="text/javascript">
    (function () {
        var c = document.createElement('link');
        c.rel = 'stylesheet';
        c.type = 'text/css';
        c.href = 'css/style.css';

        var x = document.getElementsByTagName('style')[0];
        x.parentNode.insertBefore(c, x);
        
        return;
        
        var j = document.createElement('script');
        j.type = 'text/javascript'; 
        j.async = false;
        j.src = 'js/jquery-1.6.1.min.js';
        
        var z = document.getElementsByTagName('script')[0];
        z.parentNode.insertBefore(j, z);
        
        var k = document.createElement('script');
        k.type = 'text/javascript'; 
        k.async = false;
        k.src = 'js/jquery.tmpl.min.js';

        z.parentNode.insertBefore(k, z);

        var s = document.createElement('script');
        s.type = 'text/javascript'; 
        s.async = false;
        s.src = 'js/application.js';
        
        z.parentNode.insertBefore(s, z);
        
        s.onload = function () {
            setTimeout(function () {
                // jQuery and application.js should be loaded now
                Ruoka.Application.init();
            }, 0);
        }
    })();
    
    
    var SLOW_TIMEOUT = 10000,
        FAIL_TIMEOUT = 20000;
    
    (function () {
        var element = document.getElementById('boot');
        setTimeout(function() {
            element.className += " slow";
            setTimeout(function() { element.className += " fail"; }, FAIL_TIMEOUT);
        }, SLOW_TIMEOUT);
    })();
</script>

<script type="text/javascript" src="js/jquery-1.6.1.min.js"></script>
<script type="text/javascript" src="js/jquery.tmpl.min.js"></script>
<script type="text/javascript" src="js/Ruoka/Progressbar.js"></script>
<script type="text/javascript" src="js/Ruoka/Application.js"></script>
<script type="text/javascript">
    Ruoka.Application.init();
</script>

<!-- Google Analytics -->
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-8682492-6']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>

</body>
</html>
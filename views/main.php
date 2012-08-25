<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>TTY-Ruoka</title>
    <meta name="description" content="TTY:n ravintoloiden ruokalistat kännykkään" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />

    <link rel="apple-touch-icon" href="img/apple-touch-icon.png" />
    <link rel="apple-touch-icon-precomposed" href="img/apple-touch-icon-precomposed.png" />
    <link rel="apple-touch-startup-image" href="img/startup.png" />

    <style type="text/css">
        /* styles for the loading page */
        body,html,div,p,a {
            margin:0;
            padding:0;
        }
        body, html {
            height:100%;
        }
        body {
            background:#141414 url('img/bg.jpg') no-repeat center top;
            background-size:cover;
            /* 14px/21px */
            font:14px/1.5 sans-serif;
        }
        body, input, textarea {
            color:#f1f1f1;
        }
        #boot {
            text-align:center;
        }
        #boot .slow, #boot .fail {
            visibility:hidden;
        }
        #templates {
            display:none;
        }
        .loading {
            background:url('../img/loader2.gif');
            position:absolute;
            top:50%;
            left:50%;
            height:32px;
            width:32px;

            text-indent:100%;
            overflow: hidden;
            white-space: nowrap;
        }
    </style>
    <link rel="stylesheet" type="text/css" href="css/styles.css">

    <script type="text/javascript" src="js/lib/modernizr.custom.34167.js"></script>
</head>
<body onorientationchange="Ruoka.UI.updateOrientation()">

    <noscript><strong>Please</strong> enable JavaScript to use this app!</noscript>

    <div id="app">
        <div id="boot">
            <p class="init loading">Loading&hellip;</p>
            <p class="slow">Still loading, just a moment&hellip;</p>
            <p class="fail">Loading failed. <a href="#" class="try-again">Try again</a></p>
        </div>
    </div>

    <div id="templates">

<?php print_templates(); ?>

    </div>

    <?php if (DEBUG) : ?>
    <script type="text/javascript" src="js/lib/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="js/lib/transparency.min.js"></script>
    <script type="text/javascript" src="js/lib/date.format.js"></script>
    <script type="text/javascript" src="js/lib/swipe.js"></script>
    <script type="text/javascript" src="js/Ruoka/Application.js"></script>
    <script type="text/javascript" src="js/Ruoka/TouchUI.js"></script>
    <script type="text/javascript" src="js/Ruoka/Menu.js"></script>
    <script type="text/javascript" src="js/Ruoka/Api.js"></script>
    <?php else : ?>
    <script type="text/javascript" src="js/main.min.js"></script>
    <?php endif; ?>

    <script type="text/javascript">
        Ruoka.Application.init();
    </script>
</body>
</html>

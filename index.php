<?php
/*!
 * index.php
 *
 */

$use_loader = false;
$template_dir = './templates';

define('DEBUG', false);

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
	<title>Ruokalistat</title>
	<meta name="description" content="TTY:n ruokalistat" /> 
    
	<link rel="apple-touch-icon" href="img/apple-touch-icon.png" />
    <link rel="apple-touch-icon-precomposed" href="img/apple-touch-icon-precomposed.png" />
    <link rel="apple-touch-startup-image" href="img/startup.png" />

    <!-- use , or ; here? -->
    <meta name="viewport" content="width=device-width, target-densitydpi=160dpi, initial-scale=1, maximum-scale=1, user-scalable=no" />
    
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
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/320.css" media="only screen and (min-width: 320px) and (max-width:640px)">
	<link rel="stylesheet" type="text/css" href="css/retina.css" media="only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)">
</head>  
<body onorientationchange="Ruoka.UI.updateOrientation()">

<noscript><strong>Please</strong> enable JavaScript to use this app!</noscript>

<div id="container">
    <div id="boot">
        <div class="spinner"></div>
        <p class="init">Loading&hellip;</p>
        <p class="slow">Still loading, just a moment&hellip;</p>
        <p class="fail">Loading failed. <a href="#" onclick="">Try again</a></p>
    </div>
</div>

<?php
	// print the jquery templates
	
	$iterator = new DirectoryIterator($template_dir);
	
	foreach ($iterator as $file)
	{
		if ($file->isFile())
		{
			$name = $file->getBasename('.html');
			?>

			<script type="text/html" id="<?php echo $name ?>">
				<?php echo file_get_contents($file->getPathname()) ?>
			</script>

			<?php
		}
	}
	
?>

<script type="text/javascript" src="js/scripts.js"></script>
<?php if (DEBUG) : ?>
<script type="text/javascript" src="js/Ruoka/Progressbar.js"></script>
<script type="text/javascript" src="js/Ruoka/TouchUI.js"></script>
<script type="text/javascript" src="js/Ruoka/Application.js"></script>
<?php else : ?>
<script type="text/javascript" src="/min/b=js/Ruoka&amp;f=Progressbar.js,TouchUI.js,Application.js"></script>
<?php endif; ?>
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
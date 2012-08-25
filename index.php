<?php

define('DEBUG', true);
include './views/main.php';


// print the HTML templates
function print_templates() {
    $template_dir = './templates';
    $iterator = new DirectoryIterator($template_dir);

    foreach ($iterator as $file)
    {
        if ($file->isFile())
        {
            echo file_get_contents( $file->getPathname() ) .PHP_EOL;
        }
    }
}

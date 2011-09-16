<?php
/*!
 * act.php
 *
 */

ini_set('default_charset', 'iso-8859-15');

define('FOOD_SERVICE_URL', 'http://ruoka.ajk.im/service/');

$query = (isset($_SERVER['QUERY_STRING'])) ? $_SERVER['QUERY_STRING'] : null;

if ($query == 'refresh') {
    $menus_raw = file_get_contents(FOOD_SERVICE_URL);
    
    header('Content-type: application/json');
    echo $menus_raw;
    exit;
}

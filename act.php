<?php
/*!
 * act.php
 *
 */

ini_set('default_charset', 'iso-8859-15');

if (isset($_SERVER['QUERY_STRING']) && ($_SERVER['QUERY_STRING'] == 'refresh')) {
    $menus_raw = file_get_contents('ruokalistat/listat');
    $menus = unserialize($menus_raw);
    
    $restaurants = array();
    
    foreach ($menus as $key => $restaurant) {
        if ($key != 'paiva') {
            $restaurants[] = array(
                'name' => $restaurant['nimi'],
                'menu' => $restaurant['ruoka']
            );
        }
    }
    
    header('Content-type: application/json');
    echo json_encode($restaurants);
    exit;
}

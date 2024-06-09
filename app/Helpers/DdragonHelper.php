<?php

if (!function_exists('ddragon_image_url')) {
    function ddragon_image_url($type, $id, $version = null) {
        $version = $version ?? config('ddragon.version');
        $base_url = config('ddragon.base_url');
        return "$base_url/$version/img/$type/$id.png";
    }
}
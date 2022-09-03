<?php

namespace AGK_Custom_Blocks;

class Block
{

    public static function loadBlock($blockName, $pathToJs, $pathToAdminCss = false)
    {
        wp_enqueue_script(
            $blockName,
            plugin_dir_url(__FILE__) . $pathToJs,
            ['wp-blocks', 'wp-editor'],
            true
        );
        if ($pathToAdminCss) {
            wp_enqueue_style($blockName, plugin_dir_url(__FILE__) . $pathToAdminCss, ['wp-edit-blocks'], null, 'all');
        }
    }

    public static function loadBlockFrontend($blockName, $pathToCss = false, $pathToFrontendJs = false)
    {
        if ($pathToCss) {
            wp_enqueue_style($blockName, plugin_dir_url(__FILE__) . $pathToCss, [], null, 'all');
        }
        if ($pathToFrontendJs) {
            wp_enqueue_script(
                $blockName . '-frontend',
                plugin_dir_url(__FILE__) . $pathToFrontendJs,
                ['jquery'],
                true
            );
        }
    }
}

<?php

namespace AGK_Custom_Blocks\Block;

class AGKBootstrapGrid extends \AGK_Custom_Blocks\Block
{
    private static $_isLoaded = false;

    const BLOCK_NAME = "agk-bootstrap-grid";
    const BLOCK_PATH_TO_JS = "AGKBootstrapGrid/js/block.js";
    const BLOCK_PATH_TO_ADMIN_CSS = "AGKBootstrapGrid/css/editor.css";
    const BLOCK_PATH_TO_FRONT_CSS = "AGKBootstrapGrid/css/frontend.css";

    public static function load()
    {
        if (!self::$_isLoaded) {
            parent::loadBlock(self::BLOCK_NAME, self::BLOCK_PATH_TO_JS, self::BLOCK_PATH_TO_ADMIN_CSS);

            self::$_isLoaded = true;
        }
    }

    public static function loadFrontend()
    {
        parent::loadBlockFrontend(self::BLOCK_NAME, self::BLOCK_PATH_TO_FRONT_CSS);
    }
}

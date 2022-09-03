<?php

namespace AGK_Custom_Blocks\Block;

class AGKFlipCard extends \AGK_Custom_Blocks\Block
{
    private static $_isLoaded = false;

    const BLOCK_NAME = "agk-flip-card";
    const BLOCK_PATH_TO_JS = "AGKFlipCard/js/block.js";
    const BLOCK_PATH_TO_FRONT_JS = "AGKFlipCard/js/frontend.js";
    const BLOCK_PATH_TO_ADMIN_CSS = "AGKFlipCard/css/editor.css";
    const BLOCK_PATH_TO_FRONT_CSS = "AGKFlipCard/css/frontend.css";

    public static function load()
    {
        if (!self::$_isLoaded) {
            parent::loadBlock(self::BLOCK_NAME, self::BLOCK_PATH_TO_JS, self::BLOCK_PATH_TO_ADMIN_CSS);

            self::$_isLoaded = true;
        }
    }

    public static function loadFrontend()
    {
        parent::loadBlockFrontend(self::BLOCK_NAME, self::BLOCK_PATH_TO_FRONT_CSS, self::BLOCK_PATH_TO_FRONT_JS);
    }
}

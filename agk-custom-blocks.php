<?php

/**
 * Plugin Name: Additional Gutenberg Blocks
 * Author: Alexey Kovalev (fade-in.de)
 * Version: 0.1.0
 */

namespace AGK_Custom_Blocks;

require_once dirname(__FILE__) . '/blocks/include.php';


class Plugin
{

    public static function loadBlocks()
    {
        Block\AGKFlipCard::load();
        Block\AGKDefinitionsList::load();
        Block\AGKBootstrapGrid::load();
    }

    public static function loadBlocksFrontend()
    {
        if (!is_admin()) {
            Block\AGKFlipCard::loadFrontend();
            Block\AGKDefinitionsList::loadFrontend();
            Block\AGKBootstrapGrid::loadFrontend();
        }
    }

    public function registerBlockCategories($categories, $post)
    {
        if ($post->post_type !== 'post' && $post->post_type !== 'page') {
            return $categories;
        }
        return array_merge(
            $categories,
            [
                [
                    'slug' => 'agkcb',
                    'title' => __('AGK Custom Blocks', 'agk-custom-blocks'),
                    'icon'  => 'welcome-widgets-menus',
                ],
            ]
        );
    }

    private static function _setupHooksHandlers()
    {
        // Editor assets
        add_action('enqueue_block_editor_assets', '\AGK_Custom_Blocks\Plugin::loadBlocks');

        // Frontend assets
        add_action('enqueue_block_assets', '\AGK_Custom_Blocks\Plugin::loadBlocksFrontend');

        // Custom Block Category
        add_filter('block_categories', '\AGK_Custom_Blocks\Plugin::registerBlockCategories', 10, 2);
    }

    public static function init()
    {
        self::_setupHooksHandlers();
    }
}

Plugin::init();

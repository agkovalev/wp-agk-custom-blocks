import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import json from "./block.json";
import { AGKDefinitionsList } from "./ui";

export function registerBlocks() {
  const { name, textdomain, title, category } = json;

  const { save, edit } = AGKDefinitionsList;

  registerBlockType(name, {
    title: __(title, textdomain),
    description: __("Display a definition list. Add a term or details.", textdomain),
    category,
    icon: "list-view",
    // supports: {
    //   // Removes support for an HTML mode.
    //   html: false,
    // },
    attributes: {},
    keywords: [__("definition", textdomain)],
    example: {},
    edit,
    save,
  });
}

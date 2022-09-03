// List Block
(function(blocks, editor, element, __) {
  var InnerBlocks = editor.InnerBlocks,
    el = element.createElement;

  var ALLOWED_BLOCKS = ["agk-custom-blocks/definitions-list-term", "agk-custom-blocks/definitions-list-details"];
  var TEMPLATE = [["agk-custom-blocks/definitions-list-term"], ["agk-custom-blocks/definitions-list-details"]];
  var list_name = "agk-custom-blocks/definitions-list";
  var list_settings = {
    title: __("definition list", "agk-custom-blocks"),
    description: __("Display a definition list. Add a term or details.", "agk-custom-blocks"),
    icon: "list-view",
    category: "agkcb",
    keywords: [__("definition", "agk-custom-blocks")],
    attributes: {},
    example: {},

    edit(props) {
      var viewElement = el(
        "dl",
        {
          className: props.className + " agkcb-dl"
        },
        el(InnerBlocks, { allowedBlocks: ALLOWED_BLOCKS, template: TEMPLATE })
      );
      return viewElement;
    },

    save(props) {
      var viewElement = el(
        "dl",
        {
          className: props.className + " agkcb-dl"
        },
        el(InnerBlocks.Content)
      );

      return viewElement;
    }
  };

  blocks.registerBlockType(list_name, list_settings);
})(window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.i18n.__);

// Details Block
(function(blocks, editor, element, __) {
  var RichText = editor.RichText,
    el = element.createElement;

  var description_name = "agk-custom-blocks/definitions-list-details";
  var description_settings = {
    title: __("dd tag", "agk-custom-blocks"),
    description: __("Create dd html tag.", "agk-custom-blocks"),
    icon: "editor-help",
    category: "agkcb",
    keywords: [__("definition", "agk-custom-blocks"), __("details", "agk-custom-blocks"), __("dd", "agk-custom-blocks")],
    parent: ["agk-custom-blocks/definitions-list"],
    attributes: {
      content: {
        type: "array",
        source: "children",
        selector: "dd"
      }
    },

    edit(props) {
      var attributes = props.attributes;
      var onChangeContent = function(newContent) {
        props.setAttributes({ content: newContent });
      };
      return el(RichText, {
        tagName: "dd",
        placeholder: "Content",
        className: props.className,
        onChange: onChangeContent,
        value: attributes.content,
        placeholder: __("Start writing dd tag contents.", "agk-custom-blocks")
      });
    },

    save(props) {
      return el(RichText.Content, {
        tagName: "dd",
        className: props.className,
        value: props.attributes.content
      });
    }
  };

  blocks.registerBlockType(description_name, description_settings);
})(window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.i18n.__);

// Term Block
(function(blocks, editor, element, __) {
  var RichText = editor.RichText,
    el = element.createElement;

  var description_name = "agk-custom-blocks/definitions-list-term";
  var description_settings = {
    title: __("dt tag", "agk-custom-blocks"),
    description: __("Create dt html tag.", "agk-custom-blocks"),
    icon: "editor-help",
    category: "formatting",
    keywords: [__("definition", "agk-custom-blocks"), __("term", "agk-custom-blocks"), __("dt", "agk-custom-blocks")],
    parent: ["agk-custom-blocks/definitions-list"],
    attributes: {
      content: {
        type: "array",
        source: "children",
        selector: "dt"
      }
    },

    edit(props) {
      var attributes = props.attributes;
      var onChangeContent = function(newContent) {
        props.setAttributes({ content: newContent });
      };
      return el(RichText, {
        tagName: "dt",
        placeholder: "Content",
        className: props.className,
        onChange: onChangeContent,
        value: attributes.content,
        placeholder: __("Start writing dt tag contents.", "agk-custom-blocks")
      });
    },

    save(props) {
      return el(RichText.Content, {
        tagName: "dt",
        className: props.className,
        value: props.attributes.content
      });
    }
  };

  blocks.registerBlockType(description_name, description_settings);
})(window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.i18n.__);

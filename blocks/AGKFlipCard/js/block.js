(function(blocks, editor, element, components) {
  var el = element.createElement;
  var Fragment = element.Fragment;
  var InnerBlocks = editor.InnerBlocks;
  var InspectorControls = editor.InspectorControls;
  var Panel = components.Panel;
  var PanelBody = components.PanelBody;
  var PanelRow = components.PanelRow;
  var TextControl = components.TextControl;

  blocks.registerBlockType("agk-custom-blocks/flip-card", {
    title: "Flip Card",
    icon: "image-flip-horizontal",
    category: "agkcb",

    attributes: {
      anchor: {
        type: "string"
      }
    },
    example: {},
    edit: function(props) {
      var TEMPLATE = [
        [
          "core/columns",
          { className: "agkcb-flipcard-inner" },
          [
            [
              "core/column",
              {
                className: "agkcb-flipcard-side agkcb-flipcard-side--front"
              },
              [
                [
                  "core/heading",
                  {
                    className: "agkcb-flipcard-side__title",
                    placeholder: "Frond Side Title"
                  }
                ],
                [
                  "core/group",
                  {
                    className: "agkcb-flipcard-side__content"
                  },
                  [["core/paragraph"]]
                ]
              ]
            ],
            [
              "core/column",
              {
                className: "agkcb-flipcard-side agkcb-flipcard-side--back"
              },
              [
                [
                  "core/heading",
                  {
                    className: "agkcb-flipcard-side__title",
                    placeholder: "Back Side Title"
                  }
                ],
                [
                  "core/group",
                  {
                    className: "agkcb-flipcard-side__content"
                  },
                  [["core/paragraph"]]
                ]
              ]
            ]
          ]
        ]
      ];

      var viewElement = el(
        Fragment,
        {},
        el(
          InspectorControls,
          { key: "controls" },
          el(
            PanelBody,
            { title: "Form Settings", initialOpen: true },

            /* Text Field */
            el(
              PanelRow,
              {},
              el(TextControl, {
                label: "FlipCard ID (HTML-Anchor)",
                onChange: value => {
                  props.setAttributes({ anchor: value });
                },
                value: props.attributes.anchor
              })
            )
          )
        ),
        el(
          "div",
          {
            className: props.className + " agkcb-flipcard",
            id: props.attributes.anchor
          },
          el(InnerBlocks, { template: TEMPLATE })
        )
      );
      return viewElement;
    },

    save: function(props) {
      var viewElement = el(
        "div",
        {
          className: "agkcb-flipcard-wrapper",
          id: props.attributes.anchor
        },
        el(
          "div",
          {
            className: "agkcb-flipcard-backdrop"
          },
          ""
        ),
        el(
          "div",
          {
            className: props.className + " agkcb-flipcard"
          },
          el(
            element.Fragment,
            {},
            el(
              "div",
              {
                className: "agkcb-flipcard-close"
              },
              ""
            ),
            el(InnerBlocks.Content),
            el(
              "div",
              {
                className: "agkcb-flipcard-switcher"
              },
              ""
            )
          )
        )
      );

      return viewElement;
    }
  });
})(window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.components);

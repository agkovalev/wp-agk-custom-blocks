/**
 * TODO: dynamically change in editor view columns
 */
// Row Block
(function(blocks, editor, element, __, components, data) {
  var InnerBlocks = editor.InnerBlocks,
    el = element.createElement,
    Fragment = element.Fragment;
  var InspectorControls = editor.InspectorControls;
  var PanelBody = components.PanelBody;
  var PanelRow = components.PanelRow;
  var TextControl = components.TextControl;
  var RangeControl = components.RangeControl;
  var select = data.select;
  var dispatch = data.dispatch;
  var getBlockOrder = select("core/editor").getBlockOrder;
  var updateBlockAttributes = dispatch("core/editor").updateBlockAttributes;

  var MAX_COLUMNS_COUNT = 12;
  var ALLOWED_BLOCKS = ["agk-custom-blocks/bootstrap-grid-col"];
  var TEMPLATE = [["agk-custom-blocks/bootstrap-grid-col"], ["agk-custom-blocks/bootstrap-grid-col"]];
  var block_name = "agk-custom-blocks/bootstrap-grid-row";
  var block_settings = {
    title: __("Grid row", "agk-custom-blocks"),
    description: __("Bootstrap like grid row", "agk-custom-blocks"),
    icon: "tagcloud",
    category: "agkcb",
    keywords: [__("definition", "agk-custom-blocks")],
    attributes: {
      columns_xl: {
        type: "number"
      },
      columns_lg: {
        type: "number"
      },
      columns_md: {
        type: "number"
      },
      columns_sm: {
        type: "number"
      },
      columns_xs: {
        type: "number"
      }
    },
    example: {},

    edit(props) {
      function calculateColNum(colNum) {
        return Math.floor(MAX_COLUMNS_COUNT / colNum);
      }

      function prepareColumnsValue(val) {
        if (MAX_COLUMNS_COUNT % val) {
          val = MAX_COLUMNS_COUNT / calculateColNum(val);
        }
        return val;
      }

      function setInnerColumnsBlocksAttributes(innerColBlocks, attributes) {
        innerColBlocks.forEach(function(block) {
          dispatch("core/editor").updateBlockAttributes(block.clientId, attributes);
        });
      }

      var clientId = props.clientId;

      var innerColumnsBlocks = select("core/editor").getBlocksByClientId(clientId)[0].innerBlocks;

      var childBlocks = getBlockOrder(clientId);
      console.log("childBlocks :", childBlocks);

      var viewElement = el(
        Fragment,
        {},
        el(
          InspectorControls,
          { key: "controls" },
          el(
            PanelBody,
            {
              title: __("Panel Title", "agk-custom-blocks"),
              initialOpen: true
            },
            /* Range Field */
            el(
              PanelRow,
              {},
              el(RangeControl, {
                label: "Columns Desktop Large",
                value: props.attributes.columns_xl,
                initialPosition: 1,
                min: 2,
                max: 12,
                onChange: function(val) {
                  val = prepareColumnsValue(val);
                  props.setAttributes({ columns_xl: val });
                  setInnerColumnsBlocksAttributes(innerColumnsBlocks, {
                    col_num_xl: calculateColNum(val)
                  });
                }
              })
            ),
            /* Range Field */
            el(
              PanelRow,
              {},
              el(RangeControl, {
                label: "Columns Desktop",
                value: props.attributes.columns_lg,
                initialPosition: 1,
                min: 2,
                max: 12,
                onChange: function(val) {
                  val = prepareColumnsValue(val);
                  props.setAttributes({ columns_lg: val });
                  setInnerColumnsBlocksAttributes(innerColumnsBlocks, {
                    col_num_lg: calculateColNum(val)
                  });
                }
              })
            ),
            /* Range Field */
            el(
              PanelRow,
              {},
              el(RangeControl, {
                label: "Columns Tablet Large",
                value: props.attributes.columns_md,
                initialPosition: 1,
                min: 2,
                max: 12,
                onChange: function(val) {
                  val = prepareColumnsValue(val);
                  props.setAttributes({ columns_md: val });
                  setInnerColumnsBlocksAttributes(innerColumnsBlocks, {
                    col_num_md: calculateColNum(val)
                  });
                }
              })
            ),
            /* Range Field */
            el(
              PanelRow,
              {},
              el(RangeControl, {
                label: "Columns Tablet",
                value: props.attributes.columns_sm,
                initialPosition: 2,
                min: 1,
                max: 6,
                onChange: function(val) {
                  val = prepareColumnsValue(val);
                  props.setAttributes({ columns_sm: val });
                  setInnerColumnsBlocksAttributes(innerColumnsBlocks, {
                    col_num_sm: calculateColNum(val)
                  });
                }
              })
            ),
            /* Range Field */
            el(
              PanelRow,
              {},
              el(RangeControl, {
                label: "Columns Mobile",
                value: props.attributes.columns_xs,
                initialPosition: 3,
                min: 1,
                max: 4,
                onChange: function(val) {
                  val = prepareColumnsValue(val);
                  props.setAttributes({ columns_xs: val });
                  setInnerColumnsBlocksAttributes(innerColumnsBlocks, {
                    col_num_xs: calculateColNum(val)
                  });
                }
              })
            )
          )
        ),
        el(
          "div",
          {
            className: (props.className || "") + " agkcb-bsgrid-row"
          },
          el(InnerBlocks, { allowedBlocks: ALLOWED_BLOCKS, template: TEMPLATE })
        )
      );
      return viewElement;
    },

    save(props) {
      var viewElement = el(
        "div",
        {
          className: (props.className || "") + " agkcb-bsgrid-row"
        },
        el(InnerBlocks.Content)
      );

      return viewElement;
    }
  };

  blocks.registerBlockType(block_name, block_settings);
})(window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.i18n.__, window.wp.components, window.wp.data);

// Column Block
(function(blocks, editor, element, __) {
  var InnerBlocks = editor.InnerBlocks,
    el = element.createElement;

  var block_name = "agk-custom-blocks/bootstrap-grid-col";
  var block_settings = {
    title: __("Grid Column", "agk-custom-blocks"),
    description: __("Create grid column.", "agk-custom-blocks"),
    icon: "welcome-add-page",
    category: "agkcb",
    keywords: [__("bootstrap", "agk-custom-blocks")],
    parent: ["agk-custom-blocks/bootstrap-grid-row"],
    attributes: {
      col_num_xl: {
        type: "number"
      },
      col_num_lg: {
        type: "number"
      },
      col_num_md: {
        type: "number"
      },
      col_num_sm: {
        type: "number"
      },
      col_num_xs: {
        type: "number"
      }
    },

    edit(props) {
      var colClasses = [
        props.className || "",
        "agkcb-bsgrid-col",
        "agkcb-bsgrid-col-xl-" + props.attributes.col_num_xl,
        "agkcb-bsgrid-col-lg-" + props.attributes.col_num_lg,
        "agkcb-bsgrid-col-md-" + props.attributes.col_num_md,
        "agkcb-bsgrid-col-sm-" + props.attributes.col_num_sm,
        "agkcb-bsgrid-col-xs-" + props.attributes.col_num_xs
      ];
      var viewElement = el(
        "div",
        {
          className: colClasses.join(" ")
        },
        el(InnerBlocks, {})
      );
      return viewElement;
    },

    save(props) {
      var colClasses = [
        props.className || "",
        "agkcb-bsgrid-col",
        "agkcb-bsgrid-col-xl-" + props.attributes.col_num_xl,
        "agkcb-bsgrid-col-lg-" + props.attributes.col_num_lg,
        "agkcb-bsgrid-col-md-" + props.attributes.col_num_md,
        "agkcb-bsgrid-col-sm-" + props.attributes.col_num_sm,
        "agkcb-bsgrid-col-xs-" + props.attributes.col_num_xs
      ];
      var viewElement = el(
        "div",
        {
          className: colClasses.join(" ")
        },
        el(
          "div",
          {
            className: "agkcb-bsgrid-col__content"
          },
          el(InnerBlocks.Content)
        )
      );

      return viewElement;
    }
  };

  blocks.registerBlockType(block_name, block_settings);
})(window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.i18n.__);

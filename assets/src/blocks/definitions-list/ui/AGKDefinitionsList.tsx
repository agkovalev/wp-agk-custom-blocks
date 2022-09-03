import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { blockStyle } from "../settings";

interface EditProps {
  className: string;
}

const AGKDefinitionsListEdit = ({ className }: EditProps) => {
  const blockProps = useBlockProps({ style: blockStyle });
  return (
    <dl {...blockProps} className={className + " agkcb-dl"}>
      <InnerBlocks />
    </dl>
  );
};

const AGKDefinitionsListSave = ({ className }: EditProps) => {
  const blockProps = useBlockProps({ style: blockStyle });
  return (
    <dl {...blockProps} className={className + " agkcb-dl"}>
      <InnerBlocks.Content />
    </dl>
  );
};

export default { edit: AGKDefinitionsListEdit, save: AGKDefinitionsListSave };

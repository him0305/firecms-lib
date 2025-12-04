import {
  EntityReference,
  ReferencePreview as FireCMSReferencePreview,
  PropertyPreviewProps,
} from '@firecms/core';

type ReferencePreviewCustomProps = {
  path: string;
  previewProperties?: string[];
};

export default function ReferencePreview({
  value,
  customProps,
  ...props
}: PropertyPreviewProps<string, ReferencePreviewCustomProps>) {
  return (
    value && (
      <FireCMSReferencePreview
        {...props}
        size="medium"
        reference={new EntityReference(value, customProps!.path)}
        previewProperties={customProps!.previewProperties}
      />
    )
  );
}

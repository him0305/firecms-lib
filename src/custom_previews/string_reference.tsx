import {
  EntityReference,
  ReferencePreview as FireCMSReferencePreview,
  PropertyPreviewProps,
} from '@firecms/core';

type StringReferencePreviewCustomProps = {
  path: string;
  previewProperties?: string[];
};

export default function StringRefPreview({
  value,
  customProps,
  size = 'medium',
  ...props
}: PropertyPreviewProps<string, StringReferencePreviewCustomProps>) {
  if (!customProps) return null;

  return (
    <FireCMSReferencePreview
      {...props}
      size={size}
      reference={new EntityReference(value, customProps.path)}
      previewProperties={customProps.previewProperties}
    />
  );
}

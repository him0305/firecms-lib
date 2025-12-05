import { PropertyPreviewProps } from '@firecms/core';
import { Avatar } from '@firecms/ui';

export function AvatarPreview({ value }: PropertyPreviewProps<string>) {
  if (!value) return null;

  return <Avatar src={value} />;
}

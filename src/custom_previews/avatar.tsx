import { PropertyPreviewProps } from '@firecms/core';
import { Avatar } from '@firecms/ui';

export function AvatarPreview({ value }: PropertyPreviewProps<string>) {
  return <Avatar src={value} />;
}

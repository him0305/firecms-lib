import { PropertyPreviewProps } from '@firecms/core';
import { Avatar } from '@firecms/ui';

export default function AvatarPreview({ value }: PropertyPreviewProps<string>) {
  return <Avatar src={value} />;
}

import { FieldProps } from '@firecms/core';
import { Avatar } from '@firecms/ui';

export function AvatarField({ value }: FieldProps<string>) {
  return <Avatar src={value} />;
}

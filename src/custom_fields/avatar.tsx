import { FieldProps } from '@firecms/core';
import { Avatar } from '@firecms/ui';

export default function AvatarField({ value }: FieldProps<string>) {
  return <Avatar src={value} />;
}

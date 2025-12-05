import { PreviewSize } from '@firecms/core';

export const getPreviewMargin = (size: PreviewSize) => {
  switch (size) {
    case 'small':
    case 'medium':
    case 'large':
      return 4;
  }
};

export const getPreviewPadding = (size: PreviewSize) => {
  switch (size) {
    case 'small':
      return 4;
    case 'medium':
      return 8;
    case 'large':
      return 16;
  }
};

export const getPreviewOffset = (size: PreviewSize) =>
  getPreviewMargin(size) * 2 + getPreviewPadding(size) * 2;

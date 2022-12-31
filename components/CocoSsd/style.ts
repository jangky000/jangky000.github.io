import styled from '@emotion/styled';

export const Dimensions = { width: 220, height: 220 };

export const CocoSsdWrapper = styled.div({
  label: 'coco-ssd-wrapper',
  position: 'relative',
});

export const StyledCanvas = styled.canvas({
  label: 'coco-ssd-canvas',
  position: 'absolute',
  top: 0,
  left: 0,
});

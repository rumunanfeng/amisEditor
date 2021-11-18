import { FC, CSSProperties, memo } from 'react';
import { useContext } from 'react';

import { TabAttr } from './TabAttr';
import { indexContext } from '../state/context-manager';


const style: CSSProperties = {
  width: '306px',
  overflow: 'auto',
  backgroundColor: '#1E1E1E',
  borderLeft: '1px solid #393939'
};

export const RightPage: FC = memo(function RightPage() {
  const { isPreview } = useContext(indexContext);
  return (
    <div
      id="rightPage"
      style={{ ...style, display: isPreview ? 'none' : 'block' }}
    >
      <TabAttr></TabAttr>
    </div>
  );
});

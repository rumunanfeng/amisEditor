/*
 * @Author: 陈落秋
 * @Date: 2021-09-10 10:12:57
 * @LastEditTime: 2021-11-17 15:54:12
 * @LastEditors: 陈落秋
 * @Description: 
 */
import { FC, CSSProperties, memo, useContext } from 'react';
import { Tabs } from 'antd';

import { indexContext } from '../state/context-manager';
import { TabBlock } from './TabTemplate';
import { TabBasic } from './TabComponents';

const { TabPane } = Tabs;

const style: CSSProperties = {
  width: '255px',
  overflow: 'auto',
  backgroundColor: '#252526',
  borderLeft: '1px solid #393939'
};

export const LeftPage: FC = memo(function LeftPage() {
  const { isPreview } = useContext(indexContext);
  return (
    <div
      id="leftPage"
      style={{ ...style }}
      className={isPreview ? 'leftPage-hide' : 'leftPage-show'}
    >
      <Tabs className="normal-tab" defaultActiveKey="1">
        <TabPane tab="COMPONENTS" key="1">
          <TabBasic />
        </TabPane>
        <TabPane tab="TEMPLATE" key="2">
          <TabBlock />
        </TabPane>
      </Tabs>
    </div>
  );
});

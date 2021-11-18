/*
 * @Author: 陈落秋
 * @Date: 2021-08-02 09:51:26
 * @LastEditTime: 2021-11-17 15:55:05
 * @LastEditors: 陈落秋
 * @Description:
 */
import { Tabs } from 'antd';
import { TabAttrBasic } from './TabAttrBasic';
import { TabCode } from './TabCode';
const { TabPane } = Tabs;

export const TabAttr = function () {

  return (
    <Tabs className="normal-tab" defaultActiveKey="1">
      <TabPane tab="BASIC" key="1">
        <TabAttrBasic />
      </TabPane>
      <TabPane tab="CODE" key="4">
        <TabCode/>
      </TabPane>
    </Tabs>
  );
};

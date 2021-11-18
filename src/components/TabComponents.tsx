import { CSSProperties, useState } from 'react';
import { Collapse, Tabs } from 'antd';
import { groupBy } from 'lodash';

import { DragComponents } from './DragComponents';
import { componentsList } from './data/components';

const { Panel } = Collapse;
const { TabPane } = Tabs;

const CollapseStyle:CSSProperties = {
  backgroundColor: '#252526',
  height: 'calc(100vh - 70px)',
  overflow: 'auto'
}

export const TabBasic = function () {
  let group = groupBy(componentsList, 'type');
  const [blockList, setBlockList] = useState([
    {
      "name": 'Select',
      "children": [
        {
          "name": 'Staff Type',
          "code": {
            "label": "Staff Type",
            "type": "select",
            "name": "type",
            "options": [
              {
                "label": "1",
                "value": "1"
              },
              {
                "label": "2",
                "value": "2"
              }
            ],
            "checkAll": false
          }
        }
      ]
    },
    {
      "name": 'Group',
      "children": [
        {
          "name": 'Handle Button',
          "code": {
            "type": "button-group",
            "buttons": [
              {
                "type": "button",
                "label": "",
                "size": "xs",
                "icon": "fa fa-plus"
              },
              {
                "type": "button",
                "label": "",
                "size": "xs",
                "icon": "fa fa-edit"
              },
              {
                "type": "button",
                "label": "",
                "size": "xs",
                "icon": "fa fa-trash-o"
              }
            ]
          }
        }
      ]
    }
  ])

  return (
    <Tabs type="card" className="basic-form-tab">
      <TabPane
        tab="NATIVE"
        key="NATIVE"
      >
        <Collapse bordered={false} defaultActiveKey={Object.keys(group)} style={{...CollapseStyle}}>
          {Object.keys(group).map((type: string) => {
            return (
              <Panel
                header={type.slice(0, 1).toUpperCase() + type.slice(1)}
                key={type}
              >
                {group[type].map((item: any) => (
                  <DragComponents
                    name={item.name}
                    alias={item.alias}
                    code={item.code}
                    icon={item.icon}
                    dialog={item.dialog}
                    key={item.name}
                  />
                ))}
              </Panel>
            );
          })}
        </Collapse>
      </TabPane>
      <TabPane
        tab="BLOCK"
        key="BLOCK"
      >
        <Collapse bordered={false} defaultActiveKey={blockList.map(item => item.name)} style={{...CollapseStyle}}>
          {blockList.map((item: any) => {
            return (
              <Panel
                header={item.name}
                key={item.name}
              >
                {item.children.map((item: any) => (
                  <DragComponents
                    name={item.name}
                    alias={item.name}
                    code={item.code}
                    dialog={item.dialog}
                    key={item.name}
                  />
                ))}
              </Panel>
            );
          })}
        </Collapse>
      </TabPane>
    </Tabs>
  );
};

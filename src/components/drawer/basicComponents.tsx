import React, { useState } from 'react';
import { Drawer } from 'antd';
import { Collapse, Radio, Button } from 'antd';
import { groupBy } from 'lodash';

import { componentsList } from '../data/components';

const { Panel } = Collapse;

interface ComponentsInterface {
  drawerVisible: boolean;
  setDrawerVisible: Function;
  insertElement: Function;
}

export const BasicComponents = ({
  drawerVisible,
  setDrawerVisible,
  insertElement,
}: ComponentsInterface) => {
  const [value, setValue] = useState();
  const onClose = () => {
    setDrawerVisible(false);
  };
  let group = groupBy(componentsList, 'type');
  return (
    <>
      <Drawer
        title="Select component insert"
        className="basic-components-drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={drawerVisible}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                insertElement(value);
                onClose();
              }}
              type="primary"
            >
              Insert
            </Button>
          </div>
        }
      >
        <Radio.Group onChange={(e: any) => setValue(e.target.value)}>
          <Collapse bordered={false} defaultActiveKey={Object.keys(group)}>
            {Object.keys(group).map((type: string) => {
              return (
                <Panel
                  header={type.slice(0, 1).toUpperCase() + type.slice(1)}
                  key={type}
                >
                  {group[type].map((item: any) => (
                    <Radio value={item} key={item.name} className="drawer-insert-comp">
                      <span className={`vs vs-${item.icon}`} style={{fontSize: '12px', marginRight: '8px'}}></span>
                      <span className="comp-text">{item.alias ? item.alias : item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
                    </Radio>
                  ))}
                </Panel>
              );
            })}
          </Collapse>
        </Radio.Group>
      </Drawer>
    </>
  );
};

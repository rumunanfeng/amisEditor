import { useContext } from 'react';
import { Card, Button, Tabs } from 'antd';
import {
  UploadOutlined
} from '@ant-design/icons';

import { blocks } from './data/blocks';
import { indexContext } from '../state/context-manager';

const { TabPane } = Tabs;

const options = [
  { label: 'Query', value: 'query' },
  { label: 'Detail', value: 'detail' },
  { label: 'Common', value: 'common' },
];

export const TabBlock = function () {
  const {
    setCodeObj,
    setCodeObjBack,
    setCurrentLevelArray,
    setCurrentBoxClass
  } = useContext(indexContext);

  function importBlock(code:any) {
    setCodeObj(code)
    setCodeObjBack(code)
    // 导入block时，清除click盒子
    setCurrentLevelArray([])
    setCurrentBoxClass('');
    const clickBox: HTMLElement = document.getElementById(
      'ae-click-box',
    ) as HTMLElement;
    clickBox.style.display = 'none';
    clickBox.style.width = '0px';
    clickBox.style.height = '0px';
  }
  return (
    <>
    <Tabs type="card" className="basic-form-tab">
      {
        options.map(option => {
          return (
            <TabPane
              tab={option.label}
              key={option.value}
            >
              <div style={{ height: 'calc(100vh - 78px)', overflow: 'auto', backgroundColor: '#252526'}}>
                {
                  blocks[option.value].map((item:any) => (
                    <div style={{ padding: '8px' }}>
                      <Card className="block-card" size="small" hoverable style={{   }}>
                        <div style={{marginBottom: '12px', textAlign: 'center'}}>
                          {item.name}
                        </div>
                        <img src="https://pic.imgdb.cn/item/6135dd5344eaada739ac0954.png" alt="" style={{ width: '100%', height: '120px' }}/>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Button type="link" icon={<UploadOutlined />} onClick={() => importBlock(item.code)} style={{paddingLeft: '0'}}>Import</Button>
                          <Button type="link" style={{paddingRight: '0'}}>Help</Button>
                        </div>
                      </Card>
                    </div>
                    
                  ))
                }
              </div>
            </TabPane>
          )
        })
      }
      
    </Tabs>
    </>
  );
};

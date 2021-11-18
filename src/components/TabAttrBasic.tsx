import { useContext } from 'react';
import { Tabs } from 'antd';
import { cloneDeep } from 'lodash';

import { indexContext } from '../state/context-manager';
import attrComponents from './attrComponents';
import { getElementCode, replaceElementCode } from '../utils/utils'
const { TabPane } = Tabs;

export const TabAttrBasic = function () {
  const {
    codeObj,
    setCodeObj,
    setCodeObjBack,
    currentLevelArray,
    currentComponent,
    codeUpdateKey,
  } = useContext(indexContext);
  let value: any;
  if (currentLevelArray && currentLevelArray.length) {
    value = getElementCode(codeObj, currentLevelArray);
  } else {
    value = codeObj;
  }

  // 修改代码
  function changeForm(code: any) {
    try {
      if (currentLevelArray && currentLevelArray.length) {
        let cloneCodeObj = cloneDeep(codeObj);
        replaceElementCode(cloneCodeObj, currentLevelArray, {
          ...value,
          ...code,
        });
        setCodeObj(cloneCodeObj);
        setCodeObjBack(cloneCodeObj);
      } else {
        setCodeObj(code);
        setCodeObjBack(code);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const tabBox: any = document.getElementsByClassName(
    'ant-tabs-content-holder',
  )[0];

  return (
    <Tabs type="card" className="basic-form-tab">
      
      {((currentComponent && currentComponent.attr) || []).map(
        (item: string) => {
          let ComFunc: Function = (attrComponents as any)[item];
          return (
            <TabPane
              tab={item}
              key={item}
              style={{
                padding: '10px',
                overflow: 'auto',
                height: tabBox.clientHeight - 80 + 'px',
              }}
            >
              <ComFunc
                key={item + codeUpdateKey}
                changeForm={changeForm}
                value={value}
              />
            </TabPane>
          );
        },
      )}
    </Tabs>
  );
};

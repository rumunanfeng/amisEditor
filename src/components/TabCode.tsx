import MonacoEditor from 'react-monaco-editor';
import { useContext, useEffect } from 'react';
import { cloneDeep } from 'lodash';

import { indexContext } from '../state/context-manager';
import { getElementCode, replaceElementCode } from '../utils/utils'

export const TabCode = function () {
  const {
    codeObj,
    setCodeObj,
    setCodeObjBack,
    currentLevelArray,
    codeUpdateKey,
    setCodeUpdateKey,
  } = useContext(indexContext);
  const options: any = {
    language: 'json',
    selectOnLineNumbers: true,
    theme: 'vs-dark',
    lineNumbers: false,
    // 控制收起图标是否显示
    folding: true,
    // 控制收起图标hover显示还是一直显示
    showFoldingControls: 'always',
    minimap: {
      // 关闭代码缩略图
      enabled: false,
    },
  };
  let value:any;
  // 修改代码
  function onChangeHandle(val: string) {
    try {
      if (JSON.stringify(JSON.parse(value)) === JSON.stringify(JSON.parse(val))) {
        return false
      }
      let code = JSON.parse(val);
      if (currentLevelArray && currentLevelArray.length) {
        let cloneCodeObj = cloneDeep(codeObj);
        replaceElementCode(cloneCodeObj, currentLevelArray, code);
        setCodeObj(cloneCodeObj);
        setCodeObjBack(cloneCodeObj);
        setCodeUpdateKey(codeUpdateKey + 1);
      } else {
        setCodeObj(code);
        setCodeObjBack(code);
        setCodeUpdateKey(codeUpdateKey + 1);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const tabBox: any = document.getElementById('root');

  
  if (currentLevelArray && currentLevelArray.length) {
    let code = getElementCode(codeObj, currentLevelArray);
    value = JSON.stringify(code, null, 2);
  } else {
    value = JSON.stringify(codeObj, null, 2);
  }

  useEffect(() => {
    if (currentLevelArray && currentLevelArray.length) {
      let code = getElementCode(codeObj, currentLevelArray);
      value = JSON.stringify(code, null, 2);
    } else {
      value = JSON.stringify(codeObj, null, 2);
    }
  });
  
  return (
    <div>
      <MonacoEditor
        height={tabBox.clientHeight - 46}
        value={value}
        options={options}
        onChange={onChangeHandle}
      />
    </div>
  );
};

import { CSSProperties, useState } from 'react';
import { useContext } from 'react';
import { cloneDeep } from 'lodash';

import { indexContext } from '../state/context-manager';

const style: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '34px',
  padding: '0 16px',
  color: '#999',
  backgroundColor: '#080808'
};

export const MidHeader = function () {
  const [inPreveiw, setInPreview] = useState(false)
  const { setIsPreview, codeObj, setCodeObj, setCodeObjBack } =
    useContext(indexContext);
  function changeForm() {
    setInPreview(!inPreveiw)
    setIsPreview(!inPreveiw);
    let newObj = cloneDeep(codeObj);
    setCodeObjBack(newObj);
    setCodeObj(newObj);
  }

  return (
    <div style={{ ...style }}>
      <div className="preview-btn" style={{cursor: 'pointer'}} onClick={(e) => changeForm()}>
        <img style={{width: '14px', height: '12px', marginRight: '4px'}} src={inPreveiw ? 'https://pic.imgdb.cn/item/6135dcae44eaada739aafdb1.png' : "https://pic.imgdb.cn/item/6135dca644eaada739aaf4ed.png"}></img>
        Preview
      </div>
    </div>
  );
};

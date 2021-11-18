import { useContext } from 'react';
import { Button, Tooltip } from 'antd';
import { cloneDeep } from 'lodash';
import {
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
  SelectOutlined,
} from '@ant-design/icons';

import { indexContext } from '../state/context-manager';

interface MidWidgets {
  setInsertType: Function;
  setDrawerVisible: Function;
  tipHoverShow: boolean;
  tipDisplay: string;
  currentLevelArray: string[];
  setEffectType: Function;
}

// 删除元素代码
function deleteElementCode(codeObj: any, levelArray: string[]) {
  if (levelArray[0]) {
    let indexArr: string[] = levelArray[0].split('.');
    if (levelArray[1]) {
      deleteElementCode(
        indexArr[1] ? codeObj[indexArr[0]][indexArr[1]] : codeObj[indexArr[0]],
        levelArray.slice(1)
      );
    } else {
      if (indexArr[1]) {
        codeObj[indexArr[0]].splice(indexArr[1], 1);
      } else {
        delete codeObj[indexArr[0]]
      }
    }
  }
}

// 移动元素代码
function moveElementCode(codeObj: any, levelArray: string[], isUp: boolean) {
  if (levelArray[0]) {
    let indexArr: string[] = levelArray[0].split('.');
    if (levelArray[1]) {
      moveElementCode(
        indexArr[1] ? codeObj[indexArr[0]][indexArr[1]] : codeObj[indexArr[0]],
        levelArray.slice(1),
        isUp,
      );
    } else {
      if (isUp) {
        if (Number(indexArr[1]) - 1 >= 0) {
          codeObj[indexArr[0]][indexArr[1]] = codeObj[indexArr[0]].splice(
            Number(indexArr[1]) - 1,
            1,
            codeObj[indexArr[0]][indexArr[1]],
          )[0];
        }
      } else {
        if (Number(indexArr[1]) + 1 < codeObj[indexArr[0]].length) {
          codeObj[indexArr[0]][indexArr[1]] = codeObj[indexArr[0]].splice(
            Number(indexArr[1]) + 1,
            1,
            codeObj[indexArr[0]][indexArr[1]],
          )[0];
        }
      }
    }
  }
}

export const MidWidgets = ({
  setInsertType,
  setDrawerVisible,
  tipHoverShow,
  tipDisplay,
  currentLevelArray,
  setEffectType,
}: MidWidgets) => {
  const { codeObj, setCodeObj, setCodeObjBack, isPreview } =
    useContext(indexContext);

  // 删除元素
  function deleteElement() {
    let cloneCodeObj = cloneDeep(codeObj);
    deleteElementCode(cloneCodeObj, currentLevelArray);
    setCodeObj(cloneCodeObj);
    setCodeObjBack(cloneCodeObj);
    const clickBox: HTMLElement = document.getElementById(
      'ae-click-box',
    ) as HTMLElement;
    clickBox.style.display = 'none';
  }

  // 移动元素
  function moveElement(isUp: boolean) {
    let moveCodeObj = cloneDeep(codeObj);
    moveElementCode(moveCodeObj, currentLevelArray, isUp);
    setEffectType('move');
    setCodeObj(moveCodeObj);
    setCodeObjBack(moveCodeObj);
    const lastIndex = currentLevelArray[currentLevelArray.length - 1];
    let lastIndexArr = lastIndex.split('.');
    if (isUp) {
      lastIndexArr[1] = String(Number(lastIndexArr[1]) - 1);
      currentLevelArray[currentLevelArray.length - 1] = lastIndexArr.join('.');
    } else {
      lastIndexArr[1] = String(Number(lastIndexArr[1]) + 1);
      currentLevelArray[currentLevelArray.length - 1] = lastIndexArr.join('.');
    }
  }

  return (
    <div
      id="midWidgets"
      className="ae-Preview-widgets"
      style={{ display: isPreview ? 'none' : 'block' }}
    >
      <div id="ae-hover-box">
        <div id="ae-hover-tip" className="ae-Editor-tip"></div>
      </div>
      <div id="ae-click-box">
        <div id="ae-click-tip" className="ae-Editor-tip"></div>
        <div id="ae-click-insert">
          <Tooltip placement="topLeft" title="Insert node in front">
            <Button
              type="primary"
              size="small"
              id="ae-click-last"
              className="up-btn"
              onClick={(e) => {
                e.stopPropagation();
                setInsertType('last');
                setDrawerVisible(true);
              }}
              icon={<PlusOutlined />}
            />
          </Tooltip>
          <Tooltip placement="bottomLeft" title="Insert the node after it">
            <Button
              type="primary"
              size="small"
              id="ae-click-next"
              className="up-btn"
              onClick={(e) => {
                e.stopPropagation();
                setInsertType('next');
                setDrawerVisible(true);
              }}
              icon={<PlusOutlined />}
            />
          </Tooltip>
        </div>
        <div
          id="ae-click-btns"
          className="ae-click-btns"
          onMouseOver={() => {
            if (!tipHoverShow) {
              const clickTip: any = document.getElementById('ae-click-tip');
              clickTip.style.display = 'none';
            }
          }}
          onMouseLeave={() => {
            if (!tipHoverShow) {
              const clickTip: any = document.getElementById('ae-click-tip');
              clickTip.style.display = tipDisplay;
            }
          }}
        >
          <Tooltip placement="bottomLeft" title="Insert node into container">
            <Button
              type="primary"
              size="small"
              id="insert-box-btn"
              className="insert-box-btn"
              onClick={(e) => {
                e.stopPropagation();
                setInsertType('box');
                setDrawerVisible(true);
              }}
              icon={<SelectOutlined />}
            />
          </Tooltip>
          <span id="ae-page-hide-btns">
            <Button
              type="primary"
              size="small"
              id="up-btn"
              className="up-btn"
              onClick={(e) => {
                e.stopPropagation();
                moveElement(true);
              }}
              icon={<ArrowUpOutlined />}
            />
            <Button
              type="primary"
              size="small"
              id="down-btn"
              className="down-btn"
              onClick={(e) => {
                e.stopPropagation();
                moveElement(false);
              }}
              icon={<ArrowDownOutlined />}
            />
            <Button
              type="primary"
              size="small"
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteElement();
              }}
              icon={<DeleteOutlined />}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

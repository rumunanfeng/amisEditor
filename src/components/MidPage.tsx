import {
  FC,
  CSSProperties,
  useState,
  MouseEvent,
  DragEvent,
  useContext,
  useEffect,
} from 'react';
import { useDrop } from 'react-dnd';
import { cloneDeep } from 'lodash';

import { indexContext } from '../state/context-manager';
import { componentsList } from './data/components';
import { AmisPage } from './AmisPage';
import { MidHeader } from './MidHeader';
import { CrudDialog } from './dialog/crud';
import { BasicComponents } from './drawer/BasicComponents';
import { MidWidgets } from './MidWidgets';
import { getElementCode, getKeyElement, quickGroup, insetVirtualData, getShowChildList, setClickBoxStyle, removeTemporaryClass, showUpOrDown } from '../utils/utils';

let hoverLevelArray: any;

const style: CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  backgroundColor: '#1E1E1E'
};

export const MidPage: FC = () => {
  const {
    codeObj,
    setCodeObj,
    codeObjBack,
    setCodeObjBack,
    draggingItem,
    currentLevelArray,
    setCurrentLevelArray,
    setCurrentComponent,
    isPreview,
    currentBoxClass,
    setCurrentBoxClass,
    codeUpdateKey,
    setCodeUpdateKey,
  } = useContext(indexContext);

  const [insetIndex, setInsetIndex] = useState(0);
  const [lastInsetIndex, setLastInsetIndex] = useState(-1);
  const [tipHoverShow, setTipHoverShow] = useState(true);
  const [tipDisplay, setTipDisplay] = useState('');
  const [ctName, setCtName] = useState('body');
  const [effectType, setEffectType] = useState('');
  const [insetData, setInsetData] = useState({});
  const [dialogShow, setDialogShow] = useState('');
  const [clickTarget, setClickTarget]: any = useState();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [insertType, setInsertType] = useState('');

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: (item, monitor) => {
      return { name: 'MidPage' };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover(item: any, monitor: any) {
      // 鼠标位置
      const getClientOffset = monitor.getClientOffset();
    },
  }));

  let cloneCodeObj = cloneDeep(codeObj);

  // 设置hover或class元素样式
  function setActiveStyle(activeTarget: HTMLElement, type: 'hover' | 'click') {
    const aeTip = document.getElementById(`ae-${type}-tip`);
    if (activeTarget && aeTip) {
      let className: string | undefined = [
        ...(activeTarget.classList || []),
      ].find((element) => element.includes('bizsdkdnd-path'));
      let levelArray = (className && className.split('-').slice(2)) || [];
      let activeCode = getElementCode(codeObj, levelArray);
      let currentComponent = componentsList.find(
        (comItem: any) =>
          (activeCode && comItem.code && comItem.code.type === activeCode.type) || (levelArray[levelArray.length - 1] === 'filter' && comItem.code.type === 'form')
      );
      aeTip.innerText = currentComponent && currentComponent.name ? currentComponent.name.charAt(0).toUpperCase() + currentComponent.name.slice(1) : '';
      if (type === 'click') {
        if (levelArray.join('-') !== currentLevelArray.join('-')) {
          setCodeUpdateKey(codeUpdateKey + 1);
        }
        setCurrentLevelArray(levelArray);

        // 最外层页面无任何操作
        const btnElement: HTMLElement = document.getElementById(
          'ae-page-hide-btns',
        ) as HTMLElement;
        const insertBtnElement: HTMLElement = document.getElementById(
          'ae-click-insert',
        ) as HTMLElement;
        if (className === 'bizsdkdnd-path') {
          btnElement.style.display = 'none';
          insertBtnElement.style.display = 'none';
        } else {
          btnElement.style.display = 'inline-block';
          insertBtnElement.style.display = 'block';
        }

        // 设置盒容器插入按钮的显示
        const insertBoxBtnElement: HTMLElement = document.getElementById(
          'insert-box-btn',
        ) as HTMLElement;
        const isBox = [...activeTarget.classList].some(
          (classItem) => classItem === 'bizsdkdnd-box',
        );
        if (isBox) {
          insertBoxBtnElement.style.display = 'inline-block';
        } else {
          insertBoxBtnElement.style.display = 'none';
        }

        showUpOrDown(activeTarget, levelArray);
        setCurrentComponent(currentComponent);
      }

      setClickBoxStyle({activeTarget, type});
    }
  }

  useEffect(() => {
    // 如果位置有变动，那么更新选中class的位置
    if (effectType) {
      const className = ['bizsdkdnd', 'path', ...currentLevelArray].join('-');
      if (className) {
        const activeTarget: HTMLElement = document.getElementsByClassName(
          className,
        )[0] as HTMLElement;
        setClickTarget(activeTarget);
        window.onresize = () => {
          setActiveStyle(activeTarget as HTMLElement, 'click');
        };
        if (activeTarget) {
          if (effectType === 'move') {
            setClickBoxStyle({activeTarget, type: 'click', notChange: true});
            showUpOrDown(activeTarget, currentLevelArray);
          } else if (effectType === 'insert') {
            setActiveStyle(activeTarget, 'click');
          }
        }
      }
      setEffectType('');
    } else {
      if (clickTarget && Object.keys(clickTarget).length) {
        setClickBoxStyle({activeTarget: clickTarget as HTMLElement, type: 'click', notChange: true});
      }
    }
  });

  // 向上或者向下插入元素
  function insertElement(draggingItem: any) {

    if (draggingItem && draggingItem.dialog) {
      setDialogShow(draggingItem.dialog);
    } else {
      let dialogCloneCodeObj = cloneDeep(codeObj);
      let cloneArr = cloneDeep(currentLevelArray);

      if (insertType === 'next') {
        let lastNum = cloneArr[cloneArr.length - 1].split('.');
        lastNum = lastNum[0] + '.' + String(Number(lastNum[1]) + 1);
        cloneArr[cloneArr.length - 1] = lastNum;
      } else if (insertType === 'box') {
        const ctClassName: string | undefined = [
          ...((clickTarget && clickTarget.classList) || []),
        ].find((element) => element.includes('bizsdkdnd-ct'));
        let curCtName = ctClassName ? ctClassName.slice(13) : 'body';
        cloneArr.push(`${curCtName}.0`);
      }

      let resultLevelArray = cloneDeep(cloneArr);
      let dialogCloneCodeObjChild = dialogCloneCodeObj;

      while (cloneArr[1]) {
        let indexArr = cloneArr[0].split('.');
        dialogCloneCodeObjChild =
          dialogCloneCodeObjChild[indexArr[0]][indexArr[1]];
        cloneArr = cloneArr.slice(1);
      }
      let insertArr = cloneArr[0].split('.');
      dialogCloneCodeObjChild[insertArr[0]].splice(
        insertArr[1],
        0,
        draggingItem.code,
      );

      if (insertType) {
        setCurrentLevelArray(resultLevelArray);
      }
      setEffectType('insert');
      setCodeObj(dialogCloneCodeObj);
      setCodeObjBack(dialogCloneCodeObj);
    }
  }

  // 提交表格dialog表单
  function submitDialogForm(data: any) {
    let dialogCloneCodeObj = cloneDeep(codeObjBack);
    insetVirtualData(
      dialogCloneCodeObj,
      hoverLevelArray,
      { ...insetData, ...data },
      insetIndex,
      ctName,
    );
    setLastInsetIndex(insetIndex);
    setCodeObj(dialogCloneCodeObj);
    removeTemporaryClass(dialogCloneCodeObj, hoverLevelArray, ctName);
    setCodeObjBack(dialogCloneCodeObj);
    setDialogShow('');
  }

  function cancelDialogForm() {
    setDialogShow('');
    setCodeObj(cloneDeep(codeObjBack));
  }

  return (
    <div id="midPage" style={{ ...style }}  >
      <MidHeader />
      <div
        style={{
          position: 'relative',
          padding: isPreview ? '0' : '24px 16px',
          height: 'calc(100vh - 34px)',
          
        }}
      >
        <div
          style={{
            height: '100%',
          }}
          onClick={(event: MouseEvent) => {
            const { target } = event;
            if (!isPreview) {
              let eventTarget = getKeyElement(
                target as HTMLElement,
                'bizsdkdnd-class',
              );
              if (
                eventTarget &&
                (!clickTarget || !currentLevelArray[0] ||
                  eventTarget.className !== clickTarget.className)
              ) {
                setClickTarget(eventTarget);
                const widthVal = getComputedStyle(
                  eventTarget,
                  null,
                ).getPropertyValue('width');
                const displayVal = getComputedStyle(
                  eventTarget,
                  null,
                ).getPropertyValue('display');
                setTipHoverShow(Number(widthVal.slice(0, -2)) > 120);
                setTipDisplay(displayVal);
                // 浏览器窗口大小变动时重新设置
                window.onresize = () => {
                  setActiveStyle(eventTarget as HTMLElement, 'click');
                };
                setActiveStyle(eventTarget, 'click');
              }
            }
          }}
          onMouseOver={(event: MouseEvent) => {
            const { target } = event;
            let hoverTarget = getKeyElement(
              target as HTMLElement,
              'bizsdkdnd-class',
            );
            if (hoverTarget) {
              setActiveStyle(hoverTarget, 'hover');
            }
          }}
          onMouseLeave={() => {
            const hoverBox: HTMLElement = document.getElementById(
              'ae-hover-box',
            ) as HTMLElement;
            hoverBox.style.width = '0px';
            hoverBox.style.height = '0px';
            hoverBox.style.display = 'none';
          }}
          onDrop={() => {
            if (draggingItem.dialog) {
              setDialogShow(draggingItem.dialog);
            } else {
              removeTemporaryClass(cloneCodeObj, hoverLevelArray, ctName);
              setCodeObjBack(cloneCodeObj);
            }
          }}
          onDragEnter={() => {
            // 拖拽开始时，清除click盒子
            const clickBox: HTMLElement = document.getElementById(
              'ae-click-box',
            ) as HTMLElement;
            clickBox.style.display = 'none';
            clickBox.style.width = '0px';
            clickBox.style.height = '0px';
            setClickTarget();
            setCurrentLevelArray([]);
          }}
          onDragLeave={() => {}}
          onDragOver={(event: DragEvent) => {
            event.preventDefault();
            const { clientX, clientY } = event.nativeEvent;
            const { target } = event;

            // 如果拖拽位置是临时节点，那么retun
            let temporaryTarget: HTMLElement | null = getKeyElement(
              target as HTMLElement,
              'temporary-node-back',
            );
            if (temporaryTarget) {
              return false;
            }

            setInsetData(draggingItem.code);
            let boxTarget: HTMLElement | null;
            let insetTarget: HTMLElement | null;

            // group组件只能插入到form里面
            if (draggingItem.name === 'group') {
              boxTarget = getKeyElement(target as HTMLElement, 'bizsdkdnd-form');
              insetTarget = getKeyElement(target as HTMLElement, 'bizsdkdnd-form');
            } else {
              boxTarget = getKeyElement(target as HTMLElement, 'bizsdkdnd-box');
              insetTarget = getKeyElement(target as HTMLElement, [
                'bizsdkdnd-subbox',
                'bizsdkdnd-box',
              ]);
            }
            if (!boxTarget) {
              return false;
            }

            // 获取容器元素下展示出来的子元素showChildList，并且计算插入的索引insetIndex
            let temIndex: number = 0;
            if (
              // @ts-ignore
              insetTarget &&
              insetTarget.children &&
              insetTarget.children.length
            ) {
              // 获取可展示的子元素
              let showChildList: any = getShowChildList(insetTarget);
              temIndex = showChildList.length;
              showChildList.forEach((child: any, childIndex: number) => {
                const clientTop = (
                  insetTarget as HTMLElement
                ).getBoundingClientRect().top;
                let topVal = childIndex
                  ? showChildList[childIndex - 1].getBoundingClientRect().top +
                    showChildList[childIndex - 1].offsetHeight / 2
                  : clientTop;

                let bottomVal =
                  showChildList[childIndex].getBoundingClientRect().top +
                  showChildList[childIndex].offsetHeight / 2;
                const isLastOne = childIndex === showChildList.length - 1;
                if (clientY < bottomVal && clientY > topVal) {
                  temIndex = childIndex;
                } else if (isLastOne && clientY > bottomVal) {
                  temIndex = childIndex + 1;
                }
              });
            }
            // 存储insetIndex
            setInsetIndex(temIndex);
            // 获取插入元素的标记class
            const className: string | undefined = [
              ...((insetTarget && insetTarget.classList) || []),
            ].find((element) => element.includes('bizsdkdnd-path'));
            hoverLevelArray =
              (className && className.split('-').slice(2)) || [];
            // 获取插入代码的容器名字
            const ctClassName: string | undefined = [
              ...((insetTarget && insetTarget.classList) || []),
            ].find((element) => element.includes('bizsdkdnd-ct'));
            let curCtName = ctClassName ? ctClassName.slice(13) : 'body';
            setCtName(curCtName);
            setActiveStyle(boxTarget as HTMLElement, 'hover');
            // 在容器元素和插入索引其中之一变化时重新插入元素
            if (
              currentBoxClass !== className ||
              !currentBoxClass ||
              lastInsetIndex !== insetIndex
            ) {
              cloneCodeObj = cloneDeep(codeObjBack);
              setCurrentBoxClass(className || '');
              console.log(
                cloneCodeObj,
                hoverLevelArray,
                draggingItem.code,
                insetIndex,
                curCtName,
              );
              insetVirtualData(
                cloneCodeObj,
                hoverLevelArray,
                draggingItem.code,
                insetIndex,
                curCtName,
              );
              setLastInsetIndex(insetIndex);
              setCodeObj(cloneCodeObj);
            }
          }}
          ref={drop}
          role={'MidPage'}
        >
          <AmisPage></AmisPage>
        </div>
        <MidWidgets
          setInsertType={setInsertType}
          setDrawerVisible={setDrawerVisible}
          tipHoverShow={tipHoverShow}
          tipDisplay={tipDisplay}
          currentLevelArray={currentLevelArray}
          setEffectType={setEffectType}
        ></MidWidgets>
        <CrudDialog
          submitDialogForm={submitDialogForm}
          cancelDialogForm={cancelDialogForm}
          value={insetData}
          dialogShow={dialogShow}
        ></CrudDialog>
        <BasicComponents
          drawerVisible={drawerVisible}
          setDrawerVisible={setDrawerVisible}
          insertElement={insertElement}
        ></BasicComponents>
      </div>
    </div>
  );
};

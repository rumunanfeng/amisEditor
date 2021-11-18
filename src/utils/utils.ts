import { cloneDeep } from 'lodash';
export function defaultValue(defaltValue: any, key?: any) {
  return (
    void 0 === key && (key = !0),
    key
      ? function (key: any) {
          return void 0 === key ? defaltValue : key;
        }
      : function (key: any) {
          return key || defaltValue;
        }
  );
}

export function valuePipeOut(e) {
  try {
    if ('undefined' === e) {
      return;
    }
    return JSON.parse(e);
  } catch (t) {
    return e;
  }
}

const splitValidations = function (str: string): Array<string> {
  let i = 0;
  const placeholder: { [propName: string]: string } = {};

  return str
    .replace(/matchRegexp\d*\s*\:\s*\/.*?\/[igm]*/g, (raw) => {
      placeholder[`__${i}`] = raw;
      return `__${i++}`;
    })
    .split(/,(?![^{\[]*[}\]])/g)
    .map((str) => (/^__\d+$/.test(str) ? placeholder[str] : str.trim()));
};

export function str2rules(validations: string | { [propName: string]: any }): {
  [propName: string]: any;
} {
  if (typeof validations === 'string') {
    return validations
      ? splitValidations(validations).reduce(function (
          validations: { [propName: string]: any },
          validation,
        ) {
          const idx = validation.indexOf(':');
          let validateMethod = validation;
          let args = [];

          if (~idx) {
            validateMethod = validation.substring(0, idx);
            args = /^matchRegexp/.test(validateMethod)
              ? [validation.substring(idx + 1).trim()]
              : validation
                  .substring(idx + 1)
                  .split(',')
                  .map(function (arg) {
                    try {
                      return JSON.parse(arg);
                    } catch (e) {
                      return arg;
                    }
                  });
          }

          validations[validateMethod] = args.length ? args : true;
          return validations;
        },
        {})
      : {};
  }

  return validations || {};
}

export function isObject(obj: any) {
  const typename = typeof obj;
  return (
    obj &&
    typename !== 'string' &&
    typename !== 'number' &&
    typename !== 'boolean' &&
    typename !== 'function' &&
    !Array.isArray(obj)
  );
}

// 获取元素代码
export function getElementCode(codeObj: any, levelArray: string[]): any {
  if (levelArray[0]) {
    let indexArr = levelArray[0].split('.');
    if (levelArray[1]) {
      return getElementCode(
        indexArr[1] ? codeObj[indexArr[0]][indexArr[1]] : codeObj[indexArr[0]],
        levelArray.slice(1),
      );
    } else {
      return indexArr[1] ? codeObj[indexArr[0]][indexArr[1]] : codeObj[indexArr[0]];
    }
  } else {
    return codeObj;
  }
}

  // 替换元素代码
  export function replaceElementCode(
    codeObj: any,
    levelArray: string[],
    replaceData: any,
  ) {
    if (levelArray[0]) {
      let indexArr = levelArray[0].split('.');
      if (levelArray[1]) {
        replaceElementCode(
          indexArr[1] ? codeObj[indexArr[0]][indexArr[1]] : codeObj[indexArr[0]],
          levelArray.slice(1),
          replaceData,
        );
      } else {
        if (indexArr[1]) {
          codeObj[indexArr[0]].splice(indexArr[1], 1, replaceData);
        } else {
          codeObj[indexArr[0]] = replaceData;
        }
      }
    } else {
    }
  }

// 获取元素的首个关键字类名元素
export function getKeyElement(
  target: HTMLElement,
  key: string | string[],
): HTMLElement | null {
  if (target && target.className && typeof target.className === 'string') {
    if (
      Array.isArray(key) &&
      key.some((item: string) => target.className.includes(item))
    ) {
      return target;
    } else if (target.className.includes(key as string)) {
      return target;
    } else if (target && target.parentElement) {
      return getKeyElement(target.parentElement, key);
    } else {
      return null;
    }
  } else {
    if (target && target.parentElement) {
      return getKeyElement(target.parentElement, key);
    } else {
      return null;
    }
  }
}

// 表单项快速分组
export function quickGroup (code:any) {
  const groupNumber = code._quickGroup;
  const unGroupForm:any[] = [];
  (code.body || []).forEach((item:any) => {
    if (item.type === 'group') {
      if (item.body && item.body.length) {
        unGroupForm.push(...item.body);
      }
    } else {
      unGroupForm.push(item);
    }
  });
  if (groupNumber) {
    const groupData:any[] = [];
    unGroupForm.forEach((item:any, index:number) => {
      if (index % groupNumber === 0) {
        groupData.push({
          type: 'group',
          body: [item]
        });
      } else {
        const groupIndex = Math.floor(index / groupNumber);
        groupData[groupIndex].body.push(item);
      }
    });
    return groupData || [];
  } else {
    return unGroupForm || [];
  }
}

export function insetVirtualData(
  virtualObj: any,
  levelArray: string[],
  insetData: any,
  insetIndex: number,
  ctName: string,
) {
  let cloneVirtualObj = virtualObj;
  let cloneLevelArray = levelArray;
  while (cloneLevelArray[0]) {
    let indexArr = cloneLevelArray[0].split('.');
    cloneVirtualObj = indexArr[1] ? cloneVirtualObj[indexArr[0]][indexArr[1]] : cloneVirtualObj[indexArr[0]];
    cloneLevelArray = cloneLevelArray.slice(1);
  }
  // 添加临时节点背景样式
  if (insetData.className) {
    insetData.className = insetData.className.includes('temporary-node-back')
      ? insetData.className
      : `${insetData.className} temporary-node-back`;
  } else {
    insetData.className = 'temporary-node-back';
  }
  cloneVirtualObj &&
    cloneVirtualObj[ctName] &&
    cloneVirtualObj[ctName].splice(insetIndex, 0, insetData);
}

// 获取可展示的子元素
export function getShowChildList(boxTarget: HTMLElement) {
  if (boxTarget.children[0].className.includes('a-Page-content')) {
    return cloneDeep([
      ...boxTarget.children[0].children[0].children[0].children,
    ]).filter(
      (child: any) =>
        child.style.display !== 'none' &&
        !child.className.includes('temporary-node-back'),
    );
  // form表单有title的情况
  } else if (boxTarget.children[0].className.includes('a-Panel-heading')) {
    return cloneDeep([...boxTarget.children[1].children[0].children]).filter(
      (child: any) =>
        child.style.display !== 'none' &&
        !child.className.includes('temporary-node-back'),
    );
  // form表单无title的情况
  } else if (boxTarget.children[0].className.includes('a-Panel-body')) {
    return cloneDeep([...boxTarget.children[0].children[0].children]).filter(
      (child: any) =>
        child.style.display !== 'none' &&
        !child.className.includes('temporary-node-back'),
    );
  } else {
    return cloneDeep([...boxTarget.children]).filter(
      (child: any) => child.style.display !== 'none',
    );
  }
}


// 设置click或hover盒子的样式：定位及高宽
export function setClickBoxStyle({ activeTarget, type, notChange }: any) {
  const activeBox: HTMLElement = document.getElementById(
    `ae-${type}-box`,
  ) as HTMLElement;
  const midPage: HTMLElement = document.getElementById(
    'midPage',
  ) as HTMLElement;
  const clientTop = activeTarget.getBoundingClientRect().top;
  const clientLeft = activeTarget.getBoundingClientRect().left;
  if (!(type === 'click' && notChange)) {
    activeBox.style.display = 'block';
  }

  activeBox.style.width = activeTarget.offsetWidth + 'px';
  activeBox.style.height = activeTarget.offsetHeight + 'px';
  // hover或click元素的包裹元素定位，根据布局改变要对应调整
  activeBox.style.top = clientTop - 34 + midPage.scrollTop + 'px';
  const leftOffset = 255;
  activeBox.style.left = clientLeft - leftOffset + midPage.scrollLeft + 'px';
}

// 去除虚拟类名temporary-node-back
export function removeTemporaryClass(
  virtualObj: any,
  hoverLevelArray: string[],
  ctName: string,
) {
  if (hoverLevelArray[0]) {
    let indexArr: string[] = hoverLevelArray[0].split('.');
    removeTemporaryClass(
      indexArr[1] ? virtualObj[indexArr[0]][indexArr[1]] : virtualObj[indexArr[0]],
      hoverLevelArray.slice(1),
      ctName,
    );
  } else {
    virtualObj &&
      (virtualObj[ctName] || []).forEach((child: any) => {
        if (child.className) {
          child.className = child.className.replace(
            'temporary-node-back',
            '',
          );
          if (!child.className) {
            delete child.className;
          }
        }
      });
  }
}


// 动态设置上移/下移的显示
export function showUpOrDown(activeTarget: any, levelArray: string[]) {
  const showChildList: any[] = getShowChildList(activeTarget.parentElement);
  const upElement: HTMLElement = document.getElementById(
    'up-btn',
  ) as HTMLElement;
  const downElement: HTMLElement = document.getElementById(
    'down-btn',
  ) as HTMLElement;
  if (levelArray && levelArray.length) {
    let lastIndexArr = levelArray[levelArray.length - 1].split('.');
    if (!lastIndexArr[1]) {
      upElement.style.display = 'none';
      downElement.style.display = 'none';
      return false;
    }
    // 第一个子元素无上移操作
    if (Number(lastIndexArr[1]) === 0) {
      upElement.style.display = 'none';
    } else {
      upElement.style.display = 'inline-block';
    }
    // 最后一个子元素无下移操作
    if (Number(lastIndexArr[1]) === showChildList.length - 1) {
      downElement.style.display = 'none';
    } else {
      downElement.style.display = 'inline-block';
    }
  }
}
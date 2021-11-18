import { FC } from 'react';
import { useContext } from 'react';
import { render as renderAmis } from 'amis';
import { cloneDeep } from 'lodash';

import { indexContext } from '../state/context-manager';
import { fetcher } from '../utils/fetcher';

import 'amis/lib/themes/default.css';
import 'font-awesome/css/font-awesome.css';
import '../asset/fonts/iconfont.css';

export const AmisPage: FC = () => {
  const { codeObj, isPreview } = useContext(indexContext);
  // bizsdkdnd-path 后面跟的是元素路径，如body.0-body.0
  // bizsdkdnd-ct 代表容器类型，如body,aside,buttons等
  function setClassName(item: any, suffix: string) {
    const typeName = ['page', 'form', 'flex', 'wrapper', 'group', 'service'].includes(item.type)
      ? 'box'
      : 'item';

    const isBody = ['page', 'form', 'wrapper', 'group', 'service'].includes(item.type);

    // 是否有panel包裹
    const isPanel = item.type === 'form' && item.wrapWithPanel !== false;
    const classKey = isPanel ? 'panelClassName' : 'className';
    const prefixClass = isPanel
      ? `a-Panel--default bizsdkdnd-class bizsdkdnd-${item.type}`
      : `bizsdkdnd-class bizsdkdnd-${item.type}`;
    if (item[classKey]) {
      if (!item[classKey].includes('temporary-node-back')) {
        item[
          classKey
        ] += ` ${prefixClass} bizsdkdnd-${typeName} bizsdkdnd-path${suffix}${
          isBody ? ' bizsdkdnd-ct-body' : ''
        }`;
      }
    } else {
      item[
        classKey
      ] = `${prefixClass} bizsdkdnd-${typeName} bizsdkdnd-path${suffix}${
        isBody ? ' bizsdkdnd-ct-body' : ''
      }`;
    }

    if (item.visibleOn) {
      item.visibleOn = isPreview ? item.visibleOn : true
      item[classKey] += ' visible-box'
    }

    if (item.type === 'page') {
      ['body', 'aside'].forEach((subbox) => {
        if (item[subbox]) {
          item[
            `${subbox}ClassName`
          ] += ` bizsdkdnd-subbox bizsdkdnd-path${suffix} bizsdkdnd-ct-${subbox}`;
          if (item[subbox].length && Array.isArray(item[subbox])) {
            item[subbox].forEach((element: any, index: number) => {
              setClassName(
                element,
                suffix ? `${suffix}-${subbox}.${index}` : `-${subbox}.${index}`,
              );
            });
          }
        }
      });
    } else if (item.type === 'button-group') {
      item[classKey] += ' bizsdkdnd-ct-buttons';
      if (item.buttons && item.buttons.length && Array.isArray(item.buttons)) {
        item.buttons.forEach((element: any, index: number) => {
          setClassName(
            element,
            suffix ? `${suffix}-buttons.${index}` : `-buttons.${index}`,
          );
        });
      }
    } else if (item.type === 'flex') {
      item[classKey] += ' bizsdkdnd-ct-items';
      if (item.items && item.items.length && Array.isArray(item.items)) {
        item.items.forEach((element: any, index: number) => {
          setClassName(
            element,
            suffix ? `${suffix}-items.${index}` : `-items.${index}`,
          );
        });
      }
    } else if(item.type === 'input-tree') {
      item.initiallyOpen = isPreview ? item.initiallyOpen : false
    } else if (item.type === 'crud') {
      // item[classKey] += ' bizsdkdnd-ct-filter.body';
      if(item.filter) {
        let filterClassName = item.filter.wrapWithPanel !== false ? 'panelClassName' : 'className';
        const prefixClass = `bizsdkdnd-class bizsdkdnd-${item.type}`;
        item.filter[
          filterClassName
        ] = `${prefixClass} bizsdkdnd-box bizsdkdnd-ct-body bizsdkdnd-path${suffix}-filter`;
      }
      if (item.filter && item.filter.body && Array.isArray(item.filter.body)) {
        item.filter.body.forEach((element: any, index: number) => {
          setClassName(
            element,
            suffix ? `${suffix}-filter-body.${index}` : `-filter-body.${index}`,
          );
        });
      }
    } else {
      if (item.body && item.body.length && Array.isArray(item.body)) {
        item.body.forEach((element: any, index: number) => {
          setClassName(
            element,
            suffix ? `${suffix}-body.${index}` : `-body.${index}`,
          );
        });
      }
    }
  }

  const cloneCodeObj = cloneDeep(codeObj);
  setClassName(cloneCodeObj, '');
  return (
    <div
      key={String(isPreview)}
      className={isPreview ? '' : 'ae-Preview is-edting'}
      style={{
        height: '100%',
      }}
    >
      {renderAmis(
        cloneCodeObj,
        {
          locale: 'en-US',
        },
        {
          fetcher,
        },
      )}
    </div>
  );
};

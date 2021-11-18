import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { useContext } from 'react';

import { indexContext } from '../state/context-manager';
import { cloneDeep } from 'lodash';
import { componentsList } from './data/components';

export interface DragComponentsProps {
  name: string;
  alias?: string;
  code: any;
  icon?: string;
  dialog?: string | undefined;
}

interface DropResult {
  name: string;
  type: string;
  code: any;
  dialog: string | undefined;
}

export const DragComponents: FC<DragComponentsProps> = function DragComponents({
  name,
  alias,
  code,
  icon,
  dialog,
}) {
  const {
    setDraggingItem,
    codeObjBack,
    setCodeObj,
    setCurrentBoxClass,
  } = useContext(indexContext);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        // alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const getIconClass = (type: string) => {
    const iconData = componentsList.find((item:any) => item.code && item.code.type === type);
    return iconData && iconData.icon || 'Page'
  }

  const opacity = isDragging ? 0.4 : 1;

  const iconClass = icon ? icon : getIconClass(code.type)

  return (
    <div
      ref={drag}
      role="DragComponents"
      className="drag-components-item"
      style={{ opacity }}
      title={alias ? alias : name.charAt(0).toUpperCase() + name.slice(1)}
      data-testid={`box-${name}`}
      onDragEnd={(event: any) => {
        setCodeObj(cloneDeep(codeObjBack));
      }}
      onDragStart={(event: any) => {
        setDraggingItem({ type: 'basic', name, code, dialog });
        setCurrentBoxClass('');
      }}
    >
      <span className={`vs vs-${iconClass}`} style={{fontSize: '12px', marginRight: '8px'}}></span>
      {alias ? alias : name.charAt(0).toUpperCase() + name.slice(1)}
    </div>
  );
};

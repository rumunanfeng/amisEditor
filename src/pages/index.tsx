import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { message } from 'antd';
// import { debounce } from 'lodash'

import { LeftPage } from '../components/LeftPage';
import { MidPage } from '../components/MidPage';
import { RightPage } from '../components/RightPage';
import { indexContext } from '../state/context-manager';
import '../components/renderer/cssFormItem';

// 英文翻译
import 'amis/lib/locale/en-US';
// import 'amis/lib/helper.css';
import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
// import 'amis/sdk/iconfont.css';
import '../utils/icons';
import '../global.less';
import '../build.less';

export default function IndexPage() {
  const [draggingItem, setDraggingItem] = useState({ name: 'input' });
  const [currentLevelArray, setCurrentLevelArray] = useState([]);
  const [currentComponent, setCurrentComponent] = useState({});
  const [isPreview, setIsPreview] = useState(false);
  const [codeUpdateKey, setCodeUpdateKey] = useState(0);
  const [currentBoxClass, setCurrentBoxClass] = useState('');
  const [pageInfo, setPageInfo] = useState({});

  let initData = {
    type: 'page',
    aside: [
      {
        type: 'flex',
        className: 'b-b',
        items: [
          {
            type: 'wrapper',
            className: 'p-sm',
            body: [
              {
                type: 'tpl',
                tpl: 'Rule Context',
                inline: false,
              },
            ],
          },
          {
            type: 'wrapper',
            className: 'p-sm',
            body: [
              {
                type: 'button-group',
                buttons: [
                  {
                    type: 'button',
                    label: '',
                    size: 'xs',
                    icon: 'fa fa-plus',
                  },
                ],
              },
            ],
          },
        ],
        justify: 'space-between',
        alignItems: 'center',
        direction: 'row',
      },
      {
        type: 'flex',
        items: [
          {
            type: 'wrapper',
            body: [
              {
                type: 'select',
                name: 'system',
                options: [
                  {
                    label: 'OSS_IM',
                    value: 'oss_im',
                  },
                ],
              },
            ],
            className: 'flex-1 p-sm p-b-none',
          },
          {
            type: 'wrapper',
            body: [
              {
                type: 'select',
                name: 'type',
                options: [
                  {
                    label: '类型1',
                    value: '1',
                  },
                ],
              },
            ],
            className: 'flex-1 p-sm p-b-none',
          },
        ],
      },
      {
        type: 'input-text',
        label: '',
        name: 'keyword',
        className: 'p-sm',
        addOn: {
          label: '',
          type: 'text',
          position: 'right',
          icon: 'fa fa-search',
        },
        placeholder: 'Please Enter Keyword Query',
      },
      {
        type: 'form',
        submitOnChange: true,
        wrapWithPanel: false,
        target: 'my_form',
        body: [
          {
            type: 'input-tree',
            label: '',
            name: 'treeData',
            showRadio: true,
            multiple: false,
            joinValues: false,
            className: 'no-border',
            labelField: 'name',
            valueField: 'id',
            source: {
              name: 'getTree',
              method: 'get',
              url: 'https://www.fastmock.site/mock/5d74c58f4df39b526ef1713a19a222b6/ab/tree',
            },
            addApi: {
              name: 'addTree',
              method: 'post',
              url: 'https://www.fastmock.site/mock/5d74c58f4df39b526ef1713a19a222b6/ab/tree',
            },
            creatable: true,
            editApi: {
              name: 'editTree',
              method: 'put',
              url: 'https://www.fastmock.site/mock/5d74c58f4df39b526ef1713a19a222b6/ab/tree',
            },
            editable: true,
            deleteApi: {
              name: 'deleteTree',
              method: 'delete',
              url: 'https://www.fastmock.site/mock/5d74c58f4df39b526ef1713a19a222b6/ab/tree?id=${id}',
            },
            removable: true,
            addControls: [
              {
                name: 'name',
                label: 'name',
                type: 'input-text',
              },
              {
                name: 'start_date',
                label: 'start_date',
                type: 'input-text',
              },
            ],
            editControls: [
              {
                name: 'name',
                label: 'name',
                type: 'input-text',
              },
              {
                name: 'start_date',
                label: 'start_date',
                type: 'input-text',
              },
            ],
            body: [],
          },
        ],
      },
    ],
    body: [
      {
        type: 'form',
        body: [
          {
            name: 'id',
            label: 'id1',
            type: 'input-text',
          },
          {
            name: 'name',
            label: 'name1',
            type: 'input-text',
          },
          {
            name: 'start_date',
            label: 'start_date1',
            type: 'input-text',
          },
        ],
        api: {
          type: 'get',
          method: 'getList',
          url: 'https://www.fastmock.site/mock/5d74c58f4df39b526ef1713a19a222b6/ab/list',
        },
      },
    ],
    asideClassName: 'b-a bg-white m-r-sm w-96',
    bodyClassName: 'b-l b-r b-b bg-white',
    headerClassName: '',
    title: 'Basic Information',
  };

  const [codeObjBack, setCodeObjBack] = useState(initData);
  const [codeObj, setCodeObj] = useState(initData);

  useEffect(() => {
    window.addEventListener('keydown', ctrlSSave);
    return () => {
      window.removeEventListener('keydown', ctrlSSave);
    };
  });

  function ctrlSSave(e: any) {
    if (e.repeat) {
      return;
    }
    if (
      e.keyCode == 83 &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      window.removeEventListener('keydown', ctrlSSave);
      saveData();
    }
  }
  // 保存页面
  function saveData() {
    try {
      setPageInfo({ ...pageInfo, code: codeObj });
      message.success('Save successfully');
    } catch (error) {
      message.error(error.message);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <indexContext.Provider
          value={{
            pageInfo,
            setPageInfo,
            codeObj,
            setCodeObj,
            codeObjBack,
            setCodeObjBack,
            draggingItem,
            setDraggingItem,
            currentLevelArray,
            setCurrentLevelArray,
            currentComponent,
            setCurrentComponent,
            isPreview,
            setIsPreview,
            codeUpdateKey,
            setCodeUpdateKey,
            currentBoxClass,
            setCurrentBoxClass,
          }}
        >
          <LeftPage />
          <MidPage />
          <RightPage />
        </indexContext.Provider>
      </DndProvider>
    </div>
  );
}

export const blocks:any = {
  query: [
    {
      name: 'Simple Query',
      cname: '简单查询表格',
      cover: 'https://cdn.nlark.com/yuque/0/2021/jpeg/378868/1627890493874-52a87899-92ab-4a10-9940-df8dd3c070c0.jpeg',
      code: {
        type: 'page',
        body: [
          {
            type: 'flex',
            items: [
              {
                type: 'wrapper',
                className: 'p-0',
                body: [
                  {
                    type: 'button',
                    label: 'New',
                    icon: 'fa fa-plus',
                    level: 'info',
                    actionType: 'dialog',
                    dialog: {
                      title: '新建',
                      body: '新建数据',
                    },
                  },
                ],
              },
              {
                type: 'wrapper',
                className: 'p-0',
                body: [
                  {
                    type: 'input-text',
                    label: '',
                    name: 'text',
                    className: 'w-lg p-sm m-b-none',
                    addOn: {
                      label: '',
                      type: 'button',
                      position: 'right',
                      icon: 'fa fa-search',
                      actionType: 'ajax',
                      api: {
                        method: 'get',
                        url: 'https://www.fastmock.site/mock/5d74c58f4df39b526ef1713a19a222b6/ab/list',
                        data: {
                          keyword: '${text}',
                        },
                      },
                    },
                    placeholder: 'Please Enter Keyword Query',
                  },
                ],
              },
            ],
            justify: 'space-between',
            alignItems: 'center',
            direction: 'row',
          },
          {
            type: 'crud',
            name: 'my_crud',
            headerToolbar: ['bulkActions'],
            bulkActions: [
              {
                type: 'button',
                label: 'Edit',
                icon: 'fa fa-edit',
                disabledOn: 'this.selectedItems.length > 1',
                actionType: 'dialog',
                dialog: {
                  title: '编辑',
                  body: '编辑数据',
                },
              },
              {
                type: 'button',
                label: 'Delete',
                actionType: 'ajax',
                api: 'delete:https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/${ids|raw}',
                confirmText: '确定要批量删除?',
                icon: 'fa fa-trash-o',
              },
            ],
            keepItemSelectionOnPageChange: true,
            api: 'https://www.fastmock.site/mock/5d74c58f4df39b526ef1713a19a222b6/ab/list',
            rows: [],
            columns: [
              {
                name: 'id',
                label: 'id',
                type: 'text',
              },
              {
                name: 'name',
                label: 'name',
                type: 'text',
              },
              {
                name: 'age',
                label: 'age',
                type: 'text',
              },
            ],
            __saved: 1626422998237,
          },
        ],
        bodyClassName: 'b-l b-r b-b bg-white m-r-sm m-l-sm m-b-sm',
        headerClassName: 'bg-white m-t-sm m-r-sm m-l-sm b-l b-r b-t h-11',
        title: 'Simple Query',
      }
    },
    {
      name: 'Complex Query',
      cname: '复杂查询表格',
      cover: 'https://cdn.nlark.com/yuque/0/2021/jpeg/378868/1627890493874-52a87899-92ab-4a10-9940-df8dd3c070c0.jpeg',
      code: {
        type: 'page',
        body: [
          {
            type: 'crud',
            name: 'my_crud',
            headerToolbar: ['bulkActions'],
            filter: {
              body: [
                {
                  type: "input-text",
                  name: "name",
                  label: "name",
                  placeholder: "Please Enter"
                }
              ]
            },
            bulkActions: [
              {
                type: 'button',
                label: 'Edit',
                icon: 'fa fa-edit',
                disabledOn: 'this.selectedItems.length > 1',
                actionType: 'dialog',
                dialog: {
                  title: '编辑',
                  body: '编辑数据',
                },
              },
              {
                type: 'button',
                label: 'Delete',
                actionType: 'ajax',
                api: 'delete:https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/${ids|raw}',
                confirmText: '确定要批量删除?',
                icon: 'fa fa-trash-o',
              },
            ],
            keepItemSelectionOnPageChange: true,
            api: 'https://www.fastmock.site/mock/5d74c58f4df39b526ef1713a19a222b6/ab/list',
            rows: [],
            columns: [
              {
                name: 'id',
                label: 'id',
                type: 'text',
              },
              {
                name: 'name',
                label: 'name',
                type: 'text',
              },
              {
                name: 'age',
                label: 'age',
                type: 'text',
              },
            ],
            __saved: 1626422998237,
          },
        ],
        bodyClassName: 'b-l b-r b-b bg-white m-r-sm m-l-sm m-b-sm',
        headerClassName: 'bg-white m-t-sm m-r-sm m-l-sm b-l b-r b-t h-11',
        title: 'Complex Query',
      }
    },
    {
      name: 'Tree&Table',
      cname: '左右结构表格',
      cover: 'https://cdn.nlark.com/yuque/0/2021/jpeg/378868/1627890493874-52a87899-92ab-4a10-9940-df8dd3c070c0.jpeg',
      code: {
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
                    tpl: 'Sub Category',
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
                      {
                        type: 'button',
                        label: '',
                        size: 'xs',
                        icon: 'fa fa-edit',
                      },
                      {
                        type: 'button',
                        label: '',
                        size: 'xs',
                        icon: 'fa fa-trash-o',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'input-text',
            label: '',
            name: 'gradeName',
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
            target: 'my_crud',
            api: {
              method: 'get',
              url: 'https://www.fastmock.site/mock/5d74c58f4df39b526ef1713a19a222b6/ab/list',
            },
            body: [
              {
                type: 'input-tree',
                label: '',
                name: 'grade',
                className: 'no-border',
                options: [
                  {
                    label: '选项A1',
                    value: 'A',
                    children: [
                      {
                        label: '选项C',
                        value: 'C',
                      },
                      {
                        label: '选项D',
                        value: 'D',
                      },
                    ],
                  },
                  {
                    label: '选项B',
                    value: 'B',
                  },
                ],
              },
            ],
          },
        ],
        body: [
          {
            type: 'flex',
            items: [
              {
                type: 'wrapper',
                className: 'p-0',
                body: [
                  {
                    type: 'button',
                    label: 'New',
                    icon: 'fa fa-plus',
                    level: 'info',
                    actionType: 'dialog',
                    dialog: {
                      title: '新建',
                      body: '新建数据',
                    },
                  },
                ],
              },
              {
                type: 'wrapper',
                className: 'p-0',
                body: [
                  {
                    type: 'input-text',
                    label: '',
                    name: 'text',
                    className: 'w-lg p-sm m-b-none',
                    addOn: {
                      label: '',
                      type: 'button',
                      position: 'right',
                      icon: 'fa fa-search',
                      actionType: 'ajax',
                      api: {
                        method: 'get',
                        url: 'https://www.fastmock.site/mock/5d74c58f4df39b526ef1713a19a222b6/ab/list',
                        data: {
                          keyword: '${text}',
                        },
                      },
                    },
                    placeholder: 'Please Enter Keyword Query',
                  },
                ],
              },
            ],
            justify: 'space-between',
            alignItems: 'center',
            direction: 'row',
          },
          {
            type: 'crud',
            name: 'my_crud',
            headerToolbar: ['bulkActions'],
            bulkActions: [
              {
                type: 'button',
                label: 'Edit',
                icon: 'fa fa-edit',
                disabledOn: 'this.selectedItems.length > 1',
                actionType: 'dialog',
                dialog: {
                  title: '编辑',
                  body: '编辑数据',
                },
              },
              {
                type: 'button',
                label: 'Delete',
                actionType: 'ajax',
                api: 'delete:https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/${ids|raw}',
                confirmText: '确定要批量删除?',
                icon: 'fa fa-trash-o',
              },
            ],
            keepItemSelectionOnPageChange: true,
            api: 'https://www.fastmock.site/mock/5d74c58f4df39b526ef1713a19a222b6/ab/list',
            rows: [],
            columns: [
              {
                name: 'id',
                label: 'id',
                type: 'text',
              },
              {
                name: 'name',
                label: 'name',
                type: 'text',
              },
              {
                name: 'age',
                label: 'age',
                type: 'text',
              },
            ],
            __saved: 1626422998237,
          },
        ],
        asideClassName: 'b-a bg-white m-r-sm',
        bodyClassName: 'b-l b-r b-b bg-white m-r-sm m-b-sm',
        headerClassName: 'bg-white m-t-sm m-r-sm b-l b-r b-t h-11',
        title: 'Tree&Table',
      },
    },
  ],
  detail: [
    {
      name: 'Basic-Detail',
      cname: '基础详情',
      cover: 'https://cdn.nlark.com/yuque/0/2021/jpeg/378868/1627890493874-52a87899-92ab-4a10-9940-df8dd3c070c0.jpeg',
      code: {
        type: "page",
        bodyClassName: 'bg-white',
        title: 'Detail',
        body: [{
          type: "property",
          title: "User Info",
          items: [
            {
              label: "name",
              content: "Li Lei"
            },
            {
              label: "age",
              content: "24"
            },
            {
              label: "gender",
              content: "male"
            },
            {
              label: "description",
              content: "this is description",
              "span": 3
            }
          ]
        }]
      }
    }
    
  ],
  common: [
    {
      
      name: 'Basic-Form',
      cname: '基础表单',
      cover: 'https://cdn.nlark.com/yuque/0/2021/jpeg/378868/1627890493874-52a87899-92ab-4a10-9940-df8dd3c070c0.jpeg',
      code: {
        type: "page",
        bodyClassName: 'bg-white',
        title: 'Basic-Form',
        body: [{
          type: 'form',
          api: 'https://www.fastmock.site/mock/5d74c58f4df39b526ef1713a19a222b6/ab/saveForm',
          body: [
            {
              type: 'input-text',
              name: 'name',
              required: true,
              label: 'name',
            },
            {
              type: 'select',
              name: 'type',
              label: 'type',
            },
            {
              name: 'radios',
              type: 'radios',
              label: 'Radio',
              options: [
                {
                  label: 'option 1',
                  value: '1',
                },
                {
                  label: 'option 2',
                  value: '2',
                },
              ],
            },
          ],
        }]
      },
    },
  ]
};
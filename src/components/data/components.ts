export const componentsList: any = [
  {
    name: 'page',
    cname: '页面',
    attr: ['Page'],
    type: 'container',
    icon: 'Page',
    code: {
      type: 'page',
      body: [],
    },
  },
  {
    name: 'form',
    cname: '表单',
    attr: ['Form'],
    type: 'container',
    icon: 'Form',
    code: {
      type: 'form',
      body: [],
    },
  },
  {
    name: 'flex',
    cname: 'Flex布局',
    attr: ['Flex'],
    type: 'container',
    icon: 'Flex',
    code: {
      type: 'flex',
      items: [
        {
          type: 'wrapper',
          body: [
            {
              type: 'tpl',
              tpl: 'First column',
              inline: false,
            },
          ],
        },
        {
          type: 'wrapper',
          body: [
            {
              type: 'tpl',
              tpl: 'Second column',
              inline: false,
            },
          ],
        },
      ],
    },
  },
  {
    name: 'group',
    alias: 'Form Item Group',
    cname: '表单项组',
    type: 'container',
    attr: ['Group'],
    icon: 'wrapper',
    code: {
      type: 'group',
      body: [
        {
          type: 'input-text',
          label: 'Input',
          name: 'text',
        },
        {
          type: 'input-text',
          label: 'Input',
          name: 'text2',
        }
      ],
    },
  },
  {
    name: 'wrapper',
    cname: '包裹',
    attr: ['Wrapper'],
    type: 'container',
    icon: 'wrapper',
    code: {
      type: 'wrapper',
      body: [],
    },
  },
  {
    name: 'service',
    cname: '服务',
    attr: ['Service'],
    type: 'container',
    icon: 'wrapper',
    code: {
      type: 'service',
      className: 'p-sm',
      body: [],
    },
  },
  {
    name: 'input',
    cname: '文本框',
    type: 'formItem',
    icon: 'Input',
    attr: ['FormItem', 'InputText'],
    code: {
      type: 'input-text',
      label: 'Input',
      name: 'text',
    },
  },
  {
    name: 'inputNumber',
    alias: 'Number',
    cname: '数字框',
    type: 'formItem',
    icon: 'InputNumber',
    attr: ['FormItem', 'InputNumber'],
    code: {
      type: 'input-number',
      label: 'Number',
      name: 'number',
    },
  },
  {
    name: 'textarea',
    cname: '多行文本框',
    type: 'formItem',
    icon: 'Textarea',
    attr: ['FormItem', 'InputTextarea'],
    code: {
      type: 'textarea',
      label: 'Textarea',
      name: 'textarea',
    },
  },
  {
    name: 'select',
    cname: '选择框',
    type: 'formItem',
    icon: 'Select',
    attr: ['FormItem', 'Select'],
    code: {
      label: 'Select',
      type: 'select',
      name: 'select',
      options: [],
    },
  },
  {
    name: 'date',
    cname: '日期框',
    type: 'formItem',
    icon: 'Date',
    attr: ['FormItem', 'Date'],
    code: {
      label: 'Date',
      type: 'input-date',
      name: 'date',
    },
  },
  {
    name: 'dateRange',
    alias: 'Date Range',
    cname: '日期范围框',
    type: 'formItem',
    icon: 'Date',
    attr: ['FormItem', 'Date'],
    code: {
      label: 'Date',
      type: 'input-date-range',
      name: 'date',
    },
  },
  {
    name: 'month',
    cname: '月份选择',
    type: 'formItem',
    icon: 'Month',
    attr: ['FormItem', 'Date'],
    code: {
      label: 'Month',
      type: 'input-month',
      name: 'month',
    },
  },
  {
    name: 'year',
    cname: '年选择',
    type: 'formItem',
    icon: 'Year',
    attr: ['FormItem', 'Date'],
    code: {
      label: 'Year',
      type: 'input-year',
      name: 'month',
    },
  },
  {
    name: 'datetime',
    alias: 'Date Time',
    cname: '日期范围',
    type: 'formItem',
    icon: 'Datetime',
    attr: ['FormItem', 'Date'],
    code: {
      label: 'Date Time',
      type: 'input-datetime',
      name: 'datetime',
    },
  },
  {
    name: 'radio',
    cname: '单选框',
    type: 'formItem',
    icon: 'Radio',
    attr: ['FormItem', 'Radio'],
    code: {
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
  },
  {
    name: 'checkboxes',
    cname: '复选框',
    type: 'formItem',
    icon: 'Checkboxs',
    attr: ['FormItem', 'Checkboxes'],
    code: {
      type: 'checkboxes',
      label: 'checkbox',
      name: 'checkboxes',
      options: [
        {
          label: 'option A',
          value: 'A',
        },
        {
          label: 'option B',
          value: 'B',
        },
      ],
    },
  },
  {
    name: 'tree',
    cname: '树视图',
    type: 'formItem',
    icon: 'Tree',
    attr: ['FormItem', 'Tree'],
    code: {
      type: 'input-tree',
      label: '',
      name: 'tree',
      options: [
        {
          label: 'Option A',
          value: 'A',
          children: [
            {
              label: 'Option C',
              value: 'C',
            },
            {
              label: 'Option D',
              value: 'D',
            },
          ],
        },
        {
          label: 'Option B',
          value: 'B',
        },
      ],
      value: '',
    },
  },
  {
    name: 'treeSelect',
    alias: 'Tree Select',
    cname: '树选择',
    type: 'formItem',
    icon: 'TreeSelect',
    attr: ['FormItem', 'TreeSelect'],
    code: {
      type: 'tree-select',
      label: 'Tree Select',
      name: 'treeSelect',
      options: [
        {
          label: 'Option A',
          value: 'A',
          children: [
            {
              label: 'Option C',
              value: 'C',
            },
            {
              label: 'Option D',
              value: 'D',
            },
          ],
        },
        {
          label: 'Option B',
          value: 'B',
        },
      ],
      value: '',
    },
  },
  {
    name: 'switch',
    cname: '开关',
    type: 'formItem',
    icon: 'Switch',
    attr: ['FormItem', 'Switch'],
    code: {
      type: 'switch',
      name: 'switch',
      label: 'switch',
      mode: 'inline',
      className: 'w-full',
    },
  },
  {
    name: 'crud',
    cname: 'CRUD',
    alias: 'CRUD',
    attr: ['Crud'],
    type: 'show',
    dialog: 'crud',
    icon: 'Crud',
    code: {
      type: 'crud',
      headerToolbar: [],
      bulkActions: [],
      keepItemSelectionOnPageChange: true,
      api: 'https://www.fastmock.site/mock/5d74c58f4df39b526ef1713a19a222b6/ab/list',
    },
  },
  {
    name: 'property',
    cname: '属性表',
    icon: 'Property',
    attr: ['Property'],
    type: 'show',
    code: {
      "type": "property",
      "title": "Property List",
      "items": [
        {
          "label": "name",
          "content": "Li Lei"
        },
        {
          "label": "age",
          "content": "24",
          "span": 2
        },
        {
          "label": "description",
          "content": "this is description",
          "span": 3
        }
      ]
    }
  },
  {
    name: 'tpl',
    alias: 'Template',
    cname: '模板',
    type: 'show',
    icon: 'Tpl',
    attr: ['Tpl'],
    code: {
      type: 'tpl',
      inline: false,
      tpl: 'Hello World',
    },
  },
  {
    name: 'button',
    cname: '按钮',
    type: 'other',
    icon: 'Button',
    attr: ['Button'],
    code: {
      type: 'button',
      label: 'Button',
    },
  },
  {
    name: 'buttonGroup',
    alias: 'Button Group',
    cname: '按钮组',
    type: 'other',
    icon: 'ButtonGrord',
    attr: ['ButtonGroup'],
    code: {
      type: 'button-group',
      className: 'p-xs',
      buttons: [
        {
          type: 'button',
          label: 'Button 1',
        },
        {
          type: 'button',
          label: 'Button 2',
        },
      ],
    },
  },
  {
    name: 'divider',
    cname: '分割线',
    type: 'other',
    icon: 'Divider',
    attr: ['Divider'],
    code: {
      type: 'divider',
    },
  },
];

import axios from 'axios';
import { render as renderAmis } from 'amis';
import { str2rules, isObject, defaultValue } from '../../utils/utils';
interface ComponentsInterface {
  changeForm: Function;
  value: any;
}

const validateList = [
  { label: 'Email', value: 'isEmail' },
  { label: 'Url', value: 'isUrl' },
  { label: 'Number', value: 'isNumeric' },
  { label: 'Alphabet', value: 'isAlpha' },
  { label: 'Alphabet and Number', value: 'isAlphanumeric' },
  { label: 'Integer', value: 'isInt' },
  { label: 'Floating-point numbers', value: 'isFloat' },
  { label: 'Fixed length', value: 'isLength' },
  { label: 'Maximum length', value: 'maxLength' },
  { label: 'Minimum length', value: 'minLength' },
  { label: 'Maximum value', value: 'maximum' },
  { label: 'Minimum value', value: 'minimum' },
  { label: 'JSON', value: 'isJson' },
  { label: 'Same as the specified value', value: 'equals' },
  { label: 'Same as the specified field value', value: 'equalsField' },
  { label: 'Customized regularity', value: 'matchRegexp' },
  { label: 'Customized regularity 2', value: 'matchRegexp1' },
  { label: 'Customized regularity 3', value: 'matchRegexp2' },
  { label: 'Customized regularity 4', value: 'matchRegexp3' },
  { label: 'Customized regularity 5', value: 'matchRegexp4' },
];

const notInput = [
  'isEmail',
  'isUrl',
  'isNumeric',
  'isAlpha',
  'isAlphanumeric',
  'isInt',
  'isFloat',
  'isJson',
];

const validationErrors = [
  { label: '邮箱格式', value: 'isEmail' },
  { label: 'Url格式', value: 'isUrl' },
  { label: '数字', value: 'isNumeric' },
  { label: '字母', value: 'isAlpha' },
  { label: '字母和数字', value: 'isAlphanumeric' },
  { label: '整型数字', value: 'isInt' },
  { label: '浮点型数字', value: 'isFloat' },
  { label: '固定长度', value: 'isLength' },
  { label: '最大长度', value: 'maxLength' },
  { label: '最小长度', value: 'minLength' },
  { label: '最大值', value: 'maximum' },
  { label: '最小值', value: 'minimum' },
  { label: 'JSON格式', value: 'isJson' },
  { label: '与指定值相同', value: 'equals' },
  { label: '与指定字段值相同', value: 'equalsField' },
  { label: '自定义正则', value: 'matchRegexp' },
  { label: '自定义正则2', value: 'matchRegexp1' },
  { label: '自定义正则3', value: 'matchRegexp2' },
  { label: '自定义正则4', value: 'matchRegexp3' },
  { label: '自定义正则5', value: 'matchRegexp4' },
];

export const FormItem = function ({ changeForm, value }: ComponentsInterface) {
  return (
    <div>
      {renderAmis(
        {
          type: 'form',
          submitOnChange: true,
          wrapWithPanel: false,
          data: value,
          onChange: (value: any) => {
            changeForm(value);
          },
          body: [
            {
              type: 'input-text',
              name: 'name',
              required: true,
              label: 'Field Name',
            },
            {
              type: 'input-text',
              name: 'label',
              label: 'Label',
            },
            {
              type: 'switch',
              name: 'readOnly',
              label: 'Read Only',
              mode: 'inline',
              className: 'w-full',
            },
            {
              type: 'switch',
              name: 'disabled',
              label: 'Disabled',
              mode: 'inline',
              className: 'w-full',
            },
            {
              type: 'switch',
              name: 'required',
              label: 'Required',
              mode: 'inline',
              className: 'w-full',
            },
            {
              name: 'desc',
              type: 'textarea',
              label: 'Description',
              descrition: 'Support template syntax such as： ${xxx}',
            },
            {
              label: 'Placeholder',
              name: 'placeholder',
              type: 'input-text',
              placeholder: 'placeholder',
            },
            {
              label: 'Enable Label information prompt',
              type: 'switch',
              name: 'labelRemark',
              mode: 'inline',
              className: 'w-full',
              description:
                'Display an icon next to the Label that displays a detailed description when the mouse is placed over it',
              visibleOn: 'this.label',
              pipeIn: function (e: any) {
                return !!e;
              },
              pipeOut: function (e: any) {
                return e
                  ? {
                      icon: 'fa fa-question-circle',
                      trigger: ['hover', 'focus'],
                      className: 'Remark--warning',
                    }
                  : null;
              },
            },
            {
              type: 'combo',
              name: 'labelRemark',
              className: 'no-padder',
              visibleOn: 'this.labelRemark',
              multiLine: !0,
              controls: [
                { name: 'title', type: 'text', label: 'title' },
                { name: 'content', type: 'textarea', label: 'content' },
                {
                  name: 'placement',
                  type: 'button-group',
                  size: 'xs',
                  label: 'placement',
                  options: [
                    { label: 'left', value: 'left' },
                    { label: 'top', value: 'top' },
                    { label: 'right', value: 'right' },
                    { label: 'bottom', value: 'bottom' },
                  ],
                },
                { name: 'icon', label: 'icon', type: 'icon-picker' },
                { name: 'className', label: 'className', type: 'text' },
                {
                  name: 'trigger',
                  type: 'select',
                  label: 'trigger',
                  multiple: !0,
                  pipeIn: function (e: any) {
                    return Array.isArray(e) ? e.join(',') : [];
                  },
                  pipeOut: function (e: any) {
                    return e && e.length ? e.split(',') : void 0;
                  },
                  options: [
                    { label: 'hover', value: 'hover' },
                    { label: 'focus', value: 'focus' },
                    { label: 'click', value: 'click' },
                  ],
                },
                {
                  name: 'rootClose',
                  visibleOn: '~this.trigger.indexOf("click")',
                  label: 'Click blank to close',
                  type: 'switch',
                },
              ],
            },
            // 外观
            {
              label: 'Display mode',
              name: 'mode',
              type: 'button-group-select',
              size: 'sm',
              pipeIn: function (e: any) {
                return e ? e : '';
              },
              option: 'inherit',
              options: [
                { label: 'Inherit', value: '' },
                { label: 'Normal', value: 'normal' },
                { label: 'Inline', value: 'inline' },
                { label: 'Horizontal', value: 'horizontal' },
              ],
            },
            {
              label: 'Form items inline',
              name: 'inline',
              type: 'switch',
              visibleOn: 'data.mode != "inline"',
              mode: 'inline',
              className: 'w-full',
            },
            {
              name: 'size',
              label: 'Size',
              type: 'button-group-select',
              size: 'sm',
              pipeIn: function (e: any) {
                return e ? e : '';
              },
              options: [
                { label: 'Xs', value: 'xs' },
                { label: 'Sm', value: 'sm' },
                { label: 'Md', value: 'md' },
                { label: 'Lg', value: 'lg' },
                { label: 'Default', value: '' },
              ],
            },

            {
              type: "css-picker",
              label: 'CSS Class',
              name: 'className',
              labelRemark: {
                trigger: 'click',
                className: 'm-l-xs',
                content:
                  'What secondary CSS class names are available? Please go to <a href="https://baidu.github.io/amis/zh-CN/style/index" target="_blank">Style Description</a>, in addition you can add custom class names and then add custom styles in the system configuration.',
                placement: 'left',
              },
            },
            {
              type: "css-picker",
              label: 'Label CSS Class',
              name: 'labelClassName',
            },
            {
              type: "css-picker",
              label: 'Control Css Class',
              name: 'inputClassName',
            },

            {
              type: 'combo',
              syncDefaultValue: !1,
              name: 'validations',
              label: 'Validation rules',
              addButtonText: 'New Rules',
              multiple: !0,
              pipeIn: function (e: any) {
                if (
                  ('string' === typeof e && e && (e = str2rules(e)),
                  !isObject(e))
                ) {
                  return e;
                }
                let t: any[] = [];
                return (
                  Object.keys(e).forEach(function (a) {
                    let n: any;
                    /^\$\$/.test(a) ||
                      t.push(
                        // @ts-ignore
                        (((n = { type: a })[a] = Array.isArray(e[a])
                          ? e[a][0]
                          : e[a]),
                        n),
                      );
                  }),
                  t
                );
              },
              pipeOut: function (e:any) {
                console.log(e);
                if (!Array.isArray(e)) {
                  return e;
                }
                var t: any = {};
                return (
                  e.forEach(function (e) {
                    var a,
                      i =
                        e.type ||
                        ((a = validateList.find((item: any) => !t[item.value]))
                          ? a.value
                          : '') ||
                        validateList[0].value;
                    t[i] = e[i] || !!~notInput.indexOf(i) || '';
                  }),
                  t
                );
              },
              controls: [
                {
                  type: 'select',
                  unique: !0,
                  name: 'type',
                  options: validateList,
                  columnClassName: 'w-sm',
                },
                {
                  type: 'number',
                  name: 'isLength',
                  visibleOn: 'data.type == "isLength"',
                  placeholder: 'Set length',
                  value: '1',
                },
                {
                  type: 'number',
                  name: 'maximum',
                  visibleOn: 'data.type == "maximum"',
                  placeholder: 'Set maximum value',
                },
                {
                  type: 'number',
                  name: 'minimum',
                  visibleOn: 'data.type == "minimum"',
                  placeholder: 'Set minimum value',
                },
                {
                  type: 'number',
                  name: 'maxLength',
                  visibleOn: 'data.type == "maxLength"',
                  placeholder: 'Set maximum length',
                },
                {
                  type: 'number',
                  name: 'minLength',
                  visibleOn: 'data.type == "minLength"',
                  placeholder: 'Set minimum length',
                },
                {
                  type: 'text',
                  name: 'equals',
                  visibleOn: 'data.type == "equals"',
                  placeholder: 'Set value',
                  value: '',
                },
                {
                  type: 'text',
                  name: 'equalsField',
                  visibleOn: 'data.type == "equalsField"',
                  placeholder: 'Set field name',
                  value: '',
                },
                {
                  type: 'text',
                  name: 'matchRegexp',
                  visibleOn: 'data.type == "matchRegexp"',
                  placeholder: 'Set regular rules',
                },
                {
                  type: 'text',
                  name: 'matchRegexp1',
                  visibleOn: 'data.type == "matchRegexp1"',
                  placeholder: 'Set regular rules',
                },
                {
                  type: 'text',
                  name: 'matchRegexp2',
                  visibleOn: 'data.type == "matchRegexp2"',
                  placeholder: 'Set regular rules',
                },
                {
                  type: 'text',
                  name: 'matchRegexp3',
                  visibleOn: 'data.type == "matchRegexp3"',
                  placeholder: 'Set regular rules',
                },
                {
                  type: 'text',
                  name: 'matchRegexp4',
                  visibleOn: 'data.type == "matchRegexp4"',
                  placeholder: 'Set regular rules',
                },
              ],
            },
            {
              type: 'combo',
              syncDefaultValue: !1,
              name: 'validationErrors',
              label: 'Custom validation hints',
              description: 'Customizable when self-contained prompts are not met.',
              addButtonText: 'New tips',
              multiple: !0,
              pipeIn: function (e: any) {
                if (!isObject(e)) {
                  return e;
                }
                var t: any[] = [];
                return (
                  Object.keys(e).forEach(function (a) {
                    /^\$\$/.test(a) || t.push({ type: a, msg: e[a] });
                  }),
                  t
                );
              },
              pipeOut: function (a:any) {
                if (!Array.isArray(a)) {
                  return a;
                }
                var n: any = {};
                return (
                  a.forEach(function (a) {
                    var l,
                      i =
                        a.type ||
                        ((l = validateList.find((item: any) => !n[item.value]))
                          ? l.value
                          : '') ||
                        validateList[0].value;
                    n[i] = a.msg || validationErrors[i] || '';
                  }),
                  n
                );
              },
              controls: [
                {
                  type: 'select',
                  unique: !0,
                  name: 'type',
                  options: validateList,
                  columnClassName: 'w-sm',
                },
                { type: 'text', name: 'msg', placeholder: 'Tip Message' },
                {
                  type: 'formula',
                  name: 'msg',
                  initSet: !1,
                  formula:
                    "({\n                        isEmail: 'Email format is incorrect',\n                        isRequired: 'This is a required field',\n                        isUrl: 'Url 格式不正确',\n                        isInt: '请输入整形数字',\n                        isAlpha: '请输入字母',\n                        isNumeric: '请输入数字',\n                        isAlphanumeric: '请输入字母或者数字',\n                        isFloat: '请输入浮点型数值',\n                        isWords: '请输入字母',\n                        isUrlPath: '只能输入字母、数字、`-` 和 `_`.',\n                        matchRegexp: '格式不正确, 请输入符合规则为 `$1` 的内容。',\n                        minLength: '请输入更多的内容，至少输入 $1 个字符。',\n                        maxLength: '请控制内容长度, 请不要输入 $1 个字符以上',\n                        maximum: '当前输入值超出最大值 $1，请检查',\n                        minimum: '当前输入值低于最小值 $1，请检查',\n                        isJson: '请检查 Json 格式。',\n                        isLength: '请输入长度为 $1 的内容',\n                        notEmptyString: '请不要全输入空白字符',\n                        equalsField: '输入的数据与 $1 值不一致',\n                        equals: '输入的数据与 $1 不一致'\n                    })[data.type] || ''",
                },
              ],
            },
            {
              type: 'button-group-select',
              name: 'validateOnChange',
              label: 'Validate On Change',
              description: 'The default is to trigger validation every time a form is modified when it has been submitted.',
              size: 'xs',
              mode: 'inline',
              className: 'w-full',
              options: [
                { label: 'Default', value: '' },
                { label: 'Open', value: !0 },
                { label: 'Close', value: !1 },
              ],
              pipeIn: defaultValue(''),
              pipeOut: function (e: any) {
                return '' === e ? void 0 : !!e;
              },
            },
          ],
        },
        {
          locale: 'en-US',
        },
      )}
    </div>
  );
};

import axios from 'axios';
import { render as renderAmis } from 'amis';
import { visible } from './global'
interface ComponentsInterface {
  changeForm: Function;
  value: any;
}

export const Select = function ({ changeForm, value }: ComponentsInterface) {
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
              type: 'switch',
              name: 'value',
              label: 'Set default value',
              mode: 'inline',
              className: 'w-full',
              pipeIn: function (e: any) {
                return void 0 !== e;
              },
              pipeOut: function (e: any) {
                return e ? '' : void 0;
              },
              remark: 'Get by name when not set',
            },
            {
              type: 'select',
              name: 'value',
              label: 'Default Value',
              source: '${options}',
              visibleOn: '!data.multiple && typeof this.value !== "undefined"',
            },
            {
              type: 'select',
              name: 'value',
              label: 'Default Value',
              source: '${options}',
              multiple: !0,
              visibleOn: ' data.multiple && typeof this.value !== "undefined"',
            },
            {
              type: 'switch',
              name: 'clearable',
              mode: 'inline',
              className: 'w-full',
              label: 'Enable Clear button',
            },
            {
              label: 'Searchable',
              name: 'searchable',
              type: 'switch',
              mode: 'inline',
              className: 'w-full',
            },
            {
              label: 'Select First',
              name: 'selectFirst',
              type: 'switch',
              mode: 'inline',
              className: 'w-full',
            },
            {
              label: 'Multiple',
              name: 'multiple',
              type: 'switch',
              mode: 'inline',
              className: 'w-full',
            },
            {
              label: 'Values No Wrap',
              name: 'valuesNoWrap',
              type: 'switch',
              mode: 'inline',
              visibleOn: '!!data.multiple',
              className: 'w-full',
            },
            {
              label: 'Check All',
              name: 'checkAll',
              type: 'switch',
              mode: 'inline',
              value: !1,
              className: 'w-full',
            },
            {
              label: 'Customized menu templates',
              name: 'menuTpl',
              type: 'input-text',
            },
            {
              label: 'Default Check All',
              name: 'defaultCheckAll',
              type: 'switch',
              value: !1,
              visibleOn: 'this.checkAll',
              mode: 'inline',
              className: 'w-full',
            },
            {
              type: 'input-text',
              name: 'checkAllLabel',
              label: 'Check All Label',
              visibleOn: 'this.checkAll',
              value: 'Select All',
            },
            {
              label: 'Options',
              name: 'options',
              type: 'combo',
              multiple: !0,
              draggable: !0,
              addButtonText: 'New Options',
              scaffold: { label: '', value: '' },
              // pipeIn: function (e) {
              //   return s.normalizeOptions(e);
              // },
              controls: [
                {
                  type: 'input-text',
                  name: 'label',
                  placeholder: 'name',
                  required: !0,
                },
                {
                  type: 'input-text',
                  name: 'value',
                  placeholder: 'value',
                  unique: !0,
                },
              ],
            },
            visible,
            {
              name: 'source',
              type: 'input-text',
              label: 'Source Api',
              value: '',
              placeholder: 'http://',
              description: 'You can get dynamic options through the interface and pull them all at once.',
              visibleOn: "!this.source || typeof this.source === 'string'",
              className: 'm-b-none',
            },
            {
              name: 'labelField',
              type: 'input-text',
              label: 'Label Field',
              value: '',
            },
            {
              name: 'valueField',
              type: 'input-text',
              label: 'Value Field',
              value: '',
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

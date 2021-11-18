import axios from 'axios';
import { render as renderAmis } from 'amis';
import { defaultValue } from '../../utils/utils';
import { visible } from './global'
interface ComponentsInterface {
  changeForm: Function;
  value: any;
}

function getDefaultValue({ changeForm, value }: ComponentsInterface) {
  return [
    {
      type: 'switch',
      name: 'value',
      label: 'Set Defaults',
      mode: 'inline',
      className: 'w-full',
      pipeIn: (val: any) => {
        return void 0 !== val;
      },
      pipeOut: (val: any) => {
        if (val === false) {
          value.value = undefined;
          changeForm(value);
        }
        return val ? '' : void 0;
      },
      remark: 'When not set, get by name',
    },
    {
      type: 'input-text',
      name: 'value',
      label: 'Default Value',
      visibleOn: 'typeof this.value !== "undefined"',
    },
  ];
}

export const InputText = function ({ changeForm, value }: ComponentsInterface) {
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
            ...getDefaultValue({ changeForm, value }),
            {
              type: 'input-text',
              name: 'hint',
              label: 'Input Prompt',
            },
            {
              name: 'addOn',
              label: 'Enable addOn',
              type: 'switch',
              mode: 'inline',
              className: 'w-full',
              pipeIn: function (e:any) {
                return !!e;
              },
              pipeOut: function (e:any) {
                return e ? { label: 'Button', type: 'button' } : null;
              },
            },
            {
              type: 'combo',
              multiLine: !0,
              name: 'addOn',
              visibleOn: 'data.addOn',
              controls: [
                {
                  name: 'type',
                  label: 'Type',
                  type: 'button-group',
                  size: 'xs',
                  options: [
                    { label: 'text', value: 'text' },
                    { label: 'button', value: 'button' },
                    { label: 'submit', value: 'submit' },
                  ],
                },
                {
                  name: 'label',
                  label: 'text',
                  type: 'text',
                  visibleOn: 'this.type === "text"',
                },
                {
                  name: 'icon',
                  label: 'Icon',
                  type: 'icon-picker',
                  visibleOn: 'this.type === "text"',
                },
                {
                  name: 'position',
                  label: 'position',
                  type: 'button-group',
                  size: 'xs',
                  pipeIn: defaultValue('right'),
                  options: [
                    { label: 'left', value: 'left' },
                    { label: 'right', value: 'right' },
                  ],
                },
                visible
              ],
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

export const InputTextarea = function ({
  changeForm,
  value,
}: ComponentsInterface) {
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
            ...getDefaultValue({ changeForm, value }),
            {
              type: 'input-number',
              name: 'minRows',
              value: 3,
              label: 'min lines',
            },
            {
              type: 'input-number',
              name: 'maxRows',
              value: 20,
              label: 'max lines',
            },
            { type: 'switch', name: 'readOnly', label: 'read-only' },
            {
              type: 'switch',
              name: 'trimContents',
              label: 'Remove fronting and trailing white space',
              mode: 'inline',
              className: 'w-full',
              description:
                'When enabled, the user will not be allowed to enter before and after Spaces',
            },
            visible
          ],
        },
        {
          locale: 'en-US',
        },
      )}
    </div>
  );
};

export const InputNumber = function ({
  changeForm,
  value,
}: ComponentsInterface) {
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
              label: 'Set Defaults',
              mode: 'inline',
              className: 'w-full',
              pipeIn: (val: any) => {
                return void 0 !== val;
              },
              pipeOut: (val: any) => {
                if (val === false) {
                  value.value = undefined;
                  changeForm(value);
                }
                return val ? '' : void 0;
              },
              remark: 'When not set, get by name',
            },
            {
              type: 'input-number',
              name: 'value',
              label: 'Default value',
              visibleOn: 'typeof this.value !== "undefined"',
            },
            {
              type: 'input-text',
              name: 'min',
              label: 'Minimum',
              description:
                'Please enter a number or use <code>\\${xxx}</code> to get variables, otherwise the configuration will not take effect',
            },
            {
              type: 'input-text',
              name: 'max',
              label: 'Maximum',
              description:
                'Please enter a number or use <code>\\${xxx}</code> to get variables, otherwise the configuration will not take effect',
            },
            { type: 'input-number', name: 'step', label: 'Step' },
            {
              type: 'input-number',
              name: 'precision',
              label: 'Decimal point precision',
              min: 0,
              max: 100,
            },
            visible
          ],
        },
        {
          locale: 'en-US',
        },
      )}
    </div>
  );
};

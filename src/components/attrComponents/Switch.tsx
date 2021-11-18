import axios from 'axios';
import { render as renderAmis } from 'amis';

import { defaultValue, valuePipeOut } from '../../utils/utils';
import { visible } from './global'
interface ComponentsInterface {
  changeForm: Function;
  value: any;
}

export const Switch = function ({ changeForm, value }: ComponentsInterface) {
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
              type: 'switch',
              name: 'value',
              label: 'Default checkbox',
              mode: 'inline',
              className: 'w-full',
              visibleOn: 'typeof this.value !== "undefined"',
              pipeOut: function (e: boolean, t: boolean, a: any) {
                return e ? a.trueValue : a.falseValue;
              },
            },
            { name: 'option', type: 'input-text', label: 'Option Description' },
            {
              label: 'Option Location',
              name: 'optionAtLeft',
              type: 'button-group-select',
              size: 'sm',
              value: !1,
              options: [
                { label: 'Left', value: !0 },
                { label: 'Right', value: !1 },
              ],
            },
            {
              type: 'input-text',
              label: 'Value after checking',
              name: 'trueValue',
              value: !0,
              pipeOut: valuePipeOut,
            },
            {
              type: 'input-text',
              label: 'Unchecked values',
              name: 'falseValue',
              value: !1,
              pipeOut: valuePipeOut,
            },
            { name: 'onText', type: 'input-text', label: 'Text on opening' },
            { name: 'offText', type: 'input-text', label: 'Text on closing' },
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


  

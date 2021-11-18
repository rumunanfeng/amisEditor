import axios from 'axios';
import { render as renderAmis } from 'amis';

import { defaultValue } from '../../utils/utils';
import { visible } from './global'
interface ComponentsInterface {
  changeForm: Function;
  value: any;
}

function commonAttr({ changeForm, value }: ComponentsInterface) {
  return [
    {
      type: 'switch',
      name: 'value',
      label: 'Set Defaults',
      mode: 'inline',
      className: 'w-full',
      pipeIn: function (e: any) {
        return void 0 !== e;
      },
      pipeOut: function (e: any) {
        return e ? '' : void 0;
      },
      remark: 'When not set, get by name',
    },
    {
      type: 'radios',
      name: 'value',
      label: 'Default Value',
      source: '${options}',
      visibleOn: 'typeof this.value !== "undefined"',
      multiple: !0,
    },
    {
      label: 'Options',
      name: 'options',
      type: 'combo',
      multiple: !0,
      draggable: !0,
      addButtonText: 'Add Options',
      scaffold: { label: '', value: '' },
      // pipeIn: function (e) {
      //   return s.normalizeOptions(e);
      // },
      controls: [
        {
          type: 'text',
          name: 'label',
          placeholder: 'name',
          required: !0,
        },
        {
          type: 'text',
          name: 'value',
          placeholder: 'value',
          unique: !0,
        },
      ],
    },
    {
      label: 'Options are displayed on one line',
      name: 'inline',
      type: 'switch',
      visibleOn: 'data.mode != "inline"',
      mode: 'inline',
      className: 'w-full',
      pipeIn: defaultValue(!0),
    },
    {
      label: 'How many columns to display per row',
      name: 'columnsCount',
      hiddenOn: 'typeof data.inline === "undefined" || data.inline === true',
      type: 'input-range',
      min: 1,
      max: 6,
      pipeIn: defaultValue(1),
    },
  ];
}

export const Radio = function ({ changeForm, value }: ComponentsInterface) {
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
          body: [...commonAttr({ changeForm, value })],
          visible
        },
        {
          locale: 'en-US',
        },
      )}
    </div>
  );
};

export const Checkboxes = function ({
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
            ...commonAttr({ changeForm, value }),
            {
              name: 'checkAll',
              label: 'Whether to enable all selection',
              type: 'switch',
              mode: 'inline',
              className: 'w-full',
            },
            {
              name: 'defaultCheckAll',
              label: 'Whether to select all by default',
              type: 'switch',
              mode: 'inline',
              className: 'w-full',
              description:
                'If checked, the default configuration will be invalid.',
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

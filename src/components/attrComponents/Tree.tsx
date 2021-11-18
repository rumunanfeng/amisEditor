import axios from 'axios';
import { render as renderAmis } from 'amis';
import { defaultValue } from '../../utils/utils';
import { visible } from './global'
interface ComponentsInterface {
  changeForm: Function;
  value: any;
}

export const Tree = function ({ changeForm, value }: ComponentsInterface) {
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
          definitions: {
            options: {
              label: 'Options',
              name: 'options',
              type: 'combo',
              multiple: !0,
              multiLine: !0,
              draggable: !0,
              addButtonText: 'New Options',
              scaffold: { label: '', value: '' },
              items: [
                {
                  type: 'group',
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
                {
                  $ref: 'options',
                  label: 'Child Options',
                  name: 'children',
                  addButtonText: 'New Child Option',
                },
              ],
            },
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
              label: 'Multiple',
              name: 'multiple',
              type: 'switch',
              mode: 'inline',
              className: 'w-full',
            },

            {
              label: 'Options',
              name: 'options',
              type: 'combo',
              multiple: !0,
              multiLine: !0,
              draggable: !0,
              addButtonText: 'New Option',
              scaffold: { label: '', value: '' },
              items: [
                {
                  type: 'group',
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
                {
                  $ref: 'options',
                  label: 'Child Option',
                  name: 'children',
                  addButtonText: 'New Child Option',
                },
              ],
            },
            {
              name: 'showIcon',
              label: 'Show Icon',
              type: 'switch',
              mode: 'inline',
              className: 'w-full',
              pipeIn: defaultValue(!0),
            },
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
            {
              name: 'addApi',
              type: 'input-text',
              label: 'Add Api',
              value: '',
              placeholder: 'http://',
              visibleOn: "!this.addApi || typeof this.addApi === 'string'",
            },
            {
              name: 'editApi',
              type: 'input-text',
              label: 'Edit Api',
              value: '',
              placeholder: 'http://',
              visibleOn: "!this.editApi || typeof this.editApi === 'string'",
            },
            {
              name: 'deleteApi',
              type: 'input-text',
              label: 'Delete Api',
              value: '',
              placeholder: 'http://',
              visibleOn: "!this.deleteApi || typeof this.deleteApi === 'string'",
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

export const TreeSelect = function ({
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
          definitions: {
            options: {
              label: 'Options',
              name: 'options',
              type: 'combo',
              multiple: !0,
              multiLine: !0,
              draggable: !0,
              addButtonText: 'New Option',
              scaffold: { label: '', value: '' },
              items: [
                {
                  type: 'group',
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
                {
                  $ref: 'options',
                  label: 'Child Options',
                  name: 'children',
                  addButtonText: 'New Child Option',
                },
              ],
            },
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
              label: 'Default value',
              source: '${options}',
              visibleOn: '!data.multiple && typeof this.value !== "undefined"',
            },
            {
              type: 'select',
              name: 'value',
              label: 'Default value',
              source: '${options}',
              multiple: !0,
              visibleOn: ' data.multiple && typeof this.value !== "undefined"',
            },
            {
              label: 'Multiple',
              name: 'multiple',
              type: 'switch',
              mode: 'inline',
              className: 'w-full',
            },

            {
              label: 'Options',
              name: 'options',
              type: 'combo',
              multiple: !0,
              multiLine: !0,
              draggable: !0,
              addButtonText: 'New Option',
              scaffold: { label: '', value: '' },
              items: [
                {
                  type: 'group',
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
                {
                  $ref: 'options',
                  label: 'Child Option',
                  name: 'children',
                  addButtonText: 'New Child Option',
                },
              ],
            },
            {
              name: 'showIcon',
              label: 'Show Icon',
              type: 'switch',
              mode: 'inline',
              className: 'w-full',
              pipeIn: defaultValue(!0),
            },
            {
              name: 'initiallyOpen',
              label: 'Initially Open',
              type: 'switch',
              mode: 'inline',
              className: 'w-full',
              pipeIn: defaultValue(!0),
            },
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

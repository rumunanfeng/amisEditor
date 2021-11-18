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
    // {
    //   label: 'Type',
    //   type: 'select',
    //   name: 'type',
    //   options: [
    //     {
    //       label: 'date',
    //       value: 'input-date',
    //     },
    //     { label: 'month', value: 'input-month' },
    //     {
    //       label: 'quarter',
    //       value: 'input-quarter',
    //     },
    //     {
    //       label: 'year',
    //       value: 'input-year',
    //     },
    //   ],
    // },
    {
      type: 'input-text',
      name: 'format',
      label: 'Value format',
      description:
        'Please refer to the <a href="https://momentjs.com/" target="_blank">moment</a> for formatting usage.',
      pipeIn: defaultValue('X'),
    },
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
      placeholder: 'Please enter relative values',
      description:
        'Support <code>now, +1day, -2weeks</code> relative value usage',
    },
    {
      type: 'fieldSet',
      title: 'Use a fixed value',
      collapsed: !0,
      collapsable: !0,
      className: 'fieldset',
      visibleOn: 'typeof this.value !== "undefined"',
      controls: [
        {
          type: 'date',
          name: 'value',
          pipeIn: function (e: any) {
            return !e || ~['now', 'today'].indexOf(e) ? '' : e;
          },
        },
      ],
    },
    {
      type: 'switch',
      name: 'clearable',
      mode: 'inline',
      className: 'w-full',
      label: 'Enable the Clear button',
    },
  ];
}

export const Date = function ({ changeForm, value }: ComponentsInterface) {
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
              name: 'minDate',
              label: 'Minimum date',
              placeholder: 'Please enter relative values',
              description:
                '<code>now, +1day, -2weeks</code> and variables such as <code> ${start_date}</code> are supported',
            },
            {
              type: 'fieldSet',
              title: 'Use a fixed value',
              collapsed: !0,
              collapsable: !0,
              className: 'fieldset',
              controls: [
                {
                  type: 'date',
                  name: 'minDate',
                  pipeIn: function (e: any) {
                    return !e || ~['now', 'today'].indexOf(e) ? '' : e;
                  },
                },
              ],
            },
            { type: 'divider' },
            {
              type: 'input-text',
              name: 'maxDate',
              label: 'Maximum date',
              placeholder: 'Please enter relative values',
              description:
                '<code>now, +1day, -2weeks</code> and variables such as <code> ${start_date}</code> are supported',
            },
            {
              type: 'fieldSet',
              title: 'Use a fixed value',
              collapsed: !0,
              collapsable: !0,
              className: 'fieldset',
              controls: [
                {
                  type: 'date',
                  name: 'maxDate',
                  pipeIn: function (e: any) {
                    return !e || ~['now', 'today'].indexOf(e) ? '' : e;
                  },
                },
              ],
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

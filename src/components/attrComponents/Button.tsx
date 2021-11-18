import axios from 'axios';
import { render as renderAmis } from 'amis';

import { defaultValue } from '../../utils/utils';
import { visible } from './global'
interface ComponentsInterface {
  changeForm: Function;
  value: any;
}

export const Button = function ({ changeForm, value }: ComponentsInterface) {
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
            { label: 'Name', type: 'input-text', name: 'label' },
            {
              label: 'Type',
              type: 'button-group-select',
              name: 'type',
              size: 'sm',
              options: [
                { label: 'Button', value: 'button' },
                { label: 'Submit', value: 'submit' },
                { label: 'Reset', value: 'reset' },
              ],
            },
            {
              type: 'input-text',
              name: 'tooltip',
              //   hidden: t,
              label: 'Tooltip',
              description: 'This content pops up when the mouse hovers',
            },
            {
              type: 'button-group-select',
              name: 'tooltipPlacement',
              visibleOn: 'data.tooltip || data.disabledTip',
              label: 'Position of the tooltip',
              size: 'sm',
              mode: 'inline',
              className: 'w-full',
              value: 'bottom',
              options: [
                { label: 'Top', value: 'top' },
                { label: 'Right', value: 'right' },
                { label: 'Bottom', value: 'bottom' },
                { label: 'Left', value: 'left' },
              ],
            },
            {
              label: 'Icon',
              type: 'icon-picker',
              name: 'icon',
              placeholder: 'Click and then select the icon',
              clearable: !0,
              description: '',
            },
            {
              type: 'button-group-select',
              label: 'Position of the icon',
              clearable: !0,
              visibleOn: 'this.icon',
              name: 'iconClassName',
              size: 'sm',
              pipeIn: function (val: any) {
                return 'string' == typeof val &&
                  /\bpull\-(left|right)\b/.test(val)
                  ? RegExp.$1
                  : '';
              },
              pipeOut: function (val: any, oldVal: any) {
                return (oldVal || '')
                  .replace(/\bpull\-(left|right)\b/, '')
                  .trim() + val
                  ? 'pull-' + val
                  : '';
              },
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
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
              label: 'Style',
              type: 'select',
              name: 'level',
              // hidden: t,
              clearable: !1,
              btnActiveLevel: '',
              options: [
                {
                  label: 'default',
                  value: 'default',
                  level: 'default',
                },
                { label: 'link', value: 'link', level: 'link' },
                {
                  label: 'primary',
                  value: 'primary',
                  level: 'primary',
                },
                { label: 'light', value: 'light', level: 'light' },
                { label: 'dark', value: 'dark', level: 'dark' },
                { label: 'info', value: 'info', level: 'info' },
                {
                  label: 'success',
                  value: 'success',
                  level: 'success',
                },
                {
                  label: 'warning',
                  value: 'warning',
                  level: 'warning',
                },
                {
                  label: 'danger',
                  value: 'danger',
                  level: 'danger',
                },
              ],
            },
            {
              name: 'block',
              type: 'switch',
              label: 'Block',
              mode: 'inline',
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

export const ButtonGroup = function ({
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
              name: 'buttons',
              type: 'combo',
              label: 'Button management',
              multiple: !0,
              addable: !0,
              minLength: 1,
              draggable: !0,
              draggableTip: '',
              editable: !1,
              visibleOn: 'this.buttons && this.buttons.length',
              controls: [
                {
                  type: 'tpl',
                  inline: !1,
                  className: 'p-t-xs',
                  tpl: '<span class="label label-default"><% if (data.type === "button-group") { %> 按钮组 <% } else { %><%= data.label %><% if (data.icon) { %><i class="<%= data.icon %>"/><% }%><% } %></span>',
                },
              ],
              addButtonText: 'Add button',
              scaffold: { type: 'button', label: 'Button' },
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

import axios from 'axios';
import { render as renderAmis } from 'amis';
import { defaultValue } from '../../utils/utils';
import { visible } from './global'
interface ComponentsInterface {
  changeForm: Function;
  value: any;
}

export const Page = function ({ changeForm, value }: ComponentsInterface) {
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
            { label: 'Title', name: 'title', type: 'input-text' },
            { label: 'Sub Title', name: 'subTitle', type: 'input-text' },
            {
              label: 'Remark',
              name: 'remark',
              type: 'textarea',
              visibleOn: 'data.title',
              description:
                'An alert icon will appear near the title, and mouse over it will prompt for that content.',
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
              label: 'Header CSS Class',
              name: 'headerClassName',
            },
            {
              type: "css-picker",
              label: 'Body CSS Class',
              name: 'bodyClassName',
            },
            {
              type: "css-picker",
              label: 'Aside CSS Class',
              name: 'asideClassName',
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

export const Flex = function ({ changeForm, value }: ComponentsInterface) {
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
              name: 'items',
              label: 'Content Collection',
              type: 'combo',
              scaffold: { type: 'wrapper', body: 'Child Node Content' },
              minLength: 2,
              multiple: !0,
              draggableTip: '',
              controls: [
                {
                  type: 'tpl',
                  tpl: '<span class="label label-default">Child Node${index | plus}</span>',
                },
              ],
            },
            {
              name: 'justify',
              type: 'select',
              value: 'center',
              label: 'Horizontal distribution method',
              options: [
                'start',
                'flex-start',
                'center',
                'end',
                'flex-end',
                'space-around',
                'space-between',
                'space-evenly',
              ],
            },
            {
              name: 'alignItems',
              type: 'select',
              value: 'center',
              label: 'Vertical position',
              options: [
                'stretch',
                'start',
                'flex-start',
                'flex-end',
                'end',
                'center',
                'baseline',
              ],
            },
            {
              name: 'direction',
              type: 'radios',
              label: 'Layout direction',
              value: 'row',
              inline: !0,
              options: [
                { label: 'row', value: 'row' },
                { label: 'column', value: 'column' },
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
              visible
            }
          ],
        },
        {
          locale: 'en-US',
        },
      )}
    </div>
  );
};

export const Wrapper = function ({ changeForm, value }: ComponentsInterface) {
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
              name: 'size',
              label: 'Size',
              type: 'button-group-select',
              options: [
                { label: 'Xs', value: 'xs' },
                { label: 'Sm', value: 'sm' },
                { label: 'Default', value: '' },
                { label: 'Md', value: 'md' },
                { label: 'Lg', value: 'lg' },
                { label: 'None', value: 'none' },
              ],
              pipeIn: defaultValue(''),
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

export const Service = function ({ changeForm, value }: ComponentsInterface) {
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

export const Divider = function ({ changeForm, value }: ComponentsInterface) {
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

export const Group = function ({ changeForm, value }: ComponentsInterface) {
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
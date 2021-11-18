import axios from 'axios';
import { render as renderAmis } from 'amis';

import { defaultValue } from '../../utils/utils';
import { visible } from './global'
interface ComponentsInterface {
  changeForm: Function;
  value: any;
}

export const Tpl = function ({ changeForm, value }: ComponentsInterface) {
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
              type: 'button-group-select',
              name: '__mode',
              label: 'Edit Mode',
              pipeIn: defaultValue('source'),
              size: 'sm',
              options: [
                { label: 'Source', value: 'source' },
                { label: 'Rich-Text', value: 'rich-text' },
              ],
            },
            {
              label: 'Content',
              type: 'input-rich-text',
              visibleOn: 'data.__mode =="rich-text"',
              required: !0,
              buttons: [
                'paragraphFormat',
                'quote',
                'color',
                '|',
                'bold',
                'italic',
                'underline',
                'strikeThrough',
                '|',
                'formatOL',
                'formatUL',
                'align',
                '|',
                'insertLink',
                'insertImage',
                'insertTable',
                '|',
                'undo',
                'redo',
                'fullscreen',
              ],
              pipeIn: function (e: any, t: any) {
                return e || (t && t.html);
              },
              name: 'tpl',
              description:
              'Support for using <code>\\${xxx}</code> to get variables, or the lodash.template syntax to write template logic. <a target="_blank" href="https://baidu.gitee.io/amis/zh-CN/docs/concepts/template">Detail</a>',
              size: 'lg',
            },
            {
              label: 'Content',
              type: 'textarea',
              required: !0,
              minRows: 5,
              language: 'html',
              visibleOn: 'data.__mode !="rich-text"',
              pipeIn: function (e: any, t: any) {
                return e || (t && t.html);
              },
              name: 'tpl',
              description:
                'Support for using <code>\\${xxx}</code> to get variables, or the lodash.template syntax to write template logic. <a target="_blank" href="https://baidu.gitee.io/amis/zh-CN/docs/concepts/template">Detail</a>',
            },
            {
              label: 'Inline Mode',
              type: 'switch',
              name: 'inline',
              mode: 'inline',
              className: 'w-full',
              value: !0,
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


export const Property = function ({ changeForm, value }: ComponentsInterface) {
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
            {
              label: 'Column Number',
              type: 'input-number',
              value: 3,
              name: 'column',
            },
            {
              type: 'radios',
              name: 'mode',
              inline: !0,
              value: 'table',
              label: 'Mode',
              options: ['table', 'simple'],
            },
            {
              label: 'Separator',
              type: 'text',
              name: 'separator',
              visibleOn: 'data.mode === "simple"',
            },
            { label: 'Source Data', type: 'input-text', name: 'source' },
            {
              label: 'Property List',
              name: 'items',
              type: 'combo',
              multiple: !0,
              multiLine: !0,
              draggable: !0,
              addButtonText: 'Add',
              controls: [
                {
                  type: 'text',
                  mode: 'inline',
                  size: 'sm',
                  label: 'Name',
                  name: 'label',
                },
                {
                  type: 'text',
                  mode: 'inline',
                  size: 'sm',
                  label: 'Value',
                  name: 'content',
                },
                {
                  type: 'number',
                  mode: 'inline',
                  size: 'sm',
                  label: 'Span',
                  value: 1,
                  name: 'span',
                },
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

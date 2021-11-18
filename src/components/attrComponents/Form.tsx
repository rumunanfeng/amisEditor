import axios from 'axios';
import { cloneDeep } from 'lodash'
import { render as renderAmis } from 'amis';
import { visible } from './global'
interface ComponentsInterface {
  changeForm: Function;
  value: any;
}

export const Form = function ({ changeForm, value }: ComponentsInterface) {
  const autoGroupChange = (codeData: any, groupNumber:number) => {
    const data = cloneDeep(codeData)
    const unGroupForm:any[] = [];
    (data.body || []).forEach((item:any) => {
      if (item.type === 'group') {
        if (item.body && item.body.length) {
          unGroupForm.push(...item.body)
        }
      } else {
        unGroupForm.push(item)
      }
    });
    if (groupNumber) {
      const groupData:any[] = []
      unGroupForm.forEach((item:any, index:number) => {
        if (index % groupNumber === 0) {
          groupData.push({
            type: 'group',
            body: [item]
          })
        } else {
          const groupIndex = Math.floor(index / groupNumber);
          groupData[groupIndex].body.push(item)
        }
      });
      data.body = groupData || []
    } else {
      data.body = unGroupForm || []
    }
    changeForm(data);
  }
  return (
    <div>
      {renderAmis(
        {
          type: 'form',
          submitOnChange: true,
          wrapWithPanel: false,
          data: value,
          onChange: (val: any, changeValue: any) => {
            if (changeValue.hasOwnProperty('_quickGroup')) {
              autoGroupChange(val, changeValue._quickGroup)
            } else {
              changeForm(val);
            }
          },
          body: [
            { label: 'Title', name: 'title', type: 'input-text' },
            {
              name: 'submitText',
              type: 'input-text',
              label: 'Submit button name',
              pipeIn: (value: any) => {
                return value || 'Submit';
              },
              visibleOn:
                "this.wrapWithPanel !== false && !this.actions && (!Array.isArray(this.controls) || !this.controls.some(function(item) {return !!~['submit','button','reset','button-group'].indexOf(item.type);}))",
              description: 'Valid when there is no custom button.',
            },
            {
              name: 'autoFocus',
              type: 'switch',
              label: 'Auto focus',
              mode: 'inline',
              className: 'block',
              labelRemark: {
                className: 'm-l-xs',
                trigger: 'hover',
                rootClose: !0,
                content:
                  'Set to give focus to the first inputable form item of the form',
                placement: 'left',
              },
            },
            {
              label: 'Change to commit',
              type: 'switch',
              name: 'submitOnChange',
              mode: 'inline',
              className: 'w-full',
              labelRemark: {
                trigger: 'hover',
                className: 'm-l-xs',
                rootClose: !0,
                content:
                  'Once set, each change in the form will trigger a submission',
                placement: 'left',
              },
            },
            {
              label: 'Reset the form after submission',
              type: 'switch',
              name: 'resetAfterSubmit',
              mode: 'inline',
              className: 'block',
              labelRemark: {
                className: 'm-l-xs',
                trigger: 'hover',
                rootClose: !0,
                content:
                  'Restore the values of all form items to their original values after the form is submitted',
                placement: 'left',
              },
            },
            {
              name: 'persistData',
              label: 'Whether to enable local cache',
              type: 'switch',
              mode: 'inline',
              className: 'block',
              labelRemark: {
                className: 'm-l-xs',
                trigger: 'hover',
                rootClose: !0,
                content:
                  'When enabled, the data of the form is cached in the browser. Switching the page or closing the pop-up box will not empty the data in the current form',
                placement: 'left',
              },
            },
            {
              name: 'clearPersistDataAfterSubmit',
              label: 'Clear local cache after successful submission',
              type: 'switch',
              mode: 'inline',
              className: 'block',
              visibleOn: 'data.persistData',
              labelRemark: {
                className: 'm-l-xs',
                trigger: 'hover',
                rootClose: !0,
                content:
                  'When the local cache is enabled and this configuration item is enabled, the cached data of the current form in the browser will be automatically cleared upon successful submission of the form',
                placement: 'left',
              },
            },
            {
              name: 'wrapWithPanel',
              type: 'switch',
              mode: 'inline',
              className: 'block',
              label: 'With a Panel',
              pipeIn: (value: any) => {
                return value === void 0 ? true : value;
              },
              labelRemark: {
                className: 'm-l-xs',
                trigger: 'hover',
                rootClose: !0,
                content:
                  'When closed, only the form items will be displayed; the title and action bar will not be displayed.',
                placement: 'left',
              },
            },
            {
              name: 'mode',
              label: 'Display mode',
              type: 'button-group-select',
              size: 'sm',
              pipeIn: (value: any) => {
                return value || 'normal';
              },
              options: [
                { label: 'Default', value: 'normal' },
                { label: 'Horizontal', value: 'horizontal' },
                { label: 'Inline', value: 'inline' },
              ],
            },
            {
              name: '_quickGroup',
              label: 'Quick group',
              type: 'button-group-select',
              size: 'sm',
              pipeIn: (value: any) => {
                return value || 0;
              },
              options: [
                { label: 'None', value: 0 },
                { label: 'One', value: 1 },
                { label: 'Two', value: 2 },
                { label: 'Tree', value: 3 },
                { label: 'Four', value: 4 }
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
              label: 'Panel CSS Class',
              name: 'panelClassName',
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

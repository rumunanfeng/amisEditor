import { render as renderAmis } from 'amis';
import { omit } from 'lodash';

import { fetcher } from '../../utils/fetcher';

interface ComponentsInterface {
  dialogShow: string;
  submitDialogForm: Function;
  cancelDialogForm: Function;
  value: any;
}

export const CrudDialog = function ({
  submitDialogForm,
  cancelDialogForm,
  value,
  dialogShow,
}: ComponentsInterface) {
  return (
    <div>
      {dialogShow === 'crud'
        ? renderAmis(
            {
              title: 'Quick start-CRUD',
              type: 'dialog',
              size: 'md',
              closeOnEsc: true,
              onClose: () => {
                cancelDialogForm();
              },
              onConfirm: (data: any) => {
                let formData = data[0];
                if (formData.features && formData.features.length) {
                  formData.headerToolbar.push('bulkActions');
                  formData.features.forEach((item: string) => {
                    if (item === 'update') {
                      formData.bulkActions.push({
                        type: 'button',
                        label: 'Edit',
                        icon: 'fa fa-edit',
                        disabledOn: 'this.selectedItems.length > 1',
                        actionType: 'dialog',
                        dialog: {
                          title: 'Edit',
                          body: 'Edit Data',
                        },
                      });
                    } else if (item === 'bulkDelete') {
                      formData.bulkActions.push({
                        type: 'button',
                        label: 'Delete',
                        actionType: 'ajax',
                        api: 'delete:https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/${ids|raw}',
                        confirmText: 'Sure you want to delete in bulk?',
                        icon: 'fa fa-trash-o',
                      });
                    }
                  });
                }
                submitDialogForm(omit(formData, ['count', 'mock', 'features']));
              },
              body: [
                {
                  type: 'form',
                  wrapWithPanel: false,
                  data: value,
                  body: [
                    {
                      name: 'api',
                      type: 'input-text',
                      label: 'Request Address',
                      placeholder: 'http://',
                    },
                    {
                      name: 'panelTarget',
                      type: 'panel',
                      bodyClassName: 'p-0',
                      actionsClassName: 'p-0',
                      body: [
                        {
                          visibleOn:
                            'data.api && data.rows && !data.rows.length',
                          type: 'alert',
                          className: 'w-full mt-4',
                          body: {
                            type: 'html',
                            html: 'You can refer to <code><a target="_blank" href="//baidu.gitee.io/amis/zh-CN/docs/types/api">API Configuration </a> or <a href="https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample" target="_blank"> Sample API</a> Modify.</code>',
                          },
                          level: 'danger',
                        },
                        {
                          visibleOn: 'data.errorMsg',
                          type: 'alert',
                          className: 'w-full mt-4',
                          body: { type: 'html', html: '${errorMsg}' },
                          level: 'danger',
                        },
                        {
                          visibleOn:
                            'data.api && data.rows && data.rows.length',
                          type: 'alert',
                          className: 'w-full mt-4 inline-block text-center',
                          body: { type: 'html', html: 'The API returns the correct format' },
                          level: 'success',
                        },
                      ],
                      actions: [
                        {
                          type: 'button',
                          label: 'Return to Format Validation',
                          actionType: 'ajax',
                          api: {
                            method: 'get',
                            url: '${api | raw}',
                          },
                        },
                      ],
                    },
                    {
                      name: 'mock',
                      visibleOn: 'data.api && data.rows && data.rows.length',
                      label: 'Automatic filling',
                      type: 'switch',
                      mode: 'inline',
                      className: 'inline-block',
                      labelRemark: {
                        icon: '',
                        label: '',
                        placement: 'right',
                        title: 'Automatic filling',
                        content:
                          'If the API return format is correct, populate the field values in full to the Add, View, Edit operations of the in-line operation based on the correct interface return results',
                        trigger: 'click',
                        className: 'm-l-xs',
                        rootClose: !0,
                      },
                    },
                    {
                      name: 'features',
                      label: 'Features',
                      type: 'checkboxes',
                      joinValues: !1,
                      extractValue: !0,
                      inline: !0,
                      itemClassName: 'max-w-lg',
                      options: [
                        { label: 'update', value: 'update' },
                        { label: 'Batch operation-delete', value: 'bulkDelete' },
                      ],
                    },
                    {
                      name: 'columns',
                      type: 'combo',
                      multiple: !0,
                      label: !1,
                      strictMode: !1,
                      addButtonText: 'Add Column',
                      draggable: !1,
                      controls: [
                        {
                          type: 'input-text',
                          name: 'label',
                          placeholder: 'header',
                        },
                        {
                          type: 'input-text',
                          name: 'name',
                          placeholder: 'name',
                        },
                        {
                          type: 'select',
                          name: 'type',
                          placeholder: 'type',
                          value: 'text',
                          options: [
                            { value: 'text', label: 'text' },
                            { value: 'tpl', label: 'template' },
                            { value: 'image', label: 'image' },
                            { value: 'date', label: 'date' },
                            { value: 'progress', label: 'progress' },
                            { value: 'status', label: 'status' },
                            { value: 'mapping', label: 'map' },
                            { value: 'operation', label: 'operation' }
                          ],
                        },
                      ],
                      pipeIn: (value: boolean | undefined, event: any) => {
                        const { data } = event;
                        if (
                          data.mock &&
                          data.rows &&
                          data.rows.length &&
                          !(data.columns && data.columns.length)
                        ) {
                          return Object.keys(data.rows[0]).map((item) => {
                            return {
                              name: item,
                              label: item,
                            };
                          });
                        } else {
                          return data.columns || [];
                        }
                      },
                    },
                  ],
                },
              ],
            },
            {
              locale: 'en-US',
            },
            {
              fetcher,
            },
          )
        : null}
    </div>
  );
};

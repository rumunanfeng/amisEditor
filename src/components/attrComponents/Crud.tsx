import axios from 'axios';
import { render as renderAmis } from 'amis';

import { fetcher } from '../../utils/fetcher';
import { defaultValue } from '../../utils/utils';
import { visible } from './global'
interface ComponentsInterface {
  changeForm: Function;
  value: any;
}

export const Crud = function ({ changeForm, value }: ComponentsInterface) {
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
              label: 'Columns',
              name: 'columns',
              type: 'combo',
              multiple: !0,
              draggable: !0,
              addButtonText: 'Add Column',
              scaffold: { label: '', value: '' },
              // pipeIn: function (e) {
              //   return s.normalizeOptions(e);
              // },
              controls: [
                {
                  type: 'input-text',
                  name: 'label',
                  placeholder: 'header',
                  unique: !0,
                },
                {
                  type: 'input-text',
                  name: 'name',
                  placeholder: 'name',
                  required: !0,
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
                    { value: 'operation', label: 'operation' },
                  ],
                },
              ],
            },
            {
              label: 'Batch operation',
              name: 'bulkActions',
              type: 'combo',
              hiddenOn: 'data.pickerMode && data.multiple',
              inputClassName: 'ae-BulkActions-control',
              multiple: !0,
              draggable: !0,
              draggableTip: '',
              scaffold: { label: 'button', type: 'button' },
              labelRemark: {
                className: 'm-l-xs',
                trigger: 'click',
                rootClose: !0,
                content:
                  'appear only if the batch action button is set, and you can configure the position of the batch action button in the appearance.',
                placement: 'left',
              },
              controls: [
                {
                  type: 'tpl',
                  tpl: '<span class="label label-success">${label}</span>',
                  columnClassName: 'p-t-xs',
                },
              ],
            },
            {
              name: 'keepItemSelectionOnPageChange',
              label: 'Keep item selection',
              type: 'switch',
              mode: 'inline',
              className: 'block',
              visbileOn:
                'this.bulkActions && this.bulkActions.length || this.itemActions && this.itemActions.length',
              labelRemark: {
                className: 'm-l-xs',
                trigger: 'click',
                rootClose: !0,
                content:
                  'After the default paging and searching, user-selected entries will be cleared. Turning on this option will retain user selections and enable cross-page batch operations.',
                placement: 'left',
              },
            },
            {
              name: 'primaryField',
              label: 'Primary key',
              type: 'input-text',
              pipeIn: defaultValue('id'),
              description: 'Default <code>id</code> for bulk operations to get row-level data',
            },
            {
              name: 'headerToolbar',
              type: 'combo',
              draggable: !0,
              draggableTip: '',
              className: 'crud-toolbar-combo',
              label: 'Top Toolbar Configuration',
              pipeIn: function (e:any) {
                return (
                  Array.isArray(e) ||
                    (e = e ? [e] : ['bulkActions', 'pagination']),
                  e.map(function (e:any) {
                    var type = e.type;
                    return (
                      'string' == typeof e &&
                      ~[
                        'bulkActions',
                        'bulk-actions',
                        'pagination',
                        'statistics',
                        'switch-per-page',
                        'filter-toggler',
                        'load-more',
                        'export-csv',
                        'export-excel',
                      ].indexOf(e)
                        ? (e = {
                            type: (type =
                              'bulkActions' === e
                                ? 'bulk-actions'
                                : e),
                          })
                        : 'string' == typeof e &&
                          ((type = 'tpl'),
                          (e =
                            'string' == typeof e
                              ? { type: 'tpl', tpl: e }
                              : e)),
                      Object.assign({ type }, e)
                    );
                  })
                );
              },
              pipeOut: function (e:any) {
                return Array.isArray(e)
                  ? e.map(function (e) {
                    return e
                      // return 'button' === e.type
                      //   ? u.JSONPipeIn(
                      //       Object.assign(
                      //         { label: '按钮', type: 'button' },
                      //         e,
                      //       ),
                      //     )
                      //   : 'tpl' === e.type
                      //   ? u.JSONPipeIn(
                      //       Object.assign(
                      //         { type: 'tpl', tpl: '内容' },
                      //         e,
                      //       ),
                      //     )
                      //   : e;
                    })
                  : [];
              },
              scaffold: { type: 'tpl', tpl: 'content' },
              multiple: !0,
              controls: [
                {
                  type: 'select',
                  name: 'type',
                  columnClassName: 'w-ssm',
                  options: [
                    { value: 'bulk-actions', label: 'Operation Bar' },
                    { value: 'pagination', label: 'Pagination' },
                    { value: 'statistics', label: 'Statistics' },
                    { value: 'switch-per-page', label: 'Switching page numbers' },
                    { value: 'load-more', label: 'Load More' },
                    { value: 'export-csv', label: 'Export CSV' },
                    { value: 'export-excel', label: 'Export Excel' },
                    {
                      value: 'columns-toggler',
                      label: 'Column selector',
                      visibleOn:
                        '!this.mode || this.mode === "table"',
                    },
                    {
                      value: 'filter-toggler',
                      label: 'Query condition switching',
                    },
                    // { value: 'drag-toggler', label: 'Drag and Drop Switching' },
                    {
                      value: 'check-all',
                      label: 'Select All',
                      hiddenOn:
                        '!this.mode || this.mode === "table"',
                    },
                    { value: 'tpl', label: 'Text' },
                    { value: 'button', label: 'Button' },
                  ],
                },
                {
                  name: 'align',
                  placeholder: 'Align',
                  size: 'xs',
                  type: 'select',
                  options: [
                    { label: 'Left', value: 'left' },
                    { label: 'Right', value: 'right' },
                  ],
                }
              ],
            },
            {
              name: 'footerToolbar',
              type: 'combo',
              draggable: !0,
              draggableTip: '',
              className: 'crud-toolbar-combo',
              label: 'Bottom toolbar configuration',
              pipeIn: function (e:any) {
                return (
                  Array.isArray(e) ||
                    (e = e ? [e] : ['bulkActions', 'pagination']),
                  e.map(function (e:any) {
                    var type = e.type;
                    return (
                      'string' == typeof e &&
                      ~[
                        'bulkActions',
                        'bulk-actions',
                        'pagination',
                        'statistics',
                        'switch-per-page',
                        'filter-toggler',
                        'load-more',
                        'export-csv',
                        'export-excel',
                      ].indexOf(e)
                        ? (e = {
                            type: (type =
                              'bulkActions' === e
                                ? 'bulk-actions'
                                : e),
                          })
                        : 'string' == typeof e &&
                          ((type = 'tpl'),
                          (e =
                            'string' == typeof e
                              ? { type: 'tpl', tpl: e }
                              : e)),
                      Object.assign({ type }, e)
                    );
                  })
                );
              },
              pipeOut: function (e:any) {
                return Array.isArray(e)
                  ? e.map(function (e) {
                    return e
                      // return 'button' === e.type
                      //   ? u.JSONPipeIn(
                      //       n.__assign(
                      //         { label: '按钮', type: 'button' },
                      //         e,
                      //       ),
                      //     )
                      //   : 'tpl' === e.type
                      //   ? u.JSONPipeIn(
                      //       n.__assign(
                      //         { type: 'tpl', tpl: '内容' },
                      //         e,
                      //       ),
                      //     )
                      //   : e;
                    })
                  : [];
              },
              scaffold: { type: 'tpl', tpl: 'content' },
              multiple: !0,
              controls: [
                {
                  type: 'select',
                  name: 'type',
                  columnClassName: 'w-ssm',
                  options: [
                    { value: 'bulk-actions', label: 'Operation Bar' },
                    { value: 'pagination', label: 'Pagination' },
                    { value: 'statistics', label: 'Statistics' },
                    { value: 'switch-per-page', label: 'Switching page numbers' },
                    { value: 'load-more', label: 'Load More' },
                    { value: 'export-csv', label: 'Export CSV' },
                    { value: 'export-excel', label: 'Export Excel' },
                    {
                      value: 'columns-toggler',
                      label: 'Column selector',
                      hiddenOn:
                        '["grid", "cards", "list"].indexOf(this.mode)',
                    },
                    {
                      value: 'filter-toggler',
                      label: 'Query condition switching',
                    },
                    // { value: 'drag-toggler', label: '拖拽切换' },
                    {
                      value: 'check-all',
                      label: 'Select All',
                      hiddenOn:
                        '!this.mode || this.mode === "table"',
                    },
                    { value: 'tpl', label: 'Text' },
                    { value: 'button', label: 'Button' },
                  ],
                },
                {
                  name: 'align',
                  placeholder: 'Align',
                  size: 'xs',
                  type: 'select',
                  options: [
                    { label: 'Left', value: 'left' },
                    { label: 'Right', value: 'right' },
                  ],
                }
              ],
            },
            {
              name: 'filterTogglable',
              type: 'switch',
              label: 'Filter Togglable',
              mode: 'inline',
              className: 'block',
              visibleOn: 'data.filter',
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
              label: 'Body CSS Class',
              name: 'bodyClassName',
            },
            visible
          ],
        },
        {
          locale: 'en-US',
        },
        {
          fetcher,
        },
      )}
    </div>
  );
};

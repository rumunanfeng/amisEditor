/*
 * @Author: 陈落秋
 * @Date: 2021-10-21 10:06:02
 * @LastEditTime: 2021-10-21 15:05:15
 * @LastEditors: 陈落秋
 * @Description: 
 */
export const visible = {
  type: 'fieldSet',
  title: 'Display Config',
  collapsable: !0,
  controls: [
    {
      label: 'Setting method',
      name: 'visible',
      type: 'button-group',
      size: 'xs',
      mode: 'inline',
      className: 'w-full',
      options: [
        { label: 'Static', value: 1 },
        { label: 'Expressions', value: 2 },
      ],
      pipeIn: function (e) {
        return 'boolean' == typeof e ? 1 : 2;
      },
      pipeOut: function (e) {
        return 1 === e || '';
      },
    },
    {
      type: 'switch',
      label: 'Visible',
      name: 'visible',
      visibleOn: 'typeof this.visible === "boolean"',
      pipeIn: function (e, t) {
        return !1 !== e && !t.hidden;
      },
      mode: 'inline',
      className: 'w-full m-b-none',
      onChange: function (e, t, a, n) {
        return n.setValueByName('visibleOn', '');
      },
    },
    {
      name: 'visibleOn',
      label: 'Visible Expressions',
      labelRemark: {
        trigger: 'click',
        className: 'm-l-xs',
        // rootClose: !0,
        content:
          'Pure JS syntax, with this pointing to the current data layer. Documentation.<a href="https://baidu.github.io/amis/docs/concepts/expression">Expression syntax</a>',
        placement: 'left',
      },
      placeholder: 'For example：this.type === 1',
      type: 'text',
      visibleOn: 'typeof this.visible !== "boolean"',
      autoComplete: !1,
      pipeIn: function (e, t) {
        return e || (t.hiddenOn && '!(' + t.hiddenOn + ')') || '';
      },
      className: 'm-b-none',
    },
  ],
}
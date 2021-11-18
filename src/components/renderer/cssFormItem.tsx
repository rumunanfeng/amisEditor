/*
 * @Author: 陈落秋
 * @Date: 2021-09-15 13:53:03
 * @LastEditTime: 2021-11-17 16:10:06
 * @LastEditors: 陈杰超
 * @Description: 
 */
import { FormItem } from 'amis';
import { RendererProps } from 'amis/lib/factory';
import React from 'react';
import { Popover } from 'antd';
import { flatten } from 'lodash'
import { render as renderAmis } from 'amis';
import { optionsList } from './optionsList';

interface FormData {
  [proppName:string]:any;
}

export interface CssPickerProps extends RendererProps {
  target?: string;
}

// @ts-ignore
@FormItem({
  type: 'css-picker'
})

// @ts-ignore
export default class CssPicker extends React.Component<CssPickerProps, any> {
  constructor() {
    // @ts-ignore
    super();
    this.state = {
      formData: {},
      otherClass: []
    };
    this.inputChange = this.inputChange.bind(this)
  }

  inputChange(value:string) {
    const { onChange } = this.props;
    let dataArray = (value.split(' ') || []).filter(item => !!item)
    const formData:FormData = {}
    const otherClass:string[] = [];
    dataArray.forEach((name: string) => {
      let isFormKey = false
      Object.keys(optionsList).forEach(item => {
        const obj = optionsList[item].find((ele:any) => ele.value === name);
        if (obj && obj.value) {
          isFormKey = true
          if (formData[item] && Array.isArray(formData[item])) {
            if (!formData[item].includes(obj.value)) {
              formData[item] = [...formData[item], obj.value]
            }
          } else if(formData[item]) {
            if (formData[item] !== obj.value) {
              formData[item] = [formData[item], obj.value]
            }
          } else {
            formData[item] = obj.value
          }
        }
      });
      if (!isFormKey) {
        otherClass.push(name)
      }
    });
    this.setState({
      formData: formData,
      otherClass
    })
    onChange(value)
  }
  
  componentWillMount() {
    const { value} = this.props;
    if (value) {
      this.inputChange(value)
    }
  }

  render() {
    const { value, onChange } = this.props;

    const getPickerItem  = ({ name, label }:any) => {
      return {
        label: label,
        name: name,
        type: 'button-group-select',
        size: 'xs',
        option: 'inherit',
        options: optionsList[name],
      }
    }

    const content = (
      <div key={JSON.stringify(this.state.formData)} className="css-picker-form" style={{width: '600px'}}>
        {renderAmis({
          type: 'form',
          submitOnChange: true,
          wrapWithPanel: false,
          data: this.state.formData,
          mode: 'horizontal',
          "horizontal": {
            "leftFixed": "sm"
          },
          className: 'text-center',
          onChange: (val: any) => {
            let dataArray = flatten(Object.values(val))
            let result = [...dataArray, ...this.state.otherClass]
            onChange(result.join(' '))
          },
          body: [
            {
              "type": "flex",
              "items": [
                {
                  "type": "wrapper",
                  "className": "m-r-lg flex-1",
                  "body": [
                    {
                      type: 'tpl',
                      tpl: 'Margin'
                    },
                    {
                      "type": "divider"
                    },
                    getPickerItem({label: 'All', name: 'margin-all'}),
                    getPickerItem({label: 'Top', name: 'margin-top'}),
                    getPickerItem({label: 'Right', name: 'margin-right'}),
                    getPickerItem({label: 'Bottom', name: 'margin-bottom'}),
                    getPickerItem({label: 'Left', name: 'margin-left'}),
                    getPickerItem({label: 'None', name: 'margin-none'}),
                  ]
                },
                {
                  "type": "wrapper",
                  "className": "m-l-lg flex-1",
                  "body": [
                    {
                      type: 'tpl',
                      tpl: 'Padding'
                    },
                    {
                      "type": "divider"
                    },
                    getPickerItem({label: 'All', name: 'padding-all'}),
                    getPickerItem({label: 'Top', name: 'padding-top'}),
                    getPickerItem({label: 'Right', name: 'padding-right'}),
                    getPickerItem({label: 'Bottom', name: 'padding-bottom'}),
                    getPickerItem({label: 'Left', name: 'padding-left'}),
                    getPickerItem({label: 'None', name: 'padding-none'}),
                  ]
                },
              ]
            },
            {
              "type": "wrapper",
              "body": [
                {
                  type: 'tpl',
                  tpl: 'Border'
                },
                {
                  "type": "divider"
                },
                getPickerItem({label: 'Position', name: 'border-position'}),
                getPickerItem({label: 'Size', name: 'border-size'}),
                getPickerItem({label: 'Radius', name: 'border-radius'}),
                getPickerItem({label: 'Color', name: 'border-color'})
              ]
            },
            {
              "type": "wrapper",
              "body": [
                {
                  type: 'tpl',
                  tpl: 'Other'
                },
                {
                  "type": "divider"
                },
                getPickerItem({label: 'Font Size', name: 'font-size'}),
                getPickerItem({label: 'Color', name: 'color'}),
                getPickerItem({label: 'Back Color', name: 'background-color'}),
                getPickerItem({label: 'Width', name: 'width'}),
              ]
            },
          ]
        },
          {
            locale: 'en-US',
          })}
      </div>
    );

    return (
      <div className="css-picker-render">
        <div className="a-Form-control a-TextControl a-TextControl--withAddOn">
          <div className="a-TextControl-input">
            <input name="className" placeholder="Please enter the CSS class name" type="text" size={10} value={value} onChange={(e) => this.inputChange(e.target.value)} />
          </div>
          <div className="a-TextControl-button">
            <Popover placement="leftTop" content={content} trigger="click">
              <button type="button" className="a-Button a-Button--default a-Button--iconOnly" style={{borderTopRightRadius: '3px', borderBottomRightRadius: '3px'}}>
                <i className="a-Button-icon fa fa-cog"></i>
              </button>
            </Popover>
          </div>
        </div>
      </div>
    );
  }
}
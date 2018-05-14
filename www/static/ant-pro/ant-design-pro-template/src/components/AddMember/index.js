import React, { PureComponent } from 'react';
import { Button, Icon, Modal, Form, Checkbox, Select } from 'antd';
import { getTeamPermissions } from '../../services/team';

const Option = Select.Option;
const FormItem = Form.Item;
import UserSelect from '../UserSelect';
const CheckboxGroup = Checkbox.Group;

@Form.create()
class ConfirmModal extends PureComponent{
   constructor(arg){
     super(arg);
     this.state = {
        actions: []
     }
   }
   componentDidMount(){

   }
   handleSubmit= () => {
       this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.onOk && this.props.onOk(values);
        }
      });
   }
   render(){
      const { getFieldDecorator } = this.props.form;
      const { onOk, onCancel, actions}= this.props;

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 14,
            offset: 6,
          },
        },
      };

      const options = actions || [];
      const roles = this.props.roles || [];

      return (
          <Modal
            title="添加成员"
            visible={true}
            onOk={this.handleSubmit}
            onCancel={onCancel}
          >

             <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="选择用户"
                hasFeedback
              >
                {getFieldDecorator('user_ids', {
                    rules: [{
                      required: true,
                      message: '请选择要添加的用户',
                    }],
                  })(
                    <UserSelect />
                )}
                
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="选择角色"
              >
                {getFieldDecorator('role_ids', {
                    initialValue:[],
                    rules: [{
                      required: true,
                      message: '请选择角色',
                    }],
                  })(
                    <Select
                    mode="multiple"
                    placeholder="请选择角色"
                    style={{ width: '100%' }}
                  >
                     {
                       roles.map((role)=>{
                           return <Option value={role.role_id}>{role.role_name}</Option>
                       })
                     }
                  </Select>
                )}
                
              </FormItem>
              </Form>

             
          </Modal>
      )
   }
}

export default ConfirmModal
// import {Route, Link} from 'react-router-dom'
// import RouteView from './common/RouteView'
// import Navigation from './components/navigation/Navigation';
import React from "react"
// import {Route, Link} from 'react-router-dom'

import {BHButton, BHInput, NumberInput, BHTree, BHCheckBox, BHSwitch, BHSelect, Notification} from './beehive/'
// import utils from './common/utils/'

export default class App extends React.Component {
   constructor(props) {
      super(props);
      this.className = "app";
      this.test1 = "ewerwq";
      this.test2 = "wrw";
      this._callback = this._callback.bind(this);

      this.state = {
         count: 0
      }

      this.treeData = [{
         idx: '000001',
         label: "tree-0-0",
         isSelected: false,
         isOpen: false,
         iconClassName: [null, null],
         children: [{
            idx: '000011',
            label: "tree-0-1-0",
            isSelected: false,
            isOpen: false,
            iconClassName: [null, null],
            children: null
         }]
      }, {
         idx: '000002',
         label: "tree-0-1",
         isSelected: false,
         isOpen: false,
         iconClassName: [null, null],
         children: null
      }]
   }
   _callback(){

      setTimeout(()=>{
         const count = ++this.state.count;
         this.setState({
            count
         })
      },100)
   }

   render() {
      // console.log(utils.string.removeStringBlanks('  sfsf-sf ',false));
      // let a = {a: 'a', c: 4};
      // let b = {b: 'b', c: 8};
      // a = utils.object.assignOwnProperty(a,b);
      // console.log(a);
      // b.c = 10;
      // console.log(a);
      // console.log(b);

      return (
         <div className="beehive-app">

            <h2>{this.state.count}</h2>

            <BHButton className={'primary'} animation={true} disabled={true} onClick={() => this._callback()}>disabled</BHButton>
            <BHButton onClick={() => this._callback()}>primary</BHButton>
            <BHButton className={'primary'} onClick={() => this._callback()}>primary</BHButton>
            <BHButton className={'warning'} onClick={() => this._callback()}>warning</BHButton>
            <BHButton className={'error'} onClick={() => this._callback()}>error</BHButton>
            <BHButton className={'success'} onClick={() => this._callback()}>success</BHButton>
            <br/>
            <BHButton animation={true}
               onClick={() => {Notification.primary('这是一个notification提示,内容不宜太多', {
                  showIcon: false,
                  duration: 5,
                  showClose: true
               })}} >
               primary</BHButton>
            <BHButton animation={true}
               onClick={() => {Notification.default('这是一个notification提示,内容不宜太多', {
                  showIcon: true,
                  duration: 0,
                  showClose: true
               })}}>default</BHButton>
            <BHButton animation={true} className={'primary'}
               onClick={() => {Notification.primary('这是一个notification提示,内容不宜太多', {
                  showIcon: true,
                  duration: 0,
                  showClose: true
               })}}>primary</BHButton>
            <BHButton animation={true} className={'warning'}
               onClick={() => {Notification.warn('这是一个内容不宜太多', {
                  showIcon: true,
                  duration: 0,
                  showClose: true
               })}}>warning</BHButton>
            <BHButton animation={true} className={'error'}
               onClick={() => {Notification.error('这是一个notification提示,内容不宜太多', {
                  showIcon: true,
                  duration: 0,
                  showClose: true
               })}}>error</BHButton>
            <BHButton animation={true} className={'success'}
               onClick={() => {Notification.success('这是一个notification提示,内容不宜太多', {
                  showIcon: true,
                  duration: 0,
                  showClose: true
               })}}>success</BHButton>

            <div>
               <div><BHInput type='text' prevIcon="icon-scan" nextIcon="icon-success"/></div>
               <div><NumberInput type={'number'} min={0} max={10}/></div>
               {  /*
                  <div><NumberInput className={'primary'} type={'number'} onChange={(res) => {console.log(res)}}/></div>
                  <div><NumberInput className={'success'} type={'number'} /></div>
                  <div><NumberInput className={'warning'} type={'number'} /></div>
                  <div><NumberInput className={'error'} type={'number'} /></div>
                  <div><NumberInput type={'number'} /></div>*/
               }
            </div>

            <BHTree data={this.treeData}></BHTree>

            <div>
               <BHCheckBox>12131</BHCheckBox>
               <BHCheckBox className='primary' style={{color: '#ccc'}}>12131</BHCheckBox>
               <BHCheckBox iconType="heart" className='success'>12131</BHCheckBox>
               <BHCheckBox iconType="hearts" className='warning'>12131</BHCheckBox>
               <BHCheckBox className='error'>12131</BHCheckBox>
               <BHCheckBox className='error' disabled={true}>12131</BHCheckBox>
               <BHCheckBox className='error' disabled={true} iconStyle={{color: 'pink'}}>12131</BHCheckBox>

            </div>

            <div>
               <BHSwitch open={true}/>
               <BHSwitch open={true} className='success'/>
               <BHSwitch open={true} className='warning'/>
               <BHSwitch open={true} className='error'/>
               <BHSwitch disabled={true} className='success'/>
               <BHSwitch className='success'/>
               <BHSwitch type={'smaller'} className='success'/>
            </div>

            <div>
               <BHSelect placeholder="placeHolder sting">
                  <BHSelect.option value='0'>test1</BHSelect.option>
                  <BHSelect.option value='1'>test2</BHSelect.option>
                  <BHSelect.option value='2'>test3</BHSelect.option>
               </BHSelect>
               <BHSelect className="primary" placeholder="placeHolder sting">
                  <BHSelect.option value='0'>test1</BHSelect.option>
                  <BHSelect.option value='1'>test2</BHSelect.option>
                  <BHSelect.option value='2'>test3</BHSelect.option>
               </BHSelect>

            </div>

         </div>
      )
   }
}
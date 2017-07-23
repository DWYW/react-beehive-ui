import React from "react"
import {connect} from 'react-redux'
import * as test from './store/actions/test'

class Test extends React.Component {
   constructor(props) {
      super(props);
      this.className = "Test";
   }

   componentDidMount() {
      this.uploadInit();
   }

   uploadInit() {
      console.log(this._t)
      // const Stream = window.Stream;
      const config = {
         browseFileId: "i_select_files", /** 选择文件的ID, 默认: i_select_files */
         dragAndDropArea: "i_select_files", /** 拖拽上传区域，Id（字符类型"i_select_files"）或者DOM对象, 默认: `i_select_files` */
         multipleFiles: true, /** 多个文件一起上传, 默认: false */
         tokenURL: "/tk", /** 根据文件名、大小等信息获取Token的URI（用于生成断点续传、跨域的令牌） */
         frmUploadURL: "http://cross.twinkling.cn/fd;", /** Flash上传的URI */
         uploadURL: "http://cross.twinkling.cn/upload" /** HTML5上传的URI */
      };
      console.log(this._t)
      this._t = new window.Stream(config);

   }

   // upload = () => {
   //    // if(this._t) {
   //    //    this._t = new Stream(config);
   //    // }<iframe src="./static/s3.html" frameBorder="0" style={{width: '100%', height: '900px'}}></iframe>

   // }

   render() {
      // console.log(this.props.state)
      return (
         <div className="component">
            <div>
               <div id="i_select_files"></div>
               <div id="i_stream_files_queue" ></div>
               <button onClick={() => {this._t.upload()}}>开始上传</button>|
               <button onClick={() => {this._t.stop()}}>取消</button>
               <br/>
               Messages:
               <div id="i_stream_message_container" className="stream-main-upload-box" style={{overflow: 'auto', height: '200px'}}>
               </div>
            </div>
         </div>
      )
   }
}
// console.log(test)
function mapStateToProps(state) {
   return {
      num: state.test
   }
}
module.exports = connect(mapStateToProps,test)(Test)
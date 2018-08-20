webpackJsonp([9],{194:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _pageController=__webpack_require__(17),_pageController2=_interopRequireDefault(_pageController),_apiCenter=__webpack_require__(20),_appApiCenter=__webpack_require__(10),_groupApiCenter=__webpack_require__(105),_util=__webpack_require__(25),_util2=_interopRequireDefault(_util),_widget=__webpack_require__(4),_widget2=_interopRequireDefault(_widget),_editGroup=__webpack_require__(513),Msg=(_interopRequireDefault(_editGroup),_widget2.default.Message),GroupIndexController=(0,_pageController2.default)({property:{tenantName:"",checkInterval:6e3,groupId:"",groupName:"",allGroups:[],apps:[]},method:{checkAppsInfo:function(){var _this=this;return(0,_apiCenter.getTenantAllAppsStatusAndMemory)(this.tenantName).done(function(data){data&&data.list&&(_this.apps=data.list||[]),console.log(_this.apps),_this.updateAppsInfo(data)})},loopCheck:function(){var _this2=this;this.checkAppsInfo().always(function(){setTimeout(function(){_this2.loopCheck()},_this2.checkInterval)})},changeToListView:function(){$("#imgBox").hide(),$("#tabBox").show(),$("#imgbtn").removeClass("btn-success"),$("#tabbtn").addClass("btn-success")},changeToImgView:function(){$("#imgBox").show(),$("#tabBox").hide(),$("#imgbtn").addClass("btn-success"),$("#tabbtn").removeClass("btn-success")},updateAppsInfo:function(result){for(var list=result.list,i=(result.totalMemory,0),len=list.length;i<len;i++){var app=list[i],statusMap=_util2.default.getStatusMap(app.status),activeAction=app.activeAction,disableAction=app.disabledAction,$row=$("tr[data-id="+app.id+"]");$row.attr("data-status",app.status),$("#service_status_"+app.id).html(app.statusCN).attr("class",statusMap.bgClass+" pading5"),$("#service_memory_"+app.id).html(app.runtime_memory+"M"),activeAction.forEach(function(val,index){$row.find("[data-action="+val+"]").show()}),disableAction.forEach(function(val,index){$row.find("[data-action="+val+"]").hide()})}},getSelectedApp:function(){var datas=[];return $("input[name=SelectItem]:checked").each(function(){datas.push($(this).val())}),datas},onSelectedChange:function(){var selectedDatas=this.getSelectedApp();selectedDatas.length>0?($("[data-action=betch-restart]").prop("disabled",!1),$("[data-action=betch-stop]").prop("disabled",!1),$("[data-action=betch-deploy]").prop("disabled",!1)):($("[data-action=betch-restart]").prop("disabled",!0),$("[data-action=betch-stop]").prop("disabled",!0),$("[data-action=betch-deploy]").prop("disabled",!0)),$("#app-numbers span").html(selectedDatas.length)},isAppCanDo:function(id,action){for(var apps=this.apps||[],i=0;i<apps.length;i++)if(apps[i].id==id)return apps[i].activeAction.indexOf(action)>-1;return!0},handleDeploy:function(serviceAlias,category){(0,_appApiCenter.deployApp)(category,this.tenantName,serviceAlias).done(function(data){Msg.success("操作成功")})},handleRestart:function(serviceAlias,serviceId){var self=this;(0,_appApiCenter.openApp)(this.tenantName,serviceAlias,serviceId).done(function(){Msg.success("操作成功"),self.checkAppsInfo()})},handleStop:function(serviceAlias,serviceId){var self=this;(0,_appApiCenter.closeApp)(this.tenantName,serviceAlias,serviceId).done(function(){Msg.success("操作成功"),self.checkAppsInfo()})},betchOpenApp:function(){var self=this,selectedIds=this.getSelectedApp();return selectedIds.length?(selectedIds=selectedIds.filter(function(id){return self.isAppCanDo(id,"restart")}),selectedIds.length?void(selectedIds.length&&(0,_apiCenter.betchOpenApp)(this.tenantName,selectedIds).done(function(){Msg.success("操作成功"),self.checkAppsInfo()})):void Msg.warning("没有可以执行此操作的应用")):void Msg.warning("请选择要操作的应用")},handleBetchClose:function(){var self=this,selectedIds=this.getSelectedApp();return console.log(selectedIds),selectedIds.length?(selectedIds=selectedIds.filter(function(id){return self.isAppCanDo(id,"stop")}),selectedIds.length?void(selectedIds.length&&(0,_apiCenter.betchCloseApp)(this.tenantName,selectedIds).done(function(){Msg.success("操作成功"),self.checkAppsInfo()})):void Msg.warning("没有可以执行此操作的应用")):void Msg.warning("请选择要操作的应用")},handleBetchDeploy:function(){var self=this,selectedIds=this.getSelectedApp();return console.log(selectedIds),selectedIds.length?(selectedIds=selectedIds.filter(function(id){return self.isAppCanDo(id,"deploy")}),selectedIds.length?void(selectedIds.length&&(0,_apiCenter.betchDeployApp)(this.tenantName,selectedIds).done(function(){Msg.success("操作成功"),self.checkAppsInfo()})):void Msg.warning("没有可以执行此操作的应用")):void Msg.warning("请选择要操作的应用")},handleShare:function(){(0,_groupApiCenter.shareGroup)(this.tenantName,this.groupId).done(function(data){data.next_url&&(location.href=data.next_url)})},handleUpdateGroupName:function(e){var self=this,form=_widget2.default.create("form",{hideLabel:!0,items:[{name:"groupName",type:"text",label:"新组名",required:!0,requiredError:"请输入新的组名",value:this.groupName}]}),confirm=_widget2.default.create("confirm",{hideLabel:!0,title:"组名修改",height:"180px",event:{onOk:function(){if(form.valid()){var groupName=form.getValue("groupName");(0,_groupApiCenter.updateGroupName)(self.tenantName,self.groupId,groupName).done(function(){setTimeout(function(){location.reload()},2e3)})}},onCancel:function(){form.destroy(),form=confirm=null}}});confirm.setContent(form.getElement())},handleDeleteGroup:function(e){var self=this,confirm=_widget2.default.create("confirm",{title:"删除组",content:"您确定要删除当前组么？",event:{onOk:function(){(0,_groupApiCenter.deleteGroup)(self.tenantName,self.groupId).done(function(data){confirm.destroy(),confirm=null,setTimeout(function(){location.href="/"},2e3)})}}})},handleAddGroup:function(e){var self=this,form=_widget2.default.create("form",{hideLabel:!0,items:[{name:"groupName",type:"text",label:"群组名称",placeholder:"请输入组名称",required:!0,requiredError:"请输入群组名称"}]}),confirm=_widget2.default.create("confirm",{title:"添加新组",event:{onOk:function(){if(form.valid()){var groupName=form.getValue("groupName");(0,_groupApiCenter.addGroup)(self.tenantName,groupName).done(function(){Msg.success("操作成功!"),setTimeout(function(){location.reload()},2e3)})}},onCancel:function(){form.destroy(),form=confirm}}});confirm.setContent(form.getElement())},handleAppChangeGroup:function(serviceId,serviceCname,groupId){_widget2.default.create("editGroup",{tenantName:this.tenantName,groupId:groupId,serviceId:serviceId,serviceName:serviceCname,groupList:this.allGroups,onSuccess:function(){$("tr[data-id="+serviceId+"]").remove()}})}},domEvents:{"input[name=SelectItem] click":function(e){$("input[name=SelectItem]").length===$("input[name=SelectItem]:checked").length?$("input[name=SelectAll]").prop("checked",!0):$("input[name=SelectAll]").prop("checked",!1),this.onSelectedChange()},"input[name=SelectAll] change":function(e){$(e.target).prop("checked")?$("input[name=SelectItem]").prop("checked",!0):$("input[name=SelectItem]").prop("checked",!1),this.onSelectedChange()},"[data-action=deploy] click":function(e){var $target=$(e.currentTarget),$tr=$target.parents("tr"),serviceAlias=$tr.attr("data-service-alias"),category=$tr.attr("data-category");this.handleDeploy(serviceAlias,category)},"[data-action=restart] click":function(e){var $target=$(e.currentTarget),$tr=$target.parents("tr"),serviceAlias=$tr.attr("data-service-alias"),serviceId=$tr.attr("data-id");this.handleRestart(serviceAlias,serviceId)},"[data-action=stop] click":function(e){var $target=$(e.currentTarget),$tr=$target.parents("tr"),serviceAlias=$tr.attr("data-service-alias"),serviceId=$tr.attr("data-id");this.handleStop(serviceAlias,serviceId)},"#batchStart click":function(e){this.betchOpenApp()},"#batchEnd click":function(e){this.handleBetchClose()},"#newStart click":function(e){this.handleBetchDeploy()},"#groupShare click":function(e){this.handleShare()},"#imgbtn click":function(e){this.changeToImgView()},"#tabbtn click":function(e){this.changeToListView()},"#revise-groupname click":function(e){this.handleUpdateGroupName(e)},"#reomve-groupname click":function(e){this.handleDeleteGroup(e)},"#add-groupname click":function(e){this.handleAddGroup(e)},".fn-name click":function(e){var $target=$(e.currentTarget),$tr=$target.closest("tr"),serviceId=$tr.attr("data-id"),groupId=$tr.attr("data-group"),serviceCname=$tr.attr("data-service-cname");this.handleAppChangeGroup(serviceId,serviceCname,groupId)},".toFullScreen click":function(e){$("#svg-box").addClass("fullScreen"),$("#svg-box").find("iframe")[0].contentWindow.location.reload()},".exitFullScreen click":function(e){$("#svg-box").removeClass("fullScreen"),$("#svg-box").find("iframe")[0].contentWindow.location.reload()}},onReady:function(){this.loopCheck(),"-1"==this.groupId&&($("#tabBox").show(),$("#imgBox").hide())}});window.GroupIndexController=GroupIndexController,exports.default=GroupIndexController},513:function(module,exports,__webpack_require__){"use strict";function noop(){}Object.defineProperty(exports,"__esModule",{value:!0});var _widget=__webpack_require__(4),_widget2=function(obj){return obj&&obj.__esModule?obj:{default:obj}}(_widget),_appApiCenter=__webpack_require__(10),editGroup=_widget2.default.define("editGroup",{extend:"dialog",_defaultOption:{onSuccess:noop,onFail:noop,onCancel:noop,groupId:"",groupName:"",tenantName:"",width:"400px",height:"200px",serviceName:"",serviceId:"",groupList:[]},_init:function(option){var self=this;option.domEvents={".btn-success click":function(){self.onOk()}},this.callParent(option),"editGroup"==this.ClassName&&(this._create(),this.bind())},_create:function(){this.callParent(),this.form=_widget2.default.create("form",{hideLabel:!0,items:[{type:"select",name:"group",items:this.option.groupList,value:this.groupId}]}),this.setTitle("修改群组 "+this.option.serviceName),this.setContent(this.form.getElement())},onOk:function(){var self=this,newGroupId=this.form.getValue("group");newGroupId&&(0,_appApiCenter.changeGroup)(this.option.tenantName,this.option.serviceId,newGroupId).done(function(){self.option.onSuccess(),self.destroy()})},destroy:function(){this.form.destroy(),this.callParent()}});exports.default=editGroup},539:function(module,exports,__webpack_require__){module.exports=__webpack_require__(194)}},[539]);
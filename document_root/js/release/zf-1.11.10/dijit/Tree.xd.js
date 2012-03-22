/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dijit.Tree"],["require","dojo.fx"],["require","dojo.DeferredList"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._Container"],["require","dijit._Contained"],["require","dijit._CssStateMixin"],["require","dojo.cookie"],["require","dijit.tree.TreeStoreModel"],["require","dijit.tree.ForestStoreModel"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dijit.Tree"]){_4._hasResource["dijit.Tree"]=true;_4.provide("dijit.Tree");_4.require("dojo.fx");_4.require("dojo.DeferredList");_4.require("dijit._Widget");_4.require("dijit._Templated");_4.require("dijit._Container");_4.require("dijit._Contained");_4.require("dijit._CssStateMixin");_4.require("dojo.cookie");_4.declare("dijit._TreeNode",[_5._Widget,_5._Templated,_5._Container,_5._Contained,_5._CssStateMixin],{item:null,isTreeNode:true,label:"",isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:_4.cache("dijit","templates/TreeNode.html","<div class=\"dijitTreeNode\" waiRole=\"presentation\"\n\t><div dojoAttachPoint=\"rowNode\" class=\"dijitTreeRow\" waiRole=\"presentation\" dojoAttachEvent=\"onmouseenter:_onMouseEnter, onmouseleave:_onMouseLeave, onclick:_onClick, ondblclick:_onDblClick\"\n\t\t><img src=\"${_blankGif}\" alt=\"\" dojoAttachPoint=\"expandoNode\" class=\"dijitTreeExpando\" waiRole=\"presentation\"\n\t\t><span dojoAttachPoint=\"expandoNodeText\" class=\"dijitExpandoText\" waiRole=\"presentation\"\n\t\t></span\n\t\t><span dojoAttachPoint=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" waiRole=\"presentation\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" dojoAttachPoint=\"iconNode\" class=\"dijitTreeIcon\" waiRole=\"presentation\"\n\t\t\t><span dojoAttachPoint=\"labelNode\" class=\"dijitTreeLabel\" wairole=\"treeitem\" tabindex=\"-1\" waiState=\"selected-false\" dojoAttachEvent=\"onfocus:_onLabelFocus\"></span>\n\t\t</span\n\t></div>\n\t<div dojoAttachPoint=\"containerNode\" class=\"dijitTreeContainer\" waiRole=\"presentation\" style=\"display: none;\"></div>\n</div>\n"),baseClass:"dijitTreeNode",cssStateNodes:{rowNode:"dijitTreeRow",labelNode:"dijitTreeLabel"},attributeMap:_4.delegate(_5._Widget.prototype.attributeMap,{label:{node:"labelNode",type:"innerText"},tooltip:{node:"rowNode",type:"attribute",attribute:"title"}}),postCreate:function(){this.inherited(arguments);this._setExpando();this._updateItemClasses(this.item);if(this.isExpandable){_5.setWaiState(this.labelNode,"expanded",this.isExpanded);}},_setIndentAttr:function(_7){this.indent=_7;var _8=(Math.max(_7,0)*this.tree._nodePixelIndent)+"px";_4.style(this.domNode,"backgroundPosition",_8+" 0px");_4.style(this.rowNode,_4._isBodyLtr()?"paddingLeft":"paddingRight",_8);_4.forEach(this.getChildren(),function(_9){_9.attr("indent",_7+1);});},markProcessing:function(){this.state="LOADING";this._setExpando(true);},unmarkProcessing:function(){this._setExpando(false);},_updateItemClasses:function(_a){var _b=this.tree,_c=_b.model;if(_b._v10Compat&&_a===_c.root){_a=null;}this._applyClassAndStyle(_a,"icon","Icon");this._applyClassAndStyle(_a,"label","Label");this._applyClassAndStyle(_a,"row","Row");},_applyClassAndStyle:function(_d,_e,_f){var _10="_"+_e+"Class";var _11=_e+"Node";if(this[_10]){_4.removeClass(this[_11],this[_10]);}this[_10]=this.tree["get"+_f+"Class"](_d,this.isExpanded);if(this[_10]){_4.addClass(this[_11],this[_10]);}_4.style(this[_11],this.tree["get"+_f+"Style"](_d,this.isExpanded)||{});},_updateLayout:function(){var _12=this.getParent();if(!_12||_12.rowNode.style.display=="none"){_4.addClass(this.domNode,"dijitTreeIsRoot");}else{_4.toggleClass(this.domNode,"dijitTreeIsLast",!this.getNextSibling());}},_setExpando:function(_13){var _14=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"],_15=["*","-","+","*"],idx=_13?0:(this.isExpandable?(this.isExpanded?1:2):3);_4.removeClass(this.expandoNode,_14);_4.addClass(this.expandoNode,_14[idx]);this.expandoNodeText.innerHTML=_15[idx];},expand:function(){if(this._expandDeferred){return this._expandDeferred;}this._wipeOut&&this._wipeOut.stop();this.isExpanded=true;_5.setWaiState(this.labelNode,"expanded","true");_5.setWaiRole(this.containerNode,"group");_4.addClass(this.contentNode,"dijitTreeContentExpanded");this._setExpando();this._updateItemClasses(this.item);if(this==this.tree.rootNode){_5.setWaiState(this.tree.domNode,"expanded","true");}var def,_16=_4.fx.wipeIn({node:this.containerNode,duration:_5.defaultDuration,onEnd:function(){def.callback(true);}});def=(this._expandDeferred=new _4.Deferred(function(){_16.stop();}));_16.play();return def;},collapse:function(){if(!this.isExpanded){return;}if(this._expandDeferred){this._expandDeferred.cancel();delete this._expandDeferred;}this.isExpanded=false;_5.setWaiState(this.labelNode,"expanded","false");if(this==this.tree.rootNode){_5.setWaiState(this.tree.domNode,"expanded","false");}_4.removeClass(this.contentNode,"dijitTreeContentExpanded");this._setExpando();this._updateItemClasses(this.item);if(!this._wipeOut){this._wipeOut=_4.fx.wipeOut({node:this.containerNode,duration:_5.defaultDuration});}this._wipeOut.play();},indent:0,setChildItems:function(_17){var _18=this.tree,_19=_18.model,_1a=[];this.getChildren().forEach(function(_1b){_5._Container.prototype.removeChild.call(this,_1b);},this);this.state="LOADED";if(_17&&_17.length>0){this.isExpandable=true;_4.forEach(_17,function(_1c){var id=_19.getIdentity(_1c),_1d=_18._itemNodesMap[id],_1e;if(_1d){for(var i=0;i<_1d.length;i++){if(_1d[i]&&!_1d[i].getParent()){_1e=_1d[i];_1e.attr("indent",this.indent+1);break;}}}if(!_1e){_1e=this.tree._createTreeNode({item:_1c,tree:_18,isExpandable:_19.mayHaveChildren(_1c),label:_18.getLabel(_1c),tooltip:_18.getTooltip(_1c),indent:this.indent+1});if(_1d){_1d.push(_1e);}else{_18._itemNodesMap[id]=[_1e];}}this.addChild(_1e);if(this.tree.autoExpand||this.tree._state(_1c)){_1a.push(_18._expandNode(_1e));}},this);_4.forEach(this.getChildren(),function(_1f,idx){_1f._updateLayout();});}else{this.isExpandable=false;}if(this._setExpando){this._setExpando(false);}if(this==_18.rootNode){var fc=this.tree.showRoot?this:this.getChildren()[0];if(fc){fc.setSelected(true);_18.lastFocused=fc;}else{_18.domNode.setAttribute("tabIndex","0");}}return new _4.DeferredList(_1a);},removeChild:function(_20){this.inherited(arguments);var _21=this.getChildren();if(_21.length==0){this.isExpandable=false;this.collapse();}_4.forEach(_21,function(_22){_22._updateLayout();});},makeExpandable:function(){this.isExpandable=true;this._setExpando(false);},_onLabelFocus:function(evt){this.tree._onNodeFocus(this);},setSelected:function(_23){var _24=this.labelNode;_24.setAttribute("tabIndex",_23?"0":"-1");_5.setWaiState(_24,"selected",_23);_4.toggleClass(this.rowNode,"dijitTreeRowSelected",_23);},_onClick:function(evt){this.tree._onClick(this,evt);},_onDblClick:function(evt){this.tree._onDblClick(this,evt);},_onMouseEnter:function(evt){this.tree._onNodeMouseEnter(this,evt);},_onMouseLeave:function(evt){this.tree._onNodeMouseLeave(this,evt);}});_4.declare("dijit.Tree",[_5._Widget,_5._Templated],{store:null,model:null,query:null,label:"",showRoot:true,childrenAttr:["children"],path:[],selectedItem:null,openOnClick:false,openOnDblClick:false,templateString:_4.cache("dijit","templates/Tree.html","<div class=\"dijitTree dijitTreeContainer\" waiRole=\"tree\"\n\tdojoAttachEvent=\"onkeypress:_onKeyPress\">\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" dojoAttachPoint=\"indentDetector\"></div>\n</div>\n"),persist:true,autoExpand:false,dndController:null,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance","dragThreshold","betweenThreshold"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,dragThreshold:5,betweenThreshold:0,_nodePixelIndent:19,_publish:function(_25,_26){_4.publish(this.id,[_4.mixin({tree:this,event:_25},_26||{})]);},postMixInProperties:function(){this.tree=this;this._itemNodesMap={};if(!this.cookieName){this.cookieName=this.id+"SaveStateCookie";}this._loadDeferred=new _4.Deferred();this.inherited(arguments);},postCreate:function(){this._initState();if(!this.model){this._store2model();}this.connect(this.model,"onChange","_onItemChange");this.connect(this.model,"onChildrenChange","_onItemChildrenChange");this.connect(this.model,"onDelete","_onItemDelete");this._load();this.inherited(arguments);if(this.dndController){if(_4.isString(this.dndController)){this.dndController=_4.getObject(this.dndController);}var _27={};for(var i=0;i<this.dndParams.length;i++){if(this[this.dndParams[i]]){_27[this.dndParams[i]]=this[this.dndParams[i]];}}this.dndController=new this.dndController(this,_27);}},_store2model:function(){this._v10Compat=true;_4.deprecated("Tree: from version 2.0, should specify a model object rather than a store/query");var _28={id:this.id+"_ForestStoreModel",store:this.store,query:this.query,childrenAttrs:this.childrenAttr};if(this.params.mayHaveChildren){_28.mayHaveChildren=_4.hitch(this,"mayHaveChildren");}if(this.params.getItemChildren){_28.getChildren=_4.hitch(this,function(_29,_2a,_2b){this.getItemChildren((this._v10Compat&&_29===this.model.root)?null:_29,_2a,_2b);});}this.model=new _5.tree.ForestStoreModel(_28);this.showRoot=Boolean(this.label);},onLoad:function(){},_load:function(){this.model.getRoot(_4.hitch(this,function(_2c){var rn=(this.rootNode=this.tree._createTreeNode({item:_2c,tree:this,isExpandable:true,label:this.label||this.getLabel(_2c),indent:this.showRoot?0:-1}));if(!this.showRoot){rn.rowNode.style.display="none";}this.domNode.appendChild(rn.domNode);var _2d=this.model.getIdentity(_2c);if(this._itemNodesMap[_2d]){this._itemNodesMap[_2d].push(rn);}else{this._itemNodesMap[_2d]=[rn];}rn._updateLayout();this._expandNode(rn).addCallback(_4.hitch(this,function(){this._loadDeferred.callback(true);this.onLoad();}));}),function(err){console.error(this,": error loading root: ",err);});},getNodesByItem:function(_2e){if(!_2e){return [];}var _2f=_4.isString(_2e)?_2e:this.model.getIdentity(_2e);return [].concat(this._itemNodesMap[_2f]);},_setSelectedItemAttr:function(_30){var _31=this.attr("selectedItem");var _32=(!_30||_4.isString(_30))?_30:this.model.getIdentity(_30);if(_32==_31?this.model.getIdentity(_31):null){return;}var _33=this._itemNodesMap[_32];if(_33&&_33.length){this.focusNode(_33[0]);}else{if(this.lastFocused){this.lastFocused.setSelected(false);this.lastFocused=null;}}},_getSelectedItemAttr:function(){return this.lastFocused&&this.lastFocused.item;},_setPathAttr:function(_34){if(!_34||!_34.length){return;}this._loadDeferred.addCallback(_4.hitch(this,function(){if(!this.rootNode){console.debug("!this.rootNode");return;}if(_34[0]!==this.rootNode.item&&(_4.isString(_34[0])&&_34[0]!=this.model.getIdentity(this.rootNode.item))){console.error(this,":path[0] doesn't match this.rootNode.item.  Maybe you are using the wrong tree.");return;}_34.shift();var _35=this.rootNode;function _36(){var _37=_34.shift(),_38=_4.isString(_37)?_37:this.model.getIdentity(_37);_4.some(this._itemNodesMap[_38],function(n){if(n.getParent()==_35){_35=n;return true;}return false;});if(_34.length){this._expandNode(_35).addCallback(_4.hitch(this,_36));}else{if(this.lastFocused!=_35){this.focusNode(_35);}}};this._expandNode(_35).addCallback(_4.hitch(this,_36));}));},_getPathAttr:function(){if(!this.lastFocused){return;}var res=[];var _39=this.lastFocused;while(_39&&_39!==this.rootNode){res.unshift(_39.item);_39=_39.getParent();}res.unshift(this.rootNode.item);return res;},mayHaveChildren:function(_3a){},getItemChildren:function(_3b,_3c){},getLabel:function(_3d){return this.model.getLabel(_3d);},getIconClass:function(_3e,_3f){return (!_3e||this.model.mayHaveChildren(_3e))?(_3f?"dijitFolderOpened":"dijitFolderClosed"):"dijitLeaf";},getLabelClass:function(_40,_41){},getRowClass:function(_42,_43){},getIconStyle:function(_44,_45){},getLabelStyle:function(_46,_47){},getRowStyle:function(_48,_49){},getTooltip:function(_4a){return "";},_onKeyPress:function(e){if(e.altKey){return;}var dk=_4.keys;var _4b=_5.getEnclosingWidget(e.target);if(!_4b){return;}var key=e.charOrCode;if(typeof key=="string"){if(!e.altKey&&!e.ctrlKey&&!e.shiftKey&&!e.metaKey){this._onLetterKeyNav({node:_4b,key:key.toLowerCase()});_4.stopEvent(e);}}else{if(this._curSearch){clearTimeout(this._curSearch.timer);delete this._curSearch;}var map=this._keyHandlerMap;if(!map){map={};map[dk.ENTER]="_onEnterKey";map[this.isLeftToRight()?dk.LEFT_ARROW:dk.RIGHT_ARROW]="_onLeftArrow";map[this.isLeftToRight()?dk.RIGHT_ARROW:dk.LEFT_ARROW]="_onRightArrow";map[dk.UP_ARROW]="_onUpArrow";map[dk.DOWN_ARROW]="_onDownArrow";map[dk.HOME]="_onHomeKey";map[dk.END]="_onEndKey";this._keyHandlerMap=map;}if(this._keyHandlerMap[key]){this[this._keyHandlerMap[key]]({node:_4b,item:_4b.item,evt:e});_4.stopEvent(e);}}},_onEnterKey:function(_4c,evt){this._publish("execute",{item:_4c.item,node:_4c.node});this.onClick(_4c.item,_4c.node,evt);},_onDownArrow:function(_4d){var _4e=this._getNextNode(_4d.node);if(_4e&&_4e.isTreeNode){this.focusNode(_4e);}},_onUpArrow:function(_4f){var _50=_4f.node;var _51=_50.getPreviousSibling();if(_51){_50=_51;while(_50.isExpandable&&_50.isExpanded&&_50.hasChildren()){var _52=_50.getChildren();_50=_52[_52.length-1];}}else{var _53=_50.getParent();if(!(!this.showRoot&&_53===this.rootNode)){_50=_53;}}if(_50&&_50.isTreeNode){this.focusNode(_50);}},_onRightArrow:function(_54){var _55=_54.node;if(_55.isExpandable&&!_55.isExpanded){this._expandNode(_55);}else{if(_55.hasChildren()){_55=_55.getChildren()[0];if(_55&&_55.isTreeNode){this.focusNode(_55);}}}},_onLeftArrow:function(_56){var _57=_56.node;if(_57.isExpandable&&_57.isExpanded){this._collapseNode(_57);}else{var _58=_57.getParent();if(_58&&_58.isTreeNode&&!(!this.showRoot&&_58===this.rootNode)){this.focusNode(_58);}}},_onHomeKey:function(){var _59=this._getRootOrFirstNode();if(_59){this.focusNode(_59);}},_onEndKey:function(_5a){var _5b=this.rootNode;while(_5b.isExpanded){var c=_5b.getChildren();_5b=c[c.length-1];}if(_5b&&_5b.isTreeNode){this.focusNode(_5b);}},multiCharSearchDuration:250,_onLetterKeyNav:function(_5c){var cs=this._curSearch;if(cs){cs.pattern=cs.pattern+_5c.key;clearTimeout(cs.timer);}else{cs=this._curSearch={pattern:_5c.key,startNode:_5c.node};}var _5d=this;cs.timer=setTimeout(function(){delete _5d._curSearch;},this.multiCharSearchDuration);var _5e=cs.startNode;do{_5e=this._getNextNode(_5e);if(!_5e){_5e=this._getRootOrFirstNode();}}while(_5e!==cs.startNode&&(_5e.label.toLowerCase().substr(0,cs.pattern.length)!=cs.pattern));if(_5e&&_5e.isTreeNode){if(_5e!==cs.startNode){this.focusNode(_5e);}}},_onClick:function(_5f,e){var _60=e.target;if((this.openOnClick&&_5f.isExpandable)||(_60==_5f.expandoNode||_60==_5f.expandoNodeText)){if(_5f.isExpandable){this._onExpandoClick({node:_5f});}}else{this._publish("execute",{item:_5f.item,node:_5f,evt:e});this.onClick(_5f.item,_5f,e);this.focusNode(_5f);}_4.stopEvent(e);},_onDblClick:function(_61,e){var _62=e.target;if((this.openOnDblClick&&_61.isExpandable)||(_62==_61.expandoNode||_62==_61.expandoNodeText)){if(_61.isExpandable){this._onExpandoClick({node:_61});}}else{this._publish("execute",{item:_61.item,node:_61,evt:e});this.onDblClick(_61.item,_61,e);this.focusNode(_61);}_4.stopEvent(e);},_onExpandoClick:function(_63){var _64=_63.node;this.focusNode(_64);if(_64.isExpanded){this._collapseNode(_64);}else{this._expandNode(_64);}},onClick:function(_65,_66,evt){},onDblClick:function(_67,_68,evt){},onOpen:function(_69,_6a){},onClose:function(_6b,_6c){},_getNextNode:function(_6d){if(_6d.isExpandable&&_6d.isExpanded&&_6d.hasChildren()){return _6d.getChildren()[0];}else{while(_6d&&_6d.isTreeNode){var _6e=_6d.getNextSibling();if(_6e){return _6e;}_6d=_6d.getParent();}return null;}},_getRootOrFirstNode:function(){return this.showRoot?this.rootNode:this.rootNode.getChildren()[0];},_collapseNode:function(_6f){if(_6f._expandNodeDeferred){delete _6f._expandNodeDeferred;}if(_6f.isExpandable){if(_6f.state=="LOADING"){return;}_6f.collapse();this.onClose(_6f.item,_6f);if(_6f.item){this._state(_6f.item,false);this._saveState();}}},_expandNode:function(_70,_71){if(_70._expandNodeDeferred&&!_71){return _70._expandNodeDeferred;}var _72=this.model,_73=_70.item,_74=this;switch(_70.state){case "UNCHECKED":_70.markProcessing();var def=(_70._expandNodeDeferred=new _4.Deferred());_72.getChildren(_73,function(_75){_70.unmarkProcessing();var _76=_70.setChildItems(_75);var ed=_74._expandNode(_70,true);_76.addCallback(function(){ed.addCallback(function(){def.callback();});});},function(err){console.error(_74,": error loading root children: ",err);});break;default:def=(_70._expandNodeDeferred=_70.expand());this.onOpen(_70.item,_70);if(_73){this._state(_73,true);this._saveState();}}return def;},focusNode:function(_77){_5.focus(_77.labelNode);},_onNodeFocus:function(_78){if(_78){if(_78!=this.lastFocused&&this.lastFocused&&!this.lastFocused._destroyed){this.lastFocused.setSelected(false);}_78.setSelected(true);this.lastFocused=_78;}},_onNodeMouseEnter:function(_79){},_onNodeMouseLeave:function(_7a){},_onItemChange:function(_7b){var _7c=this.model,_7d=_7c.getIdentity(_7b),_7e=this._itemNodesMap[_7d];if(_7e){var _7f=this;_4.forEach(_7e,function(_80){_80.attr({label:_7f.getLabel(_7b),tooltip:_7f.getTooltip(_7b)});_80._updateItemClasses(_7b);});}},_onItemChildrenChange:function(_81,_82){var _83=this.model,_84=_83.getIdentity(_81),_85=this._itemNodesMap[_84];if(_85){_4.forEach(_85,function(_86){_86.setChildItems(_82);});}},_onItemDelete:function(_87){var _88=this.model,_89=_88.getIdentity(_87),_8a=this._itemNodesMap[_89];if(_8a){_4.forEach(_8a,function(_8b){var _8c=_8b.getParent();if(_8c){_8c.removeChild(_8b);}_8b.destroyRecursive();});delete this._itemNodesMap[_89];}},_initState:function(){if(this.persist){var _8d=_4.cookie(this.cookieName);this._openedItemIds={};if(_8d){_4.forEach(_8d.split(","),function(_8e){this._openedItemIds[_8e]=true;},this);}}},_state:function(_8f,_90){if(!this.persist){return false;}var id=this.model.getIdentity(_8f);if(arguments.length===1){return this._openedItemIds[id];}if(_90){this._openedItemIds[id]=true;}else{delete this._openedItemIds[id];}},_saveState:function(){if(!this.persist){return;}var ary=[];for(var id in this._openedItemIds){ary.push(id);}_4.cookie(this.cookieName,ary.join(","),{expires:365});},destroy:function(){if(this._curSearch){clearTimeout(this._curSearch.timer);delete this._curSearch;}if(this.rootNode){this.rootNode.destroyRecursive();}if(this.dndController&&!_4.isString(this.dndController)){this.dndController.destroy();}this.rootNode=null;this.inherited(arguments);},destroyRecursive:function(){this.destroy();},resize:function(_91){if(_91){_4.marginBox(this.domNode,_91);_4.style(this.domNode,"overflow","auto");}this._nodePixelIndent=_4.marginBox(this.tree.indentDetector).w;if(this.tree.rootNode){this.tree.rootNode.attr("indent",this.showRoot?0:-1);}},_createTreeNode:function(_92){return new _5._TreeNode(_92);}});_4.require("dijit.tree.TreeStoreModel");_4.require("dijit.tree.ForestStoreModel");}}};});
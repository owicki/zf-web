/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","zf.Block"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["zf.Block"]){_4._hasResource["zf.Block"]=true;_4.provide("zf.Block");(function(){var d=_4;d.declare("zf._Blocker",null,{duration:400,opacity:0.6,backgroundColor:"#fff",zIndex:999,constructor:function(_7,_8){d.mixin(this,_8);this.node=d.byId(_7);this.overlay=d.doc.createElement("div");d.query(this.overlay).place(d.body(),"last").addClass("zfBlockOverlay").style({backgroundColor:this.backgroundColor,position:"absolute",zIndex:this.zIndex,display:"none",opacity:this.opacity});},show:function(){var _9=d.coords(this.node,true),ov=this.overlay;d.marginBox(ov,_9);d.style(ov,{opacity:0,display:"block"});d.anim(ov,{opacity:this.opacity},this.duration);},hide:function(){d.fadeOut({node:this.overlay,duration:this.duration,onEnd:d.hitch(this,function(){d.style(this.overlay,"display","none");})}).play();}});var _a=[];d.mixin(zf,{block:function(_b,_c){var n=d.byId(_b);var id=d.attr(n,"id");if(!id){id=_d();d.attr(n,"id",id);}if(!_a[id]){_a[id]=new zf._Blocker(n,_c);}_a[id].show();return _a[id];},unblock:function(_e,_f){var id=d.attr(_e,"id");if(id&&_a[id]){_a[id].hide();}}});var _10=0;var _d=function(){var _11="zf_blocked",id;do{id=_11+"_"+(++_10);}while(d.byId(id));return id;};d.extend(d.NodeList,{block:function(_12){return this.forEach(function(n){zf.block(n,_12);});},unblock:function(_13){return this.forEach(function(n){zf.unblock(n,_13);});}});})();}}};});
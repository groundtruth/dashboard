/*!
  FileDrop Revamped - HTML5 & legacy file upload
  in public domain  | http://filedropjs.org
  by Proger_XP      | http://proger.me

  Supports IE 6+, FF 3.6+, Chrome 7+, Safari 5+, Opera 11+.
  Fork & report problems at https://github.com/ProgerXP/FileDrop
*/
;window.fd=window.fd||{},function(t,n){t.randomID=function(e){return(e||"fd")+"_"+(Math.random()*1e4).toFixed()},t.uniqueID=function(e){do var n=t.randomID(e);while(t.byID(n));return n},t.byID=function(e){return t.isTag(e)?e:document.getElementById(e)},t.isTag=function(e,t){return typeof e=="object"&&e&&e.nodeType==1&&(!t||e.tagName.toUpperCase()==t.toUpperCase())},t.newXHR=function(){try{return new XMLHttpRequest}catch(e){var t=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];for(var n=0;n<t.length;n++)try{return new ActiveXObject(t[n])}catch(e){}}throw"Cannot create XMLHttpRequest."},t.isArray=function(e){return Object.prototype.toString.call(e)==="[object Array]"},t.toArray=function(e,n){return e===null||typeof e=="undefined"?[]:(!t.isArray(e)&&(typeof e!="object"||!("callee"in e))&&(e=[e]),Array.prototype.slice.call(e,n||0))},t.addEvent=function(e,t,n){return e&&t&&n&&(e.attachEvent?(e["e"+t+n]=n,e[t+n]=function(){e["e"+t+n](window.event)},e.attachEvent("on"+t,e[t+n])):e.addEventListener(t,n,!1)),e},t.stopEvent=function(e){return e.cancelBubble=!0,e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault(),e},t.setClass=function(e,n,r){return(e=t.byID(e))&&n!=null&&(typeof r!="undefined"&&!r?e.className=e.className.replace(t.classRegExp(n)," "):t.hasClass(e,n)||(e.className+=" "+n)),e},t.hasClass=function(e,n){return t.classRegExp(n).test((t.byID(e)||{}).className)},t.classRegExp=function(e){return e==""||typeof e=="object"?/$o_O/:new RegExp("(^|\\s+)"+e+"(\\s+|$)","gi")},t.extend=function(e,t,n){e=e||{},t=t||{};for(var r in t)if(n||typeof e[r]=="undefined")e[r]=t[r];return e},t.callAll=function(e,n,r){var i;n=t.toArray(n),typeof e=="function"&&(e=[e]);if(t.isArray(e)){for(var s=0;s<e.length;s++)if(typeof e[s]=="function"){i=e[s].apply(r||this,n);if(i!=null)break}}else if(e)throw"FileDrop event list must be either an Array, Function, undefined or null but "+typeof e+" was given.";return i},t.callAllOfObject=function(e,n,r){if(t.logging&&t.hasConsole){var i=e.events[n]?e.events[n].length||0:0;console.info("FileDrop "+n+" event ("+i+") args:"),console.dir([r])}var s=[t.onObjectCall].concat(e.events.any),o=t.callAll(s,[n].concat(t.toArray(r)),e);return o!=null?o:t.callAll(e.events[n],r,e)},t.appendEventsToObject=function(e,n){if(t.addEventsToObject(this,!1,arguments))return this;switch(arguments.length){case 0:return t.extend({},this.events);case 1:if(e===null)return this.events={},this;if(t.isArray(e)){var r={};for(var i=0;i<e.length;i++)r[e[i]]=t.toArray(this.events[e[i]]);return r}if(typeof e=="function")return t.funcNS(e);if(typeof e=="string")return t.toArray(this.events[e]);case 2:e=t.toArray(e);if(n===null){for(var i=0;i<e.length;i++){var s=t.splitNS(e[i]);if(!s[0])for(var o in this.events)arguments.callee.call(this,[o+":"+s[1]],null);else if(!s[1])this.events[s[0]]=[];else if(this.events[s[0]])for(var u=this.events[s[0]].length-1;u>=0;u--)t.funcNS(this.events[s[0]][u])==s[1]&&this.events[s[0]].splice(u,1)}return this}}throw"Bad parameters for FileDrop event()."},t.previewToObject=function(e,n){if(t.addEventsToObject(this,!0,arguments))return this;throw"Bad parameters for FileDrop preview()."},t.addEventsToObject=function(e,n,r){var i=r[0],s=r[1];switch(r.length){case 1:if(i&&typeof i=="object"&&!t.isArray(i)){for(var o in i)arguments.callee(e,n,[o,i[o]]);return!0};case 2:if(typeof s=="function"||t.isArray(s)){i=t.toArray(i),s=t.toArray(s);var u=n?"unshift":"push";for(var a=0;a<i.length;a++){var f=t.splitNS(i[a]);for(var l=0;l<s.length;l++)t.funcNS(s[l],f[1]);e.events[f[0]]=e.events[f[0]]||[],e.events[f[0]][u].apply(e.events[f[0]],s)}return!0}}},t.funcNS=function(e,n){return typeof e!="function"?e:arguments.length==1?(e[t.nsProp]||"").toString():(e[t.nsProp]=(n||"").toString(),e)},t.splitNS=function(e){return(e||"").match(/^([^:]*):?(.*)$/).slice(1)},t.extend(t,{logging:!0,hasConsole:"console"in window&&console.log&&console.dir,onObjectCall:null,all:[],isIE6:!1,isIE9:!1,isChrome:(navigator.vendor||"").indexOf("Google")!=-1,nsProp:"_fdns"}),t.DropHandle=function(e,n){var r=this;r.el=e=t.byID(e);if(!e)throw"Cannot locate DOM node given to new FileDrop class.";r.opt={zoneClass:"fd-zone",inputClass:"fd-file",iframe:{url:"",callbackParam:"fd-callback",fileParam:"fd-file"},input:null,recreateInput:!0,fullDocDragDetect:!1,multiple:!1,dropEffect:"copy"},t.all.push(r),r.filedrop=null;var i=r.opt.iframe;t.extend(r.opt,n,!0),t.extend(r.opt.iframe,i),t.isChrome&&(r.opt.fullDocDragDetect=!0),r.events={any:[],dragEnter:[],dragLeave:[],dragOver:[],dragEnd:[],dragExit:[],upload:[],uploadElsewhere:[],inputSetup:[],iframeSetup:[],iframeDone:[]},r.on=r.events,r.zone=r.el,r.hook=function(e){r.opt.input!=0&&(r.opt.input=r.opt.input||r.prepareInput(e),r.opt.input&&t.callAllOfObject(r,"inputSetup",r.opt.input)),r.hookDragOn(e),r.hookDropOn(e)},r.hookDragOn=function(e){r.opt.fullDocDragDetect?(r.delegate(document.body,"dragEnter"),t.addEvent(document,"dragleave",function(e){if(e.clientX==0&&e.clientY==0||t.isTag(e.relatedTarget,"html"))t.stopEvent(e),t.callAllOfObject(r,"dragLeave",e)})):(r.delegate(e,"dragEnter"),r.delegate(e,"dragLeave")),r.delegate(e,"dragOver"),r.delegate(e,"dragEnd"),r.delegate(e,"dragExit")},r.hookDropOn=function(e){t.isIE9||r.delegate(e,"drop","upload")},r.delegate=function(e,n,i){t.addEvent(e,n.toLowerCase(),function(e){t.stopEvent(e),t.callAllOfObject(r,i||n,e)})},r.prepareInput=function(e){var n=r.findInputRecursive(e)||r.createInputAt(e);if(n){var i=n.parentNode;while(i&&!t.isTag(i,"form"))i=i.parentNode;if(!i)throw"FileDrop file input has no parent form element.";var s=i?i.getAttribute("target"):"";if(s&&t.isTag(t.byID(s),"iframe"))return{file:n,form:i}}return!1},r.findInputRecursive=function(e){for(var n=0;n<e.childNodes.length;n++){var i=e.childNodes[n];if(t.isTag(i,"input")&&i.getAttribute("type")=="file"&&t.hasClass(i,r.opt.inputClass
))return i;if(i=arguments.callee(i))return i}},r.createInputAt=function(e){do var n=t.randomID();while(t.byID(n));var i=document.createElement("div");i.innerHTML='<iframe src="javascript:false" name="'+n+'"></iframe>'+'<form method="post" enctype="multipart/form-data">'+'<input type="hidden" name="'+r.opt.iframe.callbackParam+'" />'+'<input type="file" name="'+r.opt.iframe.fileParam+'" />'+"</form>",i.firstChild.setAttribute("id",n),i.firstChild.style.display="none",i.lastChild.setAttribute("target",n);var s=e.firstChild;while(s&&(!t.isTag(s)||t.isTag(s,"legend")))s=s.nextSibling;return s?e.insertBefore(i,s):e.appendChild(i),i.lastChild.lastChild},r.abortIFrame=function(){if(r.opt.input.form){var e=t.byID(r.opt.input.form.getAttribute("target"));e&&e.setAttribute("src","javascript:false")}},r.sendViaIFrame=function(e){e=e||r.opt.iframe.url;var n=(r.opt.input||{}).form;if(e&&n){do var i=t.randomID();while(i in window);window[i]=function(n){typeof n!="object"&&(n={response:n,responseXML:"",responseText:(n||"").toString(),readyState:4,status:200,statusText:"OK",getAllResponseHeaders:function(){return""},getResponseHeader:function(){return""},setRequestHeader:function(){return this},statusCode:function(){return this},abort:function(){return this}}),t.extend(n,{iframe:!0,url:e}),t.callAllOfObject(r,"iframeDone",n)};var s=n.firstChild;while(s&&(!t.isTag(s,"input")||s.name!=r.opt.iframe.callbackParam))s=s.nextSibling;return s?s.value=i:e=e.replace(/[?&]+$/,"")+(e.indexOf("?")==-1?"?":"&")+r.opt.iframe.callbackParam+"="+i,n.setAttribute("action",e),t.callAllOfObject(r,"iframeSetup",n),n.submit(),setTimeout(r.resetForm,300),!0}},r.resetForm=function(){var e=r.opt.input&&r.opt.input.file;if(e){e.value="";if(r.opt.recreateInput){var n=r.opt.input.file=e.cloneNode(!0);e.parentNode.replaceChild(n,e),t.callAllOfObject(r,"inputSetup",[r.opt.input,e])}}},r.multiple=function(e){return r.opt.input&&typeof e!="undefined"&&(e?r.opt.input.file.setAttribute("multiple","multiple"):r.opt.input.file.removeAttribute("multiple")),r.opt.input&&!!r.opt.input.file.getAttribute("multiple")},r.event=function(e,n){return t.appendEventsToObject.apply(r,arguments)},r.preview=function(e,n){return t.previewToObject.apply(r,arguments)},r.onInputSetup=function(n,i){i?(n.file.clearAttributes&&n.file.clearAttributes(),n.file.mergeAttributes&&n.file.mergeAttributes(i)):r.multiple(r.opt.multiple),t.setClass(n.file,r.opt.inputClass),r.delegate(n.file,"change","upload");var s=n.file.parentNode;s&&s.style.display.match(/^(static)?$/)&&(s.style.position="relative");if(t.isTag(e,"fieldset")){var o=document.createElement("div");o.style.position="relative",o.style.overflow="hidden",e.parentNode.insertBefore(o,e),o.appendChild(e)}},r.onDragOver=function(e){t.stopEvent(e),e.dataTransfer&&(e.dataTransfer.dropEffect=r.opt.dropEffect)},r.onUpload=function(){for(var e=0;e<t.all.length;e++)t.all[e]!==r&&t.all[e].events&&t.callAllOfObject(t.all[e],"uploadElsewhere",r)},r.event({inputSetup:r.onInputSetup,dragOver:r.onDragOver,upload:r.onUpload}),t.setClass(e,r.opt.zoneClass),r.hook(e)},t.FileDrop=function(e,n){function i(n){return function(){t.setClass(e,r.opt.dragOverClass,n)}}var r=this;e=t.byID(e),r.handle=new t.DropHandle(e,n),r.handle.filedrop=r,t.extend(r.handle.opt,{dragOverClass:"over"}),t.extend(r.handle.opt.iframe,{force:!1}),t.extend(r.handle.events,{send:[],fileSetup:[]}),r.onUpload=function(e){var n=!r.opt.iframe.force&&r.eventFiles(e,!0);n?n.length>0&&t.callAllOfObject(r,"send",[n]):!r.handle.sendViaIFrame()&&t.hasConsole&&console.warn("FileDrop fallback upload triggered but iframe options were not configured - doing nothing.")},r.eventFiles=function(e,n){var i=new t.FileList(e);if(e.dataTransfer&&(e.dataTransfer.length||e.dataTransfer.files))var s=e.dataTransfer;else var s=e.target&&e.target.files||e.srcElement&&e.srcElement.files;if(s){var o=s.items||[];s.files&&(s=s.files);var u={};for(var a=0;a<s.length;a++){var f=new t.File(s[a]);u[f.name]||(u[f.name]=!0,f.setNativeEntry(o[a]),t.callAllOfObject(r,"fileSetup",f),(f.size>0||f.nativeEntry)&&i.push(f))}}else n&&(i=!1);return i},t.extend(r,r.handle),r.event({upload:r.onUpload,send:r.resetForm,dragEnter:i(!0),dragLeave:i(!1),uploadElsewhere:i(!1)}),r.preview({upload:i(!1)})},t.FileList=function(e){var n=this;n.dropEffect=e&&e.dropEffect||"",n.length=0,e=null,n.push=function(e){return n[n.length++]=e,n},n.pop=function(){if(n.length>0){var e=n.last();return delete n[--n.length],e}},n.first=function(){return n[0]},n.last=function(){return n[n.length-1]},n.remove=function(e){for(;e<n.length-1;e++)n[e]=n[e+1];return se.f.pop(),n},n.clear=function(){for(var e=0;e<n.length;e++)delete n[e];return n.length=0,n},n.reverse=function(){for(var e=0;e<Math.floor(n.length/2);e++)n[e]=n[n.length-e-1];return n},n.concat=function(e){var r=new t.FileList;for(var i=0;i<n.length;i++)r[i]=n[i];for(var i=0;e&&i<e.length;i++)r[n.length+i+1]=e[i];return r.length=n.length+(e||[]).length,n},n.sort=function(e,t){for(var r=0;r<n.length;r++)for(var i=0;i<n.length;i++)if(e.call(t||this,n[r],n[i],r,i)<0){var s=n[r];n[r]=n[i],n[i]=s}return n},n.sortBy=function(e,t){var r=[];for(var i=0;i<n.length;i++)r.push([i,e.call(t||this,n[i],i)]);r.sort(function(e,t){return e[1]>t[1]?1:e[1]<t[1]?-1:0});for(var i=0;i<r.length;i++)n[i]=r[i][0];return n},n.find=function(e,t){for(var r=0;r<n.length;r++){var i=e.call(t||this,n[r],r);if(i!=null)return n[r]}},n.each=function(e,t){return n.find(function(){e.apply(this,arguments)},t),n},n.invoke=function(e,n){var r=t.toArray(arguments,1);return this.each(function(t){t[e].apply(t,r)})},n.abort=function(){return this.invoke("abort")},n.findCompare=function(e,t){var r,i=null,s;return n.each(function(n){if(i==null||i<(s=e.call(t,r)))r=n},t),r},n.filter=function(e,r){var i=new t.FileList;return n.each(function(t){e.apply(this,arguments)&&i.push(t)},r),i},n.largest=function(){return n.findCompare(function(e){return e.size})},n.smallest=function(){return n.findCompare(function(e){return-e.size}
)},n.oldest=function(){return n.findCompare(function(e){return-e.modDate.getTime()})},n.newest=function(){return n.findCompare(function(e){return e.modDate})},n.ofType=function(e){return e+=e.indexOf("/")==-1?"/":"$",e=new RegExp("^"+e,"i"),n.filter(function(t){return e.test(t.type)})},n.images=function(){return n.ofType("image")},n.named=function(e){return typeof e=="string"?n.find(function(t){return t.name==e}):n.filter(function(t){return e.test(t.name)})}},t.FileList.prototype.length=0,t.FileList.prototype.splice=Array.prototype.splice,t.File=function(n){var r=this;r.nativeFile=n,r.nativeEntry=null,r.name=n.fileName||n.name||"",r.size=n.fileSize||n.size||0,r.type=r.mime=n.fileType||n.type||"",r.modDate=n.lastModifiedDate||new Date,r.xhr=null,r.opt={extraHeaders:!0,xRequestedWith:!0,method:"POST"},r.events={any:[],xhrSetup:[],xhrSend:[],progress:[],done:[],error:[]},r.events.sendXHR=r.events.xhrSend,r.abort=function(){return r.xhr&&r.xhr.abort&&r.xhr.abort(),r},r.sendTo=function(e,n){n=t.extend(n,r.opt),n.url=e;if(!r.size)t.hasConsole&&console.warn("Trying to send an empty FileDrop.File.");else if(window.FileReader){var i=new FileReader;i.onload=function(e){r.sendDataReadyTo(n,e)},i.onerror=function(e){t.callAllOfObject(r,"error",[e])},i.readAsArrayBuffer(r.nativeFile)}else r.sendDataReadyTo(n);return r},r.sendDataReadyTo=function(e,n){r.abort(),r.xhr=t.newXHR(),r.hookXHR(r.xhr),r.xhr.open(e.method,e.url,!0),r.xhr.overrideMimeType&&r.xhr.overrideMimeType("application/octet-stream"),r.xhr.setRequestHeader("Content-Type","application/octet-stream");if(e.extraHeaders){r.xhr.setRequestHeader("X-File-Name",encodeURIComponent(r.name)),r.xhr.setRequestHeader("X-File-Size",r.size),r.xhr.setRequestHeader("X-File-Type",r.type),r.xhr.setRequestHeader("X-File-Date",r.modDate.toGMTString());var i=e.xRequestedWith;if(i===!0){var s=window.FileReader?"FileAPI":"Webkit";i="FileDrop-XHR-"+s}i&&r.xhr.setRequestHeader("X-Requested-With",i)}t.callAllOfObject(r,"xhrSetup",[r.xhr,e]);var o=n&&n.target&&n.target.result?n.target.result:r.nativeFile;return t.callAllOfObject(r,"xhrSend",[r.xhr,o,e]),r.xhr},r.hookXHR=function(e){var n=e.upload||e;e.onreadystatechange=function(n){if(e.readyState==4){try{var i=e.status==200?"done":"error"}catch(n){var i="error"}var s=i=="error"?[n,e]:[e,n];t.callAllOfObject(r,i,s)}},n.onprogress=function(n){var i=n.lengthComputable?n.loaded:null;t.callAllOfObject(r,"progress",[i,n.total||null,e,n])}},r.readData=function(e,t,n){return r.read({onDone:e,onError:t,func:n})},r.readDataURL=function(e,t){return r.readData(e,t||!1,"uri")},r.readDataURI=r.readDataURL,r.read=function(n){function i(e,t){typeof t=="object"||(t.message=t),t.fdError=e,n.onError!==!1&&(n.onError||n.onDone).apply(this,arguments)}t.extend(n,{onDone:new Function,onError:null,blob:r.nativeFile,func:"",start:0,end:null,mime:""});if(!window.FileReader)return i("support",e);if(n.start>0||n.end!=null&&n.end)n.blob.slice?(n.end==null&&(n.end=n.blob.size||n.blob.fileSize),n.blob=n.blob.slice(n.start,n.end,n.mime)):t.hasConsole&&console.warn("File Blob/slice() are unsupported - operating on entire File.");var s=new FileReader;s.onerror=function(e){i("read",e)},s.onload=function(e){e.target&&e.target.result?(n.func=="readAsBinaryString"&&(e.target.result=String.fromCharCode.apply(null,new Uint8Array(e.target.result))),n.onDone(e.target.result)):s.onerror(e)};var o=n.func;if(t.isArray(o)){var u=o[0];return o[0]=n.blob,s[u].apply(s,o)}if(!o||o=="bin")o="readAsBinaryString";else if(o=="url"||o=="uri"||o=="src")o="readAsDataURL";else if(o=="array")o="readAsArrayBuffer";else if(o=="text")o="readAsText";else if(o.substr(0,4)!="read")return s.readAsText(n.blob,o);return o=="readAsBinaryString"&&(o="readAsArrayBuffer"),s[o](n.blob)},r.listEntries=function(e,n){if(r.nativeEntry&&r.nativeEntry.isDirectory){n=n||new Function;var i=r.nativeEntry.createReader(),s=new t.FileList,o=0;function u(t){o-=t,o==0&&e&&(e(s),e=null)}return i.readEntries(function(e){for(var r=0;r<e.length;r++){var a=e[r];a.file?(o++,a.file(function(e){var n=new t.File(e);n.setNativeEntry(a),s.push(n),u(1)},function(){s.push(t.File.fromEntry(a)),u(1),n.apply(this,arguments)})):s.push(t.File.fromEntry(a))}r?i.readEntries(arguments.callee,n):u(0)},n),!0}},r.setNativeEntry=function(e){r.nativeEntry=e&&e.webkitGetAsEntry&&e.webkitGetAsEntry()},r.event=function(e,n){return t.appendEventsToObject.apply(r,arguments)},r.preview=function(e,n){return t.previewToObject.apply(r,arguments)},r.onXhrSend=function(e,t){e.send(t)},r.event({xhrSend:r.onXhrSend})},t.File.fromEntry=function(e){var n=new t.File(e);return n.setNativeEntry(e),n.nativeFile=null,n},t.jQuery=function(e){e=e||jQuery||window.jQuery;if(!e)throw"No window.jQuery object to integrate FileDrop into.";e.fn.filedrop=function(n){function r(e,n){return function(r){var s=(n||[]).concat(t.toArray(arguments,1));return i.triggerHandler((e+r).toLowerCase(),s)}}var i=this,s=this.data("filedrop");if(typeof n=="string")if(!s)e.error("$.filedrop('comment') needs an initialized FilrDrop on this element.");else{if(typeof s[n]!="undefined"){var o=s[n];return typeof o=="function"?o.apply(s,t.toArray(arguments,1)):o}e.error("There's no method or property FileDrop."+n+".")}else if(!n||typeof n=="object")if(!s){var u=new FileDrop(this[0],n);u.$el=e(this),this.first().data("filedrop",u),u.event("any",r("fd")),u.on.fileSetup.push(function(e){e.event("any",r("file",[e]))})}else{if(!n)return s;t.extend(s.opt,n,!0)}else e.error("Invalid $.filedrop() parameter - expected nothing (creates new zone), a string (property to access) or an object (custom zone options).");return i}},n.FileDrop=t.FileDrop}(window.fd,window);

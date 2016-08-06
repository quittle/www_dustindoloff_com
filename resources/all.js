var main;function onHashChange(b){var a=location.hash.substring(1);b.preventDefault();b.stopPropagation();return true}function init(){main=document.getElementsByTagName("main")[0]}window.addEventListener("hashchange",onHashChange,true);window.addEventListener("load",init);window.addEventListener("load",onHashChange);var nav,main;function init(){nav=document.querySelector("nav");main=document.querySelector("main");onHashChange()}function isMobile(){return window.matchMedia&&matchMedia("(max-width: 799px)").matches}function onHashChange(){console.log("hc");if(isMobile()){console.log("hc2");var c=location.hash.substring(1);if(c){var b=document.getElementById(c+"_");var a=b.offsetTop;var d=parseInt(window.getComputedStyle(document.querySelector("nav")).getPropertyValue("height"));window.scrollBy(0,a)}}}function onScroll(){return;if(isMobile()&&nav&&main){var a=nav.classList;if(pageYOffset>0){a.add("mobile-scroll");var b=getComputedStyle(nav);main.style.paddingTop=parseInt(b.getPropertyValue("height"))+parseInt(b.getPropertyValue("padding-top"))+parseInt(b.getPropertyValue("border-bottom"))+"px"}else{a.remove("mobile-scroll");main.style.paddingTop=""}}}window.addEventListener("hashchange",onHashChange);window.addEventListener("load",onHashChange);window.addEventListener("load",init);window.addEventListener("resize",onScroll);init();var scrollEvents=["scroll","touchstart","touchend","touchcancel","touchleave","touchmove"];for(var i=0;i<scrollEvents.length;i++){window.addEventListener(scrollEvents[i],onScroll)};(function(){var w=window,d=document,SYNC_ATTRIBUTE="sync",DEFER_ATTRIBUTE="defer",REL_VALUE="jss",MAX_CYCLES=30,JSS_TAG="!JSS",MEDIA_ATTRIBUTE="media",VARIABLE_INDICATOR="@",FUNCTION_STRING_INDICATOR="@",EXCEPTION_ON_ERROR=false,LOADED_LINKS=[],MACRO_OPEN_TAG_REGEX=new RegExp(JSS_TAG+"\\s*{","g"),STATIC_MACRO_VARIABLE=function(key){return new RegExp(VARIABLE_INDICATOR+key+VARIABLE_INDICATOR,"g")},GENERIC_STATIC_MACRO_VARIABLE=function(){return STATIC_MACRO_VARIABLE("(\\d|\\w)+")};function getJSSLinks(){var links=[];if(d.querySelectorAll){var nl=d.querySelectorAll("link[rel="+REL_VALUE+"], link[rel=alternate][type=application\\/jss]");for(var i=0;i<nl.length;i++){links.push(nl[i])}return links}else{var allLinks=d.getElementsByTagName("link");for(var i=0;i<allLinks.length;i++){var l=allLinks[i];if(l.getAttribute("rel").toLowerCase()===REL_VALUE||(l.getAttribute("rel").toLowerCase()==="alternate"&&l.getAttribute("type").toLowerCase()==="application/jss")){links.push(l)}}return links}}function checkForJSSLinks(){ArrayMap(getJSSLinks(),function(l){if(ArrayIndexOf(LOADED_LINKS,l)==-1){var async=isAsynchronous(l),deferred=isDeferred(l),mediaQuery=getMediaQuery(l);if(!deferred||document.readyState=="complete"){createStyle(l,async,mediaQuery);LOADED_LINKS.push(l)}}})}function isAsynchronous(link){return link.getAttribute(SYNC_ATTRIBUTE)===null}function isDeferred(link){return link.getAttribute(DEFER_ATTRIBUTE)!==null}function getMediaQuery(link){return link.getAttribute(MEDIA_ATTRIBUTE)}function createStyle(el,async,mediaQuery){var url=el.getAttribute("href");if(url!=null){var s=document.createElement("style");s.setAttribute("type","text/css");var xmlhttp;if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest()}else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")}xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4){var text=parseScript(xmlhttp.responseText);if(mediaQuery){text="@media "+mediaQuery+" {\n"+text+"\n}"}text="/* Generated CSS from '"+url+"' */\n\n"+text+"\n";if(s.styleSheet){s.styleSheet.cssText=text}else{try{s.appendChild(document.createTextNode(text))}catch(e){s.text=text}}el.parentNode.insertBefore(s,el.nextSibling)}};if(xmlhttp.overrideMimeType){xmlhttp.overrideMimeType("plain/text")}xmlhttp.open("GET",url,async);xmlhttp.send()}}function parseScript(text){text=removeComments(text);var content=getJSSTagContents(text),preStatements=splitStatements(content),statements=getDefaultFunctions();for(var i=0;i<preStatements.length;i++){var ps=StringTrim(preStatements[i]);if(ps!=""){var index=StringIndexOf(ps,":"),key=StringTrim(ps.substring(0,index)),value=StringTrim(ps.substring(index+1));value=destringify(value);var item=ArrayFind(statements,function(s){return s.key===key});if(item){item.value=value}else{statements.push({key:key,value:value})}}}var functionified=functionifyText(text,statements);text=functionified.text;statements=functionified.statements;var done=false;for(var i=0;!done&&i<MAX_CYCLES;i++){var ret=macrofy(text,statements);text=ret.text;done=!ret.change}if(!done){err("Recursive interpretation limit reached ("+MAX_CYCLES+")")}text=removeJSSTagContents(text);return text}function getJSSTagContents(text){var i,ret=[];while((i=text.search(MACRO_OPEN_TAG_REGEX))!=-1){var openLoc=StringIndexOf(text,"{",i)+1,endLoc=getEnd(text,i,"{","}");ret.push(text.substring(openLoc,endLoc));text=text.substring(endLoc+1)}return ret.join(";")}function removeJSSTagContents(text){text=removeComments(text);var i,endLoc,cleanText="";while((i=text.search(MACRO_OPEN_TAG_REGEX))!=-1){endLoc=getEnd(text,i,"{","}");cleanText+=text.substring(0,i);text=text.substring(endLoc+1)}cleanText+=text;return StringTrim(cleanText)}function getDefaultFunctions(){var ret=[{key:"add",value:function(){var ret=0;for(var i=0,a=arguments,l=a.length;i<l;i++){ret+=parseFloat(a[i])}return ret}},{key:"subtract",value:function(){var a=arguments,ret=a[0];for(var i=1,a=arguments,l=a.length;i<l;i++){ret-=parseFloat(a[i])}return ret}},{key:"multiply",value:function(){var ret=1;for(var i=0,a=arguments,l=a.length;i<l;i++){ret*=parseFloat(a[i])}return ret}},{key:"divide",value:function(){var a=arguments,ret=a[0];for(var i=1,a=arguments,l=a.length;i<l;i++){ret/=parseFloat(a[i])}return ret}},{key:"pow",value:function(base,pow){return Math.pow(parseFloat(base),parseFloat(pow))}},{key:"prefixify",value:function(func){var prefixes=["khtml","moz","ms","o","webkit"];var ret="";for(var i=0;i<prefixes.length;i++){ret+=func(prefixes[i])}ret+=func(null);return ret}},{key:"prefixifyProperty",value:function(property,value){return prefixify(function(prefix){if(prefix){return"-"+prefix+"-"+property+": "+value+";\n"}else{return property+": "+value+";\n"}})}},{key:"prefixifyRule",value:function(){var rule=arguments[0],remainingRule="",contents;if(arguments.length==2){contents=arguments[1]}else{if(arguments.length==3){remainingRule=arguments[1];contents=arguments[2]}else{throw"Illegal number of arguments"}}return prefixify(function(prefix){if(prefix){return"@-"+prefix+"-"+rule+" "+remainingRule+" {\n"+contents+"\n}\n"}else{return"@"+rule+" "+remainingRule+"{\n"+contents+"\n}\n"}})}}];var copy=[["divide","div"],["multiply","mul"],["subtract","sub"]];ArrayMap(ret,function(r){var k=r.key,v=r.value;ArrayMap(copy,function(c){if(k===c[0]){ret.push({key:c[1],value:v})}})});ArrayMap(ret,function(r){r.value=r.value.toString()});return ret}function destringify(value){var re=new RegExp("^\\s*"+FUNCTION_STRING_INDICATOR+"\\s*['|\"]([\\s\\S]*)['|\"]\\s*$"),result=value.match(re);if(result!==null){result=result[1];result=result.replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');return result}else{return value}}function functionifyText(text,statements){ArrayMap(statements,function(s){var k=s.key,v=s.value;if(typeof v==="function"){}else{if(isArray(v)){s.value="function(){return "+v+";}"}else{if(!isFunction(v)){s.value="function(){return '"+v+"';}"}}}ArrayMap(statements,function(s2){s.value=s.value.replace(STATIC_MACRO_VARIABLE(s2.key),VARIABLE_INDICATOR+s2.key+"()"+VARIABLE_INDICATOR)});text=text.replace(STATIC_MACRO_VARIABLE(k),VARIABLE_INDICATOR+k+"()"+VARIABLE_INDICATOR)});return{text:text,statements:statements}}function removeComments(text){var comment=new RegExp("\\/\\*[^*]*\\*+([^/*][^*]*\\*+)*\\/","gm");return text.replace(comment,"")}function getEnd(str,start,open,close){var count=0;while(start<str.length){var c=str.charAt(start);if(str.indexOf(close,start)==start){count--;if(count==0){break}start+=close.length}else{if(str.indexOf(open,start)==start){count++;start+=open.length}else{start++}}}if(start>=str.length){return -1}else{return start}}function splitStatements(text){var ret=[],start=0,progress=0;while(progress<text.length){var semicolon=StringIndexOf(text,";",progress),curly=StringIndexOf(text,"{",progress);if(semicolon>-1&&(semicolon<curly||curly==-1)){ret.push(text.substring(start,semicolon));start=semicolon+1;progress=start}else{if(curly>-1&&(curly<semicolon||semicolon==-1)){progress=getEnd(text,curly,"{","}")+1}else{if(semicolon==-1&&curly==-1){ret.push(text.substring(start));break}else{err("Malformed JSS")}}}}return ret}function macrofy(text,statements){var change=false;for(var i=0;i<statements.length;i++){var s=statements[i],ref=function(){return new RegExp(VARIABLE_INDICATOR+s.key+"\\s*\\(([^?!\\)]*)\\)\\s*"+VARIABLE_INDICATOR,"gm")},oldText=text,f=runFunction(s.value);if(f.runnable){ArrayMap(statements,function(i){var v=i.value;if(v!==undefined){i.value=macrofyWithStatement(v,s,statements)}});text=macrofyWithStatement(text,s,statements)}if(text!=oldText){change=true}}return{text:text,change:change}}function macrofyWithStatement(text,statement,statements){var jssff=new JSSFunctionFinder(statement.key,text);var r;while((r=jssff.next())!=null){var func=r.func,args=r.args;if(args!=null){result=runFunction(statement.value,args,statements);var t=func.substring(1,func.length-1);if(result.runnable&&!containsJSSVariable(t)){text=text.replace(func,result.result)}}}return text}function runFunction(str,args,statements){try{if(isFunction(str)&&!containsJSSVariable(str)){if(args===undefined){args=""}if(statements===undefined){return{runnable:true,result:undefined}}var definitions="";ArrayMap(statements,function(s){definitions+="var "+s.key+"="+s.value+";"});var f;eval(definitions+"f = ("+str+")("+args+")");return{runnable:true,result:new String(f)}}}catch(e){err(str,args,e)}return{runnable:false,result:undefined}}function JSSFunctionFinder(funcName,string){var fn=funcName,str=string;var refObj=ref();function ref(){return new RegExp(VARIABLE_INDICATOR+fn+"\\s*\\(","gm")}function ref2(){return new RegExp(VARIABLE_INDICATOR+fn+"\\s*\\(([^?!\\)]*)\\)\\s*"+VARIABLE_INDICATOR,"gm")}this.next=function(){var lastIndex=refObj.lastIndex;var r=refObj.exec(str);if(r!==null){refObj.lastIndex=r.index+1;var endVar=")"+VARIABLE_INDICATOR,end=getEnd(str,r.index,VARIABLE_INDICATOR,endVar),functionCall=str.substring(r.index,end+endVar.length),args,stripped=functionCall.substring(1,functionCall.length-1);if(!containsJSSVariable(stripped)){args=ref2().exec(functionCall)[1]}return{func:functionCall,args:args}}}}function isFunction(str){return StringStartsWith(str,"function")&&str.charAt(str.length-1)=="}"}function isArray(str){try{return eval(str) instanceof Array}catch(e){return false}}function containsJSSVariable(str){var re1=new RegExp(VARIABLE_INDICATOR+"(\\d|\\w)+"+VARIABLE_INDICATOR,"g"),re2=new RegExp(VARIABLE_INDICATOR+"(\\d|\\w)+\\s*\\(([^?!\\)]*)\\)\\s*"+VARIABLE_INDICATOR,"gm");return re1.test(str)||re2.test(str)}function err(){if(!err.count){err.count=1}if(EXCEPTION_ON_ERROR){throw arguments.toString()}else{if(window.console){var args=[];for(var i=0,l=arguments.length;i<l;i++){args.push(arguments[i])}ArrayMap(args,function(a){console.error("ERROR ("+err.count+"): "+a)})}}err.count++}function WindowAddEventListener(type,listener,useCapture){if(window.addEventListener){return window.addEventListener(type,listener,useCapture)}else{if(window.attachEvent){type="on"+type;useCapture=!!useCapture;return window.attachEvent(type,listener,useCapture)}}}function StringTrim(str){return str.replace(/^\s+|\s+$/g,"")}function StringStartsWith(haystack,needle){return haystack.indexOf(needle)==0}function ArrayFind(arr,f){if(Array.prototype.find){return arr.find(f)}else{for(var i=0,t;i<arr.length;i++){t=arr[i];if(f(t)){return t}}return undefined}}function ArrayMap(arr,fun,thisp){if(Array.prototype.map){return arr.map(fun,thisp)}else{var len=arr.length;if(typeof fun!="function"){throw new TypeError()}var res=new Array(len);for(var i=0;i<len;i++){if(i in arr){res[i]=fun.call(thisp,arr[i],i,arr)}}return res}}function ArrayIndexOf(arr,obj,start){if(Array.prototype.indexOf){return arr.indexOf(obj,start)}else{for(var i=(start||0),l=arr.length;i<l;i++){if(arr[i]===obj){return i}}return -1}}function StringIndexOf(haystack,needle,start){if(String.prototype.indexOf){return haystack.indexOf(needle,start)}else{for(var i=(start||0),nl=needle.length,l=haystack.length;i<l;i++){var end=i+nl;if(i<l&&haystack.substring(i,end)===needle){return i}}return -1}}var usedLinks=[],links=getJSSLinks();checkForJSSLinks();WindowAddEventListener("load",checkForJSSLinks);for(var i=1;i<4;i++){setTimeout(checkForJSSLinks,i*i*100)}setInterval(checkForJSSLinks,3000)})();var nav,main;function init(){nav=document.querySelector("nav");main=document.querySelector("main");onHashChange()}function isMobile(){return window.matchMedia&&matchMedia("(max-width: 799px)").matches}function onHashChange(){if(isMobile()){var d=location.hash.substring(1);if(d){var c=document.getElementById(d+"_");var b=c;var a=0;do{a+=parseInt(b.offsetTop);b=b.parentNode}while(b&&b.offsetTop);var e=parseInt(window.getComputedStyle(document.querySelector("nav")).getPropertyValue("height"));window.scrollBy(0,a+e-document.body.scrollTop)}}}window.addEventListener("hashchange",onHashChange);window.addEventListener("load",init);init();
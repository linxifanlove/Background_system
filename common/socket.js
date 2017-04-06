var socket; 
function initSocket(sOpen, sError, sMessage, sClose){
	 
       // function Connect(){  
            try{  
                socket=new WebSocket('ws://127.0.0.1:9000');  
            }catch(e){
                return;  
            }  
            socket.onopen = sOpen;  
            socket.onerror = sError;
            socket.onmessage= sMessage;
            socket.onclose= sClose;
        //} 
}

function sClose(e){
} 
function sOpen(){
}
function sError(e){
}
function getJsonStr(json){
	var str = JSON.stringify(json);
	var jsonStr = str.slice(1, str.length-1);
	return jsonStr;
}


function Close(){
	socket.close();
} 

var urlArgs =getArgs();
function getArgs() { 
	var args = {};
	var query = location.search.substring(1);
	var pairs = query.split("&"); 
	for(var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1) continue;
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		value = decodeURIComponent(value);
		args[argname] = value;
	}
	return args;
}


$(function () {

    if (typeof (Worker) === "undefined") {

        $('body').html('<div style="font-size:16px;color:red; text-align:center;">很抱歉，您的浏览器不支持HTML5。</div>');

    }
});


/** common **/
String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.Right = function (i) { 
    return this.slice(this.length - i, this.length); 
};

String.prototype.PadLeft = function (len, c) {
    var temp = this;
    while (temp.length < len) {
        temp = c + temp;
    }
    return temp;
}

Request = {
    QueryString: function (item) {
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
        var Qvalue = svalue ? svalue[1] : svalue;
        if (Qvalue == null) { return ""; }
        else { return Qvalue.Trim(); }
    }
};

function closeWindow() {

    try {
        if (window.WeixinJSBridge) {
            WeixinJSBridge.call('closeWindow');
        }
        else {
            window.self.opener = null;
            window.self.close();
        }
    }
    catch (err) {
    }

}

function parseint(value) {
    value = parseInt(value);
    if (value > 0) return '+' + value;
    else return value;
}

function intToDate(nS) {
    if (nS.toString().length == 13)
        return new Date(parseInt(nS));
    else
        return new Date(parseInt(nS) * 1000);
}

function strToDate(sDate) {
    var arr = sDate.split(/[- :]/);
    if (arr.length == 3) {
        return new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]));
    }
    else if (arr.length == 5) {
        return new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]), parseInt(arr[3]), parseInt(arr[4]), 0);
    }
    else {
        return new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]), parseInt(arr[3]), parseInt(arr[4]), parseInt(arr[5]));
    }
}

Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                   ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

function stopEvent(e) {
    if (!e) e = window.event;
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    else {
        e.cancelBubble = true;
    }

    if (e.preventDefault) {
        e.preventDefault();
    }
    else {
        e.returnValue = false;
    }
}

/** alert **/

var gm = {};
gm.alert = function (msg,btnText,callback) {

    if (typeof (btnText) == "undefined") {
        btnText = "确定";
    }

    if (typeof (callback) == "undefined") {
        layer.open({
            content: msg
          , btn: btnText
        });
    }
    else {
        layer.open({
            content: msg
          , btn: btnText
          , yes: function (index) {
              layer.close(index);
              callback();
          }
        });
    }

}

gm.confirm = function (msg, callback) {

    layer.open({
        content: msg
      , btn: ['确定', '取消']
      , yes: function (index) {
          layer.close(index);
          callback();
      }
    });

}

gm.tip = function (msg, time) {

    if (typeof (time) == "undefined") {
        time = 2;
    }

    layer.open({
        content: msg
      , skin: 'msg'
      , time: time
    });
}

/**
window.onerror = function (msg, url, l) {
    var txt = '<div style="word-break:break-all; word-wrap:break-word;">';
    txt += '调试错误信息<br/>';
    txt += '错误信息: ' + msg + '<br/>'
    txt += '链接地址: ' + url + '<br/>'
    txt += '错误行数: ' + l + '<br/>'
    txt += '点击确定继续。'
    txt += '</div>';
    gm.alert(txt)
    return true
}
**/

/** loading **/

var loading = {
    show: function () {
        if ($('#divLoading').length == 0) {
            var s = '';
            s += '<div id="divLoading" style="position:fixed; z-index:2147483646; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,.3);text-align:center; display:none;">';
            s += '  <div class="data_loading" style="width:100px;height:100px;margin:0 auto;position:absolute;z-index:2147483647;top:50%;left:50%;margin-top:-50px;margin-left:-50px;"></div>';
            s += '</div>';
            $(document.body).append(s);

            $('#divLoading .data_loading').shCircleLoader({
                color: 'rgba(255,255,255,1)'
            });
        }
        $('#divLoading').show();
    },
    hide: function () {
        $('#divLoading').hide();
    }
};

/** get post **/

function redirectAuthUrl() {
    location.href = "/ReLogin.aspx?redirect_url=" + encodeURIComponent(location.href.split('#')[0]);
}

function get(url, data, callback) {

    if (typeof (callback) == "undefined") {
        callback = data;
        data = {};
    }

    $.get(url,data,function(ret){
        eval("ret=" + ret);
        if (typeof (ret.message) == "string") {
            if (ret.message.indexOf("请先登录") != -1) {
                return redirectAuthUrl();
            }
        }
        callback(ret);
    },"text");

}

function post(url, data, callback) {

    $.post(url, data, function (ret) {
        eval("ret=" + ret);
        if (typeof(ret.message)=="string") {
            if (ret.message.indexOf("请先登录") != -1) {
                return redirectAuthUrl();
            }
        }
        callback(ret);
    }, "text");

}

function browsePic(callback) {

    if ($("#divAlbumPhotos").length == 0) {

        post("/api/MchInterface.asmx/MchPicList", {}, function (dt) {

            var s = '';
            s += '<div id="divAlbumPhotos" class="sel-photos" style="display: block;">';
            s += '    <div class="wrapper">';
            s += '        <div class="main">';
            s += '            <div class="title">请选择图片<a style="cursor:pointer;" onclick="$(\'#divAlbumPhotos\').remove();">×</a></div>';
            s += '            <div class="box">';
            s += '                <div class="photos-box">';
            s += '                    <div class="note">私聊云富豪助理发送图片即可收藏</div>';
            s += '                    <ul class="img-list">';
            s += '                        <li>';
            s += '                            <i class="fa fa-plus"></i>';
            s += '                        </li>';

            for (var i = 0; i < dt.length; i++) {

                var dr = dt[i];

                s += '                        <li style="background-image: url('+dr.vcPic+');">';
                s += '                            <a style="cursor:pointer;" dataurl="'+dr.vcPic+'" class="link"></a><a href="javascript:void(0)" dataid="'+dr.nPicId+'" class="del"><i class="fa fa-times-circle"></i></a>';
                s += '                        </li>';
            }
            s += '                    </ul>';
            s += '                </div>';
            s += '            </div>';
            s += '        </div>';
            s += '    </div>';
            s += '</div>';

            $(document.body).children(".content").append(s);
            $(".img-list>li").height($(".img-list>li").width());

            $("#divAlbumPhotos .fa-plus").click(function () {
                browseImage(null, function (ret) {
                    if (ret.state == 1) {
                        $("#divAlbumPhotos").remove();
                        callback(ret.url);
                    }
                    else {
                        gm.alert(ret.message);
                    }
                }, 640);
            });
            $("#divAlbumPhotos a.link").click(function () {
                var vcPic = $(this).attr("dataurl");
                $("#divAlbumPhotos").remove();
                callback(vcPic);
            });
            $("#divAlbumPhotos a.del").click(function () {
                var delBtn = this;
                var nPicId = $(this).attr("dataid");
                post("/api/MchInterface.asmx/MchPicDelete", { nPicId: nPicId }, function (ret) {
                    if (ret.state == 1) {
                        $(delBtn).closest("li").remove();
                    }
                    else {
                        gm.alert(ret.message);
                    }
                });
            });

        });
    }
}

function browseImage(preview, callback, max_width) {

    var upload = false;
    if (typeof (callback) == "function") {
        upload = true;
    }

    if (typeof (max_width) == "undefined" || max_width == null) {
        max_width = 640;
    }

    if (typeof (window.FileReader) == "undefined") {
        gm.alert("抱歉，你的浏览器不支持 FileReader");
        return false;
    }

    var loading = {
        show: function () {
            if (document.getElementById('divFileLoading') == null) {
                var div = document.createElement("div");
                div.id = "divFileLoading";
                div.innerHTML = '<div id="divFileLoading" class="main"><i class="fa fa-spinner fa-pulse"></i><p>正在上传</p></div>';
                div.className = 'loading';
                div.style.display = 'block';
                document.body.appendChild(div);
            }
        },
        hide: function () {
            if (document.getElementById('divFileLoading') != null) {
                document.body.removeChild(document.getElementById('divFileLoading'));
            }
        }
    };

    function createObjectURL(blob) {
        if (window.URL) {
            return window.URL.createObjectURL(blob);
        } else if (window.webkitURL) {
            return window.webkitURL.createObjectUrl(blob);
        } else {
            return null;
        }
    }

    function readFile() {

        var file = this.files[0];

        if (!/image\/\w+/.test(file.type)) {
            gm.alert("请确保文件为图像类型！");
            return false;
        }

        console.log("原始文件大小：" + (file.size / 1024).toFixed(3) + 'k');

        if (file.size > 5 * 1024 * 1024) {
            gm.alert("你上传的文件太大了！");
            return false;
        }

        if (file.size > 1 * 1024 * 1024) {
            max_width = 550;
        }

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {

            var readerResult = this.result;
            console.log("Base64后文件大小：" + (readerResult.length / 1024).toFixed(3) + 'k');
            var img = new Image();
            img.onload = function () {

                if (file.type != "image/gif" && img.width > max_width) {

                    var imgWidth = max_width;
                    var imgHeight = parseInt(img.height * (max_width / img.width));

                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    canvas.width = imgWidth;
                    canvas.height = imgHeight;
                    ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
                    readerResult = canvas.toDataURL("image/jpeg");
                    console.log("缩略后文件大小：" + (readerResult.length / 1024).toFixed(3) + 'k');

                }

                if (upload) {
                    loading.show();
                    $.ajax({
                        url: "/mch/upload.ashx",
                        type: 'POST',
                        data: readerResult,
                        processData: false,
                        contentType: false,
                        success: function (responseStr) {
                            loading.hide();
                            var ret = $.parseJSON(responseStr);
                            callback(ret);
                        },
                        error: function (responseStr) {
                            loading.hide();
                            callback({ state: 0, message: responseStr });
                        }
                    });
                }

                if (typeof (preview) == "function") {
                    var blobUrl = createObjectURL(file);
                    if (blobUrl != null) {
                        preview(blobUrl);
                    }
                    else {
                        preview(readerResult);
                    }
                }

            };
            img.src = readerResult;

        }

    }

    var s = '<div id="divHidFileUpload" style="display:none;"><input type="file" id="hidFileUpload"/></div>';
    $(document.body).append(s);

    var fileInput = document.getElementById("hidFileUpload");
    if (fileInput.attachEvent)
        fileInput.onpropertychange = readFile;
    else
        fileInput.addEventListener("change", readFile, false);

    fileInput.click();
    window.setTimeout(function () {
        document.body.removeChild(document.getElementById('divHidFileUpload'));
    }, 500);
}

/** 分享到朋友圈　**/
function ShareTimeline(title, desc, link, imgUrl) {

    wx.onMenuShareTimeline({
        title: desc,
        link: link,
        imgUrl: imgUrl,
        success: function () {
        },
        cancel: function () {
        }
    });

}

/** 分享给朋友 **/
function ShareAppMessage(title, desc, link, imgUrl) {
    wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        type: 'link',
        dataUrl: '',
        success: function () {
        },
        cancel: function () {
        }
    });
}

/** 分享到QQ **/
function ShareQQ(title, desc, link, imgUrl) {
    wx.onMenuShareQQ({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function () {
        },
        cancel: function () {
        }
    });
}

$(function () {
    window.setTimeout(function () {

        if (typeof (wx) != "undefined") {

            var currentUrl = window.location.href.split('#')[0];
            post("/api/jsinterface.asmx/WxConfig", { url: currentUrl, rt: Math.random() }, function (config) {

                wx.config({
                    debug: false,
                    appId: config.appId,
                    timestamp: config.timestamp,
                    nonceStr: config.nonceStr,
                    signature: config.signature,
                    jsApiList: ['checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'getNetworkType',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'closeWindow',
                        'scanQRCode',
                        'chooseWXPay',
                        'getLocation',
                        'openLocation'
                    ]
                });

            });

            wx.ready(function () {

                if (typeof (shareData) != "undefined") {
                    ConfigShare(shareData);
                }

            });

            wx.error(function (res) {
            });

        }

    }, 0);
});

/** 配置分享 **/
function ConfigShare(shareData) {

    ShareTimeline(shareData.title, shareData.desc, shareData.link, shareData.imgUrl);
    ShareAppMessage(shareData.title, shareData.desc, shareData.link, shareData.imgUrl);
    ShareQQ(shareData.title, shareData.desc, shareData.link, shareData.imgUrl);

}

// 选择图片
function chooseImage(count,callback) {

    wx.chooseImage({
        count:count,
        success: function (res) {
            if (res.localIds.length > 0) {
                uploadImage(res.localIds, callback);
            }
        },
        fail: function (res) {
            gm.alert(JSON.stringify(res));
        }
    });

}

// 上传图片
function uploadImage(localIds,callback) {
    
    var uploadLocalIds = [];
    function upload() {

        var localId = localIds.shift();

        if (typeof (localId) == "undefined") {
            callback(uploadLocalIds);
            return;
        }

        wx.uploadImage({
            localId: localId, 
            isShowProgressTips: 1, 
            success: function (res) {
                var serverId = res.serverId; 
                uploadLocalIds.push({ localId: localId, serverId: serverId });
                window.setTimeout(upload, 200);
            },
            fail: function (res) {
                window.setTimeout(upload, 200);
            }
        });
    }

    upload();

}

// 开始录音
window.isRecording = false;
function startRecord(startRecordCallback, stopRecordCallback, uploadVoiceCallback) {

    if (window.isRecording) {
        return;
    }
    window.isRecording = true;

    wx.startRecord({
        success: function (res) {

            // 59秒停止录音
            window.RecordHandler = window.setInterval(function () {
                stopRecord(stopRecordCallback, uploadVoiceCallback);
            }, 59 * 1000);

            // 记录开始录音时间
            window.startRecordTime = new Date();

            // 回调
            startRecordCallback(true, res);
        },
        fail: function (res) {

            // 允许再次点击开始录间
            window.isRecording = false;

            // 回调
            startRecordCallback(false, res);
        }
    });
}

// 停止录音
function stopRecord(stopRecordCallback, uploadVoiceCallback) {

    window.clearInterval(window.RecordHandler);

    wx.stopRecord({
        success: function (res) {

            window.isRecording = false;

            var localId = res.localId;
            var ts = new Date() - window.startRecordTime;
            ts = parseInt(ts / 1000);

            // 回调
            stopRecordCallback(true, res, ts);

            // 上传
            uploadVoice(localId, ts, uploadVoiceCallback);
        },
        fail: function (res) {
            
            // 录制时间太短,会停止失败
            window.setTimeout(function () { stopRecord(callback); }, 200);

        }
    });
}

// 上传录音
function uploadVoice(localId, ts, callback) {

    wx.uploadVoice({
        localId: localId, 
        isShowProgressTips: 1, 
        success: function (res) {
            var serverId = res.serverId;
            callback(true,localId, serverId, ts, res);
        },
        fail: function (res) {
            callback(false,localId, null, ts, res);
        }
    });

}
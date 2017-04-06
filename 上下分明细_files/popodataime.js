/**
 * Created by popo on 2016/11/24 10:20
 */
var style = 'body,.popodatetime ul,.popodatetime p{margin:0;padding:0;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.popodatetime .hidden{display:none}.popodatetime{position:fixed;top:0;left:0;width:100%;height:100%;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:18px;color:#000;z-index:999999}.popodatetime .p-cover{position:absolute;height:100%;width:100%;background:rgba(0,0,0,.6);animation:fadeIn ease .2s both;-webkit-animation:fadeIn ease .2s both;z-index:0}.popodatetime .p-box{position:absolute;top:0;left:0;width:100%;height:100%;display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}.popodatetime .p-main{position:relative;margin:0 auto;padding:0 15px;max-width:400px;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;animation:fadeIn ease .2s both;-webkit-animation:fadeIn ease .2s both;z-index:1}.popodatetime.close .p-cover{animation:fadeOut ease .2s both;-webkit-animation:fadeOut ease .2s both}.popodatetime.close .p-main{animation:fadeOut ease .2s both;-webkit-animation:fadeOut ease .2s both}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}.popodatetime .p-main .p-scroll{position:relative;align-items:center;overflow:hidden}.popodatetime .p-main .p-scroll:before{content:"";position:absolute;z-index:0;top:50px;left:0;width:100%;height:50px;background:#f1f1f1;pointer-events:none}.popodatetime .p-main .p-scroll:after{position:absolute;left:0;top:0;width:200%;height:200%;content:"";border:solid 1px #ddd;transform:scale(.5);-webkit-transform:scale(.5);transform-origin:0 0;-webkit-transform-origin:0 0;pointer-events:none}.popodatetime .p-main .p-datetime{background:#fff;overflow:hidden;border-radius:3px;box-shadow:0 0 5px rgba(0,0,0,.3)}.popodatetime .p-main .p-result{text-align:center;height:50px;line-height:50px;box-shadow:0 0 10px rgba(0,0,0,.2)}.popodatetime .p-main .p-title{overflow:hidden}.popodatetime .p-main .p-title li{position:relative;width:20%;margin:10px 0;color:#999;text-align:center;list-style-type:none;float:left}.popodatetime .p-main .p-container{position:relative;z-index:1;width:20%;height:150px;float:left;overflow:hidden}.popodatetime .p-main .p-container:nth-child(4):after{position:absolute;left:0;top:0;width:1px;height:100%;content:"";border-right:solid 1px #ddd;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.popodatetime .p-wrapper{-webkit-transition-timing-function:ease-out}.popodatetime .p-wrapper>div{text-align:center;height:50px;line-height:50px;font-family:"Arial";cursor:pointer}.popodatetime .p-button{position:relative;line-height:42px;font-size:18px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.popodatetime .p-button:after{content:"";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.popodatetime .p-button a{position:relative;display:block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;text-align:center;color:#000;text-decoration:none}.popodatetime .p-button a.confirm{color:#10aeff;}.popodatetime .p-button a.clear{color:#E64340;}.popodatetime .p-button a:after{content:" ";position:absolute;left:0;top:0;width:1px;height:100%;border-left:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.popodatetime .p-main.onlydate .p-title li,.popodatetime .p-main.onlydate .p-container{width:33.333333%}.popodatetime .p-main.onlytime .p-title li,.popodatetime .p-main.onlytime .p-container{width:50%}.popodatetime .p-main.onlyhour .p-title li,.popodatetime .p-main.onlyhour .p-container{width:25%}.popodatetime .p-top .p-main,.popodatetime .p-bottom .p-main{position:absolute;top:0;left:0;margin:0;padding:0;width:100%;border-radius:0}.popodatetime .p-bottom .p-main{top:auto;bottom:0}.popodatetime .p-inline .p-main{margin:0;padding:0}.';
document.write('<div class="hidden"><style>' + style + '</style></div>');
(function ($) {
    $.fn.popodatetime = function (options) {
        var settings = $.extend({
                date: true, //只显示日期
                time: true, //只显示时间
                onlymonth: false,//只显示到月份
                onlyhour: false,//只显示到小时
                interval: 1, //分钟间隔
                timeloop: true,//时间循环
                container: "body", //控件容器
                display: "bottom", //容器位置默认居中 上为top,下为bottom
                result: true, //显示结果栏目
                title: true,   //显示标题
                clear: false   //清空
            },
            options);

        return this.each(function () {
            var $this = $(this);
            $this.attr("readonly", true);

            function runDateTime() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var minute = date.getMinutes();

                var beginyear = year - 100;
                var endyear = year + 100;

                //判断闰年
                function isLeapYear(year) {
                    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                        return true;
                    } else {
                        return false;
                    }
                }

                //年
                function yearStr() {
                    var str = "";
                    for (var i = beginyear; i <= endyear; i++) {
                        str += '<div>' + i + '</div>';
                    }
                    return str;
                }

                //月
                function monthStr() {
                    var str = "";
                    for (var i = 1; i <= 12; i++) {
                        if (i < 10) {
                            i = "0" + i;
                        }
                        str += '<div>' + i + '</div>'
                    }
                    return str;
                }

                //日
                function dayStr() {
                    var str = "";
                    for (var i = 1; i <= 31; i++) {
                        if (i < 10) {
                            i = "0" + i;
                        }
                        str += '<div>' + i + '</div>'
                    }
                    return str;
                }

                //时
                function hourStr() {
                    var str = "";
                    for (var i = 0; i <= 23; i++) {
                        if (i < 10) {
                            i = "0" + i;
                        }
                        str += '<div>' + i + '</div>'
                    }
                    if (settings.timeloop) {
                        str = '<div>23</div>' + str + '<div>00</div><div>01</div>';
                    }
                    return str;
                }

                //分
                function minuteStr() {
                    var str = "";
                    for (var i = 0; i < parseInt(60 / settings.interval); i++) {
                        var c = i * settings.interval;
                        if (c < 10) {
                            c = "0" + c;
                        }
                        str += '<div>' + c + '</div>';
                    }
                    if (settings.timeloop) {
                        str = '<div>59</div>' + str + '<div>00</div><div>01</div>';
                    }
                    return str;
                }

                //判断是否PC端
                function isPC() {
                    var userAgentInfo = navigator.userAgent;
                    var Agents = new Array("Android", "iPhone", "iPad", "iPod");
                    var flag = true;
                    for (var i = 0; i < Agents.length; i++) {
                        if (userAgentInfo.indexOf(Agents[i]) > 0) {
                            flag = false;
                            break;
                        }
                    }
                    return flag;
                }

                //添加字符到滚动栏
                $(".p-year .p-wrapper").html(yearStr());
                $(".p-month .p-wrapper").html(monthStr());
                $(".p-day .p-wrapper").html(dayStr());
                $(".p-hour .p-wrapper").html(hourStr());
                $(".p-minute .p-wrapper").html(minuteStr());

                //触摸事件
                function popoTouche(el) {
                    var startY = 0,
                        endY = 0,
                        moveY = 0,
                        scrollY = 0,
                        startTime = 0,
                        speed = 0.3,
                        m = 0,
                        endTime = 0;
                    var h1 = $(el).find(".p-wrapper").height();
                    var h2 = h1 / $(el).find(".p-wrapper>div").length;

                    //判断是时
                    function isTime() {
                        var h = $(el).attr("class").indexOf("p-hour") != -1;
                        var m = $(el).attr("class").indexOf("p-minute") != -1
                        if (h || m) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    //触摸开始
                    function touchStart(ev) {
                        if (!isPC()) {
                            ev.preventDefault();
                            startY = ev.touches[0].pageY
                        } else {
                            var e = event || window.event;
                            startY = e.clientY
                        }
                        startTime = new Date();
                    }

                    //触摸移动
                    function touchMove(ev) {
                        if (!isPC()) {
                            ev.preventDefault();
                            endY = ev.touches[0].pageY
                        } else {
                            var e = event || window.event;
                            endY = e.clientY;
                        }
                        moveY = endY - startY;

                        //循环滚动时间
                        if (settings.timeloop && isTime() == true) {
                            if ((scrollY + moveY) > 0) {
                                moveY = -(h1 - h2 * 3) + moveY
                            }
                            if ((scrollY + moveY) < -(h1 - h2 * 3)) {
                                scrollY = -moveY;
                            }
                        }
                        //滚动
                        $(el).children().css({
                            "-webkit-transition-duration": "0ms",
                            "-webkit-transform": "translate3d(0," + (scrollY + moveY) + "px, 0)"
                        });
                    }

                    //触摸结束&取消
                    function touchEnd(ev) {
                        if (!isPC()) {
                            ev.preventDefault();
                        }

                        //模拟惯性
                        endTime = new Date();
                        var interval = endTime - startTime;
                        if (interval < 300) {
                            speed = Math.abs(moveY / interval);
                            moveY = (speed * speed) / 0.0012;
                            if (endY - startY < 0) {
                                moveY = -moveY;
                            }
                        }
                        scrollY += moveY;
                        moveY = 0;

                        //滚动到指定位置算法
                        scrollPosition();

                        //根据大小月、平闰年判断日期长度
                        bigSmallMonth();

                        //获取结果
                        setTimeout(function () {
                            getResult();
                        }, speed * 1000);

                    }

                    //根据大小月、平闰年判断日期长度
                    function bigSmallMonth() {
                        var year = $(".p-year .active").text();
                        var month = $(".p-month .active").text();
                        var obj = $(".p-day>.p-wrapper>div");

                        if (month == 04 || month == 06 || month == 09 || month == 11) {
                            obj.eq(-1).addClass("hidden");
                        } else if (month == 2) {
                            //判断平年闰年
                            obj.removeClass("hidden");
                            if (isLeapYear(year)) {
                                obj.eq(-1).addClass("hidden");
                                obj.eq(-2).addClass("hidden");
                            } else {
                                obj.eq(-1).addClass("hidden");
                                obj.eq(-2).addClass("hidden");
                                obj.eq(-3).addClass("hidden");
                            }
                        } else {
                            obj.removeClass("hidden");
                        }
                    }

                    //滚动到指定位置算法
                    function scrollPosition() {
                        h1 = $(el).find(".p-wrapper").height();
                        //控制滚动均分

                        //滚动高度除以单个高度的余数
                        var d = Math.abs(scrollY) % h2;
                        if (scrollY > 0) {
                            if (d > h2 / 2) {
                                m = scrollY - d + h2;
                            } else {
                                m = scrollY - d;
                            }
                            if (scrollY > h2) {
                                speed = 0.3;
                                m = h2;
                            }
                        } else {
                            if (d > h2 / 2) {
                                m = scrollY + d - h2;
                            } else {
                                m = scrollY + d;
                            }
                            if (scrollY < -h1 + (h2 * 2)) {
                                speed = 0.3;
                                m = -h1 + (h2 * 2);
                            }
                        }

                        //循环滚动时间
                        if (settings.timeloop && isTime() == true) {
                            if (m > 0) {
                                m = -(h1 - h2 * 3)
                            }
                            if (m < -(h1 - h2 * 3)) {
                                m = 0;
                            }
                        }

                        //滚动到指定位置
                        $(el).children().css({
                            "-webkit-transition": "-webkit-transform " + speed + "s ease-out",
                            "-webkit-transform": "translate3d(0," + m + "px, 0)"
                        });

                        //选中的数字添加active类
                        $(el).find(".p-wrapper>div").removeClass("active");
                        var p = m / h2;
                        if (p <= 0) {
                            $(el).find(".p-wrapper>div").eq(-p + 1).addClass("active");
                        } else if (p > 0) {
                            $(el).find(".p-wrapper>div").eq(p - 1).addClass("active");
                        }
                        scrollY = m;
                    }

                    //判断PC移动端 选择指定方法
                    if (!isPC()) {
                        $(el)[0].addEventListener('touchstart', touchStart, false);
                        $(el)[0].addEventListener('touchmove', touchMove, false);
                        $(el)[0].addEventListener('touchend', touchEnd, false);
                        $(el)[0].addEventListener('touchcancel', touchEnd, false);
                        $(".p-scroll")[0].addEventListener('touchend', scrollPosition, false);
                    } else {
                        $(el)[0].onmousedown = function () {
                            touchStart();
                            document.onmousemove = function () {
                                touchMove();
                            };
                            document.onmouseup = function () {
                                document.onmousemove = null;
                                touchEnd();
                                document.onmouseup = null;
                            };
                            document.ondragstart = function () {
                                return false;
                            }
                        }
                    }

                    //滚动到指定位置
                    function scrollTo(el, num, speed) {
                        el.children().children().removeClass("active");
                        var h = el.children().find("div").height();
                        for (var i = 0; i < el.children().find("div").length; i++) {
                            if (el.children().find("div").eq(i).text() == num) {
                                var m = -h * (i - 1);
                                el.children().find("div").eq(i).addClass("active");
                                el.children().css({
                                    "-webkit-transition-duration": speed + "s",
                                    "-webkit-transform": "translate3d(0," + m + "px, 0)"
                                });
                                scrollY = m;
                                break;
                            }
                        }
                    }

                    var elStr = new Array(year, month, day, hour, minute);
                    var elBox = new Array("p-year", "p-month", "p-day", "p-hour", "p-minute");
                    if (settings.interval != 0) {
                        if (minute % settings.interval >= settings.interval / 2) {
                            minute = minute - (minute % settings.interval) + settings.interval;
                        } else {
                            minute = minute - (minute % settings.interval);
                        }
                    }
                    for (var i = 0; i < elStr.length; i++) {
                        if ($(el).attr("class").indexOf(elBox[i]) != -1) {
                            scrollTo($(el), elStr[i]);
                        }
                    }

                    if (settings.timeloop && isTime() == true) {
                        var phour = $(".p-hour .active").text();
                        var pminute = $(".p-minute .active").text();
                        if (phour == 23) {
                            scrollY = -(h1 - h2 * 4);
                            $(el).children().css({
                                "-webkit-transition-duration": "0ms",
                                "-webkit-transform": "translate3d(0," + scrollY + "px, 0)"
                            })
                        }
                        if (pminute == 59) {
                            scrollY = 0;
                            $(el).children().css({
                                "-webkit-transition-duration": "0ms",
                                "-webkit-transform": "translate3d(0," + scrollY + "px, 0)"
                            })
                        }

                    }
                }

                //如果已经选择了日期时间则下次打开滚动到已选时间
                if ($this.val() != "" && escape($this.val()).indexOf("%u") < 0) {
                    var str = String($this.val());
                    str = str.match(/\d+/g);
                    if (settings.date == false || settings.time == false) {
                        year = str[0];
                        month = str[1];
                        day = str[2];
                        hour = str[0];
                        minute = str[1];
                    } else {
                        year = str[0];
                        month = str[1];
                        day = str[2];
                        hour = str[3];
                        minute = str[4];
                    }
                    ;

                    var elStr = new Array(year, month, day, hour, minute);
                    var elBox = new Array("p-year", "p-month", "p-day", "p-hour", "p-minute");
                    for (var i = 0; i < elStr.length; i++) {
                        scrollTo($("." + elBox[i]), elStr[i]);
                    }
                }

                //遍历触摸方法
                $(".p-container").each(function () {
                    popoTouche($(this));
                });

                //获取结果
                function getResult() {
                    var year = $(".p-year .active").text();
                    var month = $(".p-month .active").text();
                    var day = $(".p-day .active").text();
                    var hour = $(".p-hour .active").text();
                    var minute = $(".p-minute .active").text();
                    $(".popodatetime .p-result").html(year + "年" + month + "月" + day + "日&nbsp;" + hour + "时" + minute + "分");
                    $(".popodatetime .p-result").attr("data-value", year + "-" + month + "-" + day + " " + hour + ":" + minute)
                    if (!settings.date) {
                        $(".popodatetime .p-result").html(hour + "时" + minute + "分");
                        $(".popodatetime .p-result").attr("data-value", hour + ":" + minute)
                    }
                    if (!settings.time) {
                        $(".popodatetime .p-result").html(year + "年" + month + "月" + day + "日");
                        $(".popodatetime .p-result").attr("data-value", year + "-" + month + "-" + day)
                    }
                    if (settings.onlymonth) {
                        $(".popodatetime .p-result").html(year + "年" + month + "月");
                        $(".popodatetime .p-result").attr("data-value", year + "-" + month)
                    }
                    if (settings.onlyhour) {
                        $(".popodatetime .p-result").html(year + "年" + month + "月" + day + "日&nbsp;" + hour + "时");
                        $(".popodatetime .p-result").attr("data-value", year + "-" + month + "-" + day + " " + hour + ":00")
                    }
                }

                //显示结果
                getResult(year, month, day, hour, minute);
            }

            function datetimeStr() {
                var str = '';
                var dateTitStr = "",
                    dateStr = "";
                var timeTitStr = "",
                    timeStr = "";

                //日期标题
                dateTitStr += '<li>年</li>';
                dateTitStr += '<li>月</li>';
                if (!settings.onlymonth) {
                    dateTitStr += '<li>日</li>';
                }

                //时间标题
                timeTitStr += '<li>时</li>';
                if (!settings.onlyhour) {
                    timeTitStr += '<li>分</li>';
                }

                //日期主体
                dateStr += '<div class="p-container p-year"><div class="p-wrapper"></div></div>';
                dateStr += '<div class="p-container p-month"><div class="p-wrapper"></div></div>';
                if (!settings.onlymonth) {
                    dateStr += '<div class="p-container p-day"><div class="p-wrapper"></div></div>';
                }

                //时间主体
                timeStr += '<div class="p-container p-hour"><div class="p-wrapper"></div></div>';
                if (!settings.onlyhour) {
                    timeStr += '<div class="p-container p-minute"><div class="p-wrapper"></div></div>';
                }

                //判断初始化参数需要哪一部分控件
                if (settings.date == false) {
                    dateTitStr = "";
                    dateStr = "";
                }
                if (settings.time == false) {
                    timeTitStr = "";
                    timeStr = "";
                }

                str += '<div class="popodatetime">';
                str += '<div  class="p-box">';
                str += '<div  class="p-main">';
                str += '<div class="p-datetime">';
                str += '<div class="p-result"></div>';
                str += '<ul class="p-title">';
                str += dateTitStr;
                str += timeTitStr;
                str += '</ul>';
                str += '<div class="p-scroll">';
                str += dateStr;
                str += timeStr;
                str += '</div>';
                str += '<div class="p-button">';
                str += '<a href="javascript:void(0)" class="cancel">取消</a>';

                //清除
                if (settings.clear) {
                    str += '<a href="javascript:void(0)" class="clear">清除</a>';
                }

                str += '<a href="javascript:void(0)" class="confirm">确定</a>';
                str += '</div>';
                str += '</div>';
                str += '</div>';
                str += '</div>';
                str += '<div class="p-cover">';
                str += '</div>';
                return str;
            }

            function hideDatetime() {
                $(".popodatetime").addClass("close");
                var t = setInterval(function () {
                    $(".popodatetime").remove();
                    t = clearInterval(t)
                }, 500);
            }

            //触发控件
            $this.click(function () {
                if (!settings.date && !settings.time) {
                    alert("错误：date和time不能同时为false,必须存在一个!")
                } else {
                    $(settings.container).append(datetimeStr());
                    runDateTime();
                }
                if (settings.time == false) {
                    $(".popodatetime .p-main").addClass("onlydate");
                    if (settings.onlymonth) {
                        $(".popodatetime .p-main").removeClass("onlydate").addClass("onlytime");
                        ;
                    }
                }
                if (settings.onlyhour) {
                    $(".popodatetime .p-main").addClass("onlyhour");
                    ;
                }
                if (settings.date == false) {
                    $(".popodatetime .p-main").addClass("onlytime");
                }
                if (settings.result == false) {
                    $(".popodatetime .p-result").addClass("hidden");
                }
                if (settings.title == false) {
                    $(".popodatetime .p-title").addClass("hidden");
                }
                $(".p-cover,.p-button .cancel").click(function () {
                    hideDatetime();
                });
                $(".p-cover,.p-button .clear").click(function () {
                    $this.val("");
                    hideDatetime();
                });
                $(".p-button .confirm").click(function () {
                    $this.val($(".p-result").attr("data-value"));
                    hideDatetime();
                });
            });
        });

    };
})(jQuery);

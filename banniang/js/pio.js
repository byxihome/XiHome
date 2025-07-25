/* ----
# Pio Plugin
# By: Dreamer-Paul
# Last Update: 2021.3.3

一个支持更换 Live2D 模型的 Typecho 插件。
---- */

var Paul_Pio = function (prop) {
    var that = this;

    var current = {
        idol: 0,
        menu: document.querySelector(".pio-container .pio-action"),
        canvas: document.getElementById("pio"),
        body: document.querySelector(".pio-container"),
        root: document.location.protocol +'//' + document.location.hostname +'/'
    };

    /* - 方法 */
    var modules = {
        // 更换模型

        idol: function () {
            current.idol < (prop.model.length - 1) ? current.idol++ : current.idol = 0;
            return current.idol;
        },
        // 创建内容
        create: function (tag, prop) {
            var e = document.createElement(tag);
            if(prop.class) e.className = prop.class;
            return e;
        },
        // 随机内容
        rand: function (arr) {
            return arr[Math.floor(Math.random() * (arr.length - 1))];
        },
        // 创建对话框方法
        render: function (text) {
            if(text.constructor === Array){
                dialog.innerText = modules.rand(text);
            }
            else if(text.constructor === String){
                dialog.innerText = text;
            }
            dialog.classList.add("active");
            clearTimeout(this.t);
            this.t = setTimeout(function () {
                dialog.classList.remove("active");
            }, 5000);
        },
        // 移除方法
        destroy: function () {
            that.initHidden();
            localStorage.setItem("posterGirl", 0);
        },
        // 是否为移动设备
        isMobile: function () {
            return window.innerWidth < 0;
        }
    };
    this.destroy = modules.destroy;

    var elements = {
        skin: modules.create("span", {class: "pio-skin"}),
        show: modules.create("div", {class: "pio-show"})
    };

    var dialog = modules.create("div", {class: "pio-dialog"});
    current.body.appendChild(dialog);
    current.body.appendChild(elements.show);

    /* - 提示操作 */
        var action = {
        // 欢迎
         welcome: function () {
            if(document.referrer !== "" && document.referrer.indexOf(current.root) === -1){
                var referrer = document.createElement('a');
                referrer.href = document.referrer;
                prop.content.referer ? modules.render(prop.content.referer.replace(/%t/, "“" + referrer.hostname + "”")) : modules.render("欢迎来自 “" + referrer.hostname + "” 的朋友！");
            }

            else if(prop.tips){
                var text, hour = new Date().getHours();

                if (hour > 22 || hour <= 5) {
                    text = '夜猫子上线啦？这么晚还没睡，明天能起来不啦？';
                }
                else if (hour > 5 && hour <= 8) {
                    text = '早上好！';
                }
                else if (hour > 8 && hour <= 11) {
                    text = '午安哦！活儿干得还顺心吗，别久坐啦，多走动走动呀！';
                }
                else if (hour > 11 && hour <= 14) {
                    text = '中午咯！工作一上午，快去享用午餐吧！';
                }
                else if (hour > 14 && hour <= 17) {
                    text = '下午好容易昏昏欲睡，运动目标完成没呀？';
                }
                else if (hour > 17 && hour <= 19) {
                    text = '傍晚啦！窗外夕阳好漂亮，真是最美不过夕阳红呢～';
                }
                else if (hour > 19 && hour <= 21) {
                    text = '晚上好呀！今天过得还不错吧？';
                }
                else if (hour > 21 && hour <= 23) {
                    text = '都这么晚啦，早点歇息吧，晚安哦～';
                }
                else{
                    text = "这个是无法被触发的吧，哈哈";
                }
                modules.render(text);
            }
            else{
                modules.render(prop.content.welcome || "欢迎来到本站！");
            }
        },
        // 触摸
        touch: function () {
            current.canvas.onclick = function () {
                var messages = [
                    "哥哥～你碰我啦，心里像揣了跳跳糖，噼里啪啦甜到冒小花花",
                    "哎呀呀，你摸我的瞬间，耳朵都要变成粉粉的小樱桃啦，好害羞嘛",
                    "别、别碰呀～小尾巴都要因为你摇成小弹簧啦，怦怦跳的嘞",
                    "哇！你这样轻轻戳，我的小魔法都要变成糖霜，粘在你手上咯",
                    "哼，再摸我，我、我就把藏的小星星都塞进你口袋，赖着你不走啦",
                    "呀！你碰到我的小翅膀啦，它们都要扑棱棱长出棉花糖，把你缠住哟",
                    "哥哥手好暖呀，碰一下，我的小脸蛋都要变成小太阳，烫烫的呢",
                    "别欺负我这小布偶呀，你摸一摸，我缝的小心心都要蹦出来找你啦",
                    "哇唔～你指尖碰到我的瞬间，藏在头发里的小彩虹都要飘出来黏你啦",
                    "你这样轻轻碰，我的小铃铛都要叮铃铃响，把喜欢都抖落在你身边啦"
                ];
                var randomMsg = messages[Math.floor(Math.random() * messages.length)];
                $(".pio-dialog").text(randomMsg).addClass("active");
                if (window.pioDialogTimer) clearTimeout(window.pioDialogTimer);
                window.pioDialogTimer = setTimeout(function () {
                    $(".pio-dialog").removeClass("active");
                }, 5000);
            };
        },
        // 右侧按钮
         buttons: function () {


             // 更换模型
             elements.skin.onclick = function () {
                 current.canvas.style.opacity = 0;
                 var onFadeOut = function() {
                     current.canvas.removeEventListener('transitionend', onFadeOut);
                     loadlive2d("pio", prop.model[modules.idol()]);
                     current.canvas.style.opacity = 0;
                     setTimeout(function() {
                         current.canvas.style.opacity = 1;
                     }, 500); // Assume load takes less than 500ms
                 };
                 current.canvas.addEventListener('transitionend', onFadeOut);

                 var messages = [
                    "新衣服好仙！",
                    "这新衣裳好甜！",
                    "新衣服超美！",
                    "这新衣裳好绝！",
                    "新衣服好乖！",
                    "这新衣裳好萌！",
                    "这新衣裳太赞！",
                    "新衣服好飒！",
                    "这新衣裳好衬！",
                    "新衣服好靓！",
                    "这新衣裳好美！"
                    
                ];
                var randomMsg = messages[Math.floor(Math.random() * messages.length)];
                $(".pio-dialog").text(randomMsg).addClass("active");
                if (window.pioDialogTimer) clearTimeout(window.pioDialogTimer);
                window.pioDialogTimer = setTimeout(function () {
                    $(".pio-dialog").removeClass("active");
                }, 5000);
            

                };
             elements.skin.onmouseover = function () {

        var messages = [
                    "看看我的新衣服嘛～",
                    "我的新衣裳，你要不要瞅一眼呀～",
                    "新衣服到咯，快来看看好不好看嘛～",
                    "人家的新衣服，你要不要瞧瞧呀～",
                    "我的新衣裳哟，来看看嘛～",
                    "看我这件新衣服好不好看呀～",
                    "新衣服呢，过来瞅一眼嘛～",
                    "我的新衣裳，帮我看看呀～",
                    "新衣服来啦，看看好不好看嘛～",
                    "来看看我的新衣服好不好呀～",
                    
                ];
                var randomMsg = messages[Math.floor(Math.random() * messages.length)];
                $(".pio-dialog").text(randomMsg).addClass("active");
                if (window.pioDialogTimer) clearTimeout(window.pioDialogTimer);
                window.pioDialogTimer = setTimeout(function () {
                    $(".pio-dialog").removeClass("active");
                }, 5000);
             };
             if(prop.model.length > 1) current.menu.appendChild(elements.skin);

         },

        
    };

    /* - 运行 */
    var begin = {
        static: function () {
            current.body.classList.add("static");
        },
        fixed: function () {
            action.touch(); action.buttons();
        },
        draggable: function () {
            action.touch(); action.buttons();

            var body = current.body;
            body.onmousedown = function (downEvent) {
                var location = {
                    x: downEvent.clientX - this.offsetLeft,
                    y: downEvent.clientY - this.offsetTop
                };

                function move(moveEvent) {
                    body.classList.add("active");
                    body.classList.remove("right");
                    body.style.left = (moveEvent.clientX - location.x) + 'px';
                    body.style.top  = (moveEvent.clientY - location.y) + 'px';
                    body.style.bottom = "auto";
                }

                document.addEventListener("mousemove", move);
                document.addEventListener("mouseup", function () {
                    body.classList.remove("active");
                    document.removeEventListener("mousemove", move);
                });
            };
        }
    };

    




    // 运行
    this.init = function (onlyText) {
        if(!(prop.hidden&& modules.isMobile())){
            if(!onlyText){
                action.welcome();
                loadlive2d("pio", prop.model[Math.floor(Math.random()*(prop.model.length))]);
            }
            current.body.classList.remove("hidden"); 
            switch (prop.mode){
                case "static": begin.static(); break;
                case "fixed":  begin.fixed(); break;
                case "draggable": begin.draggable(); break;
            }

            if(prop.content.custom) action.custom();
        }
    };




    // 隐藏状态
    this.initHidden = function () {
        current.body.classList.add("hidden");
        dialog.classList.remove("active");

        elements.show.onclick = function () {
            current.body.classList.remove("hidden");
            localStorage.setItem("posterGirl", 1);
            that.init();
        }
    }

    localStorage.getItem("posterGirl") == 0 ? this.initHidden() : this.init();



};

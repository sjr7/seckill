/**
 *  模块化javaScript
 * Created by jianrongsun on 17-5-25.
 */
var seckill = {
    // 封装秒杀相关的ajax的url
    URL: {
        now: function () {
            return "/seckill/time/now";
        },
        exposer: function (seckillId) {
            return "/seckill/" + seckillId + "/exposer";
        },
        execution: function (seckillId, md5) {
            return "/seckill/" + seckillId + "/" + md5 + "/execution";
        }
    },
    // 验证手机号码
    validatePhone: function (phone) {
        return !!(phone && phone.length === 11 && !isNaN(phone));
    },
    // 详情页秒杀业务逻辑
    detail: {
        // 详情页开始初始化
        init: function (params) {
            console.log("获取手机号码");
            // 手机号验证登录，计时交互
            var userPhone = $.cookie('userPhone');
            // 验证手机号
            if (!seckill.validatePhone(userPhone)) {
                console.log("未填写手机号码");
                // 验证手机控制输出
                var killPhoneModal = $("#killPhoneModal");
                killPhoneModal.modal({
                    show: true,  // 显示弹出层
                    backdrop: 'static',  // 静止位置关闭
                    keyboard: false    // 关闭键盘事件
                });

                $("#killPhoneBtn").click(function () {
                    console.log("提交手机号码按钮被点击");
                    var inputPhone = $("#killPhoneKey").val();
                    console.log("inputPhone" + inputPhone);
                    if (seckill.validatePhone(inputPhone)) {
                        // 把电话写入cookie
                        $.cookie('userPhone', inputPhone, {expires: 7, path: '/seckill'});
                        // 验证通过 刷新页面
                        window.location.reload();
                    } else {
                        // todo 错误文案信息写到前端
                        $("#killPhoneMessage").hide().html("<label class='label label-danger'>手机号码错误</label>").show(300);
                    }
                });
            } else {
                console.log("在cookie中找到了电话号码，开启计时");
                // 已经登录了就开始计时交互
                var startTime = params['startTime'];
                var endTime = params['endTime'];
                var seckillId = params['seckillId'];
                console.log("开始秒杀时间=======" + startTime);
                console.log("结束秒杀时间========" + endTime);
                $.get(seckill.URL.now(), {}, function (result) {
                    if (result && result['success']) {
                        var nowTime = seckill.convertTime(result['data']);
                        console.log("服务器当前的时间==========" + nowTime);
                        // 进行秒杀商品的时间判断，然后计时交互
                        seckill.countDown(seckillId, nowTime, startTime, endTime);
                    } else {
                        console.log('结果:' + result);
                        console.log('result' + result);
                    }
                });
            }

        }
    },
    handlerSeckill: function (seckillId, mode) {
        // 获取秒杀地址
        mode.hide().html('<button class="btn btn-primary btn-lg" id="killBtn">开始秒杀</button>');
        console.debug("开始进行秒杀地址获取");
        $.get(seckill.URL.exposer(seckillId), {}, function (result) {
            if (result && result['success']) {
                var exposer = result['data'];
                if (exposer['exposed']) {
                    console.log("有秒杀地址接口");
                    // 开启秒杀，获取秒杀地址
                    var md5 = exposer['md5'];
                    var killUrl = seckill.URL.execution(seckillId, md5);
                    console.log("秒杀的地址为:" + killUrl);
                    // 绑定一次点击事件
                    $("#killBtn").one('click', function () {
                        console.log("开始进行秒杀,按钮被禁用");
                        // 执行秒杀请求，先禁用按钮
                        $(this).addClass("disabled");
                        // 发送秒杀请求
                        $.post(killUrl, {}, function (result) {
                            var killResult = result['data'];
                            var state = killResult['state'];
                            var stateInfo = killResult['stateInfo'];
                            console.log("秒杀状态" + stateInfo);
                            // 显示秒杀结果
                            mode.html('<span class="label label-success">' + stateInfo + '</span>');

                        });

                    });
                    mode.show();
                } else {
                    console.warn("还没有暴露秒杀地址接口,无法进行秒杀");
                    // 未开启秒杀
                    var now = seckill.convertTime(exposer['now']);
                    var start = seckill.convertTime(exposer['start']);
                    var end = seckill.convertTime(exposer['end']);
                    console.log("当前时间" + now);
                    console.log("开始时间" + start);
                    console.log("结束时间" + end);
                    console.log("开始倒计时");
                    console.debug("开始进行倒计时");
                    seckill.countDown(seckillId, now, start, end);
                }
            } else {
                console.error("服务器端查询秒杀商品详情失败");
                console.log('result' + result.valueOf());
            }
        });
    },
    countDown: function (seckillId, nowTime, startTime, endTime) {
        console.log("秒杀的商品ID:" + seckillId + ",服务器当前时间：" + nowTime + ",开始秒杀的时间:" + startTime + ",结束秒杀的时间" + endTime);
        //  获取显示倒计时的文本域
        var seckillBox = $("#seckill-box");
        //  获取时间戳进行时间的比较
        nowTime = new Date(nowTime).valueOf();
        startTime = new Date(startTime).valueOf();
        endTime = new Date(endTime).valueOf();
        console.log("转换后的Date类型当前时间戳" + nowTime);
        console.log("转换后的Date类型开始时间戳" + startTime);
        console.log("转换后的Date类型结束时间戳" + endTime);
        if (nowTime < endTime && nowTime > startTime) {
            // 秒杀开始
            console.log("秒杀可以开始,两个条件符合");
            seckill.handlerSeckill(seckillId, seckillBox);
        }
        else if (nowTime > endTime) {
            alert(nowTime > endTime);
            // console.log(nowTime + ">" + startTime);
            console.log(nowTime + ">" + endTime);

            // 秒杀结束
            console.warn("秒杀已经结束了,当前时间为:" + nowTime + ",秒杀结束时间为" + endTime);
            seckillBox.html("秒杀结束");
        } else {
            console.log("秒杀还没开始");
            alert(nowTime < startTime);
            // 秒杀未开启
            var killTime = new Date(startTime + 1000);
            console.log(killTime);
            console.log("开始计时效果");
            seckillBox.countdown(killTime, function (event) {
                // 事件格式
                var format = event.strftime("秒杀倒计时: %D天 %H时 %M分 %S秒");
                console.log(format);
                seckillBox.html(format);
            }).on('finish.countdown', function () {
                // 事件完成后回调事件，获取秒杀地址，控制业务逻辑
                console.log("准备执行回调,获取秒杀地址,执行秒杀");
                console.log("倒计时结束");
                seckill.handlerSeckill(seckillId, seckillBox);
            });
        }
    },
    cloneZero: function (time) {
        var cloneZero = ":00";
        if (time.length < 6) {
            console.warn("需要拼接时间");
            time = time + cloneZero;
            return time;
        } else {
            console.log("时间是完整的");
            return time;
        }
    },
    convertTime: function (localDateTime) {
        var year = localDateTime.year;
        var monthValue = localDateTime.monthValue;
        var dayOfMonth = localDateTime.dayOfMonth;
        var hour = localDateTime.hour;
        var minute = localDateTime.minute;
        var second = localDateTime.second;
        return year + "-" + monthValue + "-" + dayOfMonth + " " + hour + ":" + minute + ":" + second;
    }
};


















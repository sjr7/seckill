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
            return "/seckill" + seckillId + "/expose";
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
            // 手机号验证登录，计时交互
            var userPhone = $.cookie('userPhone');
            // 验证手机号
            if (!seckill.validatePhone(userPhone)) {
                // 验证手机控制输出
                var killPhoneModal = $("#killPhoneModal");
                killPhoneModal.modal({
                    show: true,  // 显示弹出层
                    backdrop: 'static',  // 静止位置关闭
                    keyboard: false    // 关闭键盘事件
                });

                ("#killPhoneBtn").click(function () {
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
            }
            // 已经登录了就开始计时交互
            var startTime = params['startTime'];
            var endTime = params['endTime'];
            var seckillId = params['seckillId'];
            $.get(seckill.URL.now(), {}, function (result) {
                if (result && result['success']) {
                    var nowTime = result['data'];
                    // 时间判断，计时交互
                    seckill.countdown(seckillId, nowTime, startTime, endTime);
                } else {
                    console.log('result:' + result);
                    alert('result' + result);
                }
            });
        }
    },
    handlerSeckill: function (seckillId, mode) {
        // 获取秒杀地址
        mode.hide().html('<button class="btn btn-primary btn-lg" id="killBtn">开始秒杀</button>')
        $.get(seckill.URL.exposer(seckillId), {}, function (result) {
            if (result && result['success']) {
                var exposer = result['data'];
                if (exposer['exposed']) {
                    // 开启秒杀，获取秒杀地址
                    var md5 = exposer['md5'];
                    var killUrl = seckill.URL.execution(seckillId, md5);
                    console.log("killUrl" + killUrl);
                    // 绑定一次点击事件
                    ("#killBtn").one('click', function () {
                        // 执行秒杀请求，先禁用按钮
                        $(this).addClass("disabled");
                        // 发送秒杀请求
                        $.post(killUrl, {}, function (result) {
                            if (result && result['success']) {
                                var killResult = result['data'];
                                var state = killResult['state'];
                                var stateInfo = killResult['stateInfo'];
                                // 显示秒杀结果
                                mode.html('<span class="label label-success">+stateInfo+</span>');
                            }
                        });

                    });
                    mode.show();
                } else {
                    // 未开启秒杀
                    var now = exposer['now'];
                    var start = exposer['start'];
                    var end = exposer['end'];
                    seckill.countdown(seckillId, now, start, end);
                }
            } else {
                console.log('result' + result);
            }

        });
    },
    countDown: function (seckillId, nowTime, startTime, endTime) {
        console.log(seckillId + "_" + nowTime + "_" + startTime + "_" + endTime);
        var seckillBox = $("#seckill-box");
        if (nowTime > endTime) {
            // 秒杀结束
            seckillBox.html("秒杀结束");
        }
        else if (nowTime < startTime) {
            // 秒杀未开启
            var killTime = new Date(startTime + 1000);
            seckillBox.countdown(killTime, function (event) {
                // 事件格式
                var format = event.startTime("秒杀倒计时: %D天 %H时 %M分 %S秒");
                seckillBox.html(format);
            }).on("finish.countdown", function () {
                // 事件完成后回调事件，获取秒杀地址，控制业务逻辑
                console.log("完成回调");
                seckill.handlerSeckill(seckillId, seckillBox);
            });
        } else {
            // 秒杀开始
            seckill.handlerSeckill(seckillId, seckillBox);
        }
    }
};


















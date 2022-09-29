$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();
    // 点击发送，将文本框内容渲染到dom
    $('#btnSend').on('click',() => {
        // 获取文本框内容
        let text = $('#ipt').val().trim();
        if(text.length <= 0) {
            // 无内容，清空输入框的值
            return $('#ipt').val('');
        }
        // 将文本框内容追加到dom结构中
        $('.talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>'+text+'</span></li>');
        $('#ipt').val('');
        // 重置滚动条
        resetui();
        // 获取聊天信息
        getMsg(text);
    })
    // 空格发送内容
    $('#ipt').on('keyup',(e) => {
        if(e.keyCode === 13) {
            $('#btnSend').click();
        }
    })
    // 获取聊天信息函数
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://ajax-base-api-t.itheima.net:/api/robot',
            data: {
                spoken: text
            },
            success: (res) => {
                if(res.message === 'success') {
                    let backMsg = res.data.info.text;
                    // 将文本框内容追加到dom结构中
                    $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>'+backMsg+'</span></li>');
                    // 重置滚动条
                    resetui();
                    // 聊天信息转为语音
                    getVoice(backMsg);
                }
            }
        })
    }
    // 将聊天信息转为语音函数
    function getVoice(backMsg) {
        $.ajax({
            method: 'GET',
            url: 'http://ajax-base-api-t.itheima.net:/api/synthesize',
            data: {
                text: backMsg
            },
            success: (res) => {
                if(res.status === 200) {
                    $('#voice').attr('src',res.voiceUrl);
                }
            }
        })
    }
})
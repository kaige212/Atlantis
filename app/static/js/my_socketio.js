
var socket;
// var room_name = "{{ room }}";
// var user_name = "{{ name }}"; // 新增用户名变量


$(document).ready(function(){
    socket = io.connect('http://' + document.domain + ':' + location.port + '/Atlantis'); //这里已经出发了对服务器的请求链接
    socket.on('connect', function() { //自动触发。连接成功后紧接着就触发这个。后端执行：加入房间
        //socket.emit('joined',{room: room_name});
        socket.emit('joined', {room: room_name, name: user_name});
    });
    socket.on('status', function(data) {  //后端加入房间后，返回这里
        $('#chat').val($('#chat').val() + '<' + data.msg + '>\n');
        $('#chat').scrollTop($('#chat')[0].scrollHeight);
    });
    socket.on('message', function(data) {  //后端接收到新的消息后，返回这里
        $('#chat').val($('#chat').val() + data.msg + '\n');
        $('#chat').scrollTop($('#chat')[0].scrollHeight);
    });

    $('#text').keypress(function(e) {  //回车后触发。
        var code = e.keyCode || e.which;
        if (code == 13) {
            text = $('#text').val();
            $('#text').val('');
            //socket.emit('text', {msg: text, room: room_name});
            socket.emit('text', {msg: text, room: room_name, name: user_name});

        }
    });
});
function leave_room() { //点击离开后触发
    socket.emit('left', {room: room_name}, function() {
        socket.disconnect();

        // go back to the login page
        window.location.href = "{{ url_for('main.index') }}";
    });
}

from flask import request,session
from flask_socketio import emit, join_room, leave_room
from .. import socketio

@socketio.on('joined', namespace='/chat')
def joined(message):
    """客户端进入房间时发送。将状态消息广播到房间中的所有人。"""
    room = message['room']
    name = session.get('name')  # 获取session中的用户名
    join_room(room)
    emit('status', {'msg': name + ' 已经进入了房间。'}, room=room)  # 广播入房间消息


@socketio.on('text', namespace='/chat')
def text(message):
    """用户输入新消息时客户端发送。消息发送给房间里的所有人。"""
    # 从消息中获取房间名称而不是 session
    room = message['room']
    emit('message', {'msg': message['name'] + ': ' + message['msg']}, room=room)


@socketio.on('left', namespace='/chat')
def left(message):
    """客户端离开房间时发送。将状态消息广播到房间中的所有人。"""
    # 从消息中获取房间名称而不是 session
    room = message['room']
    leave_room(room)
    emit('status', {'msg': message['name'] + ' 离开了房间。'}, room=room)

from flask import session, redirect, url_for, render_template, request
from . import main
from .forms import LoginForm

@main.route('/', methods=['GET', 'POST'])
def index():
    """登录表单，以进入房间。"""
    form = LoginForm()
    if form.validate_on_submit():
        session['name'] = form.name.data
        # 这里不再将房间存入 session，而是重定向到包含房间名的 URL
        return redirect(url_for('.Atlantis', room_name=form.room.data))
    elif request.method == 'GET':
        form.name.data = session.get('name', '')
        # 同样，这里不再从 session 中获取房间名
    return render_template('index.html', form=form)


# 新增动态房间 URL
@main.route('/Atlantis/<room_name>')
def Atlantis(room_name):
    """聊天室。用户的名字和房间必须存储在会话中。"""
    name = session.get('name', '')
    if name == '':
        return redirect(url_for('.index'))
    # 房间名现在通过 URL 动态获取
    room = room_name
    return render_template('Atlantis.html', name=name, room=room)

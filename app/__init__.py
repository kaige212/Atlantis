from flask import Flask
import os
from flask_socketio import SocketIO

socketio = SocketIO()


def create_app(debug=False):
    """Create an application."""
    app = Flask(__name__)
    app.debug = debug
    # app.config['SECRET_KEY'] = 'gjr39dkjn344_!67#'

    app.config.from_mapping(
        # a default secret that should be overridden by instance config
        SECRET_KEY="gjr39dkjn344_!67#",
        # store the database in the instance folder
        # DATABASE=os.path.join(app.instance_path, "flaskr.sqlite"),
        UPLOAD_FOLDER=os.path.join(app.instance_path, "uploads"),
    )

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    socketio.init_app(app)
    return app



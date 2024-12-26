from flask import Flask, render_template, send_from_directory
import os

# Get static folder from environment variable or use default
STATIC_FOLDER = os.environ.get('STATIC_FOLDER', 'static')

app = Flask(__name__, static_folder=STATIC_FOLDER)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/links.yaml')
def serve_yaml():
    return send_from_directory(STATIC_FOLDER, 'links.yaml')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 
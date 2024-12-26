from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, static_folder='/app/data/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/links.yaml')
def serve_yaml():
    return send_from_directory('static', 'links.yaml')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 
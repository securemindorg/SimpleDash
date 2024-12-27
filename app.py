from flask import Flask, render_template, send_from_directory
import os

# Get static folder from environment variable or use default
STATIC_FOLDER = os.environ.get('STATIC_FOLDER', 'static')

# Add debug print
print(f"Using static folder: {STATIC_FOLDER}")
print(f"Static folder exists: {os.path.exists(STATIC_FOLDER)}")
if os.path.exists(STATIC_FOLDER):
    print(f"Contents of static folder: {os.listdir(STATIC_FOLDER)}")
    if os.path.exists(os.path.join(STATIC_FOLDER, 'js')):
        print(f"Contents of js folder: {os.listdir(os.path.join(STATIC_FOLDER, 'js'))}")
    if os.path.exists(os.path.join(STATIC_FOLDER, 'css')):
        print(f"Contents of css folder: {os.listdir(os.path.join(STATIC_FOLDER, 'css'))}")

app = Flask(__name__, static_folder=STATIC_FOLDER)

@app.route('/')
def index():
    print("Serving index.html")
    return render_template('index.html')
    
@app.route('/tradingview')
def tradingview():
    print("Serving tv.html")
    return render_template('tv.html')

@app.route('/static/<path:filename>')
def custom_static(filename):
    print(f"Attempting to serve static file: {filename}")
    print(f"Looking in directory: {STATIC_FOLDER}")
    return send_from_directory(STATIC_FOLDER, filename)

@app.route('/links.yaml')
def serve_yaml():
    return send_from_directory(STATIC_FOLDER, 'links.yaml')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 

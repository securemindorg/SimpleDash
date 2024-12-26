#!/bin/bash
# Check if the static directory is empty
if [ ! -f "/app/data/static/js/script.js" ]; then
    echo "Initializing static files..."
    cp -r /app/initial_static/* /app/data/static/
fi

# Start Flask
flask run --host=0.0.0.0 
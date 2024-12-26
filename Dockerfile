# Use official Python runtime as base image
FROM python:3.9-slim

# Set working directory in container
WORKDIR /app

# Create data directory structure
RUN mkdir -p /app/data/static /app/initial_static

# Copy application files
COPY app.py .
COPY requirements.txt .
COPY templates templates/
COPY icon.png .
COPY LICENSE .
COPY README.md .
COPY setup.sh .

# Copy static files to initial_static (as a backup)
COPY static/ /app/initial_static/

# Make setup script executable
RUN chmod +x setup.sh

# Install Flask
RUN pip install flask

# Make port 5000 available
EXPOSE 5000

# Define environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=development
ENV STATIC_FOLDER=/app/data/static

# Create volume mount point
VOLUME /app/data

# Run setup script when container launches
CMD ["./setup.sh"]

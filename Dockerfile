# Use official Python runtime as base image
FROM python:3.9-slim

# Set working directory in container
WORKDIR /app

# Create data directory for mounted volume
RUN mkdir -p /app/data/static

# Copy application files (excluding static content)
COPY app.py .
COPY requirements.txt .
COPY templates templates/
COPY icon.png .
COPY LICENSE .
COPY README.md .

# Install Flask
RUN pip install flask

# Make port 5000 available
EXPOSE 5000

# Define environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=development
ENV STATIC_FOLDER=/app/data/static

# Create volume mount point for static content
VOLUME /app/data

# Run app.py when the container launches
CMD ["flask", "run", "--host=0.0.0.0"]

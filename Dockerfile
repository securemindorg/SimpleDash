# Use official Python runtime as base image
FROM python:3.9-slim

# Set working directory in container
WORKDIR /app

# Create a directory for persistent data
RUN mkdir -p /app/data

# Copy only the application code (excluding static content)
COPY requirements.txt .
COPY app.py .
# ... copy other necessary application files ...

# Install Flask
RUN pip install flask

# Make port 5000 available
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=app.py
ENV FLASK_ENV=development

# Create a volume mount point
VOLUME /app/data

# Run app.py when the container launches
CMD ["flask", "run", "--host=0.0.0.0"]

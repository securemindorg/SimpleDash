# SimpleDash

![image](https://github.com/user-attachments/assets/01dc0a0d-b23a-49fd-9c88-ca213f6ae000)


## Inspired by FLAME Dashboard but significantly simplified

A minimalist web-based dashboard featuring categorized links, local applications, and Google Calendar integration with a clean, dark theme interface.

## Features

- 🌅 Dynamic time-based welcome messages
- 🔗 Organized link categories
- 🐳 Docker service shortcuts
- 📅 Google Calendar integration
- 🌙 Dark theme with transparent elements
- 📱 Responsive design
- ⚙️ YAML-based configuration

## Setup

### Prerequisites

- Python 3.x (for local server)
- Modern web browser
- Google Calendar (optional)

### Quick Start

1. Clone or download this repository
2. Add your background image:
   ```bash
   mkdir uploads
   # Add your image to uploads/
   # Default path: uploads/20240616_084929.jpg
   ```
3. Start local server:
   ```bash
   python -m http.server 8000
   ```
4. Visit `http://localhost:8000` in your browser


### Running with docker

1.) Build the docker image
``` sudo docker build -t simpledash . ```

2.) Run the container
``` sudo docker run -d -p 5000:5000 simpledash ```
obviously, you'll need to customize the host port, add a directory if you want to edit thing, etc...


### Configuration

#### 1. Background Image

Update image path in `style.css`:

body:before {
background-image: url("./uploads/your-image.jpg");
}

#### 2. Links and Categories (`links.yaml`)

#### 3. Calendar Integration

1. Get your Google Calendar embed URL from Calendar Settings
2. Update `links.yaml`:
name: "Calendar 1"
url: "your-calendar-embed-url"


## Customization

### Theme Colors

In `style.css`:
- Main container: `background: rgba(0, 0, 0, 0.9)`
- Link items: `background: rgba(0, 0, 0, 0.3)`
- Hover effects: `background: rgba(255, 255, 255, 0.1)`
- Category titles: `color: #228B22` (green)

### Icons

Using [Material Design Icons](https://pictogrammers.com/library/mdi/). Reference icons without the `mdi-` prefix in `links.yaml`.

## Structure
```
.
├── app.py              # Flask application
├── Dockerfile          # Container configuration
├── requirements.txt    # Python dependencies
├── setup.sh           # Container initialization script
├── templates/         # HTML templates
│   └── index.html
└── static/           # Static files (copied to volume)
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    ├── uploads/
    │   └── background.jpg
    └── links.yaml
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Common Issues

1. **White background/No background image**
   - Check image path in `style.css`
   - Verify image exists in uploads folder

2. **Calendar not loading**
   - Verify calendar embed URL
   - Check Content Security Policy in `index.html`

3. **Icons not showing**
   - Check icon names in `links.yaml` (remove mdi- prefix)
   - Verify internet connection for CDN

## License

MIT License

## Contributing

Feel free to submit issues and pull requests for improvements!

### Docker Deployment

#### Option 1: Pull from Docker Hub
```bash
# Pull the image
docker pull securemindorg/simpledash:latest

# Run the container
# For Windows:
docker run -d -p 5000:5000 -v "%APPDATA%/SimpleDash:/app/data" securemindorg/simpledash:latest

# For Linux/Mac:
docker run -d -p 5000:5000 -v "$HOME/.simpledash:/app/data" securemindorg/simpledash:latest
```

#### Option 2: Build Locally
1. Build the Docker image:
```bash
docker build -t simpledash .
```

2. Run the container:
```bash
# For Windows:
docker run -d -p 5000:5000 -v "%APPDATA%/SimpleDash:/app/data" simpledash

# For Linux/Mac:
docker run -d -p 5000:5000 -v "$HOME/.simpledash:/app/data" simpledash
```

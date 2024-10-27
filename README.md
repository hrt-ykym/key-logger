# Key Input Logger

A Node.js application that logs keyboard inputs and saves them to CSV and JSON formats. The logger captures key combinations, modifier keys (Shift, Ctrl, Alt, Meta), and timestamps for each keystroke.

## Features

- Real-time keyboard input monitoring
- Captures modifier keys (Shift, Ctrl, Alt, Meta)
- Logs timestamps for each keystroke
- Saves data in both CSV and JSON formats
- Docker support for containerized execution

## Prerequisites

- Node.js 20 or higher
- Docker (optional, for containerized execution)

## Installation

### Standard Installation

```bash
# Clone the repository
git clone <repository-url>
cd key-input-logger

# Install dependencies
npm install
```

### Docker Installation

```bash
# Build and run using Docker Compose
docker-compose up --build
```

## Usage

### Standard Execution

```bash
npm start
```

### Docker Execution

```bash
docker-compose up
```

The logger will start capturing keyboard inputs immediately. Press `Ctrl+C` to stop the logger and save the captured data.

## Output Files

### CSV Format (keylog.csv)
```csv
timestamp,key_combination,alt,ctrl,meta,shift
1730032274848,s,false,false,false,false
1730032274992,d,false,false,false,false
```

### JSON Format (keylog.json)
```json
{
  "inputs": [
    {
      "key": "s",
      "ctrl": false,
      "meta": false,
      "shift": false,
      "timestamp": 1730031885373
    }
  ],
  "startTime": 1730031861832
}
```

## Project Structure

```
.
├── index.js           # Main application file
├── keylog.csv         # CSV output file
├── keylog.json        # JSON output file
├── package.json       # Project configuration
├── Dockerfile         # Docker configuration
├── docker-compose.yml # Docker Compose configuration
└── .dockerignore      # Docker ignore file
```

## Docker Support

The application includes Docker support for containerized execution:

- `Dockerfile`: Defines the container image
- `docker-compose.yml`: Configures the development environment
- `.dockerignore`: Specifies files to exclude from the container

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
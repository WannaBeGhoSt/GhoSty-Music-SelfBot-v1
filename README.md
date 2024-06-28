# GhoSty Music - Selfbot

This Discord selfbot plays music from YouTube in a voice channel. It can search for songs, play them, and show similar songs to the current playing track.

## Features

- Play music from YouTube
- Show similar songs to the currently playing track
- Display the currently playing song details
- AutoPlay Coming Soon [With Ai]

## Prerequisites

- Node.js and npm installed
- Discord account

## Installation

### 1. Required Modules

- discord.js-selfbot-v13
- @discordjs/voice
- yt-search
- ytdl-core
- libsodium-wrappers

### 2. Install Dependencies

- Before starting the bot, ensure all required modules are installed. The script will check and install them if missing. However, if you encounter issues, you can manually install them:

### Using VS Code Terminal (PC/Computer)

1. Open the terminal in VS Code (Ctrl+`).
2. Run the following commands:

```sh
npm install discord.js-selfbot-v13
npm install @discordjs/voice
npm install yt-search
npm install ytdl-core
npm install libsodium-wrappers
```

### Using Termux (Mobile)

1. Open Termux.
2. Navigate to your project directory.
3. Run the following commands:

```sh
npm install discord.js-selfbot-v13
npm install @discordjs/voice
npm install yt-search
npm install ytdl-core
npm install libsodium-wrappers
```

### 3. Configuration

- Replace line 32 in the index.js with your Account Token.

## Usage

- Run the bot using Node.js:

```sh
node index.js
```

## SelfBot Commands

- play `<search query or URL>:` Play a song from YouTube.
- similar: Show similar songs to the currently playing track.
- nowplaying or np: Show details of the currently playing song.

## Author

- GhoSty || Brutality
- Discord Username: @ghostyjija
- Support Server: <https://discord.gg/SyMJymrV8x>

## Acknowledgements

- Also, make sure to update the content based on the actual features and configuration details of your script.
- Re-Selling Our Codes = Ban
- Feel free to contribute or report issues on our Discord server.

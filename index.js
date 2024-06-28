const { execSync } = require('child_process');
const requiredmodulesghosty = [
    'discord.js-selfbot-v13',
    '@discordjs/voice',
    'yt-search',
    'ytdl-core',
    'libsodium-wrappers'
];

function checkmodulesghosty(modules) {
    modules.forEach(module => {
        try {
            require.resolve(module);
        } catch (e) {
            console.log(`Module "${module}" is not installed. Installing...`);
            execSync(`npm install ${module}`, { stdio: 'inherit' });
        }
    });
}

checkmodulesghosty(requiredmodulesghosty);
const Discord = require('discord.js-selfbot-v13');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, StreamType } = require('@discordjs/voice');                                                                                                                                                                                                                                              // made by @ghostyjija
const ytSearch = require('yt-search');
const ytdl = require('ytdl-core');
const sodium = require('libsodium-wrappers');

const client = new Discord.Client({                                                                                                                                                                                                                                             // made by @ghostyjija
    readyStatus: false,
    checkUpdate: false,
    partials: ['CHANNEL', 'MESSAGE']
});
const token = 'ADD YOUR TOKEN';                                                                                                                                                                                                                                             // made by @ghostyjija
let currentVideo = null;
let connection = null;
let player = null;                                                                                                                                                                                                                                             // made by @ghostyjija

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('play')) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('You are not in a voice channel!');                                                                                                                                                                                                                                             // made by @ghostyjija
        }                                                                                                                                                                                                                                             // made by @ghostyjija

        const query = message.content.split(' ').slice(1).join(' ');                                                                                                                                                                                                                                             // made by @ghostyjija
        if (!query) {
            return message.reply('You need to provide a search query or URL.');
        }                                                                                                                                                                                                                                             // made by @ghostyjija

        let videoUrl;
        let videoDetails;                                                                                                                                                                                                                                             // made by @ghostyjija

        if (!ytdl.validateURL(query)) {
            try {                                                                                                                                                                                                                                             // made by @ghostyjija
                const searchResults = await ytSearch(query);
                const video = searchResults.videos.length > 0 ? searchResults.videos[0] : null;                                                                                                                                                                                                                                             // made by @ghostyjija
                if (!video) {
                    return message.reply('No results found for that search!');                                                                                                                                                                                                                                             // made by @ghostyjija
                }
                videoUrl = video.url;                                                                                                                                                                                                                                             // made by @ghostyjija
            } catch (error) {
                console.log('Error searching for video: ' + error);                                                                                                                                                                                                                                             // made by @ghostyjija
                return message.reply('Error searching for video.');
            }                                                                                                                                                                                                                                             // made by @ghostyjija
        } else {                                                                                                                                                                                                                                             // made by @ghostyjija
            videoUrl = query;
        }                                                                                                                                                                                                                                             // made by @ghostyjija

        try {
            const info = await ytdl.getInfo(videoUrl);                                                                                                                                                                                                                                             // made by @ghostyjija
            videoDetails = {                                                                                                                                                                                                                                             // made by @ghostyjija
                url: videoUrl,
                duration: info.videoDetails.lengthSeconds,
                channel: info.videoDetails.author.name,
                published: info.videoDetails.publishDate,
                views: info.videoDetails.viewCount,                                                                                                                                                                                                                                             // made by @ghostyjija
                likes: info.videoDetails.likes
            };

            const stream = ytdl(videoUrl, { filter: 'audioonly' });
            connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            player = createAudioPlayer({                                                                                                                                                                                                                                             // made by @ghostyjija
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Play
                }
            });                                                                                                                                                                                                                                             // made by @ghostyjija
            player.play(resource);
            connection.subscribe(player);
            currentVideo = videoDetails;                                                                                                                                                                                                                                             // made by @ghostyjija
            message.reply(`Started playing: ${videoDetails.title}`);
            
            player.on(AudioPlayerStatus.Idle, () => {                                                                                                                                                                                                                                             // made by @ghostyjija
                if (connection) {
                    connection.destroy();                                                                                                                                                                                                                                             // made by @ghostyjija
                }
                connection = null;                                                                                                                                                                                                                                             // made by @ghostyjija
                player = null;
                currentVideo = null;
                message.channel.send('Finished playing.');
            });                                                                                                                                                                                                                                             // made by @ghostyjija

            player.on('error', error => {                                                                                                                                                                                                                                             // made by @ghostyjija
                console.error('Error:', error);
                message.reply('There was an error playing the song.');
                if (connection) {
                    connection.destroy();
                }
                connection = null;
                player = null;
                currentVideo = null;
            });

        } catch (error) {
            console.log('Error playing song: ' + error);                                                                                                                                                                                                                                             // made by @ghostyjija
            message.reply('Error playing song.');
            if (connection) {
                connection.destroy();
            }
            connection = null;                                                                                                                                                                                                                                             // made by @ghostyjija
            player = null;
            currentVideo = null;
        }
    }                                                                                                                                                                                                                                             // made by @ghostyjija
           
    if (message.content.startsWith('similar')) {
        if (!currentVideo) {
            return message.reply('No song is currently playing.');                                                                                                                                                                                                                                             // made by @ghostyjija
        }

        try {                                                                                                                                                                                                                                             // made by @ghostyjija
            const searchResults = await ytSearch(currentVideo.title);                                                                                                                                                                                                                                             // made by @ghostyjija
            const similarVideos = searchResults.videos.slice(1, 6);
           
            if (similarVideos.length === 0) {
                return message.reply('No similar songs found.');
            }

            let replyMessage = 'Similar songs:\n';
            similarVideos.forEach(video => {                                                                                                                                                                                                                                             // made by @ghostyjija
                replyMessage += `${video.title}\n`;
            });

            message.reply(replyMessage);
        } catch (error) {
            console.log('Error fetching similar songs: ' + error);
            message.reply('Error');
        }
    }

    if (message.content.startsWith('nowplaying') || message.content.startsWith('np')) {
        if (!currentVideo) {
            return message.reply('No song is currently playing.');
        }

        const { title, url, duration, channel, published, views, likes } = currentVideo;
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = duration % 60;
        message.reply(`Now playing:
        **Title:** ${title}
        **URL:** ${url}
        **Duration:** ${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds} minutes
        **Channel:** ${channel}
        **Published on:** ${published}
        **Made By:** @ghostyjija`);
    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);                                                                                                                                                                                                                                             // made by @ghostyjija
});

client.login(token);

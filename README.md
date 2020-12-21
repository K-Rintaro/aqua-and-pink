# aqua-and-pink
The perfect bot that can connect Discord and LINE

<img width="1215" alt="aqua-and-pink system" src="https://user-images.githubusercontent.com/70018855/102012745-88393400-3d8f-11eb-9c61-0f152962f10a.png"></img>

## What is this?
I don't like LINE because of its low-security system and LINE has a low level of privacy awareness. \
Therefore, I developed tool that can connect Discord and LINE.

### aqua-and-pink supports:
Discord → LINE [Text Message]\
LINE → Discord [Text Message]\
Discord → LINE [Picture & Other files]\
LINE → Discord [Picture & Location]

## Note
1. aqua-and-pink can't get stamp pictures because LINE Message API doesn't support them but aqua-and-pink can get stamp "keywords". Discord users can guess the stamp message by keywords.
2. aqua-and-pink can't get file that sent from LINE.

## How to use
1. Create .env file
2. Set TOKEN(Discord bot token), CHANNEL_ACCESS_TOKEN(LINE channel access token), CHANNEL_SECRET(LINE channel secret), CHANNEL_ID(LINE channel id) **Please check env.example**
3. Please connect webhook at LINE API console. **Please change TCP port number "5000" if it is necessary.**

## LICENSE
This software is licensed under the MIT License.

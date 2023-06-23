# Callis PI tool

Simple tool to track your PI planet extractors. Login with your characters and enjoy the PI!

Any questions, feedback or suggestions are welcome at [EVE PI Discord](https://discord.gg/MDapvGyw)

## [Avanto hosted PI tool](https://pi.avanto.tk)

![Screenshot of PI tool](https://github.com/calli-eve/eve-pi/blob/main/images/eve-pi.png)

Features:

- Group characters to account groups by clickin on the character icon
- Track amount of planets
- Track extractor status
  - When the cycle will end
  - Highlight the planet if extractor has stopped or has not been started.
- Backup to download characters to a file
- Rstore from a file. Must be from the same instance!

## Basic usage

1. Login with your characters
2. Group the character to accounts by clicking on the character name and setting the account name
3. Make sure your extractors are running!

## Backing up or moving character list to another device

Because everything is stored in the browser there is no way to populate the list. To help with this EVE PI provides Backup and Restore functionality using basic JSON file.

To dowload your list:

1. Click Dowload button in the top button bar
2. Find your backup json file in your Downloads folder

To restore your list:

**Take note that restoring the list will overwrite any local list that you have!**

1. Click Restore button in the top button bar
2. Use the dialog to select the file you previously dowloaded to restore the list.

## Security

All eve sso information is stored in your browser and refresh token is encrypted with apps EVE SSO secret. Backend processes only the token exchange, refresh and revoke that need the EVE_SSO_SECRET. Everything else is handled in frontend.

## EVE SSO Callback

Callback is handled by the SPA so when running you should point to the domain. There is no separate callback path.

## Running

To run the app you need to create a EVE SSO application here: https://developers.eveonline.com/

You will need these env variables from the application settings:

```
EVE_SSO_CLIENT_ID=Client ID
EVE_SSO_SECRET=Secret Key
EVE_SSO_CALLBACK_URL=Callback URL (This should be the domain you are hosting at or if run locally it should be http://localhost:3000)
```

## Run locally

1. Create .env file in the directory root and populate with env variables you get from the EVE app you created. Example env file: .env.example
2. run `npm run dev`

## Run the container

1. Populate the environment variables in .env file
2. Run 'docker-compose up

## Hosting

Easiest way to host is deploy the app through Vercel https://vercel.com. Login with github, point to eve-pi repository, setup the env variables and the app should work out of the box.

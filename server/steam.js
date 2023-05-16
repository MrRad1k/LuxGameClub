const SteamAuth = require("node-steam-openid");
const globalid = require('./controllers/steamController')

module.exports = new SteamAuth({
    realm: process.env.API_URL, // Site name displayed to users on logon
    returnUrl: process.env.API_URL + "/api/steam/auth/steam/authenticate/" + globalid.id, // Your return route
    apiKey: process.env.STEAM_API_KEY // Steam API key
});
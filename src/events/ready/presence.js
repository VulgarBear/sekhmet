const { ActivityType } = require("discord.js");

module.exports = async (client, handler) => {
  // Array of status configurations
  const statuses = [
    {
      name: "Searching the web for answers... 💻",
      type: ActivityType.Playing,
    },
    {
      name: "Monster Hunter: Wilds 🎮",
      type: ActivityType.Playing,
    },
    {
      name: "Baldur's Gate 3 🎮",
      type: ActivityType.Playing,
    },
  ];

  const setBotPresence = () => {
    try {
      const random = Math.floor(Math.random() * statuses.length);
      const status = statuses[random];
      //console.log('Setting bot presence:', status);
      client.user.setPresence({
        activities: [
          {
            name: status.name,
            type: status.type,
            url: status.url || null,
          },
        ],
        status: "online",
      });
      //console.log('Bot presence set to:', status.name);
    } catch (error) {
      console.error("Error in setBotPresence function:", error);
    }
  };

  setBotPresence(); // Set initial bot presence

  // Set bot presence every 60 seconds
  setInterval(() => {
    setBotPresence();
  }, 60000);
};

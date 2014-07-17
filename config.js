var config = {
  db : "mongodb://localhost/pnsmailAdmin",
  home: "/tmp/home",
  maildir: "maildir",
  gearmand: [
  { host: "localhost" }
  ],
  stat : "/home/mdamt/src/kominfo/pnsmail/queue-stat/stat.db",
  statStripEmail : "sureliabox-pnsmail-"
}

module.exports = config;

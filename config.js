var config = {
  db : "mongodb://localhost/pnsmailAdmin",
  home: "/tmp/home",
  maildir: "maildir",
  gearmand: [
  { host: "localhost" }
  ],
  stat : "/home/mdamt/src/surelia-queue-stat/stat.db",
  statStripEmail : "sureliabox-pnsmail-",
  statDomain: "domain.com"
}

module.exports = config;

var config = {
  db : "mongodb://localhost/pnsmailAdmin",
  home: "/tmp/home",
  maildir: "maildir",
  gearmand: [
  { host: "localhost" }
  ],
  stat : "/home/mdamt/src/surelia-queue-stat/stat.db",
  statStripEmail : "sureliabox-pnsmail-",
  statDomain: ["domain.com", "abc.com"],
  // smtpTransport: {
  //   host: '',
  //   port: '',
  //
  // }
  smtpTransport: "smtps://surelia.web.client%40gmail.com:katasandisurelia@smtp.gmail.com'"
}

module.exports = config;

var mongoose = require ("mongoose");
var bcrypt = require ("bcrypt");

var Schema = mongoose.Schema;

var CommandQueueSchema = new Schema({
    command : { type : String, required: true },
    args : { type : Object, required: true },
    state : { type : Object, required: true },
    output : { type: String },
    createdDate : { type : Date, required: true },
    pid : { type : Number },
    doneDate : { type : Date },
});

try {
    CommandQueue = mongoose.model ("CommandQueue");
}
catch (err) {
    CommandQueue = mongoose.model ("CommandQueue", CommandQueueSchema);
}

var UserSchema = new Schema({
  username: { type : String, lowercase: true, trim: true, required: true},
  domain: { type : Schema.Types.ObjectId, required: true},
  created : { type : Date },
  modified : { type : Date },
  quota : { type : Number },
  secret : { type : String },
  hash : { type : String },
  profile : { type : Object },
  roles : [ { type : String } ],
  state : { type : String },
  group : { type : Schema.Types.ObjectId, default: Schema.Types.ObjectId },
  mailboxServer : { type : Schema.Types.ObjectId, default: Schema.Types.ObjectId, required: true },
  pendingTransaction : { type : Schema.Types.ObjectId, default: Schema.Types.ObjectId },

  log : [{
        type : Schema.Types.ObjectId,
  }]
});

UserSchema.method("setPassword", function (password, next) {
  var self = this;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(password, salt, /*function(){},*/ function (err, hash) {
      if (err) return next(err)
      next(hash)
    })
  })
  return this;
});

UserSchema.method("auth", function (password, next) {
  var self = this;
  bcrypt.compare(password, self.toJSON().hash, function(err, authenticated) {
    if (err) {
      return next(err);
    }
    return next(authenticated);
  });
  return this;
});


try {
    User = mongoose.model ("User");
}
catch (err) {
    User = mongoose.model ("User", UserSchema);
}


var DomainSchema = new Schema({
  name: { type : String },
  state : { type : String },
  creator: { type : Schema.Types.ObjectId, default: Schema.Types.ObjectId },
  createdDate : { type : Date },
  pendingTransaction : { type : Schema.Types.ObjectId, default: Schema.Types.ObjectId },
  log : [{
        type : Schema.Types.ObjectId,
  }]
});

try {
    Domain = mongoose.model ("Domain");
}
catch (err) {
    Domain = mongoose.model ("Domain", DomainSchema);
}



module.exports = {
  CommandQueue: CommandQueue,
  User: User,
  Domain: Domain
}


var mongoose = require ("mongoose");

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

try {
    User = mongoose.model ("User");
}
catch (err) {
    User = mongoose.model ("User", UserSchema);
}

module.exports = {
  CommandQueue: CommandQueue,
  User: User
}


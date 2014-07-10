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

module.exports = {
  CommandQueue: CommandQueue
}


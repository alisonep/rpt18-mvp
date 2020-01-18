const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mvp1', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error:'));

// db.once('open', function(){
//   var fastSchema = new mongoose.Schema({
//     profile: {
//       type: String,
//       index: true,
//       unique:true
//     },
//     fast_start: Number,
//     fast_length: Number
//   });

//   var Fast = mongoose.model('Fast', fastSchema);
// })
var fastSchema = new mongoose.Schema({
  profile: {
    type: String,
    index: true,
    unique:true
  },
  fast_start: String,
  fast_length: Number
});

var Fast = mongoose.model('Fast', fastSchema);

var createFast = function(name, start, length) {
  Fast.findOneAndUpdate({profile:name}, {fast_start:start, fast_length:length}, null, function(err, docs){
    if (err) {
      throw new Error(err);
    } else if (docs) {
      console.log('Updated profile');
      return;
    } else {
      var newFast = new Fast({profile: name, fast_start:start, fast_length:length});
      console.log('Created Profile');
      newFast.save();
    }
    return;
  })
};

module.exports.Fast = createFast;
var mongoose   = require('mongoose');

var studentSchema=new mongoose.Schema({
	name: String,
	nim: String,
	kelas : String,
	email : String

});

var Student= mongoose.model("Student",studentSchema);

module.exports= Student;
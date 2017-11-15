var express	   = require("express"),
app	       = express(),
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
mongoose   = require('mongoose');
mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost/pendaftaran_uph',{useMongoClient: true});

var Student = require ("./models/student");

app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.get("/",function(req,res){
	res.render("landing");
});
app.get("/students",function(req,res){
	Student.find({},function(err,allStudents){
	// kalau mau cari spesifik isi objectnya
	if(err){
		console.log(err);
	}else{
		res.render("students",{student:allStudents});
	}
})
	// res.render("students");
})
app.post("/students",function(req,res){
	var name=req.body.name;
	var nim=req.body.nim;
	var kelas = req.body.kelas;
	var email= req.body.email;
	var newStudents={name:name,nim:nim,kelas:kelas,email:email};
	// simpan ke database
	Student.create(newStudents),function(err,newStudents){
		if(err){
			console.log(err)
			res.redirect("/")
		}else{
			res.redirect("/")
			console.log(newStudents)
			res.redirect("/students")
		}
	}
	res.redirect("/students")
})
app.get("/:id/edit",function(req,res){
	Student.findById(req.params.id,function(err,foundStudent){
		if(err){
			res.redirect("/students");
		}else{
			res.render("edit",{student:foundStudent})
		}
	})
});
app.delete("/:id",function(req,res){
	Student.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log(err);
			res.redirect("/students");
		}else{
			res.redirect("/students");
		}
	})
});
app.put("/:id",function(req,res){
	Student.findByIdAndUpdate(req.params.id,req.body.student,function(err,updatedCampground){
		if(err){
			res.redirect("/students");
		}else{
			res.redirect("/students");
		}
	})
});
app.listen(3000,function(){
	console.log("Server has started")
})
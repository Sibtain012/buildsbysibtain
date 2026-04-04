import http from 'http';

http.createServer(function (req,res){
	res.write("On my way to become a Full Stack Engineer!");
	res.end();
}).listen(3000);

console.log("Server running on PORT: 3000");

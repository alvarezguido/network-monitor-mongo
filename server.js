var express = require ("express");
var app = express ();
var mongoose = require ("mongoose");
mongoose.connect('mongodb://localhost:27017/test_1', { useNewUrlParser: true, useUnifiedTopology: true });

var actual_rx = 0;
var prev_rx = 0;
var total_rx = 0;
var datos = {};
const si = require ('systeminformation');

var db=mongoose.connection;
db.on('error', console.log.bind(console, "¡Connection to MongoDB failed"));
db.once('open', function(callback){
    console.log("¡Success connection to MongoDB !");
})

var data = {};

app.use(express.static(__dirname+"/site"));

app.get("/", function (req, res){
  res.sendFile(__dirname+"/site/index.html")
})

app.get('/get_data_json',  function(req, res) {
        db.collection('test_1').find({}).toArray().then(function(getData) {
            res.status(200).json(getData);
        });
});

function time () {
  var date_ob = new Date ();
  let hours = 0;
  let min = 0;
  let sec = 0;
  let timer = 0;
  day ="0" + date_ob.getDate();
  month = "0" + date_ob.getMonth();
  year = date_ob.getFullYear();
  hours = date_ob.getHours();
  min = "0" + date_ob.getMinutes();
  sec = "0" + date_ob.getSeconds();
  return (month.substr(-2)+"-"+day.substr(-2)+"-"+year+" "+hours+":"+min.substr(-2)+":"+sec.substr(-2))

}

function infinite_loop(i) {
    setTimeout(() => {
        infinite_loop(++i);
        si.networkStats("wlan0")
            .then(function(data){
              total_rx = data[0].rx_bytes;
              if (i<2) {
                prev_rx= total_rx;
                actual_rx=0; //value in bytes

                timer = time();
                datos = {
                  x: timer,
                  y: actual_rx
                }
                db.collection('test_1').insertOne(datos,function(err, collection){
                  if (err) throw err;
                  console.log("Correct data in database")
                })
              } else {
                actual_rx= total_rx - prev_rx; //value in bytes
                prev_rx = total_rx;
                timer = time();
                datos = {
                  x: timer,
                  y: actual_rx
                }
                console.log(datos);
                db.collection('test_1').insertOne(datos,function(err, collection){
                  if (err) throw err;
                  console.log("Correct data in database")
                })
              };
            })
            .catch(err => console.error(err));
    }, 5000)
}

infinite_loop(0);


app.listen(1500)
console.log("Server listen on port 1500")

//calls the python script with data
var spawn = require('child_process').spawn
py = spawn('python', ['compute2.py'])
var fs = require('fs')

var data_buffer = fs.readFileSync('water.json')
var data = JSON.parse(data_buffer)

var data_buffer2 = fs.readFileSync('data.json')
var data2 = JSON.parse(data_buffer2)

var express = require('express')
var app = express();
var server = app.listen(3000, listening)

app.use(express.static('website'))
function listening() {
  console.log('listening..')
}

app.get('/water', sendWater)
function sendWater(request, response) {
  response.send(data);
}

app.get('/calcs', sendCalcs)
function sendCalcs(request, response) {
  response.send(data2);
}

app.get('/add/:result', addWater);
function addWater(request, response) {
  var result = request.params.result
  var reply = data
  if (result == 'water') {
    data['water'] += 1
    data['total'] = data['water'] + data['land']

    var water = JSON.stringify(data, null, 2)
    fs.writeFile('water.json', water, finished)
    function finished(err){
      console.log('all set')
    }
  } else if (result == 'land') {
    data['land'] += 1
    data['total'] = data['water'] + data['land']

    var water = JSON.stringify(data, null, 2)
    fs.writeFile('water.json', water, finished)
    function finished(err) {
      console.log('all set')
    }
  } else if (result == 'reset') {
    data['total'] = 0
    data['water'] = 0
    data['land'] = 0

    var water = JSON.stringify(data)
    fs.writeFile('water.json', water, finished)
    function finished(err) {
      console.log('all set')
    }
  } else {
    reply = {
      msg: "not an option"
    }

  }
  response.send(reply)
}

dataString = ''
/*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
py.stdout.on('data', function (data) {
  dataString += data.toString();
});

/*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
//this will only work if there is actually something being printed out in the python file
py.stdout.on('end', function () {
  console.log(dataString);
});

/*We have to stringify the data first otherwise our python process wont recognize it*/
py.stdin.write(JSON.stringify(data));

py.stdin.end();
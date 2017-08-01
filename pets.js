var fs = require('fs');
var path = require('path');

var petPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = path.basename(process.argv[2]);

if(cmd === 'read') {
  fs.readFile(petPath, 'utf8', function(err, data) {
    if(err) {throw err;}

    var pets = JSON.parse(data);

    if(pets[process.argv[3]]) {
      console.log(pets[process.argv[3]]);
    }else if(process.argv[3] === undefined){
      console.log(pets);
    }else if(pets[process.argv[3]] === undefined) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }
  })
}else if(cmd === 'create') {
  fs.readFile(petPath, 'utf8', function(err, data) {
    if(err) {throw err;}

    var pets = JSON.parse(data);

    var age = process.argv[3];
    var kind = process.argv[4];
    var name = process.argv[5];

    if(age === undefined || kind === undefined || name === undefined) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }else if(isNaN(age)){
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME. Invalid age`);
      process.exit(1);
    }else {
      age = parseInt(age);
      pets.push({age, kind, name});

      fs.writeFile(petPath, JSON.stringify(pets), function(err) {
        if(err) {throw err;}

        console.log(JSON.stringify(pets[pets.length-1]));
      })
    }

  })
}else {
  console.error(`Usage: ${node} ${file} ${cmd} [read | create]`);
  process.exit(1);
}

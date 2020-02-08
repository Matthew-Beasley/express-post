const fs = require('fs');

const readJSON = () => {
  return new Promise((resolve, reject, ) => {
    fs.readFile('./users.json', (err, data) => { //get rid of hardcoded file path
      if (data) {
        try {
          resolve(JSON.parse(data));  //not sure if I should parse here
        } catch (ex) {
          reject(ex);
        }
      }
      else {
        reject(err);
      }
    })
  })
}


const writeJSON = (data) => {
  return new Promise((resolve, reject) => {
    readJSON()
      .then(response => {
        const users = response;
        users.push(data);
        fs.writeFile('./users.json', JSON.stringify(users, null, 2), (err) => {
          if (err) {
            reject(err);
          }
          else {
            resolve(data)
          }
        });
    })
  })
}


const deleteUser = (name) => {
  readJSON()
    .then(data => {
      const updated = data.filter(user => user.name !== name);
      fs.writeFile('/users.json', JSON.stringify(updated, null, 2), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('200')
        }
      });
      console.log(updated);
    })
}

module.exports = { readJSON, writeJSON, deleteUser }

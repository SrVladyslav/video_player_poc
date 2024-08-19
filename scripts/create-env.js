const fs = require('fs');
const path = require('path');

// Define the content to write in the .env.local file
const envContent = `
PROJECT_ROOT=''
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
NEXT_PUBLIC_DATA_URL=http://localhost
NEXT_PUBLIC_MAX_FILE_SIZE=209715200 # 200 MB

# =======================================================================
# INSERT HERE THE USER ID's
NEXT_PUBLIC_USER_ID_1="<user_id_1>"
NEXT_PUBLIC_USER_ID_2="<user_id_2>"
# =======================================================================
`;

// Define the path to the .env.local file
const envFilePath = path.join(__dirname, './../.env.local');

// Write the content to the file
fs.writeFile(envFilePath, envContent.trim(), (err) => {
  if (err) {
    console.error('Error creating .env.local:', err);
  } else {
    console.log('.env.local file has been created and populated.');
  }
});

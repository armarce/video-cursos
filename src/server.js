require('dotenv').config();
const app = require('./app.js');
const { db } = require('./utils/database.js');

const PORT = process.env.PORT || 3000;

const initModels = require('./models/initModels.js');
initModels();

db.authenticate().then(() => console.log('DB connect')).catch((error) => console.log(error));
//db.sync().then(() => console.log('Sincronizado')).catch((error)=> console.log(error));

app.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}`)
});
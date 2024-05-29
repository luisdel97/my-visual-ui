const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/auth-visual-ui'));

// app.get('/*', (req,res,next) => {
//     res.sendFile(path.join(__dirname + '/dist/src/index.html'));
// });

// Another way to do it
// app.get('/*', (req,res,next) => {
//     res.sendFile(path.join('index.html', __dirname + 'dist/auth-visual-ui/'));
// });

app.get('/*', function (req, res) {
    const index = path.join(__dirname, 'src', 'index.html')
    res.sendFile(index);
})

app.listen(process.env.PORT || 8000);

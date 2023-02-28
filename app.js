const {mkdir, open, readdir} = require('node:fs');
const {join} = require('node:path');

mkdir(join('mainDir'), err => {
    if (err) throw new Error();
});

for (let i = 1; i <= 5; i++) {

    open(join('mainDir', `file${i}.txt`), 'w', function (err) {
        if (err) throw new Error();
    });

    mkdir(join('mainDir', `dir${i}`), err => {
        if (err) throw new Error();
    })
}

readdir(join('mainDir'), {withFileTypes: true}, (err, files) => {
    if (err) throw new Error();
    files.map((file) => {

            if (file.isFile()) {
                console.log('FILE: ', file.name);
            } else {
                console.log('FOLDER: ', file.name);
            }
        }
    )
})

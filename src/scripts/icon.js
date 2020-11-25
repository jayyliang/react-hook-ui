//一次性脚本，处理下svg文件，把内容填到json

const fs = require('fs')
const path = require('path')
const resolveFile = dir => path.join(__dirname, dir)
console.log('start')
let obj = {}
fs.readdir(resolveFile('./icons'), async (err, files) => {
    if (err) {
        console.log(err)
    }
    for (let i = 0; i < files.length; i++) {
        await readSingleFile(files[i])
    }
    fs.writeFileSync(resolveFile('./icons.json'), JSON.stringify(obj))
    console.log('done')
})
async function readSingleFile(file) {
    return new Promise((resolve, reject) => {
        let filePath = resolveFile(`./icons/${file}`),
            fileName = file.split('.')[0]
        fs.readFile(filePath, {
            encoding: 'utf8'
        }, (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                obj[fileName] = data
                resolve()
            }
        })
    })
}
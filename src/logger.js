// Console Logger pattern
exports.info = (msg) => {
    console.log(`%s INFO`, new Date().toGMTString().replace(/.*, /,''), msg.toString().replace(/\x1B\[[0-9;]*[JKmsu]/g,''))
}

exports.warn = (msg) => {
    console.warn(`%s WARN`, new Date().toGMTString().replace(/.*, /,''), msg.toString().replace(/\x1B\[[0-9;]*[JKmsu]/g,''))
}

exports.error = (msg) => {
    console.error(`%s ERROR`, new Date().toGMTString().replace(/.*, /,''), msg.toString().replace(/\x1B\[[0-9;]*[JKmsu]/g,''))
}

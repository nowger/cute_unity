const regedit = {};

var cp = require('child_process');
// var decoder = new TextDecoder('gbk');//使用这个也没有解决乱码问题
var iconv = require('iconv-lite');
const encoding = 'cp936';
const binaryEncoding = 'binary';

// REG QUERY /?   查看详细语法

regedit.query = function (key, include, callback, err) {
    var command = 'REG QUERY "' + key + '" /s';
    cp.exec(command, { encoding: binaryEncoding }, function (error, stdout, stderr) {
        if (error) {
            if (err) err(error);
        } else {
            if (stderr) {

                if (err) err(stderr);
            } else {
                // var resultOut = iconv.decode(Buffer.from(stdout, binaryEncoding), encoding);
                var lines = stdout.split('\n');
                if (include) {
                    var result = lines.filter(function (value) {
                        return (value.indexOf(include)) != -1
                    }).sort();
                    callback(result);
                } else {
                    callback(lines);
                }
            }
        }
    });
}

// cp.exec('REG ADD HKEY_CLASSES_ROOT\\education /ve /t REG_SZ /d "education Protocol" /f', { encoding: binaryEncoding }, function (error, stdout, stderr) {
//     //有些乱码可以显示出来，有些还是乱码，也没找到完全能解决乱码问题，参考博客：https://ask.csdn.net/questions/167560
//     console.log(iconv.decode(new Buffer(stdout, binaryEncoding), encoding), iconv.decode(new Buffer(stderr, binaryEncoding), encoding));
// });
module.exports = regedit;
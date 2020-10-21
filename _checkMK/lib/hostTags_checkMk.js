
const http = require('http');
const StringDecoder = require('string_decoder').StringDecoder;


var hostTags_checkMk = {};

hostTags_checkMk.getAllTags = (host, site, user, passwd) => {
    let action = "get_hosttags";
   
    let options = {
        host : host,
        path : `/${site}/check_mk/webapi.py?action=${action}&_username=${user}&_secret=${passwd}`,
        port : 80,
        method : 'GET'
    };

    const req = http.request(options, (res) => {

        let decoder = new StringDecoder('utf-8');
        let buffer = '';

        req.on('data', (d) => {
            buffer += decoder.write(d);
        });
        req.on('end', () => {
            buffer += decoder.end();
            return buffer;
        })

    });

    req.on('error', (error) => {
        return error.message;
    });
}

hostTags_checkMk.filterTagGroup = (jsonString, tagGroup) => {
    let obj = JSON.parse(jsonString);

    if (Object.keys(obj).includes('result')) {
        if (Object.keys(obj.result).includes('tag_groups')) {
            if (Object.keys(obj.result.tag_groups).includes(tagGroup)) {
                return obj.result.tag_groups[tagGroup];
            }
        }
    }

    throw new Error('The JSON-Object doesnt represent a typical check_mk object');

}

module.exports = hostTags_checkMk;
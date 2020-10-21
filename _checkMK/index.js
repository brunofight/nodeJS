const cmkTagsLib = require('./lib/hostTags_checkMk');
const fs = require('fs');


var app = {};

app.config = {
    // General Configuration
    passwd_file : __dirname + '/passwd.json',

    checkMk_host : 'v970l234',
    checkMk_site : 'wato_test',
    checkMk_username : 'automation',
    checkMk_passwd : '',

    // Configuration for TagsLib module
    checkMk_tagGroup : ''
    
};

app.readPasswords = (file) => {
    let passwdObj = JSON.parse(fs.readFileSync(file, 'utf-8'));
    app.config.checkMk_passwd = passwdObj.checkMk_passwd;
}

// @TODO: populate returnObj with array of KC and allocated tags
app.getTagsByKC = () => {

    let returnObj = {};

    let result = cmkTagsLib.getAllTags(app.config.checkMk_host, app.config.checkMk_site, 
        app.config.checkMk_username, app.config.checkMk_passwd);
    
    let tagObj = cmkTagsLib.filterTagGroup(result, app.config.checkMk_tagGroup);

    return returnObj;
}






// CODE EXECUTION BEGINS HERE:

app.readPasswords(app.config.passwd_file);





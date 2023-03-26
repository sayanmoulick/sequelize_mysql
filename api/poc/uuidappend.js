const fs = require("fs");
const uuidv4 = require('uuid')
fs.readFile("/home/neosoft/Downloads/profileMaster.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
    try {
        const customer = JSON.parse(jsonString);
        for (const i in customer) {
        customer[i]._id = uuidv4.v4()
        }
        // fs.writeFile("/home/neosoft/Downloads/profileMasterOriginal.json", JSON.stringify(customer), 'utf8', function(err) {
        //     if(err) {
        //             return console.log(err);
        //         }
        //         console.log("The file was saved!");
        // }); 
        fs.writeFile("/home/neosoft/Downloads/profileMasterPretty.json", JSON.stringify(customer, null, 4), 'utf8', function(err) {
            if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
        }); 
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
//   console.log("File data:", jsonString);
});

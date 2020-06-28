
const userRoutes = (app, fs) => {

    // variables
    const dataPath = './data/db.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }            
            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/db/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
         
         const userId = req.params["id"];
        
        JsonData = JSON.parse(data);
        let filteredObj = Object.keys(JsonData).map(key => JsonData[key]); 
         var index = -1;
         var filteredObjs = filteredObj.find(function(item, i){
             console.log("item.id " + item.id + "userId " + userId);
            if(item.id == userId){
                console.log("OK");
              index = i;
              return i;
            }
          });

          console.log("ABCDE" + filteredObjs);      
          res.send(filteredObjs);
        });       

    });

    // CREATE
    app.post('/db', (req, res) => {

        readFile(data => {
            const newUserId = Object.keys(data).length + 1;

            // add the new user
            data[newUserId.toString()] = req.body;
            var a = JSON.stringify(data, null, 2); 
            console.log("anewsdvdsg   ");
            data[newUserId.toString()]["id"] = newUserId
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(newUserId.toString());
                //res.status(200).send(JSON.parse(data));
            });
        },
            true);
    });


    app.put("/db/:id", (req, res) => {
        readFile((data) => {
          // add the new user
          
          const userId = req.params["id"];
          data[userId] = req.body;;
          console.log(" New Puts ");
          writeFile(JSON.stringify(data, null, 2), () => {
           // res.status(200).send(`users id:${userId} updated`);
           res.status(200).send(data[userId]);
          });
        }, true);
      });


    // DELETE
    app.delete('/db/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    });
};

module.exports = userRoutes;
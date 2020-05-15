var fetch = require('node-fetch');

class Yelp {
    
    constructor(apiKey) {
        this.apiKey = apiKey;
    }


    // search business and theid Ids 
    search(location, radius, offset) {
       
      return  fetch("https://api.yelp.com/v3/businesses/search?location="+location+"&limit=50" +"&radius="+ radius + "&offset=" + offset, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.apiKey
            }
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        
        .catch(error => {
            console.error(error);
        })
        
    }

    // Get details of a business by its Id
    async businessDetails(id) {
     return await fetch("https://api.yelp.com/v3/businesses/"+ id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.apiKey
            }
         })
         .then(function(response) {
             if(response.ok) {
                 return response.json();
             } else {
                 return Promise.reject(response);
             }
         })
         
         .catch(error => {
             console.error(error);
         })
            
    }
}
module.exports = Yelp

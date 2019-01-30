import axios from 'axios';

const url = 'http://localhost:3000/v1/api/top/?count=300'; 

class ShowService {
    
    static getShows() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                /* eslint-disable */
                console.log(data);
                resolve(
                    data.result.map(show => ({
                        ...show
                    }))
                );       
            }
            catch(err) {
                reject(err);
            }
        })
    }
    static getShowByQuery(query) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`http://localhost:3000/v1/api/?title=${query}`);
                const data = res.data;
                console.log("in query");

                resolve(
                    data.map(show => ({
                        ...show
                    }))
                );  
            }
            catch(err) {
                reject(err);
            }
        })
    }
}

export default ShowService;
import axios from 'axios';

const url = 'http://localhost:3000/v1/api/top/?count=300'; 

class ShowService {
    
    static getShows() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                /* eslint-disable */
                console.log("data from service!");
                console.log(data);
                //console.log(data.result);
                resolve(
                    data.result.map(show => ({
                        ...show
                    }))
                );       
                console.log("after mapping");
            }
            catch(err) {
                reject(err);
            }
        })
    }
}

export default ShowService;
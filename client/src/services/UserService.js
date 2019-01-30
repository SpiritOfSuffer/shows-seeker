import axios from 'axios';
import { stat } from 'fs';

const url = 'http://localhost:3000/v1/api/users'; 

class ShowService {
    
    static login(userData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url, userData);
                const status = res.data;
                /* eslint-disable */
                resolve(status);       
            }
            catch(err) {
                reject(err);
            }
        })    
    }
}

export default ShowService;
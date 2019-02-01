import axios from 'axios';

const url = 'http://localhost:3000/v1/api/users/login'; 

class ShowService {
    
    static login(login, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const auth = {
                    login: login,
                    password: password
                }
                const res = await axios.post(url, auth);
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
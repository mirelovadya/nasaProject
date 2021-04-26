
import axios from 'axios';

class UserService {


    //הכנסת משתמש לשרת
    createUser = (userBody) => {
        return axios.post('https://academeez-chat.herokuapp.com/api/users/', userBody).then((responce) => {
            return responce.data;
        })
    }


    //הוצאת כל המשתמשים מהשרת

    fetchUsers = () => {
        return axios.get('https://academeez-chat.herokuapp.com/api/users/').then((responce) => {
            return responce.data;
        })
    }


}


//singeltone שיווצר רק פעם אחת

export default new UserService();

import axios from 'axios';

class MessageService {


    //הכנסת משתמש לשרת
    createMessage = (messageBody) => {
        return axios.post('https://academeez-chat.herokuapp.com/api/messages/', messageBody).then((responce) => {
            return responce.data;
        })
    }


    //הוצאת כל המשתמשים מהשרת

    fetchMessage = () => {
        return axios.get('https://academeez-chat.herokuapp.com/api/messages/').then((responce) => {
            return responce.data
        })
    }


}


//singeltone שיווצר רק פעם אחת

export default new MessageService();
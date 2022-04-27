import Binder from "@/LTE/Core/Helpers/Binder";
import {encrypt, numberToArray, serialize, utf8ToArray} from "@Core/Helpers/utilites";

class Processes extends Binder {
    constructor() {
        super();
    }

    async createTicket(data) {
        let dataCreator = serialize(
            utf8ToArray(data.description),
            numberToArray(data.userId),
            utf8ToArray(data.ticketType),
            numberToArray(data.createJiraIssue)
        );
        this.$socket.emit('listener', await encrypt(...arguments[1], dataCreator));
    }

    createRes(ticketId) {
        console.log(ticketId)
        this.$router.push({name: 'vx.support'})
        this.$notify({text: 'Сообщение отправлено!', type: 'success', duration: 3000, speed: 500})
    }

    async getTicket(ticketId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(ticketId)));
    }

    getTicketRes(res){
        console.log(res, 'res')
    }
}

export default new Processes();
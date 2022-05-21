import Binder from "@/LTE/Core/Helpers/Binder";
import {encrypt, numberToArray} from "@Core/Helpers/utilites";
//import {numberToArray, encrypt, utf8ToArray, serialize, objectToArray} from '@/LTE/Core/Helpers/utilites';

class Dashboard extends Binder {
    constructor() {
        super();
    }

    async get(workerId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(workerId)));
    }

    getRes(data) {
        this.$store.set('WidgetComponents', data);
        this.$store.set('WidgetComponentsDefault', data);
    }
}

export default new Dashboard();
import Binder from "@/LTE/Core/Helpers/Binder";
import {encrypt, numberToArray, serialize, objectToArray} from "@Core/Helpers/utilites";
//import {numberToArray, encrypt, utf8ToArray, serialize, objectToArray} from '@/LTE/Core/Helpers/utilites';

class Widgets extends Binder {
    constructor() {
        super();
    }

    async setWidgetVisible(data) {
        let dataCreator = serialize(
            numberToArray(data.workerId),
            numberToArray(data.widgetId)
        )

        this.$socket.emit('listener', await encrypt(...arguments[1], dataCreator));
    }

    setWidgetVisibleRes(data) {
        console.log(data, 'setWidgetVisibleRes')
    }
    async setWidgetInvisible(data) {
        let dataCreator = serialize(
            numberToArray(data.workerId),
            numberToArray(data.widgetId)
        )

        this.$socket.emit('listener', await encrypt(...arguments[1], dataCreator));
    }

    setWidgetInvisibleRes(data) {
        console.log(data, 'setWidgetVisibleRes')
    }

        async getTapbars(workerId) {
            let dataCreator = serialize(
                numberToArray(workerId)
            )
            this.$socket.emit('listener', await encrypt(...arguments[1], dataCreator));
        }

        getTapbarsRes(data) {
            console.log(data, 'setWidgetVisibleRes')

        }

         async setTapbars(data) {
            let dataCreator = serialize(
                numberToArray(data.workerId),
                objectToArray(data.widgetsArray)
            )

            this.$socket.emit('listener', await encrypt(...arguments[1], dataCreator));
        }

        setTapbarsRes(data) {
            console.log(data, 'setTapbarsRes')

        }

          async setWidgetsOrder(data) {
            let dataCreator = serialize(
                numberToArray(data.workerId),
                objectToArray(data.widgetsArray)
            )

            this.$socket.emit('listener', await encrypt(...arguments[1], dataCreator));
        }

        setWidgetsOrderRes(data) {
            console.log(data, 'setWidgetsOrderRes')

        }
}

export default new Widgets();
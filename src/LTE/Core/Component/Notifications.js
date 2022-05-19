/*eslint-disable*/
import Binder from "@/LTE/Core/Helpers/Binder";
import {
    // concatArrays,
    encrypt,
    utf8ToArray,
    // ed25519,
    serialize,
    // hexToArray,
    // arrayToHex,
    // ecies25519,
    numberToArray,
    objectToArray
} from "@/LTE/Core/Helpers/utilites";

class Notifications extends Binder{
    constructor() {
        super();
    }

    async getNotifications(page) {
        this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(page)));
    }

    getNotificationsRes(notifications) {
        console.log(notifications, 'notifications')
        this.$store.name('Notifications').set('Notifications', notifications);
    }

    async getNotificationCount() {
        this.$socket.emit('listener', await encrypt(...arguments[1]));
    }

    getNotificationCountRes(count) {
        this.$store.name('Notifications').set('NotificationsCount', count);
    }

    async deleteNotification(notificationId) {
        this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(notificationId)));
    }

    deleteNotificationRes(res) {
        console.log(res, 'deleteNotificationRes')
    }

    async deleteAllNotifications() {
        this.$socket.emit('listener', await encrypt(...arguments[1]));
    }

    deleteAllNotificationsRes(){
        console.log(111)
    }

    async readNotifications(notificationIds) {
        this.$socket.emit('listener', await encrypt(...arguments[1], objectToArray(notificationIds)));
    }

    readNotificationsRes(res){
        console.log(res, 'readNotifications')
    }
}

export default new Notifications();
<template>
  <div class="notifications-main-view">
    <div class="main-info">
      <div class="day-block" v-if="notifications.notifications.length">
        <div v-for="(value, name) in notificationsPrepared" :value="value" :name="name">
          <notifications-date :created="name" :length="value.filter(n => n.read === false).length" @onClick="deleteNotifications"/>
          <notify v-for="(notification, notificationKey) in value" :notification="notification" :key="notificationKey"/>
        </div>

      </div>

      <div class="no-notifications-block" v-else>
        <img class="no-notifications-icon" src="@/assets/img/my/empty-notifications.svg">
        <div class="no-notifications-title">Нет новых уведомлений</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Notify from '@/LTE/Singletons/Notifications/facades/Notify'
  import NotificationsDate from "@/LTE/Singletons/Notifications/facades/NotificationsDate";
  import {mapGetters} from "vuex";

  export default {
    name: 'Singleton.Notifications.Notifications',
    components: {
      Notify,
      NotificationsDate
    },
    data() {
      return {
        cats: {
          resource: {
            title: "Ресурсы",
            icon: require('@/assets/img/my/resource.svg'),
            time: "05:45",
            manage: true
          },
          process: {
            title: "Процессы",
            icon: require('@/assets/img/my/process.svg'),
            time: "05:45",
            manage: true
          },
          task: {
            title: "Задачи",
            icon: require('@/assets/img/my/task.svg'),
            time: "05:45",
            manage: true
          },
          storage: {
            title: "Склад Ресурсов",
            icon: require('@/assets/img/my/storage.svg'),
            time: "05:45",
            manage: true
          },
          structure: {
            title: "Структура",
            icon: require('@/assets/img/my/structure.svg'),
            time: "05:45",
            manage: false
          },
          auth: {
            title: "Авторизация",
            time: "05:45",
            manage: false
          },
          entrance: {
            title: "Вход после таймаута",
            time: "05:45",
            manage: false
          },
          number: {
            title: "Изменение тел. номера",
            time: "05:45",
            manage: false
          },
          password: {
            title: "Изменение пароля",
            time: "05:45",
            manage: false
          }
        },
        // notifications: {
        //   notifications: [
        //     {
        //       "id": "da518648-d06a-4526-b1ff-d0d695a61298",
        //       "type": "loginError",
        //       "read": true,
        //       "addressedTo": "Name Lastname",
        //       "createdAt": "2022-04-17 02:54:59",
        //       "message": {
        //         "model": {
        //           "id": null,
        //           "name": null
        //         },
        //         "resource": {
        //           "id": null,
        //           "name": null
        //         },
        //         "deviceTitle": "iPhone 12",
        //         "ip": "31.223.225.14"
        //       }
        //     },
        //     {
        //       "id": "da518648-d06a-4526-b1ff-d0d695a61298",
        //       "type": "newLogin",
        //       "read": false,
        //       "addressedTo": "Name Lastname",
        //       "createdAt": "2022-02-04 02:54:59",
        //       "message": {
        //         "model": {
        //           "id": null,
        //           "name": null
        //         },
        //         "resource": {
        //           "id": null,
        //           "name": null
        //         },
        //         "deviceTitle": "iPhone 12",
        //         "ip": "31.223.225.14"
        //       }
        //     },
        //     {
        //       "id": "7e492ac4-1196-49c4-af53-7a9e3fa538d0",
        //       "type": "phoneUpdated",
        //       "read": false,
        //       "addressedTo": "Name Lastname",
        //       "createdAt": "2022-02-04 05:09:02",
        //       "message": {}
        //     },
        //     {
        //       "id": "da518648-d06a-4526-b1ff-d0d695a61298",
        //       "type": "phoneChangingError",
        //       "read": false,
        //       "addressedTo": "Name Lastname",
        //       "createdAt": "2022-02-04 02:54:59",
        //       "message": {
        //         "model": {
        //           "id": null,
        //           "name": null
        //         },
        //         "resource": {
        //           "id": null,
        //           "name": null
        //         },
        //         "deviceTitle": "iPhone 12",
        //         "ip": "31.223.225.14"
        //       }
        //     },
        //     {
        //       "id": "da518648-d06a-4526-b1ff-d0d695a61298",
        //       "type": "updatePasswordSuccess",
        //       "read": false,
        //       "addressedTo": "Name Lastname",
        //       "createdAt": "2022-02-04 02:54:59",
        //       "message": {
        //         "model": {
        //           "id": null,
        //           "name": null
        //         },
        //         "resource": {
        //           "id": null,
        //           "name": null
        //         },
        //         "deviceTitle": "iPhone 12",
        //         "ip": "31.223.225.14"
        //       }
        //     },
        //     {
        //       "id": "2c080921-894b-4256-8024-05866f13bfe9",
        //       "type": "resourceAssigned",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 06:45:41",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "name"
        //         }
        //       }
        //     },
        //     {
        //       "id": "c4f5c146-a68b-4e15-b26d-8c7b2844d031",
        //       "type": "folderShared",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 06:51:23",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "имя папки"
        //         }
        //       }
        //     },
        //     {
        //       "id": "c4f5c146-a68b-4e15-b26d-8c7b2844d031",
        //       "type": "fileShared",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 06:51:23",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "very_very_long_file_name"
        //         }
        //       }
        //     },
        //     {
        //       "id": "65dd35b9-a6a5-4a3e-b4b0-18003a740c7f",
        //       "type": "processCreated",
        //       "read": true,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 05:21:56",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 9,
        //           "name": "title"
        //         }
        //       }
        //     },
        //     {
        //       "id": "46605bc1-ac4f-459f-a7c4-11132a679422",
        //       "type": "processEdited",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 03:08:15",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 8,
        //           "name": "title"
        //         }
        //       }
        //     },
        //     {
        //       "id": "77a87c7d-961b-4b8c-93c5-534c74478874",
        //       "type": "processAdded",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-15 13:49:46",
        //       "message": {
        //         "model": {
        //           "id": 2,
        //           "name": "Xbxvd Xbxv"
        //         },
        //         "resource": {
        //           "id": 7,
        //           "name": "title"
        //         }
        //       }
        //     },
        //     {
        //       "id": "8eea62f9-675a-4ef7-9645-e86eb5005873",
        //       "type": "taskCreated",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 01:35:20",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "47caf52c-5ae0-41b3-99be-47c5a5f1ea1c",
        //       "type": "taskDone",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:16:00",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "fbaff391-13f4-4cd8-a951-16644ade11be",
        //       "type": "taskEditedWatchers",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:11:27",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "8fb0786f-ec38-4110-841d-44d0752bcb6e",
        //       "type": "taskCommentedWatchers",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:17:46",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "fdfdf4e4-c8d8-48db-b918-7958cbfdcc0b",
        //       "type": "taskEdited",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:11:27",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "0b2380b0-fb55-461f-9dc4-7bde4e1c6850",
        //       "type": "taskRestored",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 07:09:20",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "36da2eef-4928-4213-a7d4-e10c25761072",
        //       "type": "taskDeletedWatchers",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 07:11:07",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "654024fc-537e-4dd3-8f65-b621291a413d",
        //       "type": "taskDeleted",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 07:11:07",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "749ea541-c2c4-4f2e-89ac-5db23e4ad398",
        //       "type": "taskDoneWatchers",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 07:09:09",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "8fb0786f-ec38-4110-841d-44d0752bcb6e",
        //       "type": "taskCommented",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:17:46",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "465a81df-9522-4cea-b488-ab7123f5e0bb",
        //       "type": "taskHoldWatchers",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:14:11",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "494f6e68-8f2f-4937-a2e4-16cddc9b3a94",
        //       "type": "taskHold",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:14:11",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "ab9896cb-6f63-4bf5-93f6-e55eccfccdc0",
        //       "type": "taskSetWatchers",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:11:21",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "b7460237-e5b9-468d-9863-6c5ae9dc38cd",
        //       "type": "taskRestoredWatchers",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 07:09:20",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "c51f4118-3da4-45a2-8716-cc24d96490b5",
        //       "type": "registrationOpened",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-07 17:24:27",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Company name"
        //         },
        //         "resource": {
        //           "id": null,
        //           "name": null
        //         }
        //       }
        //     },
        //     {
        //       "id": "c51f4118-3da4-45a2-8716-cc24d96490b5",
        //       "type": "registrationRejected",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-07 17:24:27",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Company name"
        //         },
        //         "resource": {
        //           "id": null,
        //           "name": null
        //         }
        //       }
        //     },
        //     {
        //       "id": "2c080921-894b-4256-8024-05866f13bfe9",
        //       "type": "resourceAssignedFromWarehouse",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 06:45:41",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "name"
        //         }
        //       }
        //     },
        //     {
        //       "id": "65388868-3fbc-46c7-b5b2-719a1bd2a892",
        //       "type": "resourceRequestApproved",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 07:24:39",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 7,
        //           "name": "name"
        //         }
        //       }
        //     },
        //     {
        //       "id": "312d7c42-1d8d-4cbe-bee3-09fead101b2e",
        //       "type": "resourceRequestDenied",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 07:24:39",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 7,
        //           "name": "name"
        //         }
        //       }
        //     },
        //     {
        //       "id": "cb417e2d-3041-4ae5-8734-23b4c879d5fd",
        //       "type": "newResourceRequest",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-07 16:22:11",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 2,
        //           "name": "Material resource"
        //         }
        //       }
        //     },
        //     {
        //       "id": "e018df92-4c9f-47e1-907c-2a9e47eb17cb",
        //       "type": "newInvite",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 07:28:58",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Arxel"
        //         },
        //         "resource": {
        //           "id": 4,
        //           "name": "Chief of Marketing"
        //         }
        //       }
        //     },
        //     {
        //       "id": "e018df92-4c9f-47e1-907c-2a9e47eb17cb",
        //       "type": "deleteFromUnit",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 07:28:58",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Arxel"
        //         },
        //         "resource": {
        //           "id": 4,
        //           "name": "Chief of Marketing"
        //         }
        //       }
        //     },
        //     {
        //       "id": "8c48052e-7968-4e98-a4f3-d3419dfed88d",
        //       "type": "inviteDeclined",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-07 17:27:19",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 2,
        //           "name": "Executor"
        //         }
        //       }
        //     },
        //     {
        //       "id": "c51f4118-3da4-45a2-8716-cc24d96490b5",
        //       "type": "inviteAccepted",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-07 17:24:27",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 2,
        //           "name": "Executor"
        //         }
        //       }
        //     },
        //     {
        //       "id": "8eea62f9-675a-4ef7-9645-e86eb5005873",
        //       "type": "taskCreated",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 01:35:20",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "47caf52c-5ae0-41b3-99be-47c5a5f1ea1c",
        //       "type": "taskDone",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:16:00",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "fbaff391-13f4-4cd8-a951-16644ade11be",
        //       "type": "taskEditedWatchers",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:11:27",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "8fb0786f-ec38-4110-841d-44d0752bcb6e",
        //       "type": "taskCommentedWatchers",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:17:46",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "fdfdf4e4-c8d8-48db-b918-7958cbfdcc0b",
        //       "type": "taskEdited",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:11:27",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "0b2380b0-fb55-461f-9dc4-7bde4e1c6850",
        //       "type": "taskRestored",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 07:09:20",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "36da2eef-4928-4213-a7d4-e10c25761072",
        //       "type": "taskDeletedWatchers",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 07:11:07",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "749ea541-c2c4-4f2e-89ac-5db23e4ad398",
        //       "type": "taskDoneWatchers",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 07:09:09",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "654024fc-537e-4dd3-8f65-b621291a413d",
        //       "type": "taskDeleted",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 07:11:07",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "8fb0786f-ec38-4110-841d-44d0752bcb6e",
        //       "type": "taskCommented",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:17:46",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "465a81df-9522-4cea-b488-ab7123f5e0bb",
        //       "type": "taskHoldWatchers",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:14:11",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "494f6e68-8f2f-4937-a2e4-16cddc9b3a94",
        //       "type": "taskHold",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:14:11",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "ab9896cb-6f63-4bf5-93f6-e55eccfccdc0",
        //       "type": "taskSetWatchers",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 02:11:21",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": ""
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //     {
        //       "id": "b7460237-e5b9-468d-9863-6c5ae9dc38cd",
        //       "type": "taskRestoredWatchers",
        //       "read": false,
        //       "addressedTo": "Arxel · CEO",
        //       "createdAt": "2022-02-04 07:09:20",
        //       "message": {
        //         "model": {
        //           "id": 1,
        //           "name": "Name Lastname"
        //         },
        //         "resource": {
        //           "id": 1,
        //           "name": "Task 2"
        //         }
        //       }
        //     },
        //   ]
        // },
        readNotifications: []
      };
    },
    // props: {
    //   notifications: {
    //     type: Object,
    //     required: true
    //   }
    // },
    computed: {
      ...mapGetters({
        notifications: 'Notifications/getNotifications',
      }),
      notificationsPrepared() {
        const notifications = Object.create({});
        this.notifications.notifications.map(notify => {
          if (!notifications.hasOwnProperty(notify.createdAt.substr(0, 10))){
            notifications[notify.createdAt.substr(0, 10)] = []
          }

          notifications[notify.createdAt.substr(0, 10)].push(notify)
        })

        return notifications
      },
    },
    methods: {
      deleteNotifications({key}){
        this.notificationsPrepared[key].map(notification => {
          this.$core.execViaComponent('Notifications', 'deleteNotification', notification.id)
        })
        this.notifications.notifications.map(notification => this.readNotifications.push(notification.id))
        this.$core.execViaComponent('Notifications', 'readNotifications', this.readNotifications);
      }
    },
    created() {
      // this.$core.execViaComponent('Notifications', 'getNotifications', 1);
    },
    // updated() {
    //   this.notifications.notifications.map(notification => this.readNotifications.push(notification.id))
    //   this.$core.execViaComponent('Notifications', 'readNotifications', this.readNotifications);
    // }
  } 
</script>

<style lang="scss" scoped>
  .notifications-main-view {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    padding: rem(24) rem(20);
    .main-info {
      height: 100%;
      overflow-y: scroll;
      .day-block {
        margin-bottom: 24px;
        .facade-date-box {
          margin-bottom: 4px;
        }
      }

      .no-notifications-block {
        text-align: center;
        .no-notifications-icon {
          margin-bottom: 10px;
        }
        .no-notifications-title {
          font-weight: 600;
          font-size: rem(17);
          line-height: rem(22);
          color: $grey-scale-300;
        }
      }
    }
  }
</style>
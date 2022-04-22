
export default {
    namespaced: true,
    state: {
        sidebarFilterStatus: false,
        sidebarAssignStatus: false,
        sidebarFolderAccessStatus: false,
        levels: [
            {
                level: 1,
                disable: false,
                levelChecked: false,
                data: [
                    {
                        unitLevel: 1,
                        unitData: {
                            id: 1,
                            name: 'Александр',
                            lastname: 'Ким',
                            avatar: null
                        },
                        unitPosition: 'big boss',
                        unitChecked: false,
                        materialResources: [
                            {
                                id: 1,
                                name : 'Монитор HP Horus 27 inc.',
                                number: 'ABK2921BDSFLBS',
                                description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
                                owner: {
                                    name: 'Sharashkina Kontora',
                                    avatar: require('@/assets/img/my/process.svg')
                                },
                                price: '3000'
                            }
                        ]
                    },
                ]
            },
            {
                level: 2,
                disable: true,
                levelChecked: false,
                data: [
                    {
                        unitLevel: 2,
                        unitData: {
                            id: 2,
                            name: 'Александр',
                            lastname: 'Ким',
                            avatar: null
                        },
                        unitPosition: 'big boss',
                        unitChecked: false,
                        materialResources: [
                            {
                                id: 1,
                                name : 'Монитор HP Horus 27 inc.',
                                number: 'ABK2921BDSFLBS',
                                description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
                                owner: {
                                    name: 'Sharashkina Kontora',
                                    avatar: require('@/assets/img/my/process.svg')
                                },
                                price: '3000'
                            }
                        ]
                    },
                    {
                        unitLevel: 2,
                        unitData: {
                            id: 3,
                            name: 'Александр',
                            lastname: 'Ким',
                            avatar: null
                        },
                        unitPosition: 'big boss',
                        unitChecked: false,
                        materialResources: [
                            {
                                id: 1,
                                name : 'Монитор HP Horus 27 inc.',
                                number: 'ABK2921BDSFLBS',
                                description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
                                owner: {
                                    name: 'Sharashkina Kontora',
                                    avatar: require('@/assets/img/my/process.svg')
                                },
                                price: '3000'
                            }
                        ]
                    },
                ]
            },
            {
                level: 3,
                disable: true,
                levelChecked: false,
                data: [
                    {
                        unitLevel: 3,
                        unitData: {
                            id: 4,
                            name: 'Александр',
                            lastname: 'Ким',
                            avatar: null
                        },
                        unitPosition: 'big boss',
                        unitChecked: false,
                        materialResources: [
                            {
                                id: 1,
                                name : 'Монитор HP Horus 27 inc.',
                                number: 'ABK2921BDSFLBS',
                                description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
                                owner: {
                                    name: 'Sharashkina Kontora',
                                    avatar: require('@/assets/img/my/process.svg')
                                },
                                price: '3000'
                            }
                        ]
                    },
                    {
                        unitLevel: 3,
                        unitData: {
                            id: 5,
                            name: 'Александр',
                            lastname: 'Ким',
                            avatar: null
                        },
                        unitPosition: 'big boss',
                        unitChecked: false,
                        materialResources: [
                            {
                                id: 1,
                                name : 'Монитор HP Horus 27 inc.',
                                number: 'ABK2921BDSFLBS',
                                description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
                                owner: {
                                    name: 'Sharashkina Kontora',
                                    avatar: require('@/assets/img/my/process.svg')
                                },
                                price: '3000'
                            }
                        ]
                    },
                ]
            },
            {
                level: 4,
                disable: true,
                levelChecked: false,
                data: [
                    {
                        unitLevel: 4,
                        unitData: {
                            id: 6,
                            name: 'Александр',
                            lastname: 'Ким',
                            avatar: null
                        },
                        unitPosition: 'big boss',
                        unitChecked: false,
                        materialResources: [
                            {
                                id: 1,
                                name : 'Монитор HP Horus 27 inc.',
                                number: 'ABK2921BDSFLBS',
                                description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
                                owner: {
                                    name: 'Sharashkina Kontora',
                                    avatar: require('@/assets/img/my/process.svg')
                                },
                                price: '3000'
                            }
                        ]
                    },
                    {
                        unitLevel: 4,
                        unitData: {
                            id: 7,
                            name: 'Александр',
                            lastname: 'Ким',
                            avatar: null
                        },
                        unitPosition: 'big boss',
                        unitChecked: false,
                        materialResources: [
                            {
                                id: 1,
                                name : 'Монитор HP Horus 27 inc.',
                                number: 'ABK2921BDSFLBS',
                                description: 'Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения',
                                owner: {
                                    name: 'Sharashkina Kontora',
                                    avatar: require('@/assets/img/my/process.svg')
                                },
                                price: '3000'
                            }
                        ]
                    },
                ]
            }
        ],
        materialResources: [],
        creatorMaterialResource: {
            name: '',
            description: '',
            identifier: '',
            workerId: null,
            cost: '',
            currency: 'UAH',
            companyId: null,
            // fileIds: [],
            // imageIds: []
        },
        structure: {},
        chosenUser: {}
    },
    getters: {
        sidebarFilterStatus: (state) => state.sidebarFilterStatus,
        sidebarAssignStatus: (state) => state.sidebarAssignStatus,
        sidebarFolderAccessStatus: (state) => state.sidebarFolderAccessStatus,
        levels: (state) => state.levels,
        materialResources: (state) => state.materialResources,
        chosenUser: (state) => state.chosenUser,

        getCreatorMaterialResource: (state) => state.creatorMaterialResource,
        getStructure: (state) => state.structure
    },
    mutations: {
        showSidebar: (state) => state.sidebarFilterStatus = true,
        closeSidebar: (state) => state.sidebarFilterStatus = false,
        showSidebarAssign: (state) => state.sidebarAssignStatus = true,
        closeSidebarAssign: (state) => state.sidebarAssignStatus = false,
        showSidebarFolderAccess: (state) => state.sidebarFolderAccessStatus = true,
        closeSidebarFolderAccess: (state) => state.sidebarFolderAccessStatus = false,
        getChosenUnits: (state) => {
            state.levels.map(level => level.data.filter(unit => unit.unitChecked === true))
        },
        getConfirmedUser: (state, payload) => state.chosenUser = payload,
        // setCreatorMaterialResource: (state, payload) => state.creatorMaterialResource[payload[0]] = payload[1],
        setCreatorMaterialResource: (state, payload) => {
            console.log(payload[0], payload[1])
            state.creatorMaterialResource[payload[0]] = payload[1];
        },
        setMaterialResources: (state, payload) => state.materialResources = payload,
        setStructure: (state, payload) => state.structure = payload,
        clear: (state) => {
            state.creatorMaterialResource = {
                name: '',
                description: '',
                identifier: '',
                workerId: null,
                cost: '',
                currency: 'UAH',
                companyId: null,
                // fileIds: [],
                // imageIds: []
            }
        },
    },
}

// {
//     "id": 1,
//     "name": "Монитор HP Horus 27 inc.",
//     "description": "Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения",
//     "identifier": "1234251",
//     "worker": {
//     "id": 1,
//         "name": "Дмитрий",
//         "lastname": "Соколов",
//         "avatar": null,
//         "unitName": "CEO",
//         "unitLevel": 1
// },
//     "cost": 100,
//     "currency": "USD",
//     "company": {
//     "id": 1,
//         "name": "Arxel",
//         "avatar": null
// },
//     "files": [
//     {
//         "id": 1,
//         "size": 123,
//         "label": "blabla",
//         "extension": "zip",
//         "date": "10.20.2021"
//     },
//     {
//         "id": 2,
//         "size": 124,
//         "label": "ololol",
//         "extension": "awe",
//         "date": "06.03.2018"
//     }
// ],
//     "isLocal": true
// },
// {
//     "id": 2,
//     "name": "Монитор HP Horus 27 inc.",
//     "description": "Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения",
//     "identifier": "12342511",
//     "worker": {
//     "id": 5,
//         "name": "Дмитрий",
//         "lastname": "Соколов",
//         "avatar": null,
//         "unitName": "Chief of Marketing",
//         "unitLevel": 3
// },
//     "cost": 100,
//     "currency": "USD",
//     "company": {
//     "id": 1,
//         "name": "Arxel",
//         "avatar": null
// },
//     "files": [
//     {
//         "id": 1,
//         "size": 123,
//         "label": "blabla",
//         "extension": "awe",
//         "date": "10.20.2021"
//     },
//     {
//         "id": 2,
//         "size": 124,
//         "label": "ololol",
//         "extension": "awe",
//         "date": "06.03.2018"
//     }
// ],
//     "images": [],
//     "isLocal": false
// },
// {
//     "id": 3,
//     "name": "iMac 27 inch. 2015",
//     "description": "Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения",
//     "identifier": "12342",
//     "worker": {
//     "id": 6,
//         "name": "Дмитрий",
//         "lastname": "Соколов",
//         "avatar": null,
//         "unitName": "Космонавт",
//         "unitLevel": 4
// },
//     "cost": 100,
//     "currency": "USD",
//     "company": {
//     "id": 1,
//         "name": "Arxel",
//         "avatar": null
// },
//     "files": [
//     {
//         "id": 1,
//         "size": 123,
//         "label": "blabla",
//         "extension": "zip",
//         "date": "10.20.2021"
//     },
//     {
//         "id": 2,
//         "size": 124,
//         "label": "ololol",
//         "extension": "awe",
//         "date": "06.03.2018"
//     }
// ],
//     "images": [],
//     "isLocal": false
// },
// {
//     "id": 4,
//     "name": "Монитор HP Horus 27 inc.",
//     "description": "Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения",
//     "identifier": "12345",
//     "worker": {
//     "id": 3,
//         "name": "Дмитрий",
//         "lastname": "Соколов",
//         "avatar": null,
//         "unitName": "Chief of Marketing",
//         "unitLevel": 2
// },
//     "cost": 100,
//     "currency": "USD",
//     "company": {
//     "id": 1,
//         "name": "Arxel",
//         "avatar": null
// },
//     "files": [
//     {
//         "id": 1,
//         "size": 123,
//         "label": "blabla",
//         "extension": "awe",
//         "date": "10.20.2021"
//     },
//     {
//         "id": 2,
//         "size": 124,
//         "label": "ololol",
//         "extension": "awe",
//         "date": "06.03.2018"
//     }
// ],
//     "images": [],
//     "isLocal": false
// },
// {
//     "id": 5,
//     "name": "iMac 27 inch. 2015",
//     "description": "Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения",
//     "identifier": "1234251",
//     "worker": {
//     "id": 1,
//         "name": "Дмитрий",
//         "lastname": "Соколов",
//         "avatar": null,
//         "unitName": "CEO",
//         "unitLevel": 1
// },
//     "cost": 100,
//     "currency": "USD",
//     "company": {
//     "id": 1,
//         "name": "Arxel",
//         "avatar": null
// },
//     "files": [
//     {
//         "id": 1,
//         "size": 123,
//         "label": "blabla",
//         "extension": "awe",
//         "date": "10.20.2021"
//     },
//     {
//         "id": 2,
//         "size": 124,
//         "label": "ololol",
//         "extension": "awe",
//         "date": "06.03.2018"
//     }
// ],
//     "isLocal": true
// },
// {
//     "id": 6,
//     "name": "iMac 27 inch. 2015",
//     "description": "Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения",
//     "identifier": "12342511",
//     "worker": {
//     "id": 5,
//         "name": "Дмитрий",
//         "lastname": "Соколов",
//         "avatar": null,
//         "unitName": "Космонавт",
//         "unitLevel": 3
// },
//     "cost": 100,
//     "currency": "USD",
//     "company": {
//     "id": 1,
//         "name": "Arxel",
//         "avatar": null
// },
//     "files": [
//     {
//         "id": 1,
//         "size": 123,
//         "label": "blabla",
//         "extension": "awe",
//         "date": "10.20.2021"
//     },
//     {
//         "id": 2,
//         "size": 124,
//         "label": "ololol",
//         "extension": "awe",
//         "date": "06.03.2018"
//     }
// ],
//     "images": [],
//     "isLocal": false
// },
// {
//     "id": 7,
//     "name": "Молоток",
//     "description": "Простой для понимания документ - документ, не требующий усилий для чтения и понимания, т.е. при изложении материала не используются сложные предложения",
//     "identifier": "12342",
//     "worker": {
//     "id": 6,
//         "name": "Дмитрий",
//         "lastname": "Соколов",
//         "avatar": null,
//         "unitName": "Космонавт",
//         "unitLevel": 4
// },
//     "cost": 100,
//     "currency": "USD",
//     "company": {
//     "id": 1,
//         "name": "Arxel",
//         "avatar": null
// },
//     "files": [
//     {
//         "id": 1,
//         "size": 123,
//         "label": "blabla",
//         "extension": "awe",
//         "date": "10.20.2021"
//     },
//     {
//         "id": 2,
//         "size": 124,
//         "label": "ololol",
//         "extension": "awe",
//         "date": "06.03.2018"
//     }
// ],
//     "images": [],
//     "isLocal": false
// },
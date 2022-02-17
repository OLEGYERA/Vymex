import Process from "./app";
import Main from "./view/Main";
import CompanyProcesses from "./view/CompanyProcesses";
import SelectedProcess from "./view/SelectedProcess";
// import NewFolder from "./view/NewFolder";
// import EmptyFolder from "./view/EmptyFolder";
// import StructuralUnits from "./view/StructuralUnits";
// import MaterialResources from "./view/MaterialResources";
// import CreateResource from "./view/CreateResource";
// import ResourceEditing from "./view/ResourceEditing";
// import ResourceInfo from "./view/ResourceInfo";
// import IntangibleResources from "./view/IntangibleResources";
// import CreateIntangibleResource from "./view/CreateIntangibleResource";

export default [
    {
        path: 'processes',
        component: Process,
         children: [
             {
                path: '/',
                component: Main,
                name: 'vx.process',
            },
            {
                path: 'company-processes',
                component: CompanyProcesses,
                name: 'vx.process.company.processes',
            },
            {
                path: 'selected-process',
                component: SelectedProcess,
                name: 'vx.resource.selected.process',
            },
        //     {
        //         path: 'empty-folder',
        //         component: EmptyFolder,
        //         name: 'vx.resource.empty.folder',
        //     },
        //     {
        //         path: 'structural-units',
        //         component: StructuralUnits,
        //         name: 'vx.resource.structural.units',
        //     },
        //     {
        //         path: 'material-resources',
        //         component: MaterialResources,
        //         name: 'vx.resource.material.resources',
        //     },
        //     {
        //         path: 'create-resource',
        //         component: CreateResource,
        //         name: 'vx.resource.create.resource',
        //     },
        //     {
        //         path: 'resource-info',
        //         component: ResourceInfo,
        //         name: 'vx.resource.info',
        //     },
        //     {
        //         path: 'resource-editing',
        //         component: ResourceEditing,
        //         name: 'vx.resource.editing',
        //     },
        //     {
        //         path: 'intangible-resources',
        //         component: IntangibleResources,
        //         name: 'vx.resource.intangible.resources',
        //     },
        //     {
        //         path: 'create-intangible-resource',
        //         component: CreateIntangibleResource,
        //         name: 'vx.resource.create.intangible.resource',
        //     },
         ]
    },

]
import Resources from "./app";
import Main from "./view/Main";
import WorkerFiles from "./view/WorkerFiles";
import NewFolder from "./view/NewFolder";
import EmptyFolder from "./view/EmptyFolder";
import StructuralUnits from "./view/StructuralUnits";
import MaterialResources from "./view/MaterialResources";
import CreateResource from "./view/CreateResource";
import ResourceEditing from "./view/ResourceEditing";
import ResourceInfo from "./view/ResourceInfo";
import IntangibleResources from "./view/IntangibleResources";
import CreateIntangibleResource from "./view/CreateIntangibleResource";

export default [
    {
        path: 'resources',
        component: Resources,
        children: [
        {
            path: '/',
            component: Main,
            name: 'vx.resource',
        },
        {
            path: 'worker-files',
            component: WorkerFiles,
            name: 'vx.resource.worker.files',
        },
        {
            path: 'new-folder',
            component: NewFolder,
            name: 'vx.resource.new.folder',
        },
        {
            path: 'empty-folder',
            component: EmptyFolder,
            name: 'vx.resource.empty.folder',
        },
        {
            path: 'structural-units',
            component: StructuralUnits,
            name: 'vx.resource.structural.units',
        },
        {
            path: 'material-resources',
            component: MaterialResources,
            name: 'vx.resource.material.resources',
        },
        {
            path: 'create-resource',
            component: CreateResource,
            name: 'vx.resource.create.resource',
        },
        {
            path: 'resource-info',
            component: ResourceInfo,
            name: 'vx.resource.info',
        },
        {
            path: 'resource-editing',
            component: ResourceEditing,
            name: 'vx.resource.editing',
        },
        {
            path: 'intangible-resources',
            component: IntangibleResources,
            name: 'vx.resource.intangible.resources',
        },
        {
            path: 'create-intangible-resource',
            component: CreateIntangibleResource,
            name: 'vx.resource.create.intangible.resource',
        },
        ]
    },

]
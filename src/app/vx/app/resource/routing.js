import Resources from "./app";
import Main from "./view/Main";
import WorkerFiles from "./view/WorkerFiles";
import NewFolder from "./view/NewFolder";
import EmptyFolder from "./view/EmptyFolder";
import StructuralUnits from "./view/StructuralUnits";
import MaterialResources from "./view/MaterialResources";
import CreateResource from "./view/CreateMaterialResource";
import ResourceEditing from "./view/MaterialResourceEditing";
import ResourceInfo from "./view/MaterialResourceInfo";
import IntangibleResources from "./view/IntangibleResources";
import CreateIntangibleResource from "./view/CreateIntangibleResource";
import IntangibleResourceInfo from "./view/IntangibleResourceInfo";
import IntangibleResourceEditing from "./view/IntangibleResourceEditing";
import TrashFolder from "./view/TrashFolder";

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
        {
            path: 'intangible-resource-info',
            component: IntangibleResourceInfo,
            name: 'vx.resource.intangible.resource.info',
        },
        {
            path: 'intangible-resource-editing',
            component: IntangibleResourceEditing,
            name: 'vx.resource.intangible.resource.editing',
        },
        {
            path: 'trash-folder',
            component: TrashFolder,
            name: 'vx.resource.trash.folder',
        },
        ]
    },

]
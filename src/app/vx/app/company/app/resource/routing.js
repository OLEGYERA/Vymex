import Resources from "./app";
import Main from "./view/main";
import WorkerFiles from "./view/worker.files";
import NewFolder from "./view/new.folder";
import EmptyFolder from "./view/empty.folder";
import StructuralUnits from "./view/structural.units";
import MaterialResources from "./view/material.resources";
import CreateResource from "./view/create.material.resource";
import ResourceEditing from "./view/material.resource.editing";
import ResourceInfo from "./view/material.resource.info";
import IntangibleResources from "./view/intangible.resources";
import CreateIntangibleResource from "./view/create.intangible.resource";
import IntangibleResourceInfo from "./view/intangible.resource.info";
import IntangibleResourceEditing from "./view/intangible.resource.editing";
import TrashFolder from "./view/trash.folder";

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
            path: 'new-folder/:id',
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
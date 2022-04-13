import Process from "./app";
import Main from "./view/Main";
import CompanyProcesses from "./view/CompanyProcesses";
import SelectedProcess from "./view/SelectedProcess";
import CreateProcess from "./view/CreateProcess";

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
                name: 'vx.process.selected.process',
            },
             {
                path: 'create-process',
                component: CreateProcess,
                name: 'vx.process.create.process',
            },
         ]
    },

]
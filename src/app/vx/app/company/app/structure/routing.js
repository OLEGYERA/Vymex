import Structure from "./app";
import Main from "./view/Main";
import CreateUnit from './view/CreateUnit'

export default [
	{
		path: 'structure',
		component: Structure,
		children: [
			{
				path: '/',
				component: Main,
				name: 'vx.structure',
			},
			{
				path: 'create-unit',
				component: CreateUnit,
				name: 'vx.structure.createUnit',
			},
		]
	},

]
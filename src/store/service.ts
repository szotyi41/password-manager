import { withModifiers } from 'vue';
import { Module } from 'vuex';
import { IFolder } from './models/folder';
import { IService } from './models/service';
import { IType } from './models/type';

import { ObjectID } from 'bson';
import axios from './axios';

export interface IServiceState {
	folders: Array<IFolder>;
	types: Array<IType>;
	services: Array<IService>;
	currentService: IService | null;
	dragService: IService | null;
}

export const DefaultServiceState: IServiceState = {
	types: [
		{ name: 'apache2' },
		{ name: 'htaccess' },
		{ name: 'mongodb' },
		{ name: 'gitlab' },
		{ name: 'git' },
	],
	folders: [{ id: '1212', name: 'Forpsi servers' }],
	services: [],
	currentService: null,
	dragService: null,
};

const ServiceStore: Module<any, any> = {
	namespaced: true,
	state: DefaultServiceState,
	getters: {},
	mutations: {
		// Service
		setServices(state: IServiceState, services: Array<IService>) {
			state.services = services;
		},
		setCurrentService(state: IServiceState, service: IService) {
			state.services = state.services.map(
				(service: IService): IService => ({ ...service, opened: false })
			);
			service.opened = true;
			state.currentService = service;
			this.commit('service/setService', service);
		},
		setDragService(state: IServiceState, service: IService) {
			state.dragService = service;
		},
		toggleFavoriteService(state: IServiceState, service: IService) {
			service = { ...service, favorite: !service.favorite };
			this.commit('service/setService', service);
		},
		setService(state: IServiceState, service: IService) {
			const index = state.services
				.map((s: IService) => s._id)
				.indexOf(service._id);
			state.services[index] = service;
			if (
				state.currentService !== null &&
				state.currentService._id == service._id
			) {
				state.currentService = service;
			}
		},
		removeService(state: IServiceState, service: IService) {
			const index = state.services
				.map((s: IService) => s._id)
				.indexOf(service._id);
			this.$delete(state.services, index);
		},

		// Folder
		createFolder(state: IServiceState, folder: IFolder) {
			state.folders.push(folder);
		},
		putServiceToFolder(state: IServiceState, { service, folderId }) {
			service = { ...service, infolder: [...service.infolder, folderId] };
			this.commit('service/setService', service);
		},
	},
	actions: {
		// Service
		getServices({ state, commit }) {
			return axios.get('/service').then((response) => {
				const services: Array<IService> = response.data;
				commit('setServices', services);
			});
		},
		saveService({ state, commit }, service: IService) {
			return axios.post('/service', service).then((response) => {
				const service: IService = response.data;
				commit('setService', service);
			});
		},
		favoriteService({ state, commit }, service: IService) {
			return axios
				.post('/service/favorite/' + service._id)
				.then((response) => {
					const service: IService = response.data;
					commit('toggleFavoriteService', service);
				});
		},
		removeService({ state, commit }, service: IService) {
			return axios.delete('/service/' + service._id).then((response) => {
				commit('removeService', service);
			});
		},

		// Folder
		createFolder({ state, commit }, folderName: String) {
			commit('createFolder', { id: 12, name: folderName });
		},
		putServiceToFolder({ state, commit }, folderId) {
			commit('putServiceToFolder', {
				service: state.dragService,
				folderId: folderId,
			});
		},
	},
};

export default ServiceStore;

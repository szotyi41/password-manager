import { Module } from 'vuex';
import { IFolder } from './models/folder';
import { IService } from './models/service';
import { IType } from './models/type';

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
        { name: 'mongodb' },
        { name: 'gitlab' },
        { name: 'git' }
    ],
    folders: [
        { id: '1212', name: 'Forpsi servers' }
    ],
    services: [
        {id: '0', title: 'Apache2', type: 'apache2', icon: 'apache', favorite: false, infolder: []},
        {id: '1', title: 'Mongo', type: 'mongodb', icon: 'mongodb', favorite: false, infolder: []},
        {id: '2', title: 'Gitlab', type: 'gitlab', icon: 'gitlab', favorite: false, infolder: []}
    ],
    currentService: {id: '0', title: 'Apache2', type: 'apache2', icon: 'apache', favorite: false, infolder: []},
    dragService: null
}

const ServiceStore: Module<any, any> = {
    namespaced: true,
    state: DefaultServiceState,
    getters: {},
    mutations: {

        // Service
        setCurrentService(state: IServiceState, service: IService) {
            state.services = state.services.map((service: IService): IService => ({...service, opened: false}));
            service.opened = true;
            state.currentService = service;
            this.commit('service/setService', service);
        },
        setDragService(state: IServiceState, service: IService) {
            state.dragService = service;
        },
        toggleServiceFavorite(state: IServiceState, service: IService) {
            service = { ...service, favorite: !service.favorite };
            this.commit('service/setService', service);
        },
        setService(state: IServiceState, service: IService) {
            const index = state.services.map((s: IService) => s.id).indexOf(service.id);
            state.services[index] = service;
            if (state.currentService !== null && state.currentService.id == service.id) {
                state.currentService = service;
            }
        },

        // Folder
        createFolder(state: IServiceState, folder: IFolder) {
            state.folders.push(folder);
        },
        putServiceToFolder(state: IServiceState, { service, folderId }) {
            service = {...service, infolder: [...service.infolder, folderId]};
            this.commit('service/setService', service);
        }
    },
    actions: {

        // Folder
        createFolder({ state, commit }, folderName: String) {
            commit('createFolder', { id: 12, name: folderName })
        },
        putServiceToFolder({ state, commit }, folderId) {
            commit('putServiceToFolder', { service: state.dragService, folderId: folderId });
        }
    }
} 

export default ServiceStore;
import { Module } from 'vuex';

export interface IFolder {
    id?: String;
    title?: String;
}

export interface IService {
    id?: String;
    title?: String;
    type?: String;
    favorite?: Boolean;
    notes?: String;
    icon?: String;
    infolder?: Array<String>;
}

export interface IApacheService extends IService {
    username?: String;
    password?: String;
}

export interface IMongoService extends IService {
    username?: String;
    password?: String;
}

export interface IServiceState {
    folders: Array<IFolder>;
    services: Array<IService>;
    currentService: IService;
    dragService: IService;
}

export const DefaultServiceState: IServiceState = {
    folders: [
        { id: '1212', title: 'Forpsi servers' }
    ],
    services: [
        {id: '0', title: 'Apache2', type: 'apache2', icon: 'apache', favorite: false, infolder: []},
        {id: '1', title: 'Mongo', type: 'mongodb', icon: 'mongodb', favorite: false, infolder: []},
        {id: '2', title: 'Gitlab', type: 'gitlab', icon: 'gitlab', favorite: false, infolder: []}
    ],
    currentService: {},
    dragService: {}
}

const ServiceStore: Module<any, any> = {
    namespaced: true,
    state: DefaultServiceState,
    getters: {},
    mutations: {
        setCurrentService(state: IServiceState, service: IService) {
            state.currentService = service;
        },
        setDragService(state: IServiceState, service: IService) {
            state.dragService = service;
        },
        toggleServiceFavorite(state: IServiceState, service: IService) {
            const index = state.services.map((s: IService) => s.id).indexOf(service.id);
            service = { ...service, favorite: !service.favorite };
            
            state.services[index] = service;
            
            if (state.currentService.id == service.id) {
                state.currentService = { ...service, favorite: !service.favorite };
            }
        },
        putServiceToFolder(state: IServiceState, { service, folderId }) {
            const index = state.services.map((s: IService) => s.id).indexOf(service.id);
            service.infolder.push(folderId);

            state.services[index] = service; 

            if (state.currentService.id == service.id) {
                state.currentService = service;
            }
        }
    },
    actions: {
        putServiceToFolder({ state, commit }, folderId) {
            commit('putServiceToFolder', { service: state.dragService, folderId: folderId });
        }
    }
} 

export default ServiceStore;
import { createStore } from 'vuex';
import serviceStore from './service';

export default createStore({
  modules: {
    service: serviceStore
  }
})

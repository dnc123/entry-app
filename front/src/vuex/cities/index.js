import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const CITIES_NAMESPACE = 'cities';

export default {
    [CITIES_NAMESPACE]: {
        namespaced: true,
        state,
        getters,
        actions,
        mutations,
    },
}

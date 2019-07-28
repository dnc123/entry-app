import {getCities} from '../../../apis/cities';
import {CITIES_MUTATION_TYPES} from './mutations';
import {CITIES_GETTER_TYPES} from './getters';

export const CITIES_ACTION_TYPES = {
    LOAD: 'LOAD',
    LOAD_ALL: 'LOAD_ALL',
    SET_ACTIVE_PAGE: 'SET_ACTIVE_PAGE',
    CACHE_NEIGHBOR_PAGES: 'CACHE_NEIGHBOR_PAGES',
    SET_ALL_CITIES_LOADED: 'SET_ALL_CITIES_LOADED',
    SORT_BY: 'SORT_BY',
    SET_PREVIEW_MODE: 'SET_PREVIEW_MODE',
    TOGGLE_PREVIEW_MODE: 'TOGGLE_PREVIEW_MODE',
};

export default {
    [CITIES_ACTION_TYPES.LOAD_ALL]({commit, getters}) {
        return getCities(
            0,
            true,
            getters[CITIES_GETTER_TYPES.SORT].column,
            getters[CITIES_GETTER_TYPES.SORT].orderAsc
        ).then(({cities, totalPages}) => {
            commit(CITIES_MUTATION_TYPES.SET_TOTAL_PAGES, totalPages);
            commit(CITIES_MUTATION_TYPES.SET_CITIES, cities);
        });
    },

    [CITIES_ACTION_TYPES.LOAD]({commit, getters}, pageToLoad) {
        const TARGET_PAGE_TO_LOAD = pageToLoad ? pageToLoad : getters[CITIES_GETTER_TYPES.ACTIVE_PAGE_NUMBER];

        return getCities(
            TARGET_PAGE_TO_LOAD,
            false,
            getters[CITIES_GETTER_TYPES.SORT].column,
            getters[CITIES_GETTER_TYPES.SORT].orderAsc
        ).then(({cities, totalPages}) => {
            commit(CITIES_MUTATION_TYPES.SET_TOTAL_PAGES, totalPages);
            commit(CITIES_MUTATION_TYPES.ADD_CITIES_PAGE, {
                pageNumber: TARGET_PAGE_TO_LOAD,
                cities,
            });
        });
    },

    [CITIES_ACTION_TYPES.SET_ACTIVE_PAGE]({commit}, newActivePage) {
        commit(CITIES_MUTATION_TYPES.SET_ACTIVE_PAGE, newActivePage);
    },

    [CITIES_ACTION_TYPES.CACHE_NEIGHBOR_PAGES]({getters, dispatch}) {
        const pagesToCache = [
            getters[CITIES_GETTER_TYPES.PREVIOUS_PAGE],
            getters[CITIES_GETTER_TYPES.NEXT_PAGE],
        ];

        pagesToCache.forEach(pageToCache => {
            const IS_PAGE_CACHED = !!getters[CITIES_GETTER_TYPES.CITIES][pageToCache];

            if (!IS_PAGE_CACHED) {
                dispatch(CITIES_ACTION_TYPES.LOAD, pageToCache);
            }
        });
    },

    [CITIES_ACTION_TYPES.SET_ALL_CITIES_LOADED]({commit}, newState) {
        commit(CITIES_MUTATION_TYPES.SET_ALL_CITIES_LOADED, newState);
    },

    async [CITIES_ACTION_TYPES.SORT_BY]({commit, dispatch, getters}, sortBy) {
        commit(CITIES_MUTATION_TYPES.SORT_BY, sortBy);
        commit(CITIES_MUTATION_TYPES.SET_CITIES, {});
        commit(CITIES_MUTATION_TYPES.SET_ACTIVE_PAGE, 0);
        commit(CITIES_MUTATION_TYPES.SET_ALL_CITIES_LOADED, false);

        await dispatch(
            getters[CITIES_GETTER_TYPES.IS_PREVIEW_MODE_PAGINATION]
                ? CITIES_ACTION_TYPES.LOAD
                : CITIES_ACTION_TYPES.LOAD_ALL
        );
        dispatch(CITIES_ACTION_TYPES.CACHE_NEIGHBOR_PAGES);
    },

    [CITIES_ACTION_TYPES.SET_PREVIEW_MODE]({commit}, newPreviewMode) {
        commit(CITIES_MUTATION_TYPES.SET_PREVIEW_MODE, newPreviewMode);
    },

    [CITIES_ACTION_TYPES.TOGGLE_PREVIEW_MODE]({commit}) {
        commit(CITIES_MUTATION_TYPES.TOGGLE_PREVIEW_MODE);
    },
};
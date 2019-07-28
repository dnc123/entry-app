import Vue from 'vue';

import {AVAILABLE_CITIES_PREVIEW_MODES} from './state';

export const CITIES_MUTATION_TYPES = {
    ADD_CITIES_PAGE: 'ADD_CITIES_PAGE',
    SET_CITIES: 'SET_CITIES',
    SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',
    SET_ACTIVE_PAGE: 'SET_ACTIVE_PAGE',
    SET_ALL_CITIES_LOADED: 'SET_ALL_CITIES_LOADED',
    SORT_BY: 'SORT_BY',
    SET_PREVIEW_MODE: 'SET_PREVIEW_MODE',
    TOGGLE_PREVIEW_MODE: 'TOGGLE_PREVIEW_MODE',
};

export default {
    [CITIES_MUTATION_TYPES.ADD_CITIES_PAGE](state, {pageNumber, cities}) {
        Vue.set(state.cities, pageNumber, cities);
    },

    [CITIES_MUTATION_TYPES.SET_TOTAL_PAGES](state, newTotalPageCount) {
        state.totalPages = newTotalPageCount;
    },

    [CITIES_MUTATION_TYPES.SET_ACTIVE_PAGE](state, newActivePage) {
        state.activePage = newActivePage;
    },

    [CITIES_MUTATION_TYPES.SET_CITIES](state, allCities) {
        state.cities = allCities;
    },

    [CITIES_MUTATION_TYPES.SET_ALL_CITIES_LOADED](state, areAllCitiesLoaded) {
        state.allCitiesLoaded = areAllCitiesLoaded;
    },

    [CITIES_MUTATION_TYPES.SORT_BY](state, sortBy) {
        state.sort = {
            column: sortBy,
            orderAsc: state.sort.column === sortBy ? !state.sort.orderAsc : true,
        };
    },

    [CITIES_MUTATION_TYPES.SET_PREVIEW_MODE](state, newPreviewMode) {
        state.previewMode = newPreviewMode;
    },

    [CITIES_MUTATION_TYPES.TOGGLE_PREVIEW_MODE](state) {
        state.previewMode = state.previewMode === AVAILABLE_CITIES_PREVIEW_MODES.PAGINATION
            ? AVAILABLE_CITIES_PREVIEW_MODES.ALL
            :AVAILABLE_CITIES_PREVIEW_MODES.PAGINATION;
    },
};
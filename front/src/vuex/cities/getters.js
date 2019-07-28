import {AVAILABLE_CITIES_PREVIEW_MODES} from './state';

export const CITIES_GETTER_TYPES = {
    ACTIVE_PAGE_CITIES: 'ACTIVE_PAGE_CITIES',
    ACTIVE_PAGE_NUMBER: 'ACTIVE_PAGE_NUMBER',
    TOTAL_PAGES: 'TOTAL_PAGES',
    CITIES: 'CITIES',
    PREVIOUS_PAGE: 'PREVIOUS_PAGE',
    NEXT_PAGE: 'NEXT_PAGE',
    ALL_CITIES: 'ALL_CITIES',
    ARE_ALL_CITIES_LOADED: 'ARE_ALL_CITIES_LOADED',
    SORT: 'SORT',
    IS_PREVIEW_MODE_PAGINATION: 'IS_PREVIEW_MODE_PAGINATION',
    PREVIEW_MODE: 'PREVIEW_MODE',
};

export default {
    [CITIES_GETTER_TYPES.ACTIVE_PAGE_CITIES]: state => state.cities[state.activePage]
        ? state.cities[state.activePage]
        : [],
    [CITIES_GETTER_TYPES.ACTIVE_PAGE_NUMBER]: state => state.activePage,
    [CITIES_GETTER_TYPES.TOTAL_PAGES]: state => state.totalPages,
    [CITIES_GETTER_TYPES.CITIES]: state => state.cities,
    [CITIES_GETTER_TYPES.PREVIOUS_PAGE]: state => state.activePage - 1 >= 0 ? state.activePage - 1 : 0,
    [CITIES_GETTER_TYPES.NEXT_PAGE]: state => state.activePage + 1 <= state.totalPages
        ? state.activePage + 1
        : state.totalPages,
    [CITIES_GETTER_TYPES.ALL_CITIES]: state => [].concat(...Object.values(state.cities)),
    [CITIES_GETTER_TYPES.ARE_ALL_CITIES_LOADED]: state => state.allCitiesLoaded,
    [CITIES_GETTER_TYPES.SORT]: state => state.sort,
    [CITIES_GETTER_TYPES.IS_PREVIEW_MODE_PAGINATION]: state =>
        state.previewMode === AVAILABLE_CITIES_PREVIEW_MODES.PAGINATION,
    [CITIES_GETTER_TYPES.PREVIEW_MODE]: state => state.previewMode,
};
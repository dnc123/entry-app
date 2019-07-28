export const AVAILABLE_SORT_COLUMNS = {
    NAME: 'name',
    LAT: 'lat',
    LNG: 'lng',
};

export const AVAILABLE_CITIES_PREVIEW_MODES = {
    PAGINATION: 'PAGINATION',
    ALL: 'ALL',
};

export default {
    cities: {},
    activePage: 0,
    totalPages: 0,
    allCitiesLoaded: false,
    sort: {
        column: AVAILABLE_SORT_COLUMNS.NAME,
        orderAsc: true,
    },
    previewMode: AVAILABLE_CITIES_PREVIEW_MODES.PAGINATION,
};
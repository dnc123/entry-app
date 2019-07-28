<template>
    <div>
        <Table>
            <template v-slot:thead>
                <tr>
                    <th
                        v-for='THEAD_CONFIG in CITIES_TABLE_CONFIG.thead'
                        @click='CITIES_sortBy(THEAD_CONFIG.sortBy)'
                    >
                        {{ THEAD_CONFIG.name }}
                    </th>
                </tr>
            </template>

            <template v-slot:tbody>
                <tr
                    class='Table__Body__Row'
                    v-for='city in activeCities'
                    :class='{"Table__Body__Row--active": isLastClickedRow(city.lat, city.lng)}'
                    @click='setLastClickedRowID(city.lat, city.lng)'
                >
                    <td
                        v-for='TBODY_CONFIG in CITIES_TABLE_CONFIG.tbody'
                        @click='updateLastClickedCellData'
                    >
                        {{ city[TBODY_CONFIG.name] }}
                    </td>
                </tr>
            </template>
        </Table>

        <Pagination
            v-show='CITIES_isPreviewModePagination'
            :active-page='CITIES_activePageNumber + 1'
            :first-page='1'
            :last-page='CITIES_totalPages'
            @previous-page='CITIES_setActivePage(CITIES_previousPage)'
            @next-page='CITIES_setActivePage(CITIES_nextPage)'
        />

        <p>Last clicked cell data: {{ lastClickedCellData }}</p>

        <Button type='button' @click='CITIES_togglePreviewMode()'>
            {{ toggleCityPreviewModeText }}
        </Button>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import Table from '../components/Table';
    import Pagination from '../components/Pagination';
    import {CITIES_NAMESPACE} from '../vuex/cities/index';
    import {CITIES_ACTION_TYPES} from '../vuex/cities/actions';
    import {CITIES_GETTER_TYPES} from '../vuex/cities/getters';
    import {AVAILABLE_SORT_COLUMNS} from '../vuex/cities/state';
    import {AVAILABLE_CITIES_PREVIEW_MODES} from '../vuex/cities/state';

    export default {
        async mounted() {
            await this.CITIES_load();
            this.CITIES_cacheNeighborPages();
        },

        components: {
            Table,
            Pagination,
        },

        data() {
            return {
                lastClickedRowID: null,
                lastClickedCellData: null,
                allCitiesLoaded: false,
            }
        },

        methods: {
            ...mapActions({
                CITIES_load: `${CITIES_NAMESPACE}/${CITIES_ACTION_TYPES.LOAD}`,
                CITIES_loadAll: `${CITIES_NAMESPACE}/${CITIES_ACTION_TYPES.LOAD_ALL}`,
                CITIES_setActivePage: `${CITIES_NAMESPACE}/${CITIES_ACTION_TYPES.SET_ACTIVE_PAGE}`,
                CITIES_cacheNeighborPages: `${CITIES_NAMESPACE}/${CITIES_ACTION_TYPES.CACHE_NEIGHBOR_PAGES}`,
                CITIES_setAllCitiesLoaded: `${CITIES_NAMESPACE}/${CITIES_ACTION_TYPES.SET_ALL_CITIES_LOADED}`,
                CITIES_sortBy: `${CITIES_NAMESPACE}/${CITIES_ACTION_TYPES.SORT_BY}`,
                CITIES_togglePreviewMode: `${CITIES_NAMESPACE}/${CITIES_ACTION_TYPES.TOGGLE_PREVIEW_MODE}`,
            }),

            updateLastClickedCellData(event) {
                this.lastClickedCellData = event.target.innerText;
            },

            isLastClickedRow(lat, lng) {
                return this.makeUniqueCityID(lat, lng) === this.lastClickedRowID;
            },

            setLastClickedRowID(lat, lng) {
                this.lastClickedRowID = this.makeUniqueCityID(lat, lng);
            },

            makeUniqueCityID(lat, lng) {
                return lat + lng;
            },
        },

        computed: {
            ...mapGetters({
                CITIES_activePageCities: `${CITIES_NAMESPACE}/${CITIES_GETTER_TYPES.ACTIVE_PAGE_CITIES}`,
                CITIES_activePageNumber: `${CITIES_NAMESPACE}/${CITIES_GETTER_TYPES.ACTIVE_PAGE_NUMBER}`,
                CITIES_totalPages: `${CITIES_NAMESPACE}/${CITIES_GETTER_TYPES.TOTAL_PAGES}`,
                CITIES_previousPage: `${CITIES_NAMESPACE}/${CITIES_GETTER_TYPES.PREVIOUS_PAGE}`,
                CITIES_nextPage: `${CITIES_NAMESPACE}/${CITIES_GETTER_TYPES.NEXT_PAGE}`,
                CITIES_allCities: `${CITIES_NAMESPACE}/${CITIES_GETTER_TYPES.ALL_CITIES}`,
                CITIES_areAllCitiesLoaded: `${CITIES_NAMESPACE}/${CITIES_GETTER_TYPES.ARE_ALL_CITIES_LOADED}`,
                CITIES_isPreviewModePagination: `${CITIES_NAMESPACE}/${CITIES_GETTER_TYPES.IS_PREVIEW_MODE_PAGINATION}`,
                CITIES_previewMode: `${CITIES_NAMESPACE}/${CITIES_GETTER_TYPES.PREVIEW_MODE}`,
            }),

            isNotFirstPage() {
                return this.CITIES_activePageNumber !== 0;
            },

            isNotLastPage() {
                return this.CITIES_activePageNumber !== this.CITIES_totalPages;
            },

            toggleCityPreviewModeText() {
                return this.CITIES_isPreviewModePagination ? 'Show all cities' : 'Show cities pagination';
            },

            activeCities() {
                return this.CITIES_isPreviewModePagination ? this.CITIES_activePageCities : this.CITIES_allCities;
            },

            CITIES_TABLE_CONFIG() {
                return {
                    thead: [
                        {
                            sortBy: AVAILABLE_SORT_COLUMNS.NAME,
                            name: 'City',
                        },
                        {
                            sortBy: AVAILABLE_SORT_COLUMNS.LAT,
                            name: 'Latitude',
                        },
                        {
                            sortBy: AVAILABLE_SORT_COLUMNS.LNG,
                            name: 'Longitude',
                        },
                    ],
                    tbody: [
                        {
                            name: AVAILABLE_SORT_COLUMNS.NAME,
                        },
                        {
                            name: AVAILABLE_SORT_COLUMNS.LAT,
                        },
                        {
                            name: AVAILABLE_SORT_COLUMNS.LNG,
                        }
                    ],
                }
            },
        },


        watch: {
            CITIES_activePageNumber(newPage) {
                this.CITIES_cacheNeighborPages(newPage);
            },

            CITIES_previewMode(newMode) {
                if (newMode === AVAILABLE_CITIES_PREVIEW_MODES.ALL && !this.CITIES_areAllCitiesLoaded) {
                    this.CITIES_setAllCitiesLoaded(true);
                    this.CITIES_loadAll();
                }
            },
        },
    }
</script>
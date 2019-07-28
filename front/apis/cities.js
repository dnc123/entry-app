import simpleRequest from '../src/assets/js/simpleRequest';

export function getCities(targetPage, loadAll, orderBy, orderAsc) {
    return simpleRequest('api/cities', {
        page: targetPage | 0,
        all: loadAll,
        orderBy,
        orderAsc,
    });
}
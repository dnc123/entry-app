let express = require('express');
let serveStatic = require('serve-static');
let path = require('path');
let app = express();

const APP_PORT = process.env.PORT || 5000;
const APP_URL = '127.0.0.1';

app.use(serveStatic(path.join(__dirname, '../front/dist')));
initializeAPI(app);
app.listen(APP_PORT, APP_URL);

function initializeAPI(app) {
    const RESULTS_PER_PAGE = 20;

    app.get('/api/cities', async (req, res) => {
        let cities = await require('./data/cities.json');
        let clonedCities = cities.slice();

        const TOTAL_RESULT_PAGES = Math.ceil(clonedCities.length / RESULTS_PER_PAGE);
        const RETURN_ALL_CITIES = req.query.all;
        const ORDER_BY = req.query.orderBy;
        const SHOULD_ORDER_ASC = req.query.orderAsc === 'true';

        clonedCities.sort((a, b) => {
            let sortDirection;

            if (typeof a[ORDER_BY] === 'string') {
                sortDirection = a[ORDER_BY].localeCompare(b[ORDER_BY]);
            } else {
                sortDirection = a[ORDER_BY] - b[ORDER_BY];
            }

            if (!SHOULD_ORDER_ASC) {
                sortDirection *= -1;
            }

            return sortDirection;
        });

        if (RETURN_ALL_CITIES === 'true') {
            let cityPages = {};

            for (let i = 0; i < TOTAL_RESULT_PAGES; i++) {
                cityPages[i] = clonedCities.splice(0, RESULTS_PER_PAGE);
            }

            res.send({
                cities: cityPages,
                totalPages: TOTAL_RESULT_PAGES,
            });

            return;
        }

        const TARGET_PAGE = req.query.page ? req.query.page : 0;

        let foundCities = TARGET_PAGE <= TOTAL_RESULT_PAGES && TARGET_PAGE >= 0
            ? clonedCities.splice(TARGET_PAGE * RESULTS_PER_PAGE, RESULTS_PER_PAGE)
            : [];

        res.send({
            cities: foundCities,
            totalPages: TOTAL_RESULT_PAGES,
        });
    });
}
import * as events_handler from './js/events_handler.js';

if (!window.navigator.onLine) {
    alert("This site fetch data from 3rd party API.\nInternet is required for such purpose.");
    window.stop();
}

window.onload = () => {
    events_handler.set_navbar(0);
    events_handler.set_top_query4npage(1);
    events_handler.set_pagination_bar(1, 96);
};

window.query4npage = (n) => {
    events_handler.set_top_query4npage(n);
    events_handler.set_pagination_bar(n, 96);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.gen_rank_page = (topic_id) => {
    events_handler.set_ranked_page(topic_id);
};



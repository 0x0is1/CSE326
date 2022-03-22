import * as events_handler from './js/events_handler.js';

window.onload = () => {
    events_handler.set_top_query4npage(1);
    events_handler.set_pagination_bar(1, 96);
}

window.query4npage = (n) => {
    events_handler.set_top_query4npage(n)
    events_handler.set_pagination_bar(n, 96);
}



import * as events_handler from './js/events_handler.js';

const TOTAL_PAGES = 96;

if (!window.navigator.onLine) {
    alert("This site fetch data from external API.\nInternet is required for such purpose.");
    window.stop();
}

window.onload = () => {
    events_handler.set_navbar(0);
    events_handler.set_top_query4npage(1);
    events_handler.set_pagination_bar(1, TOTAL_PAGES);
};

window.query4npage = (n) => {
    events_handler.set_top_query4npage(n);
    events_handler.set_pagination_bar(n, TOTAL_PAGES);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.gen_rerank_page = (topic_id, topic) => {
    events_handler.set_reranked_page(topic_id, topic);
};

window.gen_ranked_page = (topic_id, topic) => {
    events_handler.set_rankItem_page(topic_id, topic);
};

window.expand = (self) => {
    var elem = self.getElementsByClassName('cbh')[0];
    var is_visible = elem.style.display;
    if (is_visible == "none") {
        var elem2 = document.getElementsByClassName("cbh");
        for (let i in elem2) {
            try {
                if (elem2[i].style != undefined) {
                    elem2[i].style.display = "none";
                }
            } catch (error) {
                console.log(error);
            }
        }
        elem.style.display = "block";
    }
    else {
        elem.style.display = "none";
    }
};

window.change_icon = (self) => {
    var name = self.name;
    console.log(name);
    switch (name) {
        case ("like"):
            self.innerHTML = `<span class="material-icons">&#xe8dc;</span>
            <br>Like`;
            self.name = "liked";
            break;
        case ("dislike"):
            self.innerHTML = `<span class="material-icons">&#xe8db;</span>
            <br>Dislike`;
            self.name = "disliked";
            break;
        
        case ("disliked"):
            self.innerHTML = `<span class="material-icons">&#xe9f2;</span>
            <br>Dislike`;
            self.name = "dislike";
            break;
    
        case ("liked"):
            self.innerHTML = `<span class="material-icons">&#xe9f3;</span>
            <br>Like`;
            self.name = "like";
            break;
    }

};
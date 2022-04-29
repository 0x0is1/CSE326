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
    window.change_theme(localStorage.getItem("themecode") | 0);
    document.getElementsByTagName("option")[localStorage.getItem("themecode") | 0].setAttribute("selected", "selected");
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

var mybutton = document.getElementById("myBtn");

window.onscroll = () => { scrollFunction(); };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

window.topFunction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.change_theme = (val) => {
    localStorage.setItem("themecode", val);
    const headTag = document.getElementsByTagName('head')[0];
    var st = headTag.getElementsByTagName("style");
    for (let i in st) {
        try {
            st[i].remove();
        }
        catch(e) {}
    }
    const styleTag = document.createElement("style");
    switch (parseInt(val)) {
        case (0):
            styleTag.innerHTML = `
                :root {
                    --clr-neon: rgb(1, 255, 192);
                    --clr-bg: rgba(12, 32, 32, 0.712);
                    --clr-sec-bg: rgb(0, 0, 0);
                    --clr-bg-self: rgba(0, 0, 0, 0.747);
                }`;
            break;
    
        case (1):
            styleTag.innerHTML = `
                :root {
                    --clr-neon: rgb(255, 230, 1);
                    --clr-bg: rgba(12, 32, 32, 0.712);
                    --clr-sec-bg: rgb(0, 0, 0);
                    --clr-bg-self: rgba(0, 0, 0, 0.747);
                }`;
            break;
        case (2):
            styleTag.innerHTML = `
                :root {
                    --clr-neon: rgb(255, 1, 1);
                    --clr-bg: rgba(12, 32, 32, 0.712);
                    --clr-sec-bg: rgb(0, 0, 0);
                    --clr-bg-self: rgba(0, 0, 0, 0.747);
                }`;
            break;
        case (3):
            styleTag.innerHTML = `
                :root {
                    --clr-neon: rgb(36, 243, 47);
                    --clr-bg: rgba(12, 32, 32, 0.712);
                    --clr-sec-bg: rgb(0, 0, 0);
                    --clr-bg-self: rgba(0, 0, 0, 0.747);
                }`;
            break;
        case (4):
            styleTag.innerHTML = `
                :root {
                    --clr-neon: rgb(255, 0, 119);
                    --clr-bg: rgba(12, 32, 32, 0.712);
                    --clr-sec-bg: rgb(0, 0, 0);
                    --clr-bg-self: rgba(0, 0, 0, 0.747);
                }`;
            break;
        case (5):
            styleTag.innerHTML = `
                :root {
                    --clr-neon: rgb(255, 60, 1);
                    --clr-bg: rgba(12, 32, 32, 0.712);
                    --clr-sec-bg: rgb(0, 0, 0);
                    --clr-bg-self: rgba(0, 0, 0, 0.747);
                }`;
            break;
    }

    headTag.appendChild(styleTag);
};
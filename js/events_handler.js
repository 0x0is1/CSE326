import * as requests from './requests.js';
import * as parser from './parser.js';
import * as codegen from './elemgen.js';

function set_navbar(active_class) {
    var elem = document.getElementsByClassName('navheader')[0];
    elem.innerHTML = null;
    elem.innerHTML += codegen.gen_navbar_code(active_class);
    document.querySelector(".menu-toggle").addEventListener(
        "click", (e) => {
            e.target.classList.toggle("active");
            document.querySelector("nav").classList.toggle("active");
        }
    );
}

function set_top_query4npage(page_no) {
    const urls = new requests.SubUrls(null, (25*page_no));
    requests.fetch_url(requests.BASE_URL + urls.browse_query, "GET").then(resp => {
        var parsed_data = parser.home_data_parser(JSON.parse(resp));
        const total_pages = parsed_data.slice(-1)[0];
        parsed_data = parsed_data.slice(0, -1).slice(-25 * 4);
        var elem = document.getElementsByClassName("container")[0];
        elem.innerHTML = null;
        var dropdown = document.getElementsByClassName("dropdown-container")[0];
        dropdown.innerHTML = codegen.gen_theme_code();
        var card = null;
        for (var i = 1; i < parsed_data.length; i += 4) {
            card = codegen.gen_card_code(parsed_data[i + 2], parsed_data[i - 1], parsed_data[i + 1], parsed_data[i]);
            elem.innerHTML += card;
        }
    });
}

function set_pagination_bar(active, last) {
    var elem = document.getElementsByClassName('pagination')[0];
    elem.innerHTML = null;
    elem.innerHTML += codegen.get_pagination_code(active, last);
}

function set_reranked_page(topic_id, topic) {
    const urls = new requests.SubUrls(topic_id, 100);
    let dctn = document.getElementsByClassName("dropdown-container")[0];
    dctn.innerHTML = null;
    requests.fetch_url(requests.BASE_URL + urls.reranks, "GET")
        .then(resp => {
            let parsed_data = parser.ranked_lists_parser(JSON.parse(resp));

            var str = `<select name="users" id="dropdown-user" onchange="gen_ranked_page(this.value, '` + topic + `')">`;
            for (var i = 1; i <= parsed_data.length; i += 3) {
                var option = codegen.get_reranked_code(parsed_data.slice(i-1, i+1));
                str += option;
            }
            str += `</select>`;
            str += codegen.gen_theme_code();
            dctn.innerHTML = str;
            set_rankItem_page(parsed_data[parsed_data.length-1], topic);
        }
    );
}

function set_rankItem_page(topic_id, topic) {
    const urls = new requests.SubUrls(topic_id, 100);
    let ctn = document.getElementsByClassName("dls")[0];
    ctn.innerHTML = null;
    document.getElementsByClassName("pagination")[0].style.display = 'none';
    document.getElementById("ctn").style.display = 'none';
    document.getElementsByClassName("heading")[0].innerHTML = `<center><h1>` + topic + `</h1></center>`;
    requests.fetch_url(requests.BASE_URL + urls.items, "GET")
        .then(resp => {
            var litems = JSON.parse(resp);
            var code = null;
            var pdata = parser.rank_parser(litems);

            for (let f = 0; f < pdata.length; f += 6) {
                code = codegen.get_rankpage_code(pdata.slice(f, f+6), (f/6)+1);
                ctn.innerHTML += code;
            }
            if (ctn.innerHTML.length < 5) {
                ctn.innerHTML = `<center><h1 style="color:var(--clr-neon)">Looks like this user has not added anything.</h1></center>`;
            }
            ctn.style.display = 'block';
        });
}

export { set_top_query4npage, set_pagination_bar, set_reranked_page, set_navbar, set_rankItem_page };
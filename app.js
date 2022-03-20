import * as requests from './js/requests.js';
import * as parser from './js/parser.js'
import * as codegen from './js/elemgen.js'

const urls = new requests.SubUrls(null, 50);

requests.fetch_url("GET", requests.BASE_URL + urls.browse_query).then(resp => {
    const parsed_data = parser.home_data_parser(JSON.parse(resp));
    var elem = document.getElementsByClassName("container")[0];
    var card;
    for (var i = 1; i < parsed_data.length; i += 4) {
        card = codegen.gen_card_code(parsed_data[i + 2], parsed_data[i - 1], parsed_data[i + 1])
        elem.innerHTML += card;
    }
})

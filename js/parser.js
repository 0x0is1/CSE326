
function strip(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

function home_data_parser(raw_data) {
    const ranker_list = raw_data['rankerLists']
    var data_container = [];
    for (var i in ranker_list) {
        var name = strip(JSON.stringify(ranker_list[i]['name'])).slice(1, -1)
        var id = JSON.stringify(ranker_list[i]['id'])
        var description = strip(JSON.stringify(ranker_list[i]['description'])).slice(0, 250) + "...";
        var img = JSON.stringify(ranker_list[i]['image']['url'])
        data_container.push.apply(data_container, [name, id, description, img]);
    }
    return data_container;
}

export { home_data_parser, strip };
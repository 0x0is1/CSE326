
function strip(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

function home_data_parser(raw_data) {
    const total_pages = parseInt(raw_data.totalCount / 20);
    const ranker_list = raw_data.rankerLists;
    var data_container = [];
    for (var i in ranker_list) {
        var name = strip(JSON.stringify(ranker_list[i].name)).slice(1, -1);
        var id = JSON.stringify(ranker_list[i].id);
        var description = strip(JSON.stringify(ranker_list[i].description)).slice(1, 300) + "...";
        var img = JSON.stringify(ranker_list[i].image.url);
        data_container.push.apply(data_container, [name, id, description, img]);
    }
    data_container.push.apply(data_container, [total_pages]);
    return data_container;
}

function ranked_lists_parser(raw_data) {
    const ranked_list = raw_data.rankerLists;
    var data_container = [];
    for (let i in ranked_list) {
        const id = JSON.stringify(ranked_list[i].id);
        const name = strip(JSON.stringify(ranked_list[i].name)).slice(1, -1);
        const user_name = strip(JSON.stringify(ranked_list[i].user.userName)).slice(1, 12).replace('"', '');
        const pubdt = new Date(JSON.stringify(ranked_list[i].publishDate)*1).toLocaleDateString().replaceAll("/", ".").replace("/", ".");
        const moddt = new Date(JSON.stringify(ranked_list[i].modifiedOn)*1).toLocaleDateString().replace("/", ".").replace("/", ".");
        const stats = ranked_list[i].listStats;
        const votes = JSON.stringify(stats.totalVotes);
        const views = JSON.stringify(stats.viewCount);
        const image = JSON.stringify(ranked_list[i].image.url);
        data_container.push.apply(data_container, [id, name, user_name, image, pubdt, moddt, votes, views]);
    }
    return data_container;
}
export { home_data_parser, strip, ranked_lists_parser };
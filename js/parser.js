
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
        const user_name = strip(JSON.stringify(ranked_list[i].user.userName)).slice(1, 12).replace('"', '');
        const top = JSON.stringify(ranked_list[i].topParentListId);
        data_container.push.apply(data_container, [id, user_name, top]);
    }
    return data_container;
}

function rank_parser(raw_data) {
    const listItems = raw_data.listItems;
    var data_container = [];
    for (let i in listItems) {
        const node = listItems[i].node;
        const name = strip(JSON.stringify(node.name));
        const props = node.nodeProperties;
        var propContainer = {};
        for (let j in props) {
            propContainer[props[j].displayName] = props[j].propertyValue;
        }
        const templateProperty = node.templateProperty;
        var tname = "";
        var tprop = "";
        if (templateProperty != undefined) {
            tname = templateProperty.displayName;
            tprop = templateProperty.propertyValue;
        }
        const nodeWikis = node.nodeWikis;
        var wikiContainer = {};
        for (let k in nodeWikis) {
            wikiContainer[nodeWikis[k].descriptionType] = [
                nodeWikis[k].wikiText,
                nodeWikis[k].wikiLink
            ];
        }
        var media = listItems[i];
        var img = null;
        if (media.mediaType === "VIDEO") {
            img = media.video.thumbUrl;
        }
        else {
            try {
                img = media.image.url;
            }
            catch (e) { img = "https://picsum.photos/200/300"; }
        }
        data_container.push.apply(data_container, [name, propContainer, tname, tprop, wikiContainer, img]);
    }
    return data_container;
}
export { home_data_parser, strip, ranked_lists_parser, rank_parser };
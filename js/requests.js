// cors-less api forwarding
const BASE_URL = "https://rankapi.0x0is1.repl.co";
const top100_tagid = 83721;

class SubUrls {
    constructor(list_id = 2674453, limit = 25) {
        this.reranks = "/lists/" + list_id + "/reranks?limit=" + limit + "&xr-client=ranker-v3-client";
        this.browse_query = "/browse/" + top100_tagid + "/query?limit=" + limit + "&xr-client=ranker-v3-client";
        this.items = "/lists/" + list_id + "/items?limit=" + limit + "&offset=25&useDefaultNodeLinks=false&include=votes,wikiText,rankings,serviceProviders,openListItemContributors,taggedLists&propertyFetchType=ALL&xr-client=ranker-v3-client";
    }
}

function fetch_url(url, method = "GET") {
    let response = new Promise(resolve => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            }
            else {
                console.error("Connection failed. Might be connection problem.");
                resolve(undefined);
            }
        };
        xhr.onerror = () => {
            console.error("Unknown error has occured.");
            resolve(undefined);
        };
    });
    return response;
}

export { BASE_URL, SubUrls, fetch_url };
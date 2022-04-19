function gen_navbar_code(active_class) {
    const menu_items = ['Home', 'Publish', 'Vote', 'Other Projects', 'About'];
    const hrefs = ['/', '/pages/publish.html', '/pages/vote.html', '/pages/projects.html', '/pages/about.html'];
    var code = 
        '<a class="logo">Top 100 of everything</a><div class="menu-toggle"></div><nav><ul>';
    for (let i = 0; i < menu_items.length; i++){
        code += '<li><a href="' + hrefs[i] + '"';
        if (active_class === i) {
            code += ' class="active" ';
        }
        code += '>' + menu_items[i] + '</a></li>';
    }
    code += '</ul></nav><div class="clearfix"></div>';
    return code;
}

function gen_card_code(img_url, title, description, id) {
    var card_code =
        `<a class="card" onclick="gen_rerank_page(` + id + `, '` + title +`')">
        <div class="imgBox">
        <img src=` + img_url + `></img>
        <h2>Top 100 Of ` + title + `</h2>
        </div>
        <div class="content">
        <h5><br />` + description + `</h5></div>
        </a>`;
    return card_code;
}

function get_pagination_code(current_page, last_page) {
    if (current_page < 1) {
        current_page = 1;
    }
    if (current_page > last_page) {
        current_page = last_page;
    }
    let pagination_code = '<a onclick="query4npage(' + (current_page - 1).toString() + ')">⭅</a>';
    // for the first three
    for (let i = 1; i <= 2; i++){
        pagination_code += '<a onclick="query4npage('+i.toString()+')"';
        if (current_page === i) {
            pagination_code += " class='activepg'";
        }
        pagination_code += '>' + i.toString() + "</a>";
    }

    pagination_code += '<a>...</a>';
    
    if (current_page > 2 && current_page < last_page - 2) {
        for (let i = current_page-1; i <= current_page+1; i++) {
            pagination_code += '<a onclick="query4npage(' + i.toString() + ')"';
            if (current_page === i) {
                pagination_code += " class='activepg'";
            }
            pagination_code += '>' + i.toString() + "</a>";
        }
        pagination_code += '<a>...</a>';
    }

    // for the last three
    for (let i = last_page-1; i <= last_page; i++) {
        pagination_code += '<a onclick="query4npage(' + i.toString() + ')"';
        if (current_page === i) {
            pagination_code += " class='activepg'";
        }
        pagination_code += '>' + i.toString() + "</a>";
    }

    pagination_code += '<a onclick="query4npage(' + (current_page + 1).toString() + ')">⭆</a>';
    return pagination_code;
}

function get_reranked_code(data) {
    return `<option value="` + data[0] + `">` + data[1] + `</option>`;
}

function get_rankpage_code(data, idx) {
    var code = `<div class="grid" onclick="expand(this)">
            <img src="` + data[5] + `" height="10%" width="15%" class="imge"></img>
            <button type="button" name="dislike"  width="150%" onclick="change_icon(this)">
                <span class="material-icons">&#xe9f2;</span>
                <br>Dislike
            </button>
            <button type="button" name="like" width="150%" onclick="change_icon(this)">
                <span class="material-icons">&#xe9f3;</span>
                <br>Like
            </button>
            <h1><b>#` + idx + `</b> | ` + data[0].slice(1, -1) + `</h1>`;
    if (data[3] != '') {
        code += '<h4>' + data[2] + ': <i>' + data[3] + '</i></h4>';
    }
    code += `<div class="cbh" style="display: none; animation: fade_in_show 0.5s;">`;
    
    for (let i in data[1]) {
        if (data[1][i] != '') {
            code += `<h4><b>` + i + `</b>: ` + data[1][i] + `</h4>`;    
        }
    }
    for (let j in data[4]) {
        code += `<h2>` + j + `</h2>`;
        code += `<h3>` + data[4][j][0];
        if (data[4][j][1] != undefined) {
            code += `<a href='` + data[4][j][1] + `' target="_blank" rel="noopener noreferrer"> read more</a>`;
        }
        code += `</h3><br>`;
    }
    code += `</div></div>`;

    return code;
    // name, propContainer, tname, tprop, wikiContainer
}
export { gen_card_code, get_pagination_code, gen_navbar_code, get_reranked_code, get_rankpage_code };
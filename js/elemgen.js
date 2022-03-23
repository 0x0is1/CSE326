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
        '<a class="card" onclick="gen_rank_page(' + id + ')">\
        <div class="imgBox">\
        <img src=' + img_url + '></img>\
        <h2>Top 100 Of ' + title + '</h2>\
        </div>\
        <div class="content">\
        <h5><br />' + description + '</h5></div>\
        </a>';
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

export { gen_card_code, get_pagination_code, gen_navbar_code };
function gen_card_code(img_url, title, description) {
    var card_code = '<div class="card"><div class="imgBox"><img src=' + img_url + '></img><h2>' + title + '</h2></div><div class="content"><h5><br />' + description + '</h5></div></div>';
    return card_code;
}

export { gen_card_code };
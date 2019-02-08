// initialize AOS
// AOS.init();

var i = 0;
var loadId;
$(function () {
    accordian()
    accordian()
    accordian()

    $('.container').accordion({
        active: false,
        collapsible: true,
    });
})

function getData() {
    $.getJSON('http://www.fulek.com/VUA/SUPIT/GetCategoriesAndFoods', function (data) {
        var text = '<li>'
        data.forEach(element => {
            text += (element.Id + " " + element.Naziv + "</li>");
            text += ("<ul>");
            element.Ponuda.forEach(e => {
                // text += (`<li>${e}</li>`)
                $.each(e, (key, value) => {
                    text += (`<li>${key}: ${value}</li>`)
                });
            });
            text += ("</ul>")
        });
        $('#lista').append(text);
        console.log(data);
    })
}

function accordian() {
    var name = "Patka",
        description = "U umaku od grožđa",
        price = "39";

    var html = `<div class="meal"><h5>${name}</h5><h6>${description}</h6></div><p class="itemPrice">${price},00kn</p>`;
    var header = $('<h3></h3>').addClass('item').append(html);
    var content = `<div class="content">
                        <p>Količina</p>
                        <input type="number" id="quantity" min="1" max="20" maxlength="2" value="1" onkeydown="return false">
                        <p>Napomena:</p>
                        <textarea name="Napomena" id="" cols="20" rows="4" maxlength="100" style="resize:none"></textarea>
                    </div>`
    $('.container').append(header).append(content);

}

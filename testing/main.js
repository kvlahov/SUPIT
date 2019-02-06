// initialize AOS
// AOS.init();

var i = 0;
var loadId;
$(function () {
    loadId= setInterval(loading, 2000)
    
    // setTimeout(() => {
        
        
    //     getData();
    // }, 10000)
})

function loading() {
    $('p').fadeToggle(1000, function() {
        $('p').fadeToggle(1000);
    })
    i++;
    if(i >=3) {
        clearInterval(loadId);        
        setTimeout(() => {
            $('p').hide();
            getData();
        }, 2000)
    }

}

function getData() {
    $.getJSON('http://www.fulek.com/VUA/SUPIT/GetCategoriesAndFoods', function(data) {
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

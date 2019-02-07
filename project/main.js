$(function () {
    //for smartphones
    // if ($(window).width() <= 768) {
    $('#navbar li.hamburger').on("click", function () {
        $("#navbar li a").toggleClass('showNavbar');
        $('#navbar #homeIcon a').text("Home").css("padding", "10px 15px");
    });

    $('#navbar li a').on('click', () => $("#navbar li a").toggleClass('showNavbar'));
    // }

    //change navbar based on scroll position
    $(window).on("scroll", function () {
        let position = $('#delivery').offset().top;

        if ($(window).scrollTop() >= position) {
            $("#nav_container").addClass('mainNavbar').show();
            $('#homeIcon').removeClass("hideHome");
            $("#navbar li a, #navbar li.hamburger").css("color", "rgb(90, 90, 90)");
        } else {
            if ($(window).scrollTop() === 0) {
                $("#nav_container").removeClass('mainNavbar').show();
                $('#homeIcon').addClass("hideHome");
                $("#navbar li a, #navbar li.hamburger").css("color", "white");
            } else {
                $("#nav_container").hide();
            }

        }
    })

    //edit fancybox
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "close"
        ],
        animationEffect: "fade",
        helpers: {
            overlay: {
                closeClick: false
            }
        },

    });

    //modal dialog config
    $('#order').dialog({
        autoOpen: false,
        modal: true,
        show: {
            effect: "fade",
            duration: 500
        },
        hide: {
            effect: "fade",
            duration: 500
        },
        width: "80%",
        height: 520,    //positioning doesnt work without this
        resizable: false,
        close: () => $('body').removeClass('stop-scrolling'),
    });

    //hide title of modal
    $(".ui-dialog-titlebar").hide();

    // getData('http://www.fulek.com/VUA/SUPIT/GetCategoriesAndFoods');
    getData('./project/meni.txt');

    //order button click event
    $("#orderButton").click(function (e) {
        var duration = 500;
        e.preventDefault()

        $('#order').dialog('open');
        $('#order').addClass('modal');

        //loading
        loadingAnimation(duration);

        $('body').addClass('stop-scrolling')
    })

    //order click event, close order popup
    $('#order').click((e) => {
        if ($('#orderPop').dialog('isOpen')) {
            // $('#orderPop').dialog('close');
        }

    })
    //order pop up dialog config
    $('#orderPop').dialog({
        autoOpen: false,
        resizable: false,
        draggable: false,
        width: 250,
        height: 270,
        modal: true,
        show: {
            effect: "fade",
            duration: 150
        },
        hide: {
            effect: "fade",
            duration: 150
        },
        buttons: [
            {
                class: "dialogButton",
                text: "Naruči",
                click: function (e) {
                    const name = $(this).dialog('option', 'title');
                    const id = items.find(e => e.Naziv === name).JeloId;
                    const quantity = $('#quantity').val();
                    const price = items.find(e => e.Naziv === name).Cijena;

                    addToOrderList(id, name, quantity, price)
                    updateTotal();
                    addClickEvent();

                    $(this).dialog('close');
                }
            },
        ],
        open: () => {
            $('.ui-widget-overlay:last-child()').css('opacity', '0');
            $('.ui-widget-overlay').bind('click', function () {
                $('#orderPop').dialog('close');
            })
        },
        close: () => {
            $('.overlayRight, .overlayTop').remove();
            $('#quantity').val(1);
            $('#orderPop textarea').val('');
        },

    })


    $('#closeModal').click((e) => {
        $('#order').dialog('close');
    })


})
var items = [];

function getData(src) {
    $.getJSON(src, function (data) {
        data.forEach(element => {
            addTitle(element.Naziv);
            //array ponude
            element.Ponuda.forEach(e => {
                addItem(e.Naziv, e.Opis, e.Cijena);
                items.push(e);
            })
        });

        //item click event
        $('.item').click((e) => {
            let title = $(event.target).attr('title');
            $("#orderPop").dialog('option', 'title', title).dialog({ position: { my: "left top", at: "right top", of: $(event.target) } });
            $('#orderPop').dialog('open');
        })
    });
}

function addTitle(title) {
    var html = `<div class="title"><h4>${title}</h4></div>`;
    $('.foodList').append(html);
}

function addItem(name, description, price) {
    var item = $('<div></div>')
        .addClass('item')
        .attr('title', name);
    var html = `<div class="meal"><h5>${name}</h5><h6>${description}</h6></div><p class="itemPrice">${price},00kn</p></div>`;
    item.append(html);
    $('.foodList').append(item);
}

function addToOrderList(id, name, quantity, price) {
    var html = `<tr><td>${id}</td><td>${name}</td><td>${quantity}</td><td>${price},00</td></tr>`;
    $('#orderItems').append(html)
}

function updateTotal() {
    var sum = 0;
    var quantityList = $('#orderItems tr td:nth-child(3)');
    var priceList = $('#orderItems tr td:nth-child(4)');
    for (let i = 0; i < quantityList.length; i++) {
        var q = parseInt($(quantityList[i]).text());
        var p = parseInt($(priceList[i]).text());
        sum += q * p;
    }
    $('.orderList tfoot td:last-child()').text(sum + ",00kn");

}

function addClickEvent() {
    $('#orderItems tr').click((e) => {
        $(e.target).parent().remove()
        updateTotal();
    })
}

var animationTimes = 0;
function loadingAnimation(duration) {
    if(animationTimes >=5) {
        return;
    }
    //animate once
    $('#loading h2').fadeToggle(duration, () => {
        $('#loading h2').fadeToggle(duration);
    })
    animationTimes++;

    //then every duration*2 ms
    var loadId = setInterval(() => loading(duration, loadId), duration * 2);

    

}

function loading(duration, loadId) {
    $('#loading h2').fadeToggle(duration, () => {
        $('#loading h2').fadeToggle(duration);
    })
    animationTimes++;

    if (animationTimes >= 5) {
        console.log("entered if");
        clearInterval(loadId);
        animationTimes = 0;

        //set timeout because animation will execute one more time
        setTimeout(() => {
            $('#loading').fadeToggle(duration);
        }, duration * 2);
    }
}
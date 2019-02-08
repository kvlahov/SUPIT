$(function () {
    //for smartphones
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
        resizable: false,
        close: () => $('body').removeClass('stop-scrolling'),
    });

    setDialogWH();
    //resize dialog based on window size
    $(window).resize(setDialogWH);


    function setDialogWH() {
        var w = $(window).width();
        var h = $(window).height();

        $('#order').dialog('option', 'width', `${w * 0.8}`);
        $('#order').dialog('option', 'height', `${h * 0.75}`);
        $('.orderList').show();
        
        $('#back').hide();
        $('#orderListButton').hide();

        if (w <= 1024) {
            $('#order').dialog('option', 'width', '100%');
            if (w <= 768) {
                $('#order').dialog('option', 'height', `${h}`);
                // var button = [{
                //     class: "dialogButton",
                //     text: "Naruči",

                // }];
                // $('#order').dialog('option', 'buttons', button);

                $('.orderList').hide();
                $('#orderListButton')
                    .css({
                        'width': '100%',
                        'padding': '15px',
                        'margin': '10px auto'
                    })
                    .show()
                    .click((e) => {
                        $('.foodList').hide();

                        $(e.target).hide();
                        $('#back')
                            .css({
                                'width': '100%',
                                'padding': '15px',
                                'margin': '10px auto',
                                'position': 'absolute',
                                'bottom' : '20px',
                                'left': `${w/2 - 20}`

                                
                            })
                            .click((e) => {
                                $('.orderList').hide();
                                $('.foodList').show('slide', 500);

                                $(e.target).hide();
                                $('#orderListButton').show('slide', 500)

                            });
                        
                        $('#back').show('slide', { direction: 'right' }, 500);
                        $('.orderList').css('height', `${h - 200}`).show('slide', { direction: 'right' }, 500);

                    })
            }
        }
    }

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
            let title = $(event.currentTarget).attr('title');
            $("#orderPop").dialog('option', 'title', title)
            if($(window).width() <= 768) {
                $('#orderPop').dialog({ position: { my: "left top", at: "left bottom", of: $(event.currentTarget) } });
            }
            else {
                $('#orderPop').dialog({ position: { my: "left top", at: "right top", of: $(event.currentTarget) } });
            }
            $('#orderPop').dialog('open');
        })

        //set accordion
        // $('.items').accordion({
        //     active:false,
        //     colapsible: true,
        // })
    });
}

function addTitle(title) {
    var html = `<div class="title"><h4>${title}</h4></div>`;
    var div = $('<div></div>').addClass('items');
    $('.foodList').append(html).append(div);
}

function addItem(name, description, price) {
    var item = $('<h3></h3>')
        .addClass('item')
        .attr('title', name);
    var html = `<div class="meal"><h5>${name}</h5><h6>${description}</h6></div><p class="itemPrice">${price},00kn</p>`;
    item.append(html);
    // var content = $('<div></div>').addClass('itemContent')
    //     .append(`<p>Količina</p>
    //         <input type="number" id ="quantity" min = "1" max ="20" maxlength="2" value="1" onkeydown="return false">
    //         <p>Napomena:</p>
    //         <textarea name="Napomena" id="" cols="20" rows="4" maxlength="100" style="resize:none"></textarea>
    //         <button class = "dialogButton">Dodaj</button>`
            
    //         );
    $('.items:last-child()').append(item)
    // .append(content);
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
    if (animationTimes >= 5) {
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
        clearInterval(loadId);

        //set timeout because animation will execute one more time
        setTimeout(() => {
            $('#loading').fadeToggle(duration);
        }, duration * 2);
    }
}
$(function () {
    // make navbar obey
    // $('#navbar li a').click(function(){    
    //     var divId = $(this).attr('href');
    //     $('html, body').animate({
    //         scrollTop: $(divId).offset().top - 60
    //     }, 100);
    // });

    //for smartphones
    // if ($(window).width() <= 768) {
        $('#navbar li.hamburger').on("click", function () {
            $("#navbar li a").toggleClass('showNavbar');
            $('#navbar #homeIcon a').text("Home").css("padding","10px 15px");
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


})
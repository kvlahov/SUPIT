// initialize AOS
// AOS.init();


let i = 0;
$(function () {
    for (let i = 0; i < 5; i++) {
        $('.container').append($('<p></p>').text('Another paragraph!'))
    }
    $('p').click(function () {
        $(this).toggle(1000, () => $(this).toggle(1000));
        
    });
        
})

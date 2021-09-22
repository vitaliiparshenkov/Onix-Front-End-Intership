/**********************************************************
 MAIN FUNCTION
 **********************************************************/

// $(function () {
//     "use strict";

//     /* Active menu link JQuery*/
//     $('nav #navbar li a').on('click', function (e) {
//        e.preventDefault();
//         $('nav #navbar li').removeClass('active');
//         $(this).parent().addClass('active');
//     });

// });


document.addEventListener('DOMContentLoaded', function(){

    /* Active menu link pure JS*/
    document.querySelectorAll('.navbar .navbar-item').forEach(el => {
        el.querySelector('a').addEventListener('click', function (e) {
            e.preventDefault();
            // console.log(el.querySelector('a').innerText);
            document.querySelectorAll('.navbar .navbar-item').forEach(li => {
                li.classList.remove('active');
            });
            this.parentElement.classList.add('active');
        });
    });


    /* Show/hidden sidebar menu and statistic */
    document.getElementById('down-inner').onclick = function (e) {
        e.preventDefault();
        let statMenu = document.getElementById('stats-menu');
        this.querySelector('i').classList.toggle('change');
        document.querySelector('body').classList.toggle('lock');

        if (statMenu.classList.contains('show')) {
            statMenu.classList.remove('show');

        } else {
            statMenu.classList.add('show');
        }
    };

    /* Open/close main menu by click to burger or menu element*/
    document.getElementById('burger-menu').onclick = openCloseMainMenu;
    document.querySelectorAll('#burger-container .navbar .navbar-item').forEach(el => {
        el.addEventListener('click', openCloseMainMenu);
    });

    function openCloseMainMenu() {
        if (document.getElementById('stats-menu').classList.contains('show')) {
            document.getElementById('stats-menu').classList.remove('show');
            document.querySelector('body').classList.remove('lock');
        }
        document.getElementById('burger-menu').classList.toggle('change');
        document.querySelector('.navbar').classList.toggle('visible');
        document.querySelector('body').classList.toggle('lock');
    };

});
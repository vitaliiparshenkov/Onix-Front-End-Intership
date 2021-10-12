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

    /* Global variables */
    // let win_w = window.innerWidth,
    //     win_h = window.innerWidth;


    /* Add property box-shadow to tag "header" when scroll > 30px*/
    window.addEventListener('scroll', function() {
        if (window.scrollY > 30) {
            document.querySelector('header').classList.add('shadow');
        } else {
            document.querySelector('header').classList.remove('shadow');
        }
    });


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
    document.getElementById('indicator').onclick = function (e) {
        e.preventDefault();
        let together = document.querySelector('.together');
        this.querySelector('i').classList.toggle('change');
        document.querySelector('body').classList.toggle('lock');

        if (together.classList.contains('show')) {
            together.classList.remove('show');
        } else {
            together.classList.add('show');
        }
    };

    /* Open/close main menu by click to burger or menu element*/
    document.getElementById('burger_menu').onclick = openCloseMainMenu;
    document.querySelectorAll('#burger_container .navbar .navbar-item').forEach(el => {
        el.addEventListener('click', openCloseMainMenu);
    });

    function openCloseMainMenu() {
        if (document.querySelector('.together').classList.contains('show')) {
            document.querySelector('.together').classList.remove('show');
            document.getElementById('indicator').querySelector('i').classList.toggle('change');
            document.querySelector('body').classList.remove('lock');
        }
        document.getElementById('burger_menu').classList.toggle('change');
        document.querySelector('.header_menu').classList.toggle('visible');
        document.querySelector('body').classList.toggle('lock');
    };


});
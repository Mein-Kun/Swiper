import Swiper from '/node_modules/swiper/swiper-bundle.esm.browser.min.js';
import {gsap, Power2} from '/node_modules/gsap/all.js';

document.addEventListener('DOMContentLoaded', () => {

    /*Swiper*/

    const swiperImg = new Swiper('.slider-img', {
        loop: false,
        speed: 2400,
        parallax: true,
        pagination: {
            el: '.total',
            type: 'custom',
            renderCustom: function(swiper, current, total){
                let totalRes = total >= 10 ? total : `0${total}`
                return totalRes
            }
        }
    });
    
    const swiperText = new Swiper('.slider-text', {
        loop: false,
        speed: 2400,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {    
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        }
    });
    
    swiperImg.controller.control = swiperText;
    swiperText.controller.control = swiperImg;

    /*gear*/
    
    let gear = document.querySelector('.slider-gear');
    
    swiperText.on('slideNextTransitionStart', function() {
        gsap.to(gear, 2.8, {
            rotation: '+=60',
            ease: Power2.easeOut
        })
    })
    
    swiperText.on('slidePrevTransitionStart', function() {
        gsap.to(gear, 2.8, {
            rotation: '-=60',
            ease: Power2.easeOut
        })
    })

    /*slide-change*/

    let curnub = document.querySelector('.current');
    let pagcur = document.querySelector('.slider-pagination-current__num');
    swiperText.on('slideChange', function() {
        let ind = swiperText.realIndex + 1;
        let indRes = ind >= 10 ? ind : `0${ind}`;
        gsap.to(curnub, .3, {
            forse3D: true,
            y: -10,
            opasity: 0,
            ease: Power2.easeOut,
            onComplete: function () {
                gsap.to(curnub, .3, {
                    forse3D: true,
                    y: 10
                });
                curnub.innerHTML = indRes;
                pagcur.innerHTML = indRes
            }
        })
        gsap.to(curnub, .3, {
            forse3D: true,
            y: 0,
            opasity: 1,
            ease: Power2.easeOut,
            dilay: .4
        })
    })

    // button.onclick = function() {
    //     alert('Спасибо');
    // };
    // function inNewWindow(button) {
    //     button.on('click', 'a:not([href^="#"])', function(evt) {
    //         evt.preventDefault();
    //         window.open(evt.target.href, '_blank');
    //     })
    // } 
    // button.on('click', function() {
    //     var href = $(this).attr('https://www.ford.com/cars/mustang/models/shelby-gt500/');
    //     window.open(href, '_blank').focus();
    // });
})


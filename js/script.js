const snsObj = {
    sneaker001: {
        src: './assets/img/sneaker1.png', price: 900, color: '#C7867A',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam magni eveniet accusamus dolor exercitationem distinctio deserunt rem autem asperiores quos.', 
        avaColors: [
            {color: 'crimson', name: 'sneaker001'},
        ]
    },

    sneaker002: {
        src: './assets/img/sneaker2.png', price: 880, color: '#B8875B',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quae libero ullam. Fugiat deleniti nemo vel blanditiis repellat ut voluptatibus.', 
        avaColors: [
            {color: 'cornflowerblue', name: 'sneaker002'},
            {color: 'seagreen', name: 'sneaker002'},
        ]
    },

    sneaker003: {
        src: './assets/img/sneaker3.png', price: 789, color: '#9C9674',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus esse itaque accusantium voluptatibus consequatur provident animi explicabo, commodi eaque! Amet?', 
        avaColors: [
            {color: 'cyan', name: 'sneaker003'},
        ]
    },

    sneaker004: {
        src: './assets/img/sneaker4.png', price: 666, color: '#7C7C7F',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam magni eveniet accusamus dolor exercitationem distinctio deserunt rem autem asperiores quos.', 
        avaColors: [
            {color: 'yellow', name: 'sneaker004'},
            {color: 'pink', name: 'sneaker004'},
        ]
    },

    sneaker005: {
        src: './assets/img/sneaker5.png', price: 543, color: '#F3B975',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quae libero ullam. Fugiat deleniti nemo vel blanditiis repellat ut voluptatibus.', 
        avaColors: [
            {color: 'orange', name: 'sneaker005'},
            {color: 'mediumpurple', name: 'sneaker005'},
            {color: 'white', name: 'sneaker005'},
        ]
    },
}

$(document).ready(function(){
    const cnSec = $('#container-section');
    // console.log(cnSec);

    const showSnCon = $('.show-sn-con'),
        snImg = $('.sn-img'),
        ciCon = $('.carousel-indicator-con'),
        ciItems = $('.carousel-indicator-item'),
        ciDownArr = $('.carousel-indicator-con .down-arr');

    // console.log(showSnCon, snImg, ciCon, ciItems, ciDownArr);

    const snAbPara = $('#right-container-section .about-con .para'),
        snPrice = $('#right-container-section .price-con .price'),
        snSizeDecBtn = $('#right-container-section .edit-con .size-con .dec-btn'),
        snSizeIncBtn = $('#right-container-section .edit-con .size-con .inc-btn'),
        snSizeNum = $('#right-container-section .edit-con .size-con .size-num'),
        snAvaColorCon = $('#right-container-section .edit-con .color-con .edit-btn-con');

    // console.log(snAbPara, snPrice, snSizeDecBtn, snSizeIncBtn, snSizeNum, snAvaColorCon);

    /* For Change Sneaker */
    let changeSn = async (key) => {
        // console.log(key);
        // to add sn color
        document.documentElement.style.setProperty('--sn-color', snsObj[key].color);

        /* right container section */
        snImg.get(0).src = snsObj[key].src;
        snImg.get(0).alt = key;

        await Promise.resolve(showSnCon.removeClass('active'));
        showSnCon.addClass('active');

        /* left container section */
        snAbPara.text(snsObj[key].about);

        let snCurPrice = 0, snIncPrice = snsObj[key].price / 100, snIncPriceRes;
        clearInterval(snIncPriceRes)
        snIncPriceRes = setInterval(() => {
            snCurPrice += snIncPrice;
            snPrice.text("$" + Math.floor(snCurPrice));
            
            if(snCurPrice >= snsObj[key].price){
                clearInterval(snIncPriceRes);
                snPrice.text("$" + snsObj[key].price);
            };
        }, 10);
        
        snAvaColorCon.html('');
        snsObj[key].avaColors.forEach(value => {
            const snAvaColorBtn = $($.parseHTML('<button></button>'));
            snAvaColorBtn.attr({
                class: "btn",
                style: `background-color: ${value.color}`,
                'data-sn': value.name
            });
            snAvaColorBtn.click(() => {
                changeSn(value.name);
            });
            snAvaColorBtn.appendTo(snAvaColorCon);
        });
    }

    /* For Carousel Indicator */
    let ciIncWRes, 
        ciCurW = 0, ciIncW = 1,
        isStoppedCi = false;
    function changeCi(idx){
        ciCurW = 0;
        ciCon.get(0).style.setProperty('--ci-item-bf-w', 0 + "%");

        const ciDownArrPos = ciItems.get(idx).offsetLeft + (ciItems.get(idx).offsetWidth / 2);
        ciDownArr.css('left', ciDownArrPos + 'px');
        ciItems.removeClass('active').eq(idx).addClass('active');

        if(!isStoppedCi) toRunCiW(idx);
    }

    function toRunCiW(idx){
        // console.log('run ci w');
        clearInterval(ciIncWRes);

        ciIncWRes = setInterval(() => {
            ciCon.get(0).style.setProperty('--ci-item-bf-w', (ciCurW += ciIncW) + "%");

            if(ciCurW >= 100){
                clearInterval(ciIncWRes);
                ciCon.get(0).style.setProperty('--ci-item-bf-w', "100%");

                let ciNextIdx = idx >= ciItems.length - 1 ? 0 : idx + 1;
                ciItems.eq(ciNextIdx).click();
            }
        }, 100);
    }

    function cnSecIn(){
        // console.log('in');
        isStoppedCi = true;
        clearInterval(ciIncWRes);
    }

    function cnSecOut(){
        // console.log('out');
        isStoppedCi = false;
        toRunCiW([...ciItems].findIndex(value => value.classList.contains('active')));
    }
    
    // for mobile or others
    if(window.navigator.userAgent.toLowerCase().includes('mobile')){
        cnSec.get(0).ontouchstart = cnSecIn;
        cnSec.get(0).ontouchend = cnSecOut;
    }else{
        cnSec.hover(cnSecIn, cnSecOut);
    }

    ciItems.each((idx, value) => {
        $(value).bind('click', () => {
            changeSn($(value).data().sn);
            changeCi(idx);
        });
    });
    setTimeout(() => ciItems.eq(1).click(), 15500);

    /* For Change Sneaker Size Number */
    const snMinSize = 20, snMaxSize = 40;
    function changeSnSize(sign){
        // console.log(sign);
        const sizeNum = +snSizeNum.text() + sign;
        if(!(sizeNum < snMinSize || sizeNum > snMaxSize)) snSizeNum.text(sizeNum);
    }
    snSizeDecBtn.click(() => changeSnSize(-1));
    snSizeIncBtn.click(() => changeSnSize(+1));

    /* For Copyright Year */
    $("#copyright-year").text(new Date().getUTCFullYear());

    /* For Intro Ani */
    setTimeout(() => $('body').addClass('start-ani'), 13000);
});
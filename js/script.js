const snsArr = [
    {
        src: './assets/img/sneaker1.png', price: 900, color: '#C7867A',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam magni eveniet accusamus dolor exercitationem distinctio deserunt rem autem asperiores quos.', 
        avaColors: ['crimson', 'seagreen', 'cornflowerblue']
    },

    {
        src: './assets/img/sneaker2.png', price: 800, color: '#B8875B',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quae libero ullam. Fugiat deleniti nemo vel blanditiis repellat ut voluptatibus.', 
        avaColors: ['orange', 'pink']
    },

    {
        src: './assets/img/sneaker3.png', price: 700, color: '#9C9674',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus esse itaque accusantium voluptatibus consequatur provident animi explicabo, commodi eaque! Amet?', 
        avaColors: ['cyan', 'mediumpurple']
    },
];



$(document).ready(function(){
    const showSnCon = $('.show-sn-con'),
        snImg = $('.sn-img'),
        ciItems = $('.carousel-indicator-item'),
        ciDownArr = $('.carousel-indicator-con .down-arr');

    // console.log(showSnCon, snImg, ciItems, ciDownArr);

    const snAbPara = $('#right-container-section .about-con .para'),
        snPrice = $('#right-container-section .price-con .price');
        snAvaColorCon = $('#right-container-section .edit-con .color-con .edit-btn-con');

    // console.log(snAbPara, snPrice, snAvaColorCon);

    function changeSn(idx){
        // console.log(idx);
        document.documentElement.style.setProperty('--sn-color', snsArr[idx].color);

        /* right container section */
        snImg.get(0).src = snsArr[idx].src;
        showSnCon.removeClass('active').delay(10);
        setTimeout(() => {
            showSnCon.addClass('active');
        }, 10);

        const ciDownArrPos = ciItems.get(idx).offsetLeft + (ciItems.get(idx).offsetWidth / 2);
        ciDownArr.css('left', ciDownArrPos + 'px');
        ciItems.removeClass('active').eq(idx).addClass('active');

        /* left container section */
        snAbPara.text(snsArr[idx].about);
        snPrice.text(snsArr[idx].price);
        
        snAvaColorCon.html('');
        snsArr[idx].avaColors.forEach(value => {
            const snAvaColorBtn = $.parseHTML(`<button class="btn" style="background-color: ${value};"></button>`);
            $(snAvaColorBtn).appendTo(snAvaColorCon);
        });
    }
    changeSn(1);

    ciItems.each((idx, value) => {
        $(value).bind('click', () => changeSn(idx));
    });
});
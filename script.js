window.addEventListener('DOMContentLoaded', () => {
    let accordions = document.querySelectorAll('.faq-question');
    let burger = document.querySelector('#burger');
    let header = document.querySelector('.header-wrapper');
    let mobileMenu = document.querySelector('.mobile-menu');
    let mobileLinks = mobileMenu.querySelectorAll('.nav-link');
    let mobileCTA = mobileMenu.querySelector('.cta-header-button');

    accordions.forEach((acc) => {
        acc.addEventListener('click', () => {
            acc.parentElement.classList.toggle('--open');
        })
    });

    function toggleFullscreenMenu() {
        if (!header.classList.contains('--open')) {
            mobileMenu.style.display = "block";
            setTimeout(() => {
                header.classList.toggle('--open');
            }, 0)
        } else {
            header.classList.toggle('--open');
            setTimeout(() => {
                mobileMenu.style.display = "none";
            }, 300)
        }
    }

    mobileLinks.forEach((link) => {link.addEventListener('click', toggleFullscreenMenu)});
    mobileCTA.addEventListener('click', toggleFullscreenMenu);

    burger.addEventListener('click', toggleFullscreenMenu);
});

function validateMyForm(form) {
    let formData = new FormData(form);
    const phoneRegex = new RegExp(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}$/)

    let q1 = formData.get('1');
    let q2 = formData.get('2');
    let q3 = formData.get('3') || "";

    if (!phoneRegex.test(q2)) {
        alert("Будь ласка введіть валідний номер телефону");
        return;
    }

    let body = {
        board_id: 1,
        fields: [
          {
            board_field_id: 1,
            value: q1
          },
          {
            board_field_id: 2,
            value: q2
          },
          {
            board_field_id: 3,
            value: q3
          },
        ]
      }

    fetch("https://api-stage.tellus.in.ua/api/v1/public/form/", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
        },
        mode: "cors",
        credentials: "omit",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify(body)
    })
    .then(function(res){ form.innerHTML = "<p class='form-success'>Дякуємо за запит, ми звʼяжемося з вами</p>" })
    .catch(function(data){ console.log("error", JSON.stringify( data ) ) });
}

window.onload = function () {
    let $bill = document.querySelector('#bill');
    let $alert = document.querySelector('#alert');
    let $people = document.querySelector('#people');
    let $buttons = document.querySelectorAll('.btns__button');
    let $tipResult = document.querySelector('.results__tip-value');
    let $totalResult = document.querySelector('.results__total-value');
    let $custom = document.querySelector('.btns__custom');
    let $reset = document.querySelector('.result-section__reset');

    let $billNumber = parseInt($bill.value);
    let $peopleNumber = parseInt($people.value);
    let $tipValue = 5;

    calculateTip();

    $buttons.forEach($element => {
        $element.addEventListener('click', (e) => {
            //cambiar estilos del botton
            removeActiveTip();

            $element.classList.add('btns__button--selected');

            $tipValue = parseInt(e.target.innerText.slice(0, -1));
            calculateTip();
        });
    });

    //Actualizar bill
    $bill.addEventListener('input', () => {
        $billNumber = parseFloat($bill.value);
        calculateTip();
    });

    //Actualizar people
    $people.addEventListener('input', () => {
        $peopleNumber = parseFloat($people.value);

        if ($peopleNumber === 0 || isNaN($peopleNumber)) {
            $people.style.borderColor = 'rgb(164, 68, 68)';
            $alert.classList.add('input-error');
        } else {
            $people.style.borderColor = 'hsl(189, 41%, 97%)';
            $alert.classList.remove('input-error');
            calculateTip();
        }
    });

    //Actualizar custom
    $custom.addEventListener('input', () => {
        $tipValue = parseFloat($custom.value);

        if ($tipValue === 0 || isNaN($tipValue)) {
            $totalResult.innerText = 0;
            $tipResult.innerText = 0;
            $custom.style.borderColor = 'rgb(164, 68, 68)';
        } else {
            $custom.style.borderColor = 'hsl(189, 41%, 97%)';
            calculateTip();
        }
    });
    $custom.addEventListener('click', () => {
        removeActiveTip();
    });

    //Reset
    $reset.addEventListener('click', () => {
        $bill.value = 100;
        $people.value = 5;
        $tipValue = 5;
        $billNumber = parseInt($bill.value);
        $peopleNumber = parseInt($people.value);
        $custom.value = "";
        $totalResult.innerText = 0;
        $tipResult.innerText = 0;
        removeActiveTip();
        $buttons.item(0).classList.add('btns__button--selected');
        calculateTip();
    });

    function calculateTip() {
        $tipResult.innerText = (($billNumber * $tipValue / 100) / $peopleNumber).toFixed(2);
        $totalResult.innerText = ((($billNumber * $tipValue / 100) + $billNumber) / $peopleNumber).toFixed(2);

    }

    function removeActiveTip() {
        $buttons.forEach($element => {
            $element.classList.remove('btns__button--selected');
        });
    }
}
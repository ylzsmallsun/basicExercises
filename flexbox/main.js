(function(){
    document.getElementById('username').addEventListener('change', function (event) {
        var newValue = event.target.value;
        var reg = /^[a-zA-Z][a-zA-Z0-9]{5,13}$/
        var errorRow = document.getElementById('warningTextRow');
        if (!reg.test(newValue)) {
            errorRow.style.display =  'flex';
            console.log('fail', errorRow.style.display)
        } else {
            errorRow.style.display = 'none';
            console.log('pass', errorRow.style.display)
        }
    })

})()

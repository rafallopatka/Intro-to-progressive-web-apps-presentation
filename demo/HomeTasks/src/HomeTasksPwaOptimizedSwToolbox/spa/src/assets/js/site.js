var checkExist = setInterval(function () {
    if ($('#app-nav').length) {
        clearInterval(checkExist);
        $('.button-collapse').sideNav();
        $('.collapsible').collapsible();
        $('ul.tabs').tabs();
        $('.modal').modal();
    }
}, 100);

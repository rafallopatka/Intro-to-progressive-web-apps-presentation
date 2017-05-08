var checkExist = setInterval(function () {
    if ($('#app-nav').length) {
        clearInterval(checkExist);
        $('.button-collapse').sideNav();
        $('.collapsible').collapsible();
        $('ul.tabs').tabs();
        $('.modal').modal();
        //$('select').material_select();
    }
}, 100);
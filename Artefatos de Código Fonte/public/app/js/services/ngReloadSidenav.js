angular.module('app').factory('ngReloadSidenav', function ($timeout, $location) {

    return {
        reload: function(){
            //All the credits here to 'SB Admin 2' theme from Start Bootstrap
            //Link: http://startbootstrap.com/template-overviews/sb-admin-2/
            $('#side-menu').metisMenu();
            $(function() {
                $(window).bind("load resize", function() {
                    topOffset = 60;
                    width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
                    if (width < 768) {
                        $('div.navbar-collapse').addClass('collapse');
                        topOffset = 100; // 2-row-menu
                    } else {
                        $('div.navbar-collapse').removeClass('collapse');
                    }

                    height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
                    height = height - topOffset;
                    if (height < 1) height = 1;
                    if (height > topOffset) {
                        $("#page-wrapper").css("min-height", (height + 10) + "px");
                    }
                });

                var url = window.location;
                var element = $('ul.nav a').filter(function() {
                    return this.href == url || url.href.indexOf(this.href) == 0;
                }).addClass('active').parent().parent().addClass('in').parent();
                if (element.is('li')) {
                    element.addClass('active');
                }

                $(".sidenav-a").each(function(){
                    var hash = $(this)[0].href.substring($(this)[0].href.indexOf("#"));
                    $(this).removeClass("active");
                });
                $(".sidenav-ul").each(function(){
                    $(this).removeClass("in");
                });
                $('a[href*="#' + $location.hash() + '"]').each(function(){
                    if ($location.hash() !== '' && !$(this).hasClass("first-level-item")){
                        $(this).parent().parent().addClass("in");
                    }
                });
            });
        },
    };
});

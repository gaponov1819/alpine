$(document).ready(function() {

	//Мега-меню и мобайл меню
    $(".sf-menu").superfish({
    	delay: 800,
    	speed: "fast",
    	cssArrows: false

    })
    .after("<div id='mobile-menu'>").clone().appendTo("#mobile-menu");
    $("#mobile-menu").find("*").attr("style", "");
    $("#mobile-menu").children("ul").removeClass("sf-menu")
 
    .parent().mmenu({
		extensions : [ 'theme-white','fx-menu-fade', 'pagedim-black' ],
		navbar: {
			title: "Меню",
		},
			navbars: {
				content: ["searchfield"]
			},
			searchfield: {
				noResults: "Извините, ничего не найдено",
				placeholder: "Поиск"
			}
	});

	//Кнопка Button к мобайл меню
	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");

	});
 
	var api = $("#mobile-menu").data("mmenu");
	api.bind("closed", function () {
		$(".toggle-mnu").removeClass("on");

	});
	
	//Кнопка поиска отк. при клике  .
	$('.opacity').css({opacity: 0.7}); 
 
    $(".search_header").click(function(){ 
    	$(".search_popup").show();
    	$(".close_search").show();
    	$(".opacity").show();
    });
 
    $(".close_search").click(function(){
    	$(".search_popup").hide();
    	$(".close_search").hide();
    	$(".opacity").hide();
    });

	//Таймер обратного отсчета
	//Документация: http://keith-wood.name/countdown.html
	//<div class="countdown" date-time="2015-01-07"></div>
	var austDay = new Date($(".countdown").attr("date-time"));
	$(".countdown").countdown({until: austDay, format: 'yowdHMS'});

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	$(".top_mnu").navigation();

	//Добавляет классы дочерним блокам .block для анимации
	//Документация: http://imakewebthings.com/jquery-waypoints/
	$(".block").waypoint(function(direction) {
		if (direction === "down") {
			$(".class").addClass("active");
		} else if (direction === "up") {
			$(".class").removeClass("deactive");
		};
	}, {offset: 100});

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	$("a.scroll").click(function() {
		$.scrollTo($(".div"), 800, {
			offset: -90
		});
	});

	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/
	var owl = $(".carousel");
	owl.owlCarousel({
		items : 4
	});
	owl.on("mousewheel", ".owl-wrapper", function (e) {
		if (e.deltaY > 0) {
			owl.trigger("owl.prev");
		} else {
			owl.trigger("owl.next");
		}
		e.preventDefault();
	});
	$(".next_button").click(function(){
		owl.trigger("owl.next");
	});
	$(".prev_button").click(function(){
		owl.trigger("owl.prev");
	});

	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$(window).scroll(function(){
    	if ($(this).scrollTop() > 800) {
    		$('.up_button img').fadeIn();
    	} else {
    		$('.up_button img').fadeOut();
    	}
    });
 
    $('.up_button img').click(function(){
    	$("html, body").animate({ scrollTop: 0 }, 300);
    	return false;
    });
	
	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("form").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("form").serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});
});
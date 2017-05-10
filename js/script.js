$(function(){
	$('.game-board').width(($(window).height() - 40) * 25 / 18);
	$('.game-board').height($(window).height() - 40);
	$('.stats').width($(window).width() - $('.game-board').width() - 20);
	$('.stats').height($(window).height() - 40);
	$('.cell').width($('.game-board').width()/8);
	$('.cellbg').width($('.game-board').width()/8-4);
	$('.cellinner').width($('.game-board').width()/8-4);
	$('.cell').height($('.game-board').height()/8);
	
	$('.cellbg').height($('.game-board').height()/8-4);
	$('.cellinner').height($('.game-board').height()/8-4);
	$('.title').css('margin-top', ($('.cell').height()/2) + 'px');
	$('.priceval').css('margin-top', ($('.cell').height()/2 + 15) + 'px');
	$('.name').height($('.cellbg').height());
	//$('.upcover').height((3*$('.cellbg').height())/4-4);
	$('.upcover').height($('.cellbg').height()/2-2);
	$('.color').height($('.cellbg').height());
	$('.name').width($('.cellbg').width());
	$('.upcover').width($('.cellbg').width());
	$('.color').width($('.cellbg').width());
	$('.tower').css('left', $('.cell').width()+'px');
	$('.tower').css('top', $('.cell').height()+'px');
	$('.tower').width(6*$('.cell').width()+'px');
	$('#towerimg').width(6*$('.cell').width()+'px');
	$('.tower').height(6*$('.cell').height()+'px');
	$('#towerimg').height(6*$('.cell').height()+'px');
	$("#d1 p").css('margin-top', ($('.cell').height()/3) + 'px');
	$('#logo').width($('.tower').width()/2);
	$('#logo').height($('.tower').height()/2);
	$('#logo').css('top', $('.tower').height()/8);
	$('#logo').css('left', $('.tower').width()/4);
	
	$("#b_red .card").width($('.tower').width()/7);
	$("#b_gold .card").width($('.tower').width()/7);
	$("#b_purple .card").width($('.tower').width()/7);
	$("#b_blue .card").width($('.tower').width()/7);
	$("#b_green .card").width($('.tower').width()/7);
	
	$("#b_red .card").height($("#b_red .card").width());
	$("#b_gold .card").height($("#b_gold .card").width());
	$("#b_purple .card").height($("#b_purple .card").width());
	$("#b_blue .card").height($("#b_blue .card").width());
	$("#b_green .card").height($("#b_green .card").width());
	
	$("#b_red").css('top', 5*$('.tower').height()/8);
	$("#b_gold").css('top', 5*$('.tower').height()/8);
	$("#b_purple").css('top', 5*$('.tower').height()/8);
	$("#b_blue").css('top', 5*$('.tower').height()/8);
	$("#b_green").css('top', 5*$('.tower').height()/8);
	
	$("#b_red").css('left', $('.tower').width()/10);
	$("#b_gold").css('left', $('.tower').width()/10 + $("#b_red").width() + 10);
	$("#b_purple").css('left', $('.tower').width()/10 + 2*$("#b_red").width() +20);
	$("#b_blue").css('left', $('.tower').width()/10 + 3*$("#b_red").width()+30);
	$("#b_green").css('left', $('.tower').width()/10 + 4*$("#b_red").width()+40);
	for (i=1; i<=8; i++)
	{
		$('#d'+i).css('top', (7*$('.cell').height()) + 'px');
		$('#d'+i).css('left', ((8-i)*$('.cell').width()) + 'px');
	}
	for (i=9; i<=15; i++)
	{
		$('#d'+i).css('top', ((15-i)*$('.cell').height()) + 'px');
		$('#d'+i).css('left', '0px');
	}
	for (i=16; i<=22; i++)
	{
		$('#d'+i).css('top', '0px');
		$('#d'+i).css('left', ((i-15)*$('.cell').width()) + 'px');
	}
	for (i=23; i<=28; i++)
	{
		$('#d'+i).css('top', ((i-22)*$('.cell').height()) + 'px');
		$('#d'+i).css('left', (7*$('.cell').width()) + 'px');
	}
	for (i=1; i<=30; i++) $(".scale").append('<div class="point_' + i +' delim"></div>');
	$(".delim").width(3);
	$(".coin").height($(".cell").height()/2);
	$(".coin").width($(".cell").height()/2);
	$(".gamesettings").hover(function(){
		$(".gamesettings>div").show();
	}, function() { 
		$(".gamesettings>div").hide();
	});
});
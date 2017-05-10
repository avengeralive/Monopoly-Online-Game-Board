$(function(){
	$.ajax({
		url: "engine.php",
		dataType: 'json',
		method: 'GET',
		data: {
			'action': 'getSaves'
		},
		success: function(data)
		{
			for (i in data) $("#gamelist").append('<option value="' + data[i] + '">' + data[i] + '</option>');
		}
	});
	$("#init").click(function(){
		$.ajax({
			url: "engine.php",
			dataType: 'json',
			method: 'GET',
			data: {
				'action': 'applySave',
				'savefile': $("#gamelist").val()
			},
			success: function(data)
			{
				for (i in data.citycost)
				{
					$("#" + i.split('f_')[1] + " .priceval").html("$" + data.citycost[i]);
				}
				for (i in data.scores)
				{
					$("#b_" + i + " p").html("$" + data.scores[i]);
				}
				for (i in data.rent)
				{
					$("#" + i + " p").html("$" + data.rent[i]);
					for (x=1; x<= (data.rent[i] * 30) / data.settings.goal; x++) $("#" + i + " .point_" + x).addClass('act');
				}
				for (i in data.cityown)
				{
					if (data.cityown[i] == "red") $("#" + i.split('f_')[1] + " .cellbg").css("background", "#ad0012");
					if (data.cityown[i] == "green") $("#" + i.split('f_')[1] + " .cellbg").css("background", "#008741");
					if (data.cityown[i] == "gold") $("#" + i.split('f_')[1] + " .cellbg").css("background", "#bd9353");
					if (data.cityown[i] == "purple") $("#" + i.split('f_')[1] + " .cellbg").css("background", "#9d00ad");
					if (data.cityown[i] == "blue") $("#" + i.split('f_')[1] + " .cellbg").css("background", "#0070ab");
				}
				for (i in data.positions)
				{
					setPosition(i, data.positions[i]);
				}

				setInterval(function(){
					$.ajax({
						url: "engine.php",
						dataType: 'json',
						method: 'GET',
						data: {
							'action': 'applySave',
							'savefile': $("#gamelist").val()
						},
						success: function(data)
						{
							if (typeof(data.moves[data.settings.move]) != 'undefined')
							{
								saveMove();
								if (data.moves[data.settings.move].move == "next")
								{
									getPosition(data.moves[data.settings.move].teamname, Number(data.positions[data.moves[data.settings.move].teamname]), ((Number(data.positions[data.moves[data.settings.move].teamname]) + Number(data.moves[data.settings.move].countity) - 1) % 28 + 1), 1);
									savePosition(data.moves[data.settings.move].teamname, ((Number(data.positions[data.moves[data.settings.move].teamname]) + Number(data.moves[data.settings.move].countity) - 1) % 28 + 1));
									//payRante(data.moves[data.settings.move].teamname, ((Number(data.positions[data.moves[data.settings.move].teamname]) + Number(data.moves[data.settings.move].countity) - 1) % 28 + 1));
								}
								else 
								{
									getPosition(data.moves[data.settings.move].teamname, Number(data.positions[data.moves[data.settings.move].teamname]), ((Number(data.positions[data.moves[data.settings.move].teamname]) + 28 - Number(data.moves[data.settings.move].countity) - 1) % 28 + 1), 0);
									savePosition(data.moves[data.settings.move].teamname, ((Number(data.positions[data.moves[data.settings.move].teamname]) + 28 - Number(data.moves[data.settings.move].countity) - 1) % 28 + 1));
									//payRante(data.moves[data.settings.move].teamname, ((Number(data.positions[data.moves[data.settings.move].teamname]) + 28 - Number(data.moves[data.settings.move].countity) - 1) % 28 + 1));
								}
							}
							for (i in data.scores)
							{
								$("#b_" + i + " p").html("$" + data.scores[i]);
							}
							for (i in data.rent)
							{
								if (data.rent[i] >= data.settings.goal)
								{
									alert("Игра окончена! Победил игрок " + i + "!");
								}
								$("#" + i + " p").html("$" + data.rent[i]);
								for (x=1; x<= 30; x++) $("#" + i + " .point_" + x).removeClass('act');
								for (x=1; x<= (data.rent[i] * 30) / data.settings.goal; x++) $("#" + i + " .point_" + x).addClass('act');
							}
							for (i in data.cityown)
							{
								if (data.cityown[i] == "red") $("#" + i.split('f_')[1] + " .cellbg").css("background", "#ad0012");
								if (data.cityown[i] == "green") $("#" + i.split('f_')[1] + " .cellbg").css("background", "#008741");
								if (data.cityown[i] == "gold") $("#" + i.split('f_')[1] + " .cellbg").css("background", "#bd9353");
								if (data.cityown[i] == "purple") $("#" + i.split('f_')[1] + " .cellbg").css("background", "#9d00ad");
								if (data.cityown[i] == "blue") $("#" + i.split('f_')[1] + " .cellbg").css("background", "#0070ab");
							}
							
							if (data.settings.players < 5) 
							{
								$("#b_green").hide();
								$("#green").hide();
								$("#coin_green").hide();
							}
							if (data.settings.players < 4) 
							{
								$("#b_blue").hide();
								$("#blue").hide();
								$("#coin_blue").hide();
							}
							if (data.settings.players < 3) 
							{
								$("#b_purple").hide();
								$("#purple").hide();
								$("#coin_purple").hide();
							}
							if (data.settings.players < 2) 
							{
								$("#b_gold").hide();
								$("#gold").hide();
								$("#coin_gold").hide();
							}
							
							$("#b_red").css('left', $('.tower').width()/(data.settings.players * 2));
							$("#b_gold").css('left', $('.tower').width()/(data.settings.players * 2) + $("#b_red").width() + 10);
							$("#b_purple").css('left', $('.tower').width()/(data.settings.players * 2) + 2*$("#b_red").width() +20);
							$("#b_blue").css('left', $('.tower').width()/(data.settings.players * 2) + 3*$("#b_red").width()+30);
							$("#b_green").css('left', $('.tower').width()/(data.settings.players * 2) + 4*$("#b_red").width()+40);
							
							
						}
					});
				}, 1000);
				
				
			}
		});
	});
	$("#init2").click(function(){
		$.ajax({
			url: "engine.php",
			dataType: 'json',
			method: 'GET',
			data: {
				'action': 'applySave',
				'savefile': $("#gamelist").val()
			},
			success: function(data)
			{
				for (i in data.citycost)
				{
					$("#" + i).val(data.citycost[i]);
				}
				$("#goal").val(data.settings.goal);
				$("#players").val(data.settings.players);
			}
		});
	});
	$(".applymove").click(function(){
		console.log( $("#gamelist").val());
		$.ajax({
			url: "engine.php",
			dataType: 'json',
			method: 'GET',
			data: {
				'action': 'makeMove',
				'teamname' : $("#team_name").val(),
				'move' : $("#move").val(),
				'countity' : $("#countity").val(),
				'savefile' : $("#gamelist").val()
			},
			success: function(data)
			{
				console.log(data);
				alert("Ход прянят!");
			},
			error: function(data)
			{
				console.log(data);
			}
		});
	});
	$(".applyprice").click(function(){
		console.log( $("#gamelist").val());
		$.ajax({
			url: "engine.php",
			dataType: 'json',
			method: 'GET',
			data: {
				'action': 'applyPrice',
				"citycost" : {
					'f_d2' : $("#f_d2").val(),
					'f_d3' : $("#f_d3").val(),
					'f_d4' : $("#f_d4").val(),
					'f_d6' : $("#f_d6").val(),
					'f_d8' : $("#f_d8").val(),
					'f_d9' : $("#f_d9").val(),
					'f_d10' : $("#f_d10").val(),
					'f_d12' : $("#f_d12").val(),
					'f_d13' : $("#f_d13").val(),
					'f_d15' : $("#f_d15").val(),
					'f_d16' : $("#f_d16").val(),
					'f_d18' : $("#f_d18").val(),
					'f_d19' : $("#f_d19").val(),
					'f_d21' : $("#f_d21").val(),
					'f_d22' : $("#f_d22").val(),
					'f_d23' : $("#f_d23").val(),
					'f_d24' : $("#f_d24").val(),
					'f_d26' : $("#f_d26").val(),
					'f_d27' : $("#f_d27").val()
				},
				'goal' : $("#goal").val(),
				'players' : $("#players").val(),
				'savefile' : $("#gamelist").val()
			},
			success: function(data)
			{
				console.log(data);
				alert("Настройки сохранены!");
			},
			error: function(data)
			{
				console.log(data);
			}
		});
	});
	$(".buycity").click(function(){
		buyCity($("#team_name1").val(), $("#cityname").val());
	});
	$("#new").click(function(){
		newGame();
	});
	$(".applymove2").click(function(){
		console.log( $("#gamelist").val());
		$.ajax({
			url: "engine.php",
			dataType: 'json',
			method: 'GET',
			data: {
				'action': 'addMoney',
				'team' : $("#team_name2").val(),
				'price' : $("#countity2").val(),
				'savefile' : $("#gamelist").val()
			},
			success: function(data)
			{
				console.log(data);
				alert("Деньги перечислены!");
			},
			error: function(data)
			{
				console.log(data);
			}
		});
	});
	$(".applymove3").click(function(){
		console.log( $("#gamelist").val());
		$.ajax({
			url: "engine.php",
			dataType: 'json',
			method: 'GET',
			data: {
				'action': 'subMoney',
				'team' : $("#team_name3").val(),
				'price' : $("#countity3").val(),
				'savefile' : $("#gamelist").val()
			},
			success: function(data)
			{
				console.log(data);
				alert("Деньги сняты!");
			},
			error: function(data)
			{
				console.log(data);
			}
		});
	});
});

function saveMove()
{
	$.ajax({
		url: "engine.php",
		dataType: 'json',
		method: 'GET',
		data: {
			'action': 'saveMove',
			'savefile': $("#gamelist").val()
		},
		success: function(data)
		{
			console.log(data);
		}
	});
}

function savePosition(team, place)
{
	//console.log(team + " " + place);
	$.ajax({
		url: "engine.php",
		dataType: 'json',
		method: 'GET',
		data: {
			'action': 'savePosition',
			'savefile': $("#gamelist").val(),
			'team' : team,
			'place' : place
		},
		success: function(data)
		{
			console.log(data);
		}
	});
}

function payRante(team, place)
{
	$.ajax({
		url: "engine.php",
		dataType: 'json',
		method: 'GET',
		data: {
			'action': 'payRante',
			'savefile': $("#gamelist").val(),
			'team' : team,
			'place' : place
		},
		success: function(data)
		{
			if (!data)
			{
				if (place >= 1 && place <= 3)
				{
					savePosition(team, 25);
					getPosition(team, place, 25, 0);	
				}
				else if (place >= 26)
				{
					savePosition(team, 25);
					getPosition(team, place, 25, 0);
				}
				else if (place >= 6 && place <= 10)
				{
					savePosition(team, 5);
					getPosition(team, place, 5, 0);
				}
				else if (place >= 12 && place <= 16)
				{
					savePosition(team, 11);
					getPosition(team, place, 11, 0);
				}
				else if (place >= 18 && place <= 24)
				{
					savePosition(team, 17);
					getPosition(team, place, 17, 0);
				}
			}
		}
	});
}

function buyCity(team, place)
{
	$.ajax({
		url: "engine.php",
		dataType: 'json',
		method: 'GET',
		data: {
			'action': 'buyCity',
			'savefile': $("#gamelist").val(),
			'team' : team,
			'place' : place
		},
		success: function(data)
		{
			console.log(data);
			if (!data) alert("Невозможно купить данный город!");
			else alert("Город успешно куплен!");
		}
	});
}

function newGame()
{
	$.ajax({
		url: "engine.php",
		dataType: 'json',
		method: 'GET',
		data: {
			'action': 'newGame'
		},
		success: function(data)
		{
			console.log(data);
			$.ajax({
				url: "engine.php",
				dataType: 'json',
				method: 'GET',
				data: {
					'action': 'getSaves'
				},
				success: function(data)
				{
					$("#gamelist>option").remove();
					for (i in data) $("#gamelist").append('<option value="' + data[i] + '">' + data[i] + '</option>');
				}
			});
		}
	});
}


function setPosition(id, position)
{
	if (position >= 1 && position <= 8)
	{
		$("#coin_" + id).css("top", 7*$(".cell").height() + $(".color").height()/8 + "px");
		if (id == "red") $("#coin_" + id).css("left", (8 - position) * $(".cell").width() + $(".color").height()/10 + "px");
		if (id == "gold") $("#coin_" + id).css("left", (8 - position) * $(".cell").width() + 2*$(".color").height()/10 + "px");
		if (id == "purple") $("#coin_" + id).css("left", (8 - position) * $(".cell").width() + 4*$(".color").height()/10 + "px");
		if (id == "blue") $("#coin_" + id).css("left", (8 - position) * $(".cell").width() + 6*$(".color").height()/10 + "px");
		if (id == "green") $("#coin_" + id).css("left", (8 - position) * $(".cell").width() + 8*$(".color").height()/10 + "px");
	}
	if (position >= 9 && position <= 14)
	{
		$("#coin_" + id).css("top", (15 - position)*$(".cell").height() + $(".color").height()/8 + "px");
		if (id == "red") $("#coin_" + id).css("left", $(".color").height()/10 + "px");
		if (id == "gold") $("#coin_" + id).css("left", 2*$(".color").height()/10 + "px");
		if (id == "purple") $("#coin_" + id).css("left", 4*$(".color").height()/10 + "px");
		if (id == "blue") $("#coin_" + id).css("left", 6*$(".color").height()/10 + "px");
		if (id == "green") $("#coin_" + id).css("left", 8*$(".color").height()/10 + "px");
	}
	if (position >= 15 && position <= 22)
	{
		$("#coin_" + id).css("top", $(".color").height()/8 + "px");
		if (id == "red") $("#coin_" + id).css("left", (position - 15) * $(".cell").width() + $(".color").height()/10 + "px");
		if (id == "gold") $("#coin_" + id).css("left", (position - 15) * $(".cell").width() + 2*$(".color").height()/10 + "px");
		if (id == "purple") $("#coin_" + id).css("left", (position - 15) * $(".cell").width() + 4*$(".color").height()/10 + "px");
		if (id == "blue") $("#coin_" + id).css("left", (position - 15) * $(".cell").width() + 6*$(".color").height()/10 + "px");
		if (id == "green") $("#coin_" + id).css("left", (position - 15) * $(".cell").width() + 8*$(".color").height()/10 + "px");
	}
	if (position >= 23 && position <= 28)
	{
		$("#coin_" + id).css("top", (position - 22)*$(".cell").height() + $(".color").height()/8 + "px");
		if (id == "red") $("#coin_" + id).css("left", 7*$(".cell").width() + $(".color").height()/10 + "px");
		if (id == "gold") $("#coin_" + id).css("left", 7*$(".cell").width() + 2*$(".color").height()/10 + "px");
		if (id == "purple") $("#coin_" + id).css("left", 7*$(".cell").width() + 4*$(".color").height()/10 + "px");
		if (id == "blue") $("#coin_" + id).css("left", 7*$(".cell").width() + 6*$(".color").height()/10 + "px");
		if (id == "green") $("#coin_" + id).css("left", 7*$(".cell").width() + 8*$(".color").height()/10 + "px");
	}
}

function getPosition(id, current, position, side)
{
	setInterval(function(){
		if (current != position && current != 0)
		{
			if (side == 1) current = (current % 28) + 1;
			else current = ((current + 26) % 28) + 1;
			pos = {};
			if (current >= 1 && current <= 8)
			{
				pos.top = 7*$(".cell").height() + $(".color").height()/8;
				if (id == "red") pos.left = (8 - current) * $(".cell").width() + $(".color").height()/10;
				if (id == "gold") pos.left = (8 - current) * $(".cell").width() + 2*$(".color").height()/10;
				if (id == "purple") pos.left = (8 - current) * $(".cell").width() + 4*$(".color").height()/10;
				if (id == "blue") pos.left = (8 - current) * $(".cell").width() + 6*$(".color").height()/10;
				if (id == "green") pos.left = (8 - current) * $(".cell").width() + 8*$(".color").height()/10;
			}
			if (current >= 9 && current <= 14)
			{
				pos.top = (15 - current)*$(".cell").height() + $(".color").height()/8;
				if (id == "red") pos.left =  $(".color").height()/10;
				if (id == "gold") pos.left = 2*$(".color").height()/10;
				if (id == "purple") pos.left = 4*$(".color").height()/10;
				if (id == "blue") pos.left = 6*$(".color").height()/10;
				if (id == "green") pos.left = 8*$(".color").height()/10;
			}
			if (current >= 15 && current <= 22)
			{
				pos.top = $(".color").height()/8;
				if (id == "red") pos.left = (current - 15) * $(".cell").width() + $(".color").height()/10;
				if (id == "gold") pos.left = (current - 15) * $(".cell").width() + 2*$(".color").height()/10;
				if (id == "purple") pos.left = (current - 15) * $(".cell").width() + 4*$(".color").height()/10;
				if (id == "blue") pos.left = (current - 15) * $(".cell").width() + 6*$(".color").height()/10;
				if (id == "green") pos.left = (current - 15) * $(".cell").width() + 8*$(".color").height()/10;
			}
			if (current >= 23 && current <= 28)
			{
				pos.top = (current - 22)*$(".cell").height() + $(".color").height()/8;
				if (id == "red") pos.left = 7*$(".cell").width() + $(".color").height()/10;
				if (id == "gold") pos.left = 7*$(".cell").width() + 2*$(".color").height()/10;
				if (id == "purple") pos.left = 7*$(".cell").width() + 4*$(".color").height()/10;
				if (id == "blue") pos.left = 7*$(".cell").width() + 6*$(".color").height()/10;
				if (id == "green") pos.left = 7*$(".cell").width() + 8*$(".color").height()/10;
			}
			console.log(pos);
			$("#coin_" + id).animate({
				top: pos.top,
				left: pos.left
			}, 500);
		}
		else if (current == position)
		{
			payRante(id, position);
			current = 0;
		}
	}, 700);
}
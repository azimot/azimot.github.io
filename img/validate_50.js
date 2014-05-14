//match num fields
var numRegex = /^[0-9]+$/;
$("div").delegate("input[type='text'],input[type='password']","blur",function(e){
	switch(e.target.id){
		case "_buyer_user_":
			if($.trim($(this).val()) != '' && $(this).val().length > 3){
				$(this).removeClass("invalid");						
				$(this).addClass("valid");
			}else{
				$(this).addClass("invalid");
				$(this).removeClass("valid");
			}
		break;
		case "_buyer_user_id_":
			if(numRegex.test($(this).val()) && $.trim($(this).val()) != ''){
				$(this).removeClass("invalid");						
				$(this).addClass("valid");
			}else{
				$(this).addClass("invalid");
				$(this).removeClass("valid");
			}
		break;
	}
});
$("div").delegate("input[type='text'],input[type='password']","focus",function(e){
	$(this).css("border","2px solid #FCDF3F");
});
function validate(obj){

var result = true;
var name;
var len = obj.length;
$( "#message" ).hide();
$("#"+obj+" input[type='text'],#"+obj+" input[type='password']").each(function(){
	if($( this ).hasClass('required') && ($( this ).val() == '' || $( this ).hasClass('invalid')))
	{
		$( this ).addClass('invalid');result = false;
	}
	else {$( this ).removeClass('invalid')} 
});
	
if(!result){
	$( "#message" ).show();
	$("#message").html("Please fill all fields !!!");
}

return result;
		
}	

$(document).ready(function() {
	$(".accordion .accord-header").click(function() {
		if($(this).next("div").is(":visible")){
			$(this).next("div").slideUp(200);
		} else {
			$(".accordion .accord-content").slideUp(200);
			$(this).next("div").slideToggle(200);					
		}
	});
});
function se_ent(_val_){
	
	var _product_id = $.trim($("#product_id").html()),
		_buyer_user_id_ = $.trim($("#_buyer_user_id_").val()),
		_buyer_user_ = $.trim($("#_buyer_user_").val());
	
	if(validate("valid-box") && _val_ == "coupid"){
		$.ajax({
			url: "/",
			type: "GET",
			data: {
				buyby : "^50^"+_product_id+"^" + _buyer_user_id_+ "^" + _buyer_user_
			}
		}).done(function( html ) {
			$( "#message" ).show();					
			if(html.search("Wrong") == -1)
				$( "#message" ).css("color","green");
			else
				$( "#message" ).css("color","red");
			$( "#message" ).html( "<strong> " + html + "</strong> " );
			$("html, body").animate({ scrollTop: $("html, body").height() }, 1000);
		});
	}
}
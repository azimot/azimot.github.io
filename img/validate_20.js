//match text fields [English]
var charRegex = /^[A-Za-z0-9]{40}$/;
//match num fields
var numRegex = /^[0-9]+$/;
$("div").delegate("input[type='text'],input[type='password']","blur",function(e){
	switch(e.target.id){
		case "_couponid_":
			if(charRegex.test($(this).val()) && $.trim($(this).val()) != ''){
				$(this).removeClass("invalid");						
				$(this).addClass("valid");
			}else{
				$(this).addClass("invalid");
				$(this).removeClass("valid");
			}
		break;
		case "_coup_pass_":
			if($.trim($(this).val()) != '' && $(this).val().length > 7){
					$(this).removeClass("invalid");						
					$(this).addClass("valid");
				}else{
					$(this).addClass("invalid");
					$(this).removeClass("valid");
				}
		break;
		case "_coup_user_":
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
$("div").delegate("input[type='text']","focus",function(e){
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
	$("div#message").html("Please fill all fields !!!");
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
	
	var _couponid_ = $.trim($("#_couponid_").val()),
		_coup_user_ = $.trim($("#_coup_user_").val()),
		_coup_pass_ = $.trim($("#_coup_pass_").val()),
		_product_id = $.trim($("#product_id").html()),
		_buyer_user_id_ = $.trim($("#_buyer_user_id_").val()),
		_buyer_user_ = $.trim($("#_buyer_user_").val());
	
	if(validate("valid-box") && _val_ == "coupid"){				
		var data = _coup_user_ ,
			temp = "",
			str ="",
			j=0;
			if(data.length < 16 && $.trim(data) != ""){
				for(var i = 0; i < 16; i++){
					temp += data[j].toString();
					if(j == data.length-1)
						j=0;
					else
						j++;
				}
			}else{
				for(var i = 0; i < 16; i++){
					temp += data[i].toString();
					}
			}
			for(var i = 0; i < temp.length; i++)
				str +=temp.charCodeAt(i).toString(16);
		var kparam = CryptoJS.enc.Hex.parse(str);					
		$.ajax({
			url: "/",
			type: "GET",
			data: {
				buyby : "^20^"+_product_id+"^"+_couponid_ + "^" + CryptoJS.enc.Base64.parse(CryptoJS.AES.encrypt("^"+_coup_user_ + "^" + _coup_pass_ + "^" +_buyer_user_id_+ "^" + _buyer_user_+"^", kparam , { iv : kparam } ).toString() ).toString(CryptoJS.enc.Hex)
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
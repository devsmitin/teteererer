$(document).ready(function() {

     $.ajax({
    type: 'GET',
    url: '/cart.js',
    cache: false,
    dataType: 'json',
    success: function(data) {         
       $(data).each(function(i,MainData){
        // console.log(data)
         var numberdata = data.items
        // console.log(numberdata);
         $(numberdata).each(function(i,mainData){
             var newData = mainData.properties;
         //  console.log(newData)
           });
       });
      }
    });
 
    
  console.time();
  if($('#vimla_subscription') !== null){
    setTimeout(function(){
      $('.addtocart_txt').removeClass('Button--hide');
      $('.loader').removeClass('Button--show');
      $('.loader').addClass('Button--hide'); 
      $('.vimla_btn').removeClass('vimla_pointer_evnts');
      $('.vimla_btn').removeAttr('style');    
    },2000);   
  }
  console.timeEnd();

// VIMLA FIRST POPUP USING JAVASCRIPT : START
  $('.Vimla_button').on('click', function() {
      if($('#vimla_subscription').prop('checked')){
    var DataSku = $('.product-select-v').find(":selected").attr('data-sku');
    var DataTag = $('.product-select-v').find(":selected").attr('product-tag');    
    if ( DataSku.includes("VM") || DataTag.includes("subscribed")){
       $.ajax({
                type: 'POST',
                url: 'https://api.renewed.se/api/frontApi/getOffers',
                cache: false,
                dataType: 'json',
                success: function(data) {    
                if(data.error == false){
                 let offerData = data.data;
                  var html='';
                 var regular_cnt=0,student_cnt=0,above55_cnt=0;
                 var regular='<div class="regular_sub">';
                 var student='<div class="student_sub">';
                 var above55='<div class="above55_sub">';
                 offerData.forEach(function(value) {
                   if(value.subscriptionType=='regular')
                   {
                     if(regular_cnt==0)
                     {
                       regular='<div class="regular_sub"><span class="regular">Ordinarie</span>';
                       regular_cnt++;
                     }
                       
                     regular+='<div class="model_flex-inner">'
                 regular+='<div class="model_info">'
                  regular+='<div class="model_heading">'
                       regular+='<h3 class="SectionHeader__Heading Heading u-h4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+value.amountOfGbData+'GB</font></font></h3>'
                  regular+='</div>'
                 regular+='<div class="model_price">'
                   if(value.discountedPrice != null)
                      regular+='<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+value.discountedPrice+'kr/mån</font></font></p>'
                  regular+='</div>'
                  regular+='<div class="model_disc">'
                       regular+='<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">i '+value.campaignMonth+' månader därefter '+value.originalPrice+' kr/mån</font></font></p>'
                  regular+='</div>'
                  regular+='<div class="model_buy">'
                     regular+='<a offer-id="'+value.offerId+'" class="model_buy_now" href="javascript:void(0);" offerText="'+value.amountOfGbData+'GB, '+value.discountedPrice+ 'kr i '+value.campaignMonth+' mån därefter '+value.originalPrice+' kr/mån"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Köp nu!</font></font></a>'
                  regular+='</div>'
              regular+='</div>'
          regular+='</div>'
                   }
                   else if(value.subscriptionType=='student')
                   {
                     if(student_cnt==0)
                     {
                       student='<div class="regular_sub"><span class="student">Student</span>';
                       student_cnt++;
                     }
                       
                         student+='<div class="model_flex-inner">'
                     student+='<div class="model_info">'
                      student+='<div class="model_heading">'
                           student+='<h3 class="SectionHeader__Heading Heading u-h4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+value.amountOfGbData+'GB</font></font></h3>'
                      student+='</div>'
                     student+='<div class="model_price">'
                       if(value.discountedPrice != null)
                          student+='<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+value.discountedPrice+'kr/mån</font></font></p>'
                      student+='</div>'
                      student+='<div class="model_disc">'
                           student+='<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">i '+value.campaignMonth+' månader därefter '+value.originalPrice+' kr/mån</font></font></p>'
                      student+='</div>'
                      student+='<div class="model_buy">'
                         student+='<a offer-id="'+value.offerId+'" class="model_buy_now" href="javascript:void(0);" offerText="'+value.amountOfGbData+'GB, '+value.discountedPrice+ 'kr i '+value.campaignMonth+' mån därefter '+value.originalPrice+' kr/mån"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Köp nu!</font></font></a>'
                      student+='</div>'
                  student+='</div>'
              student+='</div>'
                   }
                   else if(value.subscriptionType=='above55')
                   {
                     if(above55_cnt==0)
                     {
                       above55='<div class="regular_sub"><span class="above55">55+</span>';
                       above55_cnt++;
                     }
                       
                         above55+='<div class="model_flex-inner">'
                     above55+='<div class="model_info">'
                      above55+='<div class="model_heading">'
                           above55+='<h3 class="SectionHeader__Heading Heading u-h4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+value.amountOfGbData+'GB</font></font></h3>'
                      above55+='</div>'
                     above55+='<div class="model_price">'
                       if(value.discountedPrice != null)
                          above55+='<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+value.discountedPrice+'kr/mån</font></font></p>'
                      above55+='</div>'
                      above55+='<div class="model_disc">'
                           above55+='<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">i '+value.campaignMonth+' månader därefter '+value.originalPrice+' kr/mån</font></font></p>'
                      above55+='</div>'
                      above55+='<div class="model_buy">'
                         above55+='<a offer-id="'+value.offerId+'" class="model_buy_now" href="javascript:void(0);" offerText="'+value.amountOfGbData+'GB, '+value.discountedPrice+ 'kr i '+value.campaignMonth+' mån därefter '+value.originalPrice+' kr/mån"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Köp nu!</font></font></a>'
                      above55+='</div>'
                  above55+='</div>'
              above55+='</div>'
                   }
           })
          if($(".vimla_modal_inner .final_model").hasClass("new-active") != true){
          if($(".vimla_modal_inner .body").hasClass("is-hide"))
            $(".vimla_modal_inner .body").removeClass("is-hide")
          regular+='</div><br>';
          student+='</div><br>';
          above55+='</div>';
                  console.log(regular);
                  html+=regular;
                  html+=student;
                  html+=above55;
          document.querySelectorAll(".model_flex")[0].innerHTML = html;
          modelBuyNow()
        }else{
            document.querySelectorAll(".model_flex")[0].textContent = data.data;              
        }  
          }
          
        $(".vimla_modal").addClass('is-show');
        $('body').css('overflow','hidden');
        $('.Product__InfoWrapper.vimla_product').css('z-index','58');
        $('#shopify-section-header').addClass('z-index-hide')
        $('.Drawer').css('visibility','hidden');
           },
         error: function (error) {
          document.querySelectorAll(".model_flex")[0].textContent = "Ops! Något gick fel. Vänligen kontakta Vimlas support på vimla.se/kontakt";   
        }
      });
    }
      }
    if($('#unsubscrib_checkbox').prop('checked')){
  $('.vimla_modal_second').addClass('is-show');
 $('body').css('overflow-x','hidden');
 $('.Product__InfoWrapper.vimla_product').css('z-index','58');
$('#shopify-section-header').addClass('z-index-hide')
 $('.Drawer').css('visibility','hidden');
  }
  });
// VIMLA FIRST POPUP USING JAVASCRIPT : END

// FREE VIMLA ACCESSORIE FUNCTION : START
 function free_sample(free_vimla){
        $.ajax({
          type: 'POST',
          url: '/cart/add.js',
          data: {
            quantity: 1,
            id: free_vimla,
          },
          dataType: 'json', 
            success: function(res) {
            $.getJSON('/cart.js', function(cart) {
              $(cart).each(function(i, cartData){
                console.log(cartData)
              });
           });  
          },
        });
 }  
// FREE VIMLA ACCESSORIE FUNCTION : END
 function delete_cookie(name) {
         document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
         console.log("cookie clear");
      } 
// All DETAIL SUBMIT FUNCTION ON BUTTON : START 
  $('.submit_done').on('click', function(){
    var all_prolength = $("#free_allproduct").length;
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   
      if( $('input#Number').val().length === 0 ) {
       $('input#Number').css('border','2px solid #FF0000');
       
        $('input#Number').keypress(function() {
             $('input#Number').css('border','2px solid #000');
        });
      
      }else if($('input#email').val().length === 0 || regex.test($('input#email').val()) === false) {
       $('input#email').css('border','2px solid #FF0000');
           $('input#email').keypress(function() {
             $('input#email').css('border','2px solid #000');
        });
      } else if (!$('#check_number_self').is(':checked') && !$('#cehck_regular_number').is(':checked')) {
       $('.show-error').addClass('Active');
      }
      else if (!$('#vimla_trms').is(':checked')) {
       $('.trms_error').addClass('Active');
      }
       else if ($('#check_number_self').is(':checked') && $('input#self-Number').val().length !== 10 ) {
         $('.show-error').removeClass('Active');
         $('input#self-Number').css('display','block');
         $('input#self-Number').css('border','2px solid #FF0000');
      }
      else {
        if($('#check_number_self').is(':not(:checked)')){
          $('input#self-Number').css('display','block');  
         }
         $('.trms_error').removeClass('Active');
         $('.show-error').removeClass('Active')
        let securityNumber = $(".form_info #Number").val();
        let email = $(".form_info #email").val();
        let phoneNumber = $('#self-Number').val();
        let offerId = $(".final_model").attr("offerId");
        let tempval = $('#temp-code').val('added');
        
        var numberDetails = 0;
        if(phoneNumber.length == 0){
          numberDetails = 0;
          $('#action-code').val('allocate-new');
        }else{
          numberDetails = 1;
          $('#action-code').val('port-existing');
        }
        let data = {
                       "securityNumber": securityNumber,
                       "email": email,
                        "phoneNumber": phoneNumber,
                        "offerId": offerId,
                        "numberDetails": numberDetails,
                        "tempval": tempval
                      };
          
        axios({
        url: 'https://api.renewed.se/api/frontApi/validateOffers',
        method: 'post',
        dataType: 'json',
        data: {
          securityNumber,email,phoneNumber,offerId, numberDetails , tempval
          
        }
      }).then((result) => {
          
          if(result.data.status == 200){
            if (!$('.number_check').is(':checked')) {
            $('.number_check').prop('checked', false); 
            }
          
             $('.number_check').removeAttr('disabled'); 
            if($(".check_number_self").hasClass("show") == true){
              $(".check_number_self").removeClass("show");
              $('input#self-Number').css('border','');
            }
            $(".validationError").css("display","none");
            $(".Vimla_button").removeClass("Button--show");
            if(!all_prolength > 0){
            $(".ProductForm__AddToCart").removeClass("Button--hide");
           }
            $('.Vimla_second').removeClass('Button--hide');
            $(".vimla_modal").removeClass('is-show');
           $('body').css('overflow','scroll');
           $("vimla_modal.body"). removeClass('is-hide');
           $('.final_model').removeClass('new-active');
           $('.Product__InfoWrapper.vimla_product').css('z-index','inherit');
            $('#shopify-section-header').removeClass('z-index-hide')
           $('.Drawer').css('visibility','visible');
             // setTimeout(()=>{
             //   $(".Drawer__Footer .custom_checkoutbutton").removeClass('Button--hide');
             //    console.log("custom show");
             //   $(".Drawer__Footer .Cart__Checkout").addClass('Button--hide'); 
             //   console.log("main hide"); 
             // }, 3000);
            if(all_prolength > 0){
           var free_all = $("#free_allproduct").attr("value");
           free_sample(free_all); 
            }
            else{
           var free_vimla = $('#free_sub_product').attr("value");
           free_sample(free_vimla);
            }
           setTimeout(()=>{
              $(".ProductForm__AddToCart").trigger("click");
          },2000);
      let name = 'cart';
      delete_cookie(name);
          }else{
            $(".validationError").css("display","block");
            $(".validationError").text(result.data.data);
          }
          }).catch((error) => {
             $(".validationError").css("display","block");
             $(".validationError").text("Något gick fel!");
        }); 
      } 
  });
 // All DETAIL SUBMIT FUNCTION ON BUTTON : END   

// Select OFFERS PLAN NUMBER : START 
  function modelBuyNow(){
  $('.model_buy_now').on('click',function(e) {
      e.preventDefault();           
    var offerCode = $(this).attr('offer-id');
    $('#offer-code').val(offerCode)
    $(".final_model").attr("offerId",offerCode);
    $('.final_model').addClass('new-active')
    $(".vimla_modal .body").addClass('is-hide');
    if($(".vimla_modal_inner .final_model").hasClass("new-active")){
     // console.log("check true")
    }
     var offerText = $(this).attr("offerText");
     $("#offer_text").val(offerText);
     $("#otp_number").val("");
  });
}
// Select OFFERS PLAN NUMBER : END

// EVOLI CHECKBOX FUNCTION : START  
      $('#evoli_prefilled_no').prop('checked',true);
$('#evoli_checkbox').on('change',function() {
     if ($('input#evoli_checkbox').prop('checked')) {
       var category = $('.category').text();
       var brand = $('.brand').text();
       var insuranceMessage = $('.insurance_message').text()
       $('#evoli-code').val(insuranceMessage);
       $('#evoli-category').val(category);
       $('#evoli-brand').val(brand);
       $('.Vimla_button').removeClass('Button--show');
       $('.ProductForm__AddToCart').removeClass('Button--hide');
       $('.Vimla_second').removeClass('Button--show');
       $('.Vimla_second').addClass('Button--hide');
     } else {
       $('#evoli-code').removeAttr("value");
       $('#evoli-category').removeAttr("value");
      $('#evoli-brand').removeAttr("value");
     }
});
// EVOLI CHECKBOX FUNCTION : END
  
// NEW NUMBER REQUEST : START
   $('#check_number_self').on('change',function() {
     if ($('input#check_number_self').prop('checked')) {
        $('.check_number_self').addClass('show');
        $('#cehck_regular_number').prop('checked',false);
        $('.show-error').removeClass('Active');
        $('#cehck_regular_number').removeAttr('value');
      } else {
        $('.check_number_self').removeClass('show');  
      }
   });
// NEW NUMBER REQUEST : START
  
// REGULAR NUMBER CHECK : START 
  $('#cehck_regular_number').on('change',function() {
     if ($('input#cehck_regular_number').prop('checked')) {
       $('#check_number_self').prop('checked',false);
       var newDetails = $('.number-details').text();
       $('#cehck_regular_number').val(newDetails);
       $('.check_number_self').removeClass('show'); 
       $('.show-error').removeClass('Active');
       $('#self-Number').val('');
     } else {
       $('#cehck_regular_number').val('');
     }
  });
// REGULAR NUMBER CHECK : END
  
// MODEL CLOSE BUTTON : START 
  $('.vimla_modal .close_btn').click(function(){
     $(".vimla_modal").removeClass('is-show');
     $(".vimla_modal .body").removeClass('is-hide');
     $('.final_model').removeClass('new-active');
     $('.Product__InfoWrapper.vimla_product').css('z-index','inherit');
    $('#shopify-section-header').removeClass('z-index-hide')
     $('.Drawer').css('visibility','visible');
     $('body').css('overflow','scroll');
  });
// MODEL CLOSE BUTTON : END 

	// VIMLA BUTTON ON CLICK ALL FIELD CLEAR   	
$(".Vimla_button").click(function(){	
    $('input#offer_text').removeAttr('value');	
    $('input#offer-code').removeAttr('value');	
    $('#cehck_regular_number').val('');	
    $("input#email").val('');	
    $("input#Number").val('');	
    $("input#self-Number").val('');	
    $('#cehck_regular_number').prop('checked',false);	
    $('#vimla_trms').prop('checked',false);	
    $('#check_number_self').prop('checked',false);	
    $(".validationError").hide();
    $('#action-code').val('');
    $('#action-code').val('');
    $('#temp-code').val('');
    $(".check_number_self").removeClass("show");
});	


// MODEL CLOSE ARROW : START
  $('.vimla_modal .vimla_modal_close').click(function(){
    // $('input#offer_text').removeAttr('value');
    // $('input#offer-code').removeAttr('value');
    // $('#cehck_regular_number').val('');
    // $("input#email").val('');
    // $("input#Number").val('');
    // $("input#self-Number").val('');
    $(".vimla_modal").removeClass('is-show');
    $('.Product__InfoWrapper.vimla_product').css('z-index','inherit');
    $('#shopify-section-header').removeClass('z-index-hide')
    $('.Drawer').css('visibility','visible');
    $(".vimla_modal .body").removeClass('is-hide');
    $('.final_model').removeClass('new-active');
    $('body').css('overflow-y','scroll');
  });
// MODEL CLOSE ARROW : END 
  
// VIMLA FIRST CHECKBOX FUNCTION : START 
  $('#vimla_subscription').on('change',function() {
    var get_free_id = $("#free_sub_product").attr("value");
    var get_non_id = $("#free_vimlaproduct").attr("value");
    var sub_length = $("#free_sub_product").length;
    var nonsub_length = $("#free_vimlaproduct").length;
    var all_Prod_length = $("#free_allproduct").length;
    if ($("#vimla_subscription").prop('checked')) {
               $.ajax({
                    type: 'GET',
                    url: '/cart.js',
                    cache: false,
                    dataType: 'json',
                    success: function(data) {         
                       $(data).each(function(i,allData){
                         var Maindata = data.items
                         $(Maindata).each(function(i,GetData){
                            var mainID = GetData.variant_id;
                          

                           var newData = GetData.properties;
                           for (let i = 0; i < $(newData).length; i++) {
                               var newDataVal = newData._vimla
                               var newDataVal_code = newData.verification_code
                              }
                              if (newDataVal) {
                                if(!all_Prod_length > 0){
                                   $('.Vimla_button').removeClass('Button--show');
                                   $('.Vimla_second').removeClass('Button--hide');
                                   $('.ProductForm__AddToCart').addClass('Button--hide');
                                  console.log("yes")
                                 }
                                   $('.vimla_error').css('opacity','1')
                                   $('#vimla_subscription').prop('checked', false);
                                    setTimeout(function () {
                                     $('.vimla_error').css('opacity','0')
                                    }, 1500);
                               } 
                              else if((sub_length > 0 && nonsub_length > 0) && (newDataVal || newDataVal_code ) && mainID){
                                $('.Vimla_button').removeClass('Button--show');
                                   $('.Vimla_second').removeClass('Button--hide');
                              
                                   $('.ProductForm__AddToCart').addClass('Button--hide');
                                   $('.vimla_error').css('opacity','1')
                                   $('#vimla_subscription').prop('checked', false);
                                    setTimeout(function () {
                                     $('.vimla_error').css('opacity','0')
                                    }, 1500);
                                }
                               else {
                           
                               }
                         });
                        });
                    }
                });

      $('.Vimla_button').addClass('Button--show');
      $('.ProductForm__AddToCart').addClass('Button--hide');
      $('.Vimla_second').addClass('Button--hide');
    } else {
      $('input#offer_text').removeAttr('value');	
      $('input#offer-code').removeAttr('value');	
      $('#cehck_regular_number').val('');	
      $("input#email").val('');	
      $("input#Number").val('');	
      $("input#self-Number").val('');	
      $('#cehck_regular_number').prop('checked',false);	
      $('#vimla_trms').prop('checked',false);	
      $('#check_number_self').prop('checked',false);	
      $(".validationError").hide();
      $('#action-code').val('');
      $('#action-code').val('');
      $('#temp-code').val('');
      $(".check_number_self").removeClass("show");
      $('.Vimla_button').removeClass('Button--show');
      $('.ProductForm__AddToCart').removeClass('Button--hide');
      if(!all_Prod_length > 0){
      $('.Vimla_second').removeClass('Button--hide');
      }  
     } 
  });
// VIMLA FIRST CHECKBOX FUNCTION : END 
  
// VIMLA SECOND CHECKBOX FUNCTION : START 
  $('#unsubscrib_checkbox').on('change',function() {
var get_free_id = $("#free_sub_product").attr("value");
    var get_non_id = $("#free_vimlaproduct").attr("value");
    var sub_length = $("#free_sub_product").length;
    var nonsub_length = $("#free_vimlaproduct").length;
    
    if ($("#unsubscrib_checkbox").prop('checked')) {
               $.ajax({
                    type: 'GET',
                    url: '/cart.js',
                    cache: false,
                    dataType: 'json',
                    success: function(data) {         
                       $(data).each(function(i,allData){
                         var Maindata = data.items
                         $(Maindata).each(function(i,GetData){
                           var mainID = GetData.variant_id
                           var newData = GetData.properties;
                           for (let i = 0; i < $(newData).length; i++) {
                               var newDataVal = newData.verification_code
                               var newDataVal_code = newData._vimla
                              }
                              if (newDataVal) {
                                   $('.Vimla_button').removeClass('Button--show');
                                   $('.Vimla_second').removeClass('Button--hide');
                                   $('.ProductForm__AddToCart').removeClass('Button--hide');
                                   $('.vimla_error').css('opacity','1')
                                     $('#unsubscrib_checkbox').prop('checked', false); 
                                    setTimeout(function () {
                                     $('.vimla_error').css('opacity','0')
                                    }, 1500);
                               }
                               else if((sub_length > 0 && nonsub_length > 0) && (newDataVal || newDataVal_code ) && mainID){
                                $('.Vimla_button').removeClass('Button--show');
                                   $('.Vimla_second').removeClass('Button--hide');
                                   $('.ProductForm__AddToCart').removeClass('Button--hide');
                                   $('.vimla_error').css('opacity','1')
                                   $('#unsubscrib_checkbox').prop('checked', false);
                                    setTimeout(function () {
                                     $('.vimla_error').css('opacity','0')
                                    }, 1500);
                              }
                               else {
                           
                               }
                         });
                        });
                    }
                });

      $('.Vimla_button').addClass('Button--show');
      $('.ProductForm__AddToCart').addClass('Button--hide');
      $('.Vimla_second').addClass('Button--hide');
    } else {
      $('.Vimla_button').removeClass('Button--show');
      $('.ProductForm__AddToCart').removeClass('Button--hide');
      $('.Vimla_second').removeClass('Button--hide');
    } 
  });
// VIMLA SECOND CHECKBOX FUNCTION : END
  
// VIMLA SECOND POPUP : START 
// IF VIMLA CHECKBOX IS NOT CHECKED THEN THIS POPUP WILL BE WORKING : START   
$('.Vimla_second').on("click", function(){
 if($('#unsubscrib_checkbox').prop('checked')){
 $("#offer_text").val("");
 $('.number_title h3').show();
 $('.number_title h4').show();
 $('.vimla_modal_second').addClass('is-show');
 $('body').css('overflow-x','hidden');
 $('.Product__InfoWrapper.vimla_product').css('z-index','58');
 $('#shopify-section-header').addClass('z-index-hide')
 $('.Drawer').css('visibility','hidden');
  }
  if($('#vimla_subscription').prop('checked') == false && $('#unsubscrib_checkbox').prop('checked') == false ){
    $('.vimla_selection_error').css('opacity','1');
    setTimeout(function () {
         $('.vimla_selection_error').css('opacity','0')
        }, 2000);
  }
});
// VIMLA SECOND POPUP : END 
// IF VIMLA CHECKBOX IS NOT CHECKED THEN THIS POPUP WILL BE WORKING : END
  
  $('.vimla_modal_second .modal_close').on('click', function(){
  $('.vimla_modal_second .number_box').removeClass('move-hide');
  $('.vimla_modal_second .otp_box').removeClass('move-show');
     $('.vimla_modal_second').removeClass('is-show');
     $('body').css('overflow-x','visible');
     $('.Product__InfoWrapper.vimla_product').css('z-index','inherit');
     $('#shopify-section-header').removeClass('z-index-hide')
     $('.Drawer').css('visibility','visible');
      $('.number_title h3').show();
          $('.number_title h4').show();
  });
  
 $('#phone_number').keypress(function (e) {    
    var charCode = (e.which) ? e.which : event.keyCode    
    if (String.fromCharCode(charCode).match(/[^0-9]/g))    
        return false;                        
}); 

// VIMLA FIRST BUTTON CLICK FUNCTION : START 
    $('.btn_first').on('click', function(){
     if( $('#phone_number').val().length !== 10 ) {
       $('.number_box_error').addClass('show-e');
     } else {
       $('.number_box_error').removeClass('show-e');
      
       let phoneNumber = $('#phone_number').val();
       axios({
        url: 'https://api.renewed.se/api/frontApi/createDiscount',
        method: 'post',
        dataType: 'json',
        data: {
          phoneNumber
          
        }
      }).then((result) => {
          if(result.data.status == 200){
          $('.number_box_error').removeClass('show-e');
         
          $('.number_box').addClass('move-hide');
          $('.otp_box').addClass('move-show');
          $('.number_title h3').hide();
          $('.number_title h4').hide();
            
      }else{
        $(".showInvalideMobile").text(result.data.message); 
        $(".showInvalideMobile").css("display","block");  
         $('.number_box_error').css('display', 'none');
      }
          });
     }
      
    });
// VIMLA FIRST BUTTON CLICK FUNCTION : END 
  
// VIMLA SECOND BUTTON CLICK FUNCTION : START  
  $('.btn_second').on('click', function(){
       if( $('#otp_number').val().length === 0 ) {
         $('.otp-error').addClass('show-e');
         $('.otp-error').css('display','block');
         $("#otp_number").removeAttr('value');
         $("#otp_number").val("");
       } else {
         $('.otp-error').removeClass('show-e');
         
         let discountCode = $('#otp_number').val();
         axios({
        url: 'https://api.renewed.se/api/frontApi/validateDiscount',
        method: 'post',
        dataType: 'json',
        data: {
          discountCode   
        }
      }).then((result) => {
         
       if(result.data.status == 200){
         $('.otp-error').removeClass('show-e');
         $('.vimla_modal_second').removeClass('is-show');
         $('body').css('overflow-x','visible');
         $('.Product__InfoWrapper.vimla_product').css('z-index','inherit');
         $('#shopify-section-header').removeClass('z-index-hide')
         $('.Drawer').css('visibility','visible');
         $('.number_box').removeClass('move-hide');
         $('.otp_box').removeClass('move-show');
        
         var free_vimla = $('#free_vimlaproduct').attr("value");
         free_sample(free_vimla);
         setTimeout(()=>{
           $(".ProductForm__AddToCart").trigger("click");
         },2000);
         setTimeout(()=>{
                 $.ajax({
                  type: 'GET',
                  url: '/cart.js',
                  cache: false,
                  dataType: 'json',
                  success: function(data) {         
                     $(data).each(function(i,MainData){
                       var numberdata = data.items
                       $(numberdata).each(function(i,mainData){
                           var newData = mainData.properties;
                           for (let i = 0; i < $(newData).length; i++) {
                               var newDataVal = newData.verification_code
                              }
                              if (newDataVal) {
                                   $('.Vimla_second').attr("disabled", 'disabled');
                                   $('.CartItem__QuantitySelector').css('display', 'none');
                               } else {
                                   $('.Vimla_second').removeAttr("disabled");
                                   $('.CartItem__QuantitySelector').css('display', 'block');
                               }
                         });
                     });
                    }
                  });
           },3500);
      }else{
         $("#otp_number").val("");
        $("#otp_number").removeAttr('value');
        $(".showInvalideDiscount").text(result.data.message); 
        $(".showInvalideDiscount").css("display","block"); 
        $('.otp-error').css('display','none');
      }
     });       
   }
  });
// VIMLA SECOND BUTTON CLICK FUNCTION : END

// FREE ACCESSORIE GETS REMOVED ON VIMLA PRODUCT REMOVE BUTTON (MULTIPLE) FUNTIONS : START 
function cartrefresh(){
   document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
      bubbles: true
  }));
}
function discodeclick(){
  // console.log("clicked ProductForm__AddToCart");
  var discount_codedata = $("#auto_discount-code").length;
  setTimeout(()=>{
  $.ajax({
          type: 'GET',
          url: '/cart.js',
          cache: false,
          dataType: 'json',
          success: function(data) {         
   $(data).each(function(i,allData){
     var Maindata = data.items
     $(Maindata).each(function(i,GetData){
     var mainID = GetData.variant_id;
                          
     var newData = GetData.properties;
     for (let i = 0; i < $(newData).length; i++) {
         var newDataVal = newData._vimla
         var newDataVal_code = newData.verification_code
      }
      // console.log(discount_codedata , "discoint kenthg")
       if (newDataVal && discount_codedata > 0 ) {
       //  console.log("get discount code");     
       //  console.log(newDataVal); 
          setTimeout(()=>{
               $(".Drawer__Footer .custom_checkoutbutton").removeClass('Button--hide');
                console.log("custom show");
               $(".Drawer__Footer .Cart__Checkout").addClass('Button--hide'); 
               console.log("main hide"); 
             }, 3000);
       }    
       });
      });
    }
  });
  },2000); 
}
  
$(document).on("click",".CartItem__Remove", function() {
  discodeclick();
 // console.log("DIT AUS");
   $('.Vimla_second').removeAttr("disabled");
     var remove_id = $(this).attr("data-item-id");
     var sub_length = $("#free_sub_product").length;
    var nonsub_length = $("#free_vimlaproduct").length; 
    var all_prolength = $("#free_allproduct").length;
//  console.log(sub_length);
//  console.log(nonsub_length);
 // console.log(all_prolength);

                   
      $.ajax({
    type: 'GET',
    url: '/cart.js',
    cache: false,
    dataType: 'json',
    success: function(data) { 
           var cart_items = data.items;         
        for (let i = 0; i < cart_items.length; i++) {
           var items = cart_items[i];
           item_property = items.properties;
        for (let i = 0; i < $(item_property).length; i++) {
           var otp_code = item_property.verification_code;
           let dis_Code = $('#otp_number').val(); 
           var sub_code = item_property._vimla;
        
        }
         var item_id = items.id 
           if((item_id == remove_id ) && (all_prolength > 0) && (sub_code || otp_code)){
           var remove_giftfor_all = $("#free_allproduct").attr("value");           
          jQuery.post('/cart/change.js', { quantity: 0, id: remove_giftfor_all });
            setTimeout(cartrefresh, 1500);
          //   console.log("dit 1");
         //    console.log(remove_giftfor_all , "remove gift");
         }
         if((item_id == remove_id && sub_code) && (sub_length > 0 && nonsub_length == 0)) {
            var remove_gift = $("#free_sub_product").attr("value");
            jQuery.post('/cart/change.js', { quantity: 0, id: remove_gift });
            setTimeout(cartrefresh, 1500);
            $('.vimla_btn').removeAttr("disabled");
         }
          if((item_id == remove_id && otp_code) &&(sub_length == 0 && nonsub_length > 0)){
             var remove_giftID = $("#free_vimlaproduct").attr("value");
              jQuery.post('/cart/change.js', { quantity: 0, id: remove_giftID });
              setTimeout(cartrefresh, 1500);
           }
         if((item_id == remove_id ) && (sub_length > 0 && nonsub_length > 0) && (sub_code || otp_code)){
             var remove_giftID = $("#free_vimlaproduct").attr("value");
             jQuery.post('/cart/change.js', { quantity: 0, id: remove_giftID });
             setTimeout(cartrefresh, 1500);
           } 
         if((item_id == remove_id ) && (sub_length > 0 && nonsub_length > 0) && (sub_code || otp_code)){
            var remove_gift = $("#free_sub_product").attr("value");
            jQuery.post('/cart/change.js', { quantity: 0, id: remove_gift });
            setTimeout(cartrefresh, 1500);
           }
        }
     
    }
       
      });
   $('input#offer_text').removeAttr('value');
 });   
// FREE ACCESSORIE GETS REMOVED ON VIMLA PRODUCT REMOVE BUTTON (MULTIPLE) FUNTIONS : END  
$('form [type="submit"]').click(function(){
    var evoli_code = $('#evoli-code').val();
    var evoli_category = $('#evoli-category').val();
    var evoli_brand = $('#evoli-brand').val();

      if(evoli_code == ''){
          $('#evoli-code').val("");
      }
      if(evoli_category == ''){
        $('#evoli-category').remove();
      }
      if(evoli_brand == ''){
        $('#evoli-brand').remove();
      }
  });

// $('.evoli_checkbox_prefilled_content-1 input, #evoli_checkbox').trigger('click');
   // $('#evoli_prefilled_yes').prop('checked', true);
  $('#evoli_prefilled_yes').click(function(){
     $("#evoli_checkbox").click();
    if(!$(".ProductForm__AddToCart").hasClass("page_vimla_cart")){	
    // console.log("checking first one");	
     
      setTimeout(function(){ 	
       $('.Vimla_second').addClass('Button--hide'); 	
      },100);	
      
    }	
    if($('#vimla_subscription').prop('checked') && !$(".ProductForm__AddToCart").hasClass("page_vimla_cart")){	
    //  console.log("ues checked")	
        $('input#offer_text').removeAttr('value');
       setTimeout(function(){ 	
       $('.ProductForm__AddToCart').addClass('Button--hide'); 	
      },100);	
    }
    else{
         $('.ProductForm__AddToCart').addClass('Button--show'); 	
    }
    
  });
  $('#evoli_prefilled_no').click(function(){
   $('#evoli-code').val("");
  });
    $('.evoli_checkbox_prefilled_main input').click(function(){
      // $("#evoli_checkbox").click();
      var prefilled_value = $('.evoli_check:checked').val();
    
    
    if(prefilled_value == 'yes'){
       $('#evoli_checkbox').prop('checked',true);
      }else{
       $('#evoli_checkbox').prop('checked',false);
      }
    });

    $('#evoli_checkbox').click(function(){

       if($('#vimla_subscription').prop('checked') || $('#unsubscrib_checkbox').prop('checked') ){	
      setTimeout(function(){        	
        $('.Vimla_button').removeClass('Button--hide'); 	
        $('.Vimla_button').addClass('Button--show');	
      },100);	
      } else {	
      setTimeout(function(){	
        $('.Vimla_second').removeClass('Button--hide'); 	
      },100);	
      }
      var prefilled_value = $('.evoli_check:checked').val();
      var evoli_check = $('#evoli_checkbox').prop('checked');
     
      if(evoli_check == true){
        $('#evoli_prefilled_no').prop('checked',false);
        $('#evoli_prefilled_yes').prop('checked', true);
      }else{
       $('#evoli_prefilled_yes').prop('checked',false);
       // $('#evoli_prefilled_no').prop('checked', true);
      }
       
    });

    $('[type="submit"][data-action="add-to-cart"]').click(function(){
       var evoli_check = $('#evoli_checkbox').prop('checked' , false);
        console.log(evoli_check);
        setTimeout(function () {
          if(evoli_check == true) {
            $('#evoli_checkbox').attr('checked',true);
            $("#evoli_checkbox").click();
           $('#evoli_prefilled_no').prop('checked',false);
           $('#evoli_prefilled_yes').prop('checked', true);
          }else{
            $('#evoli_checkbox').attr('checked',false);
           $('#evoli_prefilled_yes').prop('checked',false);
           $('#evoli_prefilled_no').prop('checked', true);
          }
          },1500);
    });
  
  // // selected evoli button is display 
  //  $('[type="submit"][data-action="add-to-cart"]').click(function(){
  //         var evoli_check = $('#evoli_checkbox').prop('checked');
  //       console.log(evoli_check);
  //       setTimeout(function () {
  //         if(evoli_check == true){
  //           $('#evoli_checkbox').attr('checked',true);
  //           $('#evoli_prefilled_no').prop('checked',false);
  //           $('#evoli_prefilled_yes').prop('checked', true);
  //         }else{
  //           $('#evoli_checkbox').attr('checked',false);
  //           $('#evoli_prefilled_yes').prop('checked',false);
  //           $('#evoli_prefilled_no').prop('checked', true);
  //         }
  //         },1500);
  //   });
 // selected evoli button is display 
       $(".evoli-readmore").click(function() {
      $(".evoli-pop-up-content .popup").fadeIn(500);
       $("body").css({"overflow": "hidden"});
    });
     $(".vimla-popup").click(function() {
      $(".vimla-pop-up-content .popup").fadeIn(500);
       $("body").css({"overflow": "hidden"});
    });
    $(".close").click(function() {
      $(".popup").fadeOut(500);
       $("body").css({"overflow": "auto"});
    });
  
$('.ProductForm__AddToCart').on("click", function(){
discodeclick();
  console.log("BHAI BHAI")
  
  // after complete the process of vimla then normal add to cart button active :start
    $('.ProductForm__AddToCart').removeClass('Button--hide'); 	
   $('.Vimla_second').addClass('Button--hide');
   $('.Vimla_button').addClass('Button--hide');
   // $('.Vimla_button').addClass('Button--show');
    // after complete the process of vimla then normal add to cart button active : end
    
});
discodeclick();
  
// $('.Vimla-chech_with_evoli input[type="checkbox"]').on('change', function() {
//     $('input[name="' + this.name + '"]').not(this).prop('checked', false);
// });  

var DataSku = $('.product-select-v').find(":selected").attr('data-sku');
 if ( DataSku.includes("VM")){
 //  console.log("sku contained");
   $('.Vimla_second').removeClass('Button--hide');
  // console.log($('.Vimla_second'));
 }  

  // Code for hide frequently-bought-together in vimla products : start
    $('#vimla_subscription').on('change',function() {
       if ($("#vimla_subscription").prop('checked')) {
         if ($(".frequently-bought-together")) {
             $('.frequently-bought-together').addClass('d-none');
         }
       } else {
         if ($(".frequently-bought-together")) {
           $('.frequently-bought-together').removeClass('d-none');
         }
       }
    });  
  // Code for hide frequently-bought-together in vimla products : end
});


// sticky KOP
if($(window).width() < 640) { 

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
var currentHeight = $('.Vimla-chech_with_evoli').position().top - 250;
  if (scroll <= currentHeight) {
        $(".followMeBar").addClass("fixedbuybutton");
       }
     else {
        $(".followMeBar").removeClass("fixedbuybutton"); 
    }
});
}

if($(window).width() <= 320) { 

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
var currentHeight = $('.Vimla-chech_with_evoli').position().top - 100;
  if (scroll <= currentHeight) {
        $(".followMeBar").addClass("fixedbuybutton");
   // console.log("currentHeight");
       }
     else {
        $(".followMeBar").removeClass("fixedbuybutton");
    }
});
}
// sticky KOP End

 // Quanty zero code

  $(document).ready(function() {    
  $(document).on("click", ".cart_qty_minus", function(){
  
       var qtyzero = parseInt($('.QuantitySelector__CurrentQuantity').val());
       console.log(qtyzero,"zero zero");
  
          var sub_length_charvi = $("#free_vimlaproduct").length;
          console.log(sub_length_charvi,"sub_length_charvi");

    if(qtyzero <= 1){
      $('.CartItem__Remove').trigger('click');
    }

  });
  });
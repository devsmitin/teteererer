/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

document.querySelector('.Drawer__Close').addEventListener('click', function(){
  console.log('close!!');
  if(document.querySelector('.Drawer--small')){
    document.querySelector('.Drawer--small').setAttribute('aria-hidden','true');
  }
  document.querySelector('#sidebar-cart').setAttribute('aria-hidden','true');
  document.querySelector('.Search-new').style.zIndex = 10;
});
if(document.querySelector('.Header__page__Icon')){
  document.querySelector('.Header__page__Icon').addEventListener('click', function(event){
    event.preventDefault();
    document.querySelector('.PageOverlay').classList.add('hide-no-js')
  });
}


$(document).ready(function() { 
  $(".Skick").each(function(){
    var input_value = $(this).find(".SizeSwatch__Radio:checked").attr("data-value")
    $(".oprion_desc").each(function(){
      // $(this).removeClass("active");
      var descValue = $(this).attr("data-value")    
      if ( input_value == descValue ) {
        $(this).addClass("active");
      }
    });
  });


  $(".Skick").on("click", function(){
    var input_value = $(this).find(".SizeSwatch__Radio").val()
    $(".oprion_desc").each(function(){
      $(this).removeClass("active");
      var descValue = $(this).attr("data-value")    
      if ( input_value == descValue ) {
        $(this).addClass("active");
      }
    });
  });
  var vimpla_btn = document.querySelectorAll('.vimpla_btn')

  var height = $(window).height();
  if(height < 750 ){
    $('.content_popup .content_main .popup').addClass('min-700')
    $('.content_popup .content_main .popup .popup_content').addClass('min-700-content')
  }
  $('.vimpla_btn').on('click',function(){
    var data = $(this).attr('data-content');
    $('.content_popup').find('.popup_content').html(data)
    $('.content_popup').removeClass('d-none');
  });

  $('.close_popup').on('click',function(){
    $('.content_popup').find('.popup_content').html('')
    $('.content_popup').addClass('d-none');
  })
      $('.accessories_btn').click(function(e){
      e.preventDefault();
        var PDID = $(this).attr("data-var_id");

        console.log(PDID)
        addItemtoCart( PDID, 1,this );    // paste your id product number
        $('.cart_dr').trigger( "click" );
      });
     
        function addItemtoCart(variant_id, qty,tag) {
        data = {
          "id": variant_id,
          "quantity": qty
        }
        jQuery.ajax({
          type: 'POST',
          url: '/cart/add.js',
          data: data,
          dataType: 'json',
          success: function() {
            document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
              bubbles: true
            }));
            $('#sidebar-cart').attr('aria-hidden','false');
            $('.PageOverlay').addClass('is-visible');
          },
          error:function(){
            var title = $(tag).closest('.ProductForm_addtocart').siblings('.ProductItem__Info').find('.ProductItem__Title.Heading a').text();
            var html = `<h1 class="ProductForm__Error Alert Alert--error side_error">${title} finns i din varukorg.</h1>`
            $(tag).closest('.ProductItem').append(html)
            $(tag).closest('.ProductItem').css('flex-direction','column')
            setTimeout(function(){$('.side_error').remove()},2000)
          }
        }); 

      }      
 

       $('.ad_to_cart_coll').click(function(e){
        e.preventDefault();
        // var ID = $(this).attr("data-var_id");

         var ID = $(this).attr("data-vari-id")
         
        addItemToCart( ID, 1,this );    // paste your id product number
        $('.cart_dr').trigger( "click" );
      });


      function addItemToCart(variant_id, qty,tag) {
        data = {
          "id": variant_id,
          "quantity": qty
        }
        jQuery.ajax({
          type: 'POST',
          url: '/cart/add.js',
          data: data,
          dataType: 'json',
          success: function() {
            document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
              bubbles: true
            }));
            $('#sidebar-cart').attr('aria-hidden','false');
            $('.PageOverlay').addClass('is-visible');
          },
          error:function(){
            var title = $(tag).closest('.ProductForm_addtocart').siblings('.ProductItem__Info').find('.ProductItem__Title.Heading a').text();
            var html = `<h1 class="ProductForm__Error Alert Alert--error side_error">${title} finns i din varukorg.</h1>`
            $(tag).closest('.ProductItem').append(html)
            $(tag).closest('.ProductItem').css('flex-direction','column')
            setTimeout(function(){$('.side_error').remove()},2000)
          }
        }); 

      }   


      $('.Drawer__Close').on('click', function(){
        $('.PageOverlay').removeClass('is-visible');
        //         $('.Drawer--small').attr('aria-hidden','true');
        $('#sidebar-cart').attr('aria-hidden','true');  
      });
      $('.PageOverlay').on('click', function(){
        $('#sidebar-cart').attr('aria-hidden','true'); 
        $('.PageOverlay').removeClass('is-visible');
      });
  
   var selectLength

    $('.product-select-v .variant_select').each((i,item)=>{
      selectLength = $(item).html().split('/');
    })

    if(selectLength){
    if(selectLength.length > 2){

      // When there are three option selections, this code will run
      
      var flagClick = false;
      var clickDiv

      // This function is to fetch the data for the last option
      var colorActive = (disabled,available,select_option,swatchRadio,swatchColor) =>{
        var selectedFirst
        var selectedSecond
        var selectedThird
        $('.SizeSwatchList .SizeSwatchListli').removeClass('next_click');
        setTimeout(function(){
          $('.SizeSwatchList:eq(0) .SizeSwatchListli').each(function(k,li){
            if($(li).find('.SizeSwatch__Radio').prop("checked")){
              selectedFirst = $(li).find('.SizeSwatch__Radio').val()
            }
          });
          $('.SizeSwatchList:eq(1) .SizeSwatchListli').each(function(k,li){
            if($(li).find('.SizeSwatch__Radio').prop("checked")){
              selectedSecond = $(li).find('.SizeSwatch__Radio').val();
            }
          });
          $('.SizeSwatchList:eq(2) .SizeSwatchListli').each(function(k,li){
            if($(li).find('.SizeSwatch__Radio').prop("checked")){
              selectedThird = $(li).find('.SizeSwatch__Radio').val()
            }
          });
          $('.SizeSwatchList:eq(2) .SizeSwatchListli').each(function(i,item2){
            var colorFlag = $(item2).find('.SizeSwatch__Radio').val();
            if(select_option.includes(colorFlag)){
              $(this).addClass('active');
              if(disabled == 'disabled'){
                if((select_option.split('/')[2].split('-')[0].toLowerCase().trim() == colorFlag.toLowerCase().trim()) &&  select_option.includes(`${selectedFirst} / ${selectedSecond} / ${colorFlag}`)){
                  $(item2).addClass('cross_for_sold_out');  
                }
              }else if(available == 'available'){
                if((select_option.split('/')[2].split('-')[0].toLowerCase().trim() == colorFlag.toLowerCase().trim()) &&  select_option.includes(`${selectedFirst} / ${selectedSecond} / ${colorFlag}`)){
                  $(item2).removeClass('cross_for_sold_out');
                  if($(item2).find('label').attr('data-tooltip')){
                    $(item2).addClass('next_click');
                  }else{
                    $(item2).addClass('currentSelected');
                  }
                }
              }
            }
          });
          if(flagClick){
              if($(swatchRadio).siblings('label').attr('data-tooltip')){
              }else{
                //               $('.SizeSwatchList:eq(2) .next_click').addClass('tooltip_hide');
                $('.SizeSwatchList:eq(2) .next_click:eq(0)').find('label').trigger('click');
                return false;
              }
          }
        },300);
          $('.SizeSwatchList').each(function(i,itemLi){
            if($(itemLi).find('.SizeSwatchListli').find('label').attr('data-tooltip')){
              $(itemLi).find('.SizeSwatchListli').each((j,item)=>{
                $(item).addClass('tooltip_hide');
              })
            }
          });
          setTimeout(function(){
          $('.SizeSwatchList').each(function(i,itemLi){
            $(itemLi).find('.SizeSwatchListli').each((j,item)=>{
              $(item).removeClass('tooltip_hide');
            })
          });
        },300);
      }

      // This function is to fetch the data for the second option
      var sizeActive = () => {
        $('.SizeSwatchList:eq(0) .SizeSwatchListli').each(function(i,itemLi){
          var sizevalue = $(this).find('.SizeSwatch').html();
          var flag = false;
          $('.variant_select').each(function(i,opt){
            var option = $(this).html();
            if(option.includes(sizevalue)){
              var optDisable = $(opt).attr('disabled');
              var optAvailbale = $(opt).attr('available');
              if(optDisable == 'disabled'){
              }
              if(optAvailbale == 'available'){
                flag = true;
              }
            }
          });
          if(flag){
            $(itemLi).removeClass('cross_for_sold_out');
          }else{
            $(itemLi).addClass('cross_for_sold_out');
          }
        });
      }

      var urlChange = () => {
          var selectedVariant = $('.product-select-v').children("option:selected").val();
           var newurl =
          window.location.protocol +
          '//' +
          window.location.host +
          window.location.pathname +
          '?variant=' +
          selectedVariant;
          window.history.replaceState({ path: newurl }, '', newurl);
      }

      // This function will match the condition and according to that it will work, Also fetch the data for the first option
      function variant_combination(swatch_value,real_swatch,swatchRadio,swatchColor){
        if(!swatchColor){
          $('.SizeSwatchListli').removeClass('cross_for_sold_out');
          $('.SizeSwatchListli').removeClass('next_click');
          $('.SizeSwatchListli').removeClass('active'); 
        }
        var swatchvalue = swatch_value;
        var selectedFirst1        
        var selectedFirst2
        var selectedFirst3

        $('.SizeSwatchList:eq(0) .SizeSwatchListli').each(function(k,li){
          if($(li).find('.SizeSwatch__Radio').prop("checked")){
            selectedFirst1 = $(li).find('.SizeSwatch__Radio').val()
          }
        });
        $('.SizeSwatchList:eq(1) .SizeSwatchListli').each(function(k,li){
          if($(li).find('.SizeSwatch__Radio').prop("checked")){
            selectedFirst2 = $(li).find('.SizeSwatch__Radio').val()
          }
        });
        $('.SizeSwatchList:eq(2) .SizeSwatchListli').each(function(k,li){
          if($(li).find('.SizeSwatch__Radio').prop("checked")){
            selectedFirst3 = $(li).find('.SizeSwatch__Radio').val()
          }
        });
        if(!swatchColor){
          $('.variant_select').each(function(i,item){
          if(this == 'selected'){
            var select_option = $(this).html();
          }
          var select_option = $(this).html();
          var split_value = select_option.split('/');
          var size_value = split_value[0].toLowerCase().trim();
          var conditionValue = split_value[1].toLowerCase().trim();
          var lastValue = split_value[2].split('-')[0].toLowerCase().trim()

          var range_value_select = split_value[1].split('-');
          var range_value = split_value[1].toLowerCase().trim();

          if (size_value == swatch_value){
            var attr = $(this).attr('disabled');
            var attrAvailbale = $(this).attr('available');

            // $('.SizeSwatchListli').each(function(i,item){
            //   var FindValue = $(this).find('.SizeSwatch__Radio').attr('value');
            //   var sizevalue = $(this).find('.SizeSwatch').html().toLowerCase().trim();
            //   if(sizevalue == range_value ){
            //     $(this).addClass('active');
            //     if(attr == 'disabled'){
            //       $(this).addClass('cross_for_sold_out');
            //     }
            //     if(attrAvailbale == 'available'){
            //       $(this).addClass('next_click');
            //       $(this).removeClass('cross_for_sold_out');
            //     }
            //   }
            // });
            var ua = navigator.userAgent.toLowerCase(); 
            if (ua.indexOf('safari') != -1) { 
              if (ua.indexOf('chrome') > -1) {
              } else {
                setTimeout(function(){
                  if(flagClick){
                    $(clickDiv).trigger('click'); 
                  }
                  return false;
                },10);
              }
            }
            colorActive(attr,attrAvailbale,select_option,swatchRadio,swatchColor);
            sizeActive();
          }   

          if (size_value == selectedFirst1.toLowerCase().trim()){
            var attr = $(this).attr('disabled');
            var attrAvailbale = $(this).attr('available');
            $('.SizeSwatchList:eq(0) .SizeSwatchListli').each(function(i,itemLi){
              var sizevalue = $(this).find('.SizeSwatch').html();
              var flag = false;
              $('.variant_select').each(function(i,opt){
                var option = $(this).html();
                if(option.includes(`${selectedFirst1} / ${sizevalue} `)){
                  var optDisable = $(this).attr('disabled');
                  var optAvailbale = $(this).attr('available');
                  if(optDisable == 'disabled'){
                  }
                  if(optAvailbale == 'available'){
                    flag = true;
                  }
                }
              });
              if(flag){
                if($(this).find('label').attr('data-tooltip')){
                  $(this).addClass('currentSelected');
                }else{
                  $(this).addClass('next_click');
                }
                $(itemLi).removeClass('cross_for_sold_out');
              }else{
                $(itemLi).addClass('cross_for_sold_out');
              }
            });
            colorActive(attr,attrAvailbale,select_option,swatchRadio,swatchColor);
            sizeActive();
          }  

          if (conditionValue == selectedFirst2.toLowerCase().trim()){
            var attr = $(this).attr('disabled');
            var attrAvailbale = $(this).attr('available');
            $('.SizeSwatchList:eq(1) .SizeSwatchListli').each(function(i,itemLi){
              var sizevalue = $(this).find('.SizeSwatch').html();
              var flag = false;
              $('.variant_select').each(function(i,opt){
                var option = $(this).html();
                if(option.includes(`${selectedFirst1} / ${sizevalue} `)){
                  var optDisable = $(this).attr('disabled');
                  var optAvailbale = $(this).attr('available');
                  if(optDisable == 'disabled'){
                  }
                  if(optAvailbale == 'available'){
                    flag = true;
                  }
                }
              });
              if(flag){
                if($(itemLi).find('label').attr('data-tooltip')){
                  $(itemLi).addClass('currentSelected');
                }else{
                  $(itemLi).addClass('next_click');
                }
                $(itemLi).removeClass('cross_for_sold_out');
              }else{
                $(itemLi).addClass('cross_for_sold_out');
              }
            });  
            let clickedMainHead = $(swatchRadio).closest('.SizeSwatchList').attr('data-option');
            let mainHead = $('.SizeSwatchList:eq(1)').attr('data-option');

            if(!$(swatchRadio).siblings('label').attr('data-tooltip')){
              // safari issue
              // Compared if clicked option is not color then this condition will run
              if(clickedMainHead == mainHead){
              }else{
                $('.SizeSwatchList:eq(1) .next_click').find('label').trigger('click');
                var ua = navigator.userAgent.toLowerCase(); 
                if (ua.indexOf('safari') != -1) { 
                  if (ua.indexOf('chrome') > -1) {
                  } else {
                    $('.SizeSwatchList:eq(1) .next_click:eq(0)').find('label').trigger('click');
                    $('.SizeSwatchList:eq(1) .next_click').find('label').trigger('click');
                    setTimeout(function(){
                      if(flagClick){
                        setTimeout(function(){
                          $('.SizeSwatchList:eq(1) li').not(".cross_for_sold_out").find('label').trigger('click');
                          $('.SizeSwatchList:eq(1) li').not(".cross_for_sold_out").find('.SizeSwatch__Radio').prop("checked",true);
                        },10)
                      }
                      return false;
                    },10)
                  }
                }
              }
            }
          } 

          if (conditionValue == swatch_value){
            var attr2 = $(item).attr('disabled');
            var attrAvailbale2 = $(item).attr('available');
            colorActive(attr2,attrAvailbale2,select_option,swatchRadio,swatchColor);
            sizeActive();
          } 
        });
        }
        setTimeout(urlChange,400);
      }

      var swatch_value = $('.SizeSwatch__Radio').attr('value').toLowerCase().trim();
      var real_swatch = $('.SizeSwatch__Radio').attr('value');
      var swatchColor = $('.SizeSwatch__Radio').siblings('label').attr('data-tooltip');
      
      variant_combination(swatch_value,real_swatch,$('.SizeSwatch__Radio'),swatchColor);

      $('.SizeSwatch__Radio').click(function(){

        let thisValue = $(this).val();
        let prevClicked = localStorage.getItem("clicked");
         
        // funcFlag is a variable which works as a flag and it prevents variant_combination function to run.
        var funcFlag = true
        if(thisValue == prevClicked){
          funcFlag = false;
        }
        
        flagClick  = true;
        var $click  = $(this);
        localStorage.setItem("clicked", $(this).val());
        var real_swatch = $(this).attr('value')
        var swatch_value = $(this).attr('value').toLowerCase().trim();
        clickDiv = $('.currentSelected').find('label');
        var swatchColor = $(this).siblings('label').attr('data-tooltip');
        if(funcFlag){
          variant_combination(swatch_value,real_swatch,$click,swatchColor);
          if($(this).siblings('label').attr('data-tooltip')){
            $('.SizeSwatchListli').removeClass('currentSelected');
            $(this).closest('.SizeSwatchListli').addClass('currentSelected');
            $('.currentSelected').find('label').trigger('click');
            console.log("THIS",$(this))
            $('.currentSelected').find('label').trigger('click');
          }else{
            $('.next_click').find('label').trigger('click');
          }
        }
         setTimeout(function(){
         var main_src = $(".Product__SlideItem.Product__SlideItem--image.Carousel__Cell.is-selected").find('img').attr("data-original-src");
         $(".ex-product").find('img').attr("srcset", main_src);
      },500);
      });
    }else{

      // When there are two option selections, this code will run
      
      function variant_combination2(swatch_value){
        $('.SizeSwatchListli').removeClass('cross_for_sold_out');
        $('.SizeSwatchListli').removeClass('next_click');
        $('.SizeSwatchListli').removeClass('active');

        var swatchvalue = swatch_value;
        //var color = color;
        $('.variant_select').each(function(){
          var select_option = $(this).html();
          var split_value = select_option.split('/');
          var color_value = split_value[0].toLowerCase().trim();
          var size_value_select = split_value[1].split('-');
          var selectedFirst1  
          var selectedFirst2
          $('.SizeSwatchList:eq(0) .SizeSwatchListli').each(function(k,li){
            if($(li).find('.SizeSwatch__Radio').prop("checked")){
              selectedFirst1 = $(li).find('.SizeSwatch__Radio').val()
            }
          });
          $('.SizeSwatchList:eq(1) .SizeSwatchListli').each(function(k,li){
            if($(li).find('.SizeSwatch__Radio').prop("checked")){
              selectedFirst2 = $(li).find('.SizeSwatch__Radio').val()
            }
          });

          if(color_value == swatchvalue){
            var attr = $(this).attr('disabled');
            var size_value = split_value[1].split('-');
            var size_valuee = size_value[0].toLowerCase().trim();

            $('.SizeSwatchListli').each(function(){
              var sizevalue = $(this).find('.SizeSwatch').html().toLowerCase().trim();
              if(sizevalue == size_valuee )
              {	
                $(this).addClass('active');
                if(attr == 'disabled')
                {
                  $(this).addClass('cross_for_sold_out');
                }
                else{
                  $(this).addClass('next_click');
                }
              }
              //               $('.SizeSwatchList:eq(1) .next_click:eq(0)').find('label').trigger('click');
            });
            var ua = navigator.userAgent.toLowerCase(); 
            if (ua.indexOf('safari') != -1) { 
              if (ua.indexOf('chrome') > -1) {
              } else {
                setTimeout(function(){
                  if(flagClick){
                    $(clickDiv).trigger('click');
                    return false;
                  }
                },10);
              }
            }
          }
          var attr = $(this).attr('disabled');
          var attrAvailbale = $(this).attr('available');
          $('.SizeSwatchList:eq(1) .SizeSwatchListli').each(function(i,itemLi){
            var sizevalue = $(this).find('.SizeSwatch').html();
            var flag = false;
            $('.variant_select').each(function(i,opt){
              var option = $(this).html();
              if(option.includes(`${selectedFirst1} / ${sizevalue} `)){
                var optDisable = $(this).attr('disabled');
                var optAvailbale = $(this).attr('available');
                if(optDisable == 'disabled'){
                }
                if(optAvailbale == 'available'){
                  flag = true;
                }
              }
            });
            if(flag){
              $(itemLi).removeClass('cross_for_sold_out');
            }else{
              $(itemLi).addClass('cross_for_sold_out');
            }
          });
        });
        setTimeout(urlChange,400);
      }
      var swatch_value = $('.selected_variant').attr('data-value').toLowerCase().trim();

      variant_combination2(swatch_value);
      $('.SizeSwatch__Radio').click(function(){
       
        flagClick  = true;
        var swatch_value = $(this).attr('data-value').toLowerCase().trim();
        variant_combination2(swatch_value);
        clickDiv = $('.next_click').find('label');
        $('.next_click').find('label').trigger('click');

        var ua = navigator.userAgent.toLowerCase(); 
        if (ua.indexOf('safari') != -1) { 
          if (ua.indexOf('chrome') > -1) {
          } else {
            setTimeout(function(){
              if(flagClick){
                $('.next_click').find('label').trigger('click');
                return false;
              }
            },10)
          }
        }
       
      });
    }
    }
 
});

  
$(document).ready(function(){
   $.ajax({
    type: 'GET',
    url: '/cart.js',
    cache: false,
    dataType: 'json',
    success: function(data) {
      var single_id = data.items;
      var giftID = $("#free_vimlaproduct").attr("value");
      for(let i = 0; i < single_id.length; i++){
      var line_im = single_id[i];
      var line_id = line_im.id;
        if(giftID == line_id && single_id.length == 1){
          
         
          //     const reloadUsingLocationHash = () => {
          //   window.location.hash = "reload";
          //  console.log("condition got true")
          //     }
          // window.onload = reloadUsingLocationHash();
          //   jQuery.post('/cart/change.js', { quantity: 0, id: giftID });
          window.location = "cart/clear";
        }
      }
    }
   });
});

// $(".CartItem__Remove").click(function(){
//      $.ajax({
//     type: 'GET',
//     url: '/cart.js',
//     cache: false,
//     dataType: 'json',
//     success: function(data) {
//       var single_id = data.items;
// var giftID = $("#free_vimlaproduct").attr("value");
//       console.log(giftID , "gidt")
// for(let i = 0; i < single_id.length; i++){
// var line_im = single_id[i];
// var line_id = line_im.id;
//   if(giftID == line_id && single_id.length == 1){
//     window.location = "cart/clear";
//   }
// }    
//     }
//    });
// })



// =========================Product Page Variant Option selected change on click of add to cart============================
$('.ProductForm__AddToCart').click(function(){
    $('.SizeSwatch__Radio[name="option-1"]').each(function(){
        if($(this).is(':checked')){
            $('.SizeSwatch__Radio[name="option-1"]').removeAttr("checked");
            var checked_data = $(this).val();
            $('.SizeSwatch__Radio[name="option-1"][value="'+checked_data+'"]').attr("checked", "checked");
        }
    });
});


if($(".ProductForm__AddToCart").hasClass('Button--secondary')){
   // console.log($(".ProductItem__Available").addClass("show_error"));
     $(".ProductItem__Available").addClass("show_error");
    $(".ProductItem__Image.small_image").addClass("op_false");
    $('.check').prop('disabled', true);
    setTimeout(function(){
     $('.add_to_cart').prop('disabled', true);
      $(".add_to_cart").addClass('Button--secondary');
      $('.add_to_cart').text('Tillfälligt slut');
    },500);
 }
else{

   $(".ProductItem__Available").removeClass("show_error");
   $(".ProductItem__Image.small_image").removeClass("op_false");
   $('.check').prop('disabled', false);
 
}


 
$(document).ready(function() {
  

  $('.ProductItem__Wrapper.cusom_wrapper').each(function(){
   var onloadcheck  = $(this).find('input[type=radio]:first').prop('checked', true);
    console.log(onloadcheck,"onloadcheckradio");
    
});


  $('.ProductItem__Wrapper.main_wrapper').each(function(){
   var onloadcheckother  = $(this).find('input[type=radio]:first').prop('checked', true);
    console.log(onloadcheckother,"onloadcheckradio");
    
});
  
 setTimeout(function(){
             var main_src = $(".Product__SlideItem.Product__SlideItem--image.Carousel__Cell.is-selected").find('img').attr("data-original-src");
             // console.log(main_src,"mobile");
          var mob =  $(".ex-product").find('img').attr("srcset", main_src);
            // console.log(mob,"iphone");
        },500);

     var checkedValue = $('.check:checked');
     $('.add_to_cart').prop('disabled', false);
    var btn1 =  $('.add_to_cart').attr('attr1'); 
    var btn2 = $('.add_to_cart').attr('attr2');
    num = checkedValue.length + 1;
    num_str = num.toString();
    str = btn1 + " " + num_str + " " + btn2;
  
    $(".add_to_cart").text(str);
    $(".add_to_cart").removeClass('Button--secondary');
    $(".add_to_cart").addClass('Button--primary');

  
  
  $('.ColorSwatch__Radio.custom_radio').each(function() {

    $(this).click(function(){
      
      var imageURL = $(this).attr("data-image-url");
      // console.log(imageURL, "url1");
      
      var variantUrl = $(this).attr("data-variant-url");
      // console.log(variantUrl, "urlvariant");
      
      var variantID = $(this).attr("data-variant_id")
      
      $(this).parents('.ProductItem__Wrapper.cusom_wrapper').find("img.small_image").attr("srcset" , imageURL );
      $(this).parents('.ProductItem__Wrapper.cusom_wrapper').find(".custom_pro_wrap").attr("data-vari-id" , variantID );
      $(this).parents('.ProductItem__Wrapper.cusom_wrapper').find(".check").attr("data-vari-id" , variantID );
     // console.log(this);
    
    });
   
  });

     
 
  $('.ColorSwatch__Radio.main_radio').each(function() {
    $(this).click(function(){      
            var imageURLM = $(this).attr("data-image-url");
            // console.log(imageURLM, "url2");

             var variantUrlM = $(this).attr("data-variant-url");
             // console.log(variantUrlM, "urlvariant");


      var variantIDM = $(this).attr("data-variant_id")
       // console.log(variantIDM, "urlvariant");
      
       $(this).parents('.ProductItem__Wrapper.main_wrapper').find("img.main_small").attr("srcset" , imageURLM );
       $(this).parents('.ProductItem__Wrapper.main_wrapper').find(".custom_pro_wrap_main").attr("data-vari-id" , variantIDM );
       $(this).parents('.ProductItem__Wrapper.main_wrapper').find(".ad_to_cart_coll").attr("data-vari-id" , variantIDM );
      
    })
  });

});

$(document).on('click','.add_to_cart',function(){

   setTimeout(()=>{
              $(".ProductForm__AddToCart").trigger("click");
          },500);

   $('.Vimla_button').removeClass('Button--show');
  var checkedValue = $('.check:checked');
  // console.log(checkedValue.length);
  var items = [];

  checkedValue.each(function(){

     // console.log(checkedValue);

    var attr = $(this).attr("data-vari-id");
    console.log(attr,"data-vari-id");

    if (typeof attr !== 'undefined' && attr !== false) {
    var variant_ID = $(this).attr("data-vari-id");
     console.log(variant_ID);
      items.push(variant_ID);
    console.log(items);
}
  
  
  });
    // console.log(items);
  
$.ajax({
      type: 'GET', 
      url: '/cart/add.js', 
      cache: false,
      data: { 
        id: items, 
      },
      dataType: 'json', 
      success: function(res){
        $.getJSON('/cart.js', function(data) {
       document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
             
            }));
       });   
      }
   });
    
 });


$(document).on('click','.check',function(){


  var checkedValue = $('.check:checked');
  
  // console.log(checkedValue.length);

  if(checkedValue.length==0){
    $('.add_to_cart').prop('disabled', true);
    var btn3 =  $('.add_to_cart').attr('attr3');
    // console.log(btn3, "btn3");
    $(".add_to_cart").text(btn3);
     $(".add_to_cart").removeClass('Button--primary');
     $(".add_to_cart").addClass('Button--secondary');
    $(".add-on").css("display", "block");
   
    
 }
  else{
     $('.add_to_cart').prop('disabled', false);

    var btn1 =  $('.add_to_cart').attr('attr1'); 
    var btn2 = $('.add_to_cart').attr('attr2');
    num = checkedValue.length + 1;
    num_str = num.toString();
    str = btn1 + " " + num_str + " " + btn2;
  
    $(".add_to_cart").text(str);
    $(".add_to_cart").removeClass('Button--secondary');
    $(".add_to_cart").addClass('Button--primary');
    $(".add-on").css("display", "none");
  }

 });


$(document).on('click','.Product__SlideshowNavArrow, .dot',function(){
        setTimeout(function(){
             var main_src = $(".Product__SlideItem.Product__SlideItem--image.Carousel__Cell.is-selected").find('img').attr("data-original-src");
             $(".ex-product").find('img').attr("srcset", main_src);
        },500);
 });

var price = $('.ProductForm .Price--highlight .money').text();
$.trim(price);
 $('.custom_upsel_products_price').text(price);

 var pro_title = $('.product-select-v option:selected').attr('data-variant-title');
$('.var_title').text(pro_title);

  var co_price = $('.ProductForm .Price--compareAt .money').text();
   // console.log(co_price);
    $('.c_price').text(co_price);

$(document).on('click','.SizeSwatch__Radio',function(){
  
var item_not_available = $(this).parent('.cross_for_sold_out');

  // console.log(item_not_available.length);
   if(item_not_available.length){
     
     $('.add_to_cart').prop('disabled', true);
     $('.check').prop('disabled', true);
   }
   else{
     $('.add_to_cart').prop('disabled', false);
     $('.check').prop('disabled', false);
   }
  
 setTimeout(function(){
  var price = $('.ProductForm .Price--highlight .money').text();
$.trim(price);
// console.log(price);
   $('.custom_upsel_products_price').text(price);

   var co_price = $('.ProductForm .Price--compareAt .money').text();
   // console.log(co_price);
    $('.c_price').text(co_price);

   var pro_title = $('.product-select-v option:selected').attr('data-variant-title');
   // console.log(pro_title);

     $('.var_title').text(pro_title);

    var button_disabled =  $('.ProductForm__AddToCart').prop('disabled');
    // console.log(button_disabled);
   if(button_disabled==true){
     $('.add_to_cart').text('Tillfälligt slut');
     $(".add_to_cart").removeClass('Button--primary');
     $(".add_to_cart").addClass('Button--secondary');
   }
   else{
    
  var checkedValue = $('.check:checked');

  if(checkedValue.length==0){
    $('.add_to_cart').prop('disabled', true);
    var btn3 =  $('.add_to_cart').attr('attr3');
    // console.log(btn3, "btn3");
    $(".add_to_cart").text(btn3);
    
 }
  else{
     $('.add_to_cart').prop('disabled', false);

    var btn1 =  $('.add_to_cart').attr('attr1'); 

    var btn2 = $('.add_to_cart').attr('attr2');

    num = checkedValue.length + 1;
    num_str = num.toString();
    str = btn1 + " " + num_str + " " + btn2;
    
    $(".add_to_cart").text(str);
    $(".add_to_cart").removeClass('Button--secondary');
    $(".add_to_cart").addClass('Button--primary');
  }
   }
  },500);
  
  
 });



$(document).ready(function () {
  // Add click event to all labels
  $(".SizeSwatchListli label").click(function () {
    // Remove border from all labels
    $(".SizeSwatchListli label").removeClass("selected_variant");
    // Add border to the clicked label
    $(this).addClass("selected_variant");
  });
});


$(document).ready(function() {
  allulheight();
  allulheight1();
 
});

$(window).resize(function() {
  allulheight();
  allulheight1();
 
});

$(window).load(function() {
  allulheight();
  allulheight1();
 
});

function allulheight() {
  var heightarray = new Array();
  $(".Carousel__Cell .ProductItem .ProductItem__ImageWrapper").each(function() {
    var height = $(this).outerHeight();
    heightarray.push(height);
  });
  var maxheight = Math.max.apply(Math, heightarray);
  $(".Carousel__Cell .ProductItem .ProductItem__ImageWrapper").height(maxheight);
}

function allulheight1() {
  var heightarray1 = new Array();
  $(".Carousel__Cell .ProductItem .ProductItem__Info .ProductItem__Title").each(function() {
    var height1 = $(this).outerHeight();
    heightarray1.push(height1);
  });
  var maxheight1 = Math.max.apply(Math, heightarray1);
  $(".Carousel__Cell .ProductItem .ProductItem__Info .ProductItem__Title").height(maxheight1);
}
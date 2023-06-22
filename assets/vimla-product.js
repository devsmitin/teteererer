$(document).ready(function () {
  // GET CART DATA : START
  function getCart() {
    return fetch("/cart.js").then((res) => res.json());
  }
  // GET CART DATA : END

  // FREE VIMLA ACCESSORIE FUNCTION : START
  async function add_free_sample(sample_id) {
    let fetchURL = "/cart/add.js";
    let items = [
      {
        quantity: 1,
        id: sample_id,
      },
    ];
    let rez = await fetch(fetchURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        let cartData = await getCart();
        console.log(cartData);
        return data;
      })
      .catch((error) => console.log(error));

    return rez;
  }
  // FREE VIMLA ACCESSORIE FUNCTION : END

  // REMOVE ITEMS FROM CART : START
  async function cartUpdateItems(items) {
    let fetchURL = "/cart/update.js";
    let updates = items;
    let rez = await fetch(fetchURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updates }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        let cartData = await getCart();
        console.log(cartData);
        return data;
      })
      .catch((error) => console.log(error));

    return rez;
  }
  // REMOVE ITEMS FROM CART : END

  function delete_cookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    console.log("cookie clear");
  }

  // FREE ACCESSORIE GETS REMOVED ON VIMLA PRODUCT REMOVE BUTTON (MULTIPLE) FUNTIONS : START
  function cartrefresh() {
    document.documentElement.dispatchEvent(
      new CustomEvent("cart:refresh", {
        bubbles: true,
      })
    );
  }
  // FREE ACCESSORIE GETS REMOVED ON VIMLA PRODUCT REMOVE BUTTON (MULTIPLE) FUNTIONS : END

  console.time();
  if ($("#vimla_subscription") !== null) {
    let vimla_btn = $(".vimla_btn");
    $(".addtocart_txt", vimla_btn).removeClass("Button--hide");
    $(".loader", vimla_btn)
      .removeClass("Button--show")
      .addClass("Button--hide");
    vimla_btn
      .removeClass("vimla_pointer_evnts")
      .removeAttr("style")
      .data("success", true);
    console.timeEnd();
  }

  // VIMLA FIRST POPUP USING JAVASCRIPT : START
  $(".Vimla_button").on("click", function () {
    if ($("#vimla_subscription").prop("checked")) {
      let product_select = $(".product-select-v").find(":selected");
      var DataSku = product_select.attr("data-sku");
      var DataTag = product_select.attr("product-tag");
      if (DataSku.includes("VM") || DataTag.includes("subscribed")) {
        let fetchURL = "https://api.renewed.se/api/frontApi/getOffers";

        fetch(fetchURL, { method: "POST" })
          .then((res) => res.json())
          .then((data) => {
            if (data.error == false) {
              let offerData = data.data;
              var html = "";
              var regular_cnt = 0,
                student_cnt = 0,
                above55_cnt = 0;
              var regular = '<div class="regular_sub">';
              var student = '<div class="student_sub">';
              var above55 = '<div class="above55_sub">';
              offerData.map((value) => {
                switch (value.subscriptionType) {
                  case "regular":
                    if (regular_cnt == 0) {
                      regular =
                        '<div class="regular_sub"><span class="regular">Ordinarie</span>';
                      regular_cnt++;
                    }

                    regular += '<div class="model_flex-inner">';
                    regular += '<div class="model_info">';
                    regular += '<div class="model_heading">';
                    regular +=
                      '<h3 class="SectionHeader__Heading Heading u-h4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                      value.amountOfGbData +
                      "GB</font></font></h3>";
                    regular += "</div>";
                    regular += '<div class="model_price">';
                    if (value.discountedPrice != null)
                      regular +=
                        '<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                        value.discountedPrice +
                        "kr/mån</font></font></p>";
                    regular += "</div>";
                    regular += '<div class="model_disc">';
                    regular +=
                      '<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">i ' +
                      value.campaignMonth +
                      " månader därefter " +
                      value.originalPrice +
                      " kr/mån</font></font></p>";
                    regular += "</div>";
                    regular += '<div class="model_buy">';
                    regular +=
                      '<a offer-id="' +
                      value.offerId +
                      '" class="model_buy_now" href="javascript:void(0);" offerText="' +
                      value.amountOfGbData +
                      "GB, " +
                      value.discountedPrice +
                      "kr i " +
                      value.campaignMonth +
                      " mån därefter " +
                      value.originalPrice +
                      ' kr/mån"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Köp nu!</font></font></a>';
                    regular += "</div>";
                    regular += "</div>";
                    regular += "</div>";

                    break;

                  case "student":
                    if (student_cnt == 0) {
                      student =
                        '<div class="regular_sub"><span class="student">Student</span>';
                      student_cnt++;
                    }

                    student += '<div class="model_flex-inner">';
                    student += '<div class="model_info">';
                    student += '<div class="model_heading">';
                    student +=
                      '<h3 class="SectionHeader__Heading Heading u-h4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                      value.amountOfGbData +
                      "GB</font></font></h3>";
                    student += "</div>";
                    student += '<div class="model_price">';
                    if (value.discountedPrice != null)
                      student +=
                        '<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                        value.discountedPrice +
                        "kr/mån</font></font></p>";
                    student += "</div>";
                    student += '<div class="model_disc">';
                    student +=
                      '<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">i ' +
                      value.campaignMonth +
                      " månader därefter " +
                      value.originalPrice +
                      " kr/mån</font></font></p>";
                    student += "</div>";
                    student += '<div class="model_buy">';
                    student +=
                      '<a offer-id="' +
                      value.offerId +
                      '" class="model_buy_now" href="javascript:void(0);" offerText="' +
                      value.amountOfGbData +
                      "GB, " +
                      value.discountedPrice +
                      "kr i " +
                      value.campaignMonth +
                      " mån därefter " +
                      value.originalPrice +
                      ' kr/mån"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Köp nu!</font></font></a>';
                    student += "</div>";
                    student += "</div>";
                    student += "</div>";

                    break;

                  case "above55":
                    if (above55_cnt == 0) {
                      above55 =
                        '<div class="regular_sub"><span class="above55">55+</span>';
                      above55_cnt++;
                    }

                    above55 += '<div class="model_flex-inner">';
                    above55 += '<div class="model_info">';
                    above55 += '<div class="model_heading">';
                    above55 +=
                      '<h3 class="SectionHeader__Heading Heading u-h4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                      value.amountOfGbData +
                      "GB</font></font></h3>";
                    above55 += "</div>";
                    above55 += '<div class="model_price">';
                    if (value.discountedPrice != null)
                      above55 +=
                        '<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                        value.discountedPrice +
                        "kr/mån</font></font></p>";
                    above55 += "</div>";
                    above55 += '<div class="model_disc">';
                    above55 +=
                      '<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">i ' +
                      value.campaignMonth +
                      " månader därefter " +
                      value.originalPrice +
                      " kr/mån</font></font></p>";
                    above55 += "</div>";
                    above55 += '<div class="model_buy">';
                    above55 +=
                      '<a offer-id="' +
                      value.offerId +
                      '" class="model_buy_now" href="javascript:void(0);" offerText="' +
                      value.amountOfGbData +
                      "GB, " +
                      value.discountedPrice +
                      "kr i " +
                      value.campaignMonth +
                      " mån därefter " +
                      value.originalPrice +
                      ' kr/mån"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Köp nu!</font></font></a>';
                    above55 += "</div>";
                    above55 += "</div>";
                    above55 += "</div>";

                    break;

                  default:
                    break;
                }
              });
              if (
                !$(".vimla_modal_inner .final_model").hasClass("new-active")
              ) {
                if ($(".vimla_modal_inner .body").hasClass("is-hide")) {
                  $(".vimla_modal_inner .body").removeClass("is-hide");
                }
                regular += "</div><br>";
                student += "</div><br>";
                above55 += "</div>";
                console.log(regular);
                html += regular;
                html += student;
                html += above55;
                $(".model_flex").html(html);
              } else {
                $(".model_flex").text(data.data);
              }
            }

            $(".vimla_modal").addClass("is-show");
            $("body").css("overflow", "hidden");
            $(".Product__InfoWrapper.vimla_product").css("z-index", "58");
            $("#shopify-section-header").addClass("z-index-hide");
            $(".Drawer").css("visibility", "hidden");
          })
          .catch((error) => {
            console.log(error);
            document.querySelectorAll(".model_flex")[0].textContent =
              "Ops! Något gick fel. Vänligen kontakta Vimlas support på vimla.se/kontakt";
          });
      }
    }
    if ($("#unsubscrib_checkbox").prop("checked")) {
      $(".vimla_modal_second").addClass("is-show");
      $("body").css("overflow-x", "hidden");
      $(".Product__InfoWrapper.vimla_product").css("z-index", "58");
      $("#shopify-section-header").addClass("z-index-hide");
      $(".Drawer").css("visibility", "hidden");
    }
  });
  // VIMLA FIRST POPUP USING JAVASCRIPT : END

  // All DETAIL SUBMIT FUNCTION ON BUTTON : START
  $("input#Number").keypress(function () {
    $("input#Number").css("border", "2px solid #000");
  });

  $(".submit_done").on("click", function () {
    var all_prolength = $("#free_allproduct").length;
    var emailRegex =
      /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if ($("input#Number").val().length === 0) {
      $("input#Number").css("border", "2px solid #FF0000");
    }

    if (
      $("input#email").val().length === 0 ||
      emailRegex.test($("input#email").val()) === false
    ) {
      $("input#email").css("border", "2px solid #FF0000");
      $("input#email").keypress(function () {
        $("input#email").css("border", "2px solid #000");
      });
    }

    if (
      !$("#check_number_self").is(":checked") &&
      !$("#cehck_regular_number").is(":checked")
    ) {
      $(".show-error").addClass("Active");
    }

    if (!$("#vimla_trms").is(":checked")) {
      $(".trms_error").addClass("Active");
    }

    if (
      $("#check_number_self").is(":checked") &&
      $("input#self-Number").val().length !== 10
    ) {
      $(".show-error").removeClass("Active");
      $("input#self-Number").css("display", "block");
      $("input#self-Number").css("border", "2px solid #FF0000");
    } else {
      if ($("#check_number_self").is(":not(:checked)")) {
        $("input#self-Number").css("display", "block");
      }
      $(".trms_error").removeClass("Active");
      $(".show-error").removeClass("Active");
      let securityNumber = $(".form_info #Number").val();
      let email = $(".form_info #email").val();
      let phoneNumber = $("#self-Number").val();
      let offerId = $(".final_model").attr("offerId");
      let tempval = $("#temp-code").val("added");

      var numberDetails = 0;
      if (phoneNumber.length == 0) {
        numberDetails = 0;
        $("#action-code").val("allocate-new");
      } else {
        numberDetails = 1;
        $("#action-code").val("port-existing");
      }

      let fetchURL = "https://api.renewed.se/api/frontApi/validateOffers";
      let post_data = {
        securityNumber,
        email,
        phoneNumber,
        offerId,
        numberDetails,
        tempval,
      };
      fetch(fetchURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post_data),
      })
        .then((result) => result.json())
        .then((data) => {
          if (data.status == 200) {
            if (!$(".number_check").is(":checked")) {
              $(".number_check").prop("checked", false);
            }

            $(".number_check").removeAttr("disabled");
            if ($(".check_number_self").hasClass("show") == true) {
              $(".check_number_self").removeClass("show");
              $("input#self-Number").css("border", "");
            }
            $(".validationError").css("display", "none");
            $(".Vimla_button").removeClass("Button--show");
            if (!all_prolength > 0) {
              $(".ProductForm__AddToCart").removeClass("Button--hide");
            }
            $(".Vimla_second").removeClass("Button--hide");
            $(".vimla_modal").removeClass("is-show");
            $("body").css("overflow", "scroll");
            $("vimla_modal.body").removeClass("is-hide");
            $(".final_model").removeClass("new-active");
            $(".Product__InfoWrapper.vimla_product").css("z-index", "inherit");
            $("#shopify-section-header").removeClass("z-index-hide");
            $(".Drawer").css("visibility", "visible");
            // setTimeout(()=>{
            //   $(".Drawer__Footer .custom_checkoutbutton").removeClass('Button--hide');
            //    console.log("custom show");
            //   $(".Drawer__Footer .Cart__Checkout").addClass('Button--hide');
            //   console.log("main hide");
            // }, 3000);
            if (all_prolength > 0) {
              add_free_sample($("#free_allproduct").attr("value"));
            } else {
              add_free_sample($("#free_sub_product").attr("value"));
            }
            $(".ProductForm__AddToCart").trigger("click");
            delete_cookie("cart");
          } else {
            $(".validationError").css("display", "block");
            $(".validationError").text(data.data);
          }
        })
        .catch((error) => {
          $(".validationError").css("display", "block");
          $(".validationError").text("Något gick fel!");
        });
    }
  });
  // All DETAIL SUBMIT FUNCTION ON BUTTON : END

  // Select OFFERS PLAN NUMBER : START
  $(document).on("click", ".model_buy_now", function (e) {
    e.preventDefault();
    var offerCode = $(this).attr("offer-id");
    $("#offer-code").val(offerCode);
    $(".final_model").attr("offerId", offerCode);
    $(".final_model").addClass("new-active");
    $(".vimla_modal .body").addClass("is-hide");
    if ($(".vimla_modal_inner .final_model").hasClass("new-active")) {
      // console.log("check true")
    }
    var offerText = $(this).attr("offerText");
    $("#offer_text").val(offerText);
    $("#otp_number").val("");
  });
  // Select OFFERS PLAN NUMBER : END

  // EVOLI CHECKBOX FUNCTION : START
  $("#evoli_prefilled_no").prop("checked", true);
  $("#evoli_checkbox").on("change", function () {
    if ($("input#evoli_checkbox").prop("checked")) {
      $("#evoli-code").val($(".insurance_message").text());
      $("#evoli-category").val($(".category").text());
      $("#evoli-brand").val($(".brand").text());
      $(".Vimla_button").removeClass("Button--show");
      $(".ProductForm__AddToCart").removeClass("Button--hide");
      $(".Vimla_second").removeClass("Button--show").addClass("Button--hide");
    } else {
      $("#evoli-code").removeAttr("value");
      $("#evoli-category").removeAttr("value");
      $("#evoli-brand").removeAttr("value");
    }
  });
  // EVOLI CHECKBOX FUNCTION : END

  // NEW NUMBER REQUEST : START
  $("#check_number_self").on("change", function () {
    if ($("input#check_number_self").prop("checked")) {
      $(".check_number_self").addClass("show");
      $("#cehck_regular_number").prop("checked", false);
      $(".show-error").removeClass("Active");
      $("#cehck_regular_number").removeAttr("value");
    } else {
      $(".check_number_self").removeClass("show");
    }
  });
  // NEW NUMBER REQUEST : START

  // REGULAR NUMBER CHECK : START
  $("#cehck_regular_number").on("change", function () {
    if ($("input#cehck_regular_number").prop("checked")) {
      $("#check_number_self").prop("checked", false);
      $("#cehck_regular_number").val($(".number-details").text());
      $(".check_number_self").removeClass("show");
      $(".show-error").removeClass("Active");
      $("#self-Number").val("");
    } else {
      $("#cehck_regular_number").val("");
    }
  });
  // REGULAR NUMBER CHECK : END

  // MODEL CLOSE BUTTON : START
  $(".vimla_modal .close_btn").click(function () {
    $(".vimla_modal").removeClass("is-show");
    $(".vimla_modal .body").removeClass("is-hide");
    $(".final_model").removeClass("new-active");
    $(".Product__InfoWrapper.vimla_product").css("z-index", "inherit");
    $("#shopify-section-header").removeClass("z-index-hide");
    $(".Drawer").css("visibility", "visible");
    $("body").css("overflow", "scroll");
  });
  // MODEL CLOSE BUTTON : END

  // VIMLA BUTTON ON CLICK ALL FIELD CLEAR
  $(".Vimla_button").click(function () {
    $("input#offer_text, input#offer-code").removeAttr("value");
    $(
      "#cehck_regular_number, input#email, input#Number, input#self-Number, #action-code, #temp-code"
    ).val("");
    $("#cehck_regular_number, #vimla_trms, #check_number_self").prop(
      "checked",
      false
    );
    $(".validationError").hide();
    $(".check_number_self").removeClass("show");
  });

  // MODEL CLOSE ARROW : START
  $(".vimla_modal .vimla_modal_close").click(function () {
    $(".vimla_modal").removeClass("is-show");
    $(".Product__InfoWrapper.vimla_product").css("z-index", "inherit");
    $("#shopify-section-header").removeClass("z-index-hide");
    $(".Drawer").css("visibility", "visible");
    $(".vimla_modal .body").removeClass("is-hide");
    $(".final_model").removeClass("new-active");
    $("body").css("overflow-y", "scroll");
  });
  // MODEL CLOSE ARROW : END

  // VIMLA FIRST CHECKBOX FUNCTION : START
  $("#vimla_subscription").on("change", async function () {
    var sub_length = $("#free_sub_product").length;
    var nonsub_length = $("#free_vimlaproduct").length;
    var all_Prod_length = $("#free_allproduct").length;
    if ($("#vimla_subscription").prop("checked")) {
      let cartData = await getCart();
      if (cartData) {
        var Maindata = cartData.items;
        Maindata.map((item) => {
          var mainID = item.variant_id;

          var newData = item.properties;
          var newDataVal = newData._vimla;
          var newDataVal_code = newData.verification_code;
          if (newDataVal) {
            if (!all_Prod_length > 0) {
              $(".Vimla_button").removeClass("Button--show");
              $(".Vimla_second").removeClass("Button--hide");
              $(".ProductForm__AddToCart").addClass("Button--hide");
              // console.log("yes");
            }
            $(".vimla_error").css("opacity", "1");
            $("#vimla_subscription").prop("checked", false);
            setTimeout(function () {
              $(".vimla_error").css("opacity", "0");
            }, 1500);
          } else if (
            sub_length > 0 &&
            nonsub_length > 0 &&
            (newDataVal || newDataVal_code) &&
            mainID
          ) {
            $(".Vimla_button").removeClass("Button--show");
            $(".Vimla_second").removeClass("Button--hide");

            $(".ProductForm__AddToCart").addClass("Button--hide");
            $(".vimla_error").css("opacity", "1");
            $("#vimla_subscription").prop("checked", false);
            setTimeout(function () {
              $(".vimla_error").css("opacity", "0");
            }, 1500);
          }
        });
      }

      $(".Vimla_button").addClass("Button--show");
      $(".Vimla_second, .ProductForm__AddToCart").addClass("Button--hide");
    } else {
      $("input#offer_text, input#offer-code").removeAttr("value");
      $(
        "#cehck_regular_number, input#email, input#Number, input#self-Number, #action-code, #action-code, #temp-code"
      ).val("");
      $("#cehck_regular_number, #vimla_trms, #check_number_self").prop(
        "checked",
        false
      );
      $(".validationError").hide();
      $(".check_number_self").removeClass("show");
      $(".Vimla_button").removeClass("Button--show");
      $(".ProductForm__AddToCart").removeClass("Button--hide");
      if (!all_Prod_length > 0) {
        $(".Vimla_second").removeClass("Button--hide");
      }
    }
  });
  // VIMLA FIRST CHECKBOX FUNCTION : END

  // VIMLA SECOND CHECKBOX FUNCTION : START
  $("#unsubscrib_checkbox").on("change", async function () {
    var sub_length = $("#free_sub_product").length;
    var nonsub_length = $("#free_vimlaproduct").length;

    if ($("#unsubscrib_checkbox").prop("checked")) {
      let cartData = await getCart();
      if (cartData) {
        var Maindata = cartData.items;
        Maindata.map((item) => {
          var mainID = item.variant_id;
          var newData = item.properties;
          var newDataVal = newData.verification_code;
          var newDataVal_code = newData._vimla;
          if (newDataVal) {
            $(".Vimla_button").removeClass("Button--show");
            $(".Vimla_second").removeClass("Button--hide");
            $(".ProductForm__AddToCart").removeClass("Button--hide");
            $(".vimla_error").css("opacity", "1");
            $("#unsubscrib_checkbox").prop("checked", false);
            setTimeout(function () {
              $(".vimla_error").css("opacity", "0");
            }, 1500);
          } else if (
            sub_length > 0 &&
            nonsub_length > 0 &&
            (newDataVal || newDataVal_code) &&
            mainID
          ) {
            $(".Vimla_button").removeClass("Button--show");
            $(".Vimla_second").removeClass("Button--hide");
            $(".ProductForm__AddToCart").removeClass("Button--hide");
            $(".vimla_error").css("opacity", "1");
            $("#unsubscrib_checkbox").prop("checked", false);
            setTimeout(function () {
              $(".vimla_error").css("opacity", "0");
            }, 1500);
          }
        });
      }

      $(".Vimla_button").addClass("Button--show");
      $(".ProductForm__AddToCart, .Vimla_second").addClass("Button--hide");
    } else {
      $(".Vimla_button").removeClass("Button--show");
      $(".ProductForm__AddToCart, .Vimla_second").removeClass("Button--hide");
    }
  });
  // VIMLA SECOND CHECKBOX FUNCTION : END

  // VIMLA SECOND POPUP : START
  // IF VIMLA CHECKBOX IS NOT CHECKED THEN THIS POPUP WILL BE WORKING : START
  $(".Vimla_second").on("click", function () {
    if ($("#unsubscrib_checkbox").prop("checked")) {
      $("#offer_text").val("");
      $(".number_title h3, .number_title h4").show();
      $(".vimla_modal_second").addClass("is-show");
      $("body").css("overflow-x", "hidden");
      $(".Product__InfoWrapper.vimla_product").css("z-index", "58");
      $("#shopify-section-header").addClass("z-index-hide");
      $(".Drawer").css("visibility", "hidden");
    }
    if (
      !$("#vimla_subscription").prop("checked") &&
      !$("#unsubscrib_checkbox").prop("checked")
    ) {
      $(".vimla_selection_error").css("opacity", "1");
      setTimeout(function () {
        $(".vimla_selection_error").css("opacity", "0");
      }, 2000);
    }
  });
  // VIMLA SECOND POPUP : END
  // IF VIMLA CHECKBOX IS NOT CHECKED THEN THIS POPUP WILL BE WORKING : END

  $(".vimla_modal_second .modal_close").on("click", function () {
    $(".vimla_modal_second .number_box").removeClass("move-hide");
    $(".vimla_modal_second .otp_box").removeClass("move-show");
    $(".vimla_modal_second").removeClass("is-show");
    $("body").css("overflow-x", "visible");
    $(".Product__InfoWrapper.vimla_product").css("z-index", "inherit");
    $("#shopify-section-header").removeClass("z-index-hide");
    $(".Drawer").css("visibility", "visible");
    $(".number_title h3").show();
    $(".number_title h4").show();
  });

  $("#phone_number").keypress(function (e) {
    var charCode = e.which ? e.which : event.keyCode;
    if (String.fromCharCode(charCode).match(/[^0-9]/g)) return false;
  });

  // VIMLA FIRST BUTTON CLICK FUNCTION : START
  $(".btn_first").on("click", function () {
    if ($("#phone_number").val().length !== 10) {
      $(".number_box_error").addClass("show-e");
    } else {
      $(".number_box_error").removeClass("show-e");

      let fetchURL = "https://api.renewed.se/api/frontApi/createDiscount";
      let phoneNumber = $("#phone_number").val();
      fetch(fetchURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      })
        .then((result) => result.json())
        .then((data) => {
          console.log(data);
          if (data.status == 200) {
            $(".number_box_error").removeClass("show-e");
            $(".number_box").addClass("move-hide");
            $(".otp_box").addClass("move-show");
            $(".number_title h3, .number_title h4").hide();
          } else {
            $(".showInvalideMobile").text(data.message);
            $(".showInvalideMobile").css("display", "block");
            $(".number_box_error").css("display", "none");
          }
        });
    }
  });
  // VIMLA FIRST BUTTON CLICK FUNCTION : END

  // VIMLA SECOND BUTTON CLICK FUNCTION : START
  $(".btn_second").on("click", function () {
    if ($("#otp_number").val().length === 0) {
      $(".otp-error").addClass("show-e");
      $(".otp-error").css("display", "block");
      $("#otp_number").removeAttr("value");
      $("#otp_number").val("");
    } else {
      $(".otp-error").removeClass("show-e");

      let fetchURL = "https://api.renewed.se/api/frontApi/validateDiscount";
      let discountCode = $("#otp_number").val();
      fetch(fetchURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discountCode }),
      })
        .then((result) => result.json())
        .then((data) => {
          if (data.status == 200) {
            $(".otp-error").removeClass("show-e");
            $(".vimla_modal_second").removeClass("is-show");
            $("body").css("overflow-x", "visible");
            $(".Product__InfoWrapper.vimla_product").css("z-index", "inherit");
            $("#shopify-section-header").removeClass("z-index-hide");
            $(".Drawer").css("visibility", "visible");
            $(".number_box").removeClass("move-hide");
            $(".otp_box").removeClass("move-show");

            var free_vimla = $("#free_vimlaproduct").attr("value");
            add_free_sample(free_vimla).then(async (res) => {
              $(".ProductForm__AddToCart").trigger("click");
              let cartData = await getCart();
              if (cartData) {
                var Maindata = cartData.items;
                Maindata.map((item) => {
                  var newData = item.properties;
                  for (let i = 0; i < $(newData).length; i++) {
                    var newDataVal = newData.verification_code;
                  }
                  if (newDataVal) {
                    $(".Vimla_second").attr("disabled", "disabled");
                    $(".CartItem__QuantitySelector").css("display", "none");
                  } else {
                    $(".Vimla_second").removeAttr("disabled");
                    $(".CartItem__QuantitySelector").css("display", "block");
                  }
                });
              }
            });
          } else {
            $("#otp_number").val("").removeAttr("value");
            $(".showInvalideDiscount")
              .text(data.message)
              .css("display", "block");
            $(".otp-error").css("display", "none");
          }
        });
    }
  });
  // VIMLA SECOND BUTTON CLICK FUNCTION : END

  async function discountCodeclick() {
    // console.log("clicked ProductForm__AddToCart");
    var discount_codedata = $("#auto_discount-code").length;

    let cartData = await getCart();
    if (cartData) {
      var Maindata = cartData.items;
      Maindata.map((item) => {
        var mainID = item.variant_id;
        var newData = item.properties;
        for (let i = 0; i < $(newData).length; i++) {
          var newDataVal = newData._vimla;
          var newDataVal_code = newData.verification_code;
        }
        // console.log(discount_codedata , "discoint kenthg")
        if (newDataVal && discount_codedata > 0) {
          //  console.log("get discount code");
          //  console.log(newDataVal);
          $(".Drawer__Footer .custom_checkoutbutton").removeClass(
            "Button--hide"
          );
          console.log("custom show");
          $(".Drawer__Footer .Cart__Checkout").addClass("Button--hide");
          console.log("main hide");
        }
      });
    }
  }

  $(document).on("click", ".CartItem__Remove", async function () {
    discountCodeclick();
    // console.log("DIT AUS");
    $(".Vimla_second").removeAttr("disabled");
    var remove_id = $(this).attr("data-item-id");
    var sub_length = $("#free_sub_product").length;
    var nonsub_length = $("#free_vimlaproduct").length;
    var all_prolength = $("#free_allproduct").length;
    //  console.log(sub_length);
    //  console.log(nonsub_length);
    // console.log(all_prolength);

    let cartData = await getCart();
    if (cartData) {
      var Maindata = cartData.items;
      Maindata.map((item) => {
        item_property = item.properties;
        let otp_code = item_property.verification_code;
        let sub_code = item_property._vimla;
        let item_id = item.id;
        let updateObj = {};

        if (item_id === remove_id) {
          if (all_prolength > 0 && (sub_code || otp_code)) {
            let remove_giftfor_all = $("#free_allproduct").attr("value");
            updateObj[remove_giftfor_all] = 0;
          }
          if (sub_code && sub_length > 0 && nonsub_length == 0) {
            let remove_gift = $("#free_sub_product").attr("value");
            updateObj[remove_gift] = 0;
          }
          if (otp_code && sub_length == 0 && nonsub_length > 0) {
            let remove_giftID = $("#free_vimlaproduct").attr("value");
            updateObj[remove_giftID] = 0;
          }
          if (sub_length > 0 && nonsub_length > 0 && (sub_code || otp_code)) {
            let remove_giftID = $("#free_vimlaproduct").attr("value");
            updateObj[remove_giftID] = 0;
            let remove_gift = $("#free_sub_product").attr("value");
            updateObj[remove_gift] = 0;
          }
        }

        cartUpdateItems(updateObj).then((res) => {
          console.log("test", res);
          cartrefresh();
        });
      });
    }

    $("input#offer_text").removeAttr("value");
  });

  // not sure of usage
  $('form [type="submit"]').click(function () {
    var evoli_code = $("#evoli-code").val();
    var evoli_category = $("#evoli-category").val();
    var evoli_brand = $("#evoli-brand").val();

    if (evoli_code == "") {
      $("#evoli-code").val("");
    }
    if (evoli_category == "") {
      $("#evoli-category").remove();
    }
    if (evoli_brand == "") {
      $("#evoli-brand").remove();
    }
  });

  // $('.evoli_checkbox_prefilled_content-1 input, #evoli_checkbox').trigger('click');
  // $('#evoli_prefilled_yes').prop('checked', true);
  $("#evoli_prefilled_yes").click(function () {
    $("#evoli_checkbox").click();
    if (!$(".ProductForm__AddToCart").hasClass("page_vimla_cart")) {
      // console.log("checking first one");
      setTimeout(function () {
        $(".Vimla_second").addClass("Button--hide");
      }, 100);
    }
    if (
      $("#vimla_subscription").prop("checked") &&
      !$(".ProductForm__AddToCart").hasClass("page_vimla_cart")
    ) {
      //  console.log("ues checked")
      $("input#offer_text").removeAttr("value");
      setTimeout(function () {
        $(".ProductForm__AddToCart").addClass("Button--hide");
      }, 100);
    } else {
      $(".ProductForm__AddToCart").addClass("Button--show");
    }
  });
  $("#evoli_prefilled_no").click(function () {
    $("#evoli-code").val("");
  });

  $(".evoli_checkbox_prefilled_main input").click(function () {
    // $("#evoli_checkbox").click();
    var prefilled_value = $(".evoli_check:checked").val();
    if (prefilled_value == "yes") {
      $("#evoli_checkbox").prop("checked", true);
    } else {
      $("#evoli_checkbox").prop("checked", false);
    }
  });

  $("#evoli_checkbox").click(function () {
    if (
      $("#vimla_subscription").prop("checked") ||
      $("#unsubscrib_checkbox").prop("checked")
    ) {
      setTimeout(function () {
        $(".Vimla_button").removeClass("Button--hide");
        $(".Vimla_button").addClass("Button--show");
      }, 100);
    } else {
      setTimeout(function () {
        $(".Vimla_second").removeClass("Button--hide");
      }, 100);
    }
    var prefilled_value = $(".evoli_check:checked").val();
    var evoli_check = $("#evoli_checkbox").prop("checked");

    if (evoli_check == true) {
      $("#evoli_prefilled_yes").prop("checked", true);
    } else {
      $("#evoli_prefilled_no").prop("checked", true);
    }
  });

  $('[type="submit"][data-action="add-to-cart"]').click(function () {
    var evoli_check = $("#evoli_checkbox").prop("checked", false);
    console.log(evoli_check);
    setTimeout(function () {
      if (evoli_check == true) {
        $("#evoli_prefilled_yes").prop("checked", true);
        $("#evoli_checkbox").attr("checked", true);
        $("#evoli_checkbox").click();
      } else {
        $("#evoli_prefilled_no").prop("checked", true);
        $("#evoli_checkbox").attr("checked", false);
      }
    }, 100);
  });

  $(".evoli-readmore").click(function () {
    $(".evoli-pop-up-content .popup").fadeIn(500);
    $("body").css({ overflow: "hidden" });
  });

  $(".vimla-popup").click(function () {
    $(".vimla-pop-up-content .popup").fadeIn(500);
    $("body").css({ overflow: "hidden" });
  });

  $(".close").click(function () {
    $(".popup").fadeOut(500);
    $("body").css({ overflow: "auto" });
  });

  $(".ProductForm__AddToCart").on("click", function () {
    discountCodeclick();
    // after complete the process of vimla then normal add to cart button active :start
    $(".ProductForm__AddToCart").removeClass("Button--hide");
    $(".Vimla_second, .Vimla_button").addClass("Button--hide");
    // $("").addClass("Button--hide");
    // $('.Vimla_button').addClass('Button--show');
    // after complete the process of vimla then normal add to cart button active : end
  });

  // discountCodeclick();

  // $('.Vimla-chech_with_evoli input[type="checkbox"]').on('change', function() {
  //     $('input[name="' + this.name + '"]').not(this).prop('checked', false);
  // });

  var DataSku = $(".product-select-v").find(":selected").attr("data-sku");
  if (DataSku.includes("VM")) {
    //  console.log("sku contained");
    $(".Vimla_second").removeClass("Button--hide");
    // console.log($('.Vimla_second'));
  }

  // Code for hide frequently-bought-together in vimla products : start
  $("#vimla_subscription").on("change", function () {
    if ($("#vimla_subscription").prop("checked")) {
      if ($(".frequently-bought-together")) {
        $(".frequently-bought-together").addClass("d-none");
      }
    } else {
      if ($(".frequently-bought-together")) {
        $(".frequently-bought-together").removeClass("d-none");
      }
    }
  });
  // Code for hide frequently-bought-together in vimla products : end
});

// sticky KOP
$(window).scroll(function () {
  if ($(window).width() < 640) {
    let variable_top = 250;
    if ($(window).width() <= 320) {
      variable_top = 100;
    }
    var scroll = $(window).scrollTop();
    var currentHeight =
      $(".Vimla-chech_with_evoli").position().top - variable_top;
    if (scroll <= currentHeight) {
      $(".followMeBar").addClass("fixedbuybutton");
    } else {
      $(".followMeBar").removeClass("fixedbuybutton");
    }
  }
});
// sticky KOP End

// Quanty zero code

$(document).ready(function () {
  $(document).on("click", ".cart_qty_minus", function () {
    var qtyzero = parseInt($(".QuantitySelector__CurrentQuantity").val());
    console.log(qtyzero, "zero zero");

    var sub_length_charvi = $("#free_vimlaproduct").length;
    console.log(sub_length_charvi, "sub_length_charvi");

    if (qtyzero <= 1) {
      $(".CartItem__Remove").trigger("click");
    }
  });
});

$(document).ready(function() {// Configuring the delete confirmation dialog
                    $("#dialog-configurator").dialog({
                        resizable: true,
                        maxWidth: 900,
                        minWidth: 900,
                        height:$(window).height()-100,
                        width:900,
                        modal: true,
                        autoOpen:false,
                        title:'Add to shopping cart',
                        buttons: {
                            'Cancel': function() {

                                $(this).dialog('close');
                            },
                            'Add to shopping cart': function() {

                                if($("#dialog-configurator").find('span.calcprice').text()!='###'){
                                    $(this).dialog('close');
                                    $("#addcartform").submit();
                                }else{
                                    alert('Custom dimension is not valid, or is too small or too big.');
                                }

                                //var fields = $('#addcartform').serializeArray();
                                //console.log(fields);
                                /*$.ajax({
                                    type: "GET",
                                    url: "/includes/ajax.product.php",
                                    data: $("#addcartform").serialize()+"",
                                    dataType: "html",
                                    success: function(msg){
                                        //$("#videos").html(msg);
                                    }
                                });*/
                            }
                        }
                    });
                    $(window).scroll(function () {
                        //houd het venster in het midden bij pagina scrollen
                        $("#dialog-configurator").dialog("option","position","center");
                    });

                    $('.cartput').click(function(){
                        var text='The following product(s) will be added to your cart when you click "add to cart":<br/><br/><div class="prodinsert"></div><div class="optprodinsert"></div>';
                        $("#dialog-configurator").html(text);

                        //alert($("#dialog-configurator").html());
                        var idOptionComponent = $(this).data('id');
                        var menuid = $(this).data('menu-id');
                        var prodid = $(this).data('prod-id');
                        var detailpage = $(this).data('detailpage');
                        if($(this).parents('tr').find('input[name=add]').length>0){
                        	var numvalue=$(this).parents('tr').find('input[name=add]').val();
                        }else{
                        	var numvalue=$(this).parents('tr').find('input.userinput').val();
                        	if(numvalue==undefined){
                        	    var numvalue=$(this).parents('tr').find('input').val();
                        	}
                        }
                        if($(this).parents('tr').find('input.cartamount').length>0){
                            var amount=$(this).parents('tr').find('input.cartamount').val();
                        }else{
                            var amount=1;
                        }
                        var valueid=$(this).parents('tr').find('input.userinput').data('valueid');
                        if(valueid==undefined){
                                var valueid=$(this).parents('tr').find('input').data('valueid');
                            }
                      //alert(    parseInt(   $(this).parents('tr').find('input.userinput').val()    ));
                        var calcprice = $(this).parents('tr').find('span.calcprice');
                        var oneprice  = $(this).parents('tr').find('span.oneprice');

                        if ((calcprice.length > 0 && calcprice.text() != '###') || (oneprice.length > 0 && oneprice.text() != '###'))
                        {
                            $("#dialog-configurator").load(
                                "/includes/ajax.configurator.php",
                                {
                                    action:     'frontendconfigurator',
                                    id:         idOptionComponent,
                                    menuid:     menuid,
                                    prodid:     prodid,
                                    detailpage: detailpage,
                                    numvalue:   numvalue,
                                    amount:     amount,
                                    valueid:    valueid
                                },
                                function(data){
                                    $("#dialog-configurator").dialog('open');
                                    if($('div.ui-dialog-buttonpane').children().length==1){
                                        $('div.ui-dialog-buttonpane').prepend('Total: &euro; <span class="dialogtotalprice">'+$('div.addcartprodline span.calcprice').text()+'</span>');
                                    }else{
                                        $('span.dialogtotalprice').text($('div.addcartprodline span.calcprice').text());
                                    }
                                    calctotalprice();
                                }
                            );
                        }
                        else
                        {
                            alert('Custom dimension is not valid, or is too small or too big.');
                        }

                        return false;
                    })

                    $('#dialog-configurator').onWithDelay('keydown', '#dialog-configurator input.cartamount', function(){
                        if ($('#addcartform').valid() == false)
                        {
                            $('span.dialogtotalprice').html('<span style="color: #A22;">invalid input!</span>');
                            return false;
                        }

                        //update de aantallen meegeleverde producten als het aantal gekozen producten wijzigd
                        $('#dialog-configurator #frontaddprod input.freeamount').each( function(){
                            $(this).val($(this).data('multiplier')*$('#dialog-configurator input.cartamount').val());
                        })
                        calctotalprice();
                    },500);

                    $('#dialog-configurator').onWithDelay('keydown', '#dialog-configurator input.var', function(){
                        var optioncomponentid=$(this).parents('form#addcartform').find('input[name="cart[0][add]"]').val();
                        //var optioncomponentid=optionid.split('-')[1];
                        var valueid=$(this).attr('id').split('v')[1];
                        var numvalue=$(this).val();

                        $.ajax({
                                url: '/includes/ajax.configurator.php',
                                async: false,
                                success: function(data) {   $('#dialog-configurator span.calcprice').text(data);
                                calctotalprice();
                                                },
                                type: 'POST',
                                data: "action=getprice&optionid="+optioncomponentid+"&valueid="+valueid+"&numvalue="+numvalue

                        });

                    },500);

                    $('#dialog-configurator').on('change', 'div.optprodline input[type="checkbox"]', function(){
                        calctotalprice();
                    })

                    $('#dialog-configurator').on('change', 'input[type="checkbox"].parentcheckbox', function(){
                        if($(this).attr('checked')=='checked'){
                            $(this).parents('li').find('input[type="checkbox"]').attr('checked','checked');
                            $('div.optprodline input[type="checkbox"]').trigger('change');
                        }else{
                            $(this).parents('li').find('input[type="checkbox"]').removeAttr('checked');
                            $('div.optprodline input[type="checkbox"]').trigger('change');
                        }
                    })

                    function calcVolumeDiscountPercentage(amount, discounts)
                    {
                        // Figure out what percentage of discount we will get
                        var minAmount  = 0;
                        var percentage = 0;
                        var i;
                        for (i = 0; i < discounts.length; i++)
                        {
                            var discount = discounts[i];
                            if (amount >= discount.minAmount){
                                if (discount.minAmount >= minAmount)
                                {
                                    minAmount  = discount.minAmount;
                                    percentage = discount.percentage;
                                }
                            }
                        }
                        return percentage;
                    }

                    function calcProductPrice(id, basePrice, amount)
                    {
                        var price                    = basePrice * amount;
                        var volumeDiscountPercentage = calcVolumeDiscountPercentage(amount, VolumeDiscounts[id]);
                        var volumeDiscount           = price * (volumeDiscountPercentage / 100);
                        return price - volumeDiscount;
                    }

                    function calctotalprice(){
                        if ($('#addcartform').valid() == false)
                        {
                            $('span.dialogtotalprice').html('<span style="color: #A22;">invalid input!</span>');
                            return false;
                        }

                        // Calculate the price of the main product
                        var productId        = $('#dialog-configurator input.addprod').val();
                        var productBasePrice = parseFloat($('#dialog-configurator span.calcprice').data('baseprice'));
                        var productAmount    = parseInt($('#dialog-configurator input.cartamount').val());
                        var productPrice     = calcProductPrice(productId, productBasePrice, productAmount);

                        // Update prices
                        window.price         = productPrice;
                        $('#dialog-configurator .calcprice').text(productPrice.toFixed(2));

                        // update parent checkboxes
                        $('#dialog-configurator input[type="text"].parentcheckbox').each(function()
                        {
                            // the entered amount
                            var amount = $(this).val();
                            var price  = 0;

                            // update the amounts of the children and calculate the new total price
                            $(this).parents('li').find('div.optprodline').each(function()
                            {
                                var optProduct          = $(this);
                                var optProductId        = optProduct.data('cid');
                                var optProductBasePrice = optProduct.find('input[type="checkbox"]').data('value');
                                var optProductAmount    = optProduct.find('input.optamount');
                                optProductAmount.val(optProductAmount.data('multiplier') * amount);
                                var optProductPrice     = calcProductPrice(optProductId, optProductBasePrice, optProductAmount.val());

                                // Update prices
                                price += parseFloat(optProductPrice.toFixed(2));
                            });
                            $(this).parents('li').find('span.questionprice').html('&euro; ' + price.toFixed(2) + ' ');
                        });
                        // Calculate the price of the optional products
                        $('div.optprodline input[type="checkbox"]:checked').each(function(index){
                            var optProduct          = $(this).parents('div.optprodline');
                            var optProductId        = optProduct.data('cid');
                            var optProductBasePrice = $(this).data('value');
                            var optProductAmount    = optProduct.find('input.optamount').val();
                            var optProductPrice     = calcProductPrice(optProductId, optProductBasePrice, optProductAmount);

                            // Update prices
                            optProduct.find('.optcalcprice').text(optProductPrice.toFixed(2));
                            window.price += optProductPrice;
                        })
                        $('span.dialogtotalprice').text(window.price.toFixed(2));
                    }

                    $('.productoptions tr span input.userinput').onWithDelay('keydown',function(){

                        var optionid=$(this).parents('tr').attr('id');
                        var optioncomponentid=optionid.split('-')[1];
                        var valueid=$(this).data('valueid');
                        var numvalue=$(this).val();

                        $.ajax({
                                url: '/includes/ajax.configurator.php',
                                async: false,
                                success: function(data) {   $('tr#'+optionid+' span.oneprice').text(data);  console.log(optionid+ 'test');              },
                                type: 'POST',
                                data: "action=getprice&optionid="+optioncomponentid+"&valueid="+valueid+"&numvalue="+numvalue

                        });

                        $.ajax({
                                url: '/includes/ajax.configurator.php',
                                async: false,
                                success: function(data) {   $('tr#'+optionid+' span.calcoutput').text(data);                    },
                                type: 'POST',
                                data: "action=getcalcoutput&optionid="+optioncomponentid+"&valueid="+valueid+"&numvalue="+numvalue

                        });
                        }, 500
                    );


                    // Option amount check checkbox when focussed.
                    $('#dialog-configurator').on('focus', '.optamount', function()
                        {
                            var cartid = $(this).data('cartid');
                            $('input[name="cart[' + cartid +'][select]"]').prop('checked', true);
                            calctotalprice();
                        }
                    );

                    // Option amount, recalculate total price when the amount changed.
                    $('#dialog-configurator').on('keyup', '.optamount', function()
                        {
                            calctotalprice();
                        }
                    );

                    // Parentcheckbox check when focused
                    $('#dialog-configurator').on('focus', 'input[type="text"].parentcheckbox', function()
                         {
                            var cartid = $(this).data('cartid');
                            var checkbox = $('input[type="checkbox"][data-cartid="' + cartid + '"]')
                            checkbox.prop('checked', true);
                            checkbox.parents('li').find('input[type="checkbox"]').attr('checked','checked');
                            $('div.optprodline input[type="checkbox"]').trigger('change');
                            calctotalprice();
                         }
                    );

                    // Parentcheckbox recalculate total price when the amount changed
                    $('#dialog-configurator').on('keyup', 'input[type="text"].parentcheckbox', function(){
                        calctotalprice();
                    });


                    /*
                    function loadoptprod(idOptionComponent){

                        $.getJSON("/includes/ajax.configurator.php", {action:'loadoptprod','id':idOptionComponent}, function(data) {

                            var tabel = new Array();
                            received=false;
                                $.each(data, function(row,item) {
                                    received=true;

                                    var prodnaam=item.ENinfo;
                                    if (item.ENinfo==""){
                                        prodnaam=item.NameComponent;
                                    }
                                    tabel.push(item.configurator_rule_question+'<br/><input type="text" name="amount[]" value="0"/><input type="hidden" name="add[]" value="'+item.configurator_rule_idOptionComponent+'"/>'+prodnaam);


                                });
                            if (received==true){
                                var kopje="<br/><br/><h3>Optionele producten</h3>";
                            }
                            $('div.optprodinsert').html(kopje+tabel.join(""));
                        });
                    }
                    function loadprod(idOptionComponent){

                        $.getJSON("/includes/ajax.configurator.php", {action:'loadprod','id':idOptionComponent}, function(data) {

                            var tabel = new Array();
                            received=false;
                                $.each(data, function(row,item) {
                                    received=true;

                                    var prodnaam=item.ENinfo;
                                    if (item.ENinfo==""){
                                        prodnaam=item.NameComponent;
                                    }
                                    tabel.push('<input type="text" name="amount[]" value="1"/><input type="hidden" name="add[]" value="'+item.idOptionComponent+'"/>'+
                                                '<input type="text" name="length[]" value="'+item.idOptionComponent+'"/>'+
                                    item.ENinfo);


                                });
                            $('div.prodinsert').html(tabel.join(""));
                        });
                    }

                    */

    $.validator.addMethod(
        'positiveNumber',
        function (value) {
            return Number(value) > 0;
        },
        'Enter a positive number.'
    );
});

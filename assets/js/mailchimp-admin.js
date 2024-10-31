/*! mailchimp-for-rtb 2018-10-05 */
jQuery(document).ready(function(a){function b(){var b=a(".mcf-sap_loading");b.animate({opacity:1},500,function(){});var d={action:"mcfrtb-get-lists",nonce:rtb_admin_mc.ajax_nonce},e=a.param(d);a.post(ajaxurl,e,function(d){if(d.success){"undefined"==typeof d.data&&(console.log("no data returned from ajax request"),console.log(d)),b.stop(),b.css("opacity","0");var e=a("#mcfrtb-merge-controls").data("input-name")+"[list]";a(".mcf-list-select").append('<select name="'+e+'" id="'+e+'"><option></option></select>');var f=a(".mcf-list-select select");for(var g in d.data.lists){var h=a("<option></option>"),i=d.data.lists[g];h.attr("value",i.id).text(i.name),f.append(h)}a(f).change(function(b){c(a("option:selected",this).val())}),null!==rtb_admin_mc.lists&&"undefined"!=typeof rtb_admin_mc.lists.list&&""!==rtb_admin_mc.lists.list&&f.find("option[value="+rtb_admin_mc.lists.list+"]").attr("selected","selected").trigger("change")}else"undefined"==typeof d.data||"undefined"==typeof d.data.msg?a(".mcf-list-select").html('<span class="error">'+rtb_admin_mc.strings.api_unknown_error+"</span>"):a(".mcf-list-select").html('<span class="error">'+d.data.msg+"</span>"),b.animate({opacity:0},500,function(){})})}function c(b){var c=a(".mcf-sap_loading"),e=a("#mcfrtb-merge-controls");if(c.animate({opacity:1},500,function(){}),e.empty(),e.data("list-id",b),e.removeClass("active"),""===b)return void c.animate({opacity:0},500,function(){});var f={list:b,action:"mcfrtb-load-merge-fields",nonce:rtb_admin_mc.ajax_nonce},g=a.param(f);a.post(ajaxurl,g,function(f){if(f.success){if("undefined"==typeof f.data&&(console.log("no data returned from ajax request"),console.log(f)),f.data.list_id!=e.data("list-id"))return;if(e.empty(),"undefined"!=typeof rtb_admin_mc.merge_fields){var g=e.data("input-name")+"[fields]",h=a("<select><option></option></select>");for(var i in f.data.merge_fields){var j=a("<option></option>"),k=f.data.merge_fields[i];j.attr("value",k.tag).text(k.name),h.append(j)}e.hide(),e.append("<table></table>");var l=e.find("table");l.append("<tr><th>"+rtb_admin_mc.strings.merge_booking_data+"</th><th>"+rtb_admin_mc.strings.merge_list_field+"</th></tr>"),l.append("<tr><td>"+rtb_admin_mc.strings.merge_email_label+'</td><td><span class="description">'+rtb_admin_mc.strings.merge_email_description+"</span></td></tr>");for(var m in rtb_admin_mc.merge_fields)l.append('<tr><td><label for="mcfrtb-'+m+'">'+rtb_admin_mc.merge_fields[m]+'</label></td><td><select name="'+g+"["+m+']" id="mcfrtb-'+m+'">'+h.html()+"</select></td></tr>"),null!==rtb_admin_mc.lists&&b===rtb_admin_mc.lists.list&&"undefined"!=typeof rtb_admin_mc.lists.fields[m]&&""!==rtb_admin_mc.lists.fields[m]&&l.find("#mcfrtb-"+m+" option[value="+rtb_admin_mc.lists.fields[m]+"]").attr("selected","selected");e.find("select").change(function(){d(a(this),a("option:selected",this).val(),e)}),e.append('<p class="description">'+rtb_admin_mc.strings.merge_description+"</p>"),e.addClass("active"),e.fadeIn()}}else"undefined"==typeof f.data||"undefined"==typeof f.data.msg?e.html('<p class="error">'+rtb_admin_mc.strings.api_unknown_error+"</p>"):e.html('<p class="error">'+f.data.msg+"</p>");c.animate({opacity:0},500,function(){})})}function d(b,c,d){if(""!==c){var e=0,f=[];if(a("select option:selected",d).each(function(){a(this).val()===c&&(f.push(a(this)),e++)}),e>1){b.find("option[value="+c+"]").prop("selected","");for(var g in f)f[g].parent().after('<span class="merge-duplicate-warning dashicons dashicons-lock"></span>');a(".merge-duplicate-warning").fadeOut(2e3,function(){a(this).remove()})}}}a(".mcf-list-select").length&&b()});
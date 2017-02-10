$(function(){
  //init custom selects
	$("select[data-select-custom]").each(function() {
		var selectedValue = $(this).val();
		var selectedText = $(this).find("option:selected").text();
		var dropdownGroup = $(this).parent();
	    $(this).hide();

	    var dataSelectCustomAttribute = $(this).attr('class');
	    dataSelectCustomAttribute = dataSelectCustomAttribute ? " " + dataSelectCustomAttribute : "";

	    var dropdownButton = $('<span class="dropdown-button' + dataSelectCustomAttribute + '" data-dropdown-button><span data-selected-text></span><span class="caret pull-right"></span></span>');
	    $(this).before(dropdownButton);
		
	    var dropdownOptions = $('<ul class="dropdown-options' + dataSelectCustomAttribute + '" data-dropdown-options style="display:none"></ul>');
		$(this).find("option").each(function() {
			var dropdownOptionValue = $(this).val();
			var dropdownOptionText = $(this).text();
			var dropdownOption = $('<li><a href="#" data-option-value="' + dropdownOptionValue + '">' + 
				dropdownOptionText + '</a></li>');
			dropdownOptions.append(dropdownOption);
		});
		
		dropdownButton.after(dropdownOptions);

     	InitCustomSelectWithRealSelectText.call(this);//now if Ctrl+R is clicked, the value remains in select
	});

	$("select[data-select-custom]").on("click", InitCustomSelectWithRealSelectText);

	function InitCustomSelectWithRealSelectText() {
	    var currentSpan = $(this).siblings("[data-dropdown-button]").find("span[data-selected-text]");
	    var selectedValueText = $(this).find("option:selected").text();
	    if (currentSpan.text() != selectedValueText) {//don't update current select if new text value equals to the current text value
	        var newSpan = $("<span data-selected-text>" + $(this).find("option:selected").text() + "</span>");
	        currentSpan.replaceWith(newSpan);//init custom select with real select text
	    }
	}
    
	$("[data-dropdown-button]").on("click", function() {
		$(this).next("[data-dropdown-options]").toggle();
		return false;
	});
	
	$("[data-dropdown-button]").on("focusout", function() {
	    $(this).next("[data-dropdown-options]").hide();
	    var dropdownGroup = $(this).closest("[class='dropdown-group']");
	    var hiddenSelect = dropdownGroup.find("select[data-select-custom]");
	    hiddenSelect.focusout();
	});											
	
	$("a[data-option-value]").on("mousedown", function() {
		var optionValue = $(this).attr("data-option-value");
		var optionText = $(this).text();
		
		var dropdownGroup = $(this).closest("[class='dropdown-group']");
		var hiddenSelect = dropdownGroup.find("select[data-select-custom]");
		hiddenSelect.val(optionValue).change(); // Setup value for hidden select
		if (optionValue > 0) {
		    hiddenSelect.addClass("valid");
		}
		else {
		    hiddenSelect.removeClass("valid")
		}
		hiddenSelect.click();
		dropdownGroup.find("[data-dropdown-options]").hide();
		
		return false;
	});
});
sap.ui.commons.Slider.extend('sap.dennisseah.SliderWithColoredBar', {
    init: function() {
        this.addStyleClass('sap-dennisseah-sliderwithcoloredbar');
    },
    
    renderer : function(oRm, oControl) {
        oControl.setMin(0);
        oControl.setMax(100);
      
        sap.ui.commons.SliderRenderer.render(oRm, oControl);
    },
    
    updateBar : function() {
        var bar = $('#' + this.getId() + '_bar');
        var width = bar[0].getBoundingClientRect().width;
        var iwidth = (this.getValue()/100) * width;
        var val = this.getValue();

        var indicator = $('#' + this.getId() + '_indicator');
        indicator.removeClass('low');
        indicator.removeClass('medium');
        indicator.removeClass('high');
        indicator.css('width', iwidth + 'px');
      
        if (val <= 50) {
            indicator.addClass('low');
        } else if (val <= 80) {
            indicator.addClass('medium');
        } else {
            indicator.addClass('high');
        }
    },
    
    fireChange : function() {
        sap.ui.commons.Slider.prototype.fireChange.apply(this, arguments);
        this.updateBar();
    },
    
    onAfterRendering : function() {
        sap.ui.commons.Slider.prototype.onAfterRendering.apply(this, arguments);
        var bar = $('<div id="' + this.getId() + '_bar"></div>');
        bar.addClass('bar');
      
        this.$().prepend(bar);
        var indicator = $('<div id="' + this.getId() + '_indicator"></div>');
        indicator.addClass('indicator');
        indicator.css('width', '0px');
        bar.append(indicator);
        this.updateBar();
    }
});

sap.m.HBox.extend('sap.dennisseah.UnmaskPassword', {
    metadata: {
        aggregations: {
            input: {type: "sap.m.Input", multiple: false},
            clearInput: {type: "sap.m.Input", multiple: false},
            icon: {type: "sap.ui.core.Icon", multiple: false}
        }
    },

    init: function() {
        var self = this;

        var icon = new sap.ui.core.Icon({
            src: 'sap-icon://show',
            size: '25px',
            press: function(e) {
                self.toggle();
            }
        }).addStyleClass('sap-dennisseah-unmaskpassword-icon');
        this.setAggregation('icon', icon);
    },
    
    toggle: function() {
        var items = this.getItems();
        var input = items[0].$();
        var clear = items[1].$();

        var bShow = (input.hasClass('sap-dennisseah-unmaskpassword-hide'));
        if (bShow) {
            input.removeClass('sap-dennisseah-unmaskpassword-hide');
            clear.addClass('sap-dennisseah-unmaskpassword-hide');
        } else {
            clear.removeClass('sap-dennisseah-unmaskpassword-hide');
            input.addClass('sap-dennisseah-unmaskpassword-hide');
        }
    },

    renderer: function(oRm, oControl) {
        var input = oControl.getAggregation('input');
        oControl.addItem(input);
        var clear =    oControl.getAggregation('clearInput');
        clear.addStyleClass('sap-dennisseah-unmaskpassword-hide');
        oControl.addItem(clear);

        var icon = oControl.getAggregation('icon');
        oControl.addItem(icon);

        sap.m.HBoxRenderer.render(oRm, oControl);
    }
});

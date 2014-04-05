sa.ui.core.Icon.extend('sap.dennisseah.IconNumIndicator', {
    metadata: {
        properties: {
            value: {type: "int", defaultValue: 0}
        }
    },
    
    init : function() {
        this.addStyleClass('sap-dennisseah-iconnumindicator-icon');
    },

    renderer: function(oRm, oControl) {
        oControl.setSize('25px');
 sap.ui.core.IconRenderer.render.apply(this, arguments);
    },

    onAfterRendering: function() {
        var val = this.getValue();
        if (val !== 0) {
            var num = $('<div class="sap-dennisseah-iconnumindicator-num"></div>');
            num.html(val);
            this.$().append(num);
        }
    }
});


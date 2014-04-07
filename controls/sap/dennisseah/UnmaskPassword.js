sap.m.Input.extend('sap.dennisseah.UnmaskPassword', {        
    init: function() {
        sap.m.Input.prototype.init.apply(this, arguments);
        var self = this;

        this._icon = new sap.ui.core.Icon({
            src: 'sap-icon://show',
            size: '25px',
            press: function(e) {
                self.toggle();
            }
        }).addStyleClass('sap-dennisseah-unmaskpassword-icon');
    },

    toggle: function() {
        var bShow = (this.getType() === sap.m.InputType.Password);
        this.setType((bShow) ? sap.m.InputType.Text : sap.m.InputType.Password);
     },
    
    onBeforeRendering : function() {
        sap.m.Input.prototype.onBeforeRendering(this, arguments);
        this._icon.$().remove();
    },

    renderer: function(oRm, oControl) {
        sap.m.InputRenderer.render(oRm, oControl);
        oRm.renderControl(oControl._icon);
    }
});

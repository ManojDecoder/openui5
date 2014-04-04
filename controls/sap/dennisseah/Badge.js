sap.ui.core.Control.extend('sap.dennisseah.Badge', {
    metadata: {
        properties: {
            text: {type:'string', defaultValue: 'untitled'},
            value: {type:'int', defaultValue: 0},
            width: {type: 'sap.ui.core.CSSSize', defaultValue: '150px'},
            color: {type: 'sap.ui.core.CSSColor', defaultValue: '#007cc0'}
        },
        events: {
            pressed: {}
        }
    },
    
    _width : function(minus) {
        var w = parseInt(this.getWidth().replace('px', '')) + minus;
        return w + 'px';
    },
    
    _style : function() {
        var styles = [
             'background-color: ' + this.getColor(),
             'width: ' + this.getWidth()
            ];
        return styles.join(';');
    },
    
    renderer: function(oRm, oControl) {
        oRm.write("<div");
        oRm.writeControlData(oControl);
        oRm.addClass("sap-dennisseah-badge");
        oRm.writeClasses();
        oRm.write(' style="' + oControl._style() + '">');
        oRm.write('<div class="sap-dennisseah-badge-text" style="width:' + 
             oControl._width(-40) + '">' + oControl.getText() + '</div>');
        oRm.write('<div class="sap-dennisseah-badge-num">' + oControl.getValue() + '</div>');
        oRm.write("</div>");
    },
    
    onAfterRendering: function() {
        var that = this;
        this.$().click(function(e) {
            that.firePressed({text: that.getText(), value: that.getValue()});
        })
    }
});

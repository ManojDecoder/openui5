sap.ui.core.Control.extend('sap.dennisseah.Growl', {
    // inspired by http://www.erichynds.com/examples/jquery-notify/index.htm
    metadata : {
        properties: {
            title: {type: 'string', defaultValue: 'Title'},
            message: {type: 'string', defaultValue: 'Hello, I am here!'},
            visible: {type: 'boolean', defaultValue: false},
            width: {type: 'sap.ui.core.CSSSize', defaultValue: '300px'},
            autoclose: {type: 'boolean', defaultValue: true}
        }
    },

    init: function() {
        this._show = false;
    },

    renderer: function(oRm, oControl) {
        if (oControl._show === false) {
            return;
        }
        oRm.write("<div");
        oRm.writeControlData(oControl);
        oRm.addClass("sap-dennisseah-growl-ui-notify");
        oRm.writeClasses();
        oRm.write(' style="width:' + oControl.getWidth() + '">');

        oRm.write('<div class="sap-dennisseah-growl-ui-notify-message sap-dennisseah-growl-ui-notify-message-style">');
        oRm.write('<a class="sap-dennisseah-growl-ui-notify-cross sap-dennisseah-growl-ui-notify-close" href="#">x</a>');
        oRm.write('<div class="sap-dennisseah-growl-ui-notify-title">' + oControl.getTitle() + '</div>');
        oRm.write('<p>' + oControl.getMessage() + '</p>');
        oRm.write("</div>");
        oRm.write("</div>");
    },

    onAfterRendering: function() {
        var that = this;
        this.$().find('a').click(function() {
            that.hide();
        });
    },

    hide: function() {
        this._show = false;
        this.$().fadeOut('slow');
    },

    show: function() {
        var that = this;
        this._show = true;
        this.invalidate();

        if (this.getAutoclose()) {
            setTimeout(function() {
                that.hide();
            }, 2000);
        }
    }
});

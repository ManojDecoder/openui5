sap.ui.core.Control.extend('sap.dennisseah.CircularIconsGroup', {
    metadata: {
        properties: {
            borderwidth: {type: "sap.ui.core.CSSSize", defaultValue: '50px'},
            diameter: {type: "sap.ui.core.CSSSize", defaultValue: '100px'},
            color: {type: "sap.ui.core.CSSColor", defaultValue: '#007cc0'},
            btncolor: {type: "sap.ui.core.CSSColor", defaultValue: '#005990'}
        },
        aggregations: {
            icons: {type: "sap.ui.core.Icon"}
        }
    },

    _style: function() {
        var styles = [
            'height: ' + this.getDiameter(),
            'width: ' + this.getDiameter(),
            'border-color: ' + this.getColor(),
            'border-width: ' + this.getBorderwidth()
        ];
        return styles.join('; ');
    },
    
    
    renderer: function(oRm, oControl) {
        oRm.write("<div");
        oRm.writeControlData(oControl);
        oRm.addClass("sap-dennisseah-circular-icons-group");
        oRm.writeClasses();
        oRm.write(' style="' + oControl._style() + '">');
        var icons = oControl.getAggregation('icons');
        for (var i = 0; i < icons.length; i++) {
            var icon = icons[i];
            icon.addStyleClass('sap-dennisseah-circular-icons-group-btn');
            oRm.renderControl(icon);
        }
        oRm.write("</div>");
    },
    
    onAfterRendering: function() {
        var that = this;
        function center() {
            var element = that.$()[0];
            var d = element.getBoundingClientRect();
            return { cx: d.left + d.width/2, cy: d.top + d.height/2 };
        }
        
        var icons = this.getAggregation('icons');
        if (icons.length === 0) {
            return;
        }

        var angle = 0;
        var borderwidth = parseInt(this.getBorderwidth().replace('px',''));
        var width = parseInt(this.getDiameter().replace('px',''));
        var center = center();

        var step = (2*Math.PI) / icons.length;
        
        for (var i = 0; i < icons.length; i++) {
            var ic = icons[i];
            var ic_obj = $('#' + ic.getId());
            var iradius = Math.max(ic_obj.width(), ic_obj.height());
            var base = ((width + borderwidth)/2);
            var offset = (iradius/2) + 5; // 5 = padding
            var x = Math.round(base * Math.cos(angle)) + center.cx - offset;
            var y = Math.round(base * Math.sin(angle)) + center.cy - offset;
            ic_obj.css('background-color', this.getBtncolor());
            ic_obj.css('width', iradius + 'px');
            ic_obj.css('height', iradius + 'px');
            ic_obj.css('left', x + 'px');
            ic_obj.css('top', y + 'px');
            angle += step;
        }
    }
});

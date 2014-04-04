sap.ui.core.Control.extend('sap.dennisseah.CircularRangeGauge', {
  metadata: {
    properties: {
      lowest: {type: 'int', defaultValue: 0},
      highest: {type: 'int', defaultValue: 100},
      value: {type: 'int', defaultValue: 0},
    }
  },
    
  renderer: function(oRm, oControl) {
    oRm.write("<div");
    oRm.writeControlData(oControl);
    oRm.addClass("sap-dennisseah-circular-range-gauge");
    oRm.writeClasses();
    oRm.write('>');

    var val = oControl.getNormalizedValue();
    oRm.write('<canvas id="' + oControl.getId + '_canvas" width="50" height="50" style="position:absolute"></canvas>');       
    oRm.write('<input class="sap-dennisseah-circular-range-gauge-input" value="' + val + '" />');
    oRm.write("</div>");
  },
  
  getNormalizedValue : function(val) {
    val = (val === undefined) ? this.getValue() : parseInt(val);

    if (val > this.getHighest()) {
      val = this.getHighest();
    } else if (val < this.getLowest()) {
      val = this.getLowest();
    }
    return val;
  },

  drawArc: function() {
    var val = this.getNormalizedValue();
    var strokeStyle = 'green';
    if (val > 75) {
      strokeStyle = 'red';
    } else if (val > 50) {
      strokeStyle = 'brown';
    } else if (val > 25) {
      strokeStyle = 'orange';
    }
    
    var c = this.$().find('canvas')[0];
    var ctx= c.getContext("2d");
    ctx.clearRect (0, 0, 50, 50);
    ctx.beginPath();
    ctx.arc(25, 25, 20, 0, 2 *Math.PI);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#ccc';
    ctx.globalAlpha = 0.4;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(25, 25, 20, 0, (val/this.getHighest()) * 2 *Math.PI);
    ctx.lineWidth = 10;
    ctx.strokeStyle = strokeStyle;
    ctx.globalAlpha = 0.7;
    ctx.stroke(); 
  },
                           
  onAfterRendering: function() {

    this.drawArc();

    var that = this;
    
    this.$().find('input').change(function() {
      if (isNaN(this.value)) {
        this.value = that.getLowest();
      }
      var val = that.getNormalizedValue(this.value);
      that.setValue(val);
      that.drawArc();
    });
  }
});

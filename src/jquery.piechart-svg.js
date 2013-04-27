(function($) {
    $.fn.pie = function() {
        return this.each(function (options) {
            var obj = $(this);
            var values = obj.data('values');
            var colors = obj.data('colors');
            if (colors.length !== values.length) {
                colors = [];
                for (var c = 0; c < values.length; c++) {
                    colors.push('#' + ((1 << 24) * Math.random() | 0).toString(16));
                }
            }
            var settings = $.extend({
                colors: colors,
                outline: {
                    color: '#000000',
                    width: 1
                }
            }, options);
            // fit the chart into container
            var width = parseInt(obj.css('width'));
            var height = parseInt(obj.css('height'));
            var radius = width / 2 - settings.outline.width;
            var startX = width / 2;
            var startY = height / 2;
            var lastX = radius;
            var lastY = 0;
            var seg = 0;
            var svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" ';
            svg += 'width="' + width + '" height="' + height + '">';
            var totalValue = 0;
            for (var i = 0; i < values.length; totalValue += values[i++]);
            for (i = 0; i < values.length; i++) {
                var arc = (values[i] / totalValue * 360) > 180 ? 1 : 0;
                seg = values[i] / totalValue * 360 + seg;
                radSeg =  seg * Math.PI / 180;
                nextX = Math.cos(radSeg) * radius;
                nextY = Math.sin(radSeg) * radius;
                svg += '<path d="M ' + startX + ',' + startY; // starting point
                svg += ' l ' + lastX + ',' + (-lastY); // line to
                svg += ' a ' + radius + ',' + radius + ' 0 ' + arc + ',0 ' + (nextX - lastX) + ',' + (-(nextY - lastY)) + ' z" '; // arc & cloZe
                svg += 'fill="' + settings.colors[i] + '" ';
                svg += 'stroke="' + settings.outline.color + '" stroke-width="' + settings.outline.width + '" stroke-linejoin="round"/>';
                lastX = nextX;
                lastY = nextY;
            }
            svg += '</svg>';
            obj.html(svg);
        });
    };
})(jQuery);

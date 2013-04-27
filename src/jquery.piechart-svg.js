(function($) {
    $.fn.pie = function(options) {
        var settings = $.extend({
            values: [],
            colors: [],
            outlineColor: '#000000',
            outlineWidth: 1
        }, options);
        return this.each(function () {
            var obj = $(this);
            var values = obj.data('values');
            // See if we have values in data attr
            if (values instanceof Array) {
                settings.values = values;
            }
            var colors = obj.data('colors');
            // See if we have colors definition in data attr
            if (colors instanceof Array) {
                settings.colors = colors;
            }
            // Check if we have color for each value
            if (settings.colors.length < settings.values.length) {
                // Add missing colors by random
                for (var c = settings.colors.length; c < values.length; c++) {
                    settings.colors.push('#' + ((1 << 24) * Math.random() | 0).toString(16));
                }
            }
            // fit the chart into container
            var width = parseInt(obj.css('width'));
            var height = parseInt(obj.css('height'));
            var radiusX = width / 2 - settings.outlineWidth;
            var radiusY = height / 2 - settings.outlineWidth;
            var startX = width / 2;
            var startY = height / 2;
            var lastX = radiusX;
            var lastY = 0;
            var seg = 0;
            var svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" ';
            svg += 'width="' + width + '" height="' + height + '">';
            var totalValue = 0;
            for (var i = 0; i < settings.values.length; totalValue += settings.values[i++]);
            for (i = 0; i < settings.values.length; i++) {
                var arc = (settings.values[i] / totalValue * 360) > 180 ? 1 : 0;
                seg = settings.values[i] / totalValue * 360 + seg;
                radSeg =  seg * Math.PI / 180;
                nextX = Math.cos(radSeg) * radiusX;
                nextY = Math.sin(radSeg) * radiusY;
                svg += '<path d="M ' + startX + ',' + startY; // starting point
                svg += ' l ' + lastX + ',' + (-lastY); // line to
                svg += ' a ' + radiusX + ',' + radiusY + ' 0 ' + arc + ',0 ' + (nextX - lastX) + ',' + (-(nextY - lastY)) + ' z" '; // arc & cloZe
                svg += 'fill="' + settings.colors[i] + '" ';
                svg += 'stroke="' + settings.outlineColor + '" stroke-width="' + settings.outlineWidth + '" stroke-linejoin="round"/>';
                lastX = nextX;
                lastY = nextY;
            }
            svg += '</svg>';
            obj.html(svg);
        });
    };
})(jQuery);

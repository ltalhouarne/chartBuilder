        $( document ).ready(function() {
            $("#row").click(function () {
                $("#formID").append(
                                "<br>" +
                                "<div class='input-group'> " +
                                "<div class='input-group-addon'>Value name</div>" +
                                "<input class='form-control w' placeholder='Enter value name'>" +
                                " <div class='input-group-addon'>Value</div>" +
                                "<input class='form-control w2' type='email' placeholder='Enter value'>" +
                                "</div>"
                );
            });

            $("#load").click(function () {
                var rows = new Array();
                var increment = 0;
                $('.w').each(function(i, obj) {
                        var nextV =parseInt($(this).next().next().val());
                        if(nextV=="") alert("A value is missing. Please complete all fields.");
                        else {
                            var rowValue = new Array();
                            rowValue[0]=$(this).val();
                            rowValue[1]=nextV;
                            rows[increment++] = rowValue;
                        }
                });
                console.log(rows);
                drawChart("pie", rows, $("#title").val(), $("#legend").val());
            });
            $("#load2").click(function () {
                var rows = new Array();
                var increment = 0;
                $('.w').each(function(i, obj) {
                    var nextV =parseInt($(this).next().next().val());
                    if(nextV=="") alert("A value is missing. Please complete all fields.");
                    else {
                        var rowValue = new Array();
                        rowValue[0]=$(this).val();
                        rowValue[1]=nextV;
                        rows[increment++] = rowValue;
                    }
                });
                console.log(rows);
                drawChart("bar", rows, $("#title").val(), $("#legend").val());
            });
            $("#load3").click(function () {
                var rows = new Array();
                var increment = 0;
                $('.w').each(function(i, obj) {
                    var nextV =parseInt($(this).next().next().val());
                    if(nextV=="") alert("A value is missing. Please complete all fields.");
                    else {
                        var rowValue = new Array();
                        rowValue[0]=$(this).val();
                        rowValue[1]=nextV;
                        rows[increment++] = rowValue;
                    }
                });
                console.log(rows);
                google.setOnLoadCallback(drawChart("area", rows, $("#title").val(), $("#legend").val()));
            });
        });

        // Load the Visualization API and the piechart package.
        google.load('visualization', '1.0', {'packages':['corechart']});

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart(str, rows, title, legend) {

            // Create the data table.
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'String');
            data.addColumn('number', 'Number');

            for(var i=0; i<rows.length;i++){
                data.addRow(rows[i]);
            }

            // Set chart options
            var options = {
                'title':title,
                'width': 400,
                'height': 300
            };

            if (str == "pie") {
                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                chart.draw(data, options);
            }else if (str == "bar"){
                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
                chart.draw(data, options);
            }else if (str == "area"){
                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
                chart.draw(data, options);
            }
        }



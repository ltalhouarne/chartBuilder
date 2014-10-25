$( document ).ready(function() {
        var dummyRows = new Array();

        load();

        function load() {
            dummyRows = [];
            $('#myTable tr').each(function() {
                if($(this).find(".data").text().length > 1 && $(this).find(".data").text() != " " && $(this).find(".value").text().length > 1 && $(this).find(".value").text() != " ") {
                    console.log($(this).find(".data").text().length);
                    console.log($(this).find(".value").text().length);
                    var name = $(this).find(".data").text();
                    var amount = parseInt($(this).find(".value").text());
                    console.log(name + ", " + amount);
                    dummyRows.push([name, amount]);
                }
            });
            console.log(dummyRows);
        }
        google.setOnLoadCallback(drawChart("pie", dummyRows, "Dummy Pie", "Dummy Data"));

        $("#load").click(function () {
            load();
            drawChart("pie", dummyRows, $("#title").val(), $("#legend").val());
        });

        $("#load2").click(function () {
            load();
            drawChart("bar", dummyRows, $("#title").val(), $("#legend").val());
        });
        $("#load3").click(function () {
            load();
            drawChart("area", dummyRows, $("#title").val(), $("#legend").val());
        });
        $("#removeRow").click(function(event){
            event.preventDefault();
            $('#myTable tr:last').remove();
        });

        $("#addRow").click(function(event){
            event.preventDefault();
            var nextLetter =(parseInt($('#myTable th:last').text())+1).toString();
            var countCol = $("#header").children().length;

            string="<tr><th></th>";
            for(var i = 0; i < countCol-1; i++){
                if(i==0) {
                    string += "<td class='data'>&nbsp;</td>";
                }else if(i==1){
                    string += "<td class='value'>&nbsp;</td>";
                }
            }
            string+="</tr>";
            $("#body").append(string);
            $('#myTable th:last').text(nextLetter);
        });
    });

    // Load the Visualization API and the piechart package.
    google.load('visualization', '1.0', {'packages':['corechart']});

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart(str, dummyRows, title, legend) {

        // Create the data table.
        var data = new google.visualization.DataTable();

        data.addColumn('string', 'String');
        data.addColumn('number', 'Number');

        for(var i=0; i<dummyRows.length;i++){
            data.addRow(dummyRows[i]);
        }

        // Set chart options
        var options = {
            'title':title,
            'width': 800,
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

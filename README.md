<!DOCTYPE html>
<html>
<head>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
</head>
<script>
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

</script>
<style>

    #formy{
        height:100%;
    }

    .w{
        width:150px;
    }

    body{
        text-align:center;
    }
    html, body {
        height: 100%;
        text-align:center;
    }

    html {
        background-color: #EFEFEF;
    }

    table, td, th {
        border: 1px solid #CCC;
        border-collapse: collapse;
    }

    td, th {
        background-color: #FFF;
        width: 50px;
        height: 20px;
        text-align: center;
        vertical-align: middle;
        font: 10px Verdana, sans-serif;
    }
    th {
        background-color: #DDD;
        font: bold 11px Verdana, sans-serif;
        border-color: #BBB;
    }
    #wrapper{
        height:100%;
    }
    .section{
        text-align:center;
    }
    #myTable{
        text-align:center;
    }
    section{
        text-align:center;
        margin-left:12px;
    }

    div.chart_div table {
        width: auto;
        margin: 0 auto !important;
    }

    #chart_div{
        display: block;
        margin: 0 auto;
    }

    #everything2{
        width: 800;
        margin: 0 auto !important;
    }

</style>
<body><div class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Graph Builder</a>
        </div>
    </div>
</div>
<div id="chart_div"  style="text-align:center; margin-left:250px;"></div>
<div class="jumbotron">
<div id="everything">
    <div id="everything2">

        <button id="load" class="btn btn-default w"><i class="fa fa-pie-chart"></i> Load Pie chart</button>
        <button id="load2" class="btn btn-default w"><i class="fa fa-bar-chart"></i> Load Bar chart</button>
        <button id="load3" class="btn btn-default w"><i class="fa fa-area-chart"></i> Area Bar chart</button>
        <br>
    </div>
</div>

<form class="form-inline" role="form" id="formy">
    <div class="form-group" id="formID">
        <br>
        <div class="input-group" >
            <br>
            <div class="input-group-addon">Title</div>
            <input id="title" class="form-control w3" placeholder="Enter a Title">
            <br>

        </div>
        <div style="text-align:center;">
            <br>
            <button class="btn btn-default" id="addRow"> <i class="fa fa-plus-square-o"></i> Add variable</button>
            <button class="btn btn-default" id="removeRow"> <i class="fa fa-minus-square-o"></i> Remove variable</button>
        </div>
        <section id="wrapper" >
            <article>
                <section contenteditable="true">
                    <table id="myTable">
                        <tbody id="body">
                        <br>
                        <tr id="header"><th>&nbsp;</th><th style="width:100px;">Variable Name</th><th>Value</th>
                        <tr><th value="1">1</th><td class="data">Data sample 1 </td><td class="value">33</td>
                        <tr><th value="2">2</th><td class="data">Data sample 2</td><td class="value">33</td>
                        <tr><th value="3">3</th><td class="data">Data sample 3</td><td class="value">33</td>
                        </tbody>
                    </table>
                    <iframe id="txtArea1" style="display:none"></iframe>
                </section>
                <br>

            </article>
        </section>

    </div>

</form>

</div>
</body>
</html>

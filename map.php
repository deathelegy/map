<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Google Map 導航資訊抓取</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCA7pIRrf1ogzFUwx3rbbN1bifdeNqmVIs"></script>
    <!-- <script src="js/muilt.js"></script> -->
    <script src="js/map.js"></script>
    
</head>

<body>
    <form id="output-data" method="post" target="_blank" action="output.php">
        <input type="hidden" name="data" id="data" />
    </form>
    <div class="row">
        <div id="output1" class="col-md-2 output-body" style="display:none">
            <br/>
            <button type="button" class="btn btn-info" onClick="downloadRoute(1)" id="download-btn">下載路徑</button>
            <div class="panel-body"></div>
        </div>
        <div id="output2" class="col-md-2 output-body" style="display:none">
            <br/>
            <button type="button" class="btn btn-info" onClick="downloadRoute(2)" id="download-btn">下載路徑</button>
            <div class="panel-body"></div>
        </div>
        <div id="map-block" class="col-md-9">
            <div id="map-canvas"></div>
        </div>
        <div id="panel-block" class="col-md-3">
            <div id="left-panel">
                <h2><img src="img/logo.png" class="img-responsive"></h2>
                <button type="button" class="btn btn-primary btn-lg btn-block" onClick="randomPoint()">給定起終點</button>
                <button type="button" class="btn btn-primary btn-lg btn-block" onClick="CalcTwoRoute()">規劃路徑</button>
                <button type="button" class="btn btn-primary btn-lg btn-block" onClick="LoadXMLAndCalc()">載入XML檔</button>
            </div>
        </div>
    </div>
</body>

</html>

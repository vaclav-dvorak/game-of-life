<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title><%= htmlWebpackPlugin.options.title %></title>

    <link
      rel="stylesheet"
      href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"
    />
    <style>body{padding-top:50px}</style>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="jumbotron">
            <h1>Conway's Game of life</h1>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <canvas width="570px" height="570px" id="gameField"></canvas>
        </div>
        <div class="col-sm-6">
          <div>Population: <span id="pop">0</span></div>
          <div>Generation: <span id="gen">0</span></div>
        </div>
      </div>
    </div>
  </body>
</html>

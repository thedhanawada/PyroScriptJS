# FireworksJS

FireworksJS is a simple, lightweight JavaScript library for creating a beautiful, interactive fireworks animation on a web page. It allows users to generate fireworks by moving the mouse, with additional random fireworks for a dynamic and engaging user experience.

## Installation

To install FireworksJS, simply download the Fireworks.js file from this repository and include it in your HTML file with a script tag:

```html
<script src="path/to/Fireworks.js"></script>
```

## Usage

To use FireworksJS, you first need to create a canvas element in your HTML file:

```html
<canvas id="myCanvas"></canvas>
```

Then in your JavaScript code, you can create a new Fireworks instance, passing the id of your canvas element to the constructor. Call the start method to start the fireworks:

```javascript
var fireworks = new Fireworks('myCanvas');
fireworks.start();
```

You can also stop the fireworks by calling the stop method:

```javascript
fireworks.stop();
```

## Example

Here's a full example of an HTML file that uses FireworksJS:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Fireworks Demo</title>
    <style>
        body, html, #myCanvas {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    <canvas id="myCanvas"></canvas>
    <script src="path/to/Fireworks.js"></script>
    <script>
        var fireworks = new Fireworks('myCanvas');
        fireworks.start();
    </script>
</body>
</html>
```

## License

FireworksJS is open source JS Library and is licensed under the MIT license. See the LICENSE file for more information.

jquery-boxfixer
===============

This jQuery plugin allows you to fix elements when the user scrolls.

Usage
------

```javascript
$(selector).fixAtDistance(distance, classToApply);
```

If you just want to fix an element when the user reaches a certain distance from the top of the page:

```javascript
$('div#my_cool_div').fixAtDistance(500);
```
This will change the position of div#my_cool_div to fixed when the user reaches to a distance equal or greater than 500px of distance from the top of the page.

If you want to change other things rather than the position the you will have to pass a second argument: classToApply. That is a css class that will be applied then the given distance is reached. If you also want the element to be fixed you will have to handle that on your own in that css class.

```javascript
$('div#my_cool_div').fixAtDistance(500, 'my_cool_class');
```
This will add the class my_cool_class to div#my_cool_div when the user reaches to a distance equal or greater than 500px of distance from the top of the page.
**Note:** you can only use one function on an element. You can't do this:
```javascript
$('div#my_cool_div').fixAtDistance(200, 'my_cool_class');
$('div#my_cool_div').fixAtDistance(500, 'my_cool_class2');
```

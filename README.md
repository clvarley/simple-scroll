# @clvarley/simple-scroll

The small utility that aims to make scrolling to elements simple.

## About

Getting the browser to scroll to a given element can be a pain. While APIs like
[`Element.scrollIntoView`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)
and [`window.scroll`](https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll)
can get us there, they can be fiddly to get use and don't offer us much in the
way of customisation.

Simple scroll is a small utility that offers a no-frills, no-nonesense way of
easily scrolling elements into view.

## Installation

Firstly, make sure to download the library like so:

```sh
npm install --save @clvarley/simple-scroll
```

After [npm](https://www.npmjs.com/) has installed the library, it can be
imported into your projects as normal:

**ES6 module**<sup>*preferred</sup>

```js
import {simpleScroll} from '@clvarley/simple-scroll';
```

**CommonJS**

```js
const {simpleScroll} = require('@clvarley/simple-scroll');
```

## Getting Started

Now that you have the library installed and imported, we can begin to use it.
Simple scroll offers a very simple API, in it's most basic form it can be used
as follows:

```js
import {simpleScroll} from '@clvarley/simple-scroll';

const someElement = document.querySelector('#some-element-id');

simpleScroll(someElement);
```

Just pass the element you want to view and `simpleScroll` will scroll the window
there!

When this code gets run - for example inside an event listener - the window will
be softly scrolled to the `#some-element-id`. If that's all you need, you can
stop reading here and get hacking!

## Options

However, it's likely you will want to modify the default behavior of
`simpleScroll` to better suit your needs. The behaviour of `simpleScroll` can be
customised by passing an options object through as an (optional) second
parameter.

```js
import {simpleScroll} from '@clvarley/simple-scroll';

const someElement = document.querySelector('#some-element-id');

simpleScroll(someElement, {
    duration: 2500,
    padding: 32
});
```

Here we've modified the default scroll behaviour. Now, the scroll will happen
over the course of 2500 milliseconds (2.5s) and will leave 32px of padding above
the element. (To accommodate for a fixed navbar, for example)

At the current time there are only 3 properties that can be set, but we hope to
expose more in the future.

| Property | Type | Purpose | Default |
| :------- | :--- | :------ | :------ |
| `duration` | `number` | Time (in milliseconds) the scroll animation should take | 0 |
| `padding` | `number` | Padding (in pixels) to be left above the element | 0 |
| `timing` | `function` | Function used to control how the animation will be timed | [TIMING_EASE_IN_OUT] |

## Timing

By default, `simpleScroll` uses a [cubic ease-in-out](https://easings.net/#easeInOutCubic)
curve for its animation (think similar to the `ease-in-out` value of the CSS
transition property). This is a good general "all rounder" and looks adequate in
most places, but we also provide a set of other animation styles.

### Linear

Linear timing, with no acceleration or change in speed over the course of
the animation. Scrolls straight to the target and stops.

```js
simpleScroll(someElement, {
    timing: simpleScroll.TIMING_LINEAR
});
```

### Ease-in

Timing with a slow start that accelerates. Gets faster over time and comes to
a sharp stop at the target element.

```js
simpleScroll(someElement, {
    timing: simpleScroll.TIMING_EASE_IN
});
```

### Ease-out

Timing with a fast start that decelerates. Gets slower over time and comes to a
gentle stop at the target element.

```js
simpleScroll(someElement, {
    timing: simpleScroll.TIMING_EASE_OUT
});
```

### Ease-in-out

The default.

Timing that accelerates at first, then decelerates as it approaches the end.
Starts slow, picking up pace until the halfway mark then slowing down and gently
stopping at the target element.

```js
simpleScroll(someElement, {
    timing: simpleScroll.TIMING_EASE_IN_OUT
});
```

### Custom Timing

Not happy with the defaults provided? You can also supply your own timing!

Passing a function of your own as the `timing` option is also allowed. Your
custom callback must take one argument, a decimal number representing the
current time elapsed between 0 and 1 (0 for just started, 0.5 for halfway, 1
for finished and so on) and must return a number within the same bounds (0 to 1)
that represents how far you wish the animation to have progressed.

For those of you familiar with TypeScript the signature should look like this:

```ts
function myTimingCallback(elapsed: number): number {
    /* your logic here */
};
```

For inspiration, and for ideas of the sort of thing you might want to do, why
not take a look at some of the examples on [easings.net](https://easings.net/).

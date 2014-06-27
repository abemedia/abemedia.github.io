---
layout: post
title: "jQuery Smoove - Sexy CSS3 scroll effects made simple"
categories:
- Blog
- Announcements
tags:
- css
- jquery
- animation
image: "/images/blog/css3.jpg"
author: Adam Bouqdib
---
Want gorgeous **scroll animations** on your website? So did we! The only problem is that most JavaScript plugins we came across for doing so were total overkill and felt a bit like lighting a candle with a flame-thrower. With so many awesome effects possible with **CSS3** these days, we felt it was time for a new, simpler way to spice up scrolling on your website, without all the clutter that tends to come with it, so we got to work...

## Introducing jQuery Smoove

Smoove is a super simple jQuery plugin for creating awesome **CSS animations** as you scroll down the page, making your content smoothly glide into view. It supports a number of different slick effects & 3D animations and only takes a single line of code to run.

### Lightweight

The plugin weighs in at only 3.3KB (minified) and doesn't require any CSS files to work.

### Responsive

Smoove was built with [responsive web design](/responsive-web-design) in mind and automatically adapts to any changes to the viewport.

### Free & Open Source

Yep that's right, it doesn't cost a penny and is licensed under GNU GPLv2.  
Feel free to [fork it on GitHub](https://github.com/abeMedia/jquery-smoove){:target="_blank"}.

## Usage

Using jQuery Smoove is as simple as including the JavaScript file in your project and adding one single line of code to run it. What makes it even better is that it's hosted on [CloudFlare's super-fast CDN](http://cdnjs.com/libraries/jquery-smoove){:target="_blank"}, so you don't even have to download it!

The following example shows how easy it is to create a similar effect as we have right here on ABE Media, making objects glide in from the bottom.

### Loading JavaScript files

Load jQuery & jQuery Smoove from CloudFlare's CDN.

{% highlight html %}
<!-- Always include jQuery before loading any plugins -->
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<!-- Load jQuery Smoove from cdnjs -->
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-smoove/0.2.6/jquery.smoove.min.js"></script>
{% endhighlight %}

### Initiate jQuery Smoove

Initiate Smoove for all objects with the class `.foo`, setting the `moveY` parameter to make them smoothly move up their Y-axis. See the [documentation](http://smoove.donlabs.com/#options){:target="_blank"} for a full list of possible parameters.

{% highlight js %}
$(".foo").smoove({moveY : '100px'});
{% endhighlight %}

### Using HTML5 data-attributes

Alternatively you can also set the options using data-attributes. Doing so will override any parameters set in the JavaScript. 

**Note:** When defining options via data-attributes, CamelCase names are split with hyphens e.g. `moveY` becomes `data-move-y`.
{: .alert .alert-warning}

{% highlight html %}
<div class="foo" data-move-y="100px"></div>
{% endhighlight %}

## Demo

To see **jQuery Smoove** in action just [visit our front page](/) and scroll up & down the page.

## Get Started

Enough of the talking - time for some action! Check the following links to get started.

- [Download latest release](https://github.com/abeMedia/jquery-smoove/zipball/master)
- [Read the docs](http://smoove.donlabs.com)
- [Fork it on GitHub](https://github.com/abeMedia/jquery-smoove)

If you have any questions or feedback feel free to [give us a shout](/contact) or use the comments section below.

Stay awesome!

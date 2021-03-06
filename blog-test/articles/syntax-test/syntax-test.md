Author: A noble spirit
Editors: Sacco and Vanzetti
Date: AD 1999, Day of Lavos
published: false

# Available Syntax

Here's a list of current syntax options. Notations are provided for PHP Extras syntax, Maruku syntax, GFM, and NAMP dialects.

* * *

## PHRASE EMPHASIS
---------------
*italic*   **bold**  
_italic_   __bold__

## LINKS
---------------
Inline:
An [example](http://url.com/ "Title")

Reference-style labels (titles are optional):
An [example][id]. Then, anywhere  
else in the doc, define the link:

  [id]: http://example.com/  "Title"

## IMAGES
---------------
Inline (titles are optional):
![alt text](/path/img.jpg "Obviously, no image")

Reference-style:
![alt text][id]

  [id]: /url/to/img.jpg "Obviously, no image"

## HEADERS
---------------

Header 1
========

Header 2
--------

atx-style (closing #'s are optional):

# Header 1 #

## Header 2 ##

###### Header 6

## LISTS
---------------
Ordered, without paragraphs:

1.  Foo
2.  Bar

Unordered, with paragraphs:

*   A list item.

    With multiple paragraphs.

*   Bar

You can nest them:

*   Abacus
    * A tool
*   Banana
    1.  Fruit
    2.  Gorilla snack
        * (or monkeys)
    3. Yellow
*   Camel

## BLOCKQUOTES
---------------
> Email-style angle brackets
> are used for blockquotes.

> > And, they can be nested.


> #### Headers in blockquotes
> 
> * You can quote a list.
> * Etc.


## CODE SPANS
---------------
`<code>` spans are delimited
by backticks.

You can include literal backticks
like `` `this` ``.

## PREFORMATTED CODE BLOCKS
---------------
Indent every line of a code block by at least 4 spaces or 1 tab.

This is a normal paragraph.

    This is a preformatted
    code block.


Code tags can also be "fenced" by ` ``` ` (GitHub-Flavored-Markdown)

```
console.log("flock yeah!");
```

For extra awesome, add the name of a programming language to the first fence, in order to syntax highlight it.

```perl
var x = function () { 
  console.log("This actually has 'perl' as a tag!")
};
```

(Highlighting is enabled by default; you'll have to define your own CSS.)

## Strikethrough

Hey, this is ~~terrible~~ great!


## HORIZONTAL RULES
---------------
Three or more dashes or asterisks:

---

* * *

- - - -

## MANUAL LINE BREAKS
---------------
End a line with two or more spaces:

Roses are red,  
Violets are blue.

- - - - - - - - - - - - - - - - - - - -

## TABLES (PHP Extras)
-----------------

|a |b |c
|--|--|--
|1 |2 |3


|a |b |c
|:--|:--:|:--
|1 |2 |3
|4 |5 | 6

or

x |y        |z
--|--|--
8 |9 |10

{: .table .table-striped .table-bordered .table-condensed}

alignment

  right|left  | center
-----:|:-----|:------:
 0001 | 2    | 003
   4  | 0005 |  6

## DEFINITION LISTS (PHP Extras)
-----------------

Apple
:   Pomaceous fruit of plants of the genus Malus in 
    the family Rosaceae.

Orange
:   The fruit of an evergreen tree of the genus Citrus.

Pomegranate
:   A deciduous shrub or small tree (Punica granatum),
native to Asia and _widely cultivated_ for its edible fruit. Anyway,
  Blah blah blah.adsadsasd

Term 1
:   This is a definition with two paragraphs. Lorem ipsum 
    dolor sit amet, consectetuer adipiscing elit. Aliquam 
    hendrerit mi posuere lectus.
:   Second definition for term 1, also wrapped in a paragraph
    because of the blank line preceding it.
    
{: #TestingIDHere}

## ATTRIBUTES (Maruku) {: #myid .myclass}
-----------------

Look _around_{: .class1} you! View [the source code!]{: .someclass .someclass2 vague="no"}
This whole area is covered in
attributes!

{: #bigBlock tutorial=yes}

Spans should be covered in `[ ]`, with the attribute list defined afterwards.

## AUTO-LINK
-----------------

<http://foo.com/>  
<mailto:foo@bar.com>

## ENCODING
-----------------

&amp; < "aaa"

## Boostrap tags

Note: This should be wrapped in a div that looks like this: `<div class='alert alert-success'>`. 

Tip: This should be wrapped in a div that looks like this: `<div class='alert alert-info'>`

Warning: And _this_ should be wrapped in a div like this: `<div class='alert alert-block'>`

These classes have to do with Twitter Bootstrap stylings for `Note: `, `Tip: `, and `Warning: `.

## INLINE HTML
-----------------

<p>
HTML is represented as is.<br>
<del>The <strong>quick brown fox</strong> jumps over the lazy dog.</del>
</p>

<div>
Regularly Markdown syntax ignored in HTML.<br/>
[Google](http://www.google.co.jp/)
</div>

<div markdown="1">
Markdown enabled inside HTML when marked by markdown="1" attribute.  
[Google](http://www.google.co.jp/)
</div>
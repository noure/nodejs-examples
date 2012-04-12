published:true
some:metadata
like:an
author:micha

# MultiMarkDown CheatSheet - and this is a title too!

## Paragraphs and Breaks

To write a paragraph you simple do this... write something without indentation or other exotic things. A simple return won't add a break,
you can
add as many breaks
as you like, it will still be one paragraph.

Put a blank Line in between to start a new paragraph.

If you want a break:  
end your line with two spaces.

## Headers

Openening hashes determine header level:

	# H1

closing hashes are optional 

	# H1 # 

### Header with ID ###
{: #header1 }

[Link back to header 1](#header1)

## Blockquotes

> this is a blockquote
> 
> > Second paragraph in the blockquote, nested.
> ## This is an h2 in a blockquote
{: cite=http://www.google.de}

## Phase Emphasis

*em* 
**strong**
***em and strong***

## Lists

1.  start the list with number 1, otherwise number order doesn't matter
2.  ordered list item
3.  ordered list item ... again

lists need to be separated by other elements, or the lists will be joined  

*	a list item.

	with multiple paragraphs

> and a blockquote

## Horizontal Rules

---

on a line by itself

## Links

An [inline link](http://foobar.com "optional title").

A [reference link][id]

the id is defined elsewhere

[id]: http://foobar.com "optional title"

[Google][] creates implizit link name shortcut

[Google]: http://google.com "Google"

<http://foobar.com> creates linked url
<mail@foobar.com> creates encoded mailto

## Images

![alt text](path/to/image "optional title")

or reference style

![alt text][id]

[id]: path/to/image "optional title"

## Code

Backticks format and auto-escape `&`, `<` and `>` in code, e.g. in `<foo>` or `&mdash`.

	Preformatted code is also easy. &trade;
	<strong>Just indent 4 spaces.</strong>

### Code with Meta-Data

	Preformatted code is also easy. &trade;
	<strong>Just indent 4 spaces.</strong>
{: language=xml}


## Escaping

Backslash \ escapes the following characters:

\\ \` \* \_ \{ \} \[ \] \( \) \# \+ \- \. \!

Avoid accidental numbered lists by escaping the dot:

1918\. What a great season

## HTML Tag Integration

For any <span>markup that is *not* covered by Markdown´s syntax</span>, use HTML tags.

Block-level HTML elements must be surrounded by blank lines, as so:

<table>
	<tr>
		<td>*Foo*</td>
	</tr>
</table>

Markdown formatting syntax is not processed within block-level HTML tags.

## Markdown inside html blocks

<div markdown="1">
This is *true* markdown text.
</div>
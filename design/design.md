## Design Decisions:

For our final design, we took a lot of inspiration from the Apple Remind app and Desmos. We took ideas from both of
these interfaces and combined them to create our to do list. We got ideas from the Remind app to have the items of our
list have a circle to the left (non-filled in circles for unfinished tasks and filled in circles for finished tasks).
Based on the Remind App, we also decided to put lines under the tasks as a way to separate them without putting boxes
around them. We decided to put the three options to hide, show and delete finished tasks in a three dot dropdown button
at the top. We only show this button option if there are completed tasks since the actions are not relevant if there are
no completed tasks. We decided to do this to make the list more clean and to reduce the buttons being displayed at a
time. Also, when you click the delete option, a pop-up appears confirming the deletion of all completed items to reduce
the possibility of accidentally deleting them. Additionally, the show and hide options toggle and both options aren't
displayed at the same time. We also added a hover option for these buttons to make them appear clickable. We hoped for a
minimalist display with a larger focus on the actual list rather than the buttons. We put this three dot button at the
top next to the title where we think people will intuitively look for it. When there are no items on the list, we
decided to have one empty “item” that indicates the user to type there. Then, for future items that need to be added,
there is a plus sign button under all current items to indicate the user to click there when they want a new item. It
also changes colors when hovered over to appear clickable. We hoped for this to be an intuitive and clean way to add new
items while keeping the minimalistic look. We also decided to put a highlight over any item that is currently clicked on
and editable. We decided to do this as a way to indicate to the user that this is the item that is clicked
on. Additionally, users can cross off items by pressing on the circle next to them. What happens next is that the task
gets crossed off and changed to a lighter color. We did this as a way to give the user the satisfaction of crossing off
an item and making it less prominent than the unfinished tasks while not moving or removing it. We also added an "x"
button at the end of every list item in order to delete a single list item. This way, there is an easy way to delete
individual items. This button also changes colors when hovered over to indicate that it is clickable. The protocol of
the plus, the x and the three dots allows us to keep a simple look while still making the actions discoverable and
intuitive. When to do items are too long and don't fit on the line, the first part appears and there is an ellipse at the
end to indicate that there is more text there. The final feature we added was to make the title of the list editable.
This can fit the users needs more. The default is "To Do List" but this way users can change it to "Grocery List" or any
other title to fit their needs.

#### Images:

Here we can see what our page looks like when there are no items.

![startingScreen.png](startingScreen.png)

Here we can see what a set item looks like and what an item that is currently being edited looks like with the highlight
over it.

![secondItemEditing.png](secondItemEditing.png)

Here we can see the options available when the three dots button is clicked, and we can see what a crossed out item looks
like.

![deleteCompletedHover.png](deleteCompletedHover.png)

Here we can see how the add button looks when its being hovered.

![plusHover.png](plusHover.png)

Here we can see how the individual delete button looks when its being hovered.

![deleteItemHover.png](deleteItemHover.png)

Here we can see how the title looks like when it is being edited

![titleEdit.png](titleEdit.png)

Here we can see how our to do items look like when they are too long to fit on the line

![ellipses.png](ellipses.png)

## Alternate Designs:

One major design decision is that we were considering putting each todo list item in a box. This is similar to the
Desmos layout. This is what we were considering doing at first because we felt that it was a good way to separate the
items and have a clear divide among them. However, then we realized that if we have a line under each item, this could
also work as a dividing feature. Then, we checked the Remind app and saw that they used lines underneath each item and
this worked well as a way to have the items on a line instead of floating in air but also as a way to divide items. We
ended up liking this more because the divisions were less stark while still being present. Another design decision we
faced is that initially, we wanted to have the background of the list items to alternate colors, for example, item 1
would be green and item 2 would be blue and item 3 would be green again and so on. We originally wanted to do this
because we thought it would help with the readability of the list. However, in the end we decided against this because
we wanted to have the feature that the item currently selected would be highlighted a different color and these two
features wouldn't work well together. We valued more having the selected item highlighted, and so we couldn't have the
alternating colors design. We also realized that the menu button with the
"delete", "show" and "hide" completed item options was only needed when there were completed items. Therefore, it is
hidden otherwise. Additionally, the user doesn't need both show and hide options at the same time so these buttons
toggle in place. We also were planning on having a circle with a black as the last item at all times and have the user
click next to the circle to add a new item. We realized that this may not be intuitive for all users, so we changed the
design to have the plus sign button at the end instead. This allowed us to keep the minimalist design without loosing
discoverability.

#### Images:

Here we can see our original design idea of having the list items alternate colors to improve readability. We also show
our final design idea with the highlight for the selected item. The two design ideas did not work well together, so we
had to choose just one. Here we can see why:

![colors.jpg](https://www.dropbox.com/s/u0secgpzq48uwi7/colors.jpg?dl=0&raw=1)

Here we can see our different decisions for how to separate the items.

![boxes.jpg](https://www.dropbox.com/s/iynkgxi06iffogs/boxes.jpg?dl=0&raw=1)

Here we can see our original design of always having the menu button displayed and having a circle under the current
items and having the user click next to the circle to add a new item. The menu item is not needed when there are no
completed items and the circle is not as intuitive for everyone and a plus sign is much more universal.

![crossedOutAnd Menu.png](crossedOutand Menu.png)

## User Testing:

During lab 1, We asked one Harvey Mudd student to help us with testing our site. 
We walked them through the different scenarios
described in the homework. We asked them to practice “Thinking Out Loud” techniques during the usability test. We
basically asked them to talk through all the thoughts they were having while one of us took notes. We prepped them by
saying that the website is not actually functional but that we would show them different pages that would display for
the actions being described. We still asked the user to physically complete the actions even though the website is not
yet functional. For each task, we would start by saying “What would you do if you wanted to…” and then ask them to
explain in words what they would do, practicing the “thinking out loud” skills. Then we would switch the page to the
next page of the flow of the specific task. We did this for all 6 tasks (create an item in an empty list, create an item
in a nonempty list, mask an item as completed, rename an item. Show only uncompleted items, delete all completed items).
After we completed all the tasks, we asked the participant what they liked and didn't like from the website. The student
uses lots of online todo lists. They liked that the interface was clean and minimalistic while still being intuitive.
They would have liked that when an item was marked as completed, that it automatically moved to the bottom of the list,
or to another location and out of the way. The user also mentioned that they would have appreciated a way to delete
single items, which is something that we had not thought of. We could implement this in our next stage by adding an “x”
button to the right of every item. This “x” button could show up only when hovered on an item to keep the clean look.
The user also mentioned that they would have liked a way to title the todo list, create more todo lists and change the
color scheme of the todo list. Based on this, we did incorporate some of these suggestions for our design of Lab 2.

For our second round of user testing, we asked a different Harvey Mudd Student to try out our app. 
Overall, they found all actions to be discoverable and usable except the title change. In order to fix this, we  could either
have a cursor change on hover or 
we can add another minimalistic button with a pencil on it next to the tile to indicate that by clicking on that button,
you are able to change the title name. The user also pointed out that our "x" buttons were not centered in the line. We 
were able to fix this problem. The user stated that having an "enter" feature would be nice, meaning that when you are on an input
box, and you are down typing, pressing enter would exit out of the input box. The user found it weird that you were able to cross out
empty items or items that had the placeholder text "add an item here". 

## Challenges you faced:

The main challenge that comes to mind is making decisions as a pair. At times, it was difficult to come to a singular
decision when we both had very different opinions. At times, we would postpone making a decision when this occurred and
worked on other things in the meantime. Then, we would come back to the decision later, when we both had more time to
think about it and state our case more clearly. Most times, we would come up with a third idea that we both liked
or one of us would compromise if it ended up not being as important to us. For example, we got into a pretty long
argument about what font to choose. We wanted to choose a font that is dyslexia friendly but couldn't agree on which one
because if one of us liked a font, the other person hated it. We eventually landed on a font that we both loved and are
really happy with. Working in groups is always hard because everyone has different opinions and even though this was a
challenge, I feel like in the end we made it work, and we learned how to work better with each other. Another challenge
was that at times it was frustrating when we were pair-programming, and we wanted to work on different things. What would
end up happening is that we would work on our separate computers and reconvene in the end to put our work and ideas
together.  
Another general struggle was trying to figure out how to make the html site look like we wanted it to. Some components
of this took a lot of trial and error, such as font size, color, grid column and roseIt was hard at times because we
knew how we wanted it to look, but we didn't know what steps we needed to take to get there. Online documentation was
helpful in these cases but at times they would lead you down a rabbit hole. We also struggled with the grid and the flex
boxes for a while because we couldn't figure out how to get the different items in the specific places that we wanted
them to be. We realized later that we had three separate items in one div, and it wasn't letting us put these items in
different grid coordinates. It took us a while to figure out why this wasn't working.
Working with javascript was very challenging at times. There were times when we needed to make changes in the 
JavaScript files to add functionality but then this would affect the look, and we would spend a lot of time in the css
file trying to get things to look like we wanted them to again. For example, there was a time when we needed to add div, but it shifted where the menu item was placed. Additionally, figuring out where to do certain actions, like delete item,
was trial and error because at first we were very unsure of where this code needed to go. The project at first was very 
overwhelming due to its size. It was only after breaking it up into smaller pieces and making actual progress in these
smaller parts that we felt it was manageable but at first it was very overwhelming and getting started was challenging. 

## Parts you're most proud of:

We are proud that we were able to create a design that is a good blend of intuitive, minimalistic and not overcrowded
while still having all the required features and having these features be discoverable. This allowed us to give the
actual todo list the most emphasis, as this is the main feature of the website. We were able to do this by minimizing
the amount of buttons and creating a clean look. We also like how all the colors fit together. We decided to use
different shades of a similar green, and we think it ended up looking very nice. We are also proud of the font choice,
especially considering how long it took us to get there. We also are proud that we were able to actualize all our final
design plans into html and css code. It is cool that we were able to take our original abstract design ideas into
drawings on paper and finally into the computer. We were able to go through this process from start to finish, and we are
proud of that. We are also proud that we were able to add all the functionality that we needed without needing to 
compromise on our design ideas. Overall, we are proud that we were able to make something that we think looks very pretty
and aesthetically pleasing and that we would want to use ourselves. 

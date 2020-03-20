## FRONT END
* ~~Fix profile page for normal user -> Attallah~~
* ~~Make profile page for admin user (just make admin roles able to see it) -> Mahmoud~~
* ~~Make and set up a styled homepage -> Omar (Footer remaining)~~
* ~~Pick a color scheme and overall style -> Omar (Need help in that, I might as well be color blind)~~
**We will change the color scheme later, but the structure is sound so far**

* ~~Implement a marketing page, build an isolated component (the return body and data fetch) -> Attallah~~
  * ~~Linking the component in another page is done by someone else.~~
  * ~~Make a new folder like user and public, but name it Sales or Marketing, something that fits the role~~
* Implement an order page component, a cart page that shows the customer's last order, isolated as well, please do not edit existing files unless necessary. When you're building the component do your fetch and everything from within it. -> Mahmou
* ~Implement a "find nearest branch" component page. Should include google maps api. -> Omar~
  * ~Google maps is no longer an option, so I'll have to figure out another mapping service.~
* ~Add inserts to Create Script -> Omar~
* Make a Order Menu page component -> Omar
* Make a ProductDetails page component -> Omar<br />
For example, if I'm in the menu page, I have many products, if I click on the second product it passes id = 2 to the productdetails component and now that page shows me details for product 2
* Update admin dashboard -> Omar
* Implement Analytics -> Omar<br /> such that when a user visits it records all the relevant information in a new record in Anaylitcs
Analytics saves the page name, which would be the component name in this case, and the product ID if the page visited is that of a product.
* Implement a kind of support chat bot. A small chat window that accepts questions. It checks if questions exist in FAQ table, if not it directs the user to submit a question in a separate page. The bot should have something to say in case the user says something outside of a question. If the question exists in the FAQ, then fetch the answer and show it in the chat. Add some basic records in the FAQ table to test this. To find out if the user asked a question in the FAQ, search for important keywords in the question and if they match enough keywords, then get the correct answer. -> Attallah

**When you're making isolated components and you wanna test them, it's fine if you change other files, but once you know they work, please remove the testing from the other files. The idea of isolated components is that I can simply put the name of your component in a page and it just loads there ... Agile development and all**



# Module 2 Group Assignment

CSCI 5117, Spring 2022, [assignment description](https://canvas.umn.edu/courses/291031/pages/project-2)

## App Info:

- Team Name: The LEAKs
- App Name: Budgetify
- App Link: <https://leaksp2-239a7.web.app/>

### Students

- Luisa Jimenez Alarcon jimen215@umn.edu
- Lana Berge berg2789@umn.edu
- Erik Rossing rossi239@umn.edu
- Amelie Elmquist elmqu089@umn.edu
- Khalid Ahmed ahmed935@umn.edu

## Key Features

**Describe the most challenging features you implemented
(one sentence per bullet, maximum 4 bullets):**

- Budgeting: Updating chart data in real time. The data passed to the chart components needed to be in the computed function instead of watch so it would update properly.
- Search: Category/tag sorting - for Purchased List, there can only be one category assigned to an item, while Wish List can have multiple ("tags" instead of a "category").

Which (if any) device integration(s) does your app support?

- Camera integration: When on mobile, the user can take a photo of the item to add to their Wish List/Purchased List.


Which (if any) progressive web app feature(s) does your app support?

- ...

## Mockup images

LINK TO OUR FIGMA MOCKUP: https://www.figma.com/file/WsJ8sowVenNpUuQe2c2vRN/The-LEAKS-Lofi-Prototype?node-id=0%3A1

## Testing Notes

**Is there anything special we need to know in order to effectively test your app? (optional):**

- There are no notes for testing.

## Screenshots of Site (complete)

**[Add a screenshot of each key page](https://stackoverflow.com/questions/10189356/how-to-add-screenshot-to-readmes-in-github-repository)
along with a very brief caption:**

Splash Page:  ![Alt text](src/assets/splashpage.png?raw=true "Splash")

Wish List: ![Alt text](src/assets/wishlist.png?raw=true "Wish List")

Purchased List: ![Alt text](src/assets/purchasedlist.png?raw=true "Purchased List")

Budgeting: ![Alt text](src/assets/budgeting.png?raw=true "Budgeting")

Upload: ![Alt text](src/assets/uploadwishlist.png?raw=true "Upload Wish List")
![Alt text](/leaksp2/src/assets/uploadpurchasedlist.png?raw=true "Upload Purchased List")

Item: ![Alt text](src/assets/item.png?raw=true "Item")

## External Dependencies

**Document integrations with 3rd Party code or services here.
Please do not document required libraries (e.g., Vue, Vuefire, Firebase).**

- Font Awesome (https://fontawesome.com/) was used for icons throughout.
- FlatIcon (https://www.flaticon.com/free-icon/empty-folder_6598519?term=empty&page=1&position=4&page=1&position=4&related_id=6598519&origin=search) was used for the default image when the user does not upload an image.
- Chart.js (https://www.chartjs.org/) was used on the budgeting page.

**If there's anything else you would like to disclose about how your project
relied on external code, expertise, or anything else, please disclose that
here:**

...

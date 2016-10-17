DeepSearch
----------

DeepSearch is a Chrome Extension that supercharges `Ctrl+F`, letting you search
for text on all *linked* pages simultaneously. You can review your matches in
tooltips next to the links or download them in a CSV file for future analysis.

Advanced users can use Regular Expressions (regex) complete with capture groups
to extract exactly the information they are looking for. This works both on the
current page and as part of a "deep" search.


Tips
====

* Open the DeepSearch interface with "Alt+Shift+F" or click the `.*` icon in
  your Chrome toolbar.
* You can cycle through "shallow" results with the "Find" and "Find Prev"
  buttons or by hitting "Enter" and "Shift+Enter" respectively.
* Performing "deep" search (with the chevron selected) can take several seconds
  as it downloads all of the linked pages. This delay is a function of your
  internet connection and the number of links present. You can cancel your
  search at any time by clicking the `X` button.
* You may download results as a CSV from a tooltip (for "deep" searches) or the
  DeepSearch menu (for "shallow" searches). This file can be opened with any
  spreadsheet tool (e.g., Excel).


Performance
===========

Even a modest web page can have hundreds of links, so a *particularly*
unperformant regex may take significant time to resolve, or, depending on your
computer's resources, even cause the extension or page to hang. Chrome is
excellent at keeping your processes isolated so there should be no risk of a
general browser crash. In the event you need to reload DeepSearch, go to
`chrome://extensions` and click reload.


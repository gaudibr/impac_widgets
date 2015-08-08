README
======

This is an attempt to solve the impac! widget exercise by cesar-tonnoir

SUMMARY
=======

Endpoints are:

https://rails-tutorial-gaudibr.c9.io/#/sales_channels
https://rails-tutorial-gaudibr.c9.io/#/locations

TO-DO LIST
=====

* employee locations widget:
  * <strike>reduce locations that have same/similar coordinates</strike>
  * <strike>alter the size/display of each marker depending on number of employees for location</strike>
  * <strike>set display to encompass as many locations as there are in the map (with dynamic zoom)</strike>
  * <strike>set map to calculate center based on locations</strike>
* <strike>implement sales channel widget</strike>
  * cleanup code (too much repeated code)
  * resolve issue where single marker does not display value (change marker style and text)
* improve interface (switch widgets by type)
* add exception handling
* add testing
* angular
  * separate templates and group controllers/factories by theme (currently only one)
* Improve documentation (both on readme and throughout code)
* Performance:
  * introduce a caching model to store locations an avoid geocoder to consume google api resources
* Make widget dynamic for different organizations 

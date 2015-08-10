README
======

This is an attempt to solve the impac! widget exercise by cesar-tonnoir

SUMMARY
=======

Endpoints are:

https://glacial-river-5935.herokuapp.com/#/locations
https://glacial-river-5935.herokuapp.com/#/sales_channels

TO-DO LIST
=====

* employee locations widget:
  * <strike>reduce locations that have same/similar coordinates</strike>
  * <strike>alter the size/display of each marker depending on number of employees for location</strike>
  * <strike>set display to encompass as many locations as there are in the map (with dynamic zoom)</strike>
  * <strike>set map to calculate center based on locations</strike>
* <strike>implement sales channel widget</strike>
  * cleanup code (too much repeated code)
  * <strike>resolve issue where single marker does not display value (change marker style and text)</strike> Done via tooltip
  * <strike>manage missing locations</strike>
* improve interface (switch widgets by type)
* add exception handling
* add testing
* angular
  * separate templates and group controllers/factories by theme (currently only one)
* Improve documentation (both on readme and throughout code)
* Performance:
  * <strike>move geocoding to the model to allow caching - Update: not needed (can use memory caching)</strike>
  * <strike>introduce a caching model to store locations an avoid geocoder to consume google api resources (possibly mongodb)</strike>
* Make widget dynamic for different organizations - Currently not necessary

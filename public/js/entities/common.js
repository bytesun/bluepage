MySpace.module("Entities", function(Entities, MySpace, Backbone, Marionette, $, _){
	 Entities.FilteredCollection = function(options){
	 var original = options.collection;
	 var filtered = new original.constructor();
	 filtered.add(original.models);
	 filtered.filterFunction = options.filterFunction;
	
	 return filtered;
	 };
 });
MySpace.module("AboutApp.Show", function(Show, MySpace,
 Backbone, Marionette, $, _){
 Show.Controller = {
 showAbout: function(){
 var view = new Show.Message();
 MySpace.mainRegion.show(view);
 }
 };
 });
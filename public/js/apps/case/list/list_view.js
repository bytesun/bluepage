MySpace.module("CaseApp.List", function(List, MySpace,Backbone, Marionette, $, _){
	
	var NoCasesView = Marionette.ItemView.extend({
		template:"#case-list-none",
		tagName:"div",
		className:"alert"
	});
	
	List.OCaseView = Marionette.ItemView.extend({
		tagName:'div',
		template:'#case-item-template',
		events:{
			"click":"highlightName",
			"click td a.js-delete":"deleteOne"
		},
		
		highlightName: function(){
			this.$el.toggleClass("warning");
		},

		deleteOne:function(e){
			e.stopPropagation();
			this.trigger("case:delete",this.model);
		},
		remove:function(){
			var self = this;
			this.$el.fadeOut(function(){
				Marionette.ItemView.prototype.remove.call(self);
			});
		},
		flash:function(cssClass){
			var $view = this.$el;
			$view.hide().toggleClass(cssClass).fadeIn(800,function(){
				setTimeout(function(){
					$view.toggleClass(cssClass);
				},500);
			});
		}
		
	});


	List.OCaseCollectionView = Marionette.CollectionView.extend({
		emptyView:NoCasesView,
		childView:List.OCaseView,
		initialize:function(){
			this.listenTo(this.collection, "reset", function(){
				 this.appendHtml = function(collectionView, itemView, index){
					 collectionView.$el.append(itemView.el);
				 }
			});
		},
		onCompositeCollectionRendered:function(){
			this.appendHtml = function(collectionView, itemView, index){
				 collectionView.$el.prepend(itemView.el);
			}
		}
	});
	
	List.Layout = Marionette.LayoutView.extend({
		template:"#case-list-layout",
		regions:{
			panelRegion:"#panel-region",
			casesRegion:"#cases-region"
		}
	});
	
	List.Panel = Marionette.ItemView.extend({
		template:"#case-list-panel",
		triggers:{
			"click button.js-new":"case:new"
		},
		events:{
			"submit #filter-form":"filterCases"
		},
		ui:{
			criterion:"input.js-filter-criterion"
		},
		filterCases: function(e){
			e.preventDefault();
			var criterion = this.$(".js-filter-criterion").val();
			this.trigger("cases:filter", criterion);
		},
		onSetFilterCriterion:function(criterion){
			this.ui.criterion.val(criterion);
		}
		
		
	});
	

});
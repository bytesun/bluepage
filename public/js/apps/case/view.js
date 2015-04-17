MySpace.module("CaseApp.View", function(View, MySpace,Backbone, Marionette, $, _){
	
	var NoCasesView = Marionette.ItemView.extend({
		template:"#case-list-none",
		tagName:"div",
		className:"alert"
	});
	
	View.NewCase =  MySpace.Common.Views.Form.extend({
		title :"New Case",			
		template:"#case-form",
		onRender: function(){
			this.$(".js-submit").text("Create case");
		}
	});	
	
	View.EditCase = MySpace.Common.Views.Form.extend({
		template:"#case-form",
		initialize:function(){
			this.title = "Edit " + this.model.get("subject");
		},		
		onRender:function(){
			this.$(".js-submit").text("Update case");
		}
	});	
	
	View.ShowCase = Marionette.ItemView.extend({
		template:"#case-view",
		events:{
			"click a.js-edit":"editClicked",
			"click button.js-newStep":"newStepClicked"
		},
		editClicked:function(e){
			e.preventDefault();
			this.trigger("case:edit",this.model);
		},
		newStepClicked:function(e){
			e.preventDefault();
			this.trigger("step:form",this.model);
		}
			
	});


//	
	View.ShowLayout = Marionette.LayoutView.extend({
		template:"#case-view-layout",
		regions:{
			caseViewRegion:"#case-view-region",
			stepsViewRegion:"#steps-view-region"
		}
	});	
	
	View.ShowMissingCase = Marionette.ItemView.extend({
		template:"#missing-case-view"
	});	
	
	View.OCaseView = Marionette.ItemView.extend({
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


	View.OCaseCollectionView = Marionette.CollectionView.extend({
		emptyView:NoCasesView,
		childView:View.OCaseView,
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
	
	View.Layout = Marionette.LayoutView.extend({
		template:"#case-list-layout",
		regions:{
			panelRegion:"#panel-region",
			casesRegion:"#cases-region"
		}
	});
	
	View.Panel = Marionette.ItemView.extend({
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
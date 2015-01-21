MySpace.module("StepApp.List",function(List,MySpace,Backbone,Marionette,$,_){
	List.StepView = Marionette.ItemView.extend({
		tagName:"li",
		template:"#step-item-template",	
		initialize: function(options) {
			this.theStepIndex=options.theIndex;
		},
		events:{
			"click a.tabindex":"loadTodos"
		},
		
		loadTodos:function(){
			this.trigger("step:listTodos",this.model);
		},
		onBeforeRender: function(){
			console.log('calling onbeforerender');
			if(this.model.get('index')===this.theStepIndex){
				console.log('before render');
				this.trigger("step:listTodos",this.model);
			}			
		},
		onRender: function(){
			if(this.model.get('index')===this.theStepIndex){
				this.$el.addClass('active');
//				this.trigger("step:listTodos",this.model);
			}
		}
	});
	
	List.StepCollectionView = Marionette.CollectionView.extend({
		tagName:"ul",
		className:"nav nav-tabs",
		template:"#step-list-template",
		childView:List.StepView,

		initialize:function(options){
			this.stepIndex=options.theIndex;
			
			this.listenTo(this.collection, "reset", function(){
				 this.appendHtml = function(collectionView, itemView, index){
					 collectionView.$el.append(itemView.el);
				 }
			});
		},
		childViewOptions: function(model, index) {
			    // do some calculations based on the model
			    return {
			      theIndex: this.stepIndex,
			      childIndex: index}
		},
		onCollectionRendered:function(){
			console.log('rerender step collection');
			this.appendHtml = function(collectionView, itemView, index){
				 collectionView.$el.prepend(itemView.el);
			}
		}
	});
	
	List.StepContentView = Marionette.ItemView.extend({
		className:"tab-pane",
		template:"#step-tab-content-template",
		initialize: function(options) {
			this.theStepIndex=options.theIndex;
		},
		events:{
			"click button.js-newTodo":"newTodoClicked"
		},
		
		attributes:function(){
			 return {id:this.model.get('index')}
		},
//				
		newTodoClicked:function(e){
			e.preventDefault();
			console.log('click new todo button');
			this.trigger("todo:form",this.model);
		},
		onRender: function(){
			if(this.model.get('index')===this.theStepIndex){
				this.$el.addClass('active');
				this.$(".todolist").append('<button name="todo-new" class="glyphicon glyphicon-plus btn btn-success js-newTodo">CheckItem</button>');
			}
		}
	});
	

	
	List.StepContentCollectionView = Marionette.CollectionView.extend({
		tagName :"div",
		className:"tab-content",
		childView:List.StepContentView,
		initialize:function(options){
			this.stepIndex=options.theIndex;
		},	
		childViewOptions: function(model, index) {
		    // do some calculations based on the model
		    return {
		      theIndex: this.stepIndex,
		      childIndex: index}
		}
	});
	
	List.Layout = Marionette.LayoutView.extend({
		template:"#step-list-layout",
		regions:{
			indexRegion:"#index-region",
			stepRegion:"#step-region",
			todoRegion:"#todo-region"
		}
	});
	
});
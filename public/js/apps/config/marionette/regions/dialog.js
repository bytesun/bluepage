Marionette.Region.Dialog = Marionette.Region.extend({
	onShow: function(view){
		this.listenTo(view,"dialog:close",this.closeDialog);		
		var self = this;		
		this.$el.dialog({
			modal:true,
			title:view.title,
			width:"auto",
			Cancel: function(e,ui){
				self.closeDialog();
			},
			buttons:[
			    {
					text:"Save",
					click:function(e){
						e.preventDefault();
						var data = Backbone.Syphon.serialize(view);
						view.trigger("form:submit", data);
					}
			    },
				{
					text:"Cancle",
					click:function(){
						$(this).dialog("close");
					}
			    }
				]
		});
	},
	
	closeDialog: function(){
		this.stopListening();
		this.empty();
		this.$el.dialog("destroy");
	}

});
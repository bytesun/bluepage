    var app = {}; // create namespace for our app

    //--------------
    // Models
    //--------------
    app.Case = Backbone.Model.extend({
      defaults: {
        subject: '',
        description:'',
        tags:'',
        startdate:new Date(),
        stepid:0,
        status:0,
        ctype:0,
        isprivate:false,
      },	
      urlRoot: '/cases',
    toggle: function(){
        this.save({ status: 1});
      }
    });

    //--------------
    // Collections
    //--------------
    app.CaseList = Backbone.Collection.extend({
      model: app.Case,
      url: '/cases',
      parse : function( response ){
          return response.cases;
      }
    });

    // instance of the Collection
    app.caseList = new app.CaseList();

  //--------------
    // Views
    //--------------
       
    // renders individual todo items list (li)
    app.CaseListView = Backbone.View.extend({
      tagName: 'div',
      template: _.template('<a href="#"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span><%-subject%></a> <%-startdate%>'),
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this; // enable chained calls
      },
      initialize: function(){
          this.model.on('change', this.render, this);
          this.model.on('destroy', this.remove, this); // remove: Convenience Backbone
        },
        events: {
            'dblclick label' : 'edit',
            'keypress .edit' : 'updateOnEnter',
            'blur .edit' : 'close',
            'click .toggle': 'toggleCompleted',
            'click .destroy': 'destroy'
            
          }, 
  
        
      edit: function(){
          this.$el.addClass('editing');
          this.editinput.focus();
        },
    close: function(){
        var value = this.editinput.val().trim();
        if(value) {
          this.model.save({subject: value});
        }
        this.$el.removeClass('editing');
      },  
      updateOnEnter: function(e){
          if(e.which == 13){
            this.close();
          }
         },             
      toggleCompleted: function(){

        
          this.model.toggle();
        },
        destroy: function(){
          this.model.destroy();
        }                
    });

    // renders the full list of todo items calling TodoView for each one.
    app.AppView = Backbone.View.extend({
      el: 'body',
      initialize: function () {
        app.caseList.on('add', this.addAll, this);
        app.caseList.on('reset', this.addAll, this);
        app.caseList.fetch(); 
      },
      events: {
    	  'click #case_btn_save': 'createCaseOnSave'        
      },
     
      createCaseOnSave: function(e){
    	  var inputs = this.newInputs();
    	  console.log(inputs);
        app.caseList.create(inputs);
        this.resetInput();
      },
      addOne: function(ocase){
        var view = new app.CaseListView({model: ocase});
        $('#case-list').append(view.render().el);
      },
      addAll: function(){
        this.$('#case-list').html(''); // clean the todo list
        app.caseList.each(this.addOne, this);
      },
      newInputs: function(){
        return {
          subject: $('#case_subject_input').val().trim(),
          description: $('textarea#case_desc_input').val().trim(),
          tags:$('#case_tags_input').val().trim(),
          isprivate:$('#case_isprivate_chkbox').is(":checked")
        }
      },
      resetInput:function(){
    	  $('#case_subject_input').val('');
    	  $('textarea#case_desc_input').val('');
    	  $('#case_tags_input').val('');
      }
      
    });

    //--------------
    // Initializers
    //--------------   

    app.appView = new app.AppView(); 
 

    
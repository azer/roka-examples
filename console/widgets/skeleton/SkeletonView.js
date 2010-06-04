(function( exports ){

  var ObservationTask = roka.async.tasks.ObservationTask;
  var TaskSet = roka.async.taskset.TaskSet;

  var partial = roka.core.functional.partial;
  var superproto = roka.core.oop.superproto;

  // SkeletonView layer is set to be built. it will represent and manage the layout of the console.
  var SkeletonView = exports.SkeletonView = function(widget)
  {
    // call super constructor
    superproto(SkeletonView,this).constructor.call(this);

    this.widget = widget;
    
    // define template url
    this.subresources.get('template').url = this.path+'/template.xsl';
    
    // set tasks
    this.tasks.get('build').set('children', new ObservationTask( this.widget.children.events.subjects.ready ));

    // insert child widgets it when they get ready
    this.events.add_listener('build',partial(function()
    {
      this.output.select('.Monitor')[0].appendChild( this.widget.children.get('monitor').layout.output.content );
    },[],this));

    this.subresources.send(); 
  }

  // let XSLTLayout make things done
  roka.core.oop.extend(SkeletonView,roka.dom.xsltlayout.XSLTLayout);

  SkeletonView.prototype.transform = function()
  {
    superproto(SkeletonView,this).transform.call(this);
    this.output.select('.Input input')[0].addEventListener('keyup',partial( this.handle_keybindings, [], this ),false);
  }

  SkeletonView.prototype.handle_keybindings = function(eventargs) 
  {
    if(eventargs.keyCode==13)
    {
      var input = this.output.select('.Input input')[0];
      this.widget.application.eval( input.value  );
      input.value = '';
    }
  };

})( window.rokaconsole );


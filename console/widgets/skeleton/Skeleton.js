(function(exports){

  var ObservationTask = roka.async.tasks.ObservationTask;

  // the widget is set to be defined
  var Skeleton = exports.Skeleton = function(app)
  {
    roka.core.oop.superproto(Skeleton,this).constructor.call(this);

    this.application = app;

    this.application.logging.log('Initializing Skeleton Widget');

    // set children
    this.children = new roka.dom.widgetset.WidgetSet(); 
    this.tasks.set('children-ready',new ObservationTask( this.children.events.subjects.ready ));

    // Init layout by creating an instance of the ConsoleLayout
    this.layout = new rokaconsole.SkeletonView(this);

    // Set Log Monitor
    this.children.set('monitor',new rokaconsole.Monitor(this.application));
  }

  // inherit Roke's Widget class
  roka.core.oop.extend( Skeleton, roka.dom.widget.Widget );
  
})( window.rokaconsole );

(function(exports){

  // the widget is set to be defined
  var Monitor = exports.Monitor = function(app)
  {
    roka.core.oop.superproto(Monitor,this).constructor.call(this);

    this.application = app;

    this.application.logging.log('Initializing Monitor Widget');

    // Init layout by creating an instance of the ConsoleLayout
    this.layout = new rokaconsole.MonitorView(this);
  }

  // inherit Roke's Widget class
  roka.core.oop.extend( Monitor, roka.dom.widget.Widget );

  Monitor.prototype.add_record = function(cmd,message,cls)
  {
    this.layout.add_records( 
      roka.dom.utils.parse("<monitor><record>"+( cmd && "<cmd>"+cmd+"</cmd>" || "" )+"<class>"+cls+"</class><message>"+message+"</message></record></monitor>")
    );
  };
  
})( rokaconsole );

(function( exports ){

  var TaskSet = roka.async.taskset.TaskSet;
  var ObservationTask = roka.async.tasks.ObservationTask;
  var partial = roka.core.functional.partial;

  var RokaConsole = exports.RokaConsole = function()
  {
    roka.core.oop.superproto(RokaConsole, this).constructor.call( this );
    
    // set logging interface
    var logging = new roka.core.logging.Logger();
    this.__defineGetter__('logging',function()
    {
      return logging;
    });

    this.logging.name = 'Console';

    window.console && this.logging.add_console(console);

    this.widgets.set( 'skeleton', new rokaconsole.Skeleton( this ) );

    this.widgets.events.add_listener('ready',partial(function(){
      this.logging.add_console(this);
      this.logging.info( 'Roka ' + roka.env.version + '\n' + navigator.userAgent );
    },[],this));

  }
  
  roka.core.oop.extend( RokaConsole, roka.dom.application.Application );

  RokaConsole.prototype.log = function() 
  {
    this.widgets.get('skeleton').children.get('monitor').add_record(null,Array.prototype.join.call(arguments,', '),'Log');
  };

  // the method evaluating passed javascript expressions
  RokaConsole.prototype.eval = function(exp) 
  {
    var output, cls;
    try 
    {
      output = new Function("with(window){ return "+exp+" }")();
      cls = 'Eval '+( typeof output );
    } catch(excinfo){
      output = this.format_error(excinfo);
      cls = 'Eval Error';
    }
    this.widgets.get('skeleton').children.get('monitor').add_record( exp, output, cls );
  };

  RokaConsole.prototype.format_error = function(err) 
  {
    return roka.core.utils.format("Error: %(message)s \n    %(stack)s", {
      'message':err.message,
      'stack':err.stack.split('\n').join('\n    ')
    });
  };

})( rokaconsole );

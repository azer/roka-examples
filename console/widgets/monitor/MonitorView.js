(function( exports ){

  var apply_stylesheet = roka.dom.utils.apply_stylesheet;
  var each = roka.core.functional.each;
  var add = roka.dom.utils.add;

  // MonitorView layer is set to be built. it will represent and manage the layout of the console monitor.
  var MonitorView = exports.MonitorView = function(widget)
  {
    // call super constructor
    roka.core.oop.superproto(MonitorView,this).constructor.apply(this,arguments);

    this.widget = widget;

    this.widget.application.logging.log('initializing monitor view');
    
    // define template url
    this.subresources.get('template').url = this.path+'/template.xsl';

    // get default content of the monitor.
    this.subresources.get('content').url = this.path+'/content.xml';

    this.subresources.send();

    this.events.add_listener('refresh', roka.core.functional.partial( this.set_height, [], this ));
  
  }

  // let XSLTLayout make things done
  roka.core.oop.extend(MonitorView,roka.dom.xsltlayout.XSLTLayout);

  MonitorView.prototype.add_records = function(content)
  {
    var elements = Array.prototype.slice.call(apply_stylesheet(this.template,content).childNodes);
    each(Array.prototype.slice.call(apply_stylesheet(this.template,content).childNodes))
      (add, this.output.content)
    this.events.fire('refresh');
  }

  MonitorView.prototype.set_height = function() 
  {
    var monitor = this.output.content.parentNode;
    var space = monitor.parentNode.offsetHeight - parseInt( monitor.parentNode.offsetHeight/10 );
    monitor.offsetHeight>space && ( this.output.content.style.marginTop = "-"+( monitor.offsetHeight-space )+'px' );
  };

})( window.rokaconsole );

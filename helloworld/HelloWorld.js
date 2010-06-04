(function( exports ){
  
  var HelloWorld = exports.HelloWorld = function()
  {
    roka.core.oop.superproto(HelloWorld,this).constructor.call(this);
    this.layout = new HelloWorldView(this);
  }

  roka.core.oop.extend( HelloWorld, roka.dom.widget.Widget );

})( window );

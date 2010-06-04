(function( exports ){

  const MAXBLUR = 15;

  var partial = roka.core.functional.partial;

  var HelloWorldView = exports.HelloWorldView = function()
  {
    roka.core.oop.superproto(HelloWorldView,this).constructor.call(this);

    roka.async.get(this.path+'/poetry.svg',partial(function(req)
    {
      this.output.content = document.adoptNode(req.response.xml.content.firstChild);
      this.events.fire('build');
    },[],this));

    // register events
    window.addEventListener('mousemove',partial(this.setblur,[],this),false);
  }

  roka.core.oop.extend(HelloWorldView,roka.dom.layout.Layout);

  HelloWorldView.prototype.setblur = function(eventargs)
  {
    var blur = parseInt( parseInt( Math.abs( 420 - eventargs.clientY  )+Math.abs( 600 - eventargs.clientX ) ) / (MAXBLUR*4) );
    this.output.select('feGaussianBlur')[0].setAttribute('stdDeviation',blur>2&&blur||2);
  }


})( window );


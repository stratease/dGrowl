define([ "dojo/text", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/dom-construct", "dGrowl/NotificationNode", "dojo/dom-class", "dojo/_base/event", "dojo/_base/lang"],
	   function(t, declare, base, templated, domCon, NotificationNode, domClass, event, lang)
{
	return declare('dGrowl',
	[base, templated],
	{
		'templateString':dojo.cache('dGrowl', 'NotificationNode.html'),
		'title':'',
		'constructor':function(a)
		{
			if(a.channel == undefined)
				console.error('NotificationNode requires a "channel" definition!');
		},
		'show':function()
		{
			domClass.add(this.domNode, 'dGrowl-visible');
		},
		'killme':function(evt)
		{
			if(evt)
				event.stop(evt);
			// delay on destroy for animation to do its thing...
			domClass.remove(this.domNode, 'dGrowl-visible');
			setTimeout(lang.hitch(this, this.destroy),1100);
		}
	});
});

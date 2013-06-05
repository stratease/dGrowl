define([ "dojo/text", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/dom-construct", "dGrowl/NotificationNode"],
	   function(t, declare, base, templated, domCon, NotificationNode)
{
	return declare('dGrowl',
	[base, templated],
	{
		'templateString':dojo.cache('dGrowl', 'NotificationNode.html'),
		'constructor':function(a)
		{
			if(a.channel == undefined)
				console.error('NotificationNode requires a "channel" definition!');
		},
		'show':function()
		{

		}
	});
});

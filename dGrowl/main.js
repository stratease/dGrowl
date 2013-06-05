define([ "dojo/text", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/topic", "dojo/dom-construct", "dGrowl/NotificationNode"],
	   function(t, declare, base, templated, topic, domCon, NotificationNode)
{
	return declare('dGrowl',
	[base, templated],
	{
		'templateString':dojo.cache('dGrowl', 'main.html'),
		'channels':[], // channel definitions
		'postCreate':function()
		{
			this.inherited(arguments);
			if(!this.channels instanceof Array)
			{
				this.channels = [this.channels];
			}
			this.channels.sort(this.sortChannels);
			this.chanDefs = {}; // channel definitions indexed by channel name
			// build nodes for the channels
			for(var i = 0; i < this.channels.length; i++)
			{
				this.chanDefs[this.channels[i].name] = this.channels[i]; // main def
				this.chanDefs[this.channels[i].name].node = domCon.create('li',{'class':"dGrowl-channel dGrowl-channel-"+this.channels[i].name}); // node
				this.chanDefs[this.channels[i].name]._s = topic.subscribe(this.channels[i].name, this.subscribedChannels);
			}
		},
		'destroy':function() // cleanup!! important to get rid of our awesomeness, when noone loves us anymore.
		{
			for(var i = 0; i < this.chanDefs.length; i++)
			{
				topic.unsubscribe(this.chanDefs[i]._s);
			}
			this.inherited(arguments);
		},
		'subscribedChannels':function()
		{
			console.log(arguments);
		},
		// creates and displays a new notification widget
		'addNotification':function(c, m)
		{
			if(this.chanDefs[c] != undefined)
			{
				if(m instanceof String)
					var n = new NotificationNode({m:m, channel:'default'})
				else
					var n = new NotificationNode(m);
				domCon.place(n.domNode, this.chanDefs[c].node); // push to page
				n.show(); // trigger display animation
			}
			else
				console.error(c + ' channel is not defined!');
		},
		// sorts the channel definitions based on the pos numeric property
		'sortChannels':function(a,b)
		{
			if(a.pos == undefined)
			{
				return -1;
			}
			if(b.pos == undefined)
			{
				return 1;
			}
			if(a.pos > b.pos)
				return 1;
			else if(a.pos == b.pos)
				return 0;
			else
				return -1;
		}
	});
});

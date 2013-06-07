define([ "dojo/text", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/topic", "dojo/dom-construct", "dGrowl/NotificationNode", "dojo/query", "dojo/_base/lang", "dojo/dom-class"],
	   function(t, declare, base, templated, topic, domCon, NotificationNode, query, lang, domClass)
{
	return declare('dGrowl',
	[base, templated],
	{
		'templateString':dojo.cache('dGrowl', 'main.html'),
		'channels':[{name:'default', pos:0}], // channel user definitions
		'orientation':'topRight',
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
				domCon.place(this.chanDefs[this.channels[i].name].node, this.channelsN);
			}
			// event
			this._s = topic.subscribe('dGrowl', lang.hitch(this, this._subscribedChannels));
			// style myself..
			domClass.add(this.domNode, 'dGrowl-' + this.orientation);
			// push myself to the window..
			var b = query('body')[0];
			domCon.place(this.domNode, b, 'top');
		},
		'destroy':function() // cleanup!! important to get rid of our awesomeness, when noone loves us anymore.
		{
			for(var i = 0; i < this.chanDefs.length; i++)
			{
				topic.unsubscribe(this.chanDefs[i]._s);
			}
			topic.unsubscribe(this._s);
			this.inherited(arguments);
		},
		'_subscribedChannels':function()
		{
			this.addNotification(arguments[0], arguments[1])
		},
		// creates and displays a new notification widget
		'addNotification':function(m, o)
		{
			// option undefined, create default
			if(o == undefined)
				o = {channel:this.channels[0].name};
			else if(o.channel == undefined)
				o.channel = this.channels[0].name;
			// verify the channel exists
			if(this.chanDefs[o.channel] != undefined)
			{
				// moosh options/message together and kick off the notification...
				o.message = m;
				var n = new NotificationNode(o);
				domCon.place(n.domNode, this.chanDefs[o.channel].node); // push to page
				n.show();
			}
			else
				console.error(o.channel + ' channel is not defined!');
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

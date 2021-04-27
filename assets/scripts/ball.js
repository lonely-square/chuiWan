// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
		cue:{
			type:cc.Node,
			default:null,
		},
		mindis:30,//拖动距离小则取消发球
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
		this.cueinst = this.cue.getComponent("cue"); //获取组件实例
		this.body = this.getComponent("cc.RigidBody");
		this.node.on(cc.Node.EventType.TOUCH_START, function(e){}.bind(this),this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e){
			var w = e.getLocation();
			var dst = this.node.parent.convertToNodeSpaceAR(w);
			var src = this.node.getPosition();
			var dir = dst.sub(src);//触摸点坐标减球坐标为方向
			var len = dir.len();
			if(len<this.mindis)
			{this.cue.active = false; return;}
			this.cue.active = true;
			var r = Math.atan2(dir.y,dir.x);
			var degree = r*180/Math.PI;//度数
			this.cue.angle = degree;
			var cur_pos = dst;
			var cuehalf = this.cue.width*0.5;
			cur_pos.x += (cuehalf * dir.x /len);
			cur_pos.y += (cuehalf * dir.y /len);
			this.cue.setPosition(cur_pos);//设置球杆的位置
			
		}.bind(this),this)
		this.node.on(cc.Node.EventType.TOUCH_END, function(e){
			if(this.cue.active === false){return;} //没有击球
			this.cueinst.shoot(this.node.getPosition());
		}.bind(this),this)
		this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e){
			if(this.cue.active === false){return;} //没有击球
			this.cueinst.shoot(this.node.getPosition());
			
		}.bind(this),this)
		
		
    },
	
	onBeginContact: function (contact, selfCollider, otherCollider) {
		
		if(otherCollider.node.groupIndex == 3)
		{this.node.active = false;
			return;
		}
		
	    },	

    // update (dt) {},
});

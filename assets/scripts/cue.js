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
		shootpower:18,//力度
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
         this.body = this.getComponent("cc.RigidBody");
    },
	
	shoot: function (dst){
		//给一个冲量，大小，方向
		var src = this.node.getPosition();
		var dir = dst.sub(src);//方向向量
		var cuehalf = this.node.width*0.5;
		var len  = dir.len(); //拉开长度代表大小
		distance = len - cuehalf;
		var power_x = distance * this.shootpower * dir.x / len;
		var power_y = distance * this.shootpower * dir.y / len;
		
		//冲量函数：the world impulse vector,the world position,alse wake up the body
   
		this.body.applyLinearImpulse(cc.v2(power_x,power_y),
		this.node.convertToNodeSpaceAR(cc.v2(0,0)),true);	
	},
	
	onPreSolve: function (contact, selfCollider, otherCollider) {
		
		this.node.active = false;
	    },

    // update (dt) {},
});

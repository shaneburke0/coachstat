function ModelLineupPlayer(params) {
	this.prototype = new ModelPlayer(params.player);
	this.id = params.id;
	this.playerid = params.playerid;
	this.captain = params.captain;
	this.position = params.position;
	this.lineupid = params.lineupid;
	this.positionid = params.positionid;
}

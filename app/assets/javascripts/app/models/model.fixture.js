function ModelFixture(params) {
	this.location = params.location;
	this.clubid = params.clubid;
	this.oppid = params.oppid;
	this.date = new Date(params.date);
	this.time = new Date(params.time);
	this.opp = new ModelClub({});
	this.id = params.id;
	this.timestr = this.time.getUTCHours() + ':' + this.time.getUTCMinutes();
	this.datestr = this.date.getDate() + '/' + this.date.getMonth() + '/' + this.date.getFullYear();
	this.lineup = new ModelLineup({});
}

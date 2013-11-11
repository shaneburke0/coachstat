function ModelClub(club) {
	this.id = club.id;
	this.name = club.name;
	this.location = club.location;
	this.clubType = club.club_type;
	this.image = club.image;
	this.players = [];
	this.fixtures = [];
}

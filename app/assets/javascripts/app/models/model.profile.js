function ModelProfile(params) {
	this.address = params.address;
	this.firstname = params.firstname;
	this.lastname = params.lastname;
	this.mobile = params.mobile;
	this.userid = params.user_id;
	this.id = params.id;
	
	this.imgurl = params.avatar_file_name == null ? "/assets/profile/profile-img.jpg" : "/system/profiles/avatars/000/000/001/original/" + params.avatar_file_name;
	this.avatar = null;
}
 